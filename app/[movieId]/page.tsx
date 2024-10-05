import MovieDetailsHero from "@/components/MovieDatailsHero";
import client from "@/data/client";
import { formatToPrice } from "@/utils/formatters";
import facebook from '@/public/svg/facebook.svg'
import x from '@/public/svg/x.svg'
import insta from '@/public/svg/instagram.svg'
import Image from "next/image";
import TopCastSection from "@/components/TopCastSection";
import Recommendations from "@/components/Recommendations";

export interface MovieDetailsProps {
    backdropImgUrl: string;
    posterImgUrl: string;
    title: string;
    originalTitle: string;
    tagline: string;
    voteAvg: number;
    status: string;
    runtime: number;
    budget: number;
    revenue: number;
    releaseDate: string;
    overview: string;
    genres: string[];
    originalLanguage: string,
}

const fetchMovieDetails = async (id: string): Promise<MovieDetailsProps | null> => {
    try {
        const response = await client.get(`/${id}`)

        const details = response.data;

        return {
            backdropImgUrl: details.backdrop_path,
            posterImgUrl: details.poster_path,
            title: details.title,
            originalTitle: details.original_title,
            tagline: details.tagline,
            voteAvg: details.vote_average,
            status: details.status,
            runtime: details.runtime,
            budget: details.budget,
            revenue: details.revenue,
            releaseDate: details.release_date,
            overview: details.overview,
            genres: details.genres.map((genre: { id: number, name: string }) => genre.name),
            originalLanguage: details.spoken_languages[0].english_name ?? 'English'
        }

    } catch (e) {
        console.log(e)
        return null
    }
}

export const revalidate = 36000

export async function generateStaticParams() {
    const response = await client.get('/popular', {
        params: {
            page: 1
        }
    })
    const movies = response.data.results

    return movies.map((movie: any) => ({
        movieId: String(movie.id)
    }))
}

export default async function MovieDetailPage({
    params: { movieId },
}: {
    params: { movieId: string };
}) {
    const details = await fetchMovieDetails(movieId);

    return (
        <>
            <ul
                className="h-12 w-full bg-white flex justify-center items-center gap-6 text-sm"
            >
                <li>Overview</li>
                <li>Media</li>
                <li>Fandom</li>
                <li>Share</li>
            </ul>

            <MovieDetailsHero
                props={details!}
            />

            <div className="mx-auto max-w-screen-xl py-8 grid grid-cols-1 lg:grid-cols-5 gap-5 px-4">

                <div className="col-span-1 lg:col-span-4">
                    <TopCastSection id={movieId} />

                    <hr className="my-6" />

                    <Recommendations id={movieId} />
                </div>

                <div className="col-span-1">
                    <div className="flex gap-3 mb-5">
                        <Image
                            src={facebook}
                            alt="fb"
                            className="h-7 w-7"
                        />
                        <Image
                            src={x}
                            alt="x"
                            className="h-7 w-7"
                        />
                        <Image
                            src={insta}
                            alt="insta"
                            className="h-7 w-7"
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <HeadingValueHolder
                            heading="Original Title"
                            value={details?.originalTitle}
                        />
                        <HeadingValueHolder
                            heading="Status"
                            value={details?.status}
                        />
                        <HeadingValueHolder
                            heading="Original Language"
                            value={details?.originalLanguage}
                        />
                        <HeadingValueHolder
                            heading="Budget"
                            value={formatToPrice(details?.budget)}
                        />
                        <HeadingValueHolder
                            heading="Revenue"
                            value={formatToPrice(details?.revenue)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const HeadingValueHolder = ({ heading, value }: { heading: string, value: string | number | undefined }) => {
    return (
        <div className="flex flex-col gap-0.5">
            <h1 className="font-bold">{heading}</h1>
            <p>{value ?? '-'}</p>
        </div>
    )
}