import dayjs from "dayjs";

interface Data {
    id?: string,
    username: string,
    client: string,
    createdAt: string,
    value: number,
    paid: boolean
}

export function RowsDailyReports({ username, client, createdAt, value, paid }: Data) {
    function getHour(day: string) {
        const hour = dayjs(day).format("HH:mm");
        return hour;
    }
    return (
        <tr className="h-12 w-full text-center">
            <td className="w-1/5 border-b border-r border-l border-black">{username}</td>
            <td className="w-1/5 border-b border-r border-black">{client}</td>
            <td className="w-1/5 border-b border-r border-black">{getHour(createdAt)}</td>
            <td className="w-1/5 border-b border-r border-black">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)}</td>
            <td className="w-1/5 border-b border-r border-black">{paid === true ? <span className="text-green-600">Sim</span> : <span className="text-red-600">Não</span>}</td>
        </tr>
    )
}