import { FastField, Form, Formik } from 'formik'
import { IForgotPasswordModel, defaultForgotPasswordModel } from '../../Models/Authentication/ISignUpModel';

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { MuiTextFieldFormik } from '../Forms/FormikFields'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { callForgotPassword } from '../../Remote/Endpoints/AuthenticationEndpoint'
import { forgotPasswordValidationSchema } from './AuthenticationValidationSchema'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ForgotPasswordView() {

  const classes = useStyles()

  const handleForgotPasswordSubmit = async (resetPasswordInfo: IForgotPasswordModel): Promise<void> => {
    await callForgotPassword(resetPasswordInfo)
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Formik
          initialValues={defaultForgotPasswordModel}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleForgotPasswordSubmit}
        >
          <Form className={classes.form} noValidate>
            <FastField
              variant="outlined"
              margin="normal"
              required
              id="forgotPasswordEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              component={MuiTextFieldFormik}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              id="forgotPasswordButton"
            >
              Forgot Password
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  )
}