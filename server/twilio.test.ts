import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Twilio Configuration", () => {
  it("should have valid Twilio credentials", () => {
    expect(ENV.twilioAccountSid).toBeDefined();
    expect(ENV.twilioAuthToken).toBeDefined();
    expect(ENV.twilioWhatsappNumber).toBeDefined();
    expect(ENV.ownerWhatsappNumber).toBeDefined();

    // Validate format
    expect(ENV.twilioAccountSid).toMatch(/^AC/);
    expect(ENV.twilioWhatsappNumber).toMatch(/^\+55/);
    expect(ENV.ownerWhatsappNumber).toMatch(/^\+55/);
  });

  it("should have matching Twilio number format", () => {
    const twilioNumber = ENV.twilioWhatsappNumber;
    const ownerNumber = ENV.ownerWhatsappNumber;

    // Both should be in format +55XXXXXXXXXX
    expect(twilioNumber).toMatch(/^\+55\d{10,11}$/);
    expect(ownerNumber).toMatch(/^\+55\d{10,11}$/);
  });
});
