/**
 * @api {GET} /admin/get-employees  Get All Employee
 * @apiName GetAllEmployee
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
 * @apiParam {Number} pageNumber number of pages.
 * @apiParam {Number} pageSize number of date to query.
 * @apiParam {String} [searchText] search text.
 * @apiParam {String} [agency] group id.
 * @apiParam {String} [uid] user ID.
 * @apiParam {String} [role] Role Id.
 *
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Array} payload Array of Employee object from collection
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"[
 *            "_id": "61639a7f4245d1f5bc3e120a",
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
        ],
        "totalDoc": 2,
        "totalPages": 1
 *   }
 
 *
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
 */
