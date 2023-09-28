import { User } from './User';

export type Ticket = {
  id: string;
  title: string;
  asigneeId?: string;
  asignee?: User;
};
