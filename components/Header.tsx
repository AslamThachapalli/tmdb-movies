"use client"

import Image from 'next/image';

import tmdbLogo from '@/public/svg/tmdb-logo.svg'
import plusIcon from '@/public/svg/plus-icon.svg'
import search from '@/public/svg/search.svg'
import footerLogo from '@/public/svg/footer-logo.svg'
import menuIcon from '@/public/svg/menu.svg'
import { useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid'

export default function Header() {
    const [smallScreen, setSmallScreen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [scrollToTop, setscrollToTop] = useState(true)
    let prevScroll: number = 0

    useEffect(() => {
        const handleResize = () => {
            const screenW = window.innerWidth;

            setSmallScreen(screenW < 960)
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            setscrollToTop(scrollY < prevScroll)
            prevScroll = window.scrollY
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [prevScroll])

    return (
        <div>
            <div
                className={`fixed w-full bg-[#032541] h-[64px] flex items-center z-50 transition-transform duration-500 ${scrollToTop ? 
                    "":
                    "-translate-y-[64px]"
                }`}
            >
                <div
                    className="relative w-full max-w-screen-xl px-10 xl:px-0 flex justify-between mx-auto items-center"
                >
                    {
                        smallScreen ?
                            <>
                                <Bars3Icon
                                    className='h-[22px] w-auto text-white'
                                    onClick={() => setToggle(!toggle)}
                                />
                                <Image
                                    src={footerLogo}
                                    alt='logo'
                                    className='absolute m-auto left-0 right-0 h-[40px] w-auto object-contain'
                                />
                            </> :
                            <div
                                className="flex gap-4 items-center justify-start"
                            >
                                <Image
                                    src={tmdbLogo}
                                    alt='logo'
                                    className='h-[20px] w-auto object-contain'
                                />

                                <ul className='flex gap-5 text-[16px] font-semibold text-white'>
                                    <li>
                                        Movies
                                    </li>
                                    <li>
                                        TV Shows
                                    </li>
                                    <li>
                                        People
                                    </li>
                                    <li>
                                        More
                                    </li>
                                </ul>
                            </div>
                    }

                    <div className='flex gap-6 items-center text-white font-semibold text-[16px] '>

                        {
                            smallScreen || <>
                                <Image
                                    src={plusIcon}
                                    alt='plus'
                                    className='h-[22px] w-[22px] object-contain'
                                />

                                <div
                                    className='border border-white rounded-sm px-0.5'
                                >
                                    <p className='font-medium text-white text-[14px]'>EN</p>
                                </div>

                                <p>Login</p>
                                <p>Join TMDB</p>
                            </>
                        }

                        <Image
                            src={search}
                            alt='search'
                            className='h-[28px] w-[28px] object-contain'
                        />
                    </div>
                </div>
            </div>

            <div className={`fixed top-0 left-0 z-40 w-full h-full flex transition-transform ${toggle ?
                "" :
                "-translate-x-full"
                }`}>
                <div className='bg-[#1D3B54]/95 backdrop-blur-sm flex-[0.85] flex flex-col items-start pt-[75px] px-8 '>
                    <ul className='font-bold text-white text-lg flex flex-col gap-1'>
                        <li>Movies</li>
                        <li>TV Shows</li>
                        <li>People</li>
                    </ul>

                    <ul className='mt-2 text-gray-400 font-semibold flex flex-col gap-1'>
                        <li>Contribution Bible</li>
                        <li>Discussions</li>
                        <li>Leaderboard</li>
                        <li>API</li>
                        <li>Support</li>
                        <li>About</li>
                    </ul>

                    <p className='mt-2 text-gray-400 font-semibold'>Login</p>
                </div>

                <div
                    onClick={() => setToggle(false)}
                    className='flex-[0.25] bg-black/25'
                ></div>
            </div>
        </div>

    )
}