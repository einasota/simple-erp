import dayjs from "dayjs";

interface TableProps {
    username: string;
    client: string;
    value: number;
    createdAt: string;
    paid: boolean;
}

export function TableRow({username, client, value, createdAt, paid}:TableProps) {
    function getHour(day: string){
        const hour = dayjs(day).format('HH:mm')
        // console.log(hour)
        return (
            <span>{hour}</span>
        )
    }
    return (
        <tr className="border border-zinc-700">
            <td className="border border-zinc-700">{username}</td>
            <td className="border border-zinc-700">{client}</td>
            <td className="border border-zinc-700">{new Intl.NumberFormat('pt-br',{style:'currency', currency:'BRL'}).format(value)}</td>
            <td className="border border-zinc-700">{getHour(createdAt)}</td>
            <td className="border border-zinc-700">{paid === false ? <span className="text-red-600">Não</span> : <span className="text-green-600">Sim</span> }</td>
        </tr>
    )
}