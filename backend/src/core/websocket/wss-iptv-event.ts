import getIoServer from "./websocketServer"

// exemplo
const Wss_Events = {
    // roda sempre que atualiza os usrios iptv
    'EXEMPLO_EVENT':<T=any>(data:T)=>{ getIoServer().emit('EXEMPLO_EVENT',data)},
}

export default Wss_Events