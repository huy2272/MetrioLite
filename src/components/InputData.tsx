import { useState } from "react";
import { TagOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import {
  CreateNewDataRequest,
  CreateNewFormRequest,
  Data,
  Tags,
} from "../types";
import TagInputForm from "./TagInputForm";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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

const InputData = (props: { initInputVal: Data }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const addDataMutation = useMutation({
    mutationFn: api.dataAPI.createNewDataInForm,
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const updateDataMutation = useMutation({
    mutationFn: api.dataAPI.updateDataInForm,
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const onFinish = (values: CreateNewDataRequest) => {
    console.log("Finish:", values);
    props.initInputVal
      ? updateDataMutation.mutate({ ...values, id: props.initInputVal.id })
      : addDataMutation.mutate(values);
  };

  const options: SelectProps["options"] = [];
  const zoneOptions: SelectProps["options"] = [];
  if (props.initInputVal) {
    options.push({
      label: props.initInputVal.tags.Type,
      value: props.initInputVal.tags.Type,
    });
    zoneOptions.push({
      label: props.initInputVal.tags.Zone,
      value: props.initInputVal.tags.Zone,
    });
  }

  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === "tagForm") {
          const { basicForm } = forms;
          // Data transformation for choices
          const customValue = { ...values, choices: values.choices.split(",") };
          const tags = basicForm.getFieldValue("tags") || [];
          basicForm.setFieldsValue({ tags: [...tags, customValue] });
          setOpen(false);
        }
      }}
    >
      <Form
        {...layout}
        name="basicForm"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={props.initInputVal}
      >
        <Form.Item name="formId" label="Form Id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Data date" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="value" label="Value" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* Create a hidden field to make Form instance record this */}
        <Form.Item name="tags" hidden />

        <Form.Item
          label="Tags"
          shouldUpdate={(prevValues, curValues) =>
            prevValues.tags !== curValues.tags
          }
          rules={[{ required: true }]}
        >
          {({ getFieldValue }) => {
            const tags: Tags = getFieldValue("tags") || [];
            return Object.keys(tags).length ? (
              <ul>
                <li className="tag-type">
                  <Space>
                    <Avatar icon={<TagOutlined />} />
                    {`Type: ${tags.Type}`}
                  </Space>
                </li>
                <li className="tag-zone">
                  <Space>
                    <Avatar icon={<TagOutlined />} />
                    {`Zone: ${tags.Zone}`}
                  </Space>
                </li>
              </ul>
            ) : (
              <Typography.Text className="ant-form-text" type="secondary">
                ( No tag yet. )
              </Typography.Text>
            );
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button
            htmlType="button"
            style={{ margin: "0 8px" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Tag
          </Button>
        </Form.Item>
      </Form>

      <TagInputForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Form.Provider>
  );
};

export default InputData;
