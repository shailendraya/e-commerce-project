const request = require("supertest");
const app = require("../../app");
// const dotenv = require('dotenv');
const connectDatabse = require('../../config/database');
const cookieParser = require('cookie-parser');
const mockuser = require('../helpers/mockuser')
const User = require("../../models/userModal");

const {isAuthenticatedUser, authorizeRoles} = require('../../middleware/auth')
jest.mock('../../middleware/auth', () => ({
    ...(jest.requireActual('../../middleware/auth')),
    // isAuthenticatedUser: jest.fn((req, res, next) =>{ 
    //     req.user = mockuser;
    //     next()
    // })
    isAuthenticatedUser: jest
        .fn()
        .mockImplementationOnce((req, res, next) => {
            req.user = mockuser;
            next()
        })
}))

describe("Auth", () => {
    app.use(cookieParser());
    beforeAll(async () => {
        await connectDatabse();
    });

    afterAll(async () => {
       await User.findOneAndRemove({email: 'testuser@test.com'})
    });

    let dummyID;

    test("role not admin", done => {
      request(app)
       .get(`/api/v1/admin/user/${dummyID}`)
       .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(500);
          expect(data.success).toBe(false)
          expect(data.error).toBe("Role: notAdmin is not allowed to access this resource")
          done();
        });
  
    });

});