import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CookiesProvider, Cookies } from 'react-cookie';
import Router from 'next/router'
import UserContext from '../store/userContext';
import theme from '../utils/theme';
import '../public/index.css'

export default function MyApp(props) {
    const { Component, pageProps } = props;

    //isLogin
    const cookies = new Cookies();
    const[isLogin, setIsLogin] = React.useState('')
    React.useEffect(() => {
        const token = cookies.get('token')
        if (token){
            setIsLogin('true')
        } else {
            setIsLogin('false')
        }
    },[])

    //Material-UI
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Alta Online Learning</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <CookiesProvider>
                    <UserContext.Provider value={{ login: isLogin}}>
                        <Component {...pageProps} />
                    </UserContext.Provider>
                </CookiesProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};