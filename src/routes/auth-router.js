import express from 'express';
import {getMe, postLogin} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */
/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */
/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */

authRouter.route('/login')
/**
 * @api {post} /auth/login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiBody {String} username Username of the user.
 * @apiBody {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "johnd",
 *      "password": "examplepass"
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Number} user_id User ID
 * @apiSuccess {String} user_name username of user
 * @apiSuccess {String} email email address of user
 * @apiSuccess {Number} user_level_id user level of user
 * @apiSuccess {String} created_at regsitration time and date of user
 * 
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "user_id": 22,
 *      "username": "matti44",
 *      "email": "matti44@example.com",
 *      "user_level_id": 1,
 *      "created_at": "2025-11-24T12:45:51.000Z",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwidXNlcm5hbWUiOiJtYXR0aTQ0IiwiZW1haWwiOiJtYXR0aTQ0QGV4YW1wbGUuY29tIiwidXNlcl9sZXZlbF9pZCI6MSwiY3JlYXRlZF9hdCI6IjIwMjUtMTEtMjRUMTI6NDU6NTEuMDAwWiIsImlhdCI6MTc2NDA3MTMyOSwiZXhwIjoxNzY0MTU3NzI5fQ.ul8Fc3r3k5x71QtLPq69A3jOhPIlYSggZxvCGPbh6iw"
 *    }
 *
 * @apiUse UnauthorizedError
 */
.post(postLogin);

authRouter.route('/me')
/**
 * @api {get} /auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 21,
 *       "username": "johnd",
 *       "email": "johnd@example.com",
 *       "user_level_id": 2,
 *       "iat": 1701279021
 *     }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
.get(authenticateToken, getMe);

export default authRouter;
