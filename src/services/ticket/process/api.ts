import type { ProcessNode, SignDetail } from '@/pages/ticket/common/types';
import { request } from 'umi';

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

export async function requestSignEnd(params: { ticketId: number }) {
  return request<{ code: number; message: string; data: ProcessNode[] }>(
    `/api/process/sign/end/${params.ticketId}`,
    {
      method: 'PUT',
    },
  );
}
