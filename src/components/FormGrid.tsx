import { Modal, Popconfirm, Table, TableColumnsType, Tag } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";
import { ButtonType, Form } from "../types";
import GridBtn from "./GridBtn";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "../api/api";

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

  const queryClient = useQueryClient();
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Form> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (id: React.Key) => {
    deleteFormMutation.mutate(id);
  };

  const {
    isLoading,
    isError,
    data: forms,
  } = useQuery({
    queryKey: ["forms"],
    queryFn: api.formsAPI.getForms,
  });

  const updateFormMutation = useMutation({
    mutationFn: api.formsAPI.updateForm,
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });

  const deleteFormMutation = useMutation({
    mutationFn: api.formsAPI.deleteForm,
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });

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
            return (
              <Tag key={tag.name} color="blue">
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      dataIndex: "",
      key: "+",
      render: () => <GridBtn type={ButtonType.Edit} />,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: { id: React.Key }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.id)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <GridBtn type={ButtonType.Add} />
      <Table rowSelection={rowSelection} columns={columns} dataSource={forms} />
    </>
  );
};

export default FormGrid;
