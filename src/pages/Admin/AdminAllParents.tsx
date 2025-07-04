import { useState } from "react";
import { IParents } from "../../types/Parents.Type";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";

import AllParentsTable from "../../ui/Tables/ParentsTable";
import ParentsViewModal from "../../ui/Modal/Parents/ParentsViewModal";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import {
  useBlockUserMutation,
  useGetParentsQuery,
} from "../../redux/features/parents/parentsApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllParents = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetParentsQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const [blockParent] = useBlockUserMutation();
  const parentsData: IParents[] = data?.data?.result;
  const parentsPagination = data?.data?.meta;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IParents | null>(null);

  const showViewUserModal = (record: IParents) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: IParents) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: IParents) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (data: IParents) => {
    const res = await tryCatchWrapper(
      blockParent,
      {
        body: {
          userId: data?._id,
          action: "blocked",
        },
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (data: IParents) => {
    const res = await tryCatchWrapper(
      blockParent,
      {
        body: {
          userId: data?._id,
          action: "active",
        },
      },
      "Unblocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Parents List
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseSearchInput
              placeholder="Search Parent ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AllParentsTable
          data={parentsData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={parentsPagination?.total}
          limit={limit}
        />
      </div>
      <ParentsViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This Parent ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This Parent ?"
      />
    </div>
  );
};

export default AdminAllParents;
