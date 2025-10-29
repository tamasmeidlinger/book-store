import BlurText from "@/components/react-bits/blur-text";
import BestSellers from "@/components/best-sellers/best-sellers";
import Image from "next/image";

function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 gap-2 justify-items-center sm:place-items-center px-8 sm:grid-cols-2 sm:pt-10 max-w-6xl w-full">
          <div className="w-75 lg:w-80 flex flex-col justify-center items-center sm:items-start mb-7 mt-6">
            <BlurText
              text="Welcome To"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl lg:text-5xl"
            />
            <BlurText
              text="BookStore"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-6xl mb-2 lg:text-7xl"
              startDelay={500}
            />
          </div>
          <div className="w-75 h-75 lg:w-85 lg:h-85 content-center relative">
            <Image src="/books1.svg" alt="books" fill />
          </div>
        </div>
        <BestSellers />
      </main>
    </>
  );
}

export default Home;
