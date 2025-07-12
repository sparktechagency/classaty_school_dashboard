/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Layout, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socket-context";
import {
  selectSelectedChatUser,
  selectTypingUser,
  setOnlineUsers,
  setSelectedChatUser,
  setTypingUser,
} from "../../redux/features/conversation/conversationSlice";
import { useGetConversationMessageListQuery } from "../../redux/features/conversation/conversationApi";
import { useAppSelector } from "../../redux/hooks";
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
  const [messages, setMessages] = useState<any>([]);

  console.log("messages", messages);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  });

  const {
    data: allMessages,
    isFetching: isAllMessageFetching,
    refetch,
  } = useGetConversationMessageListQuery(
    { id: selectedConversation?._id },
    {
      skip: !selectedConversation?._id,
    }
  );
  useEffect(() => {
    // if (selectedConversation?._id) {
    //   refetch();
    // }
    if (allMessages?.data) {
      setMessages(allMessages?.data?.result);
    }
  }, [allMessages, refetch, selectedConversation?._id]);

  const handleMessage = useCallback(
    (message: any) => {
      console.log("message", message);
      setMessages((prev: any) => [...prev, message]);
    },
    [setMessages]
  );

  useEffect(() => {
    const roomId = selectedConversation?._id;
    socket?.emit("join", roomId?.toString());
    socket?.on("online_users", (online: any) => {
      console.log("online-users-updated", online);
      dispatch(setOnlineUsers(online));
    });
    if (selectedConversation?._id && socket) {
      socket?.on(`typing::${selectedConversation?._id}`, (typing: any) => {
        dispatch(setTypingUser(typing));
      });
      socket?.on(
        `receive_message::${selectedConversation?._id}`,
        handleMessage
      );
    }

    return () => {
      socket?.off(`receive_message::${selectedConversation?._id}`);
      socket?.emit("leave", roomId);
    };
  }, [socket, selectedConversation?._id, dispatch, handleMessage]);

  const typingUsers = useAppSelector(selectTypingUser);
  console.log("typingUsers", typingUsers);

  const convertnewMessageFirst = [...(messages || [])].sort(
    (a: IConversation, b: IConversation) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  console.log("convertnewMessageFirst", convertnewMessageFirst);

  return (
    <div
      className={`w-full overflow-y-auto  ${
        selectedConversation ? "block lg:block" : "hidden lg:block"
      }`}
    >
      {selectedConversation ? (
        <Layout
          className={`py-6 px-2 !bg-[#FFFAF5] lg:col-span-3 xl:col-span-4 h-full`}
        >
          {/* Header Part */}
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
                  className="h-12 w-12 lg:h-12 lg:w-12 object-cover rounded-full relative"
                  src={`${imageUrl}/${selectedConversation?.otherUser?.image}`}
                  width={100}
                  height={100}
                  alt="Profile"
                />
                <div>
                  <div className="flex justify-center gap-2">
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
                      {/* {typingUser?.message} */}
                      {/* <span className="text-xs lg:text-sm h-fit">
                        {selectedConversation?.user}
                      </span> */}
                    </div>
                  </div>
                  {/* <p>
                    {typingUsers?.writeId !== userData?.userId &&
                      typingUsers?.message}
                  </p> */}
                </div>
              </div>
            </div>

            {/* {selectedConversation?.isGroupChat ? (
              <div>
                <Dropdown overlay={leaveMenu} trigger={["click"]}>
                  <BsThreeDotsVertical className="text-2xl cursor-pointer text-[#F88D58]" />
                </Dropdown>
              </div>
            ) : (
              <div>
                <Dropdown overlay={blockMenu} trigger={["click"]}>
                  <BsThreeDotsVertical className="text-2xl cursor-pointer text-[#F88D58]" />
                </Dropdown>
              </div>
            )} */}
          </div>

          {/* message Part  */}
          <Content className="bg-white flex flex-col gap-5 rounded-none relative ">
            <div className="h-full flex flex-col justify-end">
              <Card
                className="!border-0 !pb-14 overflow-y-auto border-none h-full overflow-x-hidden"
                ref={messagesContainerRef}
              >
                {isAllMessageFetching ? (
                  <div className="mx-auto w-[80vw] flex justify-center items-center h-full">
                    <FadeLoader className="h-full" />
                  </div>
                ) : (
                  convertnewMessageFirst?.map((msg, i) => (
                    <ConversationMessageCard
                      key={i}
                      msg={msg}
                      userData={userData}
                      imageUrl={imageUrl}
                    />
                  ))
                )}

                {/* Add this div for the scroll target */}
                <div ref={messagesEndRef}></div>
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
              Select a conversation from the sidebar to start messaging. Connect
              with your colleagues and friends seamlessly.
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center px-4 py-2 bg-secondary-color/10 text-secondary-color rounded-full text-sm font-medium">
                💬 Select a conversation to view messages
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationMessage;
