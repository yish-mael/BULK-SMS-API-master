/**
 * @api {GET} /contact Get all contact by group
 * @apiName Get all contacts belonging to a an agency or group
 * @apiGroup Contact
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
 * @apiParam {Number} pageNumber number of pages.
 * @apiParam {Number} pageSize number of date to query.
 * @apiParam {String} [searchText] search text.
 * @apiParam {String} agency group id.
 * @apiParam {String} [uid] user ID.
 * @apiParam {String} [role] Role Id.
 * * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  contact credentials Array
 * @apiSuccess {String} payload._id contact ID.
 * @apiSuccess {String} payload.name contact name.
 * @apiSuccess {String} payload.date created date.
 * @apiSuccess {String} payload.number contact number.
 * @apiSuccess {String} payload.groupId department ID.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *      "payload":[{
 *          "_id": "6167ec5c549f4c75397eec44",
 *           "name": "Admin",
 *           "date": "20-20-2020",
 *           "number": "13333313313",
 *            "groupId": "6167f6840780a4b379baa4f5",
 *       }]
 *     }
 *
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
