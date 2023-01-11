import { request, Router } from "express";

export const routes = Router()

// Produtos

routes.get('/products', async(request,response) => {

})
routes.post('/products', async(request,response) => {
    
})
routes.put('/products', async(request,response) => {
    
})
routes.delete('/products', async(request,response) => {
    
})

// Vendas 
routes.post('/sale', async(request, response) => {

})
routes.put('/sale', async(request, response) => {

})

// Ordem de Serviços
routes.post('/service', async(request,response) => {

})

routes.put('/service', async(request,response) => {

})

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
