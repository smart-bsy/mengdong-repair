import { Button, Card, Col, Descriptions, Modal, Row, Steps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { mockOperationLogs } from '../common/mock';
import { TicketDetail } from '../common/types';
import OperationLogList from './OperationLogs';

const TicketDetailModal = (props: { ticketDetail: TicketDetail; canReview: boolean }) => {
  const { ticketDetail, canReview } = props;
  const [isOperationLogModalOpen, setIsOperationLogModalOpen] = useState<boolean>();
  const [operationLogs, setOperationLogs] = useState();

  const [isShowNodeModalOpen, setIsShowNodeModalOpen] = useState<boolean>(false);
  const [nodeDetail, setNodeDetail] = useState();

  const openShowNodeModal = (): void => {
    setIsShowNodeModalOpen(true);
  };

  const closeShowNodeModal = (): void => {
    setIsShowNodeModalOpen(false);
  };

  const openOperationLog = (): void => {
    setIsOperationLogModalOpen(true);
  };

  const closeOperationLog = (): void => {
    setIsOperationLogModalOpen(false);
  };

  useEffect(() => {
    console.log(canReview);
  }, []);

  return (
    <Card>
      <Descriptions title={`申请编号: ${ticketDetail.ticket.id}`} bordered>
        <Descriptions.Item label="申请处室">{ticketDetail.ticket.department}</Descriptions.Item>
        <Descriptions.Item label="申请时间">
          {dayjs(ticketDetail.ticket.createTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="涉及场站">
          {ticketDetail.ticket.involvedStation}
        </Descriptions.Item>
        <Descriptions.Item label="原因">{ticketDetail.ticket.reason}</Descriptions.Item>
        <Descriptions.Item label="会签意见">{ticketDetail.ticket.opinion}</Descriptions.Item>
      </Descriptions>
      <Card style={{ marginTop: 15 }}>流程进度</Card>
      <Card>
        <Steps
          current={2}
          status="error"
          items={[
            {
              title: '申请',
              description: (
                <>
                  <Button style={{ marginLeft: -15, marginTop: 10 }} shape="round" type="primary">
                    详情
                  </Button>
                </>
              ),
            },
            {
              title: '初审',
              description: (
                <>
                  <Button
                    onClick={() => {
                      openShowNodeModal();
                    }}
                    style={{ marginLeft: -15, marginTop: 10 }}
                    shape="round"
                    type="primary"
                  >
                    详情
                  </Button>
                </>
              ),
            },
            {
              title: '主任审批',
              description: (
                <>
                  <Button
                    onClick={() => {
                      openShowNodeModal();
                    }}
                    style={{ marginLeft: -15, marginTop: 10 }}
                    shape="round"
                    type="primary"
                  >
                    详情
                  </Button>
                </>
              ),
            },
            {
              title: '新能源会签',
              description: (
                <>
                  <Button
                    onClick={() => {
                      openShowNodeModal();
                    }}
                    style={{ marginLeft: -15, marginTop: 10 }}
                    shape="round"
                    type="primary"
                  >
                    详情
                  </Button>
                </>
              ),
            },
            {
              title: '调度会签',
              description: (
                <>
                  <Button
                    onClick={() => {
                      openShowNodeModal();
                    }}
                    style={{ marginLeft: -15, marginTop: 10 }}
                    shape="round"
                    type="primary"
                  >
                    详情
                  </Button>
                </>
              ),
            },
            {
              title: '调度签收',
              description: (
                <>
                  <Button
                    onClick={() => {
                      openShowNodeModal();
                    }}
                    style={{ marginLeft: -15, marginTop: 10 }}
                    shape="round"
                    type="primary"
                  >
                    详情
                  </Button>
                </>
              ),
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
      {canReview && (
        <div style={{ marginTop: 15 }}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="审核人">程璐</Descriptions.Item>
              <br />
              <br />
              <Descriptions.Item label="处长意见">
                <TextArea rows={4} />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
      <div style={{ marginTop: 15 }}>
        <Row justify={'center'} align="bottom" gutter={16}>
          {canReview && (
            <>
              <Col>
                <Button>签字</Button>
              </Col>
              <Col>
                <Button>最终签字</Button>
              </Col>
            </>
          )}
          <Col>
            <Button type="primary" onClick={openOperationLog}>
              查看操作日志
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        title="操作日志"
        open={isOperationLogModalOpen}
        width={1000}
        onCancel={closeOperationLog}
        footer={null}
      >
        <Card>
          <OperationLogList logs={mockOperationLogs} />
        </Card>
      </Modal>
      <Modal
        title=""
        open={isShowNodeModalOpen}
        width={1000}
        onCancel={closeShowNodeModal}
        footer={null}
      >
        <Descriptions title={'需求单会签详情查询'} bordered>
          <Descriptions.Item label="序号">1</Descriptions.Item>
          <Descriptions.Item label="签字人">李四</Descriptions.Item>
          <Descriptions.Item label="签字时间">2023-03-22 22:00</Descriptions.Item>
          <Descriptions.Item label="所属节点">测试节点</Descriptions.Item>
          <Descriptions.Item label="会签类型">啥类型呀</Descriptions.Item>
        </Descriptions>
      </Modal>
    </Card>
  );
};

export default TicketDetailModal;
