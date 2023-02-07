import { DailyReports } from "./DailyReports";



export function Home() {
    

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <button>Nova venda</button>
            <button>Novo Serviço</button>
            <DailyReports />
        </div>
    );
}
