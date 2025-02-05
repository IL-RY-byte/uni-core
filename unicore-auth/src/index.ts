import { configureOpenApi, createApp } from "@lib/create-app";
import createUserRouter from "@routes/createUser";
import { exampleProtected } from "@routes/exampleProtected";
import loginRouter from "@routes/login";


const app = createApp();
configureOpenApi(app);

app.route("/", loginRouter);
app.route("/", createUserRouter);
app.route("/", exampleProtected);

export default app;
