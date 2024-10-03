import client from "@/data/client"
import { posterImageBaseUrl } from "@/data/urls";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface TopCastProps {
    imgUrl: string;
    name: string;
    character: string;
}

const fetchTopCasts = async (id: string): Promise<TopCastProps[]> => {
    try {
        const response = await client.get(`/${id}/credits`)

        const casts = response.data.cast

        return casts.slice(0, 11).map((cast: any) => {
            return {
                imgUrl: cast.profile_path,
                name: cast.name,
                character: cast.character,
            }
        })
    } catch (e) {
        console.log(e)
        return []
    }
}

export default async function TopCastSection({ id }: { id: string }) {
    const casts = await fetchTopCasts(id);

    return (
        <div className="flex flex-col">
            <p className="font-semibold text-xl">Top Billed Cast</p>

            <div className="flex items-center gap-4 h-[340px] w-full overflow-x-scroll px-2">
                {
                    casts.map((cast, index) => (
                        <div 
                        key={`cast-${index}`}
                        className="h-[280px] min-w-[138px] rounded-lg overflow-hidden shadow-lg"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex-1">
                                    <img 
                                    src={`${posterImageBaseUrl}${cast.imgUrl}`}
                                    alt={cast.name}
                                    className="w-full h-full object-fill"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col items-start justify-start px-2 py-1">
                                    <h2 className="font-bold hover:text-gray-500 cursor-pointer">{cast.name}</h2>
                                    <p className="text-sm">{cast.character}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <div className="flex min-w-[138px] items-center gap-2 cursor-pointer hover:text-gray-500">
                    <p className="text-lg font-bold">View More</p>
                    <ArrowRightIcon className="h-4 w-4 font-bold"/>
                </div>
            </div>

            <p className="font-semibold text-lg hover:text-gray-500 cursor-pointe my-2">Full Cast & Crew</p>
        </div>
    )
}