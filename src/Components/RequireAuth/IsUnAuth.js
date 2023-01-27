import React, { useContext } from 'react'
import { GlobalContext } from '../../Utils/Contexts'
import { Navigate, useLocation } from 'react-router-dom';

function IsUnAuth(props) {
    const auth = useContext(GlobalContext).auth;
    const location = useLocation();

    return (
        auth.user ?
            <Navigate to={location.state.fullPath} />
            :
            props.children
    )

}


export default IsUnAuth;