import request from "supertest";
import { app } from "../../src/app";
import { BlogEntityInput } from "../../src/types/blogs.type";

export const blogs = {
  create: async (data: BlogEntityInput) => {
    return await request(app).post("/blogs/").set("Authorization", "Basic YWRtaW46cXdlcnR5").send(data);
  },
  update: async (id: string, data: BlogEntityInput) => {
    return await request(app).put(`/blogs/${id}`).set("Authorization", "Basic YWRtaW46cXdlcnR5").send(data);
  },
  delete: async (id: string) => {
    return await request(app).delete(`/blogs/${id}`).set("Authorization", "Basic YWRtaW46cXdlcnR5");
  },
  getOne: async (id: string) => {
    return await request(app).get(`/blogs/${id}`);
  },
  getAll: async () => {
    return await request(app).get("/blogs");
  },
};
