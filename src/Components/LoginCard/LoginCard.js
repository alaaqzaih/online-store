import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Utils/Contexts';

function LoginCard({ tab, fullPath }) {

    const auth = useContext(GlobalContext).auth;
    const navigate = useNavigate();


    function onLogInOut() {
        if (auth.user) {
            auth.signout();
        }

        navigate('/login', fullPath)

    }

    return (
        // <Link className='ms-auto' state={fullPath} to={tab.path}>
        <li
            className='nav-item ms-auto'
            onClick={onLogInOut}
        >
            <button
                className={`btn nav-link ${tab.cssClass} ${tab.isActive ? "active" : ""}`}
            // onClick={() => onTabClicked(idx)}
            >
                {auth.user ?
                    <React.Fragment>
                        <div>{`Welcom ${auth?.user?.name}`}</div>
                        <div>Logout</div>
                    </React.Fragment>
                    :
                    tab.name}

            </button>
        </li>

        // </Link>
    )
}

export default LoginCard;