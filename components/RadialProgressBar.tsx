
const getPopularity = (vote: number): number => {
    const popularity = Math.round(vote * 10)
    return popularity
  }

const RadialProgressBar = ({ voteAverage, radius, textSize, percentageSize  }: { 
    voteAverage: number;
    radius: number;
    textSize: string;
    percentageSize: string;
}) => {
    const percentage = voteAverage * 10;
  
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
      <div style={{ height: `${radius}px`, width: `${radius}px` }} className={`rounded-full bg-black flex justify-center items-center`}>
        <div style={{ height: `${radius - 3}px`, width: `${radius - 3}px` }} className={`relative`}>
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
            <div style={{ height: `${radius - 8}px`, width: `${radius - 8}px` }} className={`rounded-full bg-black`}></div>
          </div>
        </div>
        <div style={{fontSize: `${textSize}`}} className="absolute text-white font-bold  flex items-start justify-center">
          <h4>{getPopularity(voteAverage)}</h4>
          <p style={{fontSize: `${percentageSize}`}} className="mt-1">%</p>
        </div>
      </div>
    )
  }

  export default RadialProgressBar;