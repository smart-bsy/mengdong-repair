import { Button, Card, Col, Modal, Row, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import TicketDetailModal from './TicketDetail';
import { useState } from 'react';
import type { Ticket } from '../common/types';

const SubmitTicketList = (props: { ticketList: Ticket[] }) => {
  const { ticketList } = props;
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [curTicketId, setCurTicketId] = useState<number>(0);

  const openShowTicketModal = (id: number): void => {
    setCurTicketId(id);
    setIsShowTicketModalOpen(true);
  };

  const closeShowTicketModal = (): void => {
    setIsShowTicketModalOpen(false);
  };

  const submitColumns: ColumnsType<Ticket> = [
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
              <Button
                type="primary"
                onClick={() => {
                  openShowTicketModal(id);
                }}
              >
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
        onCancel={closeShowTicketModal}
        width={1500}
        footer={null}
      >
        <TicketDetailModal ticketId={curTicketId} />
      </Modal>
    </Card>
  );
};

export default SubmitTicketList;
