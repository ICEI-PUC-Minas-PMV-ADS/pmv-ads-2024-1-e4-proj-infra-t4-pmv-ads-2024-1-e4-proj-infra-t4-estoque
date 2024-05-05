import './Hero.css';
import arrow from '../../assets/arrow.png';
import React from 'react'
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className='hero'>
      <div>
        <p  className="hero-text">
        Domine seu estoque,<br/> simplifique seus negócios!
        </p>
        <p className='secondary-text'>
        Junte-se a nós e transforme a gestão do seu empreendimento em uma experiência simples e eficiente.
        </p>
      </div>
      <Link to="/login" className="hero-explore">
        <p>Participe e conheça</p>
        <img src={arrow} alt="arrow" />
      </Link>
    </div>
  )
}
