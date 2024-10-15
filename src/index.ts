import { app } from "./app";
import { config } from "./config";
import { connectToMongo } from "./db/db"

app.listen(config.port, async () => {
    await connectToMongo()
    console.log(`Server started in port - ${config.port}`)
})