import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function ProfileForm(props) {
  const [inputValues, setInputValues] = useState({
    name: props.name,
    surname: props.surname,
  });
  const handleOnChange = (event) => {
    const { name, value } = event.target;

    props.onChange(inputValues.name, inputValues.surname);
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="name"
            label={props.name}
            fullWidth
            autoComplete="given-name"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="surname"
            label={props.surname}
            fullWidth
            autoComplete="family-name"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Box bgcolor="text.secondary" height="100%" textAlign="center">
            {props.email}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
