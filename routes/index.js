import Router from 'express';
const router = new Router();
import brandRouter from "./brandRouter.js";
import deviceRouter from "./deviceRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)


export default router;