import { create } from "domain";
import { BlogsExpect } from "./expect/blogs.expect";
import { blogs } from "./queries/blogs.query";

describe("Testing blogs with valid data", () => {
  it("create one blog", async () => {
    const response = await blogs.create(data.create);
    blogIds.push(response.body.id);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(BlogsExpect.created);
  });
  it("create and update one blog", async () => {
    const createdBlog = await blogs.create(data.create);
    blogIds.push(createdBlog.body.id);

    const response = await blogs.update(createdBlog.body.id, data.update);
    expect(response.status).toBe(204);
  });
  it("get one blog by id", async () => {
    for (let i = 0; i !== blogIds.length; i++) {
      const response = await blogs.getOne(blogIds[i]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(BlogsExpect.created);
    }
  });
  it("delete blog by id", async () => {
    for (let i = 0; i !== blogIds.length; i++) {
      const response = await blogs.delete(blogIds[i]);

      expect(response.status).toBe(204);
    }
  });
  it("Create 10 blogs and update, delete", async () => {
    for (let i = 0; i !== 10; i++) {
      const createdBlog = await blogs.create(data.create);
      blogIds.push(createdBlog.body.id);
      await blogs.update(createdBlog.body.id, {
        name: "updated",
        description: "updated",
        websiteUrl: "http://update.com",
      });
    }
      const response = await blogs.getOne(blogIds[0]);
      console.log(blogIds[0]);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("updated");
    }
  );
});

const data = {
  create: {
    name: "sure-footed-jaz",
    description: "Adfectus quasi curvo.",
    websiteUrl: "https://clueless-loaf.net/",
  },
  update: {
    name: "stale-outlaw.or",
    description: "Cometes eius delibero appello teneo quis.",
    websiteUrl: "https://brilliant-yarmulke.biz/",
  },
};

const blogIds: string[] = [];
