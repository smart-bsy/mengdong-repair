import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Grid, message, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Ticket } from '../typings';
import dayjs from 'dayjs';
import { requestPostApproveResult, requestQueryApproveTickets } from '@/services/ticket/api';

const TicketApply: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const queryApproveTickets = async () => {
    try {
      const result = await requestQueryApproveTickets();
      console.log(result);
      if (result.code == 2000) {
        setTicketList(result.data);
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      messageApi.error('加载出错');
      console.log(error);
    }
  };

  const approveTicket = async (ticketId: string, result: boolean) => {
    const res = await requestPostApproveResult({ ticketId, result });
    try {
      if (res.code == 2000) {
        messageApi.success('操作成功');
        await queryApproveTickets();
      } else {
        messageApi.error(res.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('操作失败');
    }
  };

  const processingTicketColumns: ColumnsType<Ticket> = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '申请处室',
      dataIndex: 'office',
      key: 'office',
    },
    {
      title: '涉及处室',
      dataIndex: 'involvedStation',
      key: 'involvedStation',
    },
    {
      title: '申请原因',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime: string) => {
        return <>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</>;
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => {
        return (
          <>
            <Row gutter={16}>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    approveTicket(id, true);
                  }}
                >
                  批准
                </Button>
              </Col>
              <Col>
                <Button
                  danger
                  onClick={() => {
                    approveTicket(id, false);
                  }}
                >
                  拒绝
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    queryApproveTickets();
  }, []);

  return (
    <PageContainer>
      {contextHolder}
      <Card>
        <Table columns={processingTicketColumns} dataSource={ticketList} />
      </Card>
    </PageContainer>
  );
};

export default TicketApply;
