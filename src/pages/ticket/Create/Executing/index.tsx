import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Descriptions, Input, Modal, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { mockDoingTicketList, mockSubmitTicketList } from '../../common/mock';
import type { Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';

const nullTicket: Ticket = {
  id: 0,
  code: '',
  office: '',
  applicant: '',
  createTime: 0,
  involvedStation: '',
  reason: '',
  opinion: '',
  status: '',
};

const TicketExecuting: React.FC = () => {
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [doingTicketList, setDoingTicketList] = useState<Ticket[]>(mockDoingTicketList);

  const [searchKey, setSearchKey] = useState<string>('');

  useEffect(() => {
    if (isShowTicketModalOpen) {
      console.log('fetch ticket detail from server');
    }
  }, [isShowTicketModalOpen]);

  const doingColumns: ColumnsType<Ticket> = [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '编号',
      dataIndex: 'cpde',
      key: 'code',
    },
    {
      title: '申请处室',
      dataIndex: 'office',
      key: 'office',
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime) => {
        return <span>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</span>;
      },
    },
    {
      title: '涉及场站',
      dataIndex: 'involvedStation',
      key: 'createTime',
    },
    {
      title: '申请原因',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

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

export default TicketExecuting;
