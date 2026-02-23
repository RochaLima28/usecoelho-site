# UseCoelhoBR - Project TODO

## Core Features
- [x] Responsive e-commerce website with white minimalist design
- [x] Logo integration and brand identity (USECOELHOBR)
- [x] Product catalog with 4 t-shirt variations (black, blue, white)
- [x] Professional hanger images for products
- [x] Functional shopping cart with progressive discount (3% off for 7+ units)
- [x] Correios API integration for freight calculation by ZIP code
- [x] Mercado Pago payment gateway integration
- [x] Individual product pages with size selection (P, M, G, GG)
- [x] Benefit banners (anti-odor, extreme softness, lowest market price, no transparency)
- [x] Login system with saved address information
- [x] Customer dashboard ("Minha Conta") for order tracking
- [x] Protected admin panel for order management, payments, and inventory control
- [x] Email notification system for order updates
- [x] GitHub export and sync
- [x] Removed "Add to Cart" button from homepage (only on product detail pages)
- [x] Cart displays selected sizes for each item
- [x] Twilio WhatsApp notifications for order alerts

## WhatsApp Integration (Completed)
- [x] Install Twilio dependency
- [x] Configure Twilio environment variables (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
- [x] Configure WhatsApp numbers (TWILIO_WHATSAPP_NUMBER, OWNER_WHATSAPP_NUMBER)
- [x] Create WhatsApp notification service with order details
- [x] Integrate WhatsApp service into checkout flow
- [x] Test WhatsApp message formatting and delivery
- [x] Validate Twilio credentials with vitest tests

## Testing & Validation
- [x] Twilio configuration validation tests
- [x] WhatsApp message building tests
- [x] WhatsApp service integration tests
- [x] All tests passing successfully

## Deployment & Publishing
- [ ] Final testing of complete order flow (product → cart → checkout → payment → WhatsApp notification)
- [ ] Save checkpoint before publishing
- [ ] Publish site to make it live for sales

## Notes
- WhatsApp messages include: order ID, customer name, contact, items with quantities and prices, and total
- Notification failures do not block checkout process
- All credentials are securely managed via environment variables
