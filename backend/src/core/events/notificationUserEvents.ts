import { IPTVEvents, EventsTypesIptv } from "./iptv";


// --------------------------------------------------
// EXEMPLO
// --------------------------------------------------
IPTVEvents.on<EventsTypesIptv>('IPTV_UPDATE', async( event )=>{
    // SEU CODIGO
})