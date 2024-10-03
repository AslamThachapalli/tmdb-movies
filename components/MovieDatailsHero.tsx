import { MovieDetailsProps } from "@/app/[movieId]/page";
import { backdropImageBaseUrl, posterImageBaseUrl } from "@/data/urls";
import { convertMinutesToHours, formatDateDDMMYYYY } from "@/utils/formatters";
import RadialProgressBar from "./RadialProgressBar";
import {
    HeartIcon,
    BookmarkIcon,
    ListBulletIcon,
} from "@heroicons/react/24/solid";

export default function MovieDetailsHero({ props }: { props: MovieDetailsProps }) {
    return (
        <div className="relative w-full">
            <div className="absolute -z-10 w-full h-full overflow-hidden">
                <div className="hidden lg:block w-full h-full bg-gradient-to-r from-[#3109C4] to-[#3109C4]/80 absolute z-20">
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

                <div className="lg:col-span-3 flex flex-col items-center lg:items-start justify-center p-5 lg:p-0 bg-[#3109C4] lg:bg-transparent">
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