import { User } from './User';

export type Ticket = {
  id: string;
  title: string;
  assigneeId?: string | null;
  assignee?: User;
};
