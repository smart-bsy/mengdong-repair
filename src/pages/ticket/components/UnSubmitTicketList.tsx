import { Button, Col, Descriptions, Input, Modal, Popconfirm, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import { useState } from 'react';
import { mockTicketDetail, mockUnSubmitTicketList } from '../common/mock';
import { Ticket } from '../common/types';
import TicketDetailModal from './TicketDetail';
const nullTicket: Ticket = {
  id: '',
  department: '',
  owner: '',
  createTime: 0,
  involvedStation: '',
  reason: '',
  opinion: '',
};

export type TicketHandle = (ticket: Ticket) => void;

const UnSubmitTicketList = (props: {
  ticketList: Ticket[];
  saveHandle?: TicketHandle;
  submitHandleHandle?: TicketHandle;
  deleteHandle?: TicketHandle;
  searchKeyword: string;
  searchDateRange?: [string, string];
}) => {
  const {
    ticketList,
    saveHandle,
    submitHandleHandle,
    deleteHandle,
    searchKeyword,
    searchDateRange,
  } = props;

  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [isEditTicketModalOpen, setIsEditTicketModalOpen] = useState<boolean>(false);
  const [editTicketForm, setEditTicketForm] = useState<Ticket>(nullTicket);

  const openShowTicketModal = (): void => {
    setIsShowTicketModalOpen(true);
  };

  const closeShowTicketModal = (): void => {
    setIsShowTicketModalOpen(false);
  };
  const openEditTicketModal = (): void => {
    setEditTicketForm(mockUnSubmitTicketList[0]);
    setIsEditTicketModalOpen(true);
  };

  const closeEditTicketModal = (): void => {
    setIsEditTicketModalOpen(false);
  };

  const handleEditTicketFormItemChange = (name: string, value: any): void => {
    setEditTicketForm((prev) => {
      return { ...prev, [name]: value };
    });
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
            <Col>
              <Button onClick={openEditTicketModal}>编辑</Button>
            </Col>
            <Col>
              <Popconfirm
                title={'删除该需求单'}
                onConfirm={() => {}}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];

  const saveTicketHandler = () => {};

  const submitTicketHandler = () => {};

  return (
    <>
      <Table columns={unSubmitColumns} dataSource={ticketList} />
      <Modal
        title="场站参数设置"
        open={isEditTicketModalOpen}
        width={1500}
        onCancel={closeEditTicketModal}
        footer={null}
      >
        <Descriptions title={`申请编号: ${mockTicketDetail.ticket.id}`} bordered>
          <Descriptions.Item label="申请处室">{editTicketForm.department}</Descriptions.Item>
          <Descriptions.Item label="申请时间">
            {dayjs(editTicketForm.createTime).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="涉及场站">
            <Input
              value={editTicketForm.involvedStation}
              placeholder="输入涉及场站"
              onChange={({ target }) => {
                handleEditTicketFormItemChange('involvedStation', target.value);
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="原因">
            <TextArea
              rows={4}
              value={editTicketForm.reason}
              placeholder="输入原因"
              onChange={({ target }) => {
                handleEditTicketFormItemChange('reason', target.value);
              }}
            />
          </Descriptions.Item>
          <br />
          <br />
          <div style={{ marginTop: 15 }}>
            <Row justify={'center'} align="bottom" gutter={16}>
              <Col>
                <Button type="primary" onClick={saveTicketHandler}>
                  保存
                </Button>
              </Col>
              <Col>
                <Button onClick={submitTicketHandler}>提交</Button>
              </Col>
            </Row>
          </div>
        </Descriptions>
      </Modal>
      <Modal
        title="场站参数详情"
        open={isShowTicketModalOpen}
        onOk={openShowTicketModal}
        onCancel={closeShowTicketModal}
        width={1500}
        footer={null}
      >
        <TicketDetailModal ticketDetail={mockTicketDetail} canReview={false} />
      </Modal>
    </>
  );
};

export default UnSubmitTicketList;
