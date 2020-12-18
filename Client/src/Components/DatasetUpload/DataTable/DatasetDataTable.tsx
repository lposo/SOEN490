import 'react-data-grid/dist/react-data-grid.css'

import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid'
import { IContent, IData, IVariable, defaultVariable } from '../../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { Button } from '@material-ui/core'
import { EditVariableHeader } from './EditVariableHeader'

interface IProps {
  data: IData,
  onDataChange: (newData: IData) => void
}

export const DatasetDataTable = (props: IProps) => {
  const [editedVariableIndex, setEditedVariableIndex] = useState(-1)
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>())

  const handleHeaderClick = (indexOfClickedHeader: number) => {
    setEditedVariableIndex(indexOfClickedHeader)
  }

  const handleClose = () => {
    setEditedVariableIndex(-1)
  }

  const handleVariableUpdate = (variable: IVariable, index: number) => {
    //todo if this works, remove the SJON.stringify
    const copyData = { ...props.data }
    copyData.variables[index] = variable
    props.onDataChange(copyData)
    handleClose()
  }

  const handleVariableRemove = (index: number) => {
    const copyData = { ...props.data }
    copyData.variables.splice(index, 1)

    let copyContents: IContent[] = [...props.data.contents]
    removeColumnPoints(copyContents, index)
    copyData.contents = copyContents

    props.onDataChange(copyData)
    handleClose()
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

    // once column added immediately enter edit state for that column
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
            onEditModalClose={handleClose}
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

  const handleRowChange = (changedRows) => {
    const copyData = { ...props.data }
    //changedRows is the rows after user input, we need to update copyData's contents via a map with an index:
    copyData.contents.map((row, index) => row.point = changedRows[index])
    // and then callback with updated data
    props.onDataChange(copyData)
  }

  const rowKeyGetter = (row: any) => {
    return props.data.contents.findIndex(suchRow => suchRow.point == row)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddRow}>Add row</Button>
      <Button variant="contained" color="primary" onClick={handleAddColumn}>New variable</Button>
      <Button variant="contained" color="secondary" onClick={handleRemoveSelectedRows}>Remove selected</Button>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={getColumns()}
        rows={getRows()}
        onRowsChange={handleRowChange}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />
    </>
  )
}