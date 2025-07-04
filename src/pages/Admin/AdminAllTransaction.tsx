import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import TransactionTable from "../../ui/Tables/TransactionTable";
import TransactionViewModal from "../../ui/Modal/Transactions/TransactionViewModal";
import { useGetEarningQuery } from "../../redux/features/earning/earningApi";
import { IEarning } from "../../types";

const AdminAllTransaction = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetEarningQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const EarningData: IEarning[] = data?.data?.result;
  const EarningPagination = data?.data?.meta;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IEarning | null>(null);

  const showViewUserModal = (record: IEarning) => {
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
        data={EarningData}
        loading={isFetching}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={EarningPagination?.total}
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
