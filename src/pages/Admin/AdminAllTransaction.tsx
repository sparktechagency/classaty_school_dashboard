import { useState } from "react";
import { TransactionsData } from "../../../public/data/TransactionsData";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { ITransactionType } from "../../types/TransactionType";
import TransactionTable from "../../ui/Tables/TransactionTable";
import TransactionViewModal from "../../ui/Modal/Transactions/TransactionViewModal";

const AdminAllTransaction = () => {
  const data: ITransactionType[] = TransactionsData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ITransactionType | null>(
    null
  );

  const showViewUserModal = (record: ITransactionType) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div
      className=" bg-primary-color rounded-xl p-4 min-h-[90vh]"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          All Transactions
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <TransactionTable
        data={data}
        loading={false}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={data.length}
        limit={limit}
      />
      <TransactionViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllTransaction;
