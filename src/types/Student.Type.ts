interface ISchool {
  _id: string;
  userId: string;
  schoolName: string;
  schoolAddress: string;
  adminName: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  schoolImage: string;
  coverImage: string;
}

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
  __v?: number;
  school: ISchool;
}

interface IStudentData {
  _id: string;
  name: string;
  image: string;
  phoneNumber: string;
  status: string;
  student: IStudent;
}

export type { IStudentData };
