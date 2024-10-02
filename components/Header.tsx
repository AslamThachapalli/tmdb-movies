import Image from 'next/image';

import tmdbLogo from '@/public/svg/tmdb-logo.svg'
import plusIcon from '@/public/svg/plus-icon.svg'
import search from '@/public/svg/search.svg'

export default function Header() {
    return (
        <div 
        className="w-full bg-[#032541] h-[64px] flex items-center"
        >
            <div
            className="w-full max-w-screen-2xl px-10 flex justify-between mx-auto items-center"
            >
                <div
                className="flex gap-4 items-center justify-start"
                >
                    <Image
                    src={tmdbLogo}
                    alt='logo'
                    className='h-[20px] object-contain'
                    />

                    <ul className='-ml-11 flex gap-5 text-[16px] font-semibold text-white'>
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

                <div className='flex gap-6 items-center text-white font-semibold text-[16px] px-8'>

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

                    <Image
                    src={search}
                    alt='search'
                    className='h-[28px] w-[28px] object-contain'
                    />
                </div>
            </div>
        </div>
    )
}