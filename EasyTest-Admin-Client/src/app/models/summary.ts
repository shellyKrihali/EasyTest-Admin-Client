import { Course } from "./course";
import { CourseAppearance } from "./courseAppearance";
import { User } from "./user";

export class Summary {
  title: string;
  uploadDate: Date;
  pathUrl: string;
  owner: User;
  courseAppearance: string;
  usersRank: [{ user: User, rank: number }];
  rank: number;
  _id: string;
}