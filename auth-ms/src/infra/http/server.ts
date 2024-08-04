import { Hono } from "hono";
import { cors } from "hono/cors";
import { RegisterUserController } from "../../interfaces/controllers/auth/register-user.controller";
import { FetchByOrganizationController } from "../../interfaces/controllers/user/fetch-by-organization.controller";

export const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*', // Permitir todas as origens
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  })
);

const registerUserController = new RegisterUserController();
const FetchUsersController = new FetchByOrganizationController();

app.post("/register", registerUserController.register);
app.get("/client/all", FetchUsersController.fetchByOrganization);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});
