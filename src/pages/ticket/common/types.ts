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
  name: string;
  position: number;
};
export type OperationLog = {
  id: number;
  ticketId: number;
  code: string;
  user: string;
  type: string;
  createTime: number;
  ip: string;
};
export type User = {
  id: number;
  name: string;
  role: string;
};
export type TicketDetail = {
  ticket: Ticket;
  cur: number;
  process: Process[];
};

export type SignDetail = {
  ticketId: number;
  node: number;
  signer: string;
  opinion: string;
  status: number;
};

export type ProcessNode = {
  signer: string;
  signTime: number;
  signType: string;
  opinion: string;
  node: string;
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

export const processNodes = {
  apply: 0,
  firstVerify: 1,
  directorApproval: 2,
  energyApproval: 3,
  scheduleApproval: 4,
  scheduleReceive: 5,
  executing: 6,
  end: 7,
};

export type CloseModal = () => void;
