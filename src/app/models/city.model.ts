export interface Request {
    id: number;
    owner: string;
    title: string;
    description: string;
    special_quest: string;
    equipment: string;
    owner_equipment: string;
    comments: string;
    start_arenda: string;
    end_arenda: string;
    fullname: string;
    post: string;
    tel: string;
    id__room: number;
    status: number;
}

export interface Room {
    id: number;
    title: string;
    max_count: number;
    AR_link: string;
}

export interface Request {
    id: number;
    owner: string;
    title: string;
    description: string;
    count_people: string;
    start_arenda: string;
    end_arenda: string;
}

export interface User {
    fullname: string;
    uuid: number;
    email: string;
    role: string;
    owned_id: string;
}