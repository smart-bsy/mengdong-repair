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
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  Upload,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  mockDoingTicketList,
  mockSubmitTicketList,
  mockUnSubmitTicketList,
} from '../../common/mock';
import { SubmitTicket, Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import UnSubmitTicketList from '../../components/UnSubmitTicketList';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const TicketList: React.FC = () => {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState<boolean>(false);
  const nullTicket: Ticket = {
    id: '',
    department: '',
    owner: '',
    createTime: 0,
    involvedStation: '',
    reason: '',
    opinion: '',
  };
  const [createTicketForm, setCreateTicketForm] = useState<Ticket>(nullTicket);
  const [unSubmitTicketList, setunSubmitTicketList] = useState<Ticket[]>(mockUnSubmitTicketList);
  const [submitTicketList, setSubmitTicketList] = useState<SubmitTicket[]>(mockSubmitTicketList);
  const [doingTicketList, setDoingTicketList] = useState<SubmitTicket[]>(mockDoingTicketList);

  const [searchKey, setSearchKey] = useState<string>('');

  const [ticketType, setTicketType] = useState<string>('0');
  const ticketOptions = [
    { value: 0, label: '未提交' },
    { value: 1, label: '提交' },
    { value: 2, label: '已发起流程' },
  ];

  // 这里后面应该更改为 remote fetch
  useEffect(() => {
    // if (ticketType == '0') {
    //   setunSubmitTicketList(mockUnSubmitTicketList);
    // }
    // if (ticketType == '1') {
    //   setunSubmitTicketList(mockSubmitTicketList);
    // }
    // if (ticketType == '2') {
    //   (mockDoingTicketList);
    // }
  }, [ticketType]);

  const openCreateTicketModal = (): void => {
    setCreateTicketForm({
      id: '',
      department: '远程获取',
      owner: '',
      createTime: dayjs().millisecond(),
      involvedStation: '',
      reason: '',
      opinion: '',
    });
    setIsCreateTicketModalOpen(true);
  };

  const closeCreateTicketModal = (): void => {
    setIsCreateTicketModalOpen(false);
  };

  const submitColumns: ColumnsType<SubmitTicket | Ticket> = [
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
  ];

  const doingColumns: ColumnsType<SubmitTicket | Ticket> = [
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
    },
  ];

  const refresh = (): void => {
    console.log('刷新列表');
  };

  const handleCreateTicketFormItemChange = (name: string, value: any): void => {
    setCreateTicketForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTicketTypeChange = (value: string): void => {
    setTicketType(value);
  };

  const filterTicketList = (): void => {
    if (searchKey == '') {
      if (ticketType == '0') {
        setunSubmitTicketList(mockUnSubmitTicketList);
      } else {
        setunSubmitTicketList(mockSubmitTicketList);
      }
      return;
    }
    setunSubmitTicketList(() => {
      if (ticketType == '0') {
        return mockUnSubmitTicketList.filter((t) => {
          return t.involvedStation.indexOf(searchKey) >= 0;
        });
      }
      return mockSubmitTicketList.filter((t) => {
        return t.involvedStation.indexOf(searchKey) >= 0;
      });
    });
  };

  const getTableNode = (type: string): React.ReactNode => {
    if (type == '0') {
      return (
        <UnSubmitTicketList
          ticketList={unSubmitTicketList}
          saveHandle={(ticket: Ticket) => {}}
          submitHandleHandle={(ticket: Ticket) => {}}
          deleteHandle={(ticket: Ticket) => {}}
          // 后面使用useState
          searchKeyword={''}
          searchDateRange={['', '']}
        />
      );
    }
    if (type == '1') {
      return (
        <SubmitTicketList
          ticketList={submitTicketList}
          searchKeyWord={''}
          searchRangeDate={['', '']}
        />
      );
    }
    if (type == '2') {
      return (
        <SubmitTicketList
          ticketList={doingTicketList}
          searchKeyWord={''}
          searchRangeDate={['', '']}
        />
      );
    }
  };

  const rangeDateChange = (values: any, dateString: [string, string]) => {
    console.log(dateString);
  };

  return (
    <PageContainer>
      <Card>
        <Row gutter={16}>
          <Row>
            <RangePicker
              format={dateFormat}
              onChange={(values, formatString) => {
                rangeDateChange(values, formatString);
              }}
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
            <Button icon={<PlusOutlined />} onClick={openCreateTicketModal}>
              新建
            </Button>
          </Col>
          <Col>
            <Button icon={<Loading3QuartersOutlined />} onClick={refresh}>
              刷新
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>{getTableNode(ticketType)}</Card>
      <Modal
        title="新建"
        open={isCreateTicketModalOpen}
        onCancel={closeCreateTicketModal}
        width={1500}
        footer={null}
      >
        <Descriptions title={`申请编号`} bordered>
          <Descriptions.Item label="申请处室">{createTicketForm.department}</Descriptions.Item>
          <Descriptions.Item label="申请时间">
            {dayjs().format('YYYY-MM-DD HH:mm')}
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
              <Button type="primary">保存</Button>
            </Col>
            <Col>
              <Button>提交</Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default TicketList;
