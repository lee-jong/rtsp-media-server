import { apiSchemas } from "../../handler/setting";
const schemas = apiSchemas({
  methods: "get",
  tag: "Common",
  description: "서버 상태 확인",
  requestBody: {},
  responses: {
    properties: {},
  },
});

export default {
  "/api/v1/common/ping": schemas,
};
