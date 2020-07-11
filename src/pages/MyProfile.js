import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MyForm from "../components/ProfileForm";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/auth-contex";

//kod kopiran sa stranice
//https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/checkout
// i napravljene promjene kako bi se moglo mjenjati ime i dodavati u bazu

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["User date"];

export default function MyProfile() {
  const [context, setContext] = useContext(AuthContext);
  const requestBody = gql`
  {
    userById(id: "${context.userId}") {
      name
      surname
      email
    }
  }
`;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { loading, data } = useQuery(requestBody);
  const history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const onChange = (name, surname) => {
    setName(name);
    setSurname(surname);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    const userId = localStorage.getItem("userId").toString();
    const requestBody = {
      query: `
      mutation{
        updateUser(name: "${name}", surname: "${surname}", id: "${userId}"){
          name
          surname
        }
      }`,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
    let path = `/`;
    history.push(path);
  };

  return (
    <React.Fragment>
      {!loading && (
        <React.Fragment>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            className={classes.appBar}
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap></Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Change info
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <MyForm
                name={data.userById[0].name}
                surname={data.userById[0].surname}
                email={data.userById[0].email}
                onChange={onChange}
              ></MyForm>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Save
              </Button>
            </Paper>
          </main>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
