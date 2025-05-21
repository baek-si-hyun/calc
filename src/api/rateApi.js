export const depositRateApi = async () => {
  const response = await fetch("https://api.returnplus.kr/interest-rates/ir");
  const json = response.json();
  return json;
};

export const loanRateApi = async () => {
  const response = await fetch("https://api.returnplus.kr/interest-rates/loan");
  const json = response.json();
  return json;
};
