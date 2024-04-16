import { apiSchemas } from "../../handler/setting";
import { res } from "../../property";

const { client_total, rtsp_info } = res;
const schemas = apiSchemas({
  methods: "get",
  tag: "RTSP",
  description: "RTSP 연결 정보 및 유저 카운트",
  requestBody: {},
  responses: {
    properties: {
      client_total,
      rtsp_info,
    },
  },
});

export default {
  "/api/v1/rtsp/info": schemas,
};
