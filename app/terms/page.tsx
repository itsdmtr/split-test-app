import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Split ("the Service"), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these Terms of Service, please do not
              use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Split provides a URL redirect service that allows users to create a single link that
              intelligently distributes traffic across multiple destination URLs. The Service includes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Creating redirect links with multiple destination URLs</li>
              <li>Setting custom traffic distribution percentages</li>
              <li>Tracking redirect analytics and statistics</li>
              <li>Managing active and paused redirects</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use the Service, you must create an account by signing in with Google. You are responsible
              for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring the accuracy of information provided</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="mb-4">You agree NOT to use the Service to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Redirect to malicious, harmful, or illegal content</li>
              <li>Distribute malware, viruses, or harmful code</li>
              <li>Engage in phishing, fraud, or deceptive practices</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Spam or send unsolicited communications</li>
              <li>Attempt to bypass or interfere with the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Content and Links</h2>
            <p className="mb-4">
              You are solely responsible for the destination URLs you create and the content they link to.
              We reserve the right to remove or disable any redirect link that violates these terms or is
              deemed inappropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
            <p className="mb-4">
              We strive to provide reliable service but do not guarantee uninterrupted access. The Service is
              provided "as is" without warranties of any kind. We reserve the right to modify, suspend, or
              discontinue the Service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              Split and its operators shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use or inability to use the Service. We are not
              responsible for the content or availability of destination URLs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Data and Analytics</h2>
            <p className="mb-4">
              We collect anonymous analytics data on redirect clicks and traffic distribution. This data is
              used solely to provide you with insights about your links. See our Privacy Policy for more
              details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your account and access to the Service at our sole
              discretion, without notice, for conduct that we believe violates these Terms of Service or is
              harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users of significant
              changes. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us through the
              information available on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
