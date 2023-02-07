import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ProductsController } from "./controllers/ProductsController";
import { ReportsController } from "./controllers/ReportsController";
import { SalesController } from "./controllers/SalesController";
import { ServicesController } from "./controllers/ServicesController";
import { ServicesReportsController } from "./controllers/ServicesReportsController";
import { AuthenticationMiddleware } from './middlewares/auth'
export const routes = Router()

// Controllers
const products = new ProductsController() //Produtos
const sales = new SalesController() // Vendas
const services = new ServicesController() // Serviços
const reports = new ReportsController() // Relatórios de vendas
const serviceReports = new ServicesReportsController() // Relatórios de Serviços
const auth = new AuthController()
// Produtos
routes.get('/products', AuthenticationMiddleware, products.list) // Todos os produtos
routes.post('/products', AuthenticationMiddleware, products.create) // Registro de produtos
routes.put('/products/:id', AuthenticationMiddleware, products.update) // Atualização de Produtos
routes.delete('/products/:id', AuthenticationMiddleware, products.delete) // Apagar um produto

// Vendas 
routes.post('/sales', AuthenticationMiddleware, sales.create) // Fazer uma Venda
routes.patch('/sales', AuthenticationMiddleware, sales.edit) // Atualizar o estado de uma venda (se foi pago ou não)

// Ordem de Serviços
routes.post('/service', AuthenticationMiddleware, services.create) // Criação de Serviço
routes.put('/service', AuthenticationMiddleware, services.edit) // Atualizar dados de um Serviço

// Relatórios
routes.get('/daily-report', AuthenticationMiddleware, reports.daily) // Relatório do Dia
routes.get('/weekly-report', AuthenticationMiddleware, reports.weekly) // Relatório da Semana
routes.get('/all-reports', AuthenticationMiddleware, reports.all) // Todas as Vendas
routes.get('/not-paid', AuthenticationMiddleware, reports.all) // Todas as vendas não paga

// Relatórios de Serviços
routes.get('/monthly-services', AuthenticationMiddleware, serviceReports.monthly) // Relátorio de Serviços do mês
routes.get('/all-services', AuthenticationMiddleware, serviceReports.all) // Todos os Serviços do mês

// Autenticação

routes.post('/register', auth.register) // Registro de novo Usuário
routes.post('/login', auth.login)
routes.get('/usernames', AuthenticationMiddleware, auth.username)
