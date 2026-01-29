import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for BLUEBERRYBYTES SERVICES FZCO",
};

export default function Terms() {
  return (
    <div className="bg-default min-h-screen">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="prose dark:prose-invert mx-auto">
          <h1>Terms and Conditions</h1>
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to BLUEBERRYBYTES SERVICES FZCO! These Terms and Conditions
            outline the rules and regulations for the use of BLUEBERRYBYTES
            SERVICES FZCO's Website, located at https://cal.blueberrybytes.com.
          </p>

          <h2>2. Acceptance of Terms</h2>
          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use BLUEBERRYBYTES SERVICES FZCO if
            you do not agree to take all of the terms and conditions stated on
            this page.
          </p>

          <h2>3. Cookies</h2>
          <p>
            We employ the use of cookies. By accessing BLUEBERRYBYTES SERVICES
            FZCO, you agreed to use cookies in agreement with the BLUEBERRYBYTES
            SERVICES FZCO's Privacy Policy.
          </p>

          <h2>4. License</h2>
          <p>
            Unless otherwise stated, BLUEBERRYBYTES SERVICES FZCO and/or its
            licensors own the intellectual property rights for all material on
            BLUEBERRYBYTES SERVICES FZCO. All intellectual property rights are
            reserved.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
