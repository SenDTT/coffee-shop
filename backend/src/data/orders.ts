const exampleOrders = [
  {
    user: "64f8a7f5a2b1c3d4e5f6a789",
    products: [
      {
        product: "68363e61b435ae939e3ad34b",
        quantity: 2,
      }, // Cappuccino ($5.25)
      {
        product: "683f7ca35d1c89d79bc13817",
        quantity: 1,
      }, // Cold Brew ($12.8)
    ],
    address: "123 Coffee St",
    city: "Seattle",
    state: "WA",
    country: "USA",
    zip: "98101",
    phone: "+1-555-123-4567",
    email: "customer1@example.com",
    dateOfBirth: new Date("1990-04-15"),
    trackingNumber: "TRACK123456",
    trackingUrl: "https://tracking.example.com/TRACK123456",
    orderDate: new Date("2025-07-10T10:00:00Z"),
    deliveryDate: new Date("2025-07-15T14:00:00Z"),
    totalItems: 3,
    totalPrice: 5.25 * 2 + 12.8 * 1, // 23.3
    discount: 2.0,
    tax: 1.86,
    shippingCost: 5.0,
    totalAmount: 23.3 - 2.0 + 1.86 + 5.0, // 28.16
    status: "paid",
  },
  {
    user: "64f8a7f5a2b1c3d4e5f6a790",
    products: [
      {
        product: "68433431953e28de9ad757a9",
        quantity: 1,
      }, // Matcha Espresso Fusion ($12.5)
      {
        product: "68433b81953e28de9ad75812",
        quantity: 2,
      }, // Iced Green Tea ($12.5)
    ],
    address: "456 Latte Lane",
    city: "Portland",
    state: "OR",
    country: "USA",
    zip: "97201",
    phone: "+1-555-987-6543",
    email: "customer2@example.com",
    dateOfBirth: new Date("1985-11-25"),
    trackingNumber: null,
    trackingUrl: null,
    orderDate: new Date("2025-07-11T12:30:00Z"),
    deliveryDate: null,
    totalItems: 3,
    totalPrice: 12.5 * 1 + 12.5 * 2, // 37.5
    discount: 0,
    tax: 3.0,
    shippingCost: 4.0,
    totalAmount: 37.5 + 3.0 + 4.0, // 44.5
    status: "draft",
  },
  {
    user: "64f8a7f5a2b1c3d4e5f6a791",
    products: [
      {
        product: "68433497953e28de9ad757c7",
        quantity: 3,
      }, // Matcha Frappe ($5)
      {
        product: "68433b3b953e28de9ad75803",
        quantity: 1,
      }, // Chai Latte ($5)
    ],
    address: "789 Tea Blvd",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    zip: "94105",
    phone: "+1-555-222-3333",
    email: "customer3@example.com",
    dateOfBirth: new Date("1992-07-20"),
    trackingNumber: "TRACK654321",
    trackingUrl: "https://tracking.example.com/TRACK654321",
    orderDate: new Date("2025-07-09T09:00:00Z"),
    deliveryDate: new Date("2025-07-14T11:00:00Z"),
    totalItems: 4,
    totalPrice: 5 * 3 + 5 * 1, // 20
    discount: 1.5,
    tax: 1.7,
    shippingCost: 3.5,
    totalAmount: 20 - 1.5 + 1.7 + 3.5, // 23.7
    status: "shipped",
  },
];
export default exampleOrders;
