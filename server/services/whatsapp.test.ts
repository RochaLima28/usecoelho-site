import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { OrderNotificationData } from "./whatsapp";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function sampleOrder(overrides?: Partial<OrderNotificationData>): OrderNotificationData {
  return {
    orderId: 42,
    total: 199.9,
    customerName: "João Silva",
    customerPhone: "+5511999999999",
    items: [
      { name: "Camiseta Azul", quantity: 2, price: 79.95 },
      { name: "Bermuda Preta", quantity: 1, price: 39.99 },
    ],
    ...overrides,
  };
}

// ─── buildAdminOrderMessage ────────────────────────────────────────────────────

describe("buildAdminOrderMessage", () => {
  it("includes order ID, total and customer name", async () => {
    const { buildAdminOrderMessage } = await import("./whatsapp");
    const msg = buildAdminOrderMessage(sampleOrder());
    expect(msg).toContain("Pedido #42");
    expect(msg).toContain("R$ 199.90");
    expect(msg).toContain("João Silva");
  });

  it("lists each item with quantity and unit price", async () => {
    const { buildAdminOrderMessage } = await import("./whatsapp");
    const msg = buildAdminOrderMessage(sampleOrder());
    expect(msg).toContain("Camiseta Azul x2");
    expect(msg).toContain("R$ 79.95");
    expect(msg).toContain("Bermuda Preta x1");
    expect(msg).toContain("R$ 39.99");
  });

  it("includes customer phone when provided", async () => {
    const { buildAdminOrderMessage } = await import("./whatsapp");
    const msg = buildAdminOrderMessage(sampleOrder({ customerPhone: "+5511912345678" }));
    expect(msg).toContain("+5511912345678");
  });

  it("omits contact line when phone is null", async () => {
    const { buildAdminOrderMessage } = await import("./whatsapp");
    const msg = buildAdminOrderMessage(sampleOrder({ customerPhone: null }));
    expect(msg).not.toContain("Contato:");
  });

  it("handles string totals (from DB decimal)", async () => {
    const { buildAdminOrderMessage } = await import("./whatsapp");
    const msg = buildAdminOrderMessage(sampleOrder({ total: "150.00" }));
    expect(msg).toContain("R$ 150.00");
  });

  it("shows placeholder when items list is empty", async () => {
    const { buildAdminOrderMessage } = await import("./whatsapp");
    const msg = buildAdminOrderMessage(sampleOrder({ items: [] }));
    expect(msg).toContain("(sem itens)");
  });
});

// ─── sendAdminNewOrderWhatsApp ────────────────────────────────────────────────

describe("sendAdminNewOrderWhatsApp", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    // Restore env vars
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it("logs a warning and skips send when Twilio env vars are missing", async () => {
    delete process.env.TWILIO_ACCOUNT_SID;
    delete process.env.TWILIO_AUTH_TOKEN;
    delete process.env.TWILIO_WHATSAPP_FROM;
    delete process.env.ADMIN_WHATSAPP_TO;

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { sendAdminNewOrderWhatsApp } = await import("./whatsapp");
    await sendAdminNewOrderWhatsApp(sampleOrder());

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy.mock.calls[0]?.[0]).toContain("Variáveis de ambiente Twilio");
  });

  it("calls twilio client.messages.create with correct params", async () => {
    process.env.TWILIO_ACCOUNT_SID = "ACtest";
    process.env.TWILIO_AUTH_TOKEN = "authtoken";
    process.env.TWILIO_WHATSAPP_FROM = "whatsapp:+14155238886";
    process.env.ADMIN_WHATSAPP_TO = "whatsapp:+5511999999999";

    const mockCreate = vi.fn().mockResolvedValue({ sid: "SMtest123" });
    vi.doMock("twilio", () => ({
      default: vi.fn(() => ({
        messages: { create: mockCreate },
      })),
    }));

    const { sendAdminNewOrderWhatsApp } = await import("./whatsapp");
    await sendAdminNewOrderWhatsApp(sampleOrder());

    expect(mockCreate).toHaveBeenCalledOnce();
    const callArg = mockCreate.mock.calls[0]?.[0] as Record<string, string>;
    expect(callArg.from).toBe("whatsapp:+14155238886");
    expect(callArg.to).toBe("whatsapp:+5511999999999");
    expect(callArg.body).toContain("Pedido #42");
  });

  it("logs error but does NOT throw when Twilio call fails", async () => {
    process.env.TWILIO_ACCOUNT_SID = "ACtest";
    process.env.TWILIO_AUTH_TOKEN = "authtoken";
    process.env.TWILIO_WHATSAPP_FROM = "whatsapp:+14155238886";
    process.env.ADMIN_WHATSAPP_TO = "whatsapp:+5511999999999";

    const mockCreate = vi.fn().mockRejectedValue(new Error("Twilio API error"));
    vi.doMock("twilio", () => ({
      default: vi.fn(() => ({
        messages: { create: mockCreate },
      })),
    }));

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendAdminNewOrderWhatsApp } = await import("./whatsapp");

    // Should NOT throw
    await expect(sendAdminNewOrderWhatsApp(sampleOrder())).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy.mock.calls[0]?.[0]).toContain("[WhatsApp]");
  });
});
