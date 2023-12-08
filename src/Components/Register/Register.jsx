import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox } from '@mui/material';
import validator from 'validator';
import { Icon } from '@iconify/react';
import Image from '../../Assets/Image_noback.png';
import background1 from '../../Assets/back.svg';
import background2 from '../../Assets/back_mobile.svg';
import './Register.css';
import { Link } from 'react-router-dom';
import config from '../../config';

const Register = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [autherizer, setAutherizer] = useState(false);
    const [success, setSuccess] = useState('');
    const [nameError, setNameError] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
        setNameError('');
        setMailError('');
        setPasswordError(false);
        setPasswordHelperText('');
        setConfirmPassError('');
        setRegisterError('');

        if (validator.isStrongPassword(signupData.password, { 
            minLength: 8, minLowercase: 1, 
            minUppercase: 1, minNumbers: 1, minSymbols: 1 
        })) { 
            setPasswordHelperText('Strong Password');
        } else { 
            setPasswordHelperText('Weak Password');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (signupData.username.includes('@')) {
            setNameError('Username should not contain `@`.');
            return;
        }

        if (!validator.isEmail(signupData.email)) {
            setMailError('Invalid Email.')
            return;
        }
        
        if (!signupData.password.length >= 6) {
            setPasswordHelperText('Password must be atleast 7 Characters.');
            return;
        }

        setAutherizer(true);

        try {
            const response = await fetch(config.apiUrlRegister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();
            console.log(data);
            if (response.status === 201) {
                setSuccess(data.message);
                setTimeout(() => {window.location.href = './login'}, 1000);
            }
            else if (response.status === 409) {
                if (data.entity === 'username') {
                    setNameError(data.error);
                }
                else {
                    setMailError(data.error);
                }
            }
            else if (response.status === 500) {
                setRegisterError(data.error);
            }
            else if (response.status === 400) {
                setPasswordError(true);
                setPasswordHelperText(data.error);
                setConfirmPassError(data.error);
            }

        } catch (error) {
            console.error('Error during signup:', error);
        }

        const timer = setTimeout(() => {
            setAutherizer(false);
        }, 1000);
        return () => clearTimeout(timer);
    };

    const [bgImage, setBgImage] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }
    }, []);

    return (
        <div className='reg-body'>
            {bgImage ? (
                <div className='background' style={{backgroundImage: `url(${ background2 })`}}></div>
            ) : (
                <div className='background' style={{backgroundImage: `url(${ background1 })`}}></div>
            )}
            <div className='reg-container'>
                <h2 className='reg-header-mobile'>Sign Up</h2>
                <div className='reg-image'>
                    <img src={Image} alt="main-design" width={'80%'} height={'80%'} style={{objectFit: 'cover', overflow:'clip'}} />
                    <div className='log-buttons'>
                        <button type="button" class="google-button">
                            <span class="google-button__icon">
                                <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
                            </span>
                            <span class="google-button__text">Sign in with Google</span>
                            <span class="google-button__text_mobile">Google</span>
                        </button>

                        <button type="button" class="google-button">
                            <span class="google-button__icon">
                                <Icon icon="logos:facebook" fontSize={'24px'} />    
                            </span>
                            <span class="google-button__text">Sign in with Facebook</span>
                            <span class="google-button__text_mobile">Facebook</span>
                        </button>

                        <button type="button" class="google-button">
                            <span class="google-button__icon">
                            <Icon icon="mdi:github" fontSize={'24px'} />    
                            </span>
                            <span class="google-button__text">Sign in with Github</span>
                            <span class="google-button__text_mobile">Github</span>
                        </button>
                    </div>
                </div>
                <div className='reg-form'>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate={false}
                        autoComplete="off"
                        onSubmit={handleSignupSubmit}
                    >
                        <h2 className='reg-header'>SIGNUP</h2>
                        <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                            <Icon icon="mdi:user" style={{fontSize: '32px'}}/>
                            <TextField
                                error={(nameError.length !== 0)}
                                helperText={nameError}
                                id="outlined-username-error"
                                label="Username"
                                name="username"
                                value={signupData.username}
                                onChange={handleSignupChange}
                                fullWidth
                                required
                            /> 
                        </Box> 
                        <br />
                        <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                            <Icon icon="line-md:email" style={{fontSize: '32px'}}/>
                            <TextField
                                error={(mailError.length !== 0)}
                                helperText={mailError}
                                id="outlined-mail-error"
                                label="Email"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <br />
                        <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                            <Icon icon="ic:baseline-password" style={{fontSize: '32px'}}/>
                            <TextField
                                error={(passwordError)}
                                helperText={passwordHelperText}
                                id="outlined-password-error"
                                label="Password"
                                name="password"
                                type='password'
                                value={signupData.password}
                                onChange={handleSignupChange}
                                required
                            />
                        </Box>
                        <br />
                        <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                            <Icon icon="ic:baseline-password" style={{fontSize: '32px'}}/>
                            <TextField
                                error={(confirmPassError.length !== 0)}
                                helperText={confirmPassError}
                                id="outlined-confirm-password-error"
                                label="Confirm Password"
                                name="confirmPassword"
                                type='password'
                                value={signupData.confirmPassword}
                                onChange={handleSignupChange}
                                required
                            />
                        </Box>
                        <br />

                        <Box sx={{ '& > :not(style)': { m: 0.1 }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <p style={{fontSize: 'small', fontWeight: '500'}}><Checkbox type="checkbox" color="success" />I Agree to Terms & Conditions.</p>
                            <p style={{fontSize: 'small', fontWeight: '500'}}><Checkbox type="checkbox" color="success" />I Agree to share my data.</p>
                        </Box>
                        <br />
                        {registerError && (
                            <div className='reg-error'>{registerError}</div>
                        )}
                        <div className='center'><Button variant='contained' type="submit">Sign Up</Button></div><br />
                        <Link to={'../login'}><Button><b>Already have an account? Login.</b></Button></Link>
                    </Box>
                </div>
            </div>
            
            {autherizer && (
                <div className='reg-authenticator'>
                    {success ? (
                        <div className='log-auth-success'><span class="loader"></span><br /><br /><br /><br /><p>Success</p></div>
                    ) : (
                        <div className='log-auth-loader'><span class="loader"></span><br /><br /><br /><br /><p>Authenticating...</p></div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Register;