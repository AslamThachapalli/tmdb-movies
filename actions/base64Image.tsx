'use server'

// This method is used to get away with the CORS error from tmdb api for image fetching.
const getBase64Image = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer(); 
    const buffer = Buffer.from(arrayBuffer); 

    const contentType = response.headers.get('content-type');
    return `data:${contentType};base64,` + buffer.toString('base64');
};


export default getBase64Image
