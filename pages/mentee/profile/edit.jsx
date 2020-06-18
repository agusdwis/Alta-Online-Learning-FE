import React from "react";
import Head from "next/head";
import NavigationBar from "../../../components/NavigationBar";
import Footer from "../../../components/Footer";
import FormEditProfile from "../../../components/FormEditProfile";

export default function EditProfileAdmin() {
  return (
    <React.Fragment>
      <Head>
        <title>Profile | Alta Online Learning</title>
      </Head>
      <NavigationBar />
      <FormEditProfile />
      <Footer />
    </React.Fragment>
  );
}
