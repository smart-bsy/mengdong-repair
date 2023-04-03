import {
  Loading3QuartersOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Upload,
  message,
  Table,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import type { Ticket } from '../../common/types';
import { processNodes } from '../../common/types';
import { getNullTicket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import UnSubmitTicketList from '../../components/UnSubmitTicketList';
import type { ColumnsType } from 'antd/es/table';
import {
  requestCreateTicket,
  requestExecutingTicketApplyList,
  requestQueryTicketCancelList,
  requestSaveTicket,
  requestSubmitTicket,
  requestTicketDetail,
} from '@/services/ticket/cancel/api';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const ticketOptions = [
  { value: '0', label: '未提交' },
  { value: '1', label: '提交' },
];

const TicketList: React.FC = () => {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [isCreatingTicket, setIsCreatingTicket] = useState<boolean>(false);

  const [createTicketForm, setCreateTicketForm] = useState<Ticket>(getNullTicket());

  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const [selectTicketList, setSelectTicketList] = useState<Ticket[]>([]);

  const [searchKey, setSearchKey] = useState<string>('');

  const [ticketType, setTicketType] = useState<string>('0');

  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);

  const [isSelectTicketModalOpen, setIsSelectTicketModalOpen] = useState<boolean>(false);

  const openSelectTicketModal = (): void => {
    setIsSelectTicketModalOpen(true);
  };

  const closeSelectTicketModal = (): void => {
    setIsSelectTicketModalOpen(false);
  };

  const fetchTicketList = async (
    submit: string,
    startDate?: number,
    endDate?: number,
    place?: string,
  ) => {
    setIsLoadingList(true);
    try {
      const result = await requestQueryTicketCancelList({
        process: processNodes.apply,
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

  const fetchExecutingTicketList = async () => {
    setIsLoadingList(true);
    try {
      const result = await requestExecutingTicketApplyList();
      if (result.code == 2000) {
        setSelectTicketList(result.data);
      }
    } catch (error) {
      messageApi.error('加载失败');
      console.log(error);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchTicketList(ticketOptions[0].value);
    setCreateTicketForm(getNullTicket());
  }, []);

  useEffect(() => {
    fetchTicketList(ticketType);
  }, [ticketType]);

  useEffect(() => {
    if (isSelectTicketModalOpen) {
      fetchExecutingTicketList();
    }
  }, [isSelectTicketModalOpen]);

  const searchTicketList = () => {
    fetchTicketList(
      ticketType,
      dateRange[0] == '' ? 0 : dayjs(dateRange[0], 'YYYY/MM/DD').valueOf(),
      dateRange[1] == '' ? 0 : dayjs(dateRange[1], 'YYYY/MM/DD').valueOf(),
      searchKey,
    );
  };

  const openCreateTicketModal = (ticket: Ticket): void => {
    ticket.applicant = '';
    ticket.createTime = dayjs().valueOf();
    ticket.office = '测试处室';
    setCreateTicketForm(ticket);
    setIsCreateTicketModalOpen(true);
    setIsSelectTicketModalOpen(false);
  };

  const closeCreateTicketModal = (): void => {
    setIsCreateTicketModalOpen(false);
  };

  const refresh = (): void => {
    setDateRange(['', '']);
    setSearchKey('');
    fetchTicketList(ticketType);
  };

  const handleCreateTicketFormItemChange = (name: string, value: any): void => {
    setCreateTicketForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTicketTypeChange = (value: string): void => {
    setTicketType(value);
  };

  const saveTicketHandle = async (ticket: Ticket) => {
    const res = await requestSaveTicket(ticket);
    if (res.code == 2000) {
    } else {
      throw new Error('保存失败');
    }
  };

  const submitTicketHandle = async (id: number) => {
    const result = await requestSubmitTicket(id);
    if (result.code == 2000) {
    } else {
      throw new Error('提交失败');
    }
  };

  const deleteTicketHandle = async (id: number) => {
    const result = await requestTicketDetail({ ticketId: id });
    if (result.code == 2000) {
    } else {
      throw new Error('删除失败');
    }
  };

  const rangeDateChange = (values: any, dateString: [string, string]) => {
    setDateRange(dateString);
  };

  const createTicket = async () => {
    try {
      setIsCreatingTicket(true);
      const result = await requestCreateTicket(createTicketForm);
      if (result.code == 2000) {
        messageApi.success('创建成功');
        closeCreateTicketModal();
        fetchTicketList('0');
      }
    } catch (error) {
      console.log(error);
      messageApi.error('创建失败');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const doingColumns: ColumnsType<Ticket> = [
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
      dataIndex: 'id',
      key: 'id',
      render: (id, record, index) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                openCreateTicketModal(record);
              }}
            >
              选择
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      {contextHolder}
      <Card>
        <Row gutter={16}>
          <Row>
            <RangePicker
              format={dateFormat}
              onChange={(values, formatString) => {
                rangeDateChange(values, formatString);
              }}
              allowClear
            />
          </Row>
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
            <Button icon={<PlusOutlined />} onClick={openSelectTicketModal}>
              从需求单生成
            </Button>
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
                <UnSubmitTicketList
                  ticketList={ticketList}
                  setTicketList={setTicketList}
                  saveHandle={saveTicketHandle}
                  submitHandle={submitTicketHandle}
                  deleteHandle={deleteTicketHandle}
                />
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
        title="新建"
        open={isCreateTicketModalOpen}
        onCancel={closeCreateTicketModal}
        width={1500}
        footer={null}
      >
        <Descriptions title={`申请编号`} bordered>
          <Descriptions.Item label="申请处室">{createTicketForm.office}</Descriptions.Item>
          <Descriptions.Item label="申请时间">
            {dayjs(createTicketForm.createTime).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="涉及场站">
            <Input
              value={createTicketForm.involvedStation}
              placeholder="输入涉及场站"
              onChange={({ target }) => {
                handleCreateTicketFormItemChange('involvedStation', target.value);
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="原因">
            <TextArea
              value={createTicketForm.reason}
              rows={4}
              placeholder="输入原因"
              onChange={({ target }) => {
                handleCreateTicketFormItemChange('reason', target.value);
              }}
            />
          </Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item label="附件">
            <Upload>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: 15 }}>
          <Row justify={'center'} align="bottom" gutter={16}>
            <Col>
              <Button onClick={createTicket} type="primary" loading={isCreatingTicket}>
                确认
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal
        open={isSelectTicketModalOpen}
        onCancel={closeSelectTicketModal}
        footer={null}
        width={1500}
      >
        <Table columns={doingColumns} dataSource={selectTicketList} />
      </Modal>
    </PageContainer>
  );
};

export default TicketList;
