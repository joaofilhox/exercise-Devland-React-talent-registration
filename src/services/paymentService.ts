import type { Payment, CreatePaymentDto } from '../types/payment';
import { api } from '../utils/api';

export const paymentService = {
    async getAll() {
        const { data } = await api.get<Payment[]>('/payments');
        return data;
    },

    async getById(id: string) {
        const { data } = await api.get<Payment>(`/payments/${id}`);
        return data;
    },

    async create(payment: CreatePaymentDto) {
        const { data } = await api.post<Payment>('/payments', payment);
        return data;
    },

    async delete(id: string) {
        await api.delete(`/payments/${id}`);
    },
};
