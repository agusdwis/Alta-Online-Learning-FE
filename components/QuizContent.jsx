import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../store/adminContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Router, { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import LoadingSmall from "./LoadingSmall";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  score: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: "4vw",
    textAlign: "center",
    fontWeight: "bold",
  },
  ketscore: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: "1.5vw",
    textAlign: "center",
  },
  allText: {
    color: "#F4F7FC",
    fontFamily: "Muli, sans-serif",
    fontWeight: "bolder",
    fontSize: `calc(0.8em + 0.5vw)`,
    zIndex: "1",
    padding: "5px",
  },
  buttonInPop: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    minWidth: theme.spacing(12),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  dialogTitle: {
    color: theme.palette.secondary.secondary,
    fontFamily: "muli",
  },
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(4),
    fontSize: `calc(0.6em + 0.7vw)`,
    fontFamily: "Muli, sans-serif",
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
    marginTop: "-80px",
    minWidth: theme.spacing(25),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  btnEndTest: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(4),
    fontSize: `calc(0.6em + 0.7vw)`,
    fontFamily: "Muli, sans-serif",
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
    minWidth: theme.spacing(20),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingTop: 0,
    marginBottom: theme.spacing(20),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontWeight: "bold",
    fontSize: `calc(1.0em + 1.5vw)`,
  },
  media: {
    height: theme.spacing(30),
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  gambar: {
    width: `calc(18em + 17.8vw)`,
  },
  textReady: {
    textAlign: "center",
    fontSize: `calc(0.8em + 0.8vw)`,
    fontWeight: "bolder",
    margin: "-80px 0 100px",
    color: theme.palette.secondary.secondary,
  },
  cardTime: {
    margin: theme.spacing(0, 0, 0, -3),
    position: "fixed",
    backgroundColor: theme.palette.secondary.secondary,
    borderRadius: "10px",
  },
}));

const useModels = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: theme.spacing(5),
    paddingTop: 0,
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  spacing: {
    flexBasis: "5%",
  },
  perQuest: {
    marginBottom: theme.spacing(3),
  },
  answers: {
    marginTop: theme.spacing(-2),
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
}));
function Timers(props) {
  const classes = useStyles();
  const [second, setSecond] = React.useState(0);

  const countDownDate =
    new Date(props.timeStart).getTime() + new Date("9999 09:00:00").getTime();
  const now = Date.now();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (3600000 * 24)) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  const secondShow = ("00" + seconds).substr(-2);
  const minuteShow = ("00" + minutes).substr(-2);
  const hourShow = ("00" + hours).substr(-2);

  React.useEffect(() => {
    const timer = setInterval(() => setSecond(second - 1), 1000);
    return () => clearInterval(timer);
  }, [second]);
  if (hours === 0 && minutes === 0 && seconds === 0) {
    props.endExamQuiz(props.historyExam.id);
  }
  return (
    <div>
      <Card className={classes.cardTime}>
        {props.historyExam.is_complete ? (
          <Typography className={classes.allText}>00:00:00</Typography>
        ) : (
          <Typography className={classes.allText}>
            {hourShow}:{minuteShow}:{secondShow}
          </Typography>
        )}
      </Card>
    </div>
  );
}
function StyledRadio(props) {
  const classes = useModels();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}
function EndQuiz(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendEndTest = () => {
    props.endExamQuiz(props.historyID);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary"
        size="medium"
        className={classes.btnEndTest}
      >
        End Quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          Are you sure want to end this test?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            No
          </Button>
          <Button
            onClick={sendEndTest}
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Question({ question, no, historyID }) {
  const classes = useModels();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [cookies, setCookie] = useCookies();
  const [answer, setAnswer] = React.useState();
  const handleChange = () => (answer) => {
    setAnswer(answer.target.value);
    postAnswer(answer.target.value);
  };

  const postAnswer = async (myAnswer) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/correctionexam";
    const auth = cookies.token_mentee;
    const MyJOSN = JSON.stringify({
      history_exam_id: historyID,
      answer_quiz_id: myAnswer,
      question_quiz_id: question.id,
    });

    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.perQuest}>
        <Grid container spacing={0}>
          <Grid item xs={1} className={classes.spacing}>
            <Typography className={classes.allText}>{no + 1}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography paragraph className={classes.allText}>
              {question.question}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={1} className={classes.spacing}></Grid>
          <Grid item xs={11}>
            <FormControl component="fieldset">
              <RadioGroup
                className={classes.answers}
                defaultValue="None"
                aria-label="answer"
                name="customized-radios"
                onChange={handleChange()}
              >
                {question.choice.map((element, num) => (
                  <FormControlLabel
                    key={num}
                    control={<StyledRadio />}
                    value={element.id.toString()}
                    label={element.choice}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </main>
  );
}

export default function QuizContent({ quiz, examID }) {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module, id_subject, subject_name } = router.query;
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const [historyExam, setHistoryExam] = useState();
  const [examDone, setExamDone] = useState();
  const auth = cookies.mentee.token;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const goToMyCourses = () => {
    Router.push("/courses");
  };
  const goToHome = () => {
    Router.push("/");
  };

  const posthistoryExam = async (examID) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyexam";
    const MyJOSN = JSON.stringify({
      exam_id: examID,
    });
    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false);
    }
  };
  const postEndExam = async (historyID) => {
    setOpen(true);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/correctionexam/submit";
    const MyJOSN = JSON.stringify({
      history_exam_id: historyID,
    });
    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false);
    }
  };
  React.useEffect(() => {
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyexam";
    const fetchData = async function () {
      try {
        // setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token_mentee,
          },
          params: {
            exam_id: examID,
          },
        });
        if (response.status === 200) {
          if (response.data.status === "not_found") {
            setHistoryExam(null);
          } else {
            setHistoryExam(
              response.data.filter((item) => item.is_complete === false)
            );
            setExamDone(
              response.data.filter((item) => item.is_complete === true)
            );
          }
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [load]);

  if (!quiz) {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <main className={classes.content}>
        <Grid container>
          <Grid xs={1}></Grid>
          <Grid xs={10}>
            <Typography variant="h4" className={classes.title}>
              {quiz.name}
            </Typography>
            {examDone ? (
              <div>
                <Dialog
                  fullWidth
                  maxWidth={"xs"}
                  open={open}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{ color: "#19355f" }}
                  >
                    Your Score
                  </DialogTitle>
                  <DialogContent>
                    {examDone[examDone.length - 1] != undefined ? (
                      examDone[examDone.length - 1].score >= 80 ? (
                        loading ? (
                          <LoadingSmall />
                        ) : (
                          <div>
                            <Typography className={classes.ketscore}>
                              Congratulation! Your Score is :
                            </Typography>
                            <Typography className={classes.score}>
                              {examDone[examDone.length - 1].score}
                            </Typography>
                          </div>
                        )
                      ) : examDone.length === 2 ? (
                        loading ? (
                          <LoadingSmall />
                        ) : (
                          <div>
                            <Typography className={classes.ketscore}>
                              You have one chance again to get score more than
                              80, if you can't get score 80 or more, you will go
                              back to first leason again
                            </Typography>
                            <Typography className={classes.score}>
                              {examDone[examDone.length - 1].score}
                            </Typography>
                          </div>
                        )
                      ) : (
                        <div>
                          {examDone.map((item, key) =>
                            loading ? (
                              <LoadingSmall />
                            ) : (
                              <div key={key}>
                                <Typography className={classes.ketscore}>
                                  Your score in quiz {key + 1} :
                                </Typography>
                                <Typography className={classes.score}>
                                  {item.score}
                                </Typography>
                              </div>
                            )
                          )}
                        </div>
                      )
                    ) : null}
                  </DialogContent>
                  <DialogActions>
                    {examDone[examDone.length - 1] != undefined ? (
                      examDone[examDone.length - 1].score < 80 ? (
                        examDone.length === 2 ? (
                          <Button
                            onClick={goToHome}
                            variant="outlined"
                            size="medium"
                            className={classes.buttonInPop}
                          >
                            OK
                          </Button>
                        ) : (
                          <div>
                            <Button
                              onClick={handleClose}
                              variant="outlined"
                              size="medium"
                              className={classes.buttonInPop}
                            >
                              Try Again?
                            </Button>
                            <Link
                              href={`/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]`}
                              as={`/courses/phase/${id}/${id_module}/${module}/${id_subject}/${subject_name}`}
                            >
                              <Button
                                variant="outlined"
                                size="medium"
                                className={classes.buttonInPop}
                              >
                                Go to class
                              </Button>
                            </Link>
                          </div>
                        )
                      ) : (
                        <Button
                          onClick={goToMyCourses}
                          variant="outlined"
                          size="medium"
                          className={classes.buttonInPop}
                        >
                          Next
                        </Button>
                      )
                    ) : null}
                  </DialogActions>
                </Dialog>
              </div>
            ) : null}
            {historyExam === null ? (
              <div>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <img
                    alt="test"
                    className={classes.gambar}
                    src={"/images/test.jpg"}
                  />
                  <Typography className={classes.textReady}>
                    Are you ready for the Quiz?
                  </Typography>
                  <Button
                    onClick={() => posthistoryExam(examID)}
                    variant="outlined"
                    className={classes.button}
                  >
                    Start
                  </Button>
                </Grid>
              </div>
            ) : (
              <div>
                {historyExam ? (
                  historyExam.length === 0 ? (
                    <div>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <img
                          alt="test"
                          className={classes.gambar}
                          src={"/images/test.jpg"}
                        />
                        <Typography className={classes.textReady}>
                          Are you ready for Quiz?
                        </Typography>
                        <Button
                          onClick={() => posthistoryExam(examID)}
                          variant="outlined"
                          className={classes.button}
                        >
                          Start
                        </Button>
                      </Grid>
                    </div>
                  ) : (
                    <div>
                      <EndQuiz
                        historyID={historyExam[historyExam.length - 1].id}
                        endExamQuiz={(historyID) => postEndExam(historyID)}
                      />
                      {quiz.question.map((item, key) => (
                        <Question
                          key={key}
                          historyID={historyExam[historyExam.length - 1].id}
                          no={key}
                          question={item}
                        />
                      ))}
                    </div>
                  )
                ) : null}
              </div>
            )}
          </Grid>
          <Grid xs={1}>
            {historyExam === null ? null : historyExam ? (
              historyExam.length === 0 ? null : (
                <Timers
                  timeStart={historyExam[historyExam.length - 1].created_at}
                  historyExam={historyExam[historyExam.length - 1]}
                  endExamQuiz={(historyID) => postEndExam(historyID)}
                />
              )
            ) : null}
          </Grid>
        </Grid>
      </main>
    );
  }
}
