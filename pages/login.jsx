import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "../utils/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    marginTop: 50,
    alignContent: "center",
    minHeight: 300,
  },
  page: {
    paddingBottom: "70px",
  },
  margin: {
    margin: theme.spacing(1),
    width: "90%",
    background: "white",
    "&:hover label.Mui-focused": {
      color: "darkBlue",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "darkBlue",
      },
    },
  },

  textLogin: {
    fontWeight: "bold",
    paddingBottom: "20px",
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  loginImage: {
    background: theme.palette.secondary.secondary,
    padding: 20,
    paddingTop: "30%",
    minHeight: "100%",
  },
  button: {
    fontFamily: "SFCompactDisplay-Regular, sans-serif",
    backgroundColor: theme.palette.secondary.secondary,
    borderColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
    padding: "5px 20px",
    textTransform: "none",
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  textField: {
    width: "90%",
    background: "white",
  },
  textMuli: {
    fontFamily: "Muli, sans-serif",
  },
  dontHaveAcoount: {
    fontFamily: "Muli, sans-serif",
    margin: "10px 0 40px",
    color: theme.palette.secondary.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Head>
        <title>Login | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <Grid className={classes.page} container justify="center">
          <Card className={classes.root} variant="outlined">
            <Grid container>
              <Grid item xs={5}>
                <Card className={classes.loginImage}>
                  <img
                    width="90%"
                    src="/images/logo-alterra-academy-white.png"
                    alt="login-picture"
                  />
                </Card>
              </Grid>
              <Grid item xs={7} style={{ background: "#F4F7FC" }}>
                <CardContent>
                  <Typography
                    className={classes.textLogin}
                    align="center"
                    variant="h5"
                    gutterBottom
                  >
                    Sign In
                  </Typography>
                  <TextField
                    className={classes.margin}
                    label="Username"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    id="mui-theme-provider-outlined-input"
                  />
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      color="secondary"
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    style={{ padding: "40px 0 40px 0" }}
                  >
                    <Button
                      className={classes.button}
                      variant={"outlined"}
                      size="large"
                    >
                      Log In
                    </Button>

                    <Link className={classes.dontHaveAcoount} href="/register">
                      Don't have an account? Register!
                    </Link>

                    <Button
                      className={classes.button}
                      variant={"outlined"}
                      size="large"
                      className={classes.button}
                      startIcon={<GTranslateIcon />}
                    >
                      Log in using google account
                    </Button>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Footer />
      </main>
    </React.Fragment>
  );
}
