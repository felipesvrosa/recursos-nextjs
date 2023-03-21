import { useEffect, useState } from 'react'
import PaginaExemplo from '../../components/PaginaExemplo'
import Http from '../../utils/http'
import { formatarDataHora } from '../../utils/data'
import { Pedido, PedidoItem } from '../../core/Pedido'

export function getStaticProps() {
    return {
        props: {
            geradoEm: formatarDataHora(new Date),
        },
    }
}

export default function SSGCSR(props) {
    const [pedidos, setPedidos] = useState<Pedido[]>()

    useEffect(() => {
        Http.get('/api/pedidos/abertos').then(setPedidos)
    }, [])

    const itemParaTexto = (i: PedidoItem) => `${i.itemNome} (${i.qtde})`

    function renderizarPedidos() {
        return pedidos?.map((pedido, i) => {
            return (
                <tr key={pedido.id} className={`${i === 0 ? 'bg-gray-900' : 'bg-black'}`}>
                    <td className="p-3">
                        {pedido.clienteNome}
                    </td>
                    <td className="p-3">
                        {formatarDataHora(pedido.data)}
                    </td>
                    <td className="p-3">
                        {pedido.itens.map(itemParaTexto).join(';')}
                    </td>
                </tr>
            )
        }) ?? []
    }

    return (
        <PaginaExemplo titulo={['Integrando', 'SSG & CSR']} urlDoCodigo="/codigo/ssgcsr">
            <div>Gerado em: <span className="font-bold">{props.geradoEm}</span></div>
            <div className="w-full flex justify-center">
                <table className="w-full rounded-lg overflow-hidden mt-5">
                    <thead>
                        <tr className="bg-gray-700 rounded-tl-lg rounded-tr-lg">
                            <th className="py-2">Cliente</th>
                            <th className="py-2">Data</th>
                            <th className="py-2">Itens</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderizarPedidos()}
                    </tbody>
                </table>
            </div>
        </PaginaExemplo>
    )
}
