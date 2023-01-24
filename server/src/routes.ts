import { Router } from "express";
import { ProductsController } from "./controllers/ProductsController";
import { ReportsController } from "./controllers/ReportsController";
import { SalesController } from "./controllers/SalesController";
import { ServicesController } from "./controllers/ServicesController";
import { ServicesReportsController } from "./controllers/ServicesReportsController";


export const routes = Router()
//
const products = new ProductsController()
const sales = new SalesController()
const services = new ServicesController()
const reports = new ReportsController()
const serviceReports = new ServicesReportsController()

routes.get('/products', products.list)
routes.post('/products', products.create)
routes.put('/products/:id', products.update)
routes.delete('/products/:id', products.delete)

// Vendas 
routes.post('/sales', sales.create)
routes.patch('/sales', sales.edit)

// Ordem de Serviços
routes.post('/service', services.create)
routes.put('/service', services.edit)

// Relatórios

// Diarios
routes.get('/daily-report', reports.daily)
// Semanais
routes.get('/weekly-report', reports.weekly)
// Todos
routes.get('/all-reports', reports.all)
// Não Pagos
routes.get('/not-paid', reports.all)
// Relatórios de Serviços
// Mensal
routes.get('/monthly-services', serviceReports.monthly)
//
routes.get('/all-services', serviceReports.all)
