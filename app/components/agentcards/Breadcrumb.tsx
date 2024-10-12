import React from 'react'

type Props = {}

const Breadcrumb = (props: Props) => {
  return (
    <div><nav aria-label="Breadcrumb" role="navigation">
    <ul className="flex flex-wrap items-center my-1 px-10 pt-8 mt-20">
      <li className="inline-flex items-center">
        <a  aria-label="home" className="inline-flex items-center font-medium text-gray-700">
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"></path>
          </svg>
        </a>
      </li>
  
      <li className="flex items-center">
        <span className="px-1 text-lg text-gray-400">→</span>
        <a  className="font-medium text-gray-700">
         Agents
        </a>
      </li>
  
 
    </ul>
  </nav></div>
  )
}

export default Breadcrumb