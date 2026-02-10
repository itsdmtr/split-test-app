import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Split ("we," "our," or "us"). We respect your privacy and are committed to protecting
              your personal data. This privacy policy explains how we collect, use, and safeguard your
              information when you use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.1 Account Information</h3>
            <p className="mb-4">When you sign in with Google, we collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email address</li>
              <li>Name</li>
              <li>Profile picture</li>
              <li>Google account ID</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Usage Data</h3>
            <p className="mb-4">We automatically collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Redirect link creation and management data</li>
              <li>Click analytics (timestamps, variant distribution)</li>
              <li>Device and browser information</li>
              <li>IP addresses (anonymized)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.3 Cookies</h3>
            <p className="mb-4">We use cookies to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintain your login session</li>
              <li>Ensure consistent redirect behavior (session stickiness)</li>
              <li>Remember your preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide and maintain the Service</li>
              <li>Authenticate your account</li>
              <li>Display your redirect links and analytics</li>
              <li>Track redirect performance and statistics</li>
              <li>Improve our Service</li>
              <li>Communicate with you about your account</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored securely using Supabase (PostgreSQL database) with industry-standard
              encryption. We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
            <p className="mb-4">
              We do NOT sell, trade, or rent your personal information to third parties. We may share data
              with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Service Providers:</strong> Google (authentication), Supabase (database), Vercel
                (hosting)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>

            <h3 className="text-xl font-semibold mb-3 mt-4">Google OAuth</h3>
            <p className="mb-4">
              We use Google OAuth for authentication. Your use of Google services is subject to Google's
              Privacy Policy. We only access basic profile information necessary for account creation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">Analytics</h3>
            <p className="mb-4">
              Redirect analytics are collected and stored by us. This data includes anonymous click counts
              and variant distribution statistics. No personally identifiable information is collected from
              end users clicking your redirect links.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent</li>
              <li>Object to data processing</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, sign in to your account and manage your data, or contact us for
              assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
            <p className="mb-4">
              We retain your account data as long as your account is active. Analytics data is retained
              indefinitely to provide historical insights. You can delete your account and all associated
              data at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not intended for users under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you believe we have collected information from
              a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p className="mb-4">
              Your data may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of significant changes
              by posting the new policy on this page and updating the "Last updated" date. Continued use of
              the Service constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us
              through the information available on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. GDPR Compliance (EU Users)</h2>
            <p className="mb-4">
              If you are in the European Union, you have additional rights under GDPR including the right to
              lodge a complaint with a supervisory authority. We process your data lawfully based on:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Consent (authentication)</li>
              <li>Contract performance (providing the Service)</li>
              <li>Legitimate interests (analytics, service improvement)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              If you are a California resident, you have the right to request information about personal data
              we collect, use, and disclose. You also have the right to opt-out of the sale of personal
              information (we do not sell your data).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
