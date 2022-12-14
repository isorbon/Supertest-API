import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");

import { expect } from "chai";

const TOKEN =
  "c29582a0dda6b38d0f5f2c5877bb657fc9199759067e61ddc64574d17620bb84";

describe("Users", () => {
  // API Tests for HTTP GET method
  it("GET /users", () => {
    /* request.get(`users?access-token=${TOKEN}`).end((err,res) => {
            console.log(err);
            console.log(res.body);
            // expect(res.body).to.not.be.empty;
            done();
        });
        */

    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });

  it("GET /users/:id", () => {
    return request.get(`users/5434?access-token=${TOKEN}`).then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });

  // or we can wright like this:

  /* it('GET /users/:id', () => {
        return request.get(`users/5434?access-token=${TOKEN}`).then((res) => {
            expect(res.body.id).to.be.eq(5434); 
        });
    }); */

  it("GET /users with query params", () => {
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

  // API Tests for HTTP POST method
  it.only("POST /users", () => {
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
        console.log(res.body);

        // data.name = "Alex";

        /*  expect(res.body.email).to.eq(data.email);
        expect(res.body.status).to.eq(data.status);
        expect(res.body.gender).to.eq(data.gender); */

        // or we can do via chai assertion through all the data
        expect(res.body).to.deep.include(data);
      });
  });

  // API Tests for HTTP PUT method
});
