import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    backgroundColor: "#F4F7FC",
    fontFamily: "Muli, sans-serif",
  },
  container: {
    minHeight: "50vh",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
  title: {
    color: theme.palette.secondary.secondary,
    paddingBottom: theme.spacing(2),
    fontSize: `calc(2em + 0.5vw)`,
    fontWeight: 600,
  },
  list: {
    width: "100%",
    maxWidth: "60vw",
    fontFamily: "Muli, sans-serif",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95vw",
    },
  },
  text: {
    cursor: "pointer",
    color: theme.palette.secondary.secondary,
    fontWeight: 600,
    fontFamily: "Muli, sans-serif",
  },
  nested: {
    paddingLeft: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
    },
  },
  ornament: {
    height: "40vh",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25px",
    },
    position: "absolute",
  },
  question: {
    fontSize: "16px",
  },
}));

// eslint-disable-next-line react/prop-types
const FAQList = ({ open, title, content, handleClick }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem className={classes.text} onClick={handleClick}>
        <ListItemIcon style={{ color: "#19355f" }}>
          {open ? <ExpandLess /> : <NavigateNextIcon />}
        </ListItemIcon>
        <Typography style={{ fontWeight: "500", fontSize: "18px" }}>
          {title}
        </Typography>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            <Typography
              style={{
                color: "#19355f",
                textAlign: "justify",
              }}
            >
              {content}
            </Typography>
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const FrequentQuestion = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [open3, setOpen3] = React.useState(false);
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const [open4, setOpen4] = React.useState(false);
  const handleClick4 = () => {
    setOpen4(!open4);
  };

  return (
    <div>
      <Box width={"100%"} padding={0} className={classes.bannerBox}>
        <Grid container spacing={0}>
          <img
            className={classes.ornament}
            src={"/images/ornament_batik.png"}
            alt="Ornament"
          />
          <Grid item xs={12} className={classes.container}>
            <Typography variant={"h5"} className={classes.title}>
              {" "}
              FAQ{" "}
            </Typography>
            <>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.list}
              >
                <FAQList
                  classes={classes}
                  open={open}
                  handleClick={handleClick}
                  title={"What is the cost of the course?"}
                  content={"Alterra Academy Online Learning courses are free."}
                />
                <FAQList
                  classes={classes}
                  open={open2}
                  handleClick={handleClick2}
                  title={"What do I need to take the course?"}
                  content={
                    "You will need access to a computer with: Operating System: Mac OS X 10.7+ 64-bit,\n" +
                    "                            Ubuntu 14.04+ 64-bit, or Windows 8+ (64-bit) Web Browser: Firefox 39.0+ or\n" +
                    "                            Chrome 43+ (Internet Explorer is currently not supported)."
                  }
                />
                <FAQList
                  classes={classes}
                  open={open3}
                  handleClick={handleClick3}
                  title={
                    "Do I need to be available during a certain hour of the day to start each subject?"
                  }
                  content={
                    "No. The course is self-paced and will be broken down into subjects per module with assessments at the end of each subject to check on your progress."
                  }
                />
                <FAQList
                  classes={classes}
                  open={open4}
                  handleClick={handleClick4}
                  title={"What do I receive for taking this course?"}
                  content={
                    "You will receive a final grade but the grade won't be on your proof of completion. To receive a proof of completion, you will need to achieve 80% on graded material. There are two different types of assessments within the course: quizzes and coding test. At the end of each phase, you will get a certificate."
                  }
                />
              </List>
            </>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FrequentQuestion;
