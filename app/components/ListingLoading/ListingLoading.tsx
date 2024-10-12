import Link from 'next/link'
import React from 'react'

type Props = {}

const ListingLoading = (props: Props) => {
  return (
    <div><div className="bg-gray-100">
    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 ">Please Login To View Lisitngs!</h1>
            <p className="text-lg text-gray-600  text-center mb-12">
                24 Hectors members with valid subsscription able to see the Lisitngs 
            </p>
               <div className='text-center'>
               <Link  href="/login">
                <button className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50"><span className="z-10 pr-2">Click here to Login!</span><div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]"><div className="mr-3.5 flex items-center justify-center"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></div>
                </button>
                
                
                
                </Link>
               </div>
        </div>
    </div>
</div>
</div>
  )
}

export default ListingLoading