import React from "npm:react@19";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Img,
} from "npm:@react-email/components@0.0.36";

interface OrderItem {
  color: string;
  id: string;
  order_id: string;
  price: number;
  product_id: string;
  product_name: string;
  quantity: number;
  size: number;
}

interface Order {
  address: string;
  commune: string;
  created_at: string;
  delivery_price: number;
  delivery_type: "home" | "office";
  id: string;
  name: string;
  subtotal: number;
  telephone: string;
  total: number;
  user_id: string;
  wilaya: string;
}

interface OrderProp {
  order: Order | null;
  orderItems: OrderItem[] | null;
}

export default function SendOrder({
  order,
  orderItems,
}: OrderProp) {
  const logo =
    "https://wbzcacyfdxrmishhotqx.supabase.co/storage/v1/object/public/ordeya_images/logo.svg";

  // If there is no order or no order items,
  // don't render the email.
  if (!order || !orderItems) {
    return null;
  }

  return (
    <Html>
      <Head />

      <Preview>
        New order from {order.name} — Ordeya
      </Preview>

      <Tailwind>
        <Body className="m-0 bg-[#B099B5] px-4 py-8 font-sans">
          <Container className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-sm">

            {/* ================= HEADER ================= */}
            <Section className="bg-[#F2E9F1] px-8 py-7">
              <Img
                src={logo}
                width="90"
                alt="Ordeya"
                className="mx-auto"
              />

              <Heading className="mb-0 mt-5 text-center text-2xl font-bold text-[#56044F]">
                New Order Received
              </Heading>

              <Text className="mb-0 mt-4 text-center text-sm text-[#B099B5]">
                Order #{order.id}
              </Text>
            </Section>

            {/* ================= INTRODUCTION ================= */}
            <Section className="px-8 pt-8">
              <Text className="m-0 text-base font-medium text-[#270E25]">
                Hello Ordeya Team,
              </Text>

              <Text className="mt-2 text-sm leading-6 text-[#B099B5]">
                A new order has been placed on your store.
                Here are the details of the customer and their order.
              </Text>
            </Section>

            {/* ================= CUSTOMER INFORMATION ================= */}
            <Section className=" mt-6 rounded-xl bg-[#F2E9F1] p-5">
              <Text className="m-0 text-xs font-bold uppercase tracking-wider text-[#B099B5]">
                Customer Information
              </Text>

              <Text className="mb-0 mt-4 text-sm text-[#270E25]">
                <strong>Customer</strong>
                <br />
                {order.name}
              </Text>

              <Text className="mb-0 mt-4 text-sm text-[#270E25]">
                <strong>Telephone</strong>
                <br />
                {order.telephone}
              </Text>

              <Text className="mb-0 mt-4 text-sm text-[#270E25]">
                <strong>Address</strong>
                <br />
                {order.address}
              </Text>

              <Text className="mb-0 mt-4 text-sm text-[#270E25]">
                <strong>Delivery Location</strong>
                <br />
                {order.commune}, {order.wilaya}
              </Text>
            </Section>

            {/* ================= ORDER ITEMS ================= */}
            <Section className="px-8 pt-8">
              <Heading className="m-0 text-lg font-bold text-[#56044F]">
                Order Items
              </Heading>

              {orderItems.map((item) => (
                <Section
                  key={item.id}
                  className="mt-4 rounded-xl border border-[#B099B5] p-4"
                >
                  {/* Product name */}
                  <Text className="m-0 text-base font-bold text-[#56044F]">
                    {item.product_name}
                  </Text>

                  {/* Quantity */}
                  <Text className="m-0 mt-3 text-sm text-[#B099B5]">
                    Quantity
                    <span className="float-right font-medium text-[#270E25]">
                      {item.quantity}
                    </span>
                  </Text>

                  {/* Size */}
                  <Text className="m-0 mt-2 text-sm text-[#B099B5]">
                    Size
                    <span className="float-right font-medium text-[#270E25]">
                      {item.size}
                    </span>
                  </Text>

                  {/* Price */}
                  <Text className="m-0 mt-2 text-sm text-[#B099B5]">
                    Price
                    <span className="float-right font-medium text-[#E5C733]">
                      {item.price} DA
                    </span>
                  </Text>

                  {/* Color */}
                  <Text className="m-0 mt-3 text-sm text-[#B099B5]">
                    Color
                  </Text>

                  <Section className="mt-2">
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        border: "1px solid #B099B5",
                      }}
                    />
                  </Section>
                </Section>
              ))}
            </Section>

            {/* ================= ORDER SUMMARY ================= */}
            <Section className="mt-8 rounded-xl bg-[#56044F] p-6">
              <Text className="m-0 text-sm font-bold uppercase tracking-wider text-white">
                Order Summary
              </Text>

              {/* Subtotal */}
              <Text className="m-0 mt-5 text-sm text-white">
                Subtotal
                <span className="float-right">
                  {order.subtotal} DA
                </span>
              </Text>

              {/* Delivery type */}
              <Text className="m-0 mt-3 text-sm text-white">
                Delivery type
                <span className="float-right">
                  {order.delivery_type}
                </span>
              </Text>

              {/* Delivery price */}
              <Text className="m-0 mt-3 text-sm text-white">
                Delivery
                <span className="float-right">
                  {order.delivery_price} DA
                </span>
              </Text>

              {/* Divider */}
              <Section className="my-5 border-t border-[#7A3973]" />

              {/* Total */}
              <Text className="m-0 text-lg font-bold text-[#E5C733]">
                Total
                <span className="float-right">
                  {order.total} DA
                </span>
              </Text>
            </Section>

            {/* ================= ORDER ID ================= */}
            <Section className="px-8 pt-7">
              <Text className="m-0 text-xs text-[#B099B5]">
                Order ID
              </Text>

              <Text className="m-0 mt-1 text-sm font-medium text-[#270E25]">
                #{order.id}
              </Text>
            </Section>

            {/* ================= FOOTER ================= */}
            <Section className="px-8 pb-8 pt-8">
              <Section className="border-t border-[#EDE3EB] pt-6">

                <Text className="m-0 text-center text-sm font-medium text-[#56044F]">
                  Thank you for choosing Ordeya
                </Text>

                <Text className="m-0 mt-2 text-center text-xs text-[#B099B5]">
                  Please review and process this order.
                </Text>

              </Section>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

