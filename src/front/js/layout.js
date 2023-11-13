import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import  Home  from "./pages/Home.jsx";
import { City} from "./pages/city";

// import {Map} from "./Map"; 


import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import  Navbar  from "./component/Navbar.jsx";
import Footer  from "./component/Footer.jsx";
import HeaderCarrusel from "./component/HeaderCarrusel.jsx";

//create your first componentN
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                  
                    <Routes>
            <Route
              path="/"
              element={
                
                 
                  <Home />
               
              }
            />
            <Route path="/ciudades" element={<City />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
