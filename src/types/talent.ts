export interface Talent {
    id: string;
    name: string;
    cnpj: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export interface CreateTalentDto {
    name: string;
    cnpj: string;
    status: 'ACTIVE' | 'INACTIVE';
}
