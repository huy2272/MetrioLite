import { Button } from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { ButtonType, Form } from "../types";
import InputForm from "./InputForm";

type ButtonProps = {
  type: ButtonType;
};

const GridBtn = ({ type }: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          marginBottom: 16,
          display: "block",
          marginLeft: "auto",
          marginRight: 0,
        }}
      >
        {type}
      </Button>
      <Modal
        title={type}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputForm />
      </Modal>
    </>
  );
};

export default GridBtn;
