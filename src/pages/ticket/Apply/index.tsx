import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, message, Modal, Select, Table, Row } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Activity, Ticket } from '../typings';
import {
  requestPostTicket,
  requestQueryFinishedTickets,
  requestQueryProcessTickets,
  requestQueryTicketProgress,
} from '@/services/ticket/api';
import dayjs from 'dayjs';
import TextArea from 'antd/lib/input/TextArea';
import { MiniMap, ReactFlow } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

const ticketOptions = [
  { value: '0', label: '在流程中' },
  { value: '1', label: '已完成' },
];

const TicketApply: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [showType, setShowType] = useState<string>(ticketOptions[0].value);

  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const [isProcessModalOpen, setIsProcessModalOpen] = useState<boolean>(false);

  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState<boolean>(false);

  const [curTicketId, setCurTicketId] = useState<string>();

  const [activities, setActivities] = useState<Activity[]>([]);

  /**
   *  node options:
   *      selected: If true, the node is selected
   */
  const initialNodes: Node[] = [
    {
      id: '0',
      position: { x: 500, y: 0 },
      data: { label: '开始' },
      type: 'input',
      style: { border: '1px solid #777', borderRadius: 1000 },
    },
    {
      id: '1',
      position: { x: 500, y: 100 },
      data: { label: '提交申请单' },
      type: 'default',
    },
    {
      id: '2',
      position: { x: 500, y: 200 },
      data: { label: '领导审核' },
      type: 'default',
      selected: true,
      style: { background: 'skyblue' },
    },
    { id: '3', position: { x: 600, y: 300 }, data: { label: '通过' }, type: 'output' },
    { id: '4', position: { x: 400, y: 300 }, data: { label: '未通过' }, type: 'output' },
  ];

  const initialEdges: Edge[] = [
    { id: 'e0-1', source: '0', target: '1', animated: true },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      label: '同意',
      animated: true,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      label: '不同意',
      animated: true,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#ff3300', color: '#fff', fillOpacity: 0.7 },
    },
  ];

  const [progressNodes, setProgressNodes] = useState<Node[]>(initialNodes);

  const [ticketForm, setTicketForm] = useState<Ticket>({
    office: '测试office',
    applicant: '测试人',
    involvedStation: '',
    reason: '',
  });

  const closeProcessModal = () => {
    setIsProcessModalOpen(false);
  };

  const openProcessModal = () => {
    setIsProcessModalOpen(true);
  };

  const closeCreateModal = () => {
    ticketForm.involvedStation = '';
    ticketForm.reason = '';
    setIsCreateTicketModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateTicketModalOpen(true);
  };

  const queryFinishedTickets = async () => {
    try {
      const result = await requestQueryFinishedTickets();
      console.log(result);
      if (result.code == 2000) {
        setTicketList(result.data);
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      messageApi.error('加载出错');
      console.log(error);
    }
  };

  const queryProcessTickets = async () => {
    try {
      const result = await requestQueryProcessTickets();
      console.log(result);
      if (result.code == 2000) {
        setTicketList(result.data);
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      messageApi.error('加载出错');
      console.log(error);
    }
  };

  const postTicket = async () => {
    const result = await requestPostTicket(ticketForm);
    try {
      if (result.code == 2000) {
        messageApi.success('提交成功');
        closeCreateModal();
        await queryProcessTickets();
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      messageApi.error('提交失败');
      console.log(error);
    }
  };

  const queryTicketProgress = async (ticketId: string) => {
    try {
      const result = await requestQueryTicketProgress({ ticketId });
      console.log(result);
      if (result.code == 2000) {
        setActivities(result.data);
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      messageApi.error('加载失败');
      console.log(error);
    }
  };

  const showTicketProcess = async (id: string) => {
    setCurTicketId(id);
    await queryTicketProgress(id);
    openProcessModal();
  };

  const ticketFormChangeHandle = (name: string, value: any): void => {
    setTicketForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const createTicket = async () => {
    await postTicket();
  };

  const ticketColumns: ColumnsType<Ticket> = [
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
      title: '涉及处室',
      dataIndex: 'involvedStation',
      key: 'involvedStation',
    },
    {
      title: '申请原因',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime: string) => {
        return <>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</>;
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                showTicketProcess(id);
              }}
            >
              进度查看
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (showType == '0') {
      queryProcessTickets();
    } else {
      queryFinishedTickets();
    }
  }, [showType]);

  useEffect(() => {
    if (activities.length) {
      const lastActivity = activities[activities.length - 1];
      setProgressNodes((prevNodes) => {
        const newNodes: Node[] = [];
        prevNodes.forEach((node) => {
          if (node.data.label == lastActivity.name) {
            node.style = { background: 'skyblue' };
          } else {
            node.style = node.id == '0' ? { border: '1px solid #777', borderRadius: 1000 } : {};
          }
          newNodes.push(node);
        });
        return newNodes;
      });
    }
  }, [activities]);

  return (
    <PageContainer>
      {contextHolder}
      <Card>
        <Row gutter={16}>
          <Col>
            <Select
              defaultValue={ticketOptions[0].value}
              style={{ width: 120 }}
              options={ticketOptions}
              onChange={(value) => {
                setShowType(value);
              }}
            />
          </Col>
          <Col>
            <Button onClick={openCreateModal} type="primary">
              新建流程
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table columns={ticketColumns} dataSource={ticketList} />
      </Card>
      <Modal
        title="流程进度"
        open={isProcessModalOpen}
        onCancel={closeProcessModal}
        width={1500}
        footer={null}
        key={curTicketId}
      >
        {/* ​📐The <ReactFlow /> component must be wrapped in an element with a width and height. */}
        <div style={{ width: '100vw', height: '50vh' }}>
          <ReactFlow nodes={progressNodes} edges={initialEdges}>
            <MiniMap />
          </ReactFlow>
        </div>
      </Modal>
      <Modal
        title="新建流程"
        open={isCreateTicketModalOpen}
        onCancel={closeCreateModal}
        width={1500}
        okText={'提交流程'}
        onOk={createTicket}
      >
        <Card>
          <Form>
            <Form.Item label="涉及处室">
              <Input
                value={ticketForm?.involvedStation}
                onChange={({ target }) => {
                  ticketFormChangeHandle('involvedStation', target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="申请原因">
              <TextArea
                rows={4}
                value={ticketForm?.reason}
                onChange={({ target }) => {
                  ticketFormChangeHandle('reason', target.value);
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </PageContainer>
  );
};

export default TicketApply;
