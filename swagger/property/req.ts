export default {
  // AUTH
  id: {
    required: true,
    type: "string",
    description: "아이디",
    example: "jay",
  },
  pw: {
    required: true,
    type: "string",
    description: "비밀번호",
    example: "(crypto 암호화)",
  },
};
