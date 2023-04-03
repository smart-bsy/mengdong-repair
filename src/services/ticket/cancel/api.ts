import type { Ticket, TicketDetail } from '@/pages/ticket/common/types';
import { request } from 'umi';

export async function requestQueryTicketCancelList(
  params: {
    process: number;
    submit: string;
    startDate?: number;
    endDate?: number;
    place?: string;
  },
  options?: Record<string, any>,
) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/cancel', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function requestExecutingTicketApplyList(options?: Record<string, any>) {
  return request<{ code: number; message: string; data: Ticket[] }>(
    '/api/ticket/cancel/apply/executing',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function requestCreateTicket(body: Ticket, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket/cancel/', {
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
    `/api/ticket/cancel/${params.ticketId}`,
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
    `/api/ticket/cancel/detail/${params.ticketId}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function requestSaveTicket(body: Ticket, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: TicketDetail }>(`/api/ticket/cancel`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function requestSubmitTicket(id: number, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: TicketDetail }>(
    `/api/ticket/cancel/submit/${id}`,
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

export async function requestDeleteTicket(id: number, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: boolean }>(`/api/ticket/cancel/${id}`, {
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
    `/api/ticket/cancel/processing`,
    {
      method: 'GET',
      params,
      ...(options || {}),
    },
  );
}
