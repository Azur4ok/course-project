import React from "react";
import { AuthForm } from "./auth-form/AuthForm";
import classes from "./auth-page.module.css"

export const AuthorizationPage = () => {
    return (
        <div className={classes.authPage}>
            <AuthForm />
        </div>
    )
}
