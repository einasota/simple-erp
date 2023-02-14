import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupProps } from '@radix-ui/react-radio-group'
import { Circle, CreditCard, Money, Wallet } from 'phosphor-react'

interface Props extends RadioGroupProps {
    method?: Function
}
export function RadioMethod({...rest}:Props){
    return (
        <RadioGroup.Root className='flex flex-row justify-start items-center gap-3 mt-0 pt-0' {...rest}>
            <div className='flex flex-row justify-center items-baseline gap-2'>
                <RadioGroup.Item value='0' id='dinheiro' className='h-6 w-6 flex justify-center items-center border border-black rounded-full'>
                    <RadioGroup.Indicator>
                        <Circle size={16} color="#0f0f0f" weight='fill' />
                    </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label htmlFor="dinheiro" className='flex flex-row justify-center items-center gap-2'>
                    <Money size={24} color="#0f0f0f" />
                    Dinheiro
                </label>
            </div>
            <div className='flex flex-row justify-center items-baseline gap-2'>
                <RadioGroup.Item value='1' id='pix' className='h-6 w-6 flex justify-center items-center border border-black rounded-full'>
                    <RadioGroup.Indicator>
                        <Circle size={16} color="#0f0f0f" weight='fill' />
                    </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label htmlFor="pix" className='flex flex-row justify-center items-center gap-2'>
                    <Wallet size={24} color="#0f0f0f" />
                    Pix
                </label>
            </div>
            <div className='flex flex-row justify-center items-baseline gap-2'>
                <RadioGroup.Item value='2' className='h-6 w-6 flex justify-center items-center border border-black rounded-full'>
                    <RadioGroup.Indicator>
                        <Circle size={16} color="#0f0f0f" weight='fill' />
                    </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label htmlFor="" className='flex flex-row justify-center items-center gap-2'>
                    <CreditCard size={24} color="#0f0f0f" />
                    Cartão de Débito
                </label>
            </div>
            <div className='flex flex-row justify-center items-baseline gap-2'>
                <RadioGroup.Item value='3' className='h-6 w-6 flex justify-center items-center border border-black rounded-full'>
                    <RadioGroup.Indicator>
                        <Circle size={16} color="#0f0f0f" weight='fill' />
                    </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label htmlFor="" className='flex flex-row justify-center items-center gap-2' >
                    <CreditCard size={24} color="#0f0f0f" />
                    Cartão de Crédito
                </label>
            </div>
        </RadioGroup.Root>
    )
}
