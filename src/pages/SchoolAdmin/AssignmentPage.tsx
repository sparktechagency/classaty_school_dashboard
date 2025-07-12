import { useState } from "react";
import { useGetAllAssignmentQuery } from "../../redux/features/assignment/assignmentApi";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AssignmentTable from "../../ui/Tables/AssignmentTable";
 
const AssignmentPage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;
 
  const { data: assignmentData, isFetching } = useGetAllAssignmentQuery({
    page,
    limit,
    searchTerm: searchText,
  });
 
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
          data={assignmentData?.data?.result}
          loading={isFetching}
          setPage={setPage}
          page={page}
          total={assignmentData?.data?.meta.total}
          limit={limit}
        />
      </div>
    </div>
  );
};
 
export default AssignmentPage;