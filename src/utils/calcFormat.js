export const calcDateFormat = () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const createdAt = `${yy}.${mm}.${dd} ${hh}:${min}`;
  return createdAt;
};

export const formatKoreanCurrency = (amount) => {
  if (isNaN(amount) || amount === 0) return "0원";

  const units = [
    { value: 1e12, symbol: "조" },
    { value: 1e8, symbol: "억" },
    { value: 1e4, symbol: "만원" },
  ];

  let result = "";
  let remaining = amount;

  for (let i = 0; i < units.length; i++) {
    const unitValue = units[i].value;
    if (amount >= unitValue) {
      const unitAmount = Math.floor(remaining / unitValue);
      result += `${unitAmount.toLocaleString()}${units[i].symbol} `;
      remaining = remaining % unitValue;
    }
  }

  return result.trim();
};

export const formatInputValue = (value) => {
  if (!value) return "";
  return parseInt(value.replace(/,/g, ""), 10).toLocaleString();
};
