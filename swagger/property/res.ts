export default {
  authorization: {
    type: "string",
    description: "토큰",
    example:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJjbG9ib3QiLCJuYW1lIjoiamF5IiwiaWF0IjoxNzA4NDcyNTk1fQ.LYLEOsAS7OqBL26eZdzZ08HUq86IaSb85NZNtovdBuU-",
  },
  client_total: {
    type: "number",
    description: "rtsp 연결된 유저 수",
    example: 1,
  },
  rtsp_info: {
    type: "string",
    description: "연결 상태",
    example:
      "frame=197 fps=32 q=31.0 size=2416kB time=00:00:06.53 bitrate=3029.3kbits/s dup=0 drop=1 speed=1.07x",
  },
};
