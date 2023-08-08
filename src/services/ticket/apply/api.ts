import type {
  OperationLog,
  ProcessNode,
  SignDetail,
  Ticket,
  TicketDetail,
} from '@/pages/ticket/common/types';
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
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function requestCreateTicket(body: Ticket, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: Ticket[] }>('/api/ticket', {
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
    `/api/ticket/${params.ticketId}`,
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
    `/api/ticket/detail/${params.ticketId}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function requestSaveTicket(body: Ticket, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: TicketDetail }>(`/api/ticket`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function requestSubmitTicket(id: number, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: TicketDetail }>(
    `/api/ticket/submit/${id}`,
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

export async function requestDeleteTicket(id: number, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: boolean }>(`/api/ticket/${id}`, {
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
  return request<{ code: number; message: string; data: Ticket[] }>(`/api/ticket/processing`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function requestSignSave(body: SignDetail, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: boolean }>('/api/process/sign', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function requestSignSubmit(body: SignDetail, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: boolean }>('/api/process/sign', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function requestSignBack(body: SignDetail, options?: Record<string, any>) {
  return request<{ code: number; message: string; data: boolean }>('/api/process/sign/back', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function requestGetSignDetail(params: { ticketId: number; node: number }) {
  return request<{ code: number; message: string; data: SignDetail }>(
    `/api/process/detail/${params.ticketId}/${params.node}`,
    {
      method: 'GET',
    },
  );
}

export async function requestGetProcessNodeDetailList(params: { ticketId: number; node: number }) {
  return request<{ code: number; message: string; data: ProcessNode[] }>(
    `/api/process/detail/list/${params.ticketId}/${params.node}`,
    {
      method: 'GET',
    },
  );
}

export async function requestGetOperationLogs(params: { ticketId: number }) {
  return request<{ code: number; message: string; data: OperationLog[] }>(
    `/api/log/${params.ticketId}`,
    {
      method: 'GET',
    },
  );
}
