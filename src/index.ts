import express, { Request, Response } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import cookieParser from "cookie-parser";
import db from "./utils/db.js";
import { TSHIRT_COLLECTION } from "./utils/tshirt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

const liveReloadServer = livereload.createServer({
  exts: ["html", "js", "css", "tsx", "ts"],
  debug: false,
});

liveReloadServer.watch([
  join(__dirname, "../public"),
  join(__dirname, "../dist"),
  join(__dirname, "../src"),
]);

app.use(connectLivereload());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));
app.use("/dist", express.static(join(__dirname, "../dist")));

// Cart endpoints ---

app.get("/api/cart", async (req: Request, res: Response) => {
});

app.post("/api/cart", async (req: Request, res: Response) => {
});

app.delete("/api/cart", async (req: Request, res: Response) => {
});

// Auth endpoints ---

app.get("/api/auth/user", async (req: Request, res: Response<{user: string | null}>) => {
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
});

app.post("/api/auth/logout", (req: Request, res: Response) => {
});

// Product endpoints ---

app.get("/api/products", async (req: Request, res: Response) => {
  res.json(TSHIRT_COLLECTION);
});

// ---

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  liveReloadServer.close();
  process.exit(0);
});
