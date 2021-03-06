import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: "#F4F7FC",
  },
  search: {
    margin: theme.spacing(1),
    width: `calc(15em + 12vw)`,
    backgroundColor: "white",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  form: {
    margin: theme.spacing(1),
    width: `calc(12em + 0.2vw)`,
    backgroundColor: "white",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  dropDown: {
    margin: theme.spacing(1),
    width: `calc(7em + 0.1vw)`,
    backgroundColor: "white",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  label: {
    margin: theme.spacing(1),
  },
  iconSearch: {
    color: "silver",
  },
  item: {
    color: theme.palette.secondary.secondary,
  },
}));

export default function FilterMentee() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    keyword: "",
    phase: "",
    sort: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            <TextField
              className={classes.search}
              size="small"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              placeholder="Search"
              onChange={handleChange("keyword")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchSharpIcon className={classes.iconSearch} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid>
            <FormControl
              variant="outlined"
              size="small"
              className={classes.dropDown}
            >
              <InputLabel color="secondary">Sort by</InputLabel>
              <Select
                label="phase"
                value={values.sort}
                onChange={handleChange("sort")}
              >
                <MenuItem value="" className={classes.item}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"name"} className={classes.item}>
                  Name
                </MenuItem>
                <MenuItem value={"progress"} className={classes.item}>
                  Progress
                </MenuItem>
                <MenuItem value={"id"} className={classes.item}>
                  Id
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              variant="outlined"
              size="small"
              className={classes.dropDown}
            >
              <InputLabel color="secondary">Phase</InputLabel>
              <Select
                label="phase"
                value={values.phase}
                onChange={handleChange("phase")}
              >
                <MenuItem value="" className={classes.item}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1} className={classes.item}>
                  One
                </MenuItem>
                <MenuItem value={2} className={classes.item}>
                  Two
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <InputLabel className={classes.label}>Register date:</InputLabel>
              <form className={classes.container} noValidate>
                <TextField
                  id="startDate"
                  variant="outlined"
                  size="small"
                  label="from"
                  type="date"
                  color="secondary"
                  onChange={handleChange("startDate")}
                  className={classes.form}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="endDate"
                  variant="outlined"
                  size="small"
                  label="to"
                  type="date"
                  color="secondary"
                  onChange={handleChange("endDate")}
                  className={classes.form}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
