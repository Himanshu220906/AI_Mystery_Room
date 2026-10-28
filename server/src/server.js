import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';

if (!env.mongoUri) throw new Error('MONGODB_URI is required. Copy server/.env.example to server/.env and configure it.');
await mongoose.connect(env.mongoUri);
app.listen(env.port, () => console.log(`AI Mystery Room API listening on port ${env.port}`));
