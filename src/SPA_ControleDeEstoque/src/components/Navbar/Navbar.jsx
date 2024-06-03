import { Link } from 'react-router-dom';
import './Navbar.css'
import logo1 from '../../assets/logo1.png'

const Navbar = () => {
    return (
        <div className='nav'>
            <div className="nav-logo">
                <img src={logo1} alt="Controle de estoque" className='imagemLogo' />
            </div>
            <Link to="/login" className="nav-menu">
                <li className="nav-saiba">Saiba Mais</li>

            </Link>
        </div>
    )
}

export default Navbar;