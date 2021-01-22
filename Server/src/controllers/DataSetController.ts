import { Request, Response } from 'express';
import { DataSetService } from '../services/DataSetService';
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";

export class DataSetController {
    private processedRequest: IDataRequestModel;
    private dataSetService: DataSetService

    constructor() {
    }

    /**
     * This controller will take a request, verify that it is valid, and if it valid will then process the request,
     * send it to the getDataService to acquire an array of data sets that match the entered search terms, and
     * then return a response with the array of data sets. If the request is invalid, or some other problem arrises, 
     * it will throw an error.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForData(request: Request, response: Response) {
        let validateData = this.validateInputData(request)
        if (!validateData) {
            response.status(400).send("Invalid search params entered");
        }
        else {
            this.dataSetService = new DataSetService();
            let requestParams: any = { ...request.query };
            this.processedRequest = requestParams;
            try {
                let arrayOfData = await this.dataSetService.getArrayOfDatasets(this.processedRequest)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(400).send(err);
            }
        }
    }

    async createRequestToDeleteDataSet(request: Request, response: Response) {
        let token = request.cookies.token
        //console.log(token)
        let base64Url = token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const buff = new Buffer(base64, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);
        //console.log(payload)
        //let arrayOfData = await this.dataSetService.deleteDataSet(dataSetIdToDelete)
        return response.status(200).send(payload);
        if (!request.query.hasOwnProperty('DataSetId')) {
            response.status(400).send("Search ID Not Entered");
        }
        else {
            let requestParams: any = { ...request.query };
            let dataSetIdToDelete = requestParams;
            try {
                let token = request.cookies.token
                let base64Url = token.split('.')[1];
                let decodedValue = JSON.parse(window.atob(base64Url));
                console.log(decodedValue)
                //let arrayOfData = await this.dataSetService.deleteDataSet(dataSetIdToDelete)
                return response.status(200).send(decodedValue);
            } catch (err) {
                response.status(400).send(err);
            }
        }
    }

    /**
     * This controller will take a request, grab the user ID, and if it a real number will then process the request,
     * send it to the getDataService to acquire an array of data sets that were uploaded by this user ID, and
     * then return a response with the array of data sets. If the request is invalid, or some other problem arrises, 
     * it will throw an error.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUserUploadedDatasets(request: Request, response: Response) {
        let requestParam = request.params.userUploadedDatasets;
        let userId: number = +requestParam;
        if (isNaN(userId)) {
            response.status(400).send("Invalid search params entered");
        }
        else {
            try {
                let arrayOfData = await this.dataSetService.getUserUploadedDatasets(userId)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
            }
        }
    }

    /**
     * This controller will take a request, grab the user ID, and if it a real number will then process the request,
     * send it to the getDataService to acquire an array of data sets that were saved by this user ID, and
     * then return a response with the array of data sets. If the request is invalid, or some other problem arrises, 
     * it will throw an error.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUserSavedDatsets(request: Request, response: Response) {
        let requestParam = request.params.userSavedDatsets;
        let userId: number = +requestParam;
        if (isNaN(userId)) {
            response.status(500).send("Invalid search params entered");
        }
        else {
            try {
                let arrayOfData = await this.dataSetService.getUserSavedDatasets(userId)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
            }
        }
    }

    /**
     * This controller will take a request, send it to the getDataService to acquire an array 
     * containing the unapproved, but not flagged, data sets in the database
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUnapprovedDatsets(request: Request, response: Response) {
        try {
            let arrayOfData = await this.dataSetService.getUnapprovedDatasets()
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
        }
    }

    /**
     * This method verifies that a request has at least one valid search parameter and returns true if so
     * and false if not.
     * 
     * @param request 
     * An object containing the request information and parameters: Request
     */
    private validateInputData(request: Request) {
        if (request.query.hasOwnProperty('datasetId') || request.query.hasOwnProperty('material')
            || request.query.hasOwnProperty('year') || request.query.hasOwnProperty('categoryId')
            || request.query.hasOwnProperty('lastName')) { return true }
        else {
            return false
        }
    }
}