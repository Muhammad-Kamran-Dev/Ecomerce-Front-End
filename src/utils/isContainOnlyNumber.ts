export const isContainOnlyNumber = (str: string): boolean => {
  const regex = new RegExp(/[a-zA-Z!@#$%^&*(),.?":{}|<>\-]/g);
  return !regex.test(str);
};
