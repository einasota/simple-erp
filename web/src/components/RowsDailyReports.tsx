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
        <tr>
            <td>{username}</td>
            <td>{client}</td>
            <td>{getHour(createdAt)}</td>
            <td>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)}</td>
            <td>{paid === true ? <span className="text-green-600">Sim</span> : <span className="text-red-600">Não</span>}</td>
        </tr>
    )
}