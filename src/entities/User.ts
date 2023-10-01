import { Ticket } from "./Ticket";
export type User = {
    name: string;
    id: string;
    tickets?: Ticket[]
}