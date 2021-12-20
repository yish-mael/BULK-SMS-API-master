/**
 * @api {post} /admin/verify-code Verify token and pin
 * @apiName Token-Verification
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} pin The verification Pin sent to phone number via call/sms.
 * @apiParam {string} token token generated when pin was sent to phone number.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} payload  An object which contains verifcation information.
 * @apiSuccess {String} payload.token  token to be used for resseting password for admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *        "payload": {
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTExNDYyMjJ9.qJGAtvbWNm9xOJRmcV9Te27E5WdTdE9mn7EAd8bdqKA",
 *               }
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
 * @apiError UserUnauthorized The user is not unauthorized.
 * @apiErrorExample UnAuthorized:
 *     HTTP/1.1 401 Unauthorized request
 *     {
 *        "message": "describes reason for error",
 *        "error": "UNAUTHORIZED.REQUEST"
 *     }
 *
 *
 * @apiError Pin-Trial-Exceeded Maximum trial of pin exceeded.
 * @apiErrorExample Pin-Trial-Exceeded:
 *     HTTP/1.1 403 FORBIDDEN
 *     {
 *        "error": "MAX.TRIALS.EXCEEDED",
 *        "mesage": "describes reason for error"
 *     }
 *
 */
