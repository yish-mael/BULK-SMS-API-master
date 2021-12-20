/**
 * @api {GET} /admin/platform-info  Get all Application Information
 * @apiName Get Application Information
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
 * 
 * 
 * @apiSuccess {String} message describes the success of the action performed.
 * @apiSuccess {Object} payload payload containing application information
 * @apiSuccess {Number} payload.settings.maximumReloadThreshold maximum reload threshold
 * @apiSuccess {Number} payload.settings.minimumReloadThreshold minimum reload threshold
 * @apiSuccess {Number} payload.totalBalance Balance from africa talking
 * @apiSuccess {Number} payload.totalAllocation totalAllocated credit
 * @apiSuccess {Number} payload.balanceAfterAllocation amount remaining that can be allocated
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload:{
 *              settings:{
 *               maximumReloadThreshold: 10,
 *               minimumReleadThreshold: 20,
 *              },
 *              totalBalance:84,
 *              totalAllocation: 10,
 *              balanceAfterAllocation:84
 *            },
          "totalDoc": 2,
          "totalPages": 1
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
 */
