'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'

const navigation = [
    { name: 'Docs', href: '#' },
    { name: 'Liquidity', href: '#' },
    { name: 'Social', href: '#' },
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-3 flex max-w-7xl items-center justify-between ">
                <a href="#" className="">
                    <span className="sr-only">Citrus Swap</span>
                    <Image
                        src="/Citrus Swap.svg"
                        alt=""
                        width={300}
                        height={100}
                    />

                </a>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className=" inline-flex items-center justify-center rounded-md  text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars2Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12 items-center">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-lg font-Bari text-orange-400">
                            {item.name}
                        </a>
                    ))}
                    <button className="bg-orange-400 rounded-full font-Bari text-lime-300 px-6 py-2 text-2xl font-semibold shadow-lg">
                        Connect Wallet
                    </button>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="">
                            <span className="sr-only">Your Company</span>
                            <Image
                                src="/Citrus Swap.svg"
                                alt=""
                                width={300}
                                height={100}
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
