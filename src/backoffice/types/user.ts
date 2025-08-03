type Pays = {
    id: number;
    nom: string;
    code: string;
    flag: string;
    createdAt: string;
    updatedAt: string;
};

type User = {
    id: number;
    nom: string;
    prenom: string;
    role: string;
    email: string;
    paysId: number;
    createdAt: string;
    updatedAt: string;
    pays: Pays;
};
 export type { User, Pays };