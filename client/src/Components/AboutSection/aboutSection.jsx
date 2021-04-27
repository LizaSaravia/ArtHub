import React from 'react';
import Styles from './aboutSection.module.css';
import aylu from '../../Images/team/aylu.jpg'
import flor from '../../Images/team/flor.jpg';
import jorge from '../../Images/team/jorge.jpeg';
import liz from '../../Images/team/liz.jpg';
import mati from '../../Images/team/mati.jpg';
import santiL from '../../Images/team/santilongueira.jpeg';
import santiM from '../../Images/team/santimolina.jpg';
import noPic from '../Assets/profPic.jpg';
import andres from '../../Images/team/andres.jpeg';
import agustina from '../../Images/team/agustina.jpeg'
import linkedin from '../../Images/linkedin.svg';


export default function AboutUsSection() {
    return (
        <div className={Styles.mainContainer}>
            <h1 className={Styles.title}>Nuestro equipo</h1>
            <div className={Styles.teamCards}>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={santiL} alt='Team member: Santi Longueira' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/santiago-longueira-88501a1ba/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Santi Longueira</p>
                        <p className={Styles.desc}>
                        Full Stack Developer.<br/>
                        Apasionado por los esports y los viajes. <br/>
                        En su tiempo libre lo podes encontrar investigando sobre el desarrollo de videojuegos, <br/>
                        o jugando al fútbol.  <br/>
                        Fan de Doctor Who. 

                        </p>
                    </div>
                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={liz} alt='Team member: Liza Saravia' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/liza-saraviag/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Liza Saravia</p>
                        <p><b>Full stack developer. </b><br />
                            En proceso de convertirse en ingeniera aeroespacial.<br/>
                            En su tiempo libre la podes encontrar pintando o disfrutando de la danza clásica. <br />
                            <b>Fan de los marcadores.</b>
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={flor} alt='Team member: Flor Almada' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/floralmada/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Flor Almada</p>
                        <p><b>Full stack developer. </b><br />
                        Amante de la tecnología y las películas de Marvel. <br />
                        En su tiempo libre la podes encontrar tocando la guitarra, 
                        componiendo una canción,<br/> o tomando un curso. <br />
                            <b>Fan de Elon Musk. </b>
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={santiM} alt='Team member: Santi Molina' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/santiago-molina-js/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Santi Molina</p>
                        <p>Full Stack Developer. <br/>
                          Le apasiona tocar la guitarra y las plantas. <br/>
                          En su tiempo libre lo podes encontrar jugando con su gato Timoteo , o cocinando. <br/> 
                          Fan de la birra. 
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={jorge} alt='Team member:Jorge Macias' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/macias-jorge/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Jorge Macias</p>
                        <p><b>Full Stack Developer.</b><br/>
                        Apasionado por la robótica, inteligencia artificial y la automatización industrial. <br/>
                        En su tiempo libre lo podes encontrar leyendo o difrutando de una película de Marvel. <br/>
                        <b>Fan de una buena taza de café.</b>
                        </p>

                    </div>
                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={agustina} alt='Team member: Agustina Coronado' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/agustina-coronado/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Agustina Coronado</p>
                        <p><b>Full Stack Developer.</b> <br/>
                        Amante de la fotografía y el diseño. <br/>
                        En su tiempo libre la podes encontrar tomando bellas fotos. <br/>
                        <b>Fan de Adobe.</b>
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={mati} alt='Team member: Matias Cheverry' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/cheverry/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Matias Cheverry</p>
                        <p>Full Stack Developer. <br/>
                        Apasionado por los aviones y cualquier cosa que vuele. <br/>
                        En su tiempo libre lo podes encontrar haciendo ejercicio o difrutando de la compañia de <br/>
                        sus amigos. <br/>
                        Fan de los ravioles.

                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={andres} alt='Team member: Andres Gomez' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/andres-alberto-gomez-mora-react-native/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Andres Gomez</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={aylu} alt='Team member: Aylen Alderete' />
                        <a className={Styles.link} target="_blank" href="https:linkedin.com/in/aylenalderete/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Aylen Alderete</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

            </div>


        </div>
    )
}

