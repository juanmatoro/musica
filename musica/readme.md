# CREAR PROYECTO EN NODEJS

1. ejecutar los siguentes comandos


- incilizar proyecto -> package.json -> rellenar los datos que pide (opcional)
```bash
npm init
```

2. Ir al archivo package.json, pegamos el siguente código (ojo, las versiones de los módulos pueden cambiar con el tiempo) y finalmente ejecutamos 'npm i'.

```json
{
  "name": "240229_node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js",
    "build": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.3",
    "mongoose": "^8.2.0",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```



3. crear la siguiente estructura de carpetas y archivos

- /utils    - db.js
            - httpStatusCode.js

- /src  - /controllers
        - /routes
        - /models
        - /middlewares

4. rellenamos el archivo db.js con la función de conexión a MongoDB.

```javascript
const mongoose = require('mongoose');

const pass = '<mi cadena de conexión>';

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(pass);
        console.log('INFO: Conexión a BD correcta:', conn.connection.name)
    } catch (error) {
        console.log('ERROR: (f connectMongo) ->', error.message);
    }
}

module.exports = { connectMongo };

```

5. rellenamos el archivo httpStatusCode.js con los siguentes datos:

```javascript
module.exports = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Unordered Collection",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    511: "Network Authentication Required",
};

```

6. Creamos los archivos track.routes.js, track.model.js, track.controller.js

## track.model.js

```javascript
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    isrc: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    contributors: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    lineCYear: {
        type: Number,
        required: true,
        trim: true
    },
    lineCPublisher: {
        type: String,
        required: true,
        trim: true
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;

```

## track.controller.js

```javascript
const Track = require('../model/track.model');
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD

// - CONSULTAR

// -- UNA CANCION
const getTrack = async (req, res, next) => {
    try {
        //1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
        const id = req.params.id;
        //2. BUSCO EN LA BBDD POR ID
        const track = await Track.findById(id);
        //3. RESPONDO AL USUARIO
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            track: track
        });
    } catch (error) {
        next(error)
    }
}

// -- TODAS LAS CANCIONES
const getTracks = async (req, res, next) => {
    try {
        //1. BUSCO TODAS LAS TRACKS
        const tracks = await Track.find();
        //2. RESPONDO AL USUARIO
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            tracks: tracks
        });
    } catch (error) {
        next(error)
    }
}


// - CREAR

const createTrack = async (req, res, next) => {
    try {
        //1. CREAR UNA VARIABLE (TIPO TRACK) QUE RECOJA LOS DATOS QUE ENVÍA EL USUARIO.
        const track = new Track(req.body);
        //2.GUARDAR EN BBDD
        await track.save();
        //3. CONTESTAR AL USUARIO
        res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            track: track
        });
    } catch (error) {
        next(error);
    }
}


// - MODIFICAR

const updateTrack = async (req, res, next) => {
    try {
        //1. BUSCAR EL TRACK QUE HAY QUE MODIFICAR.
        const id = req.params.id;
        //2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
        const body = req.body;
        //3. ACTUALIZAR LA FUNCIÓN
        const track = await Track.findByIdAndUpdate(id, body, { new: true });
        // 4. RESPUESTA AL USUARIO
        if (!track) {
            return res.status(404).json({
                status: 404,
                message: HTTPSTATUSCODE[404],
            });
        }
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: track
        });
    } catch (error) {
        next(error);
    }
}

// - DELETE

const deleteTrack = async (req, res, next) => {
    try {
        const id = req.params.id;
        const track = await Track.findByIdAndDelete(id);

        if (!track) {
            return res.status(404).json({ message: 'Track no encontrada' }); // esto sería un mensaje de error personalizado.
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: track
        });

    } catch (error) {
        next(error);
    }
};



module.exports = { getTrack, getTracks, createTrack, updateTrack, deleteTrack }
```
## track.routes.js

```javascript
const express = require('express');
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const trackRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const { getTrack, getTracks, createTrack, updateTrack, deleteTrack } = require('../controller/track.controller');

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
trackRouter.get('/:id', getTrack);

//OBTENER TODAS LAS CANCIONES
trackRouter.get('/', getTracks);

//CREAR UNA CANCIÓN
trackRouter.post('/', createTrack);

//UPDATE
trackRouter.patch('/:id', updateTrack);

//DELETE
trackRouter.delete('/:id', deleteTrack);


module.exports = trackRouter;
```

7. Creamos el archivo index.js en el directorio de raiz y ya incluimos los enlaces a las rutas de track.

```javascript
// librerías importadas
const express = require('express');
const cors = require('cors');
// componentes "míos" que voy a utilizar
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const { connectMongo } = require('./utils/db');
const trackRouter = require('./src/routes/track.routes');

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
})); */ // SI USÁRAMOS CORS PARA RESTRINGIR ACCESOS, SERÍA ASÍ.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* ROUTES */
app.use('/track', trackRouter);

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

app.disable('x-powered-by'); // ocultar al público que usamos nodejs.

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`);
});
```

8. Creamos el archivo auth.middleware.js en la carpeta middleware.

```javascript
const jwt = require("jsonwebtoken")
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const isAuth = (request, response, next) => {

    const authorization = request.headers.authorization

    if (!authorization) {
        return response.json({
            status: 401,
            message: HTTPSTATUSCODE[401],
            data: null
        });
    }

    const splits = authorization.split(" ")
    if (splits.length != 2 || splits[0] != "Bearer") {
        return response.json({
            status: 400,
            message: HTTPSTATUSCODE[400],
            data: null
        });
    }

    const jwtString = splits[1]

    try {
        var token = jwt.verify(jwtString, request.app.get("secretKey"));

    } catch (error) {
        return next(error)
    }

    const authority = {
        id: token.id,
        name: token.name
    }
    request.authority = authority
    next()
}

module.exports = {
    isAuth,
}


```