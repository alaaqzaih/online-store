import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import './page-not-found.scss'

function PageNotFound() {

    const errRoute = useRouteError();

    console.log(errRoute);

    return (
        <div className="page-not-found">
            <div className='wrapper'>
                <div className='text-title'>
                    {errRoute.status === 404 ?
                        <span>
                            Sorry, 404 page not found ...
                        </span>

                        :
                        <span>
                            Sorry, Something went Wrong ...
                        </span>
                    }
                </div>

                <Link className='text-body btn btn-light' to="/">Return to home Page</Link>
            </div>
        </div>
    )
}

export default PageNotFound