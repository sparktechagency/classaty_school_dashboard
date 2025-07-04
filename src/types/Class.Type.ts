interface IClass {
  _id: string;
  levelId: string;
  schoolId: string;
  className: string;
  levelName: string;
  section: string[]; // e.g., ["A / B / C"]
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type { IClass };
