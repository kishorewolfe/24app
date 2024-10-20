import React from 'react'

type Props = {}

const EachExploreCard = ({card}:any):any => {
  return (
    <div><div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
    <div className="relative">
      <img className="w-full" src={card.imgsrc} alt="Product Image" />
      <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
        Featured
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-medium mb-2">
       PRODUCT
      </h3>
      <p className="text-gray-600 text-sm mb-4">PRODUCT</p>
      <div className="flex items-center justify-between">
      <div className="flex mr-2">
  <img className="border-2 border-white rounded-full h-12 w-12 -mr-6" src="https://randomuser.me/api/portraits/men/32.jpg" alt=""/>
  <img className="border-2 border-white rounded-full h-12 w-12 -mr-6" src="https://randomuser.me/api/portraits/women/31.jpg" alt=""/>
  <img className="border-2 border-white rounded-full h-12 w-12 -mr-6" src="https://randomuser.me/api/portraits/men/33.jpg" alt=""/>
  <img className="border-2 border-white rounded-full h-12 w-12 -mr-6" src="https://randomuser.me/api/portraits/women/32.jpg" alt=""/>
  <img className="border-2 border-white rounded-full h-12 w-12 -mr-6" src="https://randomuser.me/api/portraits/men/44.jpg" alt=""/>
  <span className="flex items-center justify-center bg-white text-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-full h-12 w-12">+999</span>
</div>
        <button className="bg-blue-900 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
          Request Info
        </button>
      </div>
    </div>
  </div></div>
  )
}

export default EachExploreCard