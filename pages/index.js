import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";

// import style
import AdminContext from "../store/adminContext";

// import component
const HomePhaseMenu = dynamic(() => import("../components/home/HomePhaseMenu"));
const HomeTestimony = dynamic(() => import("../components/home/HomeTestimony"));
const FrequentQuestion = dynamic(() => import("../components/home/HomeFAQ"));
const NavigationBar = dynamic(() => import("../components/NavigationBar"));
const HomeBanner = dynamic(() => import("../components/home/HomeBanner"));
const SubFooter = dynamic(() => import("../components/SubFooter"));
const Loading = dynamic(() => import("../components/Loading"));
const Footer = dynamic(() => import("../components/FooterBar"));

const Home = () => {
  const [cookies, setCookies] = useCookies();
  const [phase, setPhase] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { load_ } = React.useContext(AdminContext);
  const [load, setLoad] = load_;

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/historyphase/mentee`;
    const auth = cookies.token_mentee;
    setLoading(true);
    // eslint-disable-next-line func-names
    const fetchData = async function () {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });
        if (response.status === 200) {
          setPhase(response.data);
        }
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (auth) {
      fetchData();
    }
    setLoading(false);
  }, [load]);

  const RegisterHistory = async () => {
    // Const
    const token = cookies.token_mentee;

    // eslint-disable-next-line no-undef
    const urlPhase = `${process.env.NEXT_PUBLIC_BASE_URL}/historyphase/mentee`;
    // eslint-disable-next-line no-undef
    const urlModule = `${process.env.NEXT_PUBLIC_BASE_URL}/historymodule/mentee`;
    // eslint-disable-next-line no-undef
    const urlSubject = `${process.env.NEXT_PUBLIC_BASE_URL}/historysubject/mentee`;
    // eslint-disable-next-line no-undef
    const urlAltatest = `${process.env.NEXT_PUBLIC_BASE_URL}/historyaltatest`;
    setLoading(true);

    try {
      const responsePhase = await axios.post(
        urlPhase,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (responsePhase.status === 200) {
        // eslint-disable-next-line no-useless-catch
        try {
          const responseModule = await axios.post(
            urlModule,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (responseModule.status === 200) {
            // eslint-disable-next-line no-useless-catch
            try {
              const responseSubject = await axios.post(
                urlSubject,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              if (responseSubject.status === 200) {
                // eslint-disable-next-line no-useless-catch
                try {
                  const responseAltatest = await axios.post(
                    urlAltatest,
                    {},
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );

                  if (responseAltatest) {
                    setLoad(true);
                    setCookies("registered", true);
                  }
                } catch (e) {
                  throw e;
                }
              }
            } catch (e) {
              throw e;
            }
          }
        } catch (e) {
          throw e;
        }
      }
      // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e;
    } finally {
      setLoad(false);
      setLoading(false);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Head>
        <title>Home | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <div>
          <div style={{ minHeight: "calc(100vh - 179px)" }}>
            <HomeBanner phase={phase} register={() => RegisterHistory()} />
            {/* eslint-disable-next-line no-nested-ternary,eqeqeq */}
            {phase != "undefined"
              && phase != null
              && phase.length != null
              && phase.length > 0
              && cookies.altatest === "true" ? (
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
