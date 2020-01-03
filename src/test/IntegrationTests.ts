
import { expect } from "chai";
import "mocha";
import request from "supertest";
import app from "../index";
import { Document, IDocument } from "../models/Document";

describe("API Integration Test", () => {
  describe("/api/documents", () => {
    const document1: IDocument = {
      title: "Document1_Title",
      username: "Document1_Username",
      body: "Document1_Body"
    };

    describe("GET action", () => {
      it("Returns empty array with no documents", (done) => {
        request(app)
          .get("/api/documents")
          .end((err, res) => {
            if (err) { done(err); }
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.equal(0);
            done();
          });
      });
    });

    describe("POST action", () => {
      it("Saves a document", (done) => {
        console.log("Testing POST /api/document");
        request(app)
          .post("/api/documents")
          .send(document1)
          .end((err, res) => {
            if (err) { done(err); }
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
    // describe("GET action", () => {
    //   it("Saves a document", (done) => {
    //     request(app)
    //       .get("/api/documents")
    //       .send(document1)
    //       .end((err, res) => {
    //         expect(res.status).to.equal(200);
    //         done();
    //       });
    //   });
    // });
  });
});
