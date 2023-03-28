import { Card, Table } from 'antd';
import { OperationLog } from '../common/types';
import type { ColumnsType } from 'antd/es/table';

const OperationLogList = (props: { logs: OperationLog[] }) => {
  const operationLogColumns: ColumnsType<OperationLog> = [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '具体内容',
      dataIndex: 'content',
      key: 'content',
    },
  ];

  return (
    <Card>
      <Table columns={operationLogColumns} dataSource={props.logs} />
    </Card>
  );
};

export default OperationLogList;
