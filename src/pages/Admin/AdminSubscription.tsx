/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import SubscriptionCard from "../../Components/Dashboard/Subscription/SubscriptionCard";
import AddSubscriptionModal from "../../ui/Modal/Subscription/AddSubscriptionModal";
import UpdateSubscriptionModal from "../../ui/Modal/Subscription/UpdateSubscriptionModal";
import DeleteSubscriptionModal from "../../ui/Modal/Subscription/DeleteSubscriptionModal";

const subscription = [
  {
    name: "Plus",
    price: 1.9,
    duration: 30,
    currency: "KWD",
    features: [
      "Access for 1 student",
      "Basic features included",
      "Monthly progress reports",
    ],
  },
  {
    name: "Silver",
    price: 2.9,
    duration: 30,
    currency: "KWD",
    features: [
      "Unlimited students under 1 parent",
      "All Plus features included",
      "Priority support",
    ],
  },
  {
    name: "Gold",
    price: 3.9,
    duration: 30,
    currency: "KWD",
    features: [
      "Unlimited students under both parents",
      "All Silver features included",
      "Premium support",
    ],
  },
];

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | undefined>(
    undefined
  );

  //   const { data, isFetching } = useGetSubscriptionQuery();
  //   const subscription = data?.data;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showUpdateModal = (record: any) => {
    setCurrentRecord(record);
    setIsUpdateModalOpen(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCancelUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentRecord(undefined);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" min-h-screen py-4 px-4 sm:px-6 md:px-8 rounded-lg pb-20">
      <div className="w-full">
        {" "}
        <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl  text-secondary-color font-semibold">
            Subscription
          </h1>
          <Button
            type="primary"
            onClick={showModal}
            className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color !h-10 font-semibold border-none "
          >
            <GoPlus className="text-xl text-primary-color" />
            <p className="text-xs sm:text-lg py-3">Add subscription</p>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {/* {isFetching ? (
            <div>
              <Loading />
            </div>
          ) : ( */}
          {subscription?.map((sub, index) => (
            <SubscriptionCard
              key={index}
              sub={sub}
              showUpdateModal={showUpdateModal}
              showDeleteModal={showDeleteModal}
            />
          ))}
          {/* )} */}
        </div>
      </div>

      <AddSubscriptionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <UpdateSubscriptionModal
        isUpdateModalOpen={isUpdateModalOpen}
        handleCancelUpdateModal={handleCancelUpdateModal}
        currentRecord={currentRecord}
      />

      <DeleteSubscriptionModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCancelDeleteModal={handleCancelDeleteModal}
        currentRecord={currentRecord}
      />
    </div>
  );
}
