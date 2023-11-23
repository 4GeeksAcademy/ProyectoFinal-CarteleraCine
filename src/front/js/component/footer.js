import React from 'react'
import LogoEmpresa from '../../img/ROLLOPELI.png';


const Footer = () => {
    return (

        <footer className="dark-bg pt-4 mt-5" style={{ backgroundColor: "black", color: "white" }}>
            <div className="container mt-5 mb-3 dark-bg" style={{ height: "350px" }}>
                <div className="row">
                    <div className="col-md-4">
                        <h3>AFE MOVIES</h3>
                        <img src={LogoEmpresa} alt="Logo de Tu Empresa" className="logo" style={{ maxWidth: '100px', maxHeight: '70px' }} />
                    </div>
                    <div className="col-md-2">
                        <h3>Películas</h3>
                        <ul>
                            <li>Cartelera</li>
                            <li>Cinema 4D</li>
                            <li>CinéArts</li>
                            <li>Próximamente</li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h3>Programas</h3>
                        <ul>
                            <li>Programas</li>
                            <li>Eventos Privados</li>
                            <li>Películas Clásicas</li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h3>Tecnología</h3>
                        <ul>
                            <li>Cinema 4D</li>
                            <li>IMAX</li>
                            <li>RealD 3D</li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h3>Cuenta</h3>
                        <ul>
                            <li>Oportunidades</li>
                            <li>Referencias de Empleados</li>

                        </ul>
                    </div>

                </div>
            </div>
            <div className="row">
                <p className="text-center">&copy; 2023 AFE Movies. Todos los derechos reservados.¡Construido con Bootstrap 5.0!</p>
            </div>
        </footer >


    );
};

export default Footer;
