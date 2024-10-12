import React from 'react'
import { GridCardData } from './GridCardData'

type Props = {}

const GridCard = (props: Props) => {
  return (
    <div><div className="min-h-screen bg-gradient-to-br bg-slate-900">
    <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">We showcase top-tier listings across residential and commercial segments</h1>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {GridCardData?.map((cardData , i)=>{
                return(
                    <div className="bg-white rounded-lg shadow-md p-6" key={i} >
                    <h2 className="text-xl font-bold text-purple-900 mb-4">{cardData?.title}</h2>
                    <p className="text-gray-700">{cardData?.description}
                    </p>
                </div>

                )
            })}
          
        
        </div>
    </div>
</div></div>
  )
}

export default GridCard