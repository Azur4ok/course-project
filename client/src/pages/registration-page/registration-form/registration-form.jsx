import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import classes from "./registration-form.module.css";
import instance from "../../../http";
import { API_ROUTES } from "./../../../http/API_ROUTES.";

export const RegistrationForm = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    await instance.post(API_ROUTES.REGISTRATION, 
      {
        username: data.username,
        password: data.password,
      },
    );
  };

  return (
    <div className={classes.authorPageContainer}>
      <Typography variant="h4" component="div" gutterBottom={true}>
        Hi
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className={classes.authFormSubtitle}
      >
        Let's sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.authForm}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              label="username"
              size="small"
              margin="normal"
              fullWidth={true}
              variant="outlined"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="password"
              type="password"
              size="small"
              margin="normal"
              fullWidth={true}
              variant="outlined"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="password"
              type="password"
              size="small"
              margin="normal"
              fullWidth={true}
              variant="outlined"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Button
          variant="contained"
          fullWidth={true}
          type="submit"
          disableElevation={true}
          sx={{
            marginTop: 2,
          }}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};
