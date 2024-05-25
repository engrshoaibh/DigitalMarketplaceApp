import React from 'react';
import Footer from './Footer';

const marketplaceName = "Shoaib's Marketplace";


function PrivacyPolicy() {
  return (
    <>
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Privacy Policy
        </h2>
        <div className="text-left text-gray-800 bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-6 lg:px-24">
          <p className="text-lg mb-6">
            At {marketplaceName}, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our services.
          </p>
          <p className="text-lg mb-6">
            <span className="font-bold">Information Collection and Use:</span> We collect and use personal information for the purpose of providing and improving our services. This may include your name, email address, contact information, and transaction details.
          </p>
          <p className="text-lg mb-6">
            <span className="font-bold">Data Security:</span> We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="text-lg mb-6">
            <span className="font-bold">Data Retention:</span> We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
          <p className="text-lg mb-6">
            <span className="font-bold">Third-Party Services:</span> We may use third-party services to facilitate our services, and these services may have their own privacy policies governing the use of your information.
          </p>
          <p className="text-lg mb-6">
            <span className="font-bold">Changes to Privacy Policy:</span> We reserve the right to update or modify this Privacy Policy at any time, and any changes will be effective immediately upon posting.
          </p>
          <p className="text-lg">
            By using our services, you consent to the terms of this Privacy Policy. If you have any questions or concerns about our Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default PrivacyPolicy;
