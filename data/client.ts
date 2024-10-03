import axios from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'en-US',
    },
    headers: {
        'Accept': 'application/json',
    }
})

export default client;