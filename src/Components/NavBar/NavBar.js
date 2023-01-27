import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginCard from '../LoginCard/LoginCard';
import { navStruct } from './utils';


//Before refactoring
// class NavBar extends React.Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             activeTap: [true, false, false, false]
//         }
//     }

//     onTabClicked(tabIdx) {
//         let _activeTap = [...this.state.activeTap]
//         _activeTap = _activeTap.map((tab, idx) => {
//             if (idx === tabIdx) {
//                 return true
//             }
//             return false
//         })

//         this.setState({
//             activeTap: _activeTap
//         })

//     }

//     render() {
//         return (
//             <div className="navbar navbar-expand-md bg-primary navbar-dark ps-5">
//                 <button className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#mainNavBar">
//                     <span className='navbar-toggler-icon' />
//                 </button>

//                 <div className="collapse navbar-collapse" id="mainNavBar">
//                     <ul className="navbar-nav">
//                         <li className="nav-item ms-4">
//                             <button
//                                 className={`btn nav-link ${this.state.activeTap[0] ? "active" : ""}`}
//                                 onClick={this.onTabClicked.bind(this, 0)}
//                             >
//                                 Products
//                             </button>
//                         </li>
//                         <li className="nav-item ms-4">
//                             <button
//                                 className={`btn nav-link ${this.state.activeTap[1] ? "active" : ""}`}
//                                 onClick={this.onTabClicked.bind(this, 1)}
//                             >
//                                 Cateogry
//                             </button>
//                         </li>
//                         <li className="nav-item ms-4">
//                             <button
//                                 className={`btn nav-link ${this.state.activeTap[2] ? "active" : ""}`}
//                                 onClick={this.onTabClicked.bind(this, 2)}
//                             >
//                                 Login
//                             </button>
//                         </li>
//                         <li className="nav-item ms-4">
//                             <button
//                                 className={`btn nav-link ${this.state.activeTap[3] ? "active" : ""}`}
//                                 onClick={this.onTabClicked.bind(this, 3)}
//                             >
//                                 Cart
//                             </button>
//                         </li>
//                     </ul>

//                 </div>

//             </div>
//         )
//     }
// }

//After Refactoring
function NavBar() {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         // activeTap: [true, false, false, false]
    //         navStructState: navStruct
    //     }
    // }

    const [navStructState, setNavStructState] = useState(navStruct);
    const location = useLocation();
    const pathname = location.pathname;
    const queryString = location.search
    const fullPath = pathname + queryString;


    useEffect(() => {
        const _navStruct = navStructState.map((item) => {
            const _item = { ...item }
            if (_item.path === location.pathname) {
                _item.isActive = true;
            } else {
                _item.isActive = false;
            }

            return _item;
        })

        setNavStructState(_navStruct);

    }, [location])


    // function onTabClicked(tabIdx) {
    //     let _navStructState = JSON.parse(JSON.stringify(navStructState));
    //     _navStructState = _navStructState.map((tab, idx) => {
    //         if (idx === tabIdx) {
    //             tab.isActive = true;
    //         } else {
    //             tab.isActive = false
    //         }
    //         // tab.isActive = (idx === tabIdx)
    //         return tab;


    //         // tab.isActive = (idx === tabIdx)
    //     })

    //     // this.setState({
    //     //     navStructState: _navStructState
    //     // })
    //     setNavStructState(_navStructState);

    // }

    // const navStructState = this.state.navStructState;
    return (
        <div className="navbar navbar-expand-md bg-primary navbar-dark px-5">
            <button className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#mainNavBar">
                <span className='navbar-toggler-icon' />
            </button>

            <div className="collapse navbar-collapse" id="mainNavBar">
                <ul className="navbar-nav w-100 align-items-center">
                    {navStructState.map((tab, idx) => {
                        return (

                            tab.name === 'Login' ?
                                <LoginCard tab={tab} fullPath={fullPath} key={idx} />
                                :
                                <Link state={{ fullPath, data: tab.data }} to={tab.path} key={idx}>
                                    <li
                                        className='nav-item'
                                    >
                                        <button
                                            className={`btn nav-link ${tab.cssClass} ${tab.isActive ? "active" : ""}`}
                                        // onClick={() => onTabClicked(idx)}
                                        >
                                            {tab.name}

                                        </button>
                                    </li>

                                </Link>

                        )
                    })}
                </ul>

            </div>

        </div>
    )
}

export default NavBar