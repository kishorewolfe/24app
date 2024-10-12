import React from 'react'
import AgentCards from '../components/agentcards/AgentCards'

type Props = {}

const page = (props: Props) => {
  return (
    <div><div className="bg-gray-900 py-20 mt-20">
    <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 lg:w-2/3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
                    Welcome  <br className="hidden md:block" />
                    <span className="text-indigo-500">Developers</span> 
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
                    We create beautiful and functional websites for businesses of all sizes.
                </p>
                <div className="flex gap-2">
                    <a href="#" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md">Get
                        Started
                    </a>
                    <a href="#" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md">Learn
                        More
                    </a>
                </div>
            </div>
            <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
                <img src="https://via.placeholder.com/500x500" alt="Hero Image" className="rounded-lg shadow-lg" />
            </div>
        </div>
    </div>
</div>
<AgentCards></AgentCards>
</div>
  )
}

export default page