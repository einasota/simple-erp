import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { RowsDailyReports } from "./RowsDailyReports";

type Data = {
    id: string,
    userId: string,
    client: string,
    createdAt: string,
    value: number,
    paid: boolean
}

interface Username {
    id: string;
    name: string;
}

export function DailyReports() {
    const [data, setData] = useState<Array<Data>>([])
    const [username, setUsername] = useState<Array<Username>>();

    async function getData() {
        const daily = await api.get("/daily-report");
        const usernames = await api.get("/usernames");
        setData(daily.data)
        setUsername(usernames.data.usernames);
    }

    function getUsername(id: string) {
        const name = username!.find((item) => {
            if (item.id === id) {
                return item;
            }
        });

        return `${name!.name}`;
    }
    console.log(data.length)
    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="h-2/4 w-3/4 bg-white overflow-auto">
            <table className="w-full h-auto border-separate border-spacing-0">
                <thead className="w-full h-12 bg-white">
                    <tr className="w-full h-12">
                        <th className="border-r-2 border-t-2 border-l-2 border-b-2 sticky top-0 bg-white  border-black w-1/5">Vendedor</th>
                        <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Cliente</th>
                        <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Hora</th>
                        <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Valor</th>
                        <th className="border-r-2 border-t-2 border-b-2 sticky top-0 bg-white border-black w-1/5">Pagou?</th>
                    </tr>
                </thead>
                <tbody className="h-full w-full">
                    {data.length !== 0 ? data.map((item) => {
                        return <RowsDailyReports key={item.id} username={getUsername(item.userId)} client={item.client} createdAt={item.createdAt} paid={item.paid} value={item.value} />
                    }): <tr>
                            <td colSpan={5} />
                        </tr>}
                </tbody>
            </table>
        </div>
    );
}
