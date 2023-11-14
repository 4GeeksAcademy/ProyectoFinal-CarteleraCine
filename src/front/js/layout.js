import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Movies } from "./pages/movies";
import { Showtimes } from "./pages/showtimes";
import { MovieInfo } from "./pages/movie_info";
import { MovieForm } from "./pages/movie_form";
import { ShowtimeForm } from "./pages/showtime_form";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Movies />} path="/" />
                        <Route element={<Showtimes />} path="/showtimes" />
                        <Route element={<MovieInfo />} path="/:movie_id" />
                        <Route element={<MovieForm opt="add" />} path="/Add" />
						<Route element={<MovieForm opt="edit" />} path="/Edit/:id" />
                        <Route element={<ShowtimeForm opt="add" />} path="/AddShowtime" />
						<Route element={<ShowtimeForm opt="edit" />} path="/EditShowtime/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
