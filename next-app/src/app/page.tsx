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
            <span className="text-gray-900 text-nowrap inline-block">for everyday</span>
          </h1>
          <p className="text-lg font-medium mb-4">
            Upload a photo of your ingredients and get instant recipe suggestions powered by AI. Cook smarter with what you already have at home.
          </p>
          <Button asChild className="font-bold text-base px-6 py-3 h-fit lg:w-fit">
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
        <svg className="absolute top-0" viewBox="0 0 1920 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_115_121)">
            <path d="M-133.333 76C-133.333 76 291.221 47.6044 924.667 47.6044C1558.11 47.6044 1982.67 76 1982.67 76V0H-133.333V76Z" fill="#FFF7ED" />
          </g>
          <defs>
            <clipPath id="clip0_115_121">
              <rect width="1920" height="76" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="px-4 py-28 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <h1 className="font-bold text-4xl text-center mt-4 sm:text-6xl xl:text-6xl mb-8">
            <span className="text-gray-900  block">Smarter recipes</span>
            <span className="text-amber-500 text-nowrap inline-block">simpler pricing</span>
          </h1>
          <div className="mt-10 flex flex-col gap-y-6 sm:gap-x-6 lg:flex-row">
            <div className="flex w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200 lg:w-1/3 xl:p-10">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-x-4">
                  <h1 id="free" className="font-semibold text-2xl text-gray-900 leading-8">
                    2GB App
                  </h1>
                </div>
                <p className="mt-4 min-h-[3rem] text-gray-600 text-sm leading-6">Everything you need to start uploading!</p>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="font-bold text-4xl text-gray-900 tracking-tight">$0</span>
                <span className="font-semibold text-gray-600 text-sm leading-6">/month</span>
              </p>
             <Button asChild className="bg-white h-fit hover:bg-white mt-6 block rounded-md px-3 py-2 text-center font-semibold text-primary text-sm leading-6 ring-1 ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
            <Link href="/recipe">Get Started</Link>
          </Button>
             
              <div className="flex grow flex-col justify-between">
                <ul className="mt-8 space-y-3 text-gray-600 text-sm leading-6 xl:mt-10">
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    2GB of storage *
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    7 days of audit log retention
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Unlimited uploads and downloads
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    (Probably) cheaper than a cup of coffee
                  </li>
                </ul>
                <ul className="mt-6">
                  <li className="flex gap-x-3 text-gray-600 text-xs">* Storage shared between all apps</li>
                </ul>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200 lg:w-1/3 xl:p-10">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-x-4">
                  <h1 id="paid" className="font-semibold text-2xl text-gray-900 leading-8">
                    100GB App
                  </h1>
                </div>
                <p className="mt-4 min-h-[3rem] text-gray-600 text-sm leading-6">For those with teams or more than 2 gigs of files. $10/mo</p>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="font-bold text-4xl text-gray-900 tracking-tight">$10</span>
                <span className="font-semibold text-gray-600 text-sm leading-6">/month</span>
              </p>
              <a
                className="mt-6 block rounded-md px-3 py-2 text-center font-semibold text-primary text-sm leading-6 ring-1 ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                href="/sign-in"
              >
                Get Started
              </a>
              <div className="flex grow flex-col justify-between">
                <ul className="mt-8 space-y-3 text-gray-600 text-sm leading-6 xl:mt-10">
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    100GB of storage
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    30 days of audit log retention
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Regions
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Private Files
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200 lg:w-1/3 xl:p-10">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-x-4">
                  <h1 id="paid-usage" className="font-semibold text-2xl text-gray-900 leading-8">
                    Usage Based
                  </h1>
                </div>
                <p className="mt-4 min-h-[3rem] text-gray-600 text-sm leading-6">
                  Usage based pricing, starting at $25/mo for 250GB of included storage
                </p>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="font-bold text-4xl text-gray-900 tracking-tight">$25</span>
                <span className="font-semibold text-gray-600 text-sm leading-6">/month</span>
              </p>
              <a
                className="mt-6 block rounded-md px-3 py-2 text-center font-semibold text-primary text-sm leading-6 ring-1 ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                href="/sign-in"
              >
                Get Started
              </a>
              <div className="flex grow flex-col justify-between">
                <ul className="mt-8 space-y-3 text-gray-600 text-sm leading-6 xl:mt-10">
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    250GB of included storage
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    30 days of audit log retention
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    $0.08 per GB over 250GB
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Regions
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-6 w-5 flex-none text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Private Files
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <p>
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
          </p> */}
          <p className="muted-foreground mt-6 text-center font-mono text-amber-500 text-sm leading-8">All Prices in USD</p>
        </div>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1920 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_115_124)">
            <path
              d="M-133.333 -7.62939e-06C-133.333 -7.62939e-06 291.221 28.3956 924.667 28.3956C1558.11 28.3956 1982.67 -7.62939e-06 1982.67 -7.62939e-06V76H-133.333V-7.62939e-06Z"
              fill="#FFF7ED"
            />
          </g>
          <defs>
            <clipPath id="clip0_115_124">
              <rect width="1920" height="76" fill="white" transform="matrix(1 0 0 -1 0 76)" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <footer className="max-w-7xl mx-auto flex items-center justify-center px-8 py-6 border-t border-t-gray-900/20">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} PicToPlate All rights reserved.</p>
        <div></div>
      </footer>
    </main>
  );
}
