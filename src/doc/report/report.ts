/**
 * @api {POST} /report/create-report Create a Report
 * @apiName Post Report
 * @apiGroup Report
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 * @apiHeader {String} authorization Admin unique access token for authorization.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9hdgda;uifgeuifbkjefg"
 *     } 
 *
 * @apiParam {String} message message to report.
 * @apiParam {String} employeeId employee ID.
 * @apiParam {String} groupId department id.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  report credentials object
 * @apiSuccess {String} payload._id report ID.
 * @apiSuccess {String} payload.message message.
 * @apiSuccess {String} payload.employeeId employee ID.
 * @apiSuccess {String} payload.groupId department ID.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          "_id": "6167ec5c549f4c75397eec44",
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
 *
 */
