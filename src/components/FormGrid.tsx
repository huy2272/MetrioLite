import { Popconfirm, Table, TableColumnsType, Tag } from "antd";
import { ButtonType, Data, Form } from "../types";
import GridBtn from "./GridBtn";
import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "../api/api";
import moment from "moment";

const data: Data[] = [
  {
    id: 1,
    formId: 2,
    date: "2024-01-01",
    note: "hello",
    tags: { Type: "Waste", Zone: "Residential" },
    value: 130,
  },
  {
    id: 1,
    formId: 2,
    date: "2024-01-01",
    note: "hello",
    tags: { Type: "Waste", Zone: "Residential" },
    value: 130,
  },
];

const FormGrid = () => {
  const queryClient = useQueryClient();

  const { data: forms } = useQuery({
    queryKey: ["forms"],
    queryFn: api.formsAPI.getForms,
  });

  const formIds = forms?.map((form) => form.id);

  // Then get the form data
  const formData = useQueries({
    queries: formIds
      ? formIds.map<UseQueryOptions<Data[], Error>>((id) => {
          return {
            queryKey: ["data", id],
            queryFn: () => api.dataAPI.getDataByFormId(id),
          };
        })
      : [], // if formId is undefined returns empty array
  });

  const handleDelete = (id: React.Key) => {
    deleteFormMutation.mutate(id);
  };

  const deleteFormMutation = useMutation({
    mutationFn: api.formsAPI.deleteForm,
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });

  const columns: TableColumnsType<Form> = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "name",
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
      title: "Choices",
      key: "choices",
      dataIndex: "tag.choices",
      // Tags contain an arr of objects,
      // each object contain a choice attribute that contains an array of all possible choices
      render: (value, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <>
                {tag.choices.map((choice) => {
                  return (
                    <Tag key={choice} color="red">
                      {choice}
                    </Tag>
                  );
                })}
              </>
            );
          })}
        </>
      ),
    },
    {
      dataIndex: "",
      key: "+",
      render: (_, record: Form) => (
        <GridBtn type={ButtonType.Form} initVal={record} />
      ),
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

  const expandedRowRender = (record: Form) => {
    const dataColumns: TableColumnsType<Data> = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "date",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        key: "date",
      },
      {
        title: "formId",
        dataIndex: "formId",
        key: "formId",
      },
      {
        title: "value",
        dataIndex: "value",
        key: "value",
        sorter: {
          compare: (a, b) => a.value - b.value,
        },
      },
      {
        dataIndex: "",
        key: "+",
        render: (_, record: Data) => (
          <GridBtn type={ButtonType.Data} initVal={record} />
        ),
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
    const getDataArray = (formData: UseQueryResult<Data[], Error>[]) => {
      let dataArray: Data[] = [];
      // Destructuring formData
      formData.forEach((queryObj) => {
        queryObj.data?.forEach((dataId) => {
          if (dataId.formId == record.id) {
            dataArray.push(dataId);
          }
        });
      });
      return dataArray;
    };

    return (
      <Table
        columns={dataColumns}
        dataSource={getDataArray(formData)}
        pagination={false}
      />
    );
  };

  return (
    <>
      <GridBtn type={ButtonType.Form} />
      <GridBtn type={ButtonType.Data} />
      <Table
        rowKey={(record: Form) => record.id}
        expandable={{ expandedRowRender }}
        columns={columns}
        dataSource={forms}
      />
    </>
  );
};

export default FormGrid;
