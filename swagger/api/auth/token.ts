import { apiSchemas } from "../../handler/setting";
import { req, res } from "../../property";

const { id, pw } = req;
const { authorization } = res;
const schemas = apiSchemas({
  methods: "post",
  tag: "Auth",
  description: "토큰 생성",
  requestBody: {
    properties: {
      id,
      pw,
    },
  },
  responses: {
    properties: {
      authorization,
    },
  },
});

export default {
  "/api/v1/auth/token": schemas,
};
