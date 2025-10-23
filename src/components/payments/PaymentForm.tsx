import { useState, useEffect } from 'react';
import type { CreatePaymentDto } from '../../types/payment';
import type { Talent } from '../../types/talent';
import { paymentService } from '../../services/paymentService';
import { talentService } from '../../services/talentService';
import styles from './PaymentForm.module.css';

interface PaymentFormProps {
    onSuccess?: () => void;
}

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [formData, setFormData] = useState<CreatePaymentDto>({
        talentId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        amount: 0,
    });

    useEffect(() => {
        talentService.getAll().then(setTalents).catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await paymentService.create(formData);
            setFormData({
                talentId: '',
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                amount: 0,
            });
            onSuccess?.();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao cadastrar');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Cadastrar Pagamento</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="talentId">
                        Talento
                    </label>
                    <select
                        id="talentId"
                        className={styles.select}
                        value={formData.talentId}
                        onChange={(e) => setFormData({ ...formData, talentId: e.target.value })}
                        required
                    >
                        <option value="">Selecione um talento</option>
                        {talents.map((talent) => (
                            <option key={talent.id} value={talent.id}>
                                {talent.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="month">
                        Mês
                    </label>
                    <input
                        id="month"
                        type="number"
                        className={styles.input}
                        min="1"
                        max="12"
                        value={formData.month}
                        onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                        placeholder="1-12"
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="year">
                        Ano
                    </label>
                    <input
                        id="year"
                        type="number"
                        className={styles.input}
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        placeholder="2024"
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="amount">
                        Valor (R$)
                    </label>
                    <input
                        id="amount"
                        type="number"
                        className={styles.input}
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                        placeholder="0.00"
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Cadastrar Pagamento
                </button>
            </form>
        </div>
    );
}
