import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { fetchAllCategoriesMaterialsController } from '../../controllers/fetchAllCategoriesMaterialsController';

describe('Fetch All Categories Materials Controller ', () => {
    let mockRequest;
    let mockResponse;
    let controller: fetchAllCategoriesMaterialsController;

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        controller = new fetchAllCategoriesMaterialsController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid Get All Categories Request; expect at least one entry in return', async () => {
        await controller.createRequestForAllCategories(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Get All Subategories Request; expect at least one entry in return', async () => {
        await controller.createRequestForAllSubcategories(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Get All Materials Request; expect at least one entry in return', async () => {
        await controller.createRequestForAllMaterials(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });
})