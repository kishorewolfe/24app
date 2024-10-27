import React from "react";

type Props = {};

const StoriesGrid = (props: Props) => {
  const backgroundImageStyle = {
    backgroundImage: `url('https://media.gettyimages.com/photos/at-the-the-network-tolo-televised-debate-dr-abdullah-abdullah-with-picture-id1179614034?k=6&m=1179614034&s=612x612&w=0&h=WwIX3RMsOQEn5DovD9J3e859CZTdxbHHD3HRyrgU3A8=')`,
  };
  // const items = [1,2,3,4]
  const items = [
    {
      id: 1,
      describe: "For You",
      backgroundImage: `url('/assets/popular/madurai.jpeg')`,
      content:"Based on your Intreast"

    },
    {
      id: 2,
      describe: "Chennai",
       backgroundImage: `url('/assets/popular/chennai.jpg')`,
      content:"Based on your Intreast"
    },
    {
      id: 3,
      describe: "Coimbatore",
       backgroundImage: `url('/assets/popular/coimbatore.jpg')`,
      content:"Based on your Intreast"
    },
    {
      id: 4,
      describe: "Popular",
       backgroundImage: `url('/assets/popular/popular.png')`,
      content:"Based on your Intreast"
    },
  ];
  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-5 mt-24">
        <h1 className="mb-5 justify-start items-start flex text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-semibold border-blue-900  dark:text-gray-200">
          <span className="text-orange-500">
            {" "}
            We got more properties for You
          </span>{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-10">
          {items.map((item , i) => {
            return (
              <div className="relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center" style={{backgroundImage:item.backgroundImage}} key={i}>
                <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" ></div>
                <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
                  <a
                    href="#"
                    className="text-xs bg-blue-900 text-white px-5 py-2 uppercase hover:bg-orange-500 transition ease-in-out duration-500"
                  >
                    {item?.describe}
                  </a>
                  <div className="text-white font-regular flex flex-col justify-start">
                    <span className="text-3xl leading-0 font-semibold">25</span>
                    <span className="-mt-3">May</span>
                  </div>
                </div>
                <main className="p-5 z-10">
                  <a
                    href="#"
                    className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
                  >
                   {item?.content}
                  </a>
                </main>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoriesGrid;
