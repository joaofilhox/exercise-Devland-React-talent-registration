import { useState, useEffect } from 'react';
import type { CreatePaymentDto } from '../../types/payment';
import type { Talent } from '../../types/talent';
import { paymentService } from '../../services/paymentService';
import { talentService } from '../../services/talentService';

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
        <div>
            <h2>Cadastrar Pagamento</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Talento:
                        <select
                            value={formData.talentId}
                            onChange={(e) => setFormData({ ...formData, talentId: e.target.value })}
                            required
                        >
                            <option value="">Selecione</option>
                            {talents.map((talent) => (
                                <option key={talent.id} value={talent.id}>
                                    {talent.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Mês:
                        <input
                            type="number"
                            min="1"
                            max="12"
                            value={formData.month}
                            onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Ano:
                        <input
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Valor:
                        <input
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
