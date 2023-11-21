import React from 'react'
import LogoMoviesImage from '../../img/FondoMovieCine2.png';


const Header = () => {
    return (
        <div className="card bg-dark text-white rounded-0">
             <img
                src={LogoMoviesImage}
                className="card-img"
                alt="logoMovies3"
                style={{ width: '100%', height: '25%', maxWidth: 'none' }}
            />
            <div className="card-img-overlay">
               
            </div>
        </div>
    )
}

export default Header