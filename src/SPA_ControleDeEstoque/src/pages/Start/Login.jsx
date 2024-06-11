import { useState } from "react"
import { FaUser, FaLock, FaEnvelope, FaIdCard } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import "./Login.css"


const Login = () => {

    // Login
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const response = await fetch('https://controledeestoqueapi.azurewebsites.net/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })

        });

        if (!response.ok) {
            setLoginError(`ERRO HTTP status: ${response.status}`);
            throw new Error(`ERRO HTTP status: ${response.status}`);
        }
        const data = await response.json();

        if (data.acessToken) {

            localStorage.setItem('acessToken', data.acessToken);
            localStorage.setItem('userId', data.userId);
            setLoginError('');
            history(`/home/${data.userId}`);
            //console.log('Login successful');
        } else {
            setLoginError('Login ou senha incorreta');
            //console.error('Invalid login credentials');
        }
    };

    // Cadastro

    const [userName, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const response = await fetch('https://controledeestoqueapi.azurewebsites.net/api/Auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, cnpj, email, password, confirmPassword })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //console.log('User created successfully');
        loginLink();
    };


    // Esse efeito esconde o login e exibe o cadastro 
    const [action, setAction] = useState('');
    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    }

    return (
        <div className="body">
            <div className={`wrapper ${action}`}>
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />

                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Senha" required value={password} onChange={e => setPassword(e.target.value)} />
                            <FaLock className="icon" />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />
                                Manter conectado</label>
                            <a href="#">Esqueceu sua senha?</a>
                        </div>
                        {loginError && <p style={{ color: 'red', padding: 2 }}>E-mail ou senha incorreta</p>}
                        <button type="submit">Login</button>

                        <div className="register-link">
                            <p>Não possuí uma conta? <a href="#" onClick={registerLink} >Cadastre-se</a> </p>
                        </div>
                    </form>
                </div>

                {/* Inicio cadastro */}

                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Cadastrar</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Nome completo" required value={userName} onChange={e => setName(e.target.value)} />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="number" placeholder="Cnpj" required value={cnpj} onChange={e => setCnpj(e.target.value)} />
                            <FaIdCard className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Senha" required value={password} onChange={e => setPassword(e.target.value)} />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Confirme sua senha" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <FaLock className="icon" />
                            <p style={{ fontSize: 10 }}>A senha deve possuir caractere especial, numero, maiuscula e minuscula</p>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" required />
                                Eu aceito os termos e condições.</label>
                        </div>

                        <button type="submit">Confirmar</button>

                        <div className="register-link">
                            <p>Já possuí uma conta? <a href="#" onClick={loginLink}>Login</a> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login