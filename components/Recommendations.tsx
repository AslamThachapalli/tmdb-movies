import client from "@/data/client"
import { backdropImageBaseUrl } from "@/data/urls";
import { formatDateDDMMYYYY } from "@/utils/formatters";
import { 
    CalendarDaysIcon, 
    StarIcon,
    HeartIcon,
    BookmarkIcon,
} from "@heroicons/react/24/solid";

interface RecommendationProps {
    imgUrl: string;
    title: string;
    voteAvg: number;
    releaseDate: string;
}

const fetchRecommendations = async (id: string): Promise<RecommendationProps[]> => {
    try {
        const response = await client.get(`/${id}/recommendations`);

        const recommendations = response.data.results

        return recommendations.map((r: any) => {
            return {
                imgUrl: r.backdrop_path,
                title: r.title,
                voteAvg: r.vote_average,
                releaseDate: r.release_date,
            }
        })

    } catch (e) {
        console.log(e)
        return []
    }
}

const getPopularity = (vote: number): number => {
    const popularity = Math.round(vote * 10)
    return popularity
  }

export default async function Recommendations({ id }: { id: string }) {
    const recommendations = await fetchRecommendations(id)

    return (
        <div className="flex flex-col">
            <p className="font-semibold text-xl">Recommendations</p>

            <div className="flex items-center gap-4 h-[200px] w-full overflow-x-scroll px-2">
                {
                    recommendations.map((r, i) => (
                        <div
                            key={`recommendation-${i}`}
                            className="h-[170px] min-w-[250px] max-w-[250px] flex flex-col gap-1"
                        >
                            <div className="group relative w-full h-[140px] rounded-lg overflow-hidden shadow-lg border cursor-pointer">
                                <img
                                    src={`${backdropImageBaseUrl}${r.imgUrl}`}
                                    alt={`${r.title}`}
                                    className="w-full h-full">
                                </img>

                                <div className="absolute bottom-0 hidden group-hover:flex h-9 w-full bg-white/90 py-2 px-4  justify-between items-center text-sm">
                                    <div className="flex gap-1 items-center">
                                        <CalendarDaysIcon className="h-4 w-4"/>
                                        <p>{formatDateDDMMYYYY(r.releaseDate)}</p>
                                    </div>

                                    <div className="flex gap-1 items-center">
                                        <StarIcon className="h-4 w-4"/>
                                        <HeartIcon className="h-4 w-4"/>
                                        <BookmarkIcon className="h-4 w-4"/>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-nowrap text-ellipsis max-w-[220px] overflow-hidden">{r.title}</p>
                                <p>{`${getPopularity(r.voteAvg)}%`}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}