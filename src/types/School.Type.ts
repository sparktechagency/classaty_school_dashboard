interface ISchool {
  _id: string;
  userId: string;
  schoolName: string;
  schoolAddress: string;
  adminName: string;
  schoolImage: string;
  coverImage: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string;
  __v: number;
}

interface ISchoolDetails {
  _id: string;
  phoneNumber: string;
  createdAt: string;
  school: ISchool;
  teachers: number;
  students: number;
  parents: number;
}

export type { ISchool, ISchoolDetails };
