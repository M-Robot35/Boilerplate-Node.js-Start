import EventDefault from "./defaultEvent";

// -----------------------
//  exemplo  ---
// -----------------------
export type EventsTypesIptv= "IPTV_UPDATE" | "IPTV_SEARCH_ALL" | "USUARIOS_VENCENDO" | "CREDITO_OK" | "CREDITO_ERROR"

/**
 * @emits USUARIOS_VENCENDO  -- usuários cadastrados que estão para vencer
 * @emits IPTV_UPDATE  -- faz a verificação periodica todos dias meia noite
 */
export const IPTVEvents= new EventDefault<EventsTypesIptv>()

