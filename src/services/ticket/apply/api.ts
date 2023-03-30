import type { Ticket } from '@/pages/ticket/common/types';
import { request } from 'umi';

export async function requestQueryTicketList(
  params: {
    submit: string;
    startDate?: number;
    endDate?: number;
    place?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/demand', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function requestCreateTicket(body: Ticket, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/demand', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function requestGetTicketById(
  params: { ticketId: number },
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data: Ticket }>(
    `/api/ticket/demand/${params.ticketId}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
