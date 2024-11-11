declare module "next-auth" {
  user: {
    id: string;
    mobile: string;
    name: string;
    role: Array;
    isExaminer: boolean;
    isHallSuper: boolean;
    isInvigilator: boolean;
    accessToken: string;
  }
}
