require('dotenv').config();
import request from "../config/common";
/* import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/"); */

const faker = require('faker');
const TOKEN = process.env.USER_TOKEN;

export const createRandomUser = async () => {
  const data = {
    email: `daramal-${Math.floor(Math.random() * 999)}@ukr.net`,
    name: `Abc_${Math.floor(Math.random() * 555)}`,
    gender: "male",
    status: "inactive",
  };

  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(data);

  return res.body.id;
};

export const createRandomUserWithFaker = async () => {
  const data = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: "male",
    status: "inactive",
  };

  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(data);

  console.log(res.body);
  return res.body.id;
};
