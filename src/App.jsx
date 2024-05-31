import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import LoginModal from './components/loginModal/LoginModal';

function App() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    useEffect(() => {
        // Call to fetch genres, here it's a placeholder.
        genresCall();
        
        // Example call to fetch movie details by IMDb ID
        fetchMovieDetails("tt0111161");
    }, []);

    const fetchMovieDetails = async (imdbID) => {
        const data = await fetchDataFromApi({ i: imdbID });
        if(data.Response === "True") {
            console.log("Movie Details:", data);
        } else {
            console.error("Error fetching movie details:", data.Error);
        }
    };

    const genresCall = async () => {
        // Placeholder for fetching genres
        let allGenres = {
            Action: { id: "Action", name: "Action" },
            Comedy: { id: "Comedy", name: "Comedy" },
            Drama: { id: "Drama", name: "Drama" },
            // Add more genres as necessary
        };

        dispatch(getGenres(allGenres));
    };

    return (
        <BrowserRouter>
            <Header toggleModal={() => setShowModal(!showModal)} /> {/* Pass down toggleModal function */}
            {showModal && <LoginModal />} {/* Render LoginModal only when showModal is true */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
