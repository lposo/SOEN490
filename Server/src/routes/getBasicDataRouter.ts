import { Request, Response, Router } from 'express';
import { getBasicDataController } from '../controllers/getBasicDataController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /category$ /subcategory$ or /material$ then the request is routed to the 
 * getBasicDataController to continue processing of the request.
 */

let router = Router();

router.get('/category$', (request: Request, response: Response) => {
    let getBasicDataControllerObject = new getBasicDataController();
    getBasicDataControllerObject.createRequestForAllCategories(request, response);
});

router.get('/subcategory$', (request: Request, response: Response) => {
    let getBasicDataControllerObject = new getBasicDataController();
    getBasicDataControllerObject.createRequestForAllSubcategories(request, response);
});

router.get('/material$', (request: Request, response: Response) => {
    let getBasicDataControllerObject = new getBasicDataController();
    getBasicDataControllerObject.createRequestForAllMaterials(request, response);
});

export { router as getBasicDataRouter };