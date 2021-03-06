import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";

// import component
const NavigationBar = dynamic(() => import("../components/NavigationBar"));
const HomeBanner = dynamic(() => import("../components/home/HomeBanner"));
const HomePhaseMenu = dynamic(() => import("../components/home/HomePhaseMenu"));
const HomeTestimony = dynamic(() => import("../components/home/HomeTestimony"));
const FrequentQuestion = dynamic(() => import("../components/home/HomeFAQ"));
const SubFooter = dynamic(() => import("../components/SubFooter"));
const Loading = dynamic(() => import("../components/Loading"));
const Footer = dynamic(() => import("../components/FooterBar"));

// import style
import AdminContext from "../store/adminContext";

const Home = () => {
  const [cookies, setCookies] = useCookies();
  const [phase, setPhase] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { load_ } = React.useContext(AdminContext);
  const [load, setLoad] = load_;

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyphase/mentee";
    const auth = cookies.token_mentee;
    setLoading(true);
    const fetchData = async function () {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        });
        if (response.status === 200) {
          setPhase(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (cookies.token_mentee) {
      fetchData();
    }
  }, [load]);

  const RegisterHistory = async () => {
    const token = cookies.token_mentee;

    // eslint-disable-next-line no-undef
    const UrlPhase = process.env.NEXT_PUBLIC_BASE_URL + "/historyphase/mentee";
    // eslint-disable-next-line no-undef
    const UrlModule =
      process.env.NEXT_PUBLIC_BASE_URL + "/historymodule/mentee";
    // eslint-disable-next-line no-undef
    const UrlSubject =
      process.env.NEXT_PUBLIC_BASE_URL + "/historysubject/mentee";
    // eslint-disable-next-line no-undef
    const UrlAltatest = process.env.NEXT_PUBLIC_BASE_URL + "/historyaltatest";
    setLoading(true);
    try {
      const responsePhase = await axios.post(
        UrlPhase,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (responsePhase.status === 200) {
        try {
          const responseModule = await axios.post(
            UrlModule,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (responseModule.status === 200) {
            try {
              const responseSubject = await axios.post(
                UrlSubject,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                }
              );

              if (responseSubject.status === 200) {
                try {
                  const responseAltatest = await axios.post(
                    UrlAltatest,
                    {},
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                      },
                    }
                  );

                  if (responseAltatest) {
                    setLoad(true);
                    setCookies("registered", true);
                  }
                } catch (e) {
                  console.log("Error Register Exam", e);
                }
              }
            } catch (e) {
              console.log("Error Register Subject", e);
            }
          }
        } catch (e) {
          console.log("Error Register Module", e);
        }
      }
    } catch (e) {
      console.log("Error Register Phase", e);
    } finally {
      setLoad(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Home | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <div>
          <div style={{ minHeight: `calc(100vh - 179px)` }}>
            <HomeBanner phase={phase} register={() => RegisterHistory()} />
            {phase != "undefined" &&
            phase != null &&
            phase.length != null &&
            phase.length > 0 &&
            cookies.altatest === "true" ? (
              loading ? (
                <Loading />
              ) : (
                <HomePhaseMenu phase={phase} />
              )
            ) : null}
            <HomeTestimony />
            <FrequentQuestion />
            <SubFooter />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
