import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { connect } from './core/infra/db/drizzle/drizzle'
import { CreateRecordController } from './core/interfaces/controllers/records/create-record.controller'
import { DeleteRecordController } from './core/interfaces/controllers/records/delete-record.controller'
import { FetchAllRecordController } from './core/interfaces/controllers/records/fetch-all-record.controller'
import { FindRecordByIdController } from './core/interfaces/controllers/records/find-record-by-id.controller'
import { CreateMaterialController } from './core/interfaces/materials/create-material.controller'
import { FetchAllMaterialsController } from './core/interfaces/materials/fetch-all-material.controller'
import { FindMaterialByIdController } from './core/interfaces/materials/find-material-by-id.controller'
import { AuthMiddleware } from './core/interfaces/middlewares/auth.middleware'

type Env = {
  DB: D1Database
}

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.delete("/record/:id", AuthMiddleware.execute, DeleteRecordController.execute)
app.get("/record/all", AuthMiddleware.execute, FetchAllRecordController.execute)
app.post("/record/create", AuthMiddleware.execute, CreateRecordController.execute)
app.get("/record/:id", AuthMiddleware.execute, FindRecordByIdController.execute)

app.get("/material/all", AuthMiddleware.execute, FetchAllMaterialsController.execute)
app.post("/material/create", AuthMiddleware.execute, CreateMaterialController.execute)
app.get("/material/:id", AuthMiddleware.execute, FindMaterialByIdController.execute)

async function sendLog(logData: unknown): Promise<void> {
  try {
    const response = await fetch('https://api.logflare.app/logs/json?source=3a0309a4-a418-4d2d-bd38-ee39387ff91f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': '5i4Oqb0QQHJ_'
      },
      body: JSON.stringify({ 
        log_entry: logData,
      }),
    });

    console.log(response)

    if (!response.ok) {
      console.error(`Failed to send log to Logflare: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send log to Logflare:', error);
  }
}

export default {
  ...app,
  fetch: async (request: Request, c: Env) => {
    sendLog({
      request,
      c
    })
    connect(c.DB)
    return app.fetch(request, c)
  },
};