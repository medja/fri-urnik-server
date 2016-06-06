import express from 'express';
import helmet from 'helmet';
import router from './router';

// Load and register all exceptions
import './exceptions';

const app = express();

app.use(helmet());

// Force UTF-8 responses
app.use((req, res, next) => {
    res.charset = 'utf-8';
    next();
});

app.use(express.static('public'));
app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});