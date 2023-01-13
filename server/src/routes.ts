import { Router } from "express";
import { ProductsController } from "./controllers/ProductsController";


export const routes = Router()
//
const products = new ProductsController()


// Produtos

routes.get('/products', products.list)
routes.post('/products', products.create)
routes.put('/products/:id', products.update)
routes.delete('/products/:id', products.delete)

// Vendas 
routes.post('/sale', async(request, response) => {})
routes.put('/sale', async(request, response) => {})

// Ordem de Serviços
routes.post('/service', async(request,response) => {})
routes.put('/service', async(request,response) => {})

// Relatórios

// Diarios
routes.get('/daily-report', async(request, response) => {

})
// Semanais
routes.get('/weekly-report', async(request, response) => {

})
// Todos
routes.get('/all-reports', async(request, response) => {

})
// Não Pagos
routes.get('/not-paid', async(request, response) => {

})
// Relatórios de Serviços
// Mensal
routes.get('/monthly-services', async(request, response) => {

})
//
routes.get('/all-services', async(request, response) => {

})
