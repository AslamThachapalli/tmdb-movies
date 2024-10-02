export default function Recommendations() {
    return (
        <div className="flex flex-col">
            <p className="font-semibold text-xl">Recommendations</p>

            <div className="flex items-center gap-4 h-[200px] w-full bg-green-50 overflow-x-scroll">
                <div className="h-[170px] min-w-[250px] flex flex-col gap-1">
                    <div className="w-full h-[140px] rounded-lg overflow-hidden shadow-lg">
                        <img 
                        src=""
                        alt=""
                        className="w-full h-full">
                        </img>
                    </div>

                    <div className="flex justify-between">
                        <p>Inside Out</p>
                        <p>76%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}