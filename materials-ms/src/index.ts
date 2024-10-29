import { Hono } from 'hono'
import { CreateMaterialController } from './core/interfaces/controllers/attributes/create-material.controller'
import { FetchAllMaterialsController } from './core/interfaces/controllers/attributes/fetch-all-material.controller'
import { FindMaterialByIdController } from './core/interfaces/controllers/attributes/find-material-by-id.controller'
import { CreateRecordController } from './core/interfaces/controllers/records/create-record.controller'
import { FetchAllRecordController } from './core/interfaces/controllers/records/fetch-all-record.controller'
import { FindRecordByIdController } from './core/interfaces/controllers/records/find-record-by-id.controller'
import { AuthMiddleware } from './core/interfaces/middlewares/auth.middleware'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/material/all", AuthMiddleware.execute, FetchAllMaterialsController.execute)
app.post("/material/create", AuthMiddleware.execute, CreateMaterialController.execute)
app.get("/material/:id", AuthMiddleware.execute, FindMaterialByIdController.execute)

app.get("/record/all", AuthMiddleware.execute, FetchAllRecordController.execute)
app.post("/record/create", AuthMiddleware.execute, CreateRecordController.execute)
app.get("/record/:id", AuthMiddleware.execute, FindRecordByIdController.execute)

export default app
