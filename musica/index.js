// librerías importadas
const express = require('express');
const cors = require('cors');
// componentes "míos" que voy a utilizar
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const { connectMongo } = require('./utils/db');
const trackRouter = require('./src/routes/track.routes');
const userRouter = require('./src/routes/user.routes');

// AQUI EL ROUTER DE CONTRIBUTOR

const PORT = 3000;


// CONFIGURACION
connectMongo();
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
/* app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
})); */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* ROUTES */
app.use('/track', trackRouter);
//app.use('/contributor', contributorRouter);
app.use('/user', userRouter);

// ruta de bienvenida
app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Welcome to my server',
        app: 'My App'
    });
});

/* MANEJO DE ERRORES */

app.use((request, response, next) => {
    let error = new Error();
    error.status = 404;
    error.message = HTTPSTATUSCODE[404];
    next(error);
});

app.use((error, request, response, next) => {
    return response.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by');

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`);
});