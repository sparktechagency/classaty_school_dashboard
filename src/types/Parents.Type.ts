interface IStudent {
  _id: string;
  userId: string;
  schoolId: string;
  classId: string;
  schoolName: string;
  className: string;
  section: string;
  fatherPhoneNumber: string;
  motherPhoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parentsMessage: string;
}

interface IStudentUser {
  _id: string;
  uid: string;
  name: string;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  studentId: string;
}

interface IParentDetails {
  _id: string;
  userId: string;
  childId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  student: IStudent;
  studentUser: IStudentUser;
}

interface ISubscriptionDetails {
  _id: string;
  planName: string;
  price: number;
  numberOfChildren: number;
  timeline: number;
  features: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number;
}

interface IParents {
  _id: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
  parents: IParentDetails;
  subscriptionDetails: ISubscriptionDetails;
}

export type { IParents, IParentDetails, ISubscriptionDetails };
