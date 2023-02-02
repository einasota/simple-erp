export function DailyReports() {
    function test() {
        console.log('teste')
    }
    return (
        <table className="w-3/4 h-2/4 overflow-y-auto border border-zinc-800 text-center">
            <tr className="border border-zinc-700">
                <th>Vendedor</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Hora</th>
                <th>Pago?</th>
            </tr>
            <tr>
                <td>Jhonata</td>
                <td>Cliente</td>
                <td>R$30</td>
                <td>10:30</td>
                <td>Não</td>
            </tr>
        </table>
    )
}