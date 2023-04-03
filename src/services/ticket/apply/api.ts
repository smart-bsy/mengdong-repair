import type { Ticket, TicketDetail } from '@/pages/ticket/common/types';
import { request } from 'umi';

export async function requestQueryTicketList(
  params: {
    process: number;
    submit: string;
    startDate?: number;
    endDate?: number;
    place?: string;
  },
  options?: Record<string, any>,
) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/demand', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function requestCreateTicket(body: Ticket, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/demand', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function requestGetTicketById(
  params: { ticketId: number },
  options?: Record<string, any>,
) {
  return request<{ code: number; message: string; data: Ticket }>(
    `/api/ticket/demand/${params.ticketId}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function requestTicketDetail(
  params: { ticketId: number },
  options?: Record<string, any>,
) {
  return request<{ code: number; message: string; data: TicketDetail }>(
    `/api/ticket/demand/detail/${params.ticketId}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function requestSaveTicket(body: Ticket, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: TicketDetail }>(`/api/ticket/demand`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function requestSubmitTicket(id: number, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: TicketDetail }>(
    `/api/ticket/demand/submit/${id}`,
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

export async function requestDeleteTicket(id: number, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: boolean }>(`/api/ticket/demand/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**
 * 查询流程中的票务
 * @param id
 * @param options
 * @returns
 */
export async function requestGetProcessingTicket(
  params: {
    startDate?: number;
    endDate?: number;
    place?: string;
  },
  options?: Record<string, any>,
) {
  return request<{ code: number; message: string; data: Ticket[] }>(
    `/api/ticket/demand/processing`,
    {
      method: 'GET',
      params,
      ...(options || {}),
    },
  );
}
