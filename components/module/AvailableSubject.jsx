import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import LockIcon from "@material-ui/icons/Lock";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Paper from "@material-ui/core/Paper";
import UserContext from "../../store/userContext";
import axios from "axios";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    maxWidth: "100%",
    marginBottom: theme.spacing(3),
  },
  button: {
    margin: "auto",
  },
  done: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2.5),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      WebkitBoxShadow: "none",
    },
  },
  unfinish: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2.8),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.secondary,
      WebkitBoxShadow: "none",
    },
  },
  locked: {
    backgroundColor: "#BDBDBD",
    color: "black",
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    "&:hover": {
      WebkitBoxShadow: "none",
    },
  },
  moduleLocked: {
    color: "#BDBDBD",
  },
  paper: {
    marginBottom: theme.spacing(3),
  },
  subjectLock: {
    color: "#BDBDBD",
  },
}));

// const data = { name: "01-Introduction-to-Python" };

export default function AvailableSubjects(props) {
  const classes = useStyles();
  const router = useRouter();
  const { id, module } = router.query;

  const [cookies] = useCookies();

  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [course, setCourse] = React.useState();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/historysubject/subject/" + "3";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setCourse(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("cek mentee", mentee);
  console.log("cek tembak course", course);

  return (
    <React.Fragment>
      {course
        ? course.map((value, index) => (
            <div>
              {value.lock_key ? (
                <div key={index}>
                  <Paper elevation={0} className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={7}>
                        <Typography gutterBottom variant="h6" component="h2">
                          Subject {index + 1}: {value.subject.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          {value.subject.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography gutterBottom variant="h6" component="h2">
                          5 of 5
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          subjects completed
                        </Typography>
                      </Grid>
                      {value.is_complete ? (
                        <div>
                          <Grid item xs={12} sm={2} className={classes.button}>
                            <Button
                              className={classes.done}
                              variant="contained"
                              color="secondary"
                            >
                              <DoneAllIcon />
                              Done
                            </Button>
                          </Grid>
                        </div>
                      ) : (
                        <Grid item xs={12} sm={2} className={classes.button}>
                          <Link
                            href={"/courses/phase/[id]/[module]/[subject_name]"}
                            as={`/courses/phase/${id}/${module}/01-Introduction`}
                          >
                            <Button
                              className={classes.unfinish}
                              variant="contained"
                              color="primary"
                            >
                              <PlayCircleOutlineIcon />
                              Start
                            </Button>
                          </Link>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </div>
              ) : (
                <div key={index}>
                  <Paper elevation={0} className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={7}>
                        <Typography
                          className={classes.moduleLocked}
                          gutterBottom
                          variant="h6"
                          component="h2"
                        >
                          Subject {index + 1}: {value.subject.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          {value.subject.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography
                          className={classes.moduleLocked}
                          gutterBottom
                          variant="h6"
                          component="h2"
                        >
                          0 of 5
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          subjects completed
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2} className={classes.button}>
                        <Button
                          className={classes.locked}
                          variant="contained"
                          color="primary"
                        >
                          <LockIcon />
                          Locked
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              )}
            </div>
          ))
        : null}
    </React.Fragment>
  );
}
