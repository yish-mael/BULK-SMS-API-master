/**
 * @api {DELETE} /admin/delete-report/:id Delete a report 
 * @apiName Delete a report
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
 * @apiParam {String} id id of the report.
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  report credentials object
 * @apiSuccess {String} payload.message message written.
 * @apiSuccess {String} payload.groupId deleted groupID.
 * @apiSuccess {String} payload.employeeId deleted employee ID.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          "_id": "61676654e1647695f9e14eca",
            "message": "some messages",
            "employeeId": "6167f6840780a4b379baa4f5",
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
 */
