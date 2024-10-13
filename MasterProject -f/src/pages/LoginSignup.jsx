import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Prijavi se");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        measurements: {
            length: "",
            shoulderWidth: "",
            waistWidth: "",
            underarmToMidBody: "",
            shoulderToWrist: ""
        }
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name in formData.measurements) {
            setFormData({ ...formData, measurements: { ...formData.measurements, [name]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const login = async () => {
        console.log("radi login", formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    const signup = async () => {
        console.log("radi signup", formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div className='loginsignup' style={{ height: state === 'Prijavi se' ? '100vh' : '180vh' }}>
            <div className="loginsignup-container" style={{ height: state === 'Prijavi se' ? '550px' : '1100px' }}>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Registruj se" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Vaše Ime' />}
                    <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Adresa' />
                    <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Lozinka' />
                    {state === "Registruj se" && <h2>Unesite vaše mere:</h2>}
                    {state === "Registruj se" && <input type="text" name='length' value={formData.measurements.length} onChange={changeHandler} placeholder='Dužina od vratnog pršljena do ispod kolena' />}
                    {state === "Registruj se" && <input type="text" name='shoulderWidth' value={formData.measurements.shoulderWidth} onChange={changeHandler} placeholder='Širina ramena' />}
                    {state === "Registruj se" && <input type="text" name='waistWidth' value={formData.measurements.waistWidth} onChange={changeHandler} placeholder='Širina struka' />}
                    {state === "Registruj se" && <input type="text" name='underarmToMidBody' value={formData.measurements.underarmToMidBody} onChange={changeHandler} placeholder='Širina od ispod pazuha do sredina tela' />}
                    {state === "Registruj se" && <input type="text" name='shoulderToWrist' value={formData.measurements.shoulderToWrist} onChange={changeHandler} placeholder='Od ramena do šake' />}
                </div>
                <button onClick={() => { state === "Prijavi se" ? login() : signup() }}>Nastavi</button>
                {state === "Registruj se" ? 
                    <p className="loginsignup-login">
                        Već imate nalog kod nas? <span onClick={() => setState("Prijavi se")}>Prijavite se ovde</span>
                    </p> :
                    <p className="loginsignup-login">
                        Nemate nalog kod nas? <span onClick={() => setState("Registruj se")}>Registrujte se ovde</span>
                    </p>
                }
                <div className='loginsignup-agree'>
                    <input type="checkbox" name='' id='' />
                    <p>Pritiskom na dugme Nastavi, slažem se sa politkom i uslovima korišćenja</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
