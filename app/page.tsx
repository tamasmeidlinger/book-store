import AppSidebar from "@/components/sidebar-components/AppSidebar";
import { ShoppingCart, Heart, CircleUser } from "lucide-react";
import Image from "next/image";
import BlurText from "@/components/react-bits/blur-text";

function Home() {
  return (
    <>
      <header className="border border-black flex p-3 justify-between">
        <div className="flex gap-3">
          <AppSidebar />
          <h1 className="font-bold text-lg">BookStore</h1>
        </div>
        <div className="flex gap-3">
          <Heart />
          <ShoppingCart />
          <CircleUser />
        </div>
      </header>
      <main className="max-w-4xl mx-auto lg:shadow">
        <div className="grid grid-cols-1 gap-2 justify-items-center sm:place-items-center px-8 sm:grid-cols-2 sm:pt-7">
          <div className="w-75 flex flex-col justify-center items-center sm:items-start mb-7 mt-6">
            <BlurText
              text="Welcome To"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl"
            />
            <BlurText
              text="BookStore"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-5xl mb-2"
              startDelay={500}
            />
            <p className="text-lg font-sans leading-6 text-center sm:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
              veniam impedit eligendi ut, fugiat tempora harum animi et odio
              esse!
            </p>
          </div>
          <div className="rounded-md w-75 h-75 overflow-hidden relative">
            <Image
              src="/cozy-book2.jpg"
              alt="cozy picture of book"
              fill
              className="object-cover object-center hidden sm:block"
            />
          </div>
        </div>
        <div></div>
      </main>
    </>
  );
}

export default Home;
