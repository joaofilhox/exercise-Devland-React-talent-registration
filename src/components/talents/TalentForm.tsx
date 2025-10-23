import { useState } from 'react';
import type { CreateTalentDto } from '../../types/talent';
import { talentService } from '../../services/talentService';
import styles from './TalentForm.module.css';

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
        <div className={styles.container}>
            <h2 className={styles.title}>Cadastrar Talento</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        className={styles.input}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Digite o nome da empresa"
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cnpj">
                        CNPJ
                    </label>
                    <input
                        id="cnpj"
                        type="text"
                        className={styles.input}
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        placeholder="00.000.000/0000-00"
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        className={styles.select}
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
                    >
                        <option value="ACTIVE">Ativo</option>
                        <option value="INACTIVE">Inativo</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>
                    Cadastrar Talento
                </button>
            </form>
        </div>
    );
}
