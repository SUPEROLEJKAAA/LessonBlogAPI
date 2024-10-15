import { app } from "./app";
import { config } from "./config";

app.listen(config.port, () => {
    console.log(`Server started in port - ${config.port}`)
})