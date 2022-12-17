import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "c29582a0dda6b38d0f5f2c5877bb657fc9199759067e61ddc64574d17620bb84";

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
