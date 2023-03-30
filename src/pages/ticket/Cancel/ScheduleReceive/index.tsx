import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Input, Modal, Row, Select, Table } from 'antd';
import { useState } from 'react';
import { mockSubmitTicketList, mockTicketDetail, mockUnSubmitTicketList } from '../../common/mock';
import type { Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import TicketDetailModal from '../../components/TicketDetail';

const ticketOptions = [
  { value: 0, label: '未签收' },
  { value: 1, label: '已签收' },
];

const ScheduleReceive: React.FC = () => {
  const [ticketType, setTicketType] = useState<string>('0');
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [unSubmitTicketList, setunSubmitTicketList] = useState<Ticket[]>(mockUnSubmitTicketList);
  const [submitTicketList, setSubmitTicketList] = useState<Ticket[]>(mockSubmitTicketList);

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
                接收
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleTicketTypeChange = (value: string): void => {
    setTicketType(value);
  };

  return (
    <PageContainer>
      <Card>
        <Row gutter={16}>
          <Row>
            <Col>
              <Input placeholder="涉及场站" />
            </Col>
            <Col>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => {}}>
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
              ticketList={submitTicketList}
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
        <TicketDetailModal ticketDetail={mockTicketDetail} canReceive={true} />
      </Modal>
    </PageContainer>
  );
};

export default ScheduleReceive;
