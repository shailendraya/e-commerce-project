const request = require("supertest");
const app = require("../../app");
// const dotenv = require('dotenv');
const connectDatabse = require('../../config/database');
const cookieParser = require('cookie-parser');
const mockuser = require('../helpers/mockuser')
const Products = require("../../models/productModel");


jest.mock('../../middleware/auth', () => ({
    ...(jest.requireActual('../../middleware/auth')),
    isAuthenticatedUser: jest.fn((req, res, next) =>{ 
        req.user = mockuser;
        next()
    }),
    authorizeRoles: jest.fn(() => (req, res, next) => next())
  }))

describe("Product", () => {
    app.use(cookieParser());
    beforeAll(async () => {
        await connectDatabse();
    });

    afterAll(async () => {
        await Products.deleteMany({});
      });

      let dummyID ;
    test("Create Products with authorized login user", done => {
        request(app)
          .post("/api/v1/admin/product/new")
         .send({
            "name": "Redmi",
            "price": 7990,
            "description": "Wonderful",
            "category": "Mobile",
            "images": {
                "public_id": "sample_public_id",
                "url": "sampleUrl"
            } ,
            "Stock": 12
        })
          .then(response => {
            const data =  JSON.parse(response.text)
            dummyID = data.product._id;
            expect(response.statusCode).toBe(201);
            done();
          });
    });
    test("Get all products", done => {
        request(app)
          .get("/api/v1/products")
          .then(response => {
            const data =  JSON.parse(response.text)
            expect(data.productCount).toBeGreaterThan(0);
            expect(response.statusCode).toBe(200);
            done();
          });
    });
    test("Get single producs", done => {
        request(app)
          .get(`/api/v1/product/${dummyID}`)
          .then(response => {
            const data =  JSON.parse(response.text)
            
            expect(data.product._id).toBe(dummyID);
            expect(response.statusCode).toBe(200);
            done();
          });
    });
    test("Create review for product", done => {
        request(app)
         .put("/api/v1/review")
         .send({
            "productId": `${dummyID}`,
            "comment": "YESSSSS",
            "ratings": 1.5
        })
          .then(response => {
            const data =  JSON.parse(response.text)
            expect(response.statusCode).toBe(200);
            expect(data.success).toBe(true)
            done();
          });
    });

    test("Update product", done => {
      request(app)
       .put(`/api/v1/admin/product/${dummyID}`)
       .send({
        "price": 111111,
        "description": "Product updated",
        "category": "Mobile",
        "images": {
            "public_id": "not_a_id",
            "url": "invalidURL"
        } ,
        "Stock": 0
    })
        .then(response => {
          const data =  JSON.parse(response.text)
          expect(response.statusCode).toBe(200);
          expect(data.success).toBe(true)
          expect(data.product.description).toBe("Product updated")
          done();
        });
  });

    test("delete product", done => {
        request(app)
         .delete(`/api/v1/admin/product/${dummyID}`)
         .then(response => {
            const data =  JSON.parse(response.text)
            expect(response.statusCode).toBe(200);
            expect(data.success).toBe(true)
            expect(data.message).toBe("Product Delete Successfully")
            done();
          });
    });

});