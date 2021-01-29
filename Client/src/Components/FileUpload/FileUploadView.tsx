import { Box, Button } from '@material-ui/core'

import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm'
import Download from '@axetroy/react-download'
import { FileUploadForm } from './FileUploadForm'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'
import { rm } from "../../Assets/readMeMessage"

const fileFormat = 'application/json'

export const FileUploadView = () => {
  const isValidFile = (file: File) => {
    return file && file.type === fileFormat
  }
  const handleUploadFormSubmit = (values: IDatasetModel) => {

  }
  const handleSubmit = async (jsonFile: File) => {
    const formData = new FormData()
    formData.append('file', jsonFile)

    try {
      const response = await fetch('/api/v1/dataExtract', {
        method: 'POST',
        body: formData
      })
      const extractedDataset = await response.json()
      console.log(extractedDataset, 'extracted dataset')
      //Refresh or reroute here
      return (
        <DatasetUploadForm
          onSubmit={handleUploadFormSubmit}
          initialDataset={extractedDataset}
        />
      )

    }
    catch (err) {
      //todo add error handling
    }
  }

  return (
    <>
      <FileUploadForm
        onSubmit={handleSubmit}
      // validateFile={isValidFile}
      />
      <Box p={4}>
        <Download file="emptyJsonDataset.json" content={JSON.stringify("../../Assets/emptyJSFile.json", null, 2)}>
          <Button type="submit" variant="contained"> Download Sample JSON file </Button>
        </Download>
        <Download file="readMe.txt" content={rm}>
          <a href="http://localhost:3000/#/uploadFile"> Download JSON file submission instructions </a>
        </Download>
      </Box>
    </>
  )
}