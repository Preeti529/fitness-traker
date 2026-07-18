import { config } from "process";

export default{
    routes:[
        {
        method:"POST",
        path :"/image-analysis",
        handler:"image-analysis.analyze",
        config :{ auth:false}
        }
    ]
}