export enum AccountType {
  MODERATOR = "moderator",
  ADMIN = "admin",
  DEBATER = "debater",
}

export interface User {
  accountType: AccountType;
  chapter: string;
  email: string;
  name: string;
}
