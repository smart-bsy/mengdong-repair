import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, message, Input, Modal, Row, Select, Table, Spin } from 'antd';
import { useEffect, useState } from 'react';
import type { Ticket } from '../../common/types';
import { processNodes } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import TicketDetailModal from '../../components/TicketDetail';
import { requestQueryTicketCancelList } from '@/services/ticket/cancel/api';

const ticketOptions = [
  { value: '0', label: '未提交' },
  { value: '1', label: '提交' },
];

const TicketReview: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>('');

  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);

  const [ticketType, setTicketType] = useState<string>('0');

  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const [curTicketId, setCurTicketId] = useState<number>(0);

  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchTicketList = async (
    submit: string,
    startDate?: number,
    endDate?: number,
    place?: string,
  ) => {
    setIsLoadingList(true);
    try {
      const result = await requestQueryTicketCancelList({
        process: processNodes.scheduleApproval,
        submit,
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

  const refresh = (): void => {
    setSearchKey('');
    fetchTicketList(ticketType);
  };

  const handleTicketTypeChange = (value: string): void => {
    setTicketType(value);
  };

  const openShowTicketModal = (id: number): void => {
    setCurTicketId(id);
    setIsShowTicketModalOpen(true);
  };

  const closeShowTicketModal = (): void => {
    setIsShowTicketModalOpen(false);
  };

  const closeRefreshShowTicketModal = (): void => {
    refresh();
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
              <Button
                type="primary"
                onClick={() => {
                  openShowTicketModal(id);
                }}
              >
                签字
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  useEffect(() => {
    fetchTicketList(ticketOptions[0].value);
  }, []);

  useEffect(() => {
    fetchTicketList(ticketType);
  }, [ticketType]);

  const search = () => {
    fetchTicketList(ticketType, 0, 0, searchKey);
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
        {isLoadingList ? (
          <>
            <Spin tip="Loading" size="large">
              <div className="content" style={{ padding: '50px', borderRadius: '4px' }} />
            </Spin>
          </>
        ) : (
          <>
            {ticketType == '0' ? (
              <>
                <Table columns={unSubmitColumns} dataSource={ticketList} />
              </>
            ) : (
              <>
                <SubmitTicketList ticketList={ticketList} />
              </>
            )}
          </>
        )}
      </Card>
      <Modal
        title="场站参数详情"
        open={isShowTicketModalOpen}
        onCancel={closeShowTicketModal}
        width={1500}
        footer={null}
        key={curTicketId}
      >
        <TicketDetailModal
          closeModal={closeRefreshShowTicketModal}
          ticketId={curTicketId}
          canSign={true}
        />
      </Modal>
    </PageContainer>
  );
};

export default TicketReview;
