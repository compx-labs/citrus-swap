import { Input } from '@headlessui/react'
import { ASSET_INFO } from '../constants'

export interface SwapInputProps {
  assetId: number
}

export const SwapInput: React.FC<SwapInputProps> = ({ assetId }) => {
  return (
    <div className="w-full  rounded-full shadow-xl bg-orange-400 flex flex-col gap-4 p-4 border-4 border-lime-300">
      <div className="flex justify-between space-x-2">
        <img
          src={`/${ASSET_INFO[assetId].params.unitName}-logo.png`}
          className=""
          alt={ASSET_INFO[assetId].params.unitName}
          width={100}
          height={100}
        />
        <Input
          className="w-full font-fredoka rounded-full border-4 border-lime-300 text-4xl text-orange-400 text-right px-4"
          placeholder="0.00"
        />
      </div>
    </div>
  )
}
