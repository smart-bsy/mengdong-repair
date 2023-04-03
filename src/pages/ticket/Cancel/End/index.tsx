import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, message, Input, Modal, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import type { Ticket } from '../../common/types';
import { processNodes } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import { requestQueryTicketCancelList } from '@/services/ticket/cancel/api';

const TicketReview: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>('');

  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchTicketList = async (startDate?: number, endDate?: number, place?: string) => {
    setIsLoadingList(true);
    try {
      const result = await requestQueryTicketCancelList({
        process: processNodes.end,
        submit: '0',
        startDate,
        endDate,
        place,
      });
      if (result.code == 2000) {
        setTicketList(result.data);
      }
    } catch (error) {
      messageApi.error('加载失败');
      console.log(error);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchTicketList();
  }, []);

  const refresh = (): void => {
    setSearchKey('');
    fetchTicketList();
  };

  const search = () => {
    fetchTicketList(0, 0, searchKey);
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
              <Button type="primary" icon={<SearchOutlined />} onClick={search}>
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
          <SubmitTicketList ticketList={ticketList} />
        )}
      </Card>
    </PageContainer>
  );
};

export default TicketReview;
