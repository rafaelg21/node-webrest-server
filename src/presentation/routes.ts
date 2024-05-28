import { Router } from "express";
import { TodoRoutes } from "./todos/routes";






export class AppRoutes {


    static get routes(): Router {        
        const router = Router();              
        router.use('/api/todos', TodoRoutes.routes);  
        
        // ejemplos
        //router.use('/api/products', TodoRoutes.routes);  
        //router.use('/api/users', TodoRoutes.routes);  
        
        return router;
    }

}