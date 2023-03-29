import { Button, Card, Col, Modal, Row, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { SubmitTicket } from '../common/types';
import TicketDetailModal from './TicketDetail';
import { mockTicketDetail } from '../common/mock';
import { useState } from 'react';

const SubmitTicketList = (props: {
  ticketList: SubmitTicket[];
  searchKeyWord: string;
  searchRangeDate: [string, string];
}) => {
  const { ticketList, searchKeyWord, searchRangeDate } = props;
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);

  const openShowTicketModal = (): void => {
    setIsShowTicketModalOpen(true);
  };

  const closeShowTicketModal = (): void => {
    setIsShowTicketModalOpen(false);
  };

  const submitColumns: ColumnsType<SubmitTicket> = [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '申请处室',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '申请人',
      dataIndex: 'owner',
      key: 'owner',
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
      render: (status) => {
        return (
          <>
            <Tag color={status == '通过' ? 'blue' : 'red'}>{status}</Tag>
          </>
        );
      },
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
                详情
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Card>
      <Table columns={submitColumns} dataSource={ticketList} />
      <Modal
        title="场站参数详情"
        open={isShowTicketModalOpen}
        onOk={openShowTicketModal}
        onCancel={closeShowTicketModal}
        width={1500}
        footer={null}
      >
        <TicketDetailModal ticketDetail={mockTicketDetail} />
      </Modal>
    </Card>
  );
};

export default SubmitTicketList;
