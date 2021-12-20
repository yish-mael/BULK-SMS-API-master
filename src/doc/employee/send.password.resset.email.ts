/**
 * @api {post} /employee/send-reset-password-link Send password resset email to User Account
 * @apiName  Send resset password email
 * @apiGroup Employee
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 * @description This endpoint sends a request to the users registered email address
 *
 * @apiParam {String} email users email address
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
