import { setupDocs, createApp } from "@lib/create-app";
import createUserRouter from "@routes/createUser";
import { exampleProtected } from "@routes/exampleProtected";
import getUserRouter from "@routes/getUser";
import loginRouter from "@routes/login";
import logoutRouter from "@routes/logout";


const app = createApp();
setupDocs(app);

app.route("/", loginRouter);
app.route("/", logoutRouter);
app.route("/", createUserRouter);
app.route("/", getUserRouter);
app.route("/protected", exampleProtected);

export default app;
