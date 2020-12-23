//this function returns error, helper text props, then name, value, onChange and onBlur by formik.getFieldProps
export const getErrorAndFormikProps = (formik: any, fieldName: string) => {
  const error = formik.touched[fieldName] && !!formik.errors[fieldName]
  const helperText = formik.touched[fieldName] && formik.errors[fieldName]
  return { error: error, helperText: helperText, ...formik.getFieldProps(fieldName) }
}