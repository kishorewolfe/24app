import { Button } from '@mui/material'
import React from 'react'
import Testimonials from './Testimonials'
import Plans from '../plans/Plans'
import Link from 'next/link'

type Props = {}

const AgentCards = (props: Props) => {
  return (
    <div>
      <div className="bg-gray-200 font-sans leading-normal tracking-normal">


<section>
    <Testimonials></Testimonials>
</section>

<section className="bg-gray-200 py-20">
    <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6"> Maximize your Value
            </h2>
            <p className="text-gray-600 mb-12 ">
            At 24Hectares, we enable agents to maximize the value of buying and selling real estate through our innovative primary and resale marketplaces.Agents gain access to genuine, curated listings, work with top builders and developers, and share project information seamlessly with their clients.


            </p>
        </div>
        <div className="flex flex-wrap -mx-4 mt-12">
            <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                    <div className="text-4xl font-bold text-blue-700 mb-4">01</div>
                    <h3 className="text-2xl font-bold mb-4">Get Great Matches
                    </h3>
                    <p className="text-gray-600 mb-4">Our platform provides high visibility and fast matches, helping you close deals quickly.</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                    <div className="text-4xl font-bold text-blue-700 mb-4">02</div>
                    <h3 className="text-2xl font-bold mb-4">Make Clients Happy
                    </h3>
                    <p className="text-gray-600 mb-4">Superior service ensures client satisfaction.

</p>
<br/>
                </div>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                    <div className="text-4xl font-bold text-blue-700 mb-4">03</div>
                    <h3 className="text-2xl font-bold mb-4">Close deals faster
                    </h3>
                    <p className="text-gray-600 mb-4">Efficient tools designed to streamline your workflow.</p>
                    <br/>

                </div>
            </div>
        </div>
    </div>
</section>
</div>
<section>
    <Plans></Plans>
    
</section>

<section>

</section>
  </div>
  )
}

export default AgentCards