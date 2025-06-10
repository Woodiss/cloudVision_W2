import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="">
      <div className="lg:grid lg:grid-cols-2 lg:px-8 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col justify-center pb-8 max-w-md mx-auto sm:max-w-2xl sm:text-center lg:flex lg:px-0 lg:text-left">
          <h1 className="font-bold text-4xl mt-4 sm:text-6xl xl:text-6xl mb-5">
            <span className="text-amber-500  block">AI-powered-recipes</span>
            <span className="text-gray-900 text-nowrap inline-block">
              for everyday
            </span>
          </h1>
          <p className="text-lg font-medium mb-4">
            Upload a photo of your ingredients and get instant recipe
            suggestions powered by AI. Cook smarter with what you already have
            at home.
          </p>
          <Button
            asChild
            className="font-bold text-base px-6 py-3 h-fit lg:w-fit"
          >
            <Link href="/recipe">Get Started for Free</Link>
          </Button>
        </div>
        <div className="lg:relative lg:block hidden">
          <Image
            src="/fruits.svg"
            width={606}
            height={700}
            // sizes="min-h-[700px] h-full"
            // fill
            alt="Picture of the author"
          />
        </div>
      </div>
      <div className="bg-white w-full relative">
        <svg
          className="absolute top-0"
          viewBox="0 0 1920 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_115_121)">
            <path
              d="M-133.333 76C-133.333 76 291.221 47.6044 924.667 47.6044C1558.11 47.6044 1982.67 76 1982.67 76V0H-133.333V76Z"
              fill="#FFF7ED"
            />
          </g>
          <defs>
            <clipPath id="clip0_115_121">
              <rect width="1920" height="76" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="px-4 py-16 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
            recusandae eaque molestias provident asperiores, soluta quisquam
            repellendus maiores dolores fugiat cum vero veritatis amet quod
            accusantium quis necessitatibus modi at. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Esse recusandae eaque molestias
            provident asperiores, soluta quisquam repellendus maiores dolores
            fugiat cum vero veritatis amet quod accusantium quis necessitatibus
            modi at. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Esse recusandae eaque molestias provident asperiores, soluta
            quisquam repellendus maiores dolores fugiat cum vero veritatis amet
            quod accusantium quis necessitatibus modi at. Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Esse recusandae eaque molestias
            provident asperiores, soluta quisquam repellendus maiores dolores
            fugiat cum vero veritatis amet quod accusantium quis necessitatibus
            modi at. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Esse recusandae eaque molestias provident asperiores, soluta
            quisquam repellendus maiores dolores fugiat cum vero veritatis amet
            quod accusantium quis necessitatibus modi at. Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Esse recusandae eaque molestias
            provident asperiores, soluta quisquam repellendus maiores dolores
            fugiat cum vero veritatis amet quod accusantium quis necessitatibus
            modi at.
          </p>
        </div>
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1920 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_115_124)">
            <path
              d="M-133.333 -7.62939e-06C-133.333 -7.62939e-06 291.221 28.3956 924.667 28.3956C1558.11 28.3956 1982.67 -7.62939e-06 1982.67 -7.62939e-06V76H-133.333V-7.62939e-06Z"
              fill="#FFF7ED"
            />
          </g>
          <defs>
            <clipPath id="clip0_115_124">
              <rect
                width="1920"
                height="76"
                fill="white"
                transform="matrix(1 0 0 -1 0 76)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <footer className="max-w-7xl mx-auto flex items-center justify-center px-8 py-6 border-t border-t-gray-900/20">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} PicToPlate All rights reserved.
        </p>
        <div></div>
      </footer>
    </main>
  );
}
