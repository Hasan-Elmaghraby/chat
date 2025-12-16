import { User } from "../shared/types/user";

export const isUser = (value: unknown): value is User => {
  return typeof value === "object" && value !== null && "id" in value;
};
