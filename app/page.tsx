import axios from "axios";
import Image from "next/image";

import arrowRight from '@/public/svg/arrow-right.svg'

interface PopularMovieProps {
  title: string;
  imageUrl: string;
  voteAvg: number;
  releasedOn: string;
}

const fetchPopularMovies = async (): Promise<PopularMovieProps[]> => {
  const api = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  try {
    const response = await axios.get(api, {
      headers: {
        'Accept': 'application/json',
      }
    })
    const movies = response.data.results

    return movies.map((movie: any) => {
      return {
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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)

  return formatted;
}

const getPopularity = (vote: number): number => {
  const popularity = Math.round(vote * 10)
  return popularity
}

export default async function Home() {
  const movies = await fetchPopularMovies();

  return (
    <div className="mx-auto max-w-screen-xl py-7 px-10 xl:px-0">
      <h1 className="text-2xl font-semibold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-2">
          <div className="flex flex-col gap-4">
            <div
              className="border shadow-md w-full p-4 h-[50px] rounded-lg flex justify-between items-center"
            >
              <h2 className="font-bold text-[16px]">Sort</h2>
              <Image
                src={arrowRight}
                alt="arrow"
                className="h-[16px] w-[16px]"
              />
            </div>

            <div
              className="border shadow-md w-full p-4 h-[50px] rounded-lg flex justify-between items-center"
            >
              <h2 className="font-bold text-[16px]">Where To Watch</h2>
              <Image
                src={arrowRight}
                alt="arrow"
                className="h-[16px] w-[16px]"
              />
            </div>

            <div
              className="border shadow-md w-full p-4 h-[50px] rounded-lg flex justify-between items-center"
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

        <div className="col-span-8 grid grid-cols-5 gap-6">
          {
            movies.map((movie, index) => (
              <div
                key={`movie-${index}`}
                className="col-span-1 min-h-[350px] w-[180px] rounded-xl shadow-lg border overflow-hidden">
                <div className="grid grid-rows-4 h-full">
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.imageUrl}`}
                    alt="image"
                    className="row-span-3 object-contain">
                  </img>

                  <div className="relative row-span-1">
                    <div className="absolute left-2 -top-5 h-[34px] w-[34px] rounded-full bg-black flex justify-center items-center">
                      <RadialProgressBar percentage={movie.voteAvg * 10} />
                      <div className="absolute text-white font-bold text-[0.8rem] flex items-start justify-center">
                        <h4>{getPopularity(movie.voteAvg)}</h4>
                        <p className="text-[4px] mt-1">%</p>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-0 p-2 flex flex-col items-start"
                    >
                      <a
                        className="text-sm font-bold hover:text-blue-500 leading-5"
                        href="/"
                      >
                        {movie.title}
                      </a>
                      <p className="text-sm text-gray-500">{formatDate(movie.releasedOn)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

          <div 
          className="col-span-5 w-full h-[50px] bg-[#00B4E3] flex items-center justify-center rounded-lg"
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

const RadialProgressBar = ({ percentage }: { percentage: number }) => {

  const getBarColor = (percent: number): { pathColor: string; activeColor: string } => {
    if (percent > 70) {
      return {
        pathColor: '#1F4529',
        activeColor: '#21D07A'
      }
    } else {
      return {
        pathColor: '#413D0F',
        activeColor: '#D2D432'
      }
    }
  }

  return (
    <div className="w-[31px] h-[31px] relative">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: `conic-gradient(
          ${getBarColor(percentage).activeColor} calc(${percentage} * 1%), /* Change the number to set the percentage */
          ${getBarColor(percentage).pathColor} calc(${percentage} * 1%)
        )`,
          borderRadius: '50%'
        }}
      >
        <div className="w-[26px] h-[26px] rounded-full bg-black"></div>
      </div>
    </div>
  )
}