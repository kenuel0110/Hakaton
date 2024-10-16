export interface Request {
<<<<<<< HEAD
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
    id_room: number;
    status: string;
}
=======
  id: number;
  title: string;
  description: string;
  fullname: string;
  email: string;
  comments: string;
  count_people: number;
  id_room: number;
  owner: string;
  equipment: string;
  owner_equipment: string;
  post: string;
  special_guest: string;
  start_date: string;
  end_date: string;
  status: string;
}

@Injectable({
    providedIn: 'root'
})

export class RequestService {

    private requests: Request[] = [
        {
            id: 1,
            title: "Team Meeting",
            description: "Quarterly team meeting to discuss performance and goals.",
            fullname: "John Doe",
            email: "john.doe@example.com",
            comments: "Please prepare the projector and whiteboard.",
            count_people: 10,
            id_room: 0,
            owner: "John Doe",
            equipment: "Projector, Whiteboard",
            owner_equipment: "Laptop",
            post: "Team Lead",
            special_guest: "Jane Smith",
            start_date: "2024-11-01T09:00:00",
            end_date: "2024-11-01T11:00:00",
            status: "Pending"
        },
        {
          id: 1,
          title: "Team Meeting",
          description: "Quarterly team meeting to discuss performance and goals.",
          fullname: "John Doe",
          email: "john.doe@example.com",
          comments: "Please prepare the projector and whiteboard.",
          count_people: 10,
          id_room: 1,
          owner: "John Doe",
          equipment: "Projector, Whiteboard",
          owner_equipment: "Laptop",
          post: "Team Lead",
          special_guest: "Jane Smith",
          start_date: "2024-11-01T09:00:00",
          end_date: "2024-11-01T11:00:00",
          status: "Approved"
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
>>>>>>> 4cbfe799db639e1cab93fe5dd5974f4f68cd9433
