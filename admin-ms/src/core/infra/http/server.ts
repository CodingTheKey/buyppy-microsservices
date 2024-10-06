import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { Logger } from "../../../utils/logger.util";
import { CreateAttributeController } from "../../interfaces/controllers/attributes/create-attribute.controller";
import { FetchAllAttributesController } from "../../interfaces/controllers/attributes/fetch-all-attributes.controller";
import { FindAttributeByIdController } from "../../interfaces/controllers/attributes/find-attribute-by-id.controller";
import { AuthController } from "../../interfaces/controllers/auth/auth.controller";
import { RegisterUserController } from "../../interfaces/controllers/auth/register-user.controller";
import { CreateCategoryController } from "../../interfaces/controllers/category/create-category.controller";
import { FetchAllCategoriesController } from "../../interfaces/controllers/category/fetch-all-categories.controller";
import { FindCategoryByIdController } from "../../interfaces/controllers/category/find-category-by-id.controller";
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
import { AuthMiddleware } from "../../interfaces/middlewares/auth.middleware";
import { CreateOrderNosqlController } from "../../mongo_bounded/controllers/orders/create-order.controller";
import { FindAllOrdersMongoController } from "../../mongo_bounded/controllers/orders/find-all-order.controller";
import { CreateProductsNosqlController } from "../../mongo_bounded/controllers/products/create-product.controller";
import { FindAllProductsMongoController } from "../../mongo_bounded/controllers/products/find-all-products.controller";

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

app.use('*', async (ctx: Context, next) => {
  const startTime = Date.now();

  await next();

  const duration = Date.now() - startTime;
  const logData = {
    method: ctx.req.method,
    path: ctx.req.path,
    status: ctx.res.status,
    duration,
    headers: ctx.header,
    query: ctx.req.query,

    request: ctx.req.method === 'GET' ? {} : await ctx.req.json(),
    // response: await ctx.res.json(),

    userAgent: JSON.stringify(ctx.req.header('User-Agent')),
    remoteAddress: ctx.req.header('X-Forwarded-For') || ctx.req.header('X-Real-IP'),
  };

  await logflareClient.sendLog(ctx, logData);
});

const registerUserController = new RegisterUserController();
const fetchUsersController = new FetchByOrganizationController();

app.post("/login", AuthController.execute);

app.post("/client/create", AuthMiddleware.execute, registerUserController.register);
app.get("/client/all", AuthMiddleware.execute, fetchUsersController.fetchByOrganization);
app.get("/client/export", AuthMiddleware.execute, ExportClientsController.execute);

app.get("/product/all", AuthMiddleware.execute, FetchAllProductsController.fetchAll)
app.post("/product/create", AuthMiddleware.execute, CreateProductWithAttributesController.execute)
app.get("/product/export", AuthMiddleware.execute, ExportProductsController.execute);
app.put("/product/:id", AuthMiddleware.execute, UpdateProductController.execute)
app.delete("/product/:id", AuthMiddleware.execute, DeleteProductController.execute)
app.get("/product/:id", AuthMiddleware.execute, FetchProductByIdController.execute)

app.post("/client/create", AuthMiddleware.execute, registerUserController.register);
app.get("/client/all", AuthMiddleware.execute, fetchUsersController.fetchByOrganization);
app.get("/client/report", AuthMiddleware.execute, ClientRepositoryController.execute)
app.get("/client/:id", AuthMiddleware.execute, FindClientByIdController.execute)
app.delete("/client/:id", AuthMiddleware.execute, DeleteClientController.execute)
app.put("/client/:id", AuthMiddleware.execute, UpdateClientController.execute)

app.post("/order/create", AuthMiddleware.execute, CreateOrderController.execute)
app.get("/order/all", AuthMiddleware.execute, FetchAllOrderController.execute)
app.get("/order/:id", AuthMiddleware.execute, FindOrderController.execute)
app.put("/order/cancel/:id", AuthMiddleware.execute, CancelOrderController.execute)

app.get("/attribute/all", AuthMiddleware.execute, FetchAllAttributesController.execute)
app.post("/attribute/create", AuthMiddleware.execute, CreateAttributeController.execute)
app.get("/attribute/:id", AuthMiddleware.execute, FindAttributeByIdController.execute)

app.get("/category/all", AuthMiddleware.execute, FetchAllCategoriesController.execute)
app.post("/category/create", AuthMiddleware.execute, CreateCategoryController.execute)

app.get("/category/:id", AuthMiddleware.execute, FindCategoryByIdController.execute)

app.get("/playground/product/all", FindAllProductsMongoController.execute)
app.post("/playground/product/create", CreateProductsNosqlController.execute)

app.get("/playground/order/all", FindAllOrdersMongoController.execute)
app.post("/playground/order/create", CreateOrderNosqlController.execute)

app.get("/", (c) => {
	return c.text("Hello Hono!");
});