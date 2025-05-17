import { Modal } from "antd";
import { ITransactionType } from "../../../types/TransactionType";
interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransactionType | null;
}
const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color text-center mb-5">
            Transaction Details
          </h1>
          <div className="text-lg text-center font-medium ">
            <div className="flex justify-start items-center gap-2 mb-2">
              <div className="font-bold text-gradient-color">Date: </div>
              <div className="text-secondary-color">{currentRecord?.date}</div>
            </div>

            <div className="flex justify-start items-center  gap-2 mb-2">
              <div className="font-bold text-gradient-color">User:</div>
              <div>{currentRecord?.name}</div>
            </div>

            <div className="flex justify-start items-center  gap-2 mb-2">
              <div className="font-bold text-gradient-color">Plan:</div>
              <div>{currentRecord?.plan}</div>
            </div>

            <div className="flex justify-start items-center  gap-2 mb-2">
              <div className="font-bold text-gradient-color">Amount:</div>
              <div className="text-justify pt-0 ">{currentRecord?.amount}</div>
            </div>
            <div className="flex justify-start items-center  gap-2 mb-2">
              <div className="font-bold text-gradient-color">
                Payment Method:
              </div>
              <div className="text-justify pt-0 ">Paypal</div>
            </div>
            <div className="flex justify-start items-center  gap-2 mb-2">
              <div className="font-bold text-gradient-color">
                Transaction ID:
              </div>
              <div className="text-justify pt-0 ">TXN012301</div>
            </div>

            <div className="flex justify-start items-center  gap-2 mb-2">
              <div className="font-bold text-gradient-color">Status:</div>
              <div className="text-justify pt-0 ">
                <span className="text-success-color">
                  {/* {currentRecord?.Status}  */}
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
