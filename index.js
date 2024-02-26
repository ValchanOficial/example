import express from "express";
import { request } from "undici";

const app = express();
app.use(express.json());

app.post("/create", (req, res) => {
  return res.status(201).json();
});

app.post("/fetch", async (req, res) => {
  try {
    const { statusCode, body } = await request("http://0.0.0.0:3000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "John Doe" }),
    });
    const res = await body.json();
    console.log("statusCode", statusCode);
    console.log("res", res);
    return res.status(200).json(res);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
