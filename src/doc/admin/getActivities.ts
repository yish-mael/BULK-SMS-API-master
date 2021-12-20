/**
 * @api {GET} /admin/activities  Get all Activities
 * @apiName GetAllActivities
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
 * @apiParam {Number} pageNumber number of pages.
 * @apiParam {Number} pageSize number of date to query.
 * @apiParam {String} [searchText] search text.
 * @apiParam {String} [agency] group id.
 * @apiParam {String} [uid] user ID.
 * @apiParam {String} [role] Role Id.
 * @apiParam {String} [userType] filter by userType, value should be either ADMIN-ACCOUNT or AGENCY-ACCOUNT
 * 
 * 
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Array} payload Array of activities object from collection
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 * 
 *       "message": "SUCCESSFULL",
 *       "payload"[
   *        {
   *         group: "94fi9999399d9dd9d9dd9d9d",
            userType: "Admin",
            admin: {
                name: "David Oyes",
                email: "david@gmail.com"
            },
            user: {
                name: "Olam Ten",
                email: "Growing Shaw",
                address: "Going there 1 street",
            },
            entity: "CONTACTS",
            type: "DELETE",
            description: 'Contact deleted',
            payload: {
            name: 'Mary Dongube',
            phoneNumber: '949483849384',
            id: '945949494kf409dd0393939'
            },
            date: '384848484848',
   *        },
              ....
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
