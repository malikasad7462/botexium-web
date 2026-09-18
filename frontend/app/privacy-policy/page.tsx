"use client";

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last Updated: September 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>BOTEXIUM ("we," "our," "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
            <p className="mt-2">By using BOTEXIUM, you agree to the collection and use of information in accordance with this policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="font-medium text-white">Personal Information:</p>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>Name and email address</li>
              <li>Country of residence</li>
              <li>Wallet address (for Web3 features)</li>
              <li>Contact and account information</li>
            </ul>
            <p className="font-medium text-white mt-3">Automatically Collected Information:</p>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>To create and manage your account</li>
              <li>To process transactions</li>
              <li>To provide customer support</li>
              <li>To send you important updates</li>
              <li>To improve our services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Cookies</h2>
            <p>We use cookies to enhance your experience on our website. Cookies help us understand user behavior, remember preferences, and improve site performance.</p>
            <p className="mt-2">You can manage cookie preferences through your browser settings. However, disabling certain cookies may affect site functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            <p className="mt-2">However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Third-Party Services</h2>
            <p>We may share your information with trusted third-party service providers who assist us in operating our website and services.</p>
            <p className="mt-2">This includes blockchain networks, wallet providers, analytics services, and payment processors.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Your Rights</h2>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>Access, update, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: <a href="mailto:info@botexium.com" className="text-cyan-400 hover:underline">info@botexium.com</a></p>
            <p>Website: <a href="https://botexium.com" className="text-cyan-400 hover:underline">botexium.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}