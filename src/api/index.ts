import express from "express";
import { singleton } from "tsyringe";
import v1 from "./v1";


@singleton()
export class API {
    private app = express();
    private port = 3001;

    setup(){
        this.app.use('/v1', v1.router)
        this.app.listen(this.port, () => {
            console.log("listening on port " + this.port);
        })
    }
    
}