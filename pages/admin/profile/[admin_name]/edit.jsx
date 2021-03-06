import React, { useContext } from "react";
import Head from "next/head";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";

const NavigationAdminBar = dynamic(() =>
  import("../../../../components/admin/NavigationBarAdmin")
);
const FormEditProfileAdmin = dynamic(() =>
  import("../../../../components/admin/EditProfileAdmin")
);
const FooterBar = dynamic(() => import("../../../../components/FooterBar"));
const Loading = dynamic(() => import("../../../../components/Loading"));

import AdminContext from "../../../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(3, 8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.5, 2),
      fontSize: "14px",
    },
  },
}));

export default function EditProfileAdmin() {
  const classes = useStyles();

  const { login_ } = useContext(AdminContext);
  const [login, setLogin] = login_;

  if (!login) {
    return <Loading />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Admin | Edit Profile</title>
        </Head>
        <NavigationAdminBar />
        <main className={classes.main}>
          <FormEditProfileAdmin />
        </main>
        <FooterBar />
      </React.Fragment>
    );
  }
}
