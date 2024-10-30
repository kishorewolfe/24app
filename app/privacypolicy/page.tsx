import React from 'react'
import Footer from '../components/Footer/Footer'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='mt-[110px]'>
        
        <div className="bg-gray-50 py-12 px-8 sm:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Privacy Policy
      </h1>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Introduction</h2>
          <p className="text-gray-600 mt-2">
            Welcome to <strong>24hectares.com</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, contact details (email, phone number), business information, and payment details.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> IP address, browser type, access times, and referring websites.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>To provide our services, including facilitating property listings, buyer/seller communications, and transactions.</li>
            <li>To improve website functionality, optimize user experience, and enhance security.</li>
            <li>To send periodic communications (with consent) regarding promotions, new services, and market trends.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700">How We Share Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>We do not sell your data to third parties.</li>
            <li>We may share your information with trusted third-party service providers who assist in operating the website and conducting business.</li>
            <li>We may disclose information if required by law or to protect our rights.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Data Security</h2>
          <p className="text-gray-600 mt-2">
            We use appropriate data encryption, firewalls, and access control measures to ensure the security of your data.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Your Rights</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li><strong>Access:</strong> You can request a copy of your personal information.</li>
            <li><strong>Correction:</strong> You may update your information if it's inaccurate.</li>
            <li><strong>Deletion:</strong> You may request the deletion of your information in compliance with legal obligations.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Changes to this Policy</h2>
          <p className="text-gray-600 mt-2">
            We may update this policy periodically. The latest version will be available on our website, and significant changes will be communicated via email.
          </p>
        </div>
      </section>
    </div>

</div>
  )
}

export default page