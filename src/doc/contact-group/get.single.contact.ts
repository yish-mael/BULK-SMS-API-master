/**
 * @api {GET} /contact-group/:id Get a single contact group
 * @apiName Get a single Contact group
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
 *  @apiParam {String} id id of the Contact Group
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  contact group credentials object
 * @apiSuccess {String} payload._id contact group ID.
 * @apiSuccess {String} payload.name contact group name.
 * @apiSuccess {String} payload.date created date.
 * @apiSuccess {Array}  payload.contacts Array of contacts belonging to the group. please see contact documentation to see structure of each contact in this array
 * @apiSuccess {String} payload.groupId department ID who owns the contact group.
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
            "contacts":{
                name:"Customers",
                contacts:[
                    {
                       name:"solex",
                       number:"08084848",
                       ....
                    }
                ]
             },
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
 */
