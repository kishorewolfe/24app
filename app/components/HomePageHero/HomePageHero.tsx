import React from 'react'

type Props = {}

const HomePageHero = (props: Props) => {
  return (
    <div>      
        <section className=" ">
    <div className="grid max-w-screen-2xl px-1 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
      <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className=" text-black max-w-2xl  text-2xl font-extrabold leading-none tracking-tight md:text-2xl xl:text-2xl ">   The Ultimate Technology platform<br />       </h1>

        <h1 className=" text-black max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
       
      For Real Estate <br />
         
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        Our cutting-edge digital platform empowers agents, builders, and developers to offer clients superior choices and make faster decisions.{" "}
        </p>

      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          src="https://demo.themesberg.com/landwind/images/hero.png"
          alt="hero image"
        />
      </div>
    </div>
  </section></div>
  )
}

export default HomePageHero