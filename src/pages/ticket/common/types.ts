export type Ticket = {
  id: number;
  code: string;
  office: string;
  applicant: string;
  createTime: number;
  involvedStation: string;
  reason: string;
  opinion: string;
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

export const getNullTicket = (): Ticket => {
  return {
    id: 0,
    code: '',
    office: '',
    applicant: '',
    createTime: 0,
    involvedStation: '',
    reason: '',
    opinion: '',
    status: '',
  };
};
