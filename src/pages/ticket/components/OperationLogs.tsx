import { Card, Table, message } from 'antd';
import type { OperationLog } from '../common/types';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { requestGetOperationLogs } from '@/services/ticket/operationLog/api';

const OperationLogList = (props: { ticketId: number }) => {
  const { ticketId } = props;

  const [operationLogs, setOperationLogs] = useState<OperationLog[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchOperationLogLis = async () => {
    try {
      const result = await requestGetOperationLogs({ ticketId });
      if (result.code == 2000) {
        setOperationLogs(result.data);
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('加载失败');
    }
  };

  useEffect(() => {
    fetchOperationLogLis();
  }, []);

  const operationLogColumns: ColumnsType<OperationLog> = [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime) => {
        return <span>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</span>;
      },
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      key: 'ip',
    },
  ];

  return (
    <>
      {contextHolder}
      <Card>
        <Table columns={operationLogColumns} dataSource={operationLogs} />
      </Card>
    </>
  );
};

export default OperationLogList;
