import { requestGetProcessingTicket } from '@/services/ticket/apply/api';
import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Input, Row, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import type { Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';

const TicketProcess: React.FC = () => {
  const [doingTicketList, setDoingTicketList] = useState<Ticket[]>([]);

  const [searchKey, setSearchKey] = useState<string>('');

  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchTicketList = async (place: string, startDate: number, endDate: number) => {
    try {
      setIsLoadingList(true);
      const result = await requestGetProcessingTicket({
        startDate,
        endDate,
        place,
      });
      if (result.code == 2000) {
        setDoingTicketList(result.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      messageApi.error('加载失败');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchTicketList('', 0, 0);
  }, []);

  const refresh = (): void => {
    setSearchKey('');
    fetchTicketList('', 0, 0);
  };

  const searchTicketList = (): void => {
    fetchTicketList(searchKey, 0, 0);
  };

  return (
    <PageContainer>
      {contextHolder}
      <Card>
        <Row gutter={16}>
          <Row>
            <Col>
              <Input
                placeholder="涉及场站"
                value={searchKey}
                onChange={({ target }) => {
                  setSearchKey(target.value);
                }}
              />
            </Col>
            <Col>
              <Button type="primary" icon={<SearchOutlined />} onClick={searchTicketList}>
                查询
              </Button>
            </Col>
          </Row>
          <Col>
            <Button icon={<Loading3QuartersOutlined />} onClick={refresh}>
              刷新
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        {isLoadingList ? (
          <>
            <Spin tip="Loading" size="large">
              <div className="content" style={{ padding: '50px', borderRadius: '4px' }} />
            </Spin>
          </>
        ) : (
          <SubmitTicketList ticketList={doingTicketList} />
        )}
      </Card>
    </PageContainer>
  );
};

export default TicketProcess;
