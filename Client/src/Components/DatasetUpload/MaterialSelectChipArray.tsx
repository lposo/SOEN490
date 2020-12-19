//todo move views into their corresponding feature folders

import { Chip, Grid, TextField } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { IMaterial } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
  selectedMaterials: IMaterial[],
  name: string,
  label: string,
  options: IMaterial[],
  onChange: (selectedValues: IMaterial[]) => void
}

export const MaterialSelectChipArray = (props: IProps) => {

  const handleDelete = (materialToDelete: IMaterial) => {
    props.onChange(props.selectedMaterials.filter((material) => materialToString(material) != materialToString(materialToDelete)))
  }

  const materialToString = (material: IMaterial) => {
    return material.composition + ' ' + material.details
  }

  const handleChange = (event, newMaterial: IMaterial) => {
    if (props.selectedMaterials.findIndex((material) => materialToString(material) == materialToString(newMaterial)) == -1) {
      props.onChange([...props.selectedMaterials, newMaterial])
    }
    else {
      //notify: already there
    }
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        {props.selectedMaterials.map((material, index) => <Grid item key={index}><Chip label={materialToString(material)} key={index} variant="outlined" onDelete={() => handleDelete(material)} /></Grid>)}
        <Grid item sm={6}>
          <Autocomplete
            onChange={handleChange}
            options={props.options}
            getOptionLabel={option => materialToString(option)}
            renderInput={(params) => <TextField {...params} label="Material" variant="outlined" size="small" />}
          />
        </Grid>
      </Grid>
    </>
  )
}