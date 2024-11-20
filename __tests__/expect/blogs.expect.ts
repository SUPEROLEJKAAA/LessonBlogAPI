export const BlogsExpect = {
  created: {
    id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String),
    websiteUrl: expect.any(String),
    createdAt: expect.any(String),
    isMembership: expect.any(Boolean),
  },
};
