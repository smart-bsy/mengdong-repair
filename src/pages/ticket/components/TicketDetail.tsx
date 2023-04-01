import {
  requestGetSignDetail,
  requestSignBack,
  requestSignSave,
  requestSignSubmit,
  requestTicketDetail,
} from '@/services/ticket/apply/api';
import type { StepProps } from 'antd';
import { Button, Card, Col, Descriptions, Input, message, Modal, Radio, Row, Steps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { mockOperationLogs } from '../common/mock';
import type { TicketDetail, SignDetail, CloseModal } from '../common/types';
import { getNullTicket } from '../common/types';
import OperationLogList from './OperationLogs';

interface TicketDetailComProps {
  ticketId: number;
  closeModal: CloseModal;
  canReview?: boolean;
  canApprove?: boolean;
  canEnergy?: boolean;
  canSign?: boolean;
  canReceive?: boolean;
}

const nullTicketDetail: TicketDetail = {
  ticket: getNullTicket(),
  cur: -1,
  process: [],
};

const nullSignDetail = (): SignDetail => {
  return {
    ticketId: 0,
    node: -1,
    signer: '',
    opinion: '',
    status: -1,
  };
};

const TicketDetailModal = ({
  ticketId,
  canReview = false,
  canApprove = false,
  canEnergy = false,
  canSign = false,
  canReceive = false,
  closeModal,
}: TicketDetailComProps) => {
  const [isOperationLogModalOpen, setIsOperationLogModalOpen] = useState<boolean>();
  const [operationLogs, setOperationLogs] = useState();

  const [isShowNodeModalOpen, setIsShowNodeModalOpen] = useState<boolean>(false);
  const [nodeDetail, setNodeDetail] = useState();

  const [ticketDetail, setTicketDetail] = useState<TicketDetail>(nullTicketDetail);

  const [messageApi, contextHolder] = message.useMessage();

  const [stepItem, setStepItem] = useState<StepProps[]>([]);

  const [signForm, setSignForm] = useState<SignDetail>(nullSignDetail());

  const [signSaveBtn, setSignSaveBtn] = useState<boolean>(false);

  const [signSubBtn, setSignSubBtn] = useState<boolean>(false);

  const [signBackBtn, setSignBackBtn] = useState<boolean>(false);

  const handleSignDetailChange = (key: string, value: any): void => {
    setSignForm((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const fetchSignSave = async (body: SignDetail) => {
    try {
      setSignSaveBtn(true);
      const result = await requestSignSave(body);
      if (result.data) {
        messageApi.success('签字成功');
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('签字失败');
    } finally {
      setSignSaveBtn(false);
    }
  };

  const fetchSignSubmit = async (body: SignDetail) => {
    try {
      setSignSubBtn(true);
      const result = await requestSignSubmit(body);
      if (result.data) {
        messageApi.success('签字成功');
        closeModal();
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('签字失败');
    } finally {
      setSignSubBtn(false);
    }
  };

  const fetchSignDetail = async (tid: number, node: number) => {
    try {
      const result = await requestGetSignDetail({ ticketId: tid, node });
      console.log(result);
      if (result.code == 2000) {
        // TODO 权限控制
        handleSignDetailChange('opinion', result.data.opinion);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSignBack = async (body: SignDetail) => {
    try {
      const result = await requestSignBack(body);
      if (result.data) {
        messageApi.success('退回成功');
        closeModal();
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('操作失败');
    }
  };

  const fetchTicketDetail = async () => {
    try {
      const res = await requestTicketDetail({ ticketId });
      if (res.code == 2000) {
        setTicketDetail(res.data);
      } else {
        messageApi.error('加载错误，请稍后重试');
      }
    } catch (error) {
      console.log(error);
      messageApi.error('加载错误，请稍后重试');
    }
  };

  const fetchProcessNode = async (position: number) => {
    console.log(position);
  };

  const openShowNodeModal = async (pos: number) => {
    await fetchProcessNode(pos);
    setIsShowNodeModalOpen(true);
  };

  // 初始查询
  useEffect(() => {
    fetchTicketDetail();
  }, []);

  useEffect(() => {
    if (ticketDetail != nullTicketDetail) {
      const si: StepProps[] = ticketDetail.process.map((item) => {
        return {
          title: item.name,
          description: (
            <>
              {ticketDetail.cur > item.position ? (
                <Button
                  style={{ marginLeft: -15, marginTop: 10 }}
                  shape="round"
                  type="primary"
                  onClick={() => {
                    openShowNodeModal(item.position);
                  }}
                >
                  详情
                </Button>
              ) : (
                '等待中'
              )}
            </>
          ),
        };
      });
      setStepItem(si);
      fetchSignDetail(ticketDetail.ticket.id, ticketDetail.cur);
    }
  }, [ticketDetail]);

  const closeShowNodeModal = (): void => {
    setIsShowNodeModalOpen(false);
  };

  const openOperationLog = (): void => {
    setIsOperationLogModalOpen(true);
  };

  const closeOperationLog = (): void => {
    setIsOperationLogModalOpen(false);
  };

  // 签字保存
  const signSave = (): void => {
    signForm.node = ticketDetail.cur;
    signForm.ticketId = ticketDetail.ticket.id;
    signForm.status = 0;
    signForm.signer = '测试';
    fetchSignSave(signForm);
  };

  // 签字提交
  const signSubmit = (): void => {
    signForm.node = ticketDetail.cur;
    signForm.ticketId = ticketDetail.ticket.id;
    signForm.status = 1;
    signForm.signer = '测试';
    fetchSignSubmit(signForm);
  };

  // 需求单退回
  const signBack = (): void => {
    signForm.node = ticketDetail.cur;
    signForm.ticketId = ticketDetail.ticket.id;
    signForm.signer = '测试';
    fetchSignBack(signForm);
  };

  return (
    <Card>
      {contextHolder}
      <Descriptions title={`申请编号: ${ticketDetail.ticket.code}`} bordered>
        <Descriptions.Item label="申请处室">{ticketDetail.ticket.office}</Descriptions.Item>
        <Descriptions.Item label="申请时间">
          {dayjs(ticketDetail.ticket.createTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="涉及场站">
          {ticketDetail.ticket.involvedStation}
        </Descriptions.Item>
        <Descriptions.Item label="原因">{ticketDetail.ticket.reason}</Descriptions.Item>
      </Descriptions>
      <Card style={{ marginTop: 15 }}>流程进度</Card>
      <Card>
        <Steps current={ticketDetail.cur} status="process" items={stepItem} />
      </Card>
      {canReview && (
        <div style={{ marginTop: 15 }}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="审核人">程璐</Descriptions.Item>
              <br />
              <br />
              <Descriptions.Item label="处长意见">
                <TextArea
                  rows={4}
                  value={signForm.opinion}
                  onChange={({ target }) => {
                    handleSignDetailChange('opinion', target.value);
                  }}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
      {canApprove && (
        <div style={{ marginTop: 15 }}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="批准人签字">{'易建军'}</Descriptions.Item>
              <br />
              <Descriptions.Item label="审批意见">
                <TextArea
                  rows={4}
                  value={signForm.opinion}
                  onChange={({ target }) => {
                    handleSignDetailChange('opinion', target.value);
                  }}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
      {canEnergy && (
        <div style={{ marginTop: 15 }}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="新能源会签意见">
                <TextArea rows={4} />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
      {canSign && (
        <div style={{ marginTop: 15 }}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="审核人">韩玉辉</Descriptions.Item>
              <br />
              <br />
              <Descriptions.Item label="调度控制专业意见">
                <TextArea rows={4} />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
      {canReceive && (
        <div style={{ marginTop: 15 }}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="签收人">明德才</Descriptions.Item>
              <Descriptions.Item label="签收时间">{'2023-03-28 19:12:00'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
      <div style={{ marginTop: 15 }}>
        <Row justify={'center'} align="bottom" gutter={16}>
          {canReview && (
            <>
              <Col>
                <Button onClick={signSave} loading={signSaveBtn}>
                  签字
                </Button>
              </Col>
              <Col>
                <Button onClick={signSubmit} loading={signSubBtn}>
                  最终签字
                </Button>
              </Col>
            </>
          )}
          {canApprove && (
            <>
              <Col>
                <Button loading={signBackBtn} onClick={signBack}>
                  退回
                </Button>
              </Col>
              <Col>
                <Button loading={signSubBtn} onClick={signSubmit}>
                  批准
                </Button>
              </Col>
            </>
          )}
          {canEnergy && (
            <>
              <Col>
                <Button>提交</Button>
              </Col>
            </>
          )}
          {canSign && (
            <>
              <Col>
                <Button>签字</Button>
              </Col>
              <Col>
                <Button>最终签字</Button>
              </Col>
            </>
          )}
          {canReceive && (
            <>
              <Col>
                <Button>签收</Button>
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
          <Descriptions.Item label="会签意见">{'会签意见'}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </Card>
  );
};

export default TicketDetailModal;
