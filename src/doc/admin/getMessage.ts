/**
 * @api {GET} /admin/get-message Get All message
 * @apiName GetAllMessage
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
 * @apiParam {Number} pageNumber number of pages.
 * @apiParam {Number} pageSize number of date to query.
 * @apiParam {String} [searchText] search text.
 * @apiParam {String} [agency] group id.
 * @apiParam {String} [uid] user ID.
 * @apiParam {String} [role] Role Id.
 *
 * 
 * 
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Array} payload Array of message object from collection
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *       "payload"[
   *        "contacts": [
                0802332323,090323232323,09823233
            ],
            "_id": "616739af7d36677091c60785",
            "time": "2:22",
            "date": "20-2-2912",
            "message": "asasasas",
            "sender": "sassss",
            "status": "approved",
            "groupId": "61664190dd57d724b1b49c23",,
 *       },{
            "contacts": [
                0802332323,090323232323,09823233
            ],
            "_id": "616739af7d36677091c60785",
            "time": "2:22",
            "date": "20-2-2912",
            "message": "asasasas",
            "sender": "sassss",
            "status": "approved",
            "groupId": "61664190dd57d724b1b49c23",,
 *       }
         ],
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
