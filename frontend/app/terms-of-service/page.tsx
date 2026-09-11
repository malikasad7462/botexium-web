"use client";

import React from 'react';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last Updated: September 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>Welcome to BOTEXIUM. By using our website and services, you agree to comply with these Terms of Service.</p>
            <p className="mt-2">If you do not agree with these terms, please do not use our website or services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Definitions</h2>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li><span className="font-medium text-white">"We," "us," "our":</span> Refers to BOTEXIUM ecosystem.</li>
              <li><span className="font-medium text-white">"You," "user":</span> Refers to any individual using our services.</li>
              <li><span className="font-medium text-white">"Platform":</span> Refers to the BOTEXIUM website and ecosystem.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Account Registration</h2>
            <p>To access certain features, you must create an account. You agree to provide accurate and complete information.</p>
            <ul className="list-disc list-inside ml-4 text-gray-400 mt-2">
              <li>You are responsible for maintaining account security</li>
              <li>You must notify us immediately of unauthorized access</li>
              <li>You must be at least 18 years old to use our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate others or provide false information</li>
              <li>Attempt to hack, disrupt, or harm our platform</li>
              <li>Use our platform for fraudulent or malicious purposes</li>
              <li>Share malicious code, viruses, or harmful content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>All content on BOTEXIUM, including text, graphics, logos, and code, is protected by intellectual property laws. You may not copy, distribute, or reproduce our content without prior written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. BOXM Token and Purchases</h2>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li>BOXM tokens are utility tokens for use within the BOTEXIUM ecosystem</li>
              <li>Token purchases are non-refundable</li>
              <li>We do not guarantee any financial returns</li>
              <li>Tokens may be subject to lockup periods</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Disclaimers</h2>
            <p>Our platform and services are provided "as is" and "as available" without warranties of any kind.</p>
            <ul className="list-disc list-inside ml-4 text-gray-400 mt-2">
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>We are not responsible for any losses or damages</li>
              <li>Cryptocurrency investments carry inherent risks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time for violation of these terms or any illegal activity.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Changes to Terms</h2>
            <p>We may update these Terms of Service periodically. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="mt-2">Email: <a href="mailto:info@botexium.com" className="text-cyan-400 hover:underline">info@botexium.com</a></p>
            <p>Website: <a href="https://botexium.com" className="text-cyan-400 hover:underline">botexium.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}