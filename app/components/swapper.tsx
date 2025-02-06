'use client'

import { ArrowsUpDownIcon } from "@heroicons/react/16/solid"
import { SwapInput } from "./swapInput"
import { useEffect, useState } from "react"
import { ALGO_ASSET_ID, COMPX_API_URL, ORA_ASSET_ID } from "../constants"
import axios from "axios"


export const Swapper: React.FC = () => {

    const [swapFromAssetId, setSwapFromAssetId] = useState<number>(ORA_ASSET_ID)
    const [swapToAssetId, setSwapToAssetId] = useState<number>(ALGO_ASSET_ID)

    function onClickSwitchAssets() {
        const temp = swapFromAssetId
        setSwapFromAssetId(swapToAssetId)
        setSwapToAssetId(temp)
    };

    return (
        <div className="mx-3 flex flex-col gap-3">
            <SwapInput assetId={swapFromAssetId} />
            <button
                onClick={onClickSwitchAssets}
                className="w-full flex mx-auto justify-center">
                <ArrowsUpDownIcon className="w-12 h-12 text-lime-300 bg-orange-400 rounded-full border-4 border-lime-300 hover:border-orange-400 hover:text-orange-400 hover:bg-lime-300 hover:scale-150 ease-in-out transition-all" />
            </button>
            <SwapInput assetId={swapToAssetId} />
            <div className="flex w-full mx-auto justify-center">
                <button className="bg-lime-300 text-orange-400 text-3xl font-fredoka rounded-full px-6 py-2 w-1/2 hover:bg-orange-400 hover:text-lime-300 border-4 border-orange-400 hover:border-lime-300 shadow-xl">Swap</button>
            </div>
        </div>
    )
}
