export const newApi = async () => {
  const response = await fetch(
    "https://d2c1b6nuxfp3ls.cloudfront.net/news/main?perPage=4"
  );
  const json = response.json();
  return json;
};

export const newListApi = async (pageNum, num) => {
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/news/view/page/?pageNumber=${pageNum}&perPage=${num}`
  );
  const json = response.json();
  return json;
};

export const newDetailApi = async (newId) => {
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/news/view/page/detail/${newId}`
  );
  const json = response.json();
  return json;
};
