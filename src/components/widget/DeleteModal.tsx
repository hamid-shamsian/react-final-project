import Modal from "../../components/common/Modal";
import Confirmation from "../../components/common/Confirmation";

interface DeleteModalProps {
  item: string;
  data: {
    open: boolean;
    id: string;
    name: string;
  };
  onConfirm: (id: string) => void;
  onCancel: () => void;
}

const DeleteModal = ({ item, data, onConfirm, onCancel }: DeleteModalProps) => {
  return (
    <Modal open={data.open} onClose={onCancel}>
      <Confirmation
        message={`آیا مطمئن هستید میخواهید ${item} "${data.name}" را حذف کنید؟`}
        confirmTerm='حذف شود'
        onConfirm={() => onConfirm(data.id)}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default DeleteModal;
