import type { OperationLog } from '@/pages/ticket/common/types';
import { request } from 'umi';

export async function requestGetOperationLogs(params: { ticketId: number }) {
  return request<{ code: number; message: string; data: OperationLog[] }>(
    `/api/log/${params.ticketId}`,
    {
      method: 'GET',
    },
  );
}
