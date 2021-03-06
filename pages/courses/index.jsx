import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import dynamic from "next/dynamic";
import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";
import axios from "axios";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";

// import style
const CurrentCourse = dynamic(() => import("../../components/course/CurrentCourse"));
const Certificate = dynamic(() => import("../../components/course/Certificate"));
const PastCourses = dynamic(() => import("../../components/course/PastCourse"));
const NavigationBar = dynamic(() => import("../../components/NavigationBar"));
const FooterBar = dynamic(() => import("../../components/FooterBar"));
const Loading = dynamic(() => import("../../components/Loading"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#F4F7FC",
    color: theme.palette.secondary.secondary,
  },
  bodyContent: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    backgroundColor: "#F4F7FC",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
    overflowX: "hidden",
    minHeight: `calc(70vh)`
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: "15vw",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100vw",
    },
  },
  footer: {
    marginTop: theme.spacing(20),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  tabPanel: {
    minWidth: "85vw",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  breadcrumb: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
  link: {
    textDecoration: 'none',
    "&:link": {
      textDecoration: 'none',
    },
    cursor: 'pointer'
  },
  titlePage: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(1.1em + 1.5vw)`,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
  },
}));

// Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.tabPanel}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.secondary.secondary,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: `calc(1rem+1vw)`,
    "&:focus": {
      opacity: 1,
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: theme.spacing(1),
  },
}))((props) => <Tab disableRipple {...props} />);

const CoursePage = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [module, setModule] = React.useState();
  const [pastModule, setPastModule] = React.useState();
  const [cookies] = useCookies();
  const [loading, setLoading] = React.useState(true);
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historymodule/mentee";
    const auth = cookies.mentee.token;
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + auth,
          },
        });
        if (response.status === 200) {
          setModule(response.data.filter((item) => item.lock_key === true));
          setPastModule(response.data.filter((item) => item.is_complete === true));
        }
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        setLoad(false);
      }
    };
    fetchData();
  }, [load]);

  if (module === undefined) {
    return <Loading />;
  } else {
    return (
      <div>
        <Head>
          <title>Courses | Alta Online Learning</title>
        </Head>
        <main className={classes.root}>
          <NavigationBar />
          <div className={classes.breadcrumb}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/">
                <Typography className={classes.link}>Home</Typography>
              </Link>
              <Typography color="textPrimary">My Progress</Typography>
            </Breadcrumbs>
          </div>
          <Typography className={classes.titlePage}>
            My Progress
          </Typography>
          <div className={classes.bodyContent}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <StyledTab label="Current Course" {...a11yProps(0)} />
              <StyledTab label="Past Courses" {...a11yProps(1)} />
              <StyledTab label="Certificate" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <CurrentCourse
                currentModule={module[module.length - 1]}
                no={module.length}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PastCourses />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography>Certificate</Typography>
              <Certificate />
            </TabPanel>
          </div>
          <footer className={classes.footer}>
            <FooterBar />
          </footer>
        </main>
      </div>
    );
  }
};
export default CoursePage;
