'use client'

import { MovieDetailsProps } from "@/app/[movieId]/page";
import { backdropImageBaseUrl, posterImageBaseUrl } from "@/data/urls";
import { convertMinutesToHours, formatDateDDMMYYYY } from "@/utils/formatters";
import RadialProgressBar from "./RadialProgressBar";
import {
    HeartIcon,
    BookmarkIcon,
    ListBulletIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import getBase64Image from "@/actions/base64Image";

const getAverageColorFromUrl = async (imgUrl: string): Promise<{ r: number, g: number, b: number } | null> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imgUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) {
                reject('Canvas not supported');
                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;

            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const { data } = imageData;

            let r = 0, g = 0, b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            const pixelCount = data.length / 4;
            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);

            resolve({ r, g, b });
        };

        img.onerror = () => {
            reject('Image load error');
        };
    });
};

export default function MovieDetailsHero({ props }: { props: MovieDetailsProps }) {
    const [smallScreen, setSmallScreen] = useState(false)
    const [bgColor, setBgColor] = useState({
        from: 'rgb(0, 0, 0)',
        to: 'rgb(0, 0, 0, 0.8)'
    })

    useEffect(() => {
        getBase64Image(`${posterImageBaseUrl}${props.posterImgUrl}`).then(url => {
            getAverageColorFromUrl(url).then((color) => {
                if (color) {
                    setBgColor({
                        from: `rgb(${color.r}, ${color.g}, ${color.b})`,
                        to: `rgb(${color.r}, ${color.g}, ${color.b}, 0.8)`
                    })

                }
            }).catch(error => {
                console.error('avg color calculation failed', error);
            });
        })

    }, [])

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setSmallScreen(width < 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="relative w-full">
            <div className="absolute -z-10 w-full h-full overflow-hidden">
                <div
                    style={{
                        background: `linear-gradient(to right, ${bgColor.from}, ${bgColor.to})`
                    }}
                    className="hidden lg:block w-full h-full absolute z-20 transition-colors">
                </div>

                <div className="lg:w-auto w-full lg:aspect-auto aspect-[2/1.5] flex lg:justify-end absolute z-10 lg:right-0">
                    <img
                        src={`${backdropImageBaseUrl}${props.backdropImgUrl}`}
                        className="max-w-screen-xl h-full"
                    />
                    <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-white opacity-90"></div>
                </div>
            </div>

            <div className="relative mx-auto max-w-screen-xl lg:px-10 lg:py-8 xl:px-0 grid grid-cols-1 lg:grid-cols-4 lg:gap-12 text-white">
                <div
                    className="col-span-1 h-auto m-6 lg:h-[450px] w-[30%] lg:w-full rounded-lg overflow-hidden">
                    <img
                        src={`${posterImageBaseUrl}${props.posterImgUrl}`}
                        alt="poster"
                        className="w-full h-full object-fill"
                    />
                </div>

                <div
                    style={{
                        background: `${smallScreen ? bgColor.from : 'transparent'}`
                    }}
                    className={`lg:col-span-3 flex flex-col items-center lg:items-start justify-center p-5 lg:p-0 lg:bg-transparent`}
                >
                    <p className="font-bold text-2xl sm:text-4xl">{props.title} <span className="font-semibold text-white/70">(2024)</span></p>
                    <div className="flex gap-1 text-sm">
                        <p>{formatDateDDMMYYYY(props.releaseDate)} (IN)</p>
                        <p className="font-black">·</p>
                        <ul className="flex">
                            {
                                props.genres.map((genre, index) => (
                                    <li key={`genre-${index}`}>{`${genre}`}&nbsp;</li>
                                ))
                            }
                        </ul>
                        <p className="font-black">·</p>
                        <p>{convertMinutesToHours(props.runtime)}</p>
                    </div>

                    <div className="mt-4 flex gap-3 items-center">
                        <RadialProgressBar
                            voteAverage={props.voteAvg}
                            radius={60}
                            textSize="1.3rem"
                            percentageSize="8px"
                        />
                        <p className="font-bold">User Score</p>
                    </div>

                    <div className="mt-4 flex gap-5 items-center">
                        <div className="rounded-full h-[48px] w-[48px] flex justify-center items-center bg-[#032541]">
                            <ListBulletIcon className="h-4 w-4" />
                        </div>

                        <div className="rounded-full h-[48px] w-[48px] flex justify-center items-center bg-[#032541]">
                            <HeartIcon className="h-4 w-4" />
                        </div>

                        <div className="rounded-full h-[48px] w-[48px] flex justify-center items-center bg-[#032541]">
                            <BookmarkIcon className="h-4 w-4" />
                        </div>
                    </div>

                    <div>
                        <div className="text-white/70 italic mt-8">
                            {props.tagline}
                        </div>

                        <h1 className="font-bold text-lg my-1">Overview</h1>
                        <p className="">{props.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}