"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Card, Input, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaTelegramPlane } from "react-icons/fa";
import { AllImages } from "../../../public/images/AllImages";
import { VscAttach } from "react-icons/vsc";

const { Header, Content, Sider } = Layout;

interface Message {
  id: number;
  text: string;
  sender: string;
  senderRole: "user" | "admin";
  unread: boolean;
}

interface Conversation {
  id: number;
  user: string;
  lastMessageTime: string;
  senderRole: "user" | "admin";
  messages: Message[];
}

const AdminMessage: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      user: "Alice",
      lastMessageTime: "10:30 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "How are you?",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "I'm fine, thanks!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 2,
      user: "Bob",
      lastMessageTime: "11:15 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hi!",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "How's it going?",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 3,
          text: "Pretty good, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 3,
      user: "Charlie",
      lastMessageTime: "09:45 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hey!",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "Long time no see.",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "Indeed!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 4,
      user: "David",
      lastMessageTime: "08:50 AM",
      senderRole: "admin",
      messages: [
        {
          id: 1,
          text: "Good morning!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Good morning to you too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Have a nice day!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 5,
      user: "Eve",
      lastMessageTime: "10:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "How are you?",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "I'm good. You?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Doing well, thanks!",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 6,
      user: "Frank",
      lastMessageTime: "11:30 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "See you later!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Sure, bye!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Take care!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
      ],
    },
    {
      id: 7,
      user: "Grace",
      lastMessageTime: "09:20 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Bye!",
          sender: "Grace",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "See you!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Catch you later!",
          sender: "Grace",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 8,
      user: "Hank",
      lastMessageTime: "08:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "What's up?",
          sender: "Hank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Not much, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Same here.",
          sender: "Hank",
          senderRole: "user",
          unread: false,
        },
      ],
    },
    {
      id: 9,
      user: "Ivy",
      lastMessageTime: "09:10 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello again!",
          sender: "Ivy",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "Hi Ivy!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "How have you been?",
          sender: "Ivy",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 10,
      user: "Jack",
      lastMessageTime: "11:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Long time no see!",
          sender: "Jack",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Indeed, how have you been?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Busy, but good.",
          sender: "Jack",
          senderRole: "user",
          unread: false,
        },
      ],
    },
    {
      id: 11,
      user: "Kate",
      lastMessageTime: "12:45 PM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello Kate!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Hey, what's up?",
          sender: "Kate",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "Not much, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 12,
      user: "Leo",
      lastMessageTime: "01:30 PM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hi Leo!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Hey there!",
          sender: "Leo",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "How's it going?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 13,
      user: "Mia",
      lastMessageTime: "02:15 PM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello Mia!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        { id: 2, text: "Hi!", sender: "Mia", senderRole: "user", unread: true },
        {
          id: 3,
          text: "How are you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 14,
      user: "Nick",
      lastMessageTime: "03:00 PM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hey Nick!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Hello!",
          sender: "Nick",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "What's new?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 15,
      user: "Olivia",
      lastMessageTime: "03:45 PM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hi Olivia!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Hey!",
          sender: "Olivia",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "How have you been?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
  ]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Layout
        className="!bg-[#FFFFFF] !overflow-hidden"
        style={{ height: "88vh" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                siderBg: "rgb(255, 255, 255)",
              },
              Menu: {
                iconSize: 24,
                itemActiveBg: "#ffffff",
                itemHoverColor: "#000000",
                itemColor: "#000000",
                itemSelectedBg: "#DFEFFA",
                itemSelectedColor: "#000000",
                subMenuItemBg: "#F9FAFB11",
              },
            },
          }}
        >
          <Layout className="!bg-[#FFFFFF]">
            <Sider
              width={350}
              trigger={null}
              breakpoint="lg"
              collapsedWidth={0}
              className="!bg-[#FFFFFF]  duration-200"
            >
              <div className="sticky top-0 z-20 !bg-[#FFFFFF] py-5">
                <div className="flex justify-between items-center  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold py-[16px] border-b border-b-[#28314E33]">
                  Messages
                </div>
                <div className="px-2">
                  <Input
                    placeholder="Search Conversations"
                    prefix={<SearchOutlined />}
                    className="!text-lg text-secondary-color mt-2 !py-2.5 px-2 w-full !bg-[#EFEFEF] !border-[#EFEFEF] rounded-lg"
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                </div>
              </div>
              <div className="md:h-full h-fit !overflow-y-auto">
                <Menu mode="vertical" className="!pb-44">
                  {filteredConversations.map((conversation) => (
                    <Menu.Item
                      key={conversation.id}
                      onClick={() => handleConversationSelect(conversation)}
                      className="py-10 !rounded border-b border-gray-200 bg-[#FFFFFF] text-black"
                    >
                      <div className="-mt-6 flex justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            className="rounded aspect-square h-12 w-fit object-cover relative"
                            src={AllImages.profile}
                            alt="Profile"
                          />
                          <div>
                            <div className="text-xl">{conversation.user}</div>
                            <div className="text-sm">Okay, I got you</div>
                          </div>
                        </div>
                        <div className="text-sm">
                          {conversation.lastMessageTime}
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
            </Sider>
            <div className="!bg-[#28314E33] h-full w-[1px]" />
            <Layout className="p-6 pl-0 !bg-[#FFFFFF]">
              <Header className="!bg-[#FFFFFF] flex items-center justify-between border-b border-b-[#28314E33] !px-5">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-10 w-10 relative"
                      src={AllImages.profile}
                      alt="Profile"
                    />
                    <p className="font-bold text-base sm:text-lg lg:text-lg">
                      {selectedConversation?.user}
                      <div className="text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#68D391] rounded-full"></span>
                        <span>Online</span>
                      </div>
                    </p>
                  </div>
                </div>
              </Header>
              <Content className="bg-white flex flex-col gap-5 rounded-none relative">
                {selectedConversation ? (
                  <div className="h-full flex flex-col justify-end">
                    <Card className="!border-0 !pb-14 overflow-y-auto border-none">
                      {selectedConversation.messages.map((msg) => (
                        <div key={msg.id}>
                          <p
                            className={`py-1 px-3 my-2 rounded-md ${
                              msg.sender === "You"
                                ? "w-fit ml-auto text-right text-white bg-[#28314E]"
                                : "w-fit text-left text-base-color bg-[#F1F1F1]"
                            }`}
                          >
                            {msg.text}
                          </p>
                          <div
                            className={`flex items-center gap-2 w-full ${
                              msg.sender === "You"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <p
                              className={`font-bold text-xs ${
                                msg.sender === "You"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {msg.sender}
                            </p>
                            <p
                              className={`font-bold text-xs text-secondary-color ${
                                msg.sender === "You"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              10:40 AM
                            </p>
                          </div>
                        </div>
                      ))}
                    </Card>
                  </div>
                ) : (
                  <div className="text-center h-full mt-16 text-secondary-color">
                    Select a conversation to view messages
                  </div>
                )}

                {selectedConversation && (
                  <div className="w-full !bg-white">
                    <div className="absolute -bottom-5 flex justify-center items-center w-full ">
                      <div className="w-full bg-white px-4 flex items-center space-x-2">
                        {/* Emoji Icon */}
                        <div>
                          <VscAttach className="cursor-pointer text-white bg-[#28314E] rounded-full p-2 text-4xl" />
                        </div>
                        {/* Input Field */}
                        <Input
                          placeholder="Send your message..."
                          className="border-none focus:ring-0 outline-none !bg-transparent text-black !text-lg"
                        />
                      </div>
                      <div>
                        <FaTelegramPlane className="cursor-pointer text-white bg-[#28314E] rounded-full p-2 text-4xl" />
                      </div>
                    </div>
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
        </ConfigProvider>
      </Layout>
    </div>
  );
};

export default AdminMessage;
