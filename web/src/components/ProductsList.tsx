import * as Dialog from "@radix-ui/react-dialog";
import { Package, Plus, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Props extends Dialog.DialogProps {
    openModal: React.MouseEventHandler<HTMLButtonElement>
    closeModal: React.MouseEventHandler<HTMLButtonElement>
}

interface List {

}
interface Products {
    id: string,
    name: string,
    type: number,
    value: number,
}

export function ProductsList({ openModal, closeModal, ...rest }: Props) {
    // const [list, setList] = useState<Array<>>([])
    const [product, setProducts] = useState<Array<Products>>()

    async function getData() {
        const Product = await api.get('/products')
        setProducts(Product.data)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="flex flex-row justify-between items-center ">
                <span>Produtos</span>
                <Dialog.Root {...rest} >
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
                            <div className="flex flex-col w-full h-full items-start justify-start gap-3">
                                <fieldset className="flex flex-row justify-start items-center gap-3">
                                    <label className="text-xl font-medium">Nome:</label>
                                    <input type="text" name="name" id="name" autoComplete="off" className='p-2 w-full rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                                <fieldset className="flex flex-row justify-start items-center gap-3">
                                    <label className="text-xl font-medium">Quantidade:</label>
                                    <input type="number" name="quantity" id="quantity" className='p-2 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                                <div>
                                    <button className="flex justify-end items-start border bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white gap-2">
                                        <Plus size={24} weight='bold' color="#FFF" /> {" Adicionar"}
                                    </button>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <div className="w-full h-64 my-4 rounded-lg border border-black">
                <table className="w-full h-full">
                    <thead>
                        <tr>
                            <th>Nome:</th>
                            <th>Quantidade:</th>
                            <th>Tipo:</th>
                            <th>Valor Unitário:</th>
                            <th>Valor Total:</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}