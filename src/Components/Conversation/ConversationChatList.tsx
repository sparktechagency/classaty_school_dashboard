/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetConversationListQuery } from "../../redux/features/conversation/conversationApi";
import { FadeLoader } from "react-spinners";
import ConversationChatListCard from "./ConversationChatListCard";
import { IConversation } from "../../types/conversation.type";
import { useAppSelector } from "../../redux/hooks";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";

const ConversationChatList = ({ userData, onlineUsers }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const seletedConversation = useAppSelector(selectSelectedChatUser);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetConversationListQuery(
      {
        searchTerm,
      },
      {
        skip: !userData?.userId,
      }
    );

  const filteredConversations = allChatList?.data?.result
    ?.slice()
    ?.sort((a: IConversation, b: IConversation) => {
      const dateA = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`w-full lg:w-[400px] overflow-y-auto px-3 ${
        seletedConversation ? "hidden lg:block" : "block lg:block"
      }`}
    >
      <div className="sticky top-0 z-20   py-5 mb-3 !bg-primary-color">
        <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
          Messages
        </div>
        <Input
          placeholder="Search Conversations"
          prefix={<SearchOutlined className="text-[#F88D58] text-xl" />}
          className="!bg-[#EFEFEF] text-base-color mt-2 !py-3 !px-2 w-full"
          onChange={handleSearch}
        />
      </div>
      {isAllChatFeacthing ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#28314E" />
        </div>
      ) : (
        <div className="md:h-full h-fit mb-3">
          <div className=" text-gray-300 bg-white   ">
            {filteredConversations?.map((conversation: IConversation) => {
              // Compute the image source URL
              const imageUrlSrc = conversation?.otherUser?.image;

              // Return the JSX
              return (
                <ConversationChatListCard
                  key={conversation?._id}
                  conversation={conversation}
                  imageUrlSrc={imageUrlSrc}
                  onlineUsers={onlineUsers}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationChatList;
