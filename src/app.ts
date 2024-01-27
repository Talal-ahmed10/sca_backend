require('dotenv').config({ path: '.env.local' });
require('./db');
const serverless = require('serverless-http');
import express, { Express, Request, Response, json } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(
    cors({
        origin: '*',
    })
);
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Hello!',
    });
});

app.use('/api', require('./routers/auth.router'));
app.use('/api/user', require('./routers/user.router'));
app.use('/api/inventory', require('./routers/inventory.router'));
app.use('/api/supplier', require('./routers/supplier.router'));

app.use((req: Request, res: Response) => {
    return res.status(404).json({
        message: 'Not Found',
    });
});

if (process.env.NODE_ENV === 'local') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Sever is live on: http://localhost:${PORT}/`));
}

export const handler = serverless(app);
