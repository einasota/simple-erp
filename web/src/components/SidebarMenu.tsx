import { CaretRight, HouseLine, Package, SignOut, Storefront, Wrench } from "phosphor-react";
import { useAuth } from "../context/AuthProvider/userAuth";

export function SidebarMenu() {
    const auth = useAuth()
    return (
        <nav className="fixed top-0 left-0 bg-white h-full w-64 py-3 px-4">
            {/* Header */}
            <header className="relative mb-5">
                <div className="flex items-center">
                    <span className="w-10 h-10 text-4xl bg-purple-600 rounded-md text-center text-white">
                        J
                    </span>
                    <div className="pl-2 font-medium text-xl">
                        <span>Jhonata</span>
                    </div>
                </div>
                <CaretRight color="#FFF" className="absolute top-1/2 bg-purple-600 -right-[36px] -translate-y-1/2 w-[40px] h-[40px] p-1 rounded-[50%]" />
            </header>
            {/* Links/Body */}
            <div className="flex flex-col h-[calc(100%_-_64px)] justify-between"> 
                <ul className="">
                    <li>
                        <a href="/home" className="flex flex-row items-center h-14 gap-2 mt-2 text-zinc-700 text-xl hover:bg-zinc-300">
                            <HouseLine size={24} color="#9305ea" />
                            {' Início'}
                        </a>
                    </li>
                    <li>
                        <a href="/home" className="flex flex-row items-center h-14 gap-2 mt-2 text-zinc-700 text-xl hover:bg-zinc-300">
                            <Package size={24} color="#9305ea" />
                            {' Produtos'}
                        </a>
                    </li>
                    <li>
                        <a href="" className="flex flex-row items-center h-14 gap-2 mt-2 text-zinc-700 text-xl hover:bg-zinc-300">
                            <Storefront size={24} color="#9305ea" />
                            {' Vendas'}
                        </a>
                    </li>
                    <li>
                        <a href="" className="flex flex-row items-center h-14 gap-2 mt-2 text-zinc-700 text-xl hover:bg-zinc-300">
                            <Wrench size={24} color="#9305ea" />
                            {' Serviços'}
                        </a>
                    </li>
                </ul>
                <div>
                    <a href="/" onClick={auth.logout} className="flex flex-row items-center h-14 text-zinc-700 text-xl hover:bg-zinc-300" >
                        <SignOut size={24} color="#9305ea" />
                        {" Logout"}
                    </a>
                </div>
            </div>
            {/* Footer */}
        </nav>
    );
}
