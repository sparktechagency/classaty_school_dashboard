interface ILastMessage {
  _id: string;
  conversationId: string;
  text_message: string;
  sender: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IConversationUser {
  _id: string;
  name: string;
  image: string;
}

interface IConversation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: ILastMessage;
  self: IConversationUser;
  otherUser: IConversationUser;
}

export type { ILastMessage, IConversationUser, IConversation };
