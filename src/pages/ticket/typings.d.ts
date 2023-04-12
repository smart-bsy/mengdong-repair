export interface Ticket {
  id?: string;
  cancelTicketId?: string;
  code?: string;
  office: string;
  createTime?: string;
  applicant?: string;
  involvedStation: string;
  reason: string;
}

export type ApproveResut = {
  ticketId: string;
  result: boolean;
};

export type Activity = {
  id: string;
  name: string;
};
