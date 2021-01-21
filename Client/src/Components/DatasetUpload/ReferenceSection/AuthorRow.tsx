import * as Yup from 'yup'

import { Box, Grid, IconButton, TextField } from "@material-ui/core"
import { FastField, Field, useFormik } from "formik"

import ClearIcon from '@material-ui/icons/Clear'
import { IAuthor } from "../../../Models/Datasets/IDatasetModel"
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'

interface IProps {
  index: number,
  onRemoveAuthorClick: (index: number) => void,
  removable: boolean
}

export const AuthorRow = (props: IProps) => {
  const { index, onRemoveAuthorClick, removable } = props

  const removeButton = () => {
    return (
      <IconButton color="primary" aria-label="remove author" onClick={() => onRemoveAuthorClick(index)}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Box>
      <Grid item container spacing={4}>
        <Grid item>
          <FastField name={`reference.authors[${index}].firstName`} label='First Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          <FastField name={`reference.authors[${index}].middleName`} label='Middle Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          <FastField name={`reference.authors[${index}].lastName`} label='Last Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          {removable ? removeButton() : null}
        </Grid>
      </Grid>
    </Box>
  )
}