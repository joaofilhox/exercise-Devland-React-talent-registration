import type { Talent } from './talent';

export interface Payment {
    id: string;
    talentId: string;
    talent: Talent;
    month: number;
    year: number;
    amount: number;
}

export interface CreatePaymentDto {
    talentId: string;
    month: number;
    year: number;
    amount: number;
}
