/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetConversationListQuery } from "../../redux/features/conversation/conversationApi";
import { FadeLoader } from "react-spinners";
import ConversationChatListCard from "./ConversationChatListCard";
import { IConversation } from "../../types/conversation.type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectSelectedChatUser,
  setOnlineUsers,
} from "../../redux/features/conversation/conversationSlice";
import { useSocket } from "../../context/socket-context";

const ConversationChatList = ({ userData, onlineUsers }: any) => {
  const socket = useSocket()?.socket;
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const seletedConversation = useAppSelector(selectSelectedChatUser);
  const [chatList, setChatList] = useState<IConversation[]>([]);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetConversationListQuery(
      {
        searchTerm,
      },
      {
        skip: !userData?.userId,
      }
    );

  const handleNewMessage = useCallback((message: any) => {
    console.log({ message });
    // setChatList((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    console.log("🧠 Checking socket:", socket);

    if (!socket) {
      console.warn("❌ Socket not ready yet.");
      return;
    }

    socket.on("new_message", (message: any) => {
      console.log("📨 New Message Received from socket:", message);
    });
    socket.on("online_users", (online: any) => {
      console.log("Online Users:", online);
      dispatch(setOnlineUsers(online));
    });

    // const handleNewMessageSocket = (message: any) => {
    //   console.log("📨 New Message Received from socket:", message);
    // };

    return () => {
      socket.off("new_message", (message: any) => {
        console.log("📨 New Message Received from socket:", message);
      });
    };
  }, [dispatch, socket]);

  useEffect(() => {
    if (allChatList?.data?.result) {
      setChatList(allChatList?.data?.result);
    }
  }, [allChatList?.data?.result]);

  const filteredConversations = useMemo(() => {
    return chatList?.slice()?.sort((a: IConversation, b: IConversation) => {
      const dateA = new Date(a?.lastMessage?.updatedAt || 0).getTime();
      const dateB = new Date(b?.lastMessage?.updatedAt || 0).getTime();
      return dateB - dateA;
    });
  }, [chatList]);

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
