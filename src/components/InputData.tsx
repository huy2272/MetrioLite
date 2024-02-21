import { useState } from "react";
import { TagOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Space, Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { CreateNewDataRequest, Data } from "../types";
import TagSelectionForm from "./TagSelectionForm";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const InputData = (props: { initInputVal: Data; formId: React.Key }) => {
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
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

  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === "tagForm") {
          const { basicForm } = forms;

          // Data transformation
          const customValue = { [values.name]: values.choice };
          console.log("values", customValue);
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

        <Form.Item name="note" label="Notes">
          <TextArea />
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
            const tags: Array<{ name: string; choices: string }> =
              getFieldValue("tags") || [];
            return tags.length ? (
              <ul>
                {tags.map((tag: { name: string; choices: string }) => (
                  <li key={tag.name} className="tag">
                    <Space>
                      <Avatar icon={<TagOutlined />} />
                      {`${tag.name}: ${tag.choices}`}
                    </Space>
                  </li>
                ))}
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

      <TagSelectionForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        id={props.formId}
      />
    </Form.Provider>
  );
};

export default InputData;
