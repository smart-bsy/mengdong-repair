import { OperationLog, Ticket, TicketDetail } from './types';

export const mockUnSubmitTicketList: Ticket[] = [
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
];
export const mockSubmitTicketList: Ticket[] = [
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
];
export const mockDoingTicketList: Ticket[] = [
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
  {
    id: 1,
    code: 'XQD-2021-0002',
    office: '调度',
    applicant: '张三',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
    status: '审批、批准、新能源、调度、调度接收',
  },
];

export const mockTicketDetail: TicketDetail = {
  ticket: {
    id: 'XQD-2021-0004',
    department: '调度3',
    owner: '王五',
    createTime: 1679878948000,
    involvedStation: '测试',
    reason: '测试一下',
    opinion: '',
  },
  user: {
    id: 1,
    name: '王麻子',
    role: '职员',
  },
  processes: [
    {
      id: 1,
      principal: {
        id: 2,
        name: '李四',
        role: '负责人',
      },
      status: 1,
      result: 1,
    },
    {
      id: 2,
      principal: {
        id: 3,
        name: '张五',
        role: '主任',
      },
      status: 1,
      result: 1,
    },
    {
      id: 3,
      principal: {
        id: 3,
        name: '王二',
        role: '科长',
      },
      status: 0,
      result: 0,
    },
    {
      id: 4,
      principal: {
        id: 4,
        name: '赵六',
        role: 'CEO',
      },
      status: 0,
      result: 0,
    },
  ],
};
export const mockOperationLogs: OperationLog[] = [
  { id: 1, content: '操作日志1' },
  { id: 2, content: '操作日志2' },
  { id: 3, content: '操作日志3' },
];
