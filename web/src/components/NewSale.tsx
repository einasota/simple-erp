import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, Package, Phone, ShoppingCart, X } from 'phosphor-react';
import { api } from '../lib/api';
import { RadioMethod } from './RadioMethod';
import CurrencyFormat from 'react-currency-format';
import dayjs from 'dayjs';
import { RadioGroupContextValue } from '@radix-ui/react-radio-group';
import { ProductsList } from './ProductsList';

type Product = {
    id: string,
    name: string,
    value: number,
    type: number
}

export function NewSale() {
    const [paid, setPaid] = useState<Checkbox.CheckedState>(false)
    const [warranty, setWarranty] = useState<Checkbox.CheckedState>(false)
    const [method, setMethod] = useState<string>()
    const [client, setClient] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [dialog1, setDialog1] = useState(false)
    const [dialog2, setDialog2] = useState(false)

    const today = dayjs(new Date()).startOf('D').format('YYYY/MM/DD').toString()

    console.log(method, client, phone)
    async function handleSubmit() {

    }
    useEffect(() => {
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
                <Dialog.Content className='h-5/6  w-4/6 p-10 flex flex-col bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex flex-row justify-between items-center gap-2'>
                        <Dialog.Title className='flex flex-row gap-1 text-4xl font-semibold justify-center items-center mb-6'><Package size={36} color="#0f0f0f" /> Nova Venda</Dialog.Title>
                        <Dialog.Close className='flex justify-center items-center'>
                            <button onClick={() => setDialog1(false)}>
                                <X size={24} color="#0f0f0f" />
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
                                <ProductsList open={dialog2} onOpenChange={setDialog2} openModal={() => setDialog2(true)} closeModal={() => setDialog2(false)}/>
                            </fieldset>
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
                                    <CurrencyFormat prefix='R$' name="discount" decimalSeparator=',' decimalScale={2} placeholder='R$0,00' className='p-2 rounded-lg mt-2 bg-gray-200 text-black placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900' />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="value">Valor:</label>
                                    <input type="number" name="value" id="value" prefix='R$' className='p-2 rounded-lg mt-2 bg-gray-200 text-black' />
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