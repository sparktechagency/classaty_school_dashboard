import { ISubscriptionDetails } from "./Parents.Type";

interface IUser {
  _id: string;
  uid: string;
  phoneNumber: string;
  role: "parents" | string;
  status: "active" | "inactive" | string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  parentsId: string;
  relation: string;
  name: string;
  image: string;
}

interface IEarning {
  _id: string;
  subscriptionId: string;
  userId: string;
  paymentType: "card" | "cash" | "bank" | string;
  amount: number;
  paymentDate: string;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  user: IUser;
  subscription: ISubscriptionDetails;
}

export type { IEarning };
