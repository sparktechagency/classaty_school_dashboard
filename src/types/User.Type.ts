type TRole =
  | "admin"
  | "supperAdmin"
  | "school"
  | "teacher"
  | "parents"
  | "student";

type TStatus = "active" | "blocked";

interface IUser {
  uid: string;
  studentId?: string;
  parentsId?: string;
  schoolId: string;
  teacherId: string;
  phoneNumber: string;
  name: string;
  image: string;
  role: TRole;
  status: TStatus;
  isDeleted: boolean;
  relation: "father" | "mother";
}

export type { TRole, TStatus, IUser };
