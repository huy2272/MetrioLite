import React, { useState } from "react";
import { TagOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Space, Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { CreateNewFormRequest } from "../types";
import TagInputForm from "./TagInputForm";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const addFormMutation = useMutation({
    mutationFn: api.formsAPI.createNewForm,
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });

  const onFinish = (values: CreateNewFormRequest) => {
    console.log("Finish:", values);
    addFormMutation.mutate(values);
  };

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
      >
        <Form.Item name="name" label="Form name" rules={[{ required: true }]}>
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

      <TagInputForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Form.Provider>
  );
};

export default App;
