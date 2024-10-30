import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { footerData } from './footerData';
import { useRouter } from 'next/navigation';
const Footer = () => {
    const router = useRouter()

    const redirectProperties = (district:any)=>{
        router.push(`/listing?district=${district}&search=true`)

    }
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-orange-500">About 24 Hectares</h4>
            <p className="text-sm mb-4">


            At 24 Hectares, we enable agents , Developers, Builders to maximize the value of buying and selling real estate through our innovative primary and resale marketplaces.


              
            </p>
            <br/>
            <Image src={"/assets/logo/logo.png"} alt={'24 Hectors'} height={80} width={80} ></Image>

          </div>

          {/* More from our Network */}
          <div>
            <h4 className="font-medium text-lg mb-4  text-orange-500 ">More from our Network</h4>
            <div className="flex flex-wrap gap-3 cursor-pointer">
              {['Agents', 'Builders', 'Developers'].map((name, index) => (
                <Link
                  key={index}
                  href={name.toLowerCase()}
                  className="text-sm text-gray-100 hover:text-orange-500"
                >
                  {name}
                </Link>
              ))}
            </div>
            {/* <div className="mt-4 flex space-x-4">
              <Image
                src="/assets/icons/google-play.png"
                alt="Google Play"
                width={130}
                height={40}
                priority
              />
              <Image
                src="/assets/icons/app-store.png"
                alt="App Store"
                width={130}
                height={40}
                priority
              />
            </div> */}
          </div>

          {/* Properties in India */}

         


          <div>
            <h4 className="font-medium text-lg mb-4  text-orange-500">Properties in India</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              {['Coimbatore', 'Madurai', 'Chennai', 'Kallakurichi', 
'Kanchipuram', 
'Kanyakumari', 
'Karur', 
'Krishnagiri' , 
'Madurai', 
'Nagapattinam', 
'Namakkal', 
'Nilgiris', ].map(
                (city, index) => (
                  <p key={index} onClick={(e)=>redirectProperties(city)} className="hover:text-orange-500 cursor-pointer">
                    {city}
                    {index < 12 && <span className="mx-1">|</span>}
                  </p>
                )
              )}
            </div>
          </div>

          {/* New Projects in India */}
          <div>
            <h4 className="font-medium text-lg mb-4  text-orange-500">New Projects in India</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              {['New Delhi', 'Mumbai', 'Chennai', 'Noida', 'Gurgaon', 'Bangalore', 'Ahmedabad'].map(
                (city, index) => (
                  <Link key={index} href="#" className="hover:text-orange-500">
                    New Projects in {city}
                    {index < 7 && <span className="mx-1"></span>}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* Sitemap and Footer Links */}
        <div className="border-t border-gray-300 mt-10 pt-6">
          <div className="flex flex-wrap justify-center space-x-6 text-sm mb-6">
            {footerData?.map(
              (link, index) => (
                <Link key={index} href={`${link.url}`} className="hover:text-orange-500">
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Disclaimer and Copyright */}
          {/* <p className="text-center text-xs text-gray-500">
            Disclaimer: 24 Hectares Realty Services Limited is only an intermediary offering its platform to advertise properties of Seller for a Customer/Buyer/User coming on its Website and is not and cannot be a party to or privy to or control in any manner any transactions between the Seller and the Customer/Buyer/User. All the offers and discounts on this Website have been extended by the respective advertisers.
          </p> */}
          <p className="text-center text-xs text-gray-500 mt-4">
            All Rights Reserved. © Copyright 2024.
          </p>
        </div>
      </div>

      {/* Bottom Bar with Social Media Icons */}
      <div className="bg-gray-800 py-4">
        <div className="flex justify-center space-x-6">
         24 Hectares  Limited.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
