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
  Steps,
  Table,
  Tag,
  Upload,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useAccess } from 'umi';
import {
  mockDoingTicketList,
  mockSubmitTicketList,
  mockUnSubmitTicketList,
} from '../../common/mock';
import type { Ticket } from '../../common/types';
import SubmitTicketList from '../../components/SubmitTicketList';
import UnSubmitTicketList from '../../components/UnSubmitTicketList';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const ticketOptions = [
  { value: 0, label: '未提交' },
  { value: 1, label: '提交' },
];
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
const TicketList: React.FC = () => {
  const access = useAccess();

  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState<boolean>(false);
  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);

  const [createTicketForm, setCreateTicketForm] = useState<Ticket>(nullTicket);

  const [unSubmitTicketList, setunSubmitTicketList] = useState<Ticket[]>(mockUnSubmitTicketList);
  const [submitTicketList, setSubmitTicketList] = useState<Ticket[]>(mockSubmitTicketList);
  const [doingTicketList, setDoingTicketList] = useState<Ticket[]>(mockDoingTicketList);

  const [searchKey, setSearchKey] = useState<string>('');

  const [isSelectTicketModalOpen, setIsSelectTicketModalOpen] = useState<boolean>(false);

  const [ticketType, setTicketType] = useState<string>('0');
  useEffect(() => {
    console.log(access);
  }, []);

  useEffect(() => {
    if (isShowTicketModalOpen) {
      console.log('fetch ticket detail from server');
    }
  }, [isShowTicketModalOpen]);

  // 这里后面应该更改为 remote fetch
  useEffect(() => {
    // if (ticketType == '0') {
    //   setShowTicketList(mockUnSubmitTicketList);
    // }
    // if (ticketType == '1') {
    //   setShowTicketList(mockSubmitTicketList);
    // }
    // if (ticketType == '2') {
    //   setShowTicketList(mockDoingTicketList);
    // }
  }, [ticketType]);

  const openSelectTicketModal = (): void => {
    setIsSelectTicketModalOpen(true);
  };

  const closeSelectTicketModal = (): void => {
    setIsSelectTicketModalOpen(false);
  };
  const openCreateTicketModal = (): void => {
    console.log('open create ticket modal');
    setIsCreateTicketModalOpen(true);
  };

  const closeCreateTicketModal = (): void => {
    setIsCreateTicketModalOpen(false);
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // dayjs(dateRange[1], 'YYYY/MM/DD').millisecond()
  const refresh = (): void => {
    console.log('刷新列表');
  };

  const handleTicketTypeChange = (value: string): void => {
    setTicketType(value);
  };

  const filterTicketList = (): void => {
    // if (searchKey == '') {
    //   if (ticketType == '0') {
    //     setShowTicketList(mockUnSubmitTicketList);
    //   } else {
    //     setShowTicketList(mockSubmitTicketList);
    //   }
    //   return;
    // }
    // setShowTicketList(() => {
    //   if (ticketType == '0') {
    //     return mockUnSubmitTicketList.filter((t) => {
    //       return t.involvedStation.indexOf(searchKey) >= 0;
    //     });
    //   }
    //   return mockSubmitTicketList.filter((t) => {
    //     return t.involvedStation.indexOf(searchKey) >= 0;
    //   });
    // });
  };

  const handleCreateTicketFormItemChange = (name: string, value: any): void => {
    setCreateTicketForm((prev) => {
      return { ...prev, [name]: value };
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

  //   range date filter
  const rangeDateChange = (values: any, dateString: [string, string]) => {
    console.log(dateString);
  };

  // 只能是SubmitTicket
  const handleCreateFromOriginTicket = (record: Ticket) => {
    console.log(record);
    setCreateTicketForm(record);
    openCreateTicketModal();
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
      <Card>{getTableNode(ticketType)}</Card>
      <Modal
        open={isSelectTicketModalOpen}
        onCancel={closeSelectTicketModal}
        footer={null}
        width={1000}
      >
        <Table
          columns={doingColumns}
          dataSource={mockSubmitTicketList}
          onRow={(record) => {
            return {
              onClick: () => {
                handleCreateFromOriginTicket(record);
              }, // 点击行
            };
          }}
        />
      </Modal>
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
        <Card style={{ marginTop: 15 }}>场站参数设置流程</Card>
        <Card>
          <Steps
            current={1}
            status="wait"
            items={[
              {
                title: '申请',
              },
              {
                title: '初审',
              },
              {
                title: '主任审批',
              },
              {
                title: '新能源会签',
              },
              {
                title: '调度会签',
              },
              {
                title: '调度签收',
              },
              {
                title: '执行中',
              },
              {
                title: '结束',
              },
            ]}
          />
        </Card>
        <div style={{ marginTop: 15 }}>
          <Row justify={'center'} align="bottom" gutter={16}>
            <Col>
              <Button type="primary">确认</Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default TicketList;
