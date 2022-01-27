import { Typography, TextField, Button } from "@mui/material";
import { useForm, Controller, useFormState } from "react-hook-form";
import React, { useState, useEffect } from "react";
import classes from "./auth-form.module.css";
import { passwordValidation, loginValidation } from "./validation";
import instance from "../../../http";
import { API_ROUTES } from "./../../../http/API_ROUTES.";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const { handleSubmit, control } = useForm();
  const { errors } = useFormState({ control });
  const [stateError, setStateError] = useState(false);
  const router = useNavigate();
  const navigate = useNavigate();
  const handleChange = (param) => {
    if (param.match(/[а-яА-Я]/)) return setStateError(true);

    return setStateError(false);
  };
  const onSubmit = async (data) => {
    const result = await instance.post(API_ROUTES.AUTH, {
      username: data.username,
      password: data.password,
    });

    if(result.error) {
    console.log( result.error);
    }
    else {
      navigate("/profile")
    }
  };

  return (
    <div className={classes.authContainer}>
      <Typography variant="h4" component="div" gutterBottom={true}>
        Hi
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className={classes.authFormSubtitle}
      >
        Join to us!
      </Typography>
      <form className={classes.authForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="username"
              size="small"
              margin="normal"
              fullWidth={true}
              className={classes.authFormInput}
              onChange={(e) => {
                handleChange(e.target.value);
                field.onChange(e);
              }}
              value={field.value}
              error={!!errors.login?.message || stateError}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="password"
              type="password"
              size="small"
              margin="normal"
              fullWidth={true}
              className={classes.authFormInput}
              onChange={(e) => {
                handleChange(e.target.value);
                field.onChange(e);
              }}
              value={field.value}
              error={!!errors.password?.message || stateError}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button size="small"> forgot password?</Button>
        <Button
          type="submit"
          variant="contained"
          disableElevation={true}
          fullWidth={true}
          sx={{ marginTop: 2 }}
        >
          Log in
        </Button>
        <Button
          onClick={() => router("/registration")}
          variant="contained"
          disableElevation={true}
          fullWidth={true}
          sx={{ marginTop: 2 }}
        >
          Click to registration
        </Button>
      </form>
    </div>
  );
};
