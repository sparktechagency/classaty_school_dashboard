interface ITeacherData {
  _id: string;
  name: string;
  phoneNumber: string;
  createdAt: string; // ISO date string
  schoolName: string;
  userId?: string;
  schoolAddress: string;
  image: string;
  status: string;
}
export type { ITeacherData };
