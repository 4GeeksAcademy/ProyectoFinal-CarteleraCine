import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Cadenas } from "./pages/cadenas";
import { Single } from "./pages/single";
import { Formulario } from "./pages/formulario"
import { EditarMultiplex } from "./pages/editarMultiplex"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "https://glowing-space-sniffle-9px5qxrxpr7c4x7-3001.app.github.dev/admin/multiplex/") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Cadenas />} path="/cadenas" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Formulario />} path="/formulario" />
                        <Route element={<EditarMultiplex />} path="/editarMultiplex" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
