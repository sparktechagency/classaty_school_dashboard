import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { IAssignment } from "../../types/AssignmentType";
import AssignmentTable from "../../ui/Tables/AssignmentTable";
import { useGetAssignmentQuery } from "../../redux/features/assignment/assignment";

const AssignmentPage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetAssignmentQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const AssignmentData: IAssignment[] = data?.data?.result;
  const AssignmentPagination = data?.data?.meta;

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Assignment
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseSearchInput
              placeholder="Search Assignment..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>
      </div>

      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AssignmentTable
          data={AssignmentData}
          loading={isFetching}
          setPage={setPage}
          page={page}
          total={AssignmentPagination?.total}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AssignmentPage;
