import 'react-data-grid/dist/react-data-grid.css'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid'
import { IContent, IData, IVariable, defaultVariable } from '../../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { EditVariableHeader } from './EditVariableHeader'

interface IProps {
  data: IData,
  onDataChange: (newData: IData) => void
}

export const DatasetDataTable = (props: IProps) => {
  const [editedVariableIndex, setEditedVariableIndex] = useState(-1)
  const [selectedRows, setSelectedRows] = useState(new Set<React.Key>())

  const handleHeaderClick = (indexOfClickedHeader: number) => {
    setEditedVariableIndex(indexOfClickedHeader)
  }

  const closeEditVariableModal = () => {
    setEditedVariableIndex(-1)
  }

  const handleVariableUpdate = (variable: IVariable, index: number) => {
    const copyData = { ...props.data }
    copyData.variables[index] = variable
    props.onDataChange(copyData)

    closeEditVariableModal()
  }

  const handleVariableRemove = (index: number) => {
    const copyData = { ...props.data }
    copyData.variables.splice(index, 1)

    let copyContents: IContent[] = [...props.data.contents]
    removeColumnPoints(copyContents, index)
    copyData.contents = copyContents

    props.onDataChange(copyData)
    closeEditVariableModal()
  }

  const removeColumnPoints = (copyContents: IContent[], columnIndex: number) => {
    for (let i = 0; i < copyContents.length; i++) {
      copyContents[i].point = copyContents[i].point.filter((point, index) => {
        return index !== columnIndex
      })
    }
  }

  const handleAddColumn = () => {
    const copyData = { ...props.data }
    copyData.variables.push(defaultVariable)
    props.onDataChange(copyData)

    setEditedVariableIndex(copyData.variables.length - 1)
  }

  const handleRemoveSelectedRows = () => {
    const copyData = { ...props.data }
    copyData.contents = copyData.contents.filter((row, index) => !selectedRows.has(index))
    props.onDataChange(copyData)

    resetSelection()
  }

  const handleAddRow = () => {
    const copyData = { ...props.data }
    copyData.contents.push({ comments: '', point: new Array(props.data.variables.length).fill(0) })
    props.onDataChange(copyData)
  }

  const resetSelection = () => {
    setSelectedRows(() => new Set<React.Key>())
  }

  const getColumns = () => {
    const columns = props.data.variables.map((variable, index) => {
      return (
        {
          // eslint-disable-next-line react/display-name
          key: `${index}`, name: variable.name, editable: true, editor: TextEditor, headerRenderer: () => <EditVariableHeader
            variable={variable}
            index={index}
            editMode={editedVariableIndex === index}
            onHeaderClick={handleHeaderClick}
            onEditModalClose={closeEditVariableModal}
            onVariableUpdate={handleVariableUpdate}
            onVariableRemove={handleVariableRemove}
          />
        }
      )
    })

    return [SelectColumn, ...columns]
  }

  const getRows = () => {
    return props.data.contents.map(content => content.point)
  }

  const handleRowChange = (changedRows: number[][]) => {
    const copyData = { ...props.data }
    // changedRows is the rows after user input, we need to update copyData's contents via a map with an index:
    copyData.contents.map((row, index) => row.point = Object.values(changedRows[index]))
    // and then callback with updated data
    props.onDataChange(copyData)
  }

  const rowKeyGetter = (row: any) => {
    return props.data.contents.findIndex(suchRow => suchRow.point == row)
  }

  const renderTopButtons = () => {
    return (
      <>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddRow}>Add row</Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddColumn}>New variable</Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleRemoveSelectedRows}>Remove selected</Button>
        </Grid>
      </>
    )
  }

  return (
    <>
      <Grid container>
        <Grid item container sm={6}>
          <Grid item>
            <Typography variant='h6' align="left">Data</Typography>
          </Grid>
        </Grid>

        <Grid item container sm={6} spacing={2} justify='flex-end'>
          {renderTopButtons()}
        </Grid>
      </Grid>

      <Box width='100%' mt={4}>
        <DataGrid
          rowKeyGetter={rowKeyGetter}
          columns={getColumns()}
          rows={getRows()}
          onRowsChange={handleRowChange}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
        />
      </Box>
    </>
  )
}