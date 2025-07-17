import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

init();
