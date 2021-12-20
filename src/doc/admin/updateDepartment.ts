/**
 * @api {PUT} /admin/update-department  Update a department
 * @apiName UpdateDepartment
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 * 
 * @apiHeader {String} authorization Admin unique access token for authorization.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9hdgda;uifgeuifbkjefg"
 *     } 
 *
 *
 * @apiParam {String} id id of the department to be updated
 * @apiParam {Object} updates object that contains updates to be applied.
 * @apiParam {String} [updates.name]  The new department name.
 * @apiParam {Number} [updates.credit] number of updated credit
 * @apiParam {Array}  [updates.senderIds] ids of updated array of senderid
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          "_id": "6167ec5c549f4c75397eec44",
            "name": "dept",
            "credit": 313,
            "senderIds": [
                 {
 *                   "_id": "6167ec5c549f4c75397eec44",
                     "name": "Admin",
 *              }
            ...
            ],
 *       }
 *     }
 *
 * @apiError Invalid Input
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 Forbidden
 *     {
 *       "message": "reason for invalid Input",
         "error": "INVALID.INPUT"
 *     }
 *
 * 
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "describes reason for error"
 *     }
 *
 
 *
 * 
 * 
 *
 *
 *
 */
