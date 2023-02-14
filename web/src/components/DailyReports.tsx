import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="h-2/4 w-3/4 bg-white">
            <table className="block ">
                <thead className="block">
                    <tr>
                        <th className="inline-block">Vendedor</th>
                        <th className="inline-block">Cliente</th>
                        <th className="inline-block">Hora</th>
                        <th className="inline-block">Valor</th>
                        <th className="inline-block">Pagou?</th>
                    </tr>
                </thead>
                <tbody className="block h-full overflow-y-auto">
                    {data.map((item) => {
                        return <RowsDailyReports key={item.id} username={getUsername(item.userId)} client={item.client} createdAt={item.createdAt} paid={item.paid} value={item.value} />
                    })}
                </tbody>
            </table>
        </div>
    );
}
