import Footer from "../components/Footer/Footer";

// ./src/components/TermsAndConditions.js
const TermsAndConditions = () => {
    return (
      <div className="bg-gray-50 py-12 px-8 sm:px-16 lg:px-32 mt-[120px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Terms and Conditions
        </h1>
  
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Introduction</h2>
            <p className="text-gray-600 mt-2">
              Welcome to <strong>24hectares.com</strong>, a B2B real estate marketplace for businesses. By using our platform, you agree to the following terms and conditions. If you do not agree, please refrain from using the platform.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> User Eligibility</h2>
            <p className="text-gray-600 mt-2">
              By registering on 24hectares.com, you affirm that you are a business or representative of a business. The platform is not intended for individual consumer use.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Account and Registration</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li>You agree to provide accurate and complete information during the registration process.</li>
              <li>You are responsible for maintaining the confidentiality of your account login information.</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Property Listings</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li>Listings must contain accurate information and must comply with applicable real estate laws and regulations.</li>
              <li>24hectares.com reserves the right to remove any listing that violates these terms.</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Payments</h2>
            <p className="text-gray-600 mt-2">
              All payments made on the platform are subject to our payment processing terms. Transaction fees may apply, and users are responsible for ensuring timely payments.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Intellectual Property</h2>
            <p className="text-gray-600 mt-2">
              All content, including logos, trademarks, and software used on this platform, is the property of 24hectares.com or our licensors.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Limitation of Liability</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li>24hectares.com is not liable for any errors or inaccuracies in property listings or for any direct or indirect losses incurred by users.</li>
              <li>We do not guarantee the accuracy or reliability of property details provided by users.</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Termination of Use</h2>
            <p className="text-gray-600 mt-2">
              We reserve the right to suspend or terminate your access to the platform for any violation of these terms or any illegal activities.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold text-gray-700"> Governing Law</h2>
            <p className="text-gray-600 mt-2">
              These terms are governed by the laws of [Your Jurisdiction]. Any disputes arising will be settled in accordance with local courts.
            </p>
          </div>
        </section>
        <Footer/>
      </div>
    );
  };
  
  export default TermsAndConditions;
  