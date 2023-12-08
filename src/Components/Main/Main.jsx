import React from 'react';
import './Main.css';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';

const Main = () => {
  return (
    <div className='main-body'>
        <Icon icon="pepicons-pencil:checkmark-filled" color="green" fontSize={'72px'} /><br />
        You are successfully logged in.
        <br /><br /><br />
        <Button variant='contained' color='secondary' onClick={() => {window.location.href = './login'}}>Login</Button><br />
        <Button variant='contained' color='secondary' onClick={() => {window.location.href = './register'}}>SignUp</Button>
    </div>
  )
}

export default Main