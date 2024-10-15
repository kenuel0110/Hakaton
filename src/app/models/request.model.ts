import { Injectable } from '@angular/core';

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

@Injectable({
    providedIn: 'root'
})

export class RequestService {

    private requests: Request[] = [
        {
            id: 1,
            owner: '1',
            title: 'title',
            description: 'description',
            special_quest: 'special_quest',
            equipment: 'equipment',
            owner_equipment: 'owner_equipment',
            comments: 'comments',
            start_arenda: 'start_arenda',
            end_arenda: 'end_arenda',
            fullname: 'fullname',
            post: 'post',
            tel: 'tel',
            id__room: 1,
            status: 1,
        },
        {
            id: 2,
            owner: '2',
            title: 'title',
            description: 'description',
            special_quest: 'special_quest',
            equipment: 'equipment',
            owner_equipment: 'owner_equipment',
            comments: 'comments',
            start_arenda: 'start_arenda',
            end_arenda: 'end_arenda',
            fullname: 'fullname',
            post: 'post',
            tel: 'tel',
            id__room: 2,
            status: 2,
        },
    ];

    constructor() { }

    getRooms(): Request[] {
        return this.requests;
      }

    getRequestById(id: number): Request | undefined {
        return this.requests.find(request => request.id === id);
      }
}