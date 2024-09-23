import { io, Socket } from 'socket.io-client'
import configSystem from '../config/configSystem';
import logSystem from '../config/Logs';

//  ----------------------------------------------
// wss para receber connecção de websocket
//  ----------------------------------------------

let Ws: Socket | null= null;
const wss= configSystem.websocketClient

function websocket() {
    const WsServer = io(`ws://${wss.url}`, {
        reconnectionDelayMax: wss.delayReconnect,
        // autoConnect: true,
        // forceBase64: true,
        // hostname: undefined,  // The hostname for our connection. Set from the URI passed when connecting
        // protocols: undefined, // string | string[] | undefined
    })
    Ws = WsServer
}
websocket()

export default function getIoClient() {
    if (Ws) {
        logSystem.success('WEBSOCKET: Online')
        return Ws
    } else {
        logSystem.error('WEBSOCKET: OffLine')
    }
}
