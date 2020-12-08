import { IDatasetResponseModel } from "../models/interfaces/DatasetResponseModelInterface";
import {
    getDatasetIDFromMaterial, getDatasetIDFromAuthor, getDatasetIDFromCategory,
    getDatasetIDFromSubcategory, getDatasetIDFromYear, getAllData
} from "../models/DataQueryModel";

interface IDataRequestModel {
    datasetId: number
    material: string
    firstName: string
    lastName: string
    year: number
    categoryId: number
    subcategoryId: number
}

export const retrieveData = async (req) => {

    const request: IDataRequestModel = req.query
    let datasetReceived = request.datasetId;
    let materialReceived = request.material;
    let firstNameReceived = request.firstName;
    let lastNameReceived = request.lastName;
    let yearReceived = request.year;
    let categoryReceived = request.categoryId;
    let subcategoryReceived = request.subcategoryId;
    let selectedDatasetIds;
    let setOfData;

    if (datasetReceived != undefined) {
        selectedDatasetIds = [datasetReceived];
    }
    else {
        selectedDatasetIds = await getDatasetIdsFromParams(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived)
    }
    setOfData = getDataFromDatasetIds(selectedDatasetIds)
    return setOfData;
}

export const getDatasetIdsFromParams = async (materialReceived: string, yearReceived: number, firstNameReceived: string, lastNameReceived: string, categoryReceived: number, subcategoryReceived: number) => {
    let materialRawData;
    let yearRawData;
    let authorRawData;
    let categoryRawData;
    let paramsEntered = 0;
    // paramsEntered is used to track how many params were entered
    let materialDatasetIds = [];
    let yearDatasetIds = [];
    let authorDatasetIds = [];
    let categoryDatasetIds = [];

    // Check which variables were received and the data sets IDs linked to each variable
    if (materialReceived != undefined) {
        paramsEntered++
        materialRawData = await getDatasetIDFromMaterial(materialReceived);
        for (let index = 0; index < materialRawData.length; index++) {
            materialDatasetIds[index] = materialRawData[index].dataset_id;
        }
    }
    if (yearReceived != undefined) {
        paramsEntered++
        yearRawData = await getDatasetIDFromYear(yearReceived);
        for (let index = 0; index < yearRawData.length; index++) {
            yearDatasetIds[index] = yearRawData[index].dataset_id;
        }
    }
    if (firstNameReceived != undefined && lastNameReceived != undefined) {
        paramsEntered++
        authorRawData = await getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
        for (let index = 0; index < authorRawData.length; index++) {
            authorDatasetIds[index] = authorRawData[index].dataset_id;
        }
    }
    if (categoryReceived != undefined) {
        paramsEntered++
        if (subcategoryReceived != undefined) {
            categoryRawData = await getDatasetIDFromSubcategory(categoryReceived, subcategoryReceived);
        }
        else {
            categoryRawData = await getDatasetIDFromCategory(categoryReceived);
        }
        for (let index = 0; index < categoryRawData.length; index++) {
            categoryDatasetIds[index] = categoryRawData[index].dataset_id;
        }
    }
    let selectedDatasetIds = await selectDatasetIds(paramsEntered, materialDatasetIds, yearDatasetIds, authorDatasetIds, categoryDatasetIds)
    return selectedDatasetIds
}

export const selectDatasetIds = async (paramsEntered: number, materialDatasetIds: any[], yearDatasetIds: any[], authorDatasetIds: any[], categoryDatasetIds: any[]) => {
    let selectedDatasetIds = []
    // Find the intersection of data sets IDs among all the different variables
    let allDatasetIds = materialDatasetIds.concat(yearDatasetIds).concat(authorDatasetIds).concat(categoryDatasetIds)
    let count: number
    let currentDatasetId: number
    for (let i = 0; i < allDatasetIds.length; i++) {
        count = 1;
        currentDatasetId = allDatasetIds[i]
        for (let j = i + 1; j < allDatasetIds.length; j++) {
            if (currentDatasetId == allDatasetIds[j]) {
                count++
            }
        }
        if (count == paramsEntered) {
            selectedDatasetIds.push(currentDatasetId);
        }
    }
    return selectedDatasetIds;
}

export const getDataFromDatasetIds = async (selectedDatasetIds: any[]) => {
    // Query each data set ID to get its information and add to array of data
    let setOfData: Array<IDatasetResponseModel> = []
    for (let i = 0; i < selectedDatasetIds.length; i++) {
        setOfData.push(await getAllData(selectedDatasetIds[i]));
    }
    return setOfData
}