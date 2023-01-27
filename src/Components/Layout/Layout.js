import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Modal } from 'bootstrap';
import CustomModal from '../CustomModal/CustomModal'
import NavBar from '../NavBar/NavBar';
import { GlobalContext } from '../../Utils/Contexts';
import { FakeLoginApi } from '../../Utils/ApiUtils';

function Layout() {

    const [modalData, setModalData] = useState({
        body: "",
        title: "",
        footer: ""
    });

    const modal = useRef();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);

    useEffect(() => {
        modal.current = new Modal('#customModal');
    }, [])

    const showModal = (options) => {
        setModalData({
            body: options.body,
            title: options.title,
            footer: options.footer
        })
        modal.current.show();

    }

    const auth = {
        user,
        token,
        signin: async (username, password) => {
            const resp = await FakeLoginApi(username, password);
            if (resp.status === 200) {
                setUser(resp.user);
                setToken(resp.token)
                localStorage.setItem('user', JSON.stringify(resp.user));
                localStorage.setItem('token', resp.token);
            }

            return resp
        },
        signout: () => {
            setUser("");
            setToken("");
            localStorage.clear();
        }
    }

    return (
        <GlobalContext.Provider value={{ showModal, auth }}>
            <div className="App">
                <CustomModal
                    title={modalData?.title}
                    body={modalData?.body}
                    footer={modalData?.footer}
                />
                <NavBar />
                <Outlet />
            </div>
        </GlobalContext.Provider >)
}

export default Layout;