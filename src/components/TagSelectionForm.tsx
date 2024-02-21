import { useEffect, useRef } from "react";
import { Form, Input, Modal, Select, Typography } from "antd";
import type { GetRef, SelectProps } from "antd";
import { Tag } from "../types";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

type FormInstance = GetRef<typeof Form>;

interface ModalFormProps {
  open: boolean;
  onCancel: () => void;
  id: React.Key;
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({
  form,
  open,
}: {
  form: FormInstance;
  open: boolean;
}) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

const TagSelectionForm: React.FC<ModalFormProps> = ({ open, onCancel, id }) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({
    form,
    open,
  });

  const onOk = () => {
    form.submit();
  };

  const { data: formById } = useQuery({
    queryKey: ["formsById", id],
    queryFn: () => api.formsAPI.getFormById(id),
  });

  const getOptions = (tags?: Tag[]) => {
    const options: SelectProps["options"] = [];
    tags?.forEach((tag) => {
      options.push({
        label: `${tag.name}`,
        value: `${tag.name}`,
      });
    });
    return options;
  };

  const getChoices = (tags?: Tag[]) => {
    const choices: SelectProps["options"] = [];
    tags?.forEach((tag) => {
      tag.choices.forEach((choice) => {
        choices.push({
          label: `${choice}`,
          value: `${choice}`,
        });
      });
    });
    return choices;
  };

  return (
    <Modal title="Tag" open={open} onOk={onOk} onCancel={onCancel}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="tagForm"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.Item name="name" label="Tag Name" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={() => {}}
            options={getOptions(formById?.tags)}
          />
        </Form.Item>
        <Form.Item
          name="choices"
          label="Tag Choice"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={() => {}}
            options={getChoices(formById?.tags)}
          />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TagSelectionForm;
