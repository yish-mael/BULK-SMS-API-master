/**
 * @api {PUT} /admin/settings  Update a settings
 * @apiName UpdateSettings
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
 * @apiParam {Number} [maximumReloadThreshold] maximum limit to reload agencies
 * @apiParam {Number} [minimumReloadThreshold] minimum reload limit
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          maximumReloadThreshold: 20,
 *          minimumReloadThreshold: 20,
 *       }
 *     }
 * @apiError Invalid Input
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 Forbidden
 *     {
 *       "message": "reason for invalid Input",
 *        "error": "INVALID.INPUT"
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
