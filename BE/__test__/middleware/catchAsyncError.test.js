const request = require("supertest");
const app = require("../../app");
// const dotenv = require('dotenv');
const connectDatabse = require('../../config/database');
const cookieParser = require('cookie-parser');
const mockuser = require('../helpers/mockuser')
const User = require("../../models/userModal");

describe("Auth", () => {
    app.use(cookieParser());
    beforeAll(async () => {
        await connectDatabse();
    });

    afterAll(async () => {
       await User.findOneAndRemove({email: 'testuser@test.com'})
    });

    let dummyID;

    test("cookies not set", done => {
      request(app)
       .get(`/api/v1/admin/user/${dummyID}`)
       .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(401);
          expect(data.success).toBe(false)
          expect(data.error).toBe("Please Login to access this resource")
          done();
        });
  
    });

});