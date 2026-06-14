export const inquiries = [
  {
    id: "inq-001",
    buyerId: "usr-buyer-1",
    supplierId: "sup-001",
    productId: "prod-001",
    subject: "Weekly milk supply contract",
    name: "Rahul Mehta",
    company: "Fresh Foods Pvt Ltd",
    email: "rahul@freshfoods.in",
    phone: "+91 98765 43210",
    quantity: "500 litres/week",
    message:
      "We need a reliable weekly supply of toned milk for our 3 Mumbai outlets. Can you offer volume pricing for 500+ litres per week?",
    status: "responded",
    response:
      "Thank you for your interest. We can offer ₹48/litre for 500+ litres/week with Net 15 payment terms. Our B2B team will call you tomorrow.",
    createdAt: "2026-06-01T11:30:00",
    updatedAt: "2026-06-02T10:00:00",
  },
  {
    id: "inq-002",
    buyerId: "usr-buyer-2",
    supplierId: "sup-002",
    productId: "prod-003",
    subject: "A2 milk for cloud kitchen",
    name: "Priya Nair",
    company: "SpiceRoute Cloud Kitchen",
    email: "priya@cloudkitchen.co",
    phone: "+91 98120 33445",
    quantity: "60 litres/day",
    message:
      "Looking for daily A2 milk delivery to our Koramangala kitchen. Need early morning slot before 7 AM.",
    status: "new",
    response: null,
    createdAt: "2026-06-12T07:45:00",
    updatedAt: "2026-06-12T07:45:00",
  },
  {
    id: "inq-003",
    buyerId: "usr-buyer-3",
    supplierId: "sup-003",
    productId: "prod-013",
    subject: "Bulk ghee for hotel gifting",
    name: "Vikram Desai",
    company: "Hotel Grand Palace",
    email: "vikram@hotelgrand.in",
    phone: "+91 98230 77889",
    quantity: "50 kg",
    message:
      "We need premium bilona ghee in custom 500g jars for Diwali guest hampers. Can you do private labelling?",
    status: "responded",
    response:
      "Yes, we offer private label bilona ghee in 250g, 500g, and 1kg jars. MOQ is 100 units. Sending catalogue via email.",
    createdAt: "2026-06-08T15:20:00",
    updatedAt: "2026-06-09T09:15:00",
  },
  {
    id: "inq-004",
    buyerId: "usr-buyer-1",
    supplierId: "sup-002",
    productId: "prod-007",
    subject: "Paneer supply for new outlet",
    name: "Rahul Mehta",
    company: "Fresh Foods Pvt Ltd",
    email: "rahul@freshfoods.in",
    phone: "+91 98765 43210",
    quantity: "40 kg/week",
    message: "Opening a new outlet in Pune. Need consistent paneer supply with cold chain delivery.",
    status: "closed",
    response: "We've set up weekly delivery. Order DC-2026-0142 covers the trial period.",
    createdAt: "2026-05-20T10:00:00",
    updatedAt: "2026-05-28T16:00:00",
  },
  {
    id: "inq-005",
    buyerId: "usr-buyer-2",
    supplierId: "sup-001",
    productId: "prod-005",
    subject: "Curd for South Indian menu",
    name: "Priya Nair",
    company: "SpiceRoute Cloud Kitchen",
    email: "priya@cloudkitchen.co",
    phone: "+91 98120 33445",
    quantity: "25 kg/week",
    message: "Need thick set curd for our dosa and idli menu. What's the shelf life and packaging?",
    status: "new",
    response: null,
    createdAt: "2026-06-13T09:10:00",
    updatedAt: "2026-06-13T09:10:00",
  },
];

export const INQUIRY_STATUSES = ["new", "responded", "closed"];

export function getInquiryById(id) {
  return inquiries.find((i) => i.id === id) ?? null;
}

export function getInquiriesByBuyer(buyerId) {
  return inquiries.filter((i) => i.buyerId === buyerId);
}

export function getInquiriesBySupplier(supplierId) {
  return inquiries.filter((i) => i.supplierId === supplierId);
}
