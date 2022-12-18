require('dotenv').config();
import request from "../config/common";
const faker = require('faker');
import { expect, use } from "chai";
import { createRandomUser, createRandomUserWithFaker } from "../helper/user_helper";
const TOKEN = process.env.USER_TOKEN;

describe("User Posts", () => {
  let postId, userId;

  // Hooks
  before(async () => {
   // userId = await createRandomUser();
    userId = await createRandomUserWithFaker();
  });

  it.only("/posts", async () => {
    const data = {
      user_id: userId,
    /*   title: "My Title",
      body: "My Blog Text Body", */
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
    
    // console.log(data);
    // console.log(postRes.body);
   // expect(postRes.body).to.deep.include(data);
    postId = postRes.body.id;
  });

  it("GET /posts/:id", async () => {
    await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
  });

  // Negative Tests
  describe("Negative Tests", () => {
    it("401 Authentication Failed", async () => {
      const data = {
        user_id: userId,
        title: "My Title",
        body: "My Blog Text Body",
      };

      const postRes = await request.post("posts").send(data);

      //console.log(postRes);
      expect(postRes.statusCode).to.eq(401);
      expect(postRes.body.message).to.eq("Authentication failed");
    });

    it("422 Validation Failed", async () => {
      const data = {
        user_id: userId,
        title: "My Title",
      };

      const postRes = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);

      // console.log(postRes.body);
      expect(postRes.statusCode).to.eq(422);
      expect(postRes.body[0].field).to.eq("body");
      expect(postRes.body[0].message).to.eq("can't be blank");
    });
  });
});
