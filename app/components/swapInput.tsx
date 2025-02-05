import { Input } from "@headlessui/react";
import Image from "next/image";

export interface SwapInputProps {
    tokenName: string;
}

export const SwapInput: React.FC<SwapInputProps> = ({
    tokenName
}) => {
    return (
        <div className="w-full  rounded-full shadow-xl bg-orange-400 flex flex-col gap-4 p-4 border-4 border-lime-300">
            <div className="flex justify-between space-x-2">
                <Image
                    src={`/${tokenName}-logo.png`}
                    className=""
                    alt={tokenName}
                    width={100}
                    height={100}
                    priority
                />
                <Input className="w-full font-fredoka rounded-full border-4 border-lime-300 text-4xl text-orange-400 text-right px-4" placeholder="0.00" />
            </div>
        </div>
    );
}
