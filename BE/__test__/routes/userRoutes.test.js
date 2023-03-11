const request = require("supertest");
const app = require("../../app");
// const dotenv = require('dotenv');
const connectDatabse = require('../../config/database');
const cookieParser = require('cookie-parser');
const mockuser = require('../helpers/mockuser')
const User = require("../../models/userModal");

jest.mock('../../middleware/auth', () => ({
    ...(jest.requireActual('../../middleware/auth')),
    isAuthenticatedUser: jest.fn((req, res, next) =>{ 
        req.user = mockuser;
        next()
    }),
    authorizeRoles: jest.fn(() => (req, res, next) => next())
}))

describe("User", () => {
    app.use(cookieParser());
    beforeAll(async () => {
        await connectDatabse();
    });

    afterAll(async () => {
       await User.findOneAndRemove({email: 'testuser@test.com'})
    });

    let dummyID;
    test("user register", done => {
        request(app)
         .post("/api/v1/register")
         .send({   
            "name": "testuser",
            "email": "testuser@test.com",
            "password": "12345678",
            "role": "admin"
        })
          .then(response => {
            const data =  JSON.parse(response.text)
            dummyID = data.user._id
            expect(response.statusCode).toBe(201);
            done();
          });
    });
    test("user login", done => {
        request(app)
         .post("/api/v1/login")
         .send({   
            "email": "testuser@test.com",
            "password": "12345678"
        })
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
    });
    test("user details", done => {
        request(app)
         .get("/api/v1/admin/users")
         .then(response => {
            const data =  JSON.parse(response.text)
            expect(data.users.length).toBeGreaterThan(0);
            done();
          });
    });

    test("get user details by _id", done => {
      request(app)
       .get(`/api/v1/admin/user/${dummyID}`)
       .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.success).toBe(true)
          expect(data.user._id).toBe(dummyID)
          done();
        });
  
    });

    test("user logout", done => {
      request(app)
       .get(`/api/v1/logout`)
       .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.success).toBe(true)
          done();
          expect(data.message).toBe("Logged Out")
        });
  
    });

    test("update user role", done => {
      request(app)
       .put(`/api/v1/admin/user/${dummyID}`)
       .send({
        "role": "admin"
      })
       .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.success).toBe(true)
          done();
        });
  
    });

    test("delete user", done => {
      request(app)
       .put(`/api/v1/admin/user/${dummyID}`)
       .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.message).toBe("User Delete Successfully")
          expect(data.success).toBe(true)
          done();
        });
  
    });


});