import { CartItem, CustomerDetails } from '../types';

export const STORE_WHATSAPP_NUMBER = '918608109013'; // +91 86081 09013

export function generateOrderId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SKC-${y}${m}${d}-${rand}`;
}

export function buildOrderMessage(
  items: CartItem[],
  customer: CustomerDetails,
  total: number,
  orderId: string
): string {
  const divider = '━━━━━━━━━━━━';

  const productLines = items
    .map((item) => {
      const subtotal = item.price * item.quantity;
      return `${item.name}  Color: ${item.color}  Size: ${item.size}  Qty: ${item.quantity}  Price: ₹${item.price}  Subtotal: ₹${subtotal}`;
    })
    .join('\n');

  const addressParts = [
    customer.houseNumber,
    customer.streetArea,
    customer.city,
    `${customer.state} - ${customer.pincode}`,
  ]
    .filter(Boolean)
    .join('\n');

  const lines = [
    '🛍️ NEW ORDER — SK COLLECTION',
    `Order ID: ${orderId}`,
    divider,
    'PRODUCTS',
    productLines,
    divider,
    'CUSTOMER DETAILS',
    `Name: ${customer.fullName}`,
    `Mobile: ${customer.mobileNumber}`,
    ...(customer.alternateNumber ? [`Alternate: ${customer.alternateNumber}`] : []),
    '',
    'DELIVERY ADDRESS',
    addressParts,
    ...(customer.district ? [`District: ${customer.district}`] : []),
    ...(customer.landmark ? [`Landmark: ${customer.landmark}`] : []),
    ...(customer.deliveryNotes ? [`Notes: ${customer.deliveryNotes}`] : []),
    divider,
    `TOTAL: ₹${total}`,
    'Payment: Store / Cash arrangement',
    '',
    'Please confirm my order and delivery details.',
    'Thank you SK COLLECTION',
  ];

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string, number: string = STORE_WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
