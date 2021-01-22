import { Form, Formik } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference } from '../../Models/Datasets/IDatasetModel'

import { Button } from '@material-ui/core'
import { DataForm } from './DataSection/DataForm'
import { MetaForm } from './MetaSection/MetaForm'
import React from 'react'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import { validationSchema } from './DatasetValidationSchema'

interface IProps {
  materials: IMaterial[],
  initialDataset: IDatasetModel,
  onSubmit(formDataset: IDatasetModel): void
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetUploadForm = (props: IProps): any => {

  const { materials, initialDataset, onSubmit } = props

  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data

  const initialValues: DatasetUploadFormValues = { meta, reference, data }

  const handleSubmit = (values: DatasetUploadFormValues) => {
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <MetaForm materials={materials} />
        <ReferenceForm />
        <DataForm />
        <Button variant="contained" color="primary" type="submit">Save Dataset</Button>
      </Form>
    </Formik>
  )
}