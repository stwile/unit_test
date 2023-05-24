const UserType = {
  Customer: 1,
  Employee: 2,
} as const;

export { UserType };
export type UserType = (typeof UserType)[keyof typeof UserType];
