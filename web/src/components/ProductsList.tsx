import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlass, Package, Plus, X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";
import { Autocomplete, TextField } from "@mui/material";

interface Props extends Dialog.DialogProps {
    openModal: React.MouseEventHandler<HTMLButtonElement>
    closeModal: React.MouseEventHandler<HTMLButtonElement>
    setValue?: number
}

interface List {
    id: string | undefined,
    name: string | undefined,
    quantity?: string | undefined,
    type: number | undefined,
    value: number | undefined,
    totalValue?: string | undefined
}
type ProductsData = {
    id: string,
    name: string,
    type: number,
    value: number,
}


export function ProductsList({ openModal, closeModal, setValue, ...rest }: Props) {
    const [productData, setProductsData] = useState<Array<ProductsData>>([])
    const [listItem, setListItem] = useState<Array<ProductsData>>([])
    const [quantityItem, setQuantityItem] = useState<string>()
    const [listProducts, setListProducts] = useState<Array<ProductsData>>([])
    const [select, setSelect] = useState<ProductsData | null>()
    const [open, setOpen] = useState(false)
    const [valueTotal, setValueTotal] = useState(0)
    async function getData() {
        const Product = await api.get('/products')
        setProductsData(Product.data)
    }
    function handleList(event: FormEvent) {
        event.preventDefault()
        setOpen(false)
        setListProducts(data => [...data, select])
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="flex flex-row justify-between items-center ">
                <span className="font-semibold text-xl">Produtos</span>
                <Dialog.Root {...rest} open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger>
                        <button type="button" onClick={openModal} className="flex justify-end items-start border bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white gap-2">
                            <Plus size={24} color='#FFF' weight="bold" /> {" Adicionar"}
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal >
                        <Dialog.Overlay className='w-screen h-screen fixed inset-0 bg-black/50' />
                        <Dialog.Content className="h-2/6  w-2/6 p-10 flex flex-col bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex flex-row justify-between items-center mb-6">
                                <Dialog.Title className="flex flex-row items-center justify-center gap-2 text-3xl font-semibold"><Package size={32} weight='bold' color="#0f0f0f" />Produtos</Dialog.Title>
                                <Dialog.Close>
                                    <button onClick={closeModal}>
                                        <X size={32} weight='bold' color='#000' />
                                    </button>
                                </Dialog.Close>
                            </div>
                            <form onSubmit={handleList}>
                                <div className="flex flex-col w-full h-full items-start justify-start gap-3">
                                    <fieldset className="flex flex-row w-full justify-start items-center gap-3">
                                        <label htmlFor="products" className="text-xl font-medium">Nome:</label>
                                        <Autocomplete id='product-list' options={productData} getOptionLabel={item => item.name} onChange={(event: any, newValue: ProductsData | null) => { setSelect(newValue) }} fullWidth renderInput={(params) => <TextField {...params} className="w-full" label="Produtos" />} />
                                    </fieldset>
                                    <fieldset className="flex flex-row justify-start items-center gap-3">
                                        <label className="text-xl font-medium">Quantidade:</label>
                                        <input type="text" onChange={e => setQuantityItem(e.target.value)} name="quantity" id="quantity" className='p-2 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                    </fieldset>
                                    <div>
                                        <button type="submit" className="flex justify-end items-start border bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white gap-2">
                                            <Plus size={24} weight='bold' color="#FFF" /> {" Adicionar"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <div className="w-full h-64 my-4 rounded-lg border overflow-auto border-black">
                <table className="w-full h-auto border-separate border-spacing-0">
                    <thead>
                        <tr>
                            <th className="border-r-2 border-t-2 border-l-2 border-b-2 sticky top-0 bg-white  border-black w-1/5">Nome:</th>
                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Quantidade:</th>
                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Tipo:</th>
                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Valor Unitário:</th>
                            <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Valor Total:</th>
                        </tr>
                    </thead>
                    <tbody className="h-full w-full">
                    {listProducts.length > 0 ? listProducts.map((item) => {
                            const product = productData.find(unit => unit.id === item.id)
                            const total = product!.value * Number(item.quantity)
                            return (<div>
                                        <tr className="h-12 w-full text-center">
                                            <td className="w-1/5 border-b border-r border-l border-black">{product!.name}</td>
                                            <td className="w-1/5 border-b border-r border-black">{item.quantity}</td>
                                            <td className="w-1/5 border-b border-r border-black">{product!.type === 0 ? <span>KG</span> : <span>Un.</span>}</td>
                                            <td className="w-1/5 border-b border-r border-black">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(product!.value)}</td>
                                            <td className="w-1/5 border-b border-r border-black">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(total)}</td>
                                        </tr>
                                </div>
                            )}) : <tr className="text-center font-semibold text-2xl"><td colSpan={5}> Não há produtos.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}