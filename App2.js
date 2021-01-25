// App.js
import React, { useState, useRef, useContext } from 'react';
import LoginForm from "./LoginForm"
import Overview from "./Overview"
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Global';
import { theme } from './Theme';
import Burger from './components';
import Menu from './components/Menu'
import './App.css';
import { useOnClickOutside } from './Hooks';
import Profile from './Profile';

const App = (props) => {
    const [activePage, setActivePage] = useState('login');
    const [activeUser, setActiveUser] = useState(0);
    const [token, setToken] = useState("");

    const [open, setOpen] = useState(false);
    const node = useRef();

    useOnClickOutside(node, () => setOpen(false));

    const onChangePage = (newPage) => {
        console.log("On change page " + newPage);
        setActivePage(newPage);
    };

    const onLoginUser = (newUserId) => {
        console.log("On change user id: " + newUserId);
        setActiveUser(newUserId);
    };

    const onSetToken = (token) => {
        console.log("setting token to: " + token);

        setToken(token);
    }

    const getActiveUser = () => {
        return activeUser;
    }

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />




                    {activePage === 'login' ? (
                        <LoginForm activePage={onChangePage} activeUser={onLoginUser} token={onSetToken} />


                    ) : activePage === 'overview' ? (
                        <div>
                            <div ref={node}>
                                <Burger open={open} setOpen={setOpen} />
                                <Menu open={open} setOpen={setOpen} onChangePage={onChangePage} />
                            </div>
                            <div className="App">
                                <Overview activePage={onChangePage} activeUser={getActiveUser} token={token} />
                            </div>
                        </div>

                    ) : activePage === 'profile' ? (
                        <div>
                            <Profile activeUser={getActiveUser} />
                            <Burger open={open} setOpen={setOpen} />
                            <Menu open={open} setOpen={setOpen} onChangePage={onChangePage} />
                        </div>
                    ) : null}
            </>
        </ThemeProvider>
    );
}

export default App;