/**
 * @api {PUT} /admin/update-employee-department  Assign employee to department
 * @apiName AssignEmployeeToDepartment
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
 * @apiParam {String} employeeId id of the employee to be updated
 * @apiParam {String} departmentId id of the of the department to be updated
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
 *       }
 *     }
 *
 *
 * @apiError Invalid Input-Param
 * @apiErrorExample Invalid-Input:
 *     HTTP/1.1 400 Forbidden
 *     {
 *       "message": "reason for invalid input",
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
