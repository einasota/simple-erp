import { Package, Wrench } from "phosphor-react";
import { DailyReports } from "./DailyReports";
import { NewSale } from "./NewSale";
import { SidebarMenu } from "./SidebarMenu";

export function Home() {
    return (
        <div className="w-screen h-screen flex flex-col justify-evenly items-center">
            {/* <SidebarMenu /> */}
            <div className="w-3/4 flex justify-between items-center">
                <NewSale />
                <button className="h-16 w-48 flex flex-row justify-center gap-3 items-center rounded-md bg-white border-2 border-white hover:border-zinc-200 hover:bg-zinc-300">
                    <Wrench size={24} color="#0f0f0f" />
                    Novo Serviço
                </button>
            </div>
            {/* <DailyReports /> */}
            <div className="h-2/4 w-3/4 bg-white"></div>
        </div>
    );
}
