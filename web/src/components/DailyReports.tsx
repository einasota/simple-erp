import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { TableRow } from "./TableRow";

type Daily = {
    userId: string;
    client: string;
    value: number;
    createdAt: string;
    paid: boolean;
};

interface Username {
    id: string,
    name: string
}
    

export function DailyReports() {
    const [dailyData, setDailyData] = useState<Array<Daily>>([]);
    const [username,setUsername ] = useState<Array<Username>>()
    async function getData() {
        const daily = await api.get("/daily-report");
        const usernames = await api.get('/usernames')
        setDailyData(daily.data);
        setUsername(usernames.data.usernames)
    }
    function getUsername(id:string){
        const name = username!.find((item) => {
            if(item.id === id){
                return item
            }
        })
        
        return `${name!.name}`
    }
    useEffect(() => {
        getData();
    }, []);

    

    return (
        <table className="w-3/4 h-2/4 overflow-y-auto border border-zinc-800 text-center bg-white">
            <tr className="border border-zinc-700">
                <th className="border border-zinc-700">Vendedor</th>
                <th className="border border-zinc-700">Cliente</th>
                <th className="border border-zinc-700">Valor</th>
                <th className="border border-zinc-700">Hora</th>
                <th className="border border-zinc-700">Pago?</th>
            </tr>
            {dailyData.map((item, i) => {
                return (
                    <TableRow key={i} username={getUsername(item.userId)} client={item.client} createdAt={item.createdAt} paid={item.paid} value={item.value} />
                );
            })}
        </table>
    );
}
