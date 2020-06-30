import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import AdminContext from "../../store/adminContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import DeleteRequirement from "./DeleteRequirement";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    minWidth: theme.spacing(8),
    padding: "7px 20px",
    textTransform: "none",
    width: "180px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
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
  textField: {
    width: "100%",
    margin: theme.spacing(1, 0, 1, 0),
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
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  buttonIcon: {
    color: "white",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  buttonAddReq: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    minWidth: theme.spacing(8),
    padding: "7px 20px",
    textTransform: "none",
    width: "250px",
    marginBottom: theme.spacing(3),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
}));

export default function EditModule(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [module, setModule] = React.useState();
  const [requirement, setRequirement] = React.useState();

  const [values, setValues] = React.useState({
    name: props.name,
    description: "",
    description_module: props.description,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postEditModule = async () => {
    setOpen(false);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/module/" + props.id;
    const auth = cookies.token_admin;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description_module);

    try {
      const response = await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth,
        },
      });
      if (response.status === 200) {
        setLoad(true);
        setCookie("module", response.data);
        setModule(response.data);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  };

  const postEditRequirement = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/requirementmodule";
    const auth = cookies.token_admin;

    const MyJOSN = JSON.stringify({
      description: values.description,
      module_id: props.id_module,
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
        setCookie("requirement", response.data);
        setRequirement(response.data);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
    setValues({ ...values, requirement: "" });
    document.getElementById("add-requirement").value = "";
  };

  return (
    <div>
      <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
        <EditIcon className={classes.buttonIcon} fontSize="default" />
      </IconButton>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.allText}>
          Edit Module
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.allText}>Nama Module</Typography>
          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            label="Module Name"
            size="small"
            defaultValue={props.name}
            onChange={handleChange("name")}
          />
          <Typography className={classes.allText}>Nama Mentor</Typography>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            size="small"
            color="secondary"
          >
            <InputLabel color="secondary">Mentor</InputLabel>
            <Select label="Mentor" value={1}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"1"}>
                Prof. Kobar Septianus S.Pd, M.Komp
              </MenuItem>
              <MenuItem value={"2"}>Dinsyah</MenuItem>
              <MenuItem value={"3"}>Razin</MenuItem>
              <MenuItem value={"4"}>Faris</MenuItem>
            </Select>
          </FormControl>
          <Typography className={classes.allText}>
            {props.description}
          </Typography>
          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            rows={7}
            multiline
            label="Module Description"
            size="small"
            defaultValue={props.description}
            onChange={handleChange("description_module")}
          />
          <TextField
            id="add-requirement"
            className={classes.textField}
            variant="outlined"
            color="secondary"
            rows={2}
            multiline
            label="System Requirements Module"
            size="small"
            // defaultValue={props.description}
            onChange={handleChange("description")}
          />
          <Button
            onClick={postEditRequirement}
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.buttonAddReq}
            startIcon={<AddIcon />}
          >
            Add System Requirements
          </Button>
          <Typography className={classes.allText}>
            System Requirements :
          </Typography>
          <List>
            {props.requirement.map((item, index) => (
              <ListItem>
                <DeleteRequirement id_requirement={item.id} color="secondary" />
                <Typography className={classes.allText}>
                  {item.description}
                </Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            Cancel
          </Button>
          <Button
            onClick={postEditModule}
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
