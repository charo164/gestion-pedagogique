export interface TeacherInfos {
  rank: string;
  specialization: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  teacher: TeacherInfos | null;
}
