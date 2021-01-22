import { Form, Formik } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'
import { listCategories, listMaterials, listSubcategories } from '../../Remote/Endpoints/DatasetEndpoint'

import { Button } from '@material-ui/core'
import { DataForm } from './DataSection/DataForm'
import { MetaForm } from './MetaSection/MetaForm'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'

interface IProps {
  initialDataset: IDatasetModel,
  onSubmit(formDataset: IDatasetModel): void
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetUploadForm = (props: IProps): any => {
  const { initialDataset, onSubmit } = props

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    const callListCategories = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }

    const callListSubcategory = async () => {
      const subcategories = await listSubcategories()
      setSubcategories(subcategories)
    }

    const callListMaterials = async () => {
      const materials = await listMaterials()
      setMaterials(materials)
    }

    callListCategories()
    callListSubcategory()
    callListMaterials()
  }, [])

  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data

  const initialValues: DatasetUploadFormValues = { meta, reference, data }

  const handleSubmit = (values: DatasetUploadFormValues) => {
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    console.log(dataset)
    onSubmit(dataset)
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <MetaForm materials={materials} categories={categories} subcategories={subcategories} />
        <ReferenceForm />
        <DataForm />
        <Button variant="contained" color="primary" type="submit">Save Dataset</Button>
      </Form>
    </Formik>
  )
}