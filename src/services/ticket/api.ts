import type { Activity, ApproveResut, Ticket } from '@/pages/ticket/typings';
import { request } from 'umi';

export async function requestQueryFinishedTickets(options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/finished', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function requestQueryProcessTickets(options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/processing', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function requestQueryApproveTickets(options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/approve', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function requestQueryTicketProgress(
  params: { ticketId: string },
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data: Activity[] }>('/api/ticket/progress', {
    method: 'GET',
    ...(options || {}),
    params,
  });
}

export async function requestPostApproveResult(body: ApproveResut) {
  return request<{ code: number; message: string; data: string }>('/api/ticket/approve', {
    method: 'POST',
    data: body,
  });
}

export async function requestPostTicket(body: Ticket) {
  return request<{ code: number; message: string; data: string }>('/api/ticket', {
    method: 'POST',
    data: body,
  });
}
