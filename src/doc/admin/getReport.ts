/**
 * @api {GET} /admin/get-report  Get All Report
 * @apiName GetAllReport
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
 *  @apiParam {Number} pageNumber number of pages.
 * @apiParam {Number} pageSize number of date to query.
 * @apiParam {Object} filter object that contain query parameters
 * @apiParam {String} [filter.searchText] search text.
 * @apiParam {String} [filter.agency] group id.
 * @apiParam {String} [filter.uid] user ID.
 * @apiParam {String} [filter.role] Role Id.
 *
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Array} payload Array of Report object from collection
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"[
 *       {
 *          "_id": "6166f790a3018e4c61aa7b39",
            "message": "some messages",
            "employeeId": "6167f6840780a4b379baa4f5",
             "groupId": "6167f6840780a4b379baa4f5",
 *       },
         {
 *          "_id": "6166f790a3018e4c61aa7b39",
             "message": "some messages",
            "employeeId": "6167f6840780a4b379baa4f5",
             "groupId": "6167f6840780a4b379baa4f5",
 *       }
       ],
       "totalDoc": 2,
      "totalPages": 1
 *   }
 
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
