import React from 'react'

type Props = {}

const Subscription = (props: Props) => {
  return (
    <div><div className="p-4 h-screen ">
    <div
        className="max-w-lg mx-auto rounded-lg overflow-hidden lg:max-w-none lg:flex my-10 shadow-teal border-4 border-cyan-800">
        <div className="bg-white px-6 py-8 lg:flex-shrink-1 lg:p-12">
            <h3
                className="text-2xl text-left leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9 ">
                Subscription
            </h3>
            <p className="mt-6 text-left font-ttnorms leading-8 text-gray-900 text-lg">The Team
                subscription grants your
                entire
                As a subscriber to our website, you'll have access to a wide range of exclusive benefits and perks.
            </p>
            <div className="mt-8">
                <div className="flex items-center">
                    <h4
                        className="flex-shrink-0 pr-4  text-sm leading-5 tracking-wider font-semibold uppercase text-cyan-900 ">
                        What's included
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <ul className="pl-0 mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 space-y-5 lg:space-y-0">
                    <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0"><svg className="h-5 w-5" style={{ color: '#FF8410' }}
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                        <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left">
                            Access to premium Listings and exclusive articles
                        </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0"><svg className="h-5 w-5" style={{ color: '#FF8410' }}
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                        <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left ">
                            Can view upto 7 properties
                        </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0"><svg className="h-5 w-5" style={{ color: '#FF8410' }}
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                        <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left ">
                             Access to All the seven Documents
                        </p>
                    </li>
                    <li className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0"><svg className="h-5 w-5" style={{ color: '#FF8410' }}
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                        <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left ">
                            Dedicated customer support
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div
            className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 dark:bg-gray-900">
            <p
                className="text-xl leading-6 font-medium text-gray-900 lg:max-w-xs lg:mx-auto mb-0 lg:mb-6 dark:text-gray-100">
                Currently Subscribed to Basic plan
            </p>
            <div
                className="my-10 lg:my-6 flex items-baseline justify-center text-5xl leading-none font-extrabold text-gray-900 dark:text-gray-100">
                <span className="font-brown">

                <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#d86c0e"/> </g>

</svg>
                    
                    </span>
            </div>
            <div className="lg:mt-6">
                <div className="rounded-md shadow">
                    <a href="#"
                        className="flex items-center justify-center px-5 py-3 leading-6 font-medium rounded-md focus:outline-none focus:ring transition duration-200 ease-in-out shadow-teal border-2 " style={{ backgroundColor: '#FF8410' }}>
                      Upgrade to Premium Plan

                    </a>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default Subscription