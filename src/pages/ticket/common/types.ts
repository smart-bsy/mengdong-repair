export type Ticket = {
  id: string;
  department: string;
  owner: string;
  createTime: number;
  involvedStation: string;
  reason: string;
  opinion: string;
};
export type SubmitTicket = Ticket & {
  status: string;
};
export type Process = {
  id: number;
  principal: User;
  status: number;
  result: number;
};
export type OperationLog = {
  id: number;
  content: string;
};
export type User = {
  id: number;
  name: string;
  role: string;
};
export type TicketDetail = {
  ticket: Ticket;
  user: User;
  processes: Process[];
};
