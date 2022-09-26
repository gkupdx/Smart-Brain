import React from 'react';
import { useState } from 'react';

const Register = ({ onRouteChange, loadUser }) => {
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    // listens to name field changes
    const onChangeName = (event) => {
        setRegName(event.target.value)
    }

    // listens to email field changes
    const onChangeEmail = (event) => {
        setRegEmail(event.target.value)
    }

    // listens to password field changes
    const onChangePassword = (event) => {
        setRegPassword(event.target.value)
    }

    // fetch data from DB via POST request on registration submit
    const onRegSubmit = () => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: regName,
                email: regEmail,
                password: regPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user) {
                loadUser(user); // update user profile on reg submit
                onRouteChange('home')
            }
        })
    }
    
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={onChangeName} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={onChangeEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onChangePassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onRegSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register;