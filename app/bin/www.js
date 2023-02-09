"use strict";

// 서버를 띄워주는 코드
const app = require("../app");
const PORT = 3001;

app.listen(PORT, () => {
  console.log('서버 가동');
});