/*
MIT License

Copyright (c) 2020 Tailwind Labs
Copyright (c) Jonathan Reinink <jonathan@reinink.ca>
Copyright (c) Tailwind Labs, Inc.
Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors
Copyright 2013 Andrey Sitnik <andrey@sitnik.ru>
Copyright (c) 2014-present Matt Zabriskie & Collaborators
Copyright (c) Taylor Otwell
Copyright (c) Facebook, Inc. and its affiliates.
Copyright (c) Tighten Co. <hello@tighten.co>
Copyright (c) 2024 Sergio Omar Ruiz Dia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// For the full license, see LICENSE.md in the project root.


import { faFacebookF, faGithub, faGoogle, faInstagram, faLinkedin, faTwitter, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars, faX, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from '@inertiajs/react';
import './Portfolio.css'
const Portfolio = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        telefono: '',
        correo: '',
        mensaje: '',
    });
    const [menuVisible, setMenuVisible] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false); // Nuevo estado para el mensaje de agradecimiento


    const mostrarOcultarMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const seleccionar = () => {
        setMenuVisible(false);
    };

    const efectoHabilidades = () => {
        const skills = document.getElementById("skills");
        const distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;

        if (distanciaSkills >= 300) {
            const habilidades = document.getElementsByClassName("progreso");
            habilidades[0].classList.add("nextjs");
            habilidades[1].classList.add("htmlcss");
            habilidades[2].classList.add("react");
            habilidades[3].classList.add("nodejs");

        }
    };

    useEffect(() => {
        window.addEventListener('scroll', efectoHabilidades);
        return () => {
            window.removeEventListener('scroll', efectoHabilidades);
        };
    }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente



    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('send-message'), {  // Asegúrate de que la ruta 'send-message' esté definida en tu archivo de rutas de Laravel
            onSuccess: () => {
                setShowThankYou(true);
                // Oculta el mensaje después de 3 segundos
                setTimeout(() => {
                    setShowThankYou(false);
                }, 5000);
                // Reset the form data if needed
                reset();
            },
            onError: (error) => {
                console.error('Error sending message:', error);
            },
        });
    };
    return (
        <>

            <div className="contenedor-header">
                <header>
                    <div className="logo">
                        <a href="#">Sergio</a>
                    </div>
                    <nav id="nav" className={menuVisible ? 'responsive' : ''}>
                        <ul>
                            <li><a href="#inicio" onClick={seleccionar}>INICIO</a></li>
                            <li><a href="#sobremi" onClick={seleccionar}>SOBRE MI</a></li>
                            <li><a href="#skills" onClick={seleccionar}>CONOCIMIENTOS</a></li>

                            <li><a href="#portfolio" onClick={seleccionar}>PORTFOLIO</a></li>
                            <li><a href="#contacto" onClick={seleccionar}>CONTACTO</a></li>
                        </ul>
                    </nav>
                    <div className="nav-responsive" onClick={mostrarOcultarMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </header>
            </div>
            <section id="inicio" className="inicio">
                <div className="contenido-banner">
                    {showThankYou && (
                        <div style={{ width: '100vw', position: 'absolute', zIndex: '1000', top: '0px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#4BB543', color: 'white', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} className="mt-6 text-center font-semibold">
                            ¡Muchas gracias por comunicarte conmigo!
                        </div>
                    )}
                    <div className="contenedor-img">
                        <img src="/sergio.jpg" alt="" />
                    </div>
                    <h1>Sergio Ruiz Dia</h1>
                    <h2>Programador fullstack React/Next.js/Node.js</h2>
                    <div className="redes">
                        <a href="https://wa.me/1131116759" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
                        {/*<a href="#"> <FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#"> <FontAwesomeIcon icon={faXTwitter} /></a>*/}
                        <a href="mailto:sergioruizdia2019@gmail.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGoogle} /></a>
                        <a href="https://www.linkedin.com/in/sergio-ruiz-dia-69186722a/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </section>

            <section id="sobremi" className="sobremi">
                <div className="contenido-seccion">
                    <h2>Sobre Mí</h2>
                    <p style={{ fontSize: '1.2rem' }}><span style={{ fontSize: '1.5rem' }}>Hola, soy Sergio Ruiz Dia.</span> soy programador web fullstack <span>:)</span></p>

                    <div className="fila">
                        <div className="col">
                            <h3>Datos Personales</h3>
                            <ul>

                                <li>
                                    <strong>Edad</strong>
                                    37 años
                                </li>
                                <li>
                                    <strong>Nacionalidad</strong>
                                    argentino
                                </li>
                                <li>
                                    <strong>Teléfono</strong>
                                    15-3111-6759
                                </li>
                                <li>
                                    <strong>Email</strong>
                                    sergioruizdia2019@gmail.com
                                </li>
                                <li>
                                    <strong>Dirección</strong>
                                    Av. San martín, La Paternal
                                </li>

                            </ul>
                        </div>

                        <div className="col">
                            <h3>Intereses</h3>
                            <div className="contenedor-intereses">
                                <div className="interes">
                                    <i className="fa-solid fa-gamepad"></i>
                                    <span>JUEGOS</span>
                                </div>
                                <div className="interes">
                                    <i className="fa-solid fa-headphones"></i>
                                    <span>TENIS</span>
                                </div>
                                <div className="interes">
                                    <i className="fa-solid fa-plane"></i>
                                    <span>FUTBOL</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section id="skills" className="skills">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '100px',width:'100vw',justifyContent:'center',alignItems:'center' }} className="contenido-seccion">
                    <h2>Conocimientos</h2>

                    <div style={{width:'100vw',display:'flex',justifyContent:'center',gap:'30px'}} className="fila">
                    <div style={{ height: '20vh', width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',textAlign:'center', gap: '20px' }} className="col">
                            <h3 style={{ color: '#e56121' }}>FRONTEND</h3>
                            <div className="contenedor-intereses">
                                <div className="interes">
                                    <i className="fa-solid fa-gamepad"></i>
                                    <span>REACT</span>
                                </div>
                                <div className="interes">
                                    <i className="fa-solid fa-gamepad"></i>
                                    <span>NEXT.JS</span>
                                </div>
                 
                            </div>
                        </div>

                        <div style={{ height: '20vh', width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',textAlign:'center', gap: '20px' }} className="col">
                            <h3 style={{ color: '#e56121' }}>BACKEND</h3>
                            <div className="contenedor-intereses">
                                <div className="interes">
                                    <i className="fa-solid fa-gamepad"></i>
                                    <span>LARAVEL</span>
                                </div>
                                <div className="interes">
                                    <i className="fa-solid fa-gamepad"></i>
                                    <span>NODE.JS (básico)</span>
                                </div>
                 
                            </div>
                        </div>
                    </div>

                </div>
            </section>
       


            <section id="portfolio" className="portfolio">
                <div className="contenido-seccion">
                    <h2>PORTFOLIO</h2>
                    <div className="galeria">
                        <div className="proyecto">
                            <img src="/forum.png" alt="" />
                            <div className="overlay">
                                <h3>Diseño Creativo</h3>
                                <p>Fotografía</p>
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div className="fila" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <a href="https://sergioruizdiaweb.website/"
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#e56121',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '10px',
                                            gap: '20px',
                                            alignSelf: 'center',

                                        }}>
                                        <span style={{ fontSize: '1.5em', marginBottom: '5px', marginRight: '6px' }}>Pagina web</span>
                                     {/*   <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2em' }} />*/}
                                    </a>
                                </div>
                                <div className="fila" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                    <a href="https://github.com/nov4cs16/forum/tree/master"
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#e56121',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '10px',
                                            gap: '20px',
                                            alignSelf: 'center',
                                        }}>
                                        <span style={{ fontSize: '1.5em' }}>Código fuente</span>
                                        <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2em' }} />
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </section>

            <section id="contacto" className="contacto bg-gray-100">

                <div style={{ backgroundColor: '#E56121', height: 'max-content' }} className=" bg-white p-8 rounded-lg shadow-lg">
                    <h2 style={{ color: '#ffffff' }} className="text-2xl font-semibold text-gray-900 mb-6 text-center">Contact Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={data.nombre}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            />
                            {errors.nombre && <div className="text-red-500 mt-2">{errors.nombre}</div>}
                        </div>



                        <div className="mb-6">
                            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                                Mensaje
                            </label>
                            <textarea
                                name="mensaje"
                                id="mensaje"
                                value={data.mensaje}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 h-32"
                            />
                            {errors.mensaje && <div className="text-red-500 mt-2">{errors.mensaje}</div>}
                        </div>
                        <div className="flex justify-end mt-6">
                   
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </form>
                </div>

            </section>


            <footer>
                <a href="#inicio" className="arriba">
                    {/*<i className="fa-solid fa-arrow-up"></i>*/}
                    <FontAwesomeIcon icon={faArrowUp} />
                </a>
                {/*<div className="redes">
                    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-skype"></i></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i className="fa-solid fa-rss"></i></a>
                </div>*/}
            </footer>

        </>
    )

}

export default Portfolio;