import { serverConfig } from './core/config/server';
import http from 'http'
import express from "express";
import routes from "./rotas/rotas";
import { Wss } from "./core/websocket/websocketServer";
import logSystem from './core/config/Logs';

const port = process.env.PORT || serverConfig.port

const app = express();
if(serverConfig.rateLimite.activeRateLimit){
    app.use(serverConfig.rateLimite.limite);
}
app.use(express.json())
app.use(serverConfig.cors);

app.use(routes);

const server= http.createServer(app)
const websocket= Wss(server) 


server.listen(port,()=> logSystem.success(`Server On : ${serverConfig.urlBase}:${port}`));