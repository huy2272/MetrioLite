import { Modal } from "antd";
import { ButtonType } from "../types";

type PopupProps = {
  type: ButtonType;
  isModalOpen: boolean | undefined;
  handleOk: () => void;
  handleCancel: () => void;
};

const Popup = (props: PopupProps) => {
  const { type, isModalOpen, handleOk, handleCancel } = props;
  return (
    <Modal
      title={type}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    ></Modal>
  );
};

export default Popup;
