import type { Talent, CreateTalentDto } from '../types/talent';
import { api } from '../utils/api';

export const talentService = {
    async getAll() {
        const { data } = await api.get<Talent[]>('/talents');
        return data;
    },

    async getById(id: string) {
        const { data } = await api.get<Talent>(`/talents/${id}`);
        return data;
    },

    async create(talent: CreateTalentDto) {
        const { data } = await api.post<Talent>('/talents', talent);
        return data;
    },

    async delete(id: string) {
        await api.delete(`/talents/${id}`);
    },
};
