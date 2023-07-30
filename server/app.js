import express from "express";
import morgan from "morgan";
import { boomErrorHandler, errorHandler } from './middlewares/index.js';
import postsRoutes from "./routes/post.routes.js";
import { dirname,join } from "path";
import { fileURLToPath } from "url"
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const clientPath = join(__dirname,'../client/dist');
const imagePath = join(__dirname,'../upload');


// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use('/public',express.static(imagePath));
app.use(express.static(clientPath));

// Routes
app.use(postsRoutes);
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'))
});

// Error Handleling
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
