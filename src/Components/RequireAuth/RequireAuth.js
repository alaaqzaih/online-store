import React, { useContext } from 'react'
import { GlobalContext } from '../../Utils/Contexts'
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';


function RequireAuth(props) {
    const auth = useContext(GlobalContext).auth;


    return (
        <div>
            {auth.user ?
                props.children
                :
                <Navigate to="/login" />
            }
        </div>
    )
}

export default RequireAuth;