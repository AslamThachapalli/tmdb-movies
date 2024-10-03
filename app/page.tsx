import Image from "next/image";

import arrowRight from '@/public/svg/arrow-right.svg'
import Link from "next/link";
import client from "@/data/client";
import { formatDateDD_MShort_YYYY } from "@/utils/formatters";
import { posterImageBaseUrl } from "@/data/urls";
import RadialProgressBar from "@/components/RadialProgressBar";

interface PopularMovieProps {
  id: number;
  title: string;
  imageUrl: string;
  voteAvg: number;
  releasedOn: string;
}

const fetchPopularMovies = async (): Promise<PopularMovieProps[]> => {
  try {
    const response = await client.get('/popular', {
      params: {
        page: 1
      }
    })
    const movies = response.data.results

    return movies.map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title,
        imageUrl: movie.poster_path,
        voteAvg: movie.vote_average,
        releasedOn: movie.release_date,
      }
    })

  } catch (e) {
    console.log(e)
    return []
  }
}

export default async function Home() {
  const movies = await fetchPopularMovies();

  return (
    <div className="mx-auto max-w-screen-xl py-7 px-10 xl:px-0">
      <h1 className="text-2xl font-semibold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div
              className="home-sidebar-toggle-button"
            >
              <h2 className="font-bold text-[16px]">Sort</h2>
              <Image
                src={arrowRight}
                alt="arrow"
                className="h-[16px] w-[16px]"
              />
            </div>

            <div
              className="home-sidebar-toggle-button"
            >
              <h2 className="font-bold text-[16px]">Where To Watch</h2>
              <Image
                src={arrowRight}
                alt="arrow"
                className="h-[16px] w-[16px]"
              />
            </div>

            <div
              className="home-sidebar-toggle-button"
            >
              <h2 className="font-bold text-[16px]">Filters</h2>
              <Image
                src={arrowRight}
                alt="arrow"
                className="h-[16px] w-[16px]"
              />
            </div>

            <button
              className="mt-2 h-[44px] w-full flex justify-center items-center rounded-full text-black/50 bg-black/10 font-semibold text-[18px]"
            >
              Search
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {
              movies.map((movie, index) => (
                <div className="col-span-1">
                  <div
                    key={`movie-${index}`}
                    className="w-full rounded-xl shadow-lg border overflow-hidden">
                    <div className="grid grid-rows-5 h-full">
                      <Link
                        href={`/${movie.id}`}
                        className="row-span-4"
                      >
                        <img
                          src={`${posterImageBaseUrl}${movie.imageUrl}`}
                          alt="image"
                          className="object-contain" />
                      </Link>

                      <div className="relative row-span-1">
                        <div className="absolute left-2 -top-5">
                          <RadialProgressBar
                            voteAverage={movie.voteAvg}
                            radius={34}
                            textSize="0.8rem"
                            percentageSize="4px"
                          />
                        </div>

                        <div
                          className="absolute bottom-0 p-2 flex flex-col items-start"
                        >
                          <Link
                            className="text-sm font-bold hover:text-blue-500 leading-5"
                            href={`/${movie.id}`}
                          >
                            {movie.title}
                          </Link>
                          <p className="text-sm text-gray-500">{formatDateDD_MShort_YYYY(movie.releasedOn)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>


          <div
            className="col-span-5 w-full h-[50px] bg-[#00B4E3] flex items-center justify-center rounded-lg mt-6"
          >
            <a
              className="font-bold text-2xl text-white hover:text-black"
              href=""
            >
              Load More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}