/**
 * @api {PUT} /admin  Update an Admin
 * @apiName UpdateAdmin
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
 * @apiParam {String} id id of the admin to be updated
 * @apiParam {Object} updates object that contains updates to be applied.
 * @apiParam {String} [updates.name]  The new admin name.
 * @apiParam {String} [updates.email] The new admin email address
 * @apiSuccess {String} [updates.phoneNumber] new admin phone Number.
 * @apiSuccess {String} [updates.countryCode] new admin email address.
 * @apiSuccess {String} [updates.password] new admin password.
 * 
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          "_id": "6167ec5c549f4c75397eec44",
            "name": "Admin",
            "email": "admin@gmail.com",
            "date": "20-22-2020",
            "phoneNumberInternational": "+234938333383",
            "phoneNumber": "0803737373737",
            "countryCode": "NG",
 *       }
 *     }
 * 
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
 *
 *
 */
