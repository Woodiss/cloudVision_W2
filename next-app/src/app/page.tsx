import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="mx-auto max-w-7xl ">
      <main className="lg:grid lg:grid-cols-2 lg:px-8 px-6">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-4xl sm:text-6xl xl:text-6xl mb-5">
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
          <Button asChild className="font-bold text-base px-6 py-3 h-fit w-fit">
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
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
