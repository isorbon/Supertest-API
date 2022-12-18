require('dotenv').config();
import request from "../config/common";
import { expect, use } from "chai";
const TOKEN = process.env.USER_TOKEN;

describe.only("Users", () => {
  let userId;

  describe("POST", () => {
    // API Tests for HTTP POST method
    it("/users", () => {
      const data = {
        email: `daramal-${Math.floor(Math.random() * 999)}@ukr.net`,
        name: `Abc_${Math.floor(Math.random() * 555)}`,
        gender: "male",
        status: "active",
      };

      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body).to.deep.include(data);
          userId = res.body.id;
          console.log(userId);
        });
    });
  });

  describe("GET", () => {
    // API Tests for HTTP GET method
    it("/users", () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body).to.not.be.empty;
      });
    });

    it("/users/:id", () => {
      return request
        .get(`users/${userId}?access-token=${TOKEN}`)
        .then((res) => {
          expect(res.body.id).to.be.eq(userId);
        });
    });

    it("/users with query params", () => {
      const url = `users?access-token=${TOKEN}?page=5&gender=female&status=active`;

      return request.get(url).then((res) => {
        // console.log(res);
        expect(res.body).to.not.be.empty;
        res.body.forEach((data) => {
          expect(data.gender).to.equal("female");
          expect(data.status).to.equal("active");
        });
      });
    });
  });

  describe("PUT", () => {
    // API Tests for HTTP PUT method
    it("/users/:id", () => {
      const data = {
        status: "active",
        name: `Luffy-${Math.floor(Math.random() * 333)}`,
        email: `daramal-${Math.floor(Math.random() * 999)}@ukr.net`,
      };

      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body).to.deep.include(data);
        });
    });
  });

  describe("DELETE", () => {
    // API Tests for HTTP DELETE method
    it("/users/:id", () => {
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body).to.be.equal(null);
        });
    });
  });
});
