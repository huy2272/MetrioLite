import { Button } from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { ButtonType, Data, Form } from "../types";
import InputForm from "./InputForm";
import InputData from "./InputData";

type ButtonProps = {
  type: ButtonType;
  initVal?: Data | Form;
  formId?: React.Key;
};

const GridBtn = ({ type, initVal, formId }: ButtonProps) => {
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
        {initVal ? `Edit ${type}` : `Add ${type}`}
      </Button>
      <Modal
        title={type}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {type === ButtonType.Form ? (
          <InputForm initInputVal={initVal as Form} />
        ) : type === ButtonType.Data ? (
          <InputData initInputVal={initVal as Data} formId={formId!} />
        ) : (
          <>Incorrect Button Type</>
        )}
      </Modal>
    </>
  );
};

export default GridBtn;
