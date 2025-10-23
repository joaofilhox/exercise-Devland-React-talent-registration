import { useState } from 'react';
import type { CreateTalentDto } from '../../types/talent';
import { talentService } from '../../services/talentService';

interface TalentFormProps {
    onSuccess?: () => void;
}

export default function TalentForm({ onSuccess }: TalentFormProps) {
    const [formData, setFormData] = useState<CreateTalentDto>({
        name: '',
        cnpj: '',
        status: 'ACTIVE',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await talentService.create(formData);
            setFormData({ name: '', cnpj: '', status: 'ACTIVE' });
            onSuccess?.();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao cadastrar');
        }
    };

    return (
        <div>
            <h2>Cadastrar Talento</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        CNPJ:
                        <input
                            type="text"
                            value={formData.cnpj}
                            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Status:
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
