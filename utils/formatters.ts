const formatDateDD_MShort_YYYY = (dateStr: string) => {
    const date = new Date(dateStr)
  
    const formatted = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)
  
    return formatted;
  }

  const formatDateDDMMYYYY = (dateStr: string) => {
    const date = new Date(dateStr)
  
    const formatted = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  
    return formatted;
  }

  function convertMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

const formatToPrice = (num: number | undefined): string => {
    if(!num) return "$0.00";

    let price = num.toString();

    const integerLen = price.length

    let commaFormattedInt = ""

    if(integerLen < 4){
        return "$" + price + '.' + '00'  
    }
    
    commaFormattedInt = ',' + price.slice(-3)

    let iters = 0
    for (var i = integerLen - 4; i >= 0; i--) {
        iters++
        if (iters != 1 && iters % 2 !== 0) {
            commaFormattedInt = price.charAt(i) + ',' + commaFormattedInt
        } else {
            commaFormattedInt = price.charAt(i) + commaFormattedInt
        }
    }

    return "$" +commaFormattedInt + '.' + '00'
}

  export {
    formatDateDD_MShort_YYYY,
    formatDateDDMMYYYY,
    convertMinutesToHours,
    formatToPrice,
  }