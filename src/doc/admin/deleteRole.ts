/**
 * @api {DELETE} /admin/delete-role/:id Delete a role
 * @apiName Delete a role
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
 * @apiParam {String} id id of the role.
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  role credentials object
 * @apiSuccess {String} payload._id role ID.
 * @apiSuccess {Boolean} payload.addContact can add contact.
 * @apiSuccess {Boolean} payload.sendMessage can send message.
 * @apiSuccess {Boolean} payload.readMessage can read message.
 * @apiSuccess {String} payload.name role name.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"{
 *          "_id": "61676654e1647695f9e14eca",
            "name": "taker",
            "sendMessage": false,
            "readMessage": false,
            "addContact": true,
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
