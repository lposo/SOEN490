import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { DataSetController } from '../../controllers/DataSetController';
import { oneFavoriteDataset } from '../testData/testData';

describe('Data Set Controller ', () => {
    let mockRequest;
    let mockResponse;
    let GetDataControllerController: DataSetController;

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        GetDataControllerController = new DataSetController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Feeds data set ID of 1 and expects to see a data set with ID of 1 returned', async done => {
        mockRequest = {
            query: {
                datasetId: [2]
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await GetDataControllerController.createRequestForData(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(oneFavoriteDataset);
        expect(mockResponse.status).toBeCalledWith(200);
        done()
    });

    test('Invalid search, no search query entered', async done => {
        mockRequest = {
            query: {
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await GetDataControllerController.createRequestForData(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid search params entered");
        expect(mockResponse.status).toBeCalledWith(400);
        done()
    });

    //TODO: Readd later
    /**
    test('Valid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: '1'
            }
        }
        await GetDataControllerController.createRequestForAddingSavedDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Favorite data set successfully saved");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Save Data Set Request, Data Set Already Saved', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: '2'
            }
        }
        await GetDataControllerController.createRequestForAddingSavedDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Favorite data set is already saved");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'fake@email.com',
                datasetId: '1'
            }
        }
        await GetDataControllerController.createRequestForAddingSavedDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid user email provided");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: "wrtrterterte"
            }
        }
        await GetDataControllerController.createRequestForAddingSavedDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });
    */

    test('Valid Get User Uploaded Data Sets Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: 'tester@123.com'
                }
            }
        }
        await GetDataControllerController.createRequestForUserUploadedDatasets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith([true, oneFavoriteDataset]);
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Get User Favorite Data Sets Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '3'
                }
            }
        }
        await GetDataControllerController.createRequestForUserFavoriteDatsets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith([true, oneFavoriteDataset]);
        expect(mockResponse.status).toBeCalledWith(200);
    });

    // Do these after other favorite data set tests
    test('Valid Remove Favorite Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: '3'
            },
            body: {
                user: {
                    account_id: '3'
                }
            }
        }
        await GetDataControllerController.createRequestToDeleteUserFavoriteDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User favorite successfully removed");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Remove Non-existant Favorite Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: '0'
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await GetDataControllerController.createRequestToDeleteUserFavoriteDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User favorite successfully removed");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Remove Favorite Data Set Request; false data set ID', async () => {
        mockRequest = {
            params: {
                datasetId: 'werwerewr'
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await GetDataControllerController.createRequestToDeleteUserFavoriteDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Valid Get Unapproved Data Sets Request; expect at least one entry in return', async () => {
        await GetDataControllerController.createRequestForUnapprovedDatsets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Flag Data Set Request', async () => {
        mockRequest = {
            query: {
                datasetId: 9
            }
        }
        await GetDataControllerController.createRequestToFlagDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Dataset Flagged!");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Reject Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: 10
            }
        }
        await GetDataControllerController.createRequestToRejectDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Successfully removed data set");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Get Account 1 Unapproved Data Sets Request; expect at least one entry in return', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await GetDataControllerController.createRequestForUserFlaggedDatasets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    // The two invalid user approval tests must happen before the valid approval tests
    test('Invalid User Approve Data Set Request; wrong ID', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '2'
                }
            },
            params: {
                datasetId: 12
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User ID does not match uploader ID!");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid User Approve Data Set Request; data set not yet flagged', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 11
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("You cannot approve a data set until it passes initial screening!");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Valid User Approve Data Set Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 12
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Successfully approved new data set");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Admin Approve Data Set Request', async () => {
        mockRequest = {
            query: {
                datasetId: 11
            }
        }
        await GetDataControllerController.createAdminApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Successfully approved new data set");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Admin Approve Data Set Request; no query passed', async () => {
        mockRequest = {
            query: {
            }
        }
        await GetDataControllerController.createAdminApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid User Approve Data Set Request; bad ID passed', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 'regregreg'
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Reject Data Set Request; no ID passed', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 'regregreg'
            }
        }
        await GetDataControllerController.createRequestToRejectDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Flag Data Set Request; no ID passed', async () => {
        mockRequest = {
            query: {
            }
        }
        await GetDataControllerController.createRequestToFlagDataset(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("No datasetID provided to flag dataset");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Remove User Favorite Data Set Request; no ID passed', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 'regregreg'
            }
        }
        await GetDataControllerController.createRequestToDeleteUserFavoriteDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

})