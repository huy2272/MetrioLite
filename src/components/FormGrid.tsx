import { Table, TableColumnsType, Tag } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";
import { Form } from "../types";

const columns: TableColumnsType<Form> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (value, { tags }) => (
      <>
        {tags.map((tag) => {
          return <Tag color="blue">{tag.name}</Tag>;
        })}
      </>
    ),
  },
  {
    dataIndex: "",
    key: "+",
    render: () => <a>Edit</a>,
  },
  {
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

const data: Form[] = [
  {
    id: 1,
    name: "Residual materials pick-ups (kg)",
    tags: [
      {
        name: "Type",
        choices: ["Waste", "Compost", "Recyclable", "Organic waste"],
      },
      { name: "Zone", choices: ["Residential", "Commercial", "Industrial"] },
    ],
  },
  {
    id: 2,
    name: "Public transport usage (Tickets)",
    tags: [{ name: "Type", choices: ["Bus", "Metro", "Train"] }],
  },
];

const FormGrid = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Form> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default FormGrid;
