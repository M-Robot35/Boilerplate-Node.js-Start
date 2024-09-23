import { Router } from 'express'
import ScheduleController from '../controllers/ScheduleController';

const scheduleRouter= Router()


scheduleRouter.post('/user/schedule/add', ScheduleController.add)

scheduleRouter.post("/user/schedule/start", ScheduleController.start);

scheduleRouter.post("/user/schedule/stop", ScheduleController.stop);

scheduleRouter.post("/user/schedule/remove", ScheduleController.remove);

scheduleRouter.get("/user/schedule/all", ScheduleController.all);





export default scheduleRouter