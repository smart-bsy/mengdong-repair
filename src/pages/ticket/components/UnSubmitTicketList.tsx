import { Button, Col, Descriptions, Input, Modal, Popconfirm, Row, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import type { Ticket } from '../common/types';
import { getNullTicket } from '../common/types';
import TicketDetailModal from './TicketDetail';

export type TicketHandle = (ticket: Ticket) => void;

export type TicketHandleById = (id: number) => void;

const UnSubmitTicketList = (props: {
  ticketList: Ticket[];
  setTicketList: React.Dispatch<React.SetStateAction<Ticket[]>>;
  saveHandle: TicketHandle;
  submitHandle: TicketHandleById;
  deleteHandle: TicketHandleById;
}) => {
  const { ticketList, saveHandle, submitHandle, setTicketList, deleteHandle } = props;

  const [isShowTicketModalOpen, setIsShowTicketModalOpen] = useState<boolean>(false);
  const [isEditTicketModalOpen, setIsEditTicketModalOpen] = useState<boolean>(false);
  const [editTicketForm, setEditTicketForm] = useState<Ticket>(getNullTicket());

  const [curTicketId, setCurTicketId] = useState<number>(0);

  const [messageApi, contextHolder] = message.useMessage();

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [isSubmiting, setIsSubmiting] = useState<boolean[]>([]);

  useEffect(() => {
    if (ticketList?.length > 0) {
      setIsSubmiting(new Array<boolean>(ticketList.length));
    }
  }, [ticketList]);

  const openShowTicketModal = (id: number): void => {
    setCurTicketId(id);
    setIsShowTicketModalOpen(true);
  };

  const closeShowTicketModal = (): void => {
    setIsShowTicketModalOpen(false);
  };
  const openEditTicketModal = (id: number): void => {
    setEditTicketForm(
      ticketList.filter((item) => {
        return item.id == id;
      })[0],
    );
    setCurTicketId(id);
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

  const removeItem = (id: number) => {
    setTicketList((list) => {
      return list.filter((item) => {
        return item.id != id;
      });
    });
  };

  const submitTicket = async (id: number, index: number) => {
    try {
      setIsSubmiting((list) => {
        list[index] = true;
        return [...list];
      });
      await submitHandle(id);
      messageApi.success('提交成功');
      removeItem(id);
    } catch (error) {
      console.log(error);
      messageApi.error('提交失败');
    } finally {
      setIsSubmiting((list) => {
        list[index] = false;
        return [...list];
      });
    }
  };

  const deleteTicketHandler = async (id: number) => {
    try {
      await deleteHandle(id);
      messageApi.success('删除成功');
      removeItem(id);
    } catch (error) {
      console.log(error);
      messageApi.error('删除失败');
    }
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
      render: (id, record, index) => {
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
            <Col>
              <Button
                onClick={() => {
                  openEditTicketModal(id);
                }}
              >
                编辑
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  submitTicket(id, index);
                }}
                loading={isSubmiting[index]}
              >
                提交
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title={'删除该需求单'}
                onConfirm={() => {
                  deleteTicketHandler(id);
                }}
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

  const saveTicketHandler = async () => {
    try {
      setIsSaving(true);
      await saveHandle(editTicketForm);
      closeEditTicketModal();
      setTicketList((list) => {
        return list.map((item) => {
          if (item.id == editTicketForm.id) {
            item.reason = editTicketForm.reason;
            item.involvedStation = editTicketForm.involvedStation;
          }
          return { ...item };
        });
      });
      messageApi.success('保存成功');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Table columns={unSubmitColumns} dataSource={ticketList} />
      <Modal
        title="场站参数设置"
        open={isEditTicketModalOpen}
        width={1500}
        onCancel={closeEditTicketModal}
        footer={null}
      >
        <Descriptions title={`申请编号: ${editTicketForm.code}`} bordered>
          <Descriptions.Item label="申请处室">{editTicketForm.office}</Descriptions.Item>
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
                <Button type="primary" onClick={saveTicketHandler} loading={isSaving}>
                  保存
                </Button>
              </Col>
            </Row>
          </div>
        </Descriptions>
      </Modal>
      <Modal
        title="场站参数详情"
        open={isShowTicketModalOpen}
        onCancel={closeShowTicketModal}
        width={1500}
        footer={null}
      >
        <TicketDetailModal ticketId={curTicketId} canReview={false} />
      </Modal>
    </>
  );
};

export default UnSubmitTicketList;
