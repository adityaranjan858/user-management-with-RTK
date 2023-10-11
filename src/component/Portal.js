import React from 'react'
import UpdateUser from './UpdateUser';
import { ReactDOM } from 'react-dom/client';

const Portal = () => {
  return (
    ReactDOM.createPortal(<UpdateUser/>,document.getElementByid("updateUserForm"))
  )
}

export default Portal;


