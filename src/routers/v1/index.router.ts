import { Router } from "express"
import hotelsRouter from "./hotels.router"

const router= Router()

// setup all app routes
router.use("/hotels", hotelsRouter)

export default router