import request from "supertest";
import { app } from "../src/app";

describe("Create, update blogs, delete", () => {
  let userId;
  it("create", async () => {
    const response = await request(app).get("/blogs").expect(200);
    console.log(response.body);
  });
  it("get", async () => {
    const response = await request(app).get("/posts");
  });
});
