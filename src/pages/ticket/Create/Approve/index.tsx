import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Descriptions, Input, Modal, Row, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { mockDoingTicketList, mockTicketDetail, mockUnSubmitTicketList } from '../../common/mock';
import { SubmitTicket, Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import TicketDetailModal from '../../components/TicketDetail';

const ticketOptions = [
  { value: 0, label: '未提交' },
  { value: 1, label: '提交' },
];

const TicketApprove: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [doingTicketList, setDoingTicketList] = useState<Ticket[]>(mockDoingTicketList);
  const [unSubmitTicketList, setunSubmitTicketList] = useState<Ticket[]>(mockUnSubmitTicketList);
  const [ticketType, setTicketType] = useState<string>('0');

  const filterTicketList = (): void => {};

  const handleTicketTypeChange = (value: string): void => {
    setTicketType(value);
  };

  const refresh = (): void => {
    console.log('刷新列表');
  };

  const openShowTicketModal = (): void => {
    setIsShowTicketModalOpen(true);
  };

  const closeShowTicketModal = (): void => {
    setIsShowTicketModalOpen(false);
  };

  const unSubmitColumns: ColumnsType<Ticket> = [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
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
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      render: (id) => {
        return (
          <Row gutter={10}>
            <Col>
              <Button type="primary" onClick={openShowTicketModal}>
                批准
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

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
            <Select
              defaultValue={'未提交'}
              style={{ width: 120 }}
              options={ticketOptions}
              onChange={(target) => {
                handleTicketTypeChange(target);
              }}
            />
          </Col>
          <Col>
            <Button icon={<Loading3QuartersOutlined />} onClick={refresh}>
              刷新
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        {ticketType == '0' ? (
          <>
            <Table columns={unSubmitColumns} dataSource={unSubmitTicketList} />
          </>
        ) : (
          <>
            <SubmitTicketList
              ticketList={doingTicketList}
              searchKeyWord={''}
              searchRangeDate={['', '']}
            />
          </>
        )}
      </Card>
      <Modal
        title="场站参数详情"
        open={isShowTicketModalOpen}
        onOk={openShowTicketModal}
        onCancel={closeShowTicketModal}
        width={1500}
        footer={null}
      >
        <TicketDetailModal ticketDetail={mockTicketDetail} canApprove={true} />
      </Modal>
    </PageContainer>
  );
};

export default TicketApprove;
