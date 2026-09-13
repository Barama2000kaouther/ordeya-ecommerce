import "@supabase/functions-js/edge-runtime.d.ts";

import { withSupabase } from "npm:@supabase/server";
import { Resend } from "npm:resend@6";
import { render } from "npm:@react-email/render";
import React from "npm:react@19";

import Send_order from "./sendorder.tsx";

console.log("Hello from Functions!");

const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not configured");
}

// Use your own verified sending domain in production.
// onboarding@resend.dev only reliably delivers to the email
// registered on the Resend account, not to arbitrary recipients.
const fromAddress = Deno.env.get("RESEND_FROM_ADDRESS") ?? "onboarding@resend.dev";
const toAddress = Deno.env.get("ORDER_NOTIFICATION_EMAIL") ?? "ordeya.algeria@gmail.com";

const resend = new Resend(resendApiKey);

export default {
  fetch: withSupabase(
    // If only your frontend (anon/publishable key) calls this, keep "publishable".
    // If a backend job or another function also calls it with a secret key, use:
    // { auth: ["publishable", "secret"] }
    { auth: "publishable" },
    async (req) => {
      try {
        if (req.method !== "POST") {
          return Response.json(
            { error: "Method not allowed" },
            { status: 405 },
          );
        }

        const body = await req.json();
        const { order, orderItems } = body;

        if (!order) {
          return Response.json(
            { error: "order is required" },
            { status: 400 },
          );
        }

        if (!Array.isArray(orderItems) || orderItems.length === 0) {
          return Response.json(
            { error: "orderItems must be a non-empty array" },
            { status: 400 },
          );
        }

        console.log("ORDER:", order);
        console.log("ORDER ITEMS:", orderItems);

        const email = React.createElement(Send_order, {
          order,
          orderItems,
        });

        const emailHtml = await render(email);
        console.log("EMAIL HTML CREATED");

        const { data, error } = await resend.emails.send({
          from: fromAddress,
          to: toAddress,
          subject: "New Ordeya Order",
          html: emailHtml,
        });

        if (error) {
          console.error("RESEND ERROR:", error);
          return Response.json(
            { success: false, error: error.message },
            { status: 500 },
          );
        }

        console.log("EMAIL SENT:", data);
        return Response.json({ success: true, data });
      } catch (error) {
        console.error("FUNCTION ERROR:", error);
        return Response.json(
          {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 },
        );
      }
    },
  ),
};