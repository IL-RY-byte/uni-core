import { configureOpenApi, createApp } from "@lib/create-app";
import { exampleProtected } from "@routes/exampleProtected";
import loginRouter from "@routes/login";


const app = createApp();
configureOpenApi(app);

app.route("/", loginRouter);
app.route("/", exampleProtected);

export default app;
