export const policyApi = async () => {
  const response = await fetch(
    "https://d2c1b6nuxfp3ls.cloudfront.net/real-estate-policy/main?perPage=4"
  );
  const json = response.json();
  return json;
};

export const policyListApi = async (pageNum, num) => {
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/real-estate-policy/view/page/?pageNumber=${pageNum}&perPage=${num}`
  );
  const json = response.json();
  return json;
};

export const policyDetailApi = async (policyId) => {
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/real-estate-policy/view/page/detail/${policyId}`
  );
  const json = response.json();
  return json;
};
