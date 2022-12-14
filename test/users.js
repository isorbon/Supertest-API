require('dotenv').config();
import request from "../config/common";
import { expect } from "chai";
const TOKEN = process.env.USER_TOKEN;

xdescribe("Users", () => {
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
  it("POST /users", () => {
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

        // data.name = 'Alex';

        /*  expect(res.body.email).to.eq(data.email);
        expect(res.body.status).to.eq(data.status);
        expect(res.body.gender).to.eq(data.gender); */

        // or we can do via Chai assertion through all the data
        expect(res.body).to.deep.include(data);
      });
  });

  // API Tests for HTTP PUT method
  it("PUT /users/:id", () => {
    const data = {
      status: "active",
      name: `Luffy-${Math.floor(Math.random() * 333)}`,
      email: `daramal-${Math.floor(Math.random() * 999)}@ukr.net`,
    };

    return request
      .put("users/5051")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        // console.log(res.body);
        // data.name = 'Alex';
        expect(res.body).to.deep.include(data);
      });
  });

  // API Tests for HTTP DELETE method
  it("DELETE /users/:id", () => {
    return request
      .delete("users/4898")
      .set("Authorization", `Bearer ${TOKEN}`)
      .then((res) => {
        expect(res.body).to.be.eq(null);
      });
  });
});
