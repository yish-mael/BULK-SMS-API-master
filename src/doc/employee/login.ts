/**
 * @api {post} /employee/login  Employee login
 * @apiName Employee login
 * @apiGroup Employee
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {String} email employee email address.
 * @apiParam {String} password users account password.
 *
 * @apiSuccess {String} message  describes the success of the action performed.

 * @apiSuccess {Object} payload the user object
 * @apiSuccess {String} payload.accessToken  employee access token expires.
 * @apiSuccess {String} payload.refreshToken  employee refresh token which is required to get new access tokens
 * @apiSuccess {string} payloaduser.._id the ID of the employee
 * @apiSuccess {string} payload.user.email email of employee
 * @apiSuccess {string} payload.user.name employee full name
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":{
 *           "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTA4Mjc4MDF9.-Dq68jB_jjpMMucMAPt5uAqbJnZMQUlM58VeL1J6vq0",
 *           "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1ZlcmlmaWVkIjpmYWxzZSwiX2lkIjoiNjAwMzQ4MTkzZGE5YzRmODJmODVlNDQ1IiwiZW1haWwiOiIgIiwicGhvbmUiOiIrMjM0OTA1MDcwOTQ0NCIsInVzZXJJZCI6IjYwMDM0ODE5M2RhOWM0ZjgyZjg1ZTQ0NSIsInNhbHQiOiIkMmEkMTAkMGgwVEp3T3hBTEhhQWN0SzNrMHV4ZSIsImhhc2giOiIkMmEkMTAkMGgwVEp3T3hBTEhhQWN0SzNrMHV4ZXlWYmprYzg3NzJrMGpKQzdySFZETGV0V3o1UnV1ODIiLCJpYXQiOjE2MTA4Mjc4MDF9.a5x1yMlnrsAcy32it81SenaPDZdY-THwMXgfuuGDrAk",
 *         "user":{
 *                    "_id": "4844849494949",
 *                    "name": "David",
 *                    "email": "Moyes",
 *                    "address": "No 1 street Apapa",
 *                    "groupId": {
 *                       _id: "8484843848",
 *                       name: "Department Q"
 *                     },
 *                    "roleId": {
 *                       _id: "kdkdkd",
 *                       "name": "Checker",
 *                       "sendMessage": true,
 *                       "addContact": true,
 *                       "sendMessage": true,
 *                     }
 *               }
 *        }
 *     }
 *
 * @apiError Invalid login credential.
 * @apiErrorExample InvalidCredential:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message": "describes reason for error",
 *        "error": "INVALID.LOGIN.CREDENTIALS"
 *     }
 *
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
