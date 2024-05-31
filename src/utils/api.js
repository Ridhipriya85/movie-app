import axios from "axios";

const BASE_URL = "http://www.omdbapi.com";
const OMDB_API_KEY = import.meta.env.VITE_APP_OMDB_API_KEY;

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                ...params,
                apikey: OMDB_API_KEY,  // Include the API key in the params
                ...url // Add the URL path if necessary, adjust according to your needs
            },
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
