export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentStatus: string;
  deliveryStatus: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
  options?: Record<string, any>; // Additional options like size, color, etc.
}
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface BillingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
