import { Hono } from "hono";
import { cors } from "hono/cors";
import { AuthController } from "../../interfaces/controllers/auth/auth.controller";
import { RegisterUserController } from "../../interfaces/controllers/auth/register-user.controller";
import { DeleteClientController } from "../../interfaces/controllers/client/delete-client.controller";
import { ExportClientsController } from "../../interfaces/controllers/client/export-clients.controller";
import { FindClientByIdController } from "../../interfaces/controllers/client/find-client-by-id.controller";
import { UpdateClientController } from "../../interfaces/controllers/client/update-client.controller";
import { CancelOrderController } from "../../interfaces/controllers/orders/cancel-order.controller";
import { CreateOrderController } from "../../interfaces/controllers/orders/create-order.controller";
import { FetchAllOrderController } from "../../interfaces/controllers/orders/fetch-all-orders.controller";
import { FindOrderController } from "../../interfaces/controllers/orders/find-order.controller";
import { CreateProductWithAttributesController } from "../../interfaces/controllers/products/create-product-with-attributes.controller";
import { DeleteProductController } from "../../interfaces/controllers/products/delete-product.controller";
import { ExportProductsController } from "../../interfaces/controllers/products/export-product.controller";
import { FetchAllProductsController } from "../../interfaces/controllers/products/fetch-all-products.controller";
import { FetchProductByIdController } from "../../interfaces/controllers/products/fetch-product-by-id.controller";
import { UpdateProductController } from "../../interfaces/controllers/products/update-product.controller";
import { ClientRepositoryController } from "../../interfaces/controllers/report/client/client-report.controller";
import { FetchByOrganizationController } from "../../interfaces/controllers/user/fetch-by-organization.controller";
import { Logger } from "../../utils/logger.util";

export const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

const logflareClient = new Logger('5i4Oqb0QQHJ_', '3a0309a4-a418-4d2d-bd38-ee39387ff91f');

app.use('*', async (ctx, next) => {
  const startTime = Date.now();

  await next();

  const duration = Date.now() - startTime;
  const logData = {
    method: ctx.req.method,
    path: ctx.req.path,
    status: ctx.res.status,
    duration,
    headers: ctx.header,
  };

  await logflareClient.sendLog(ctx, logData);
});


const registerUserController = new RegisterUserController();
const fetchUsersController = new FetchByOrganizationController();

app.post("/login", AuthController.execute);

app.post("/client/create", registerUserController.register);
app.get("/client/all", fetchUsersController.fetchByOrganization);
app.get("/client/export", ExportClientsController.execute);

app.get("/product/all", FetchAllProductsController.fetchAll)
app.post("/product/create", CreateProductWithAttributesController.execute)
app.get("/product/export", ExportProductsController.execute);
app.put("/product/:id", UpdateProductController.execute)
app.delete("/product/:id", DeleteProductController.execute)
app.get("/product/:id", FetchProductByIdController.execute)

app.post("/client/create", registerUserController.register);
app.get("/client/all", fetchUsersController.fetchByOrganization);
app.get("/client/report", ClientRepositoryController.execute)
app.get("/client/:id", FindClientByIdController.execute)
app.delete("/client/:id", DeleteClientController.execute)
app.put("/client/:id", UpdateClientController.execute)

app.post("/order/create", CreateOrderController.execute)
app.patch("/order/cancel/:id", CancelOrderController.execute)
app.get("/order/all", FetchAllOrderController.execute)
app.get("/order/:id", FindOrderController.execute)

app.get("/", (c) => {
	return c.text("Hello Hono!");
});