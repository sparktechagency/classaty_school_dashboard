/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button } from "antd";
import { GoPlus } from "react-icons/go";
import Accordion from "../../../ui/Accordion";
import AddFAQ from "../../../ui/Modal/FAQ/AddFAQ";
import UpdateFAQ from "../../../ui/Modal/FAQ/UpdateFAQ";

// Define the structure of each FAQ
interface FAQ {
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
  },
  {
    question: "How does the matching algorithm work?",
    answer:
      "Our algorithm uses preferences, interests, and location data to suggest the best matches for you.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we use industry-standard encryption and security measures to keep your data safe.",
  },
  {
    question: "How can I delete my account?",
    answer:
      "You can request account deletion in the settings under 'Account Preferences' or contact our support team.",
  },
  {
    question: "Why am I not receiving notifications?",
    answer:
      "Ensure notifications are enabled in both your app settings and phone settings. Try restarting the app.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, debit cards, PayPal, and Google Pay.",
  },
  {
    question: "Can I change my subscription plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime in the subscription settings.",
  },
  {
    question: "How do I report a user?",
    answer:
      "You can report a user by visiting their profile and clicking on 'Report User' at the bottom.",
  },
  {
    question: "Can I use the app on multiple devices?",
    answer:
      "Yes, you can log in to multiple devices using the same account credentials.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via email at support@example.com or through the in-app help center.",
  },
];

const FAQSection = () => {
  const [isFaqModalOpen, setIsFaqModalOpen] = useState<boolean>(false);
  const [isFaqUpdateModalOpen, setIsFaqUpdateModalOpen] =
    useState<boolean>(false);
  const [isFaqDeleteModalOpen, setIsFaqDeleteModalOpen] =
    useState<boolean>(false);
  console.log(isFaqDeleteModalOpen);
  const [currentRecord, setCurrentRecord] = useState<FAQ | null>(null);

  // Open Add FAQ modal
  const showFaqModal = () => {
    setIsFaqModalOpen(true);
  };

  // Open Update FAQ modal
  const showFaqUpdateModal = (record: FAQ) => {
    setCurrentRecord(record);
    setIsFaqUpdateModalOpen(true);
  };

  // Open Delete FAQ modal
  const showFaqDeleteModal = (record: FAQ) => {
    setCurrentRecord(record);
    setIsFaqDeleteModalOpen(true);
  };

  // Close Update FAQ modal
  const handleCancelFaqUpdateModal = () => {
    setIsFaqUpdateModalOpen(false);
    setCurrentRecord(null);
  };

  // Close Delete FAQ modal

  return (
    <div className="min-h-[88vh] bg-primary-color py-4 px-4 rounded-lg">
      <div>
        <div className="w-full sm:w-[90%] mt-10 mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
            <h1 className="text-3xl lg:text-4xl text-base-color font-semibold">
              FAQ
            </h1>
            <Button
              type="primary"
              onClick={showFaqModal}
              className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color h-10 font-semibold border-none"
            >
              <GoPlus className="text-xl text-primary-color" />
              <p className="text-xs sm:text-lg py-3">Add FAQ</p>
            </Button>
          </div>

          <div>
            {faqData.map((item, index) => (
              <Accordion
                key={index}
                item={item}
                isEditing={true}
                num={index + 1}
                className=""
                showFaqUpdateModal={showFaqUpdateModal}
                showFaqDeleteModal={showFaqDeleteModal}
              />
            ))}
          </div>
        </div>
      </div>
      {isFaqModalOpen && (
        <AddFAQ
          isFaqModalOpen={isFaqModalOpen}
          setIsFaqModalOpen={setIsFaqModalOpen}
        />
      )}
      {isFaqUpdateModalOpen && currentRecord && (
        <UpdateFAQ
          isFaqUpdateModalOpen={isFaqUpdateModalOpen}
          handleCancelFaqUpdateModal={handleCancelFaqUpdateModal}
          currentRecord={currentRecord}
        />
      )}
      {/* Uncomment when Delete FAQ modal is available */}
    </div>
  );
};

export default FAQSection;
