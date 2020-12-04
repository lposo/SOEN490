import { EntityManager } from "typeorm";

const obtainDataModel = require('../models/SelectQueryDatabase');

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
    let setOfData = [];


    // To avoid checks for both first and last name, make a bool for author being entered
    let authorEntered = false
    if (firstNameReceived != undefined && lastNameReceived != undefined) {
        authorEntered = true
    }

    //As subcategory requires an accompanying category, make a bool for
    //Both category and subcategory being entered
    let subcategoryEntered = false
    if (categoryReceived != undefined && subcategoryReceived != undefined) {
        subcategoryEntered = true
    }

    if (datasetReceived != undefined) {
        setOfData = await obtainDataModel.getDataFromDataset(datasetReceived);
    }
    else if (materialReceived != undefined) {
        if (yearReceived != undefined && authorEntered && subcategoryEntered) {
            setOfData = await obtainDataModel.getDataFromMaterialYearAuthorSubcategory(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived);
        }
        else if (yearReceived != undefined && authorEntered && categoryReceived != undefined) {

        }
        else if (yearReceived != undefined && categoryReceived != undefined) {

        }
        else if (yearReceived != undefined && authorEntered) {
            setOfData = await obtainDataModel.getDataFromMaterialYearAuthor(materialReceived, yearReceived, firstNameReceived, lastNameReceived);
        }
        else if (yearReceived != undefined && subcategoryEntered) {

        }
        else if (yearReceived != undefined) {

        }
        else if (authorEntered && subcategoryEntered) {

        }
        else if (authorEntered && categoryReceived != undefined) {

        }
        else if (authorEntered) {
            setOfData = await obtainDataModel.getDataFromMaterialAuthor(materialReceived, firstNameReceived, lastNameReceived);
        }
        else if (subcategoryEntered) {

        }
        else if (categoryReceived != undefined) {

        }
        else {
            setOfData = await obtainDataModel.getDataFromMaterial(materialReceived);
        }
    }
    else if (yearReceived != undefined) {
        if (authorEntered && subcategoryEntered) {

        }
        else if (authorEntered && categoryReceived != undefined) {

        }
        else if (authorEntered) {

        }
        else if (subcategoryEntered) {

        }
        else if (categoryReceived != undefined) {

        }
        else {
            setOfData = await obtainDataModel.getDataFromYear(yearReceived);
        }
    }
    else if (authorEntered) {
        if (subcategoryEntered) {

        }
        else if (categoryReceived != undefined) {

        }
        else {
            setOfData = await obtainDataModel.getDataFromAuthor(firstNameReceived, lastNameReceived);
        }
    }
    else if (subcategoryEntered) {
        setOfData = await obtainDataModel.getDataFromSubcategory(categoryReceived, subcategoryReceived);
    }
    else if (categoryReceived != undefined) {
        setOfData = await obtainDataModel.getDataFromCategory(categoryReceived);
    }

    return setOfData;
}
