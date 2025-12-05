require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const testEmail = async () => {
  const firstName = "Aditya";
  const source = "Apna Project";
  const whatsappLink = "https://chat.whatsapp.com/KN5Pnx7GMuK917QPvS90Uk?mode=hqrt3";
  const projectName = source || "हमारी प्रॉपर्टी";

  const emailHtml = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>धन्यवाद - Apna Project</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                🏠 Apna Project
              </h1>
              <p style="color: #b8d4e8; margin: 10px 0 0 0; font-size: 14px;">
                Your Dream Home Awaits
              </p>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 30px 20px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                    <span style="font-size: 40px; color: #ffffff;">✓</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <h2 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                नमस्ते ${firstName} जी! 🙏
              </h2>
              <p style="color: #4a5568; margin: 0 0 15px 0; font-size: 16px; line-height: 1.8;">
                <strong>${projectName}</strong> में आपकी रुचि के लिए धन्यवाद!
              </p>
              <p style="color: #4a5568; margin: 0 0 15px 0; font-size: 16px; line-height: 1.8;">
                आपके द्वारा भरी गई जानकारी हमें मिल गई है।
              </p>
              <p style="color: #4a5568; margin: 0; font-size: 16px; line-height: 1.8;">
                हमारी टीम <strong>जल्द ही आपसे संपर्क करेगी</strong>।
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;">
            </td>
          </tr>

          <!-- WhatsApp CTA -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 15px;">
                📱 तुरंत अपडेट पाने के लिए हमारे WhatsApp ग्रुप से जुड़ें:
              </p>
              <a href="${whatsappLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
                <span style="vertical-align: middle;">💬 WhatsApp ग्रुप जॉइन करें</span>
              </a>
            </td>
          </tr>

          <!-- Features Section -->
          <tr>
            <td style="padding: 20px 40px 30px 40px; background-color: #f8fafc;">
              <h3 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
                ✨ हमारे साथ क्यों जुड़ें?
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 30px; margin-bottom: 8px;">🏆</div>
                    <p style="color: #4a5568; margin: 0; font-size: 13px;">विश्वसनीय बिल्डर</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 30px; margin-bottom: 8px;">💰</div>
                    <p style="color: #4a5568; margin: 0; font-size: 13px;">बेस्ट प्राइस</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 30px; margin-bottom: 8px;">🎯</div>
                    <p style="color: #4a5568; margin: 0; font-size: 13px;">प्राइम लोकेशन</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e3a5f; padding: 30px 40px; text-align: center;">
              <p style="color: #b8d4e8; margin: 0 0 10px 0; font-size: 14px;">
                धन्यवाद,<br>
                <strong style="color: #ffffff; font-size: 16px;">Team Apna Project</strong>
              </p>
              <p style="color: #7a9bb8; margin: 15px 0 0 0; font-size: 12px;">
                📍 Patna, Bihar | 📞 Contact us for more details
              </p>
              <p style="color: #5a7a98; margin: 15px 0 0 0; font-size: 11px;">
                © ${new Date().getFullYear()} Apna Project. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

        <!-- Unsubscribe Footer -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                यह ईमेल आपको भेजा गया है क्योंकि आपने हमारी वेबसाइट पर अपनी जानकारी सबमिट की है।
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    console.log("Sending test email...");
    const { data, error } = await resend.emails.send({
      from: "Apna Project <team@contact.apnaprojectpatna.com>",
      to: ["adityaanandofficial30102000@gmail.com"],
      replyTo: "team@contact.apnaprojectpatna.com",
      subject: "धन्यवाद! आपके विवरण प्राप्त हो गए हैं।",
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Error:", error);
      return;
    }

    console.log("✅ Email sent successfully!");
    console.log("Email ID:", data.id);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

testEmail();
