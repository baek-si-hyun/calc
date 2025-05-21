export const subscriptionApi = async () => {
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/real-estate-subscription/main`
  );
  const json = response.json();
  return json;
};

export const subscriptionListApi = async (year, month) => {
  const monthStr = String(month).padStart(2, "0");
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/real-estate-subscription/view/calendar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: String(year),
        month: monthStr,
      }),
    }
  );
  const json = response.json();
  return json;
};

export const subscriptionDetailApi = async (
  houseManageNo,
  plbancNo,
  houseSecd
) => {
  const response = await fetch(
    `https://d2c1b6nuxfp3ls.cloudfront.net/real-estate-subscription/view/detail?houseManageNo=${houseManageNo}&plbancNo=${plbancNo}&houseSecd=${encodeURIComponent(
      houseSecd
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = response.json();
  return json;
};
