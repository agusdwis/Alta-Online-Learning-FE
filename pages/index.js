import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import HomeBanner from "../components/HomeBanner";

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Home | Alta Online Learning</title>
                </Head>

                <main>
                    <NavigationBar/>

                    <HomeBanner/>

                    <Footer/>
                </main>
            </React.Fragment>
        )
    }
}

export default Home;
