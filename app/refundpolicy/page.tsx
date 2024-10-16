// ./src/components/RefundPolicy.js
const RefundPolicy = () => {
    return (
      <div className="bg-gray-50 py-12 px-8 sm:px-16 lg:px-32 mt-[110px]">
        {/* Main Heading */}
        <h1 className="text-6xl font-bold  text-orange-500 py-4 px-6 rounded mb-8 text-center">
          Refund Policy
        </h1>
  
        <section className="space-y-8">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-blue-900 py-2 px-4 rounded">
              Introduction
            </h2>
            <p className="text-gray-600 mt-2">
              The Refund Policy applies to users who purchase services, such as listing packages or marketing services, from <strong>24hectares.com</strong>.
            </p>
          </div>
  
          {/* Eligibility for Refunds */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-blue-900 py-2 px-4 rounded">
              Eligibility for Refunds
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li>Refunds are applicable only if a service purchased was not delivered or if there was an error in billing.</li>
              <li>Refund requests must be made within 14 days of the purchase date.</li>
            </ul>
          </div>
  
          {/* Non-Refundable Services */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-blue-900 py-2 px-4 rounded">
              Non-Refundable Services
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li>Any service marked as "Non-Refundable" at the time of purchase is not eligible for a refund.</li>
              <li>Fees related to completed transactions (such as property sales or purchases) are non-refundable.</li>
            </ul>
          </div>
  
          {/* How to Request a Refund */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-blue-900 py-2 px-4 rounded">
              How to Request a Refund
            </h2>
            <p className="text-gray-600 mt-2">
              To request a refund, please contact our customer service at <strong>[Email]</strong> with your order details and reason for the request. Our team will review the request within 7 business days.
            </p>
          </div>
  
          {/* Processing Refunds */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-blue-900 py-2 px-4 rounded">
              Processing Refunds
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
              <li>Approved refunds will be processed to the original payment method within 10 business days.</li>
              <li>Processing times may vary depending on your payment provider.</li>
            </ul>
          </div>
  
          {/* Changes to Refund Policy */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-blue-900 py-2 px-4 rounded">
              Changes to Refund Policy
            </h2>
            <p className="text-gray-600 mt-2">
              We reserve the right to update or modify this Refund Policy at any time without prior notice. Changes will be effective immediately upon being posted on the website.
            </p>
          </div>
        </section>
      </div>
    );
  };
  
  export default RefundPolicy;
  