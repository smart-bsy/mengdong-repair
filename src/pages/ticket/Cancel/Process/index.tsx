import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Descriptions, Input, Modal, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { mockDoingTicketList, mockSubmitTicketList } from '../../common/mock';
import type { Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';

const TicketProcess: React.FC = () => {
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [doingTicketList, setDoingTicketList] = useState<Ticket[]>(mockDoingTicketList);

  const [searchKey, setSearchKey] = useState<string>('');

  useEffect(() => {
    if (isShowTicketModalOpen) {
      console.log('fetch ticket detail from server');
    }
  }, [isShowTicketModalOpen]);

  const refresh = (): void => {
    console.log('刷新列表');
  };

  const filterTicketList = (): void => {};

  return (
    <PageContainer>
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
              <Button type="primary" icon={<SearchOutlined />} onClick={filterTicketList}>
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
        <SubmitTicketList
          ticketList={doingTicketList}
          searchKeyWord={''}
          searchRangeDate={['', '']}
        />
      </Card>
    </PageContainer>
  );
};

export default TicketProcess;
