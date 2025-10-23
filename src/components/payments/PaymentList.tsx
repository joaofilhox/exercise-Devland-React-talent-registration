import { useState, useEffect } from 'react';
import type { Payment } from '../../types/payment';
import { paymentService } from '../../services/paymentService';
import styles from './PaymentList.module.css';

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
        if (!confirm('Tem certeza que deseja excluir este pagamento?')) return;
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

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Carregando...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Lista de Pagamentos</h2>
                <button className={styles.refreshBtn} onClick={loadPayments}>
                    🔄 Atualizar
                </button>
            </div>

            {payments.length === 0 ? (
                <p className={styles.empty}>Nenhum pagamento cadastrado</p>
            ) : (
                <table className={styles.table}>
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
                                <td className={styles.date}>
                                    {payment.month.toString().padStart(2, '0')}/{payment.year}
                                </td>
                                <td className={styles.amount}>
                                    R$ {payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(payment.id)}
                                    >
                                        🗑️ Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
