import  { Router } from "express";
import webhookRouter from "./webhook";
import userRouter from "./useRoute";
import scheduleRouter from "./scheduleRoute";
import payment from "./payment";
import routerTest from "./route-test";

const routes = Router();
routes.use(routerTest)  // ROTA APENAS PARA TESTES
routes.use(webhookRouter)
routes.use(userRouter)
routes.use(scheduleRouter)
routes.use(payment)




export default routes;