/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Layout, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socket-context";
import {
  selectSelectedChatUser,
  setSelectedChatUser,
} from "../../redux/features/conversation/conversationSlice";
import { useGetConversationMessageListQuery } from "../../redux/features/conversation/conversationApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import { FadeLoader } from "react-spinners";
import ConversationMessageCard from "./ConversationMessageCard";
import ConversationSendMessage from "./ConversationSendMessage";
import { IConversation } from "../../types/conversation.type";

const ConversationMessage = ({ userData, onlineUsers }: any) => {
  const imageUrl = getImageUrl();
  const socket = useSocket()?.socket;
  const dispatch = useDispatch();
  const selectedConversation = useSelector(selectSelectedChatUser);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 100;

  // Query with conditional param to skip fetching if no conversation selected
  const {
    data: allMessages,
    isFetching: isAllMessageFetching,
    refetch,
  } = useGetConversationMessageListQuery(
    selectedConversation?._id
      ? { id: selectedConversation._id, page, limit }
      : undefined
  );

  // Reset page and messages, then refetch on conversation change
  useEffect(() => {
    if (!selectedConversation?._id) return;

    setPage(1);
    setMessages([]);

    // Small timeout to avoid race conditions
    setTimeout(() => {
      refetch();
    }, 0);
  }, [selectedConversation?._id, refetch]);

  // Scroll to bottom on messages or conversation change
  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
    });
  }, [messages, selectedConversation?._id]);

  // Append older messages or replace messages depending on page number
  useEffect(() => {
    if (!allMessages?.data) return;

    const container = messagesContainerRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;

    setMessages((prev) => {
      if (page === 1) {
        // Replace messages on first page or conversation change
        return allMessages.data.result;
      } else {
        // Prepend older messages on pagination, avoid duplicates by filtering
        const newMessages = allMessages.data.result.filter(
          (msg: any) => !prev.some((p) => p._id === msg._id)
        );
        return [...newMessages, ...prev];
      }
    });

    // Maintain scroll position after prepending older messages
    setTimeout(() => {
      if (container) {
        const newScrollHeight = container.scrollHeight;
        if (page === 1) {
          // Scroll to bottom for new conversation or first page
          container.scrollTop = newScrollHeight;
        } else {
          // Maintain scroll position after loading older messages
          container.scrollTop = newScrollHeight - prevScrollHeight;
        }
      }
    }, 100);
  }, [allMessages, page]);

  // Infinite scroll: fetch older messages when scroll to top
  useEffect(() => {
    const handleScroll = () => {
      const container = messagesContainerRef.current;
      if (!container || isAllMessageFetching) return;

      if (container.scrollTop === 0) {
        if (
          allMessages?.data?.meta?.totalPage &&
          page < allMessages.data.meta.totalPage
        ) {
          setPage((prev) => prev + 1);
        }
      }
    };

    const container = messagesContainerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [isAllMessageFetching, allMessages, page]);

  // Handle incoming socket message by appending to messages
  const handleMessage = useCallback(
    (message: any) => {
      setMessages((prev) => [...prev, message]);
    },
    [setMessages]
  );

  // Setup socket listeners for online users, typing, and receiving messages
  useEffect(() => {
    const roomId = selectedConversation?._id;
    if (!roomId || !socket) return;

    socket.emit("join", roomId.toString());

    socket.on(`receive_message::${roomId}`, handleMessage);

    return () => {
      socket.off(`receive_message::${roomId}`);
      socket.off("new_message");
      socket.emit("leave", roomId);
    };
  }, [socket, selectedConversation?._id, handleMessage]);

  // Sort messages by createdAt ascending
  const convertnewMessageFirst = [...messages].sort(
    (a: IConversation, b: IConversation) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div
      className={`w-full overflow-y-auto ${
        selectedConversation ? "block lg:block" : "hidden lg:block"
      }`}
    >
      {selectedConversation ? (
        <Layout
          className={`py-6 px-2 !bg-[#FFFAF5] lg:col-span-3 xl:col-span-4 h-full`}
        >
          {/* Header */}
          <div className="!bg-[#FFFFFF] p-2 lg:p-4 border-b-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center mr-2">
                <MdOutlineArrowBackIosNew
                  onClick={() => dispatch(setSelectedChatUser(null))}
                  className="text-2xl cursor-pointer text-[#F88D58] "
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  loading="lazy"
                  className="h-12 w-12 object-cover rounded-full"
                  src={`${imageUrl}/${selectedConversation?.otherUser?.image}`}
                  alt="Profile"
                />
                <div>
                  <span className="font-bold text-base sm:text-lg lg:text-xl flex items-center gap-1">
                    {selectedConversation?.otherUser?.name}
                    <Tooltip title="Online">
                      {onlineUsers.includes(
                        selectedConversation?.otherUser?._id
                      ) && (
                        <div className="size-2 rounded-full bg-green-500"></div>
                      )}
                    </Tooltip>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message List */}
          <Content className="bg-white flex flex-col gap-5 relative">
            <div className="h-full flex flex-col justify-end">
              <Card
                className="!border-0 !pb-5 overflow-y-auto border-none h-full overflow-x-hidden"
                ref={messagesContainerRef}
              >
                {isAllMessageFetching ? (
                  <div className="flex justify-center items-end h-[70vh] ">
                    <FadeLoader />
                  </div>
                ) : (
                  convertnewMessageFirst.map((msg, i) => (
                    <ConversationMessageCard
                      key={msg._id ?? i}
                      msg={msg}
                      userData={userData}
                      imageUrl={imageUrl}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </Card>
            </div>

            {selectedConversation && (
              <ConversationSendMessage socket={socket} userData={userData} />
            )}
          </Content>
        </Layout>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 h-full">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#EFEFEF] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-secondary-color"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Welcome to Messages
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Select a conversation from the sidebar to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationMessage;
