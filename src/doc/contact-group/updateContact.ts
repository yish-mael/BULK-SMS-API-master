/**
 * @api {PUT} /contact-group  Update a contact group
 * @apiName UpdateContact Group
 * @apiGroup ContactGroup
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
 * @apiParam {String} id id of the contact group to be updated
 * @apiParam {Object} updates object that contains updates to be applied.
 * @apiParam {String} [updates.name]  The new contact name.
 * @apiParam {Array} [updates.contacts] Array of ids to be added to the contact group
 * 
 *  
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          "_id": "6167ec5c549f4c75397eec44",
            "name": "Admin",
            "date": "20-20-2020",
            "contacts": [Array of contacts, see contact doc],
             "groupId": "6167f6840780a4b379baa4f5",

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
 *
 */
