import React from 'react'
import { get } from "../RemoteHelper"

const singleSavedGraph = '/api/v1/savedGraphs/oneSavedGraph/:oneSavedGraph'
const userSavedGraphs = '/api/v1/userSavedGraphs'
const deleteSavedGraph = '/api/v1/deleteSavedGraph/:deleteSavedGraph'

//to refactor
interface ISavedGraphModel {
    datasets: any[]
    name: string
    axis: any[]
    id: string
}

// export const listGraphStates = async () => {
//     const graphList = await get(singleSavedGraph)
//     return graphList
// }

export const listSavedGraphStates = async (): Promise<ISavedGraphModel[]> => {
    const graphList = await get(userSavedGraphs)
    return graphList
}
// export const listDeletedGraphs = async () => {
//     const graphList = await get(deleteSavedGraph)
//     return graphList
// }