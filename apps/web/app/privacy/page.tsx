import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for BLUEBERRYBYTES SERVICES FZCO",
};

export default function Privacy() {
  return (
    <div className="bg-default min-h-screen">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="prose dark:prose-invert mx-auto">
          <h1>Privacy Policy</h1>
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p>
            BLUEBERRYBYTES SERVICES FZCO ("we," "our," or "us") is committed to
            protecting your privacy. This Privacy Policy explains how your
            personal information is collected, used, and disclosed by
            BLUEBERRYBYTES SERVICES FZCO.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, subscribe to our newsletter, or contact us for
            support. This information may include your name, email address, and
            other contact details.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services;</li>
            <li>Process transactions and send related information;</li>
            <li>
              Send you technical notices, updates, security alerts, and support
              and administrative messages;
            </li>
            <li>
              Respond to your comments, questions, and requests and provide
              customer service;
            </li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>
            We do not share your personal information with third parties except
            as described in this Privacy Policy or with your consent.
          </p>

          <h2>4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
            <br />
            BLUEBERRYBYTES SERVICES FZCO
            <br />
            https://cal.blueberrybytes.com
          </p>
        </div>
      </main>
    </div>
  );
}
