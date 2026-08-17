import { handle } from '@hono/node-server/vercel';

// eslint-disable-next-line
// @ts-ignore
import app from '../build/server/index.js';

export default handle(app);
