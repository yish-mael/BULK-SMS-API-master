/**
 * @api {post} /employee/reset-password  Resset Employee or user account password
 * @apiName Employee Resset Password
 * @apiGroup Employee
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 * @description This endpoint ressets a user password, you must pass token to the header when sending the new password, you can get header on the link from email.
 *
 * @apiParam {String} password new password to be updated.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | INVALID.INPUT",
 *        "message": "describes reason for error"
 *     }
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
