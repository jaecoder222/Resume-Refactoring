import express from "express";
import UsersRouter from "../routes/user.router.js";
const app = express();
const PORT = 3010;

app.use(express.json());
app.use("/api", [UsersRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
