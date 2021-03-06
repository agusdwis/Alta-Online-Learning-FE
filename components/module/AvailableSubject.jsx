import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import UserContext from "../../store/userContext";

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
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      WebkitBoxShadow: "none",
    },
  },
  doneFeedback: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    backgroundColor: theme.palette.secondary.secondary,
    "&:hover": {
      backgroundColor: theme.palette.secondary.secondary,
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
  gridOf: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    marginBottom: theme.spacing(3),
  },
  subjectLock: {
    color: "#BDBDBD",
  },
}));

export default function AvailableSubjects({ subject }) {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module } = router.query;

  const [cookies] = useCookies();

  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [course, setCourse] = React.useState();
  const [review, setReview] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + `/historysubject/subject/${id_module}`;
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
    if (id_module) {
      fetchData();
    }
  }, [id_module]);

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/reviewmodule/all`;
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          if (response.data.status === "undefined") {
            setReview("undefined");
          } else {
            // setReview(response.data.filter(rev => rev.module_id == id_module));
            setReview(response.data.filter(item => item.module_id == id_module && item.mentee_id == mentee.id));
          }
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (id_module && mentee) {
      fetchData();
    }
  }, [id_module]);

  return (
    <React.Fragment>
      {course
        ? course.map((value, index) => (
            <div key={index}>
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
                      <Grid item xs={12} sm={3} className={classes.gridOf}>
                        <Typography gutterBottom variant="h6" component="h2">
                          {index + 1} of {course.length} Subjects
                        </Typography>
                      </Grid>
                      {value.is_complete ? (
                        <Grid item xs={12} sm={2} className={classes.button}>
                          <Link
                            href={
                              "/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]"
                            }
                            as={`/courses/phase/${id}/${id_module}/${module}/${
                              value.subject_id
                            }/${value.subject.name.split(" ").join("-")}`}
                          >
                            <Button
                              className={classes.done}
                              variant="contained"
                              color="secondary"
                            >
                              <DoneAllIcon />
                              Done
                            </Button>
                          </Link>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={2} className={classes.button}>
                          <Link
                            href={
                              "/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]"
                            }
                            as={`/courses/phase/${id}/${id_module}/${module}/${
                              value.subject_id
                            }/${value.subject.name.split(" ").join("-")}`}
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
                      <Grid item xs={12} sm={3} className={classes.gridOf}>
                        <Typography
                          className={classes.moduleLocked}
                          gutterBottom
                          variant="h6"
                          component="h2"
                        >
                          {index + 1} of {course.length} Subjects
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
      <div>
        {course ? (
          course.filter((mod) => mod.is_complete === true).length ===
          course.length ? (
            <Paper elevation={0} className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Typography gutterBottom variant="h6" component="h2">
                    Feedback Module
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.gridOf}>
                  <Typography gutterBottom variant="h6" component="h2">
                    Form
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2} className={classes.button}>
                  {review ? (
                    review != "undefined" &&
                    review != null &&
                    review.length != null &&
                    review.length > 0 ? (
                      <Button
                        className={classes.doneFeedback}
                        variant="contained"
                        color="secondary"
                      >
                        <DoneAllIcon />
                        Done
                      </Button>
                    ) : (
                      <Link
                        href={
                          "/courses/phase/[id]/[id_module]/[module]/feedback"
                        }
                        as={`/courses/phase/${id}/${id_module}/${module}/feedback`}
                      >
                        <Button
                          className={classes.doneFeedback}
                          variant="contained"
                          color="secondary"
                        >
                          Give Review
                        </Button>
                      </Link>
                    )
                  ) : null}
                </Grid>
              </Grid>
            </Paper>
          ) : null
        ) : null}
      </div>
    </React.Fragment>
  );
}
