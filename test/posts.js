import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");

import { expect, use } from "chai";
import { createRandomUser } from "../helper/user_helper";

const TOKEN =
  "c29582a0dda6b38d0f5f2c5877bb657fc9199759067e61ddc64574d17620bb84";

describe.only("User Posts", () => {
  let postId, userId;

  // Hooks
  before(async () => {
    userId = await createRandomUser();
  });

  it("/posts", async () => {
    const data = {
      user_id: userId,
      title: "My Title",
      body: "My Blog Text Body",
    };

    const postRes = await request 
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);

    // console.log(postRes.body);
    expect(postRes.body).to.deep.include(data);
    postId = postRes.body.id;
  });

  it("GET /posts/:id", async () => {
    await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
  });
});
