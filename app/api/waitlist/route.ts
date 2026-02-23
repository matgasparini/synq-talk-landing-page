import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Send notification email via Resend (if API key is configured)
    // Otherwise, log the submission
    const resendApiKey = process.env.NOTIFY_EMAIL;
    const notifyEmail = process.env.NOTIFY_EMAIL || "contact@synq.talk";

    console.log("resendApiKey", resendApiKey);
    console.log("notifyEmail", notifyEmail);

    console.log(
      "obj",
      JSON.stringify({
        from: "Synq Talk <onboarding@synq.talk>",
        to: [notifyEmail],
        subject: `New Waitlist Signup: ${name}`,
        html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">New Waitlist Signup</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Name</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${email}</td>
            </tr>
            ${
              company
                ? `<tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Company</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${company}</td>
            </tr>`
                : ""
            }
            ${
              role
                ? `<tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Role</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${role}</td>
            </tr>`
                : ""
            }
          </table>
          <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">Sent from Synq Talk waitlist form</p>
        </div>
      `,
      })
    );

    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Synq Talk <onboarding@synq.talk>",
          to: [notifyEmail],
          subject: `New Waitlist Signup: ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
              <h2 style="color: #7C3AED;">New Waitlist Signup</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Name</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${email}</td>
                </tr>
                ${
                  company
                    ? `<tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Company</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${company}</td>
                </tr>`
                    : ""
                }
                ${
                  role
                    ? `<tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Role</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${role}</td>
                </tr>`
                    : ""
                }
              </table>
              <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">Sent from Synq Talk waitlist form</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Resend API error:", await emailResponse.text());
      }
    } else {
      // Log signup when no email service is configured
      console.log("[Waitlist Signup]", {
        name,
        email,
        company,
        role,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
