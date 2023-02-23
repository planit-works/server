export const createRandomNumber = (
  digit: number,
  isNumber = true,
): number | string => {
  const randomNumber = Math.floor(Math.random() * Math.pow(10, digit));
  return isNumber ? randomNumber : randomNumber.toString();
};
