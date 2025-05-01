'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import roomRoutes from '../src/room/room.routes.js'
import serviceRoutes from '../src/service/service.routes.js'
import userRoutes from '../src/user/user.routes.js'
import reservationRoutes from '../src/reservation/reservation.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import {initializeDatabase} from './initSetup.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(authRoutes)
    app.use('/v1/hotel', hotelRoutes )
    app.use('/v1/Room', roomRoutes)
    app.use('/v1/User', userRoutes)
    app.use('/v1/Service', serviceRoutes)
    app.use('/V1/Reservation', reservationRoutes)
}


export const initServer = async()=>{
    
    const app = express()
    try{
        configs(app)
        routes(app)
        await initializeDatabase();
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)

    }catch(err){
        console.error('Server init failed', err)
    }
}