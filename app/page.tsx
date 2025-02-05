import { Input } from "@headlessui/react";
import Image from "next/image";
import { SwapInput } from "./components/swapInput";
import { Header } from "./components/header";
import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";

export default function Home() {
  return (
    <div className="">
      <Header />

      <div className="bg-gradient-to-br from-lime-300 to-amber-400 items-center justify-items-center min-h-screen w-full ">
      <div className=" flex flex-col w-full items-center  bg-gradient-to-b  from-orange-500 to-orange-400 p-4 shadow-xl">
            <h1 className="font-Bari text-4xl sm:text-6xl text-lime-400">Welcome to Citrus Swap</h1>
            <h2 className="font-Bari text-2xl sm:text-4xl text-lime-300">The ORA micro-DEX</h2>
          </div>
        <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start mt-10 ">
          
          <div className="mx-3 flex flex-col gap-3">
            <SwapInput tokenName="ORA" />
            <button className="w-full flex mx-auto justify-center">
              <ArrowsUpDownIcon className="w-12 h-12 text-lime-300 bg-orange-400 rounded-full border-4 border-lime-300 hover:border-orange-400 hover:text-orange-400 hover:bg-lime-300 hover:scale-150 ease-in-out transition-all" />
            </button>
            <SwapInput tokenName="ALGO" />
            <div className="flex w-full mx-auto justify-center">
              <button className="bg-lime-300 text-orange-400 text-3xl font-fredoka rounded-full px-6 py-2 w-1/2 hover:bg-orange-400 hover:text-lime-300 border-4 border-orange-400 hover:border-lime-300 shadow-xl">Swap</button>
            </div>
          </div>



        </main>
      </div>
    </div>
  );
}
