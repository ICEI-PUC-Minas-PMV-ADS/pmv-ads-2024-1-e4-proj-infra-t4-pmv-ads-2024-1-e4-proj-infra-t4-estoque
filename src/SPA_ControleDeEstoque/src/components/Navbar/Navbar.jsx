import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='nav'>
            <div className="nav-logo">
                <img src="src\assets\logo1.png" alt="Controle de estoque" className='imagemLogo' />
            </div>
            <Link to="/login" className="nav-menu">
                <li className="nav-saiba">Saiba Mais</li>

            </Link>
        </div>
    )
}

export default Navbar;