const request = require("supertest");
const app = require("../../app");
// const dotenv = require('dotenv');
const connectDatabse = require('../../config/database');
const cookieParser = require('cookie-parser');
const mockuser = require('../helpers/mockuser')
const Order = require("../../models/orderModel");


jest.mock('../../middleware/auth', () => ({
    ...(jest.requireActual('../../middleware/auth')),
    isAuthenticatedUser: jest.fn((req, res, next) =>{ 
        req.user = mockuser;
        next()
    }),
    authorizeRoles: jest.fn(() => (req, res, next) => next())
  }))

describe("Orders", () => {
    app.use(cookieParser());
    beforeAll(async () => {
        const db = await connectDatabse();
        jest.setTimeout(10000);
    });

    afterAll(async () => {
        await Order.deleteMany({});
      });

    let dummyID;
    test("Create Orders with authorized login user", done => {
        request(app)
          .post("/api/v1//order/new")
         .send({
            "itemsPrice": 121212,
            "taxPrice":36,
            "shippingPrice":100,
            "totalPrice":336,
            "orderItems": [
            {
                "product": "62382f260b3bb7a151e1a615",
                "name": "product1",
                "price": 1200,
                "image": "sample Image",
                "quantity": 1
            }
            ],
        
        "shippingInfo": {
            "address": "619 India",
            "city": "Kiloda",
            "state": "California",
            "country": "India",
            "pinCode":  400001,
            "phoneNo": 123632520
            },
        "paymentInfo": {
            "id": "sample PaymenInfo",
            "status": "succeeded"
            }
            })
          .then(response => {
            const data =  JSON.parse(response.text)
            dummyID = data.order._id
            expect(response.statusCode).toBe(201);
            done();
          });
    });
    test("get order details by _id", done => {
      request(app)
        .get(`/api/v1/order/${dummyID}`)
        .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.order._id).toBe(dummyID)
          done();
        });
    });

    test("all orders", done => {
      request(app)
        .get(`/api/v1/admin/orders`)
        .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.success).toBe(true)
          done();
        });
    });

});