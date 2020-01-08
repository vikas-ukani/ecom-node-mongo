require('dotenv').config({
    path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const { HTTP_HOST, PORT } = process.env;
const debug = require('debug')('express:www');

const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** routes url called */
const indexRouter = require('./routes/index');

const { COOKIE_EXPIRATION_MS } = process.env;
// app.use(session({
//     store: redisStore,
//     secret: 'keyboard cat',
//     name: process.env.SESSION_COOKIE_NAME,
//     resave: false,
//     saveUninitialized: true,
//     proxy: true,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production',
//         expires: Date.now() + parseInt(COOKIE_EXPIRATION_MS, 10),
//         maxAge: parseInt(COOKIE_EXPIRATION_MS, 10),
//     },
// })
// );

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    );
    next();
});


/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {

    const bind = `http://${process.env.HTTP_HOST}:${process.env.PORT}`;
    // console.log('Connecting to ' + bind);
    debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen((process.env.PORT), process.env.HTTP_HOST);
server.listen((process.env.PORT), process.env.HTTP_HOST, err => {
    if (err) {
        debug("error", err);
        process.exit(1);
    }

    /** database conenction with mongodb */
    require('./config/db');
    // initAuthMiddleware(app);

    app.use('/', indexRouter);

});
// server.on('error', onError);
server.on('listening', onListening);
// module.exports = app;
