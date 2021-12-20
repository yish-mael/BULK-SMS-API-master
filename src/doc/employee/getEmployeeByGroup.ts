/**
 * @api {GET} /employee/all/:groupId Get all employees belonging to a group or agency
 * @apiName Get employees by group or agency
 * @apiGroup Employee
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
 *  @apiParam {String} groupId id of the employees group.
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  employee Array of all employees from an agency or department
 * @apiSuccess {String} payload._id employee ID.
 * @apiSuccess {String} payload.name employee name.
 * @apiSuccess {String} payload.email employee email address.
 * @apiSuccess {String} payload.address employee address.
 * @apiSuccess {String} payload.roleId employee roleId.
 * @apiSuccess {String} payload.groupId employee department ID.
 * @apiSuccess {Boolean} payload.active status of employee either true=active and false=inactive
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
           "_id": "61639a7f4245d1f5bc3e120a",
            "name": "ayindexxxxxx21",
            "email": "aaagmai;.com",
            "address": "bbbbb",
            "phoneNumberInternational": "+234938333383",
            "phoneNumber": "0803737373737",
            "active": true,
            "groupId":{
      *          "_id": "6167ec5c549f4c75397eec44",
                  "name": "dept",
                  "credit": 313,
      *       },
            "roleId":{
   *          "_id": "61676654e1647695f9e14eca",
               "name": "taker",
               "sendMessage": false,
               "readMessage": false,
               "addContact": true,
               "composeMessage": false,
 *        }
 *       }
 *     }
 *      ]
 *    }
 *
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
 *
 *
 */
