import { Hono } from "hono";
import { cors } from "hono/cors";
import { AuthController } from "../../interfaces/controllers/auth/auth.controller";
import { RegisterUserController } from "../../interfaces/controllers/auth/register-user.controller";
import { CreateProductController } from "../../interfaces/controllers/products/create-product.controller";
import { DeleteProductController } from "../../interfaces/controllers/products/delete-product.controller";
import { FetchAllProductsController } from "../../interfaces/controllers/products/fetch-all-products.controller";
import { UpdateProductController } from "../../interfaces/controllers/products/update-product.controller";
import { FetchByOrganizationController } from "../../interfaces/controllers/user/fetch-by-organization.controller";

export const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

const registerUserController = new RegisterUserController();
const fetchUsersController = new FetchByOrganizationController();

app.post("/login", AuthController.execute);

app.post("/client/create", registerUserController.register);
app.get("/client/all", fetchUsersController.fetchByOrganization);

app.get("/product/all", FetchAllProductsController.fetchAll)
app.post("product/create", CreateProductController.execute)
app.put("/product/:id", UpdateProductController.execute)
app.delete("/product/:id", DeleteProductController.execute)

app.get("/", (c) => {
	return c.text("Hello Hono!");
});
