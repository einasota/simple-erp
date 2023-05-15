import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, Package, Phone, Plus, ShoppingCart, X } from 'phosphor-react';
import { api } from '../lib/api';
import { RadioMethod } from './RadioMethod';
import CurrencyFormat from 'react-currency-format';
import dayjs from 'dayjs';
import { RadioGroupContextValue } from '@radix-ui/react-radio-group';
import { Autocomplete, TextField } from '@mui/material';

type Product = {
    id: string,
    name: string,
    value: number,
    type: number
}
interface List {
    id: string | undefined,
    name: string | undefined,
    quantity: number | undefined,
    type: number | undefined,
    value: number | undefined,
    totalValue: number,
}


export function NewSale() {
    const [paid, setPaid] = useState<Checkbox.CheckedState>(false)
    const [warranty, setWarranty] = useState<Checkbox.CheckedState>(false)
    const [discount, setDiscount] = useState<number>(0)
    const [method, setMethod] = useState<string>()
    const [client, setClient] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [value, setValue] = useState<number>(0)
    const [dialog1, setDialog1] = useState(false)

    //List of products
    const [productData, setProductsData] = useState<Array<Product>>([])
    const [listProducts, setListProducts] = useState<Array<List>>([])
    const [quantityItem, setQuantityItem] = useState<number>(0)
    const [select, setSelect] = useState<Product | null>()
    const [addProduct, setAddProduct] = useState(false)

    const today = dayjs(new Date()).startOf('D').format('YYYY/MM/DD').toString()
    async function getProductData() {
        const Product = await api.get('/products')
        setProductsData(Product.data)
    }

    // console.log(method, client, phone)
    async function handleSubmit() {

    }
    function handleAddProductButton(event: FormEvent) {
        event.preventDefault()
        setAddProduct(!addProduct)
    }
    function discountConverter(value:string){
        const discountFinal = value.split('R$')
        setDiscount(Number(discountFinal[1]))
    }
    function handleAddProductList(event: FormEvent) {
        event.preventDefault()
        setAddProduct(false)
        setListProducts([...listProducts, {id: select!.id, name: select!.name, value: select!.value, type: select!.type ,quantity: quantityItem, totalValue: Number(quantityItem) * select!.value}])
        const finalValue = listProducts.reduce((total, item) => total + item.totalValue, 0) + Number(quantityItem * select!.value) - discount
        setValue(finalValue)
    }
    console.log(value, discount)
    useEffect(() => {
        getProductData()
    }, [])

    return (
        <Dialog.Root open={dialog1} >
            <Dialog.Trigger>
                <button onClick={() => setDialog1(true)} className="h-16 w-48 flex flex-row justify-center gap-3 items-center rounded-md bg-white border-2 border-white hover:border-zinc-200 hover:bg-zinc-300">
                    <Package size={24} color="#0f0f0f" />
                    Nova venda
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='w-screen h-screen fixed inset-0 bg-black/50' />
                <Dialog.Content className='h-[90%]  w-4/6 p-10 flex flex-col bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto'>
                    <div className='flex flex-row justify-between items-center gap-2'>
                        <Dialog.Title className='flex flex-row gap-1 text-4xl font-semibold justify-center items-center mb-6'><Package size={36} color="#0f0f0f" /> Nova Venda</Dialog.Title>
                        <Dialog.Close className='flex justify-center items-center'>
                            <button onClick={() => setDialog1(false)}>
                                <X size={24} weight='bold' color="#0f0f0f" />
                            </button>
                        </Dialog.Close>
                    </div>
                    <form className='flex flex-col gap-3 text-xl' onSubmit={handleSubmit}>
                        <div >
                            <div className='flex flex-row justify-start items-center gap-2'>
                                <fieldset className='flex flex-row justify-start items-baseline gap-3'>
                                    <label htmlFor="client" className='font-semibold leading-tight' >Nome do Cliente:</label>
                                    <input id='client' type="text" onChange={(e) => setClient(e.target.value)} className='p-2 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                                <fieldset className='flex flex-row justify-start items-center gap-3'>
                                    <label htmlFor="telephone" className='flex flex-row justify-center items-center gap-2'><Phone size={24} color="#0f0f0f" className='' />Telefone:</label>
                                    <CurrencyFormat type='tel' onValueChange={e => setPhone(e.value)} format='(##) #####-####' className='p-2 w-48 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                            </div>
                            <fieldset>
                                <button type='button' onClick={handleAddProductButton}>Adicionar Produto</button>
                            </fieldset>
                            {addProduct === true ? <fieldset className='flex flex-row w-full gap-3 justify-center items-center'>
                                <fieldset className="flex flex-row w-full justify-start items-center gap-3">
                                    <label htmlFor="products" className="text-xl font-medium">Nome:</label>
                                    <Autocomplete id='product-list' options={productData} getOptionLabel={item => item.name} onChange={(event: any, newValue: Product | null) => { setSelect(newValue) }} fullWidth renderInput={(params) => <TextField {...params} className="w-full" label="Produtos" />} />
                                </fieldset>
                                <fieldset className="flex flex-row w-1/3 justify-start items-center gap-3">
                                    <label className="text-xl font-medium">Quantidade:</label>
                                    <input type="number" onChange={e => setQuantityItem(Number(e.target.value))} name="quantity" id="quantity" className='p-2 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                                <div>
                                    <button type="button" onClick={handleAddProductList} className="flex justify-end items-start border bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white gap-2">
                                        <Plus size={24} weight='bold' color="#FFF" /> {" Adicionar"}
                                    </button>
                                </div>
                            </fieldset> : null}
                            <div className="w-full h-64 my-4 rounded-lg border overflow-auto border-black">
                                <table className="w-full h-auto border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="border-r-2 border-t-2 border-l-2 border-b-2 sticky top-0 bg-white  border-black w-1/6">Nome:</th>
                                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/6">Quantidade:</th>
                                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/6">Tipo:</th>
                                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/6">Valor Unitário:</th>
                                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/6">Valor Total:</th>
                                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/12">Apagar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="h-full w-full">
                                        {listProducts.length > 0 ? listProducts.map((item) => {
                                            return (
                                                <tr key={item.id} className="h-12 w-full text-center">
                                                    <td className="w-1/6 border-b border-r border-l border-black">{item.name}</td>
                                                    <td className="w-1/6 border-b border-r border-black">{item.quantity}</td>
                                                    <td className="w-1/6 border-b border-r border-black">{item.type === 0 ? <span>Un.</span> : <span>KG</span>}</td>
                                                    <td className="w-1/6 border-b border-r border-black">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(item.value))}</td>
                                                    <td className="w-1/6 border-b border-r border-black">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(item.totalValue))}</td>
                                                    <td className='w-1/12 border-b border-r border-black'></td>
                                                </tr>
                                            )
                                        }) : <tr className="text-center font-semibold text-2xl my-10"><td colSpan={6} rowSpan={1}> Não há produtos.</td></tr>}
                                    </tbody>
                                </table>
                            </div>number
                            <fieldset className='flex flex-row justify-start items-center gap-3' >
                                <Checkbox.Root name="hasWarranty" defaultChecked={false} className='h-8 w-8 border border-black flex justify-center items-center rounded-lg' checked={warranty} onCheckedChange={setWarranty}>
                                    <Checkbox.Indicator >
                                        <Check size={24} weight='bold' />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                <label htmlFor="hasWarranty">Possui Garantia?</label>
                            </fieldset>
                            {warranty === true ? <fieldset className='flex flex-row justify-start items-center gap-3'>
                                <label htmlFor="warranty" >Quando expira a garantia?</label>
                                <input type="date" name="warranty" id="warranty" min={today} className='border border-black rounded-lg p-2 bg-gray-200' />
                            </fieldset> : null}
                            <fieldset>
                                <span className='text-xl font-semibold leading-tight'>Método de Pagamento:</span>
                                <RadioMethod onValueChange={setMethod} />
                            </fieldset>
                            <div className='flex flex-row justify-start gap-3 items-center'>
                                <fieldset>
                                    <label htmlFor="discount">Desconto:</label>
                                    {/* <input type="number" name="discount" id="discount" onChange={(e) => setDiscount(Number(e.target.value))} className='p-2 rounded-lg mt-2 bg-gray-200 text-black'/> */}
                                    <CurrencyFormat prefix='R$'  name="discount" decimalSeparator=',' defaultValue={0} onChange={(e:ChangeEvent<HTMLInputElement>) => discountConverter(e.target.value)} decimalScale={2} placeholder='R$0,00' className='p-2 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="value">Valor:</label>
                                    <input type="text" readOnly name="value" id="value" prefix='R$' className='p-2 rounded-lg mt-2 bg-gray-200 text-black' value={new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value - discount)} />
                                </fieldset>
                                <fieldset className='flex flex-row justify-start items-center gap-3'>
                                    <Checkbox.Root name="paid" id='paid' defaultChecked={false} checked={paid} onCheckedChange={setPaid} className='h-8 w-8 border border-black flex justify-center items-center rounded-lg'>
                                        <Checkbox.Indicator >
                                            <Check size={24} weight='bold' />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                    <label htmlFor="paid">Foi Pago?</label>
                                </fieldset>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button type="submit" className='flex flex-row mt-8 text-white rounded-lg w-40 h-16 bg-blue-600 justify-evenly items-center'>
                                    <ShoppingCart size={24} color="#FFF" weight="fill" />
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}