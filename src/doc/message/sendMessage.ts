/**
 * @api {PUT} /message/send-message Send Message by only user with permission to send messages created by users with access to create it. Note this will approve a message when the message is a scheduled message.
 * @apiName Send Message
 * @apiGroup Message
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
 * @apiParam {String} id id of the message to be sent 
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload  message credentials object
 * @apiSuccess {String} payload._id message ID.
 * @apiSuccess {Number[]} payload.contacts list of contacts.
 * @apiSuccess {String} payload.message createed message to be sent.
 * @apiSuccess {String} payload.date date created.
 * @apiSuccess {String} payload.sender message sender
 * @apiSuccess {String} payload.status current status of the message.
 * @apiSuccess {String} payload.groupId department ID.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *      "payload"{
 *          "_id": "6167ec5c549f4c75397eec44",
            "contacts": [
                0802332323,090323232323,09823233
            ],
            "_id": "616739af7d36677091c60785",
            "time": "2:22",
            "date": "20-2-2912",
            "message": "asasasas",
            "sender": "sassss",
            "status": "approved",
             "groupId":{
      *          "_id": "6167ec5c549f4c75397eec44",
                  "name": "dept",
                  "credit": 313,
      *       },
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
