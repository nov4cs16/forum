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
import { faBars, faX,faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './Portfolio.css'
const Portfolio  = () => {

    const [menuVisible, setMenuVisible] = useState(false);

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
                            <li><a href="#skills" onClick={seleccionar}>SKILLS</a></li>
                         
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
                    <div className="contenedor-img">
                        <img src="/sergio.jpg" alt="" />
                    </div>
                    <h1>Sergio Ruiz Dia</h1>
                    <h2>Programador fullstack React/Next.js/Node.js</h2>
                    <div className="redes">
                        <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
                        <a href="#"> <FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#"> <FontAwesomeIcon icon={faXTwitter} /></a>
                        <a href="#"><FontAwesomeIcon icon={faGoogle} /></a>
                        <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </section>

            <section id="sobremi" className="sobremi">
                <div className="contenido-seccion">
                    <h2>Sobre Mí</h2>
                    <p style={{fontSize:'1.2rem'}}><span style={{fontSize:'1.5rem'}}>Hola, soy Sergio Ruiz Dia.</span> soy programador web fullstack <span>:)</span></p>

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

            <section className="skills" id="skills">
                <div className="contenido-seccion">
                    <h2>Skills</h2>
                    <div className="fila">
                        <div className="col">
                            <h3>Technical Skills</h3>
                            <div className="skill">
                                <span>Next js</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>60%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="skill">
                                <span>HTML & CSS</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>50%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="skill">
                                <span>React</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>60%</span>
                                    </div>
                                </div>
                            </div>
                   
                            <div className="skill">
                                <span>Node.js</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>55%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <h3>Professional Skills</h3>
                            <div className="skill">
                                <span>Comunicación</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>80%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="skill">
                                <span>Trabajo en Equipo</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>70%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="skill">
                                <span>Creatividad</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>99%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="skill">
                                <span>Dedicación</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>65%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="skill">
                                <span>Proyect Management</span>
                                <div className="barra-skill">
                                    <div className="progreso">
                                        <span>94%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="curriculum" className="curriculum">
                <div className="contenido-seccion">
                    <h2>Curriculum</h2>
                    <div className="fila">
                        <div className="col izquierda">
                            <h3>Educación</h3>
                            <div className="item izq">
                                <h4>Arte y Multimedia</h4>
                                <span className="casa">Universidad de Oxford</span>
                                <span className="fecha">2005 - 2008</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?</p>
                                <div className="conectori">
                                    <div className="circuloi"></div>
                                </div>
                            </div>
                            <div className="item izq">
                                <h4>Arte y Multimedia</h4>
                                <span className="casa">Universidad de Oxford</span>
                                <span className="fecha">2005 - 2008</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?</p>
                                <div className="conectori">
                                    <div className="circuloi"></div>
                                </div>
                            </div>
                            <div className="item izq">
                                <h4>Arte y Multimedia</h4>
                                <span className="casa">Universidad de Oxford</span>
                                <span className="fecha">2005 - 2008</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?</p>
                                <div className="conectori">
                                    <div className="circuloi"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col derecha">
                            <h3>Experiencia de trabajo</h3>
                            <div className="item der">
                                <h4>Front Developer</h4>
                                <span className="casa">Nombre de Compañía</span>
                                <span className="fecha">2005 - 2008</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?</p>
                                <div className="conectord">
                                    <div className="circulod"></div>
                                </div>
                            </div>
                            <div className="item der">
                                <h4>Front Developer</h4>
                                <span className="casa">Nombre de Compañía</span>
                                <span className="fecha">2005 - 2008</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?</p>
                                <div className="conectord">
                                    <div className="circulod"></div>
                                </div>
                            </div>
                            <div className="item der">
                                <h4>Front Developer</h4>
                                <span className="casa">Nombre de Compañía</span>
                                <span className="fecha">2005 - 2008</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?</p>
                                <div className="conectord">
                                    <div className="circulod"></div>
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
                            <img src="/pc.jpg" alt="" />
                            <div className="overlay">
                                <h3>Diseño Creativo</h3>
                                <p>Fotografía</p>
                            </div>
                        
                            <div style={{ marginTop: '20px',display:'flex',flexDirection:'column',gap:'5px' }}>
                                <div className="fila" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <a href="https://github.com/tuusuario/turepositorio"
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
                                        <span style={{ fontSize: '1.5em', marginBottom: '5px',marginRight:'6px' }}>Backend</span>
                                        <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2em' }} />
                                    </a>
                                </div>
                                <div className="fila" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                    <a href="https://github.com/tuusuario/turepositorio"
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
                                        <span style={{ fontSize: '1.5em' }}>Frontend</span>
                                        <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2em' }} />
                                    </a>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>

            </section>

            <section id="contacto" className="contacto">
                <div className="contenido-seccion">
                    <h2>CONTACTO</h2>
                    <div className="fila">
                        <div className="col">
                            <input type="text" placeholder="Tú Nombre" />
                            <input type="text" placeholder="Número telefónico" />
                            <input type="text" placeholder="Dirección de correo" />
                            <div>
                                <input type="text" placeholder="Tema" />
                                <textarea name="" id="" cols="30" rows="10" placeholder="Mensaje"></textarea>
                                <button>
                                    Enviar Mensaje<i className="fa-solid fa-paper-plane"></i>
                                    <span className="overlay"></span>
                                </button>
                            </div>
                            <div className="col">
                                <img src="img/ubicacion.png" alt="" />
                               {/* <div className="info">
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-location-dot"></i>
                                            Nicaragua 159, San Rafael Mza
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-mobile-screen"></i>
                                            Llamanos: 2384 - 4343443
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-envelope"></i>
                                            Email: cw@example.com
                                        </li>
                                    </ul>
                                </div>*/}
                            </div>
                        </div>
                    </div>
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