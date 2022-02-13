export const regExPatterns = {
  title: /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d]{3,20}$/gi,
};

export const validate = (regex: any, input: string | number) => {
  console.log(input);
  return regex.test(input);
};
