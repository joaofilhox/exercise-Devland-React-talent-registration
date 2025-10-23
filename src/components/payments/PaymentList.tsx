import { useState, useEffect } from 'react';
import type { Payment } from '../../types/payment';
import { paymentService } from '../../services/paymentService';

export default function PaymentList() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    const loadPayments = async () => {
        try {
            setLoading(true);
            const data = await paymentService.getAll();
            setPayments(data);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao carregar');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir?')) return;
        try {
            await paymentService.delete(id);
            loadPayments();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao excluir');
        }
    };

    useEffect(() => {
        loadPayments();
    }, []);

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <h2>Lista de Pagamentos</h2>
            <button onClick={loadPayments}>Atualizar</button>

            {payments.length === 0 ? (
                <p>Nenhum pagamento cadastrado</p>
            ) : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Talento</th>
                            <th>Mês/Ano</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.talent?.name || 'N/A'}</td>
                                <td>{payment.month}/{payment.year}</td>
                                <td>R$ {payment.amount}</td>
                                <td>
                                    <button onClick={() => handleDelete(payment.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
