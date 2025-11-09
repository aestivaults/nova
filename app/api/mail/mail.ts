import { Resend } from "resend";

type FromAddressType =
  | "welcome"
  | "security"
  | "support"
  | "noreply"
  | "nft"
  | "transactions";

type FromAddresses = Record<FromAddressType, string>;

class AureusNovaEmailService {
  private resend: Resend;
  private fromAddresses: FromAddresses;
  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
    this.fromAddresses = {
      // welcome: "welcome@aureusnova.com",
      // security: "security@aureusnova.com",
      // support: "support@aureusnova.com",
      // noreply: "noreply@aureusnova.com",
      // nft: "nft@aureusnova.com",
      // transactions: "transactions@aureusnova.com",

      welcome: "onboarding@resend.dev",
      security: "onboarding@resend.dev",
      support: "onboarding@resend.dev",
      noreply: "onboarding@resend.dev",
      nft: "onboarding@resend.dev",
      transactions: "onboarding@resend.dev",
    };
  }

  /**
   * Send welcome email to new user (retrofitted with theme)
   */
  async sendWelcomeEmail({
    email,
    firstName,
  }: {
    email: string;
    firstName: string;
  }) {
    try {
      const fullName = `${firstName}`.trim();
      const result = await this.resend.emails.send({
        from: this.fromAddresses.welcome,
        to: email,
        subject: `Welcome to AureusNova, ${firstName}! 🚀`,
        html: `
 <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to AureusNova</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family:
        -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
        sans-serif;
      background-color: #f5f7fa;
      color: #1a1a1a;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
      "
    >
      <!-- Header -->
      <div
        style="
          background: linear-gradient(135deg, #6e00ff, #ba00ff);
          padding: 40px 20px;
          text-align: center;
        "
      >
        <h1 style="color: #ffffff; font-size: 28px; margin: 0">
          🚀 Welcome to AureusNova!
        </h1>
        <p style="color: #f0f0f0; font-size: 16px; margin-top: 8px">
          Your Art Crypto Journey Begins Here!
        </p>
      </div>

      <!-- Content -->
      <div style="padding: 30px">
        <h2 style="font-size: 22px; color: #1a1a1a">Hey ${fullName},</h2>
        <p
          style="font-size: 16px; color: #333; line-height: 1.6; margin: 20px 0"
        >
          Welcome to <strong>AureusNova</strong> — your gateway to the
          decentralized world of NFTs. You're now part of a growing movement of
          creators, collectors, and innovators.
        </p>

        <div
          style="
            margin: 30px 0;
            padding: 20px;
            background-color: #f9f9fb;
            border: 1px solid #eaeaea;
            border-radius: 10px;
          "
        >
          <h3 style="font-size: 18px; margin-bottom: 12px">
            Here's what you can do next:
          </h3>
          <ul style="padding-left: 20px; color: #555; font-size: 15px">
            <li>🖼️ Mint your first NFT with one click</li>
            <li>🔐 Access your personal wallet to hold your assets</li>
            <li>🌐 Explore your dashboard and NFT collections</li>
          </ul>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-top: 40px">
          <a
            href="https:/aureusnova.com/dashboard"
            style="
              background: linear-gradient(135deg, #6e00ff, #ba00ff);
              color: #ffffff;
              padding: 14px 32px;
              text-decoration: none;
              font-weight: 600;
              border-radius: 40px;
              display: inline-block;
            "
          >
            🔓 Access My Wallet
          </a>
        </div>

        <p
          style="
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #888;
          "
        >
          Need help?
          <a
            href="https:/aureusNova.com/support"
            style="color: #6e00ff; text-decoration: none"
            >Visit our Help Center</a
          >
        </p>
      </div>

      <!-- Footer -->
      <div
        style="
          background-color: #f0f2f5;
          text-align: center;
          padding: 20px;
          font-size: 13px;
          color: #666;
        "
      >
        <p style="margin: 4px 0">© 2025 AureusNova. All rights reserved.</p>
        <p style="margin: 4px 0">
          <a
            href="hhttps://nova-xi-coral.vercel.app/privacy"
            style="color: #6e00ff; text-decoration: none; margin: 0 10px"
            >Privacy</a
          >
          |
          <a
            href="hhttps://nova-xi-coral.vercel.app/terms"
            style="color: #6e00ff; text-decoration: none; margin: 0 10px"
            >Terms</a
          >
        </p>
      </div>
    </div>
  </body>
</html>

        `,
      });

      console.log(`✅ Welcome email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send welcome email:", error);
      throw error;
    }
  }

  /**
   * Send OTP verification email (retrofitted with theme)
   */
  async sendOTPVerification({
    email,
    firstName,
    otpCode,
    magicLink,
    expiresIn = 5,
  }: {
    email: string;
    firstName: string;
    otpCode: string;
    magicLink: string;
    expiresIn?: number;
  }) {
    try {
      const result = await this.resend.emails.send({
        from: this.fromAddresses.security,
        to: email,
        subject: "🔐 Your AureusNova Verification Code",
        html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Verification Code</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
        color: #1a202c;
        background: #f8fafc;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #0074ff, #00c3ff);
        padding: 30px 20px;
        text-align: center;
        color: #ffffff;
      }
      .header-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }
      .header h1 {
        font-size: 24px;
        margin-bottom: 4px;
        font-weight: 600;
      }
      .header p {
        opacity: 0.95;
        font-size: 14px;
      }
      .content {
        padding: 40px 30px;
        text-align: center;
      }
      .otp-container {
        background: #f1f5f9;
        border: 2px solid #cbd5e1;
        border-radius: 16px;
        padding: 30px;
        margin: 30px 0;
        position: relative;
      }
      .otp-code {
        font-size: 36px;
        font-weight: 800;
        letter-spacing: 8px;
        color: #1d4ed8;
        font-family: "Courier New", monospace;
        margin: 12px 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      .otp-copy {
        background: #0074ff;
        color: #ffffff;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      .otp-copy:hover {
        background: #005dcc;
        transform: translateY(-1px);
      }
      .security-notice {
        background: #fff7ed;
        border: 1px solid #fed7aa;
        border-radius: 8px;
        padding: 16px;
        margin: 24px 0;
        font-size: 14px;
        color: #7c2d12;
      }
      .security-notice ul {
        text-align: left;
        padding-left: 20px;
      }
      .security-notice li {
        margin: 4px 0;
      }
      .timer {
        background: #e0f2fe;
        border: 1px solid #bae6fd;
        color: #0369a1;
        padding: 12px;
        border-radius: 6px;
        font-weight: 600;
        margin: 16px 0;
      }
      .footer {
        background: #f1f5f9;
        padding: 24px 20px;
        text-align: center;
        border-top: 1px solid #e2e8f0;
      }
      .footer-links a {
        color: #0074ff;
        text-decoration: none;
        margin: 0 8px;
        font-size: 14px;
      }
      .support {
        color: #64748b;
        font-size: 12px;
        margin-top: 12px;
      }
      @media (max-width: 480px) {
        .otp-code {
          font-size: 28px;
          letter-spacing: 4px;
        }
        .content {
          padding: 30px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="header-icon">🔐</div>
        <h1>Two-Factor Authentication</h1>
        <p>Secure verification for ${firstName}</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <h2 style="margin-bottom: 8px; font-size: 20px">
          Your Verification Code
        </h2>
        <p style="margin-bottom: 24px; font-size: 16px; color: #4a5568">
          We've sent you this one-time code to verify your identity. Please enter it in the app to continue.
        </p>

        <!-- OTP Display -->
        <div class="otp-container">
          <div style="font-size: 14px; color: #334155; margin-bottom: 12px; font-weight: 500;">
            Your one-time code is:
          </div>
          <div class="otp-code">${otpCode}</div>
        </div>

        <!-- Magic Link -->
        <div class="timer">
          🔗 Or click on this link: <strong><a href="${magicLink}">${magicLink}</a></strong>
        </div>

        <!-- Expiry -->
        <div class="timer">
          ⏱️ This code expires in <strong>${expiresIn} minutes</strong>
        </div>

        <!-- Security Notice -->
        <div class="security-notice">
          <strong>🛡️ Security Reminder:</strong>
          <ul style="margin-top: 8px">
            <li>Never share this code with anyone</li>
            <li>Use it only in the official AureusNova app</li>
            <li>Code is valid for ${expiresIn} minutes only</li>
            <li>Contact support if you didn't request this code</li>
          </ul>
        </div>

        <div style="margin-top: 24px">
          <p style="font-size: 14px; line-height: 1.5; color: #4b5563;">
            Didn't request this code?
            <a href="hhttps://nova-xi-coral.vercel.app/security" style="color: #e53e3e; font-weight: 600;">
              Secure your account now
            </a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="font-size: 14px; margin-bottom: 12px; color: #334155;">
          Need help? Contact our 24/7 support team
        </p>
        <div class="footer-links">
          <a href="mailto:support@aureusnova.com">support@aureusnova.com</a>
          <a href="tel:+18885550123">+1 (888) 555-0123</a>
        </div>
        <div class="support">
          © 2025 AureusNova Inc. All rights reserved.
        </div>
      </div>
    </div>
  </body>
</html>
`,
      });

      console.log(`✅ OTP email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send OTP email:", error);
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail({
    email,
    firstName,
    resetToken,
    expiresIn = 60,
  }: {
    email: string;
    firstName: string;
    resetToken: string;
    expiresIn?: number;
  }) {
    try {
      const resetUrl = `https://nova-xi-coral.vercel.app/reset-password?token=${resetToken}`;
      const result = await this.resend.emails.send({
        from: this.fromAddresses.security,
        to: email,
        subject: "🔑 Reset Your AureusNova Password",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #f8faff; background: linear-gradient(135deg, #0a0b1e, #050614); }
                .container { max-width: 500px; margin: 0 auto; background: rgba(10, 11, 30, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
                .header { background: linear-gradient(135deg, #0074ff, #00c3ff); padding: 30px 20px; text-align: center; color: #f8faff; }
                .header-icon { font-size: 48px; margin-bottom: 12px; }
                .header h1 { font-size: 24px; margin-bottom: 4px; font-weight: 600; }
                .header p { opacity: 0.9; font-size: 14px; }
                .content { padding: 40px 30px; text-align: center; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #0074ff, #00c3ff); color: #f8faff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 24px 0; transition: all 0.3s ease; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 116, 255, 0.3); }
                .security-notice { 
                    background: rgba(255, 245, 245, 0.1); 
                    border: 1px solid rgba(254, 215, 215, 0.2); 
                    border-radius: 8px; 
                    padding: 16px; 
                    margin: 24px 0; 
                    font-size: 14px; 
                    color: #f8faff;
                }
                .timer { 
                    background: rgba(232, 245, 232, 0.1); 
                    border: 1px solid rgba(198, 246, 213, 0.2); 
                    color: #f8faff; 
                    padding: 12px; 
                    border-radius: 6px; 
                    font-weight: 600; 
                    margin: 16px 0;
                }
                .footer { background: rgba(5,6,20,0.8); padding: 24px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer-links a { color: #00c3ff; text-decoration: none; margin: 0 8px; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <div class="header-icon">🔑</div>
                    <h1>Password Reset Request</h1>
                    <p>For your AureusNova account</p>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 style="color: #f8faff; margin-bottom: 8px; font-size: 20px;">Hello ${firstName},</h2>
                    <p style="color: rgba(248,250,255,0.8); margin-bottom: 24px; font-size: 16px;">
                        We received a request to reset your password. If this wasn't you, please ignore this email or contact support.
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" class="cta-button">
                            Reset Password Now
                        </a>
                    </div>

                    <!-- Timer -->
                    <div class="timer">
                        ⏱️ This link expires in <strong>${expiresIn} minutes</strong>
                    </div>

                    <!-- Security Notice -->
                    <div class="security-notice">
                        <strong>🛡️ Security Tips:</strong>
                        <ul style="margin-top: 8px; text-align: left; padding-left: 20px;">
                            <li>Choose a strong, unique password</li>
                            <li>Enable two-factor authentication</li>
                            <li>Never share your credentials</li>
                            <li>Contact support if suspicious</li>
                        </ul>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p style="color: rgba(248,250,255,0.8); font-size: 14px; margin-bottom: 12px;">
                        Need help? Contact our 24/7 support team
                    </p>
                    <div class="footer-links">
                        <a href="mailto:support@aureusnova.com">support@aureusnova.com</a>
                        <a href="tel:+18885550123">+1 (888) 555-0123</a>
                    </div>
                    <p style="color: rgba(248,250,255,0.8); font-size: 12px; margin-top: 16px;">
                        © 2025 AureusNova Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
      });

      console.log(`✅ Password reset email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send password reset email:", error);
      throw error;
    }
  }

  /**
   * Send email change confirmation email
   */
  async sendEmailChangeConfirmationEmail({
    email,
    firstName,
    newEmail,
    confirmationToken,
    expiresIn = 60,
  }: {
    email: string;
    firstName: string;
    newEmail: string;
    confirmationToken: string;
    expiresIn?: number;
  }) {
    try {
      const result = await this.resend.emails.send({
        from: this.fromAddresses.security,
        to: email,
        subject: "📧 Confirm Your Email Change on AureusNova",
        html: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirm Email Change</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background-color: #f5f7fa;
        color: #1a1a1a;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #0074ff, #00c3ff);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .header h1 {
        font-size: 22px;
        margin-bottom: 6px;
      }
      .header p {
        font-size: 14px;
        opacity: 0.9;
      }

      .content {
        padding: 30px 24px;
        text-align: center;
      }
      .content h2 {
        font-size: 20px;
        margin-bottom: 16px;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 20px;
        color: #333333;
      }

      .code-box {
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 4px;
        padding: 16px 24px;
        background-color: #f0f4ff;
        color: #0074ff;
        border-radius: 8px;
        display: inline-block;
        margin: 20px 0;
        border: 1px solid #dce6f9;
      }

      .timer {
        font-size: 14px;
        color: #666;
        margin: 20px 0;
      }

      .footer {
        text-align: center;
        padding: 24px 20px;
        font-size: 13px;
        color: #888;
        border-top: 1px solid #eaeaea;
        background-color: #f9fafb;
      }

      .footer a {
        color: #0074ff;
        text-decoration: none;
        margin: 0 6px;
      }

      .notice {
        background-color: #fff4e5;
        color: #8a6d3b;
        border: 1px solid #ffe1b3;
        border-radius: 8px;
        padding: 12px;
        font-size: 14px;
        margin-top: 20px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Email Change Request</h1>
        <p>Verify your new email address</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <h2>Hello ${firstName},</h2>
        <p>
          You requested to change your email to <strong>${newEmail}</strong>.
          Enter the code below on the confirmation screen to complete your email
          change.
        </p>

        <div class="code-box">${confirmationToken}</div>

        <div class="timer">
          ⏱️ This code expires in <strong>${expiresIn} minutes</strong>
        </div>

        <div class="notice">
          <strong>🛡️ Security Notice:</strong>
          <ul style="margin: 8px 0 0 20px; padding-left: 0">
            <li>
              If you didn't request this change, please secure your account
              immediately.
            </li>
            <li>Do not share this code with anyone.</li>
            <li>Contact support if you notice unusual activity.</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        Need help?
        <a href="mailto:support@aureusnova.com">support@aureusnova.com</a> |
        <a href="tel:+18885550123">+1 (888) 555-0123</a>
        <div style="margin-top: 12px">
          © 2025 AureusNova Inc. All rights reserved.
        </div>
      </div>
    </div>
  </body>
</html>

        `,
      });

      console.log(`✅ Email change confirmation sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send email change confirmation:", error);
      throw error;
    }
  }

  /**
   * Send first NFT created email
   */
  async sendFirstNFTCreatedEmail({
    email,
    firstName,
    nftName,
    nftId,
    collectionName,
  }: {
    email: string;
    firstName: string;
    nftName: string;
    nftId: string;
    collectionName?: string;
  }) {
    try {
      const nftUrl = `https://nova-xi-coral.vercel.app/marketplace/${nftId}`;
      const result = await this.resend.emails.send({
        from: this.fromAddresses.nft,
        to: email,
        subject: "🎨 Congratulations on Your First NFT!",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>First NFT Created</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #f8faff; background: linear-gradient(135deg, #0a0b1e, #050614); }
                .container { max-width: 600px; margin: 0 auto; background: rgba(10, 11, 30, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0074ff, #00c3ff); padding: 40px 20px; text-align: center; color: #f8faff; }
                .header h1 { font-size: 32px; margin-bottom: 8px; font-weight: 700; }
                .content { padding: 40px 30px; }
                .greeting { font-size: 24px; color: #f8faff; margin-bottom: 20px; font-weight: 600; }
                .highlight { color: #00c3ff; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #0074ff, #00c3ff); color: #f8faff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 24px 0; transition: all 0.3s ease; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 116, 255, 0.3); }
                .footer { background: rgba(5,6,20,0.8); padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer-links a { color: #00c3ff; text-decoration: none; margin: 0 12px; font-weight: 500; }
                .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); margin: 30px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>🎨 Your First NFT is Live!</h1>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 class="greeting">Congratulations, ${firstName}!</h2>
                    
                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        You've just created your first NFT: <strong class="highlight">${nftName}</strong> in the ${collectionName} collection.
                        This is the start of your digital asset journey on AureusNova.
                    </p>

                    <div class="divider"></div>

                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Share it with the world, list it for sale, or add more to your collection!
                    </p>

                    <!-- Call to Action -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${nftUrl}" class="cta-button">
                            View Your NFT
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-links">
                        <a href="hhttps://nova-xi-coral.vercel.app/nft-guide">NFT Guide</a>
                        <a href="hhttps://nova-xi-coral.vercel.app/support">Support</a>
                    </div>
                    <p style="color: rgba(248,250,255,0.8); font-size: 14px; margin-top: 16px;">
                        © 2025 AureusNova Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
      });

      console.log(`✅ First NFT created email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send first NFT email:", error);
      throw error;
    }
  }

  /**
   * Send first collection created email
   */
  async sendFirstCollectionCreatedEmail({
    email,
    firstName,
    collectionName,
    collectionId,
  }: {
    email: string;
    firstName: string;
    collectionName: string;
    collectionId: string;
  }) {
    try {
      const collectionUrl = `https://nova-xi-coral.vercel.app/collections/${collectionId}`;
      const result = await this.resend.emails.send({
        from: this.fromAddresses.nft,
        to: email,
        subject: "🖼️ Your First NFT Collection is Ready!",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>First Collection Created</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #f8faff; background: linear-gradient(135deg, #0a0b1e, #050614); }
                .container { max-width: 600px; margin: 0 auto; background: rgba(10, 11, 30, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0074ff, #00c3ff); padding: 40px 20px; text-align: center; color: #f8faff; }
                .header h1 { font-size: 32px; margin-bottom: 8px; font-weight: 700; }
                .content { padding: 40px 30px; }
                .greeting { font-size: 24px; color: #f8faff; margin-bottom: 20px; font-weight: 600; }
                .highlight { color: #00c3ff; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #0074ff, #00c3ff); color: #f8faff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 24px 0; transition: all 0.3s ease; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 116, 255, 0.3); }
                .footer { background: rgba(5,6,20,0.8); padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer-links a { color: #00c3ff; text-decoration: none; margin: 0 12px; font-weight: 500; }
                .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); margin: 30px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>🖼️ First Collection Created!</h1>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 class="greeting">Great Job, ${firstName}!</h2>
                    
                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Your first NFT collection <strong class="highlight">${collectionName}</strong> has been successfully created.
                        Start adding NFTs and build your digital empire.
                    </p>

                    <div class="divider"></div>

                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Customize, promote, and monetize your collection with our tools.
                    </p>

                    <!-- Call to Action -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${collectionUrl}" class="cta-button">
                            View Your Collection
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-links">
                        <a href="hhttps://nova-xi-coral.vercel.app/collection-guide">Collection Guide</a>
                        <a href="hhttps://nova-xi-coral.vercel.app/support">Support</a>
                    </div>
                    <p style="color: rgba(248,250,255,0.8); font-size: 14px; margin-top: 16px;">
                        © 2025 AureusNova Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
      });

      console.log(`✅ First collection created email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send first collection email:", error);
      throw error;
    }
  }

  /**
   * Send deposit confirmation email with transaction records
   */
  async sendDepositConfirmationEmail({
    email,
    firstName,
    amount,
    currency,
    transactionId,
    transactionRecords, // array of {date, amount, status}
  }: {
    email: string;
    firstName: string;
    amount: string;
    currency: string;
    transactionId: string;
    transactionRecords: { date: Date; amount: number; status: string }[];
  }) {
    try {
      let recordsHtml = "";
      if (transactionRecords && transactionRecords.length > 0) {
        recordsHtml = `
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: rgba(255,255,255,0.05);">
                <th style="padding: 12px; text-align: left; color: #00c3ff;">Date</th>
                <th style="padding: 12px; text-align: left; color: #00c3ff;">Amount</th>
                <th style="padding: 12px; text-align: left; color: #00c3ff;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${transactionRecords
                .map(
                  (rec) => `
                <tr style="border-top: 1px solid rgba(255,255,255,0.1);">
                  <td style="padding: 12px; color: rgba(248,250,255,0.8);">${rec.date}</td>
                  <td style="padding: 12px; color: rgba(248,250,255,0.8);">${rec.amount}</td>
                  <td style="padding: 12px; color: rgba(248,250,255,0.8);">${rec.status}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `;
      }

      const result = await this.resend.emails.send({
        from: this.fromAddresses.transactions,
        to: email,
        subject: "💰 Deposit Confirmed on AureusNova",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Confirmation</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #f8faff; background: linear-gradient(135deg, #0a0b1e, #050614); }
                .container { max-width: 600px; margin: 0 auto; background: rgba(10, 11, 30, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0074ff, #00c3ff); padding: 40px 20px; text-align: center; color: #f8faff; }
                .header h1 { font-size: 32px; margin-bottom: 8px; font-weight: 700; }
                .content { padding: 40px 30px; }
                .greeting { font-size: 24px; color: #f8faff; margin-bottom: 20px; font-weight: 600; }
                .highlight { color: #00c3ff; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #0074ff, #00c3ff); color: #f8faff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 24px 0; transition: all 0.3s ease; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 116, 255, 0.3); }
                .footer { background: rgba(5,6,20,0.8); padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer-links a { color: #00c3ff; text-decoration: none; margin: 0 12px; font-weight: 500; }
                .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); margin: 30px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>💰 Deposit Successful!</h1>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 class="greeting">Hello ${firstName},</h2>
                    
                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Your deposit of <strong class="highlight">${amount} ${currency}</strong> (Transaction ID: ${transactionId}) has been confirmed and added to your balance.
                    </p>

                    <div class="divider"></div>

                    <h3 style="color: #f8faff; margin-bottom: 16px;">Recent Transactions</h3>
                    ${recordsHtml}

                    <!-- Call to Action -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://nova-xi-coral.vercel.app/wallet" class="cta-button">
                            View Your Wallet
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-links">
                        <a href="hhttps://nova-xi-coral.vercel.app/transactions-guide">Transactions Guide</a>
                        <a href="hhttps://nova-xi-coral.vercel.app/support">Support</a>
                    </div>
                    <p style="color: rgba(248,250,255,0.8); font-size: 14px; margin-top: 16px;">
                        © 2025 AureusNova Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
      });

      console.log(`✅ Deposit confirmation email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send deposit confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send withdrawal initiated email
   */
  async sendWithdrawalInitiatedEmail({
    email,
    firstName,
    amount,
    currency,
    transactionId,
    expectedTime = "24-48 hours",
    nextSteps,
  }: {
    email: string;
    firstName: string;
    amount: number;
    currency: string;
    transactionId: string;
    expectedTime?: string;
    nextSteps: string;
  }) {
    try {
      const result = await this.resend.emails.send({
        from: this.fromAddresses.transactions,
        to: email,
        subject: "📤 Withdrawal Request Received",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Initiated</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #f8faff; background: linear-gradient(135deg, #0a0b1e, #050614); }
                .container { max-width: 600px; margin: 0 auto; background: rgba(10, 11, 30, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0074ff, #00c3ff); padding: 40px 20px; text-align: center; color: #f8faff; }
                .header h1 { font-size: 32px; margin-bottom: 8px; font-weight: 700; }
                .content { padding: 40px 30px; }
                .greeting { font-size: 24px; color: #f8faff; margin-bottom: 20px; font-weight: 600; }
                .highlight { color: #00c3ff; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #0074ff, #00c3ff); color: #f8faff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 24px 0; transition: all 0.3s ease; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 116, 255, 0.3); }
                .footer { background: rgba(5,6,20,0.8); padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer-links a { color: #00c3ff; text-decoration: none; margin: 0 12px; font-weight: 500; }
                .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); margin: 30px 0; }
                .steps-list { list-style-type: none; padding-left: 0; }
                .steps-list li { margin: 12px 0; padding-left: 24px; position: relative; }
                .steps-list li:before { content: '✓'; position: absolute; left: 0; color: #00c3ff; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>📤 Withdrawal In Progress</h1>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 class="greeting">Hello ${firstName},</h2>
                    
                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Your withdrawal request for <strong class="highlight">${amount} ${currency}</strong> (Transaction ID: ${transactionId}) has been received.
                        We expect processing to take ${expectedTime}.
                    </p>

                    <div class="divider"></div>

                    <h3 style="color: #f8faff; margin-bottom: 16px;">What's Next?</h3>
                    <ul class="steps-list">
                        <li>Our team will review and process your request</li>
                        <li>You'll receive a confirmation email once completed</li>
                        <li>Funds will be transferred to your linked account</li>
                        ${nextSteps ? `<li>${nextSteps}</li>` : ""}
                    </ul>

                    <!-- Call to Action -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://nova-xi-coral.vercel.app/transactions" class="cta-button">
                            Track Your Withdrawal
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-links">
                        <a href="hhttps://nova-xi-coral.vercel.app/withdrawal-guide">Withdrawal Guide</a>
                        <a href="hhttps://nova-xi-coral.vercel.app/support">Support</a>
                    </div>
                    <p style="color: rgba(248,250,255,0.8); font-size: 14px; margin-top: 16px;">
                        © 2025 AureusNova Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
      });

      console.log(`✅ Withdrawal initiated email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send withdrawal initiated email:", error);
      throw error;
    }
  }

  /**
   * Send successful withdrawal email
   */
  async sendWithdrawalSuccessEmail({
    email,
    firstName,
    amount,
    currency,
    transactionId,
    completionDate,
  }: {
    email: string;
    firstName: string;
    amount: number;
    currency: string;
    transactionId: string;
    completionDate: string;
  }) {
    try {
      const result = await this.resend.emails.send({
        from: this.fromAddresses.transactions,
        to: email,
        subject: "✅ Withdrawal Completed Successfully",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Success</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #f8faff; background: linear-gradient(135deg, #0a0b1e, #050614); }
                .container { max-width: 600px; margin: 0 auto; background: rgba(10, 11, 30, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0074ff, #00c3ff); padding: 40px 20px; text-align: center; color: #f8faff; }
                .header h1 { font-size: 32px; margin-bottom: 8px; font-weight: 700; }
                .content { padding: 40px 30px; }
                .greeting { font-size: 24px; color: #f8faff; margin-bottom: 20px; font-weight: 600; }
                .highlight { color: #00c3ff; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #0074ff, #00c3ff); color: #f8faff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; margin: 24px 0; transition: all 0.3s ease; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 116, 255, 0.3); }
                .footer { background: rgba(5,6,20,0.8); padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer-links a { color: #00c3ff; text-decoration: none; margin: 0 12px; font-weight: 500; }
                .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); margin: 30px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>✅ Withdrawal Complete!</h1>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 class="greeting">Hello ${firstName},</h2>
                    
                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Your withdrawal of <strong class="highlight">${amount} ${currency}</strong> (Transaction ID: ${transactionId}) has been successfully processed on ${completionDate}.
                    </p>

                    <div class="divider"></div>

                    <p style="font-size: 16px; color: rgba(248,250,255,0.8); margin-bottom: 24px; line-height: 1.7;">
                        Funds should now be available in your linked account. If not, please check with your bank or contact support.
                    </p>

                    <!-- Call to Action -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://nova-xi-coral.vercel.app/transactions" class="cta-button">
                            View Transaction History
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-links">
                        <a href="hhttps://nova-xi-coral.vercel.app/withdrawal-guide">Withdrawal Guide</a>
                        <a href="hhttps://nova-xi-coral.vercel.app/support">Support</a>
                    </div>
                    <p style="color: rgba(248,250,255,0.8); font-size: 14px; margin-top: 16px;">
                        © 2025 AureusNova Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
      });

      console.log(`✅ Withdrawal success email sent to ${email}`);
      return result;
    } catch (error) {
      console.error("❌ Failed to send withdrawal success email:", error);
      throw error;
    }
  }
}

// Initialize service
const emailService = new AureusNovaEmailService(
  "re_N6N1U5fV_7tjHjAWMLBZNQWoE4xKqb4Jw"
);

export { emailService, AureusNovaEmailService };
