import app from './app.js';
import { connectDB } from './libs/mongo.database.js';
import { PORT } from './config.js';

connectDB();

app.listen(PORT);
console.log('#################### Server Running ####################');
console.log(`Server running on http://localhost:${PORT}`);