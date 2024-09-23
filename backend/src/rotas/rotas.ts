import  { Router } from "express";
import webhookRouter from "./webhook";
import userRouter from "./useRoute";
import scheduleRouter from "./scheduleRoute";

const routes = Router();
routes.use(userRouter)
routes.use(scheduleRouter)
routes.use(webhookRouter)



export default routes;