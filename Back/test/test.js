process.env.NODE_ENV = "test";

import app from "../app.js";

import chai from "chai";
import chaihttp from "chai-http";
import fs from "fs";
var expect = chai.expect;

chai.use(chaihttp);
const imagepath = "./test/testfile/coca.png";

describe("Products", () => {
  const path = "/products";
  const file = fs.readFileSync(imagepath);
  let createdProductID;
  describe("#Create", () => {
    it("should return a successful created id", (done) => {
      chai
        .request(app)
        .post(path)
        .field({
          name: "Coca Cola",
          price: 1200,
          image: file,
          description: "Una bebida refrescante",
          amount: 5,
        })
        .attach("image", imagepath)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("price");
          expect(res.body).to.have.property("description");
          expect(res.body).to.have.property("amount");
          createdProductID = res.body._id;
          done();
        });
    });
  });
  describe("#Read", () => {
    it("should return an array of products", (done) => {
      chai
        .request(app)
        .get(path)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("price");
          expect(res.body[0]).to.have.property("image");
          expect(res.body[0]).to.have.property("description");
          expect(res.body[0]).to.have.property("amount");
          done();
        });
    });
  });
  describe("#Update", () => {
    it("should return an updated product", (done) => {
      chai
        .request(app)
        .patch(path)
        .send({
          id: createdProductID,
          name: "Coke",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("price");
          expect(res.body).to.have.property("description");
          expect(res.body).to.have.property("amount");
          expect(res.body.name).to.equal("Coke");
          done();
        });
    });
  });
  describe("#delete", () => {
    it("should return an id of the deleted product", (done) => {
      chai
        .request(app)
        .delete(path)
        .send({
          id: createdProductID,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("_id");
          expect(res.body._id).to.be.equal(createdProductID);
          done();
        });
    });
  });
});
