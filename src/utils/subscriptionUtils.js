export const fmt = (d) =>
  !d
    ? "-"
    : d.includes("-")
    ? d
    : `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`;

export const fmtYm = (d) => {
  if (!d) return "-";

  const digits = d.replace(/\D/g, "");
  if (digits.length === 8) {
    const y = digits.slice(0, 4);
    const m = digits.slice(4, 6);
    const day = digits.slice(6);
    return `${y}.${m}.${day}`;
  }
  if (digits.length === 6) {
    const y = digits.slice(0, 4);
    const m = digits.slice(4, 6);
    return `${y}.${m}`;
  }
  return d;
};

export const sumBy = (arr, key) =>
  arr.reduce((sum, o) => sum + (Number(o[key]) || 0), 0);


export const formatTel = (num) => {
  if (!num) return "-";
  const digits = num.replace(/\D/g, "");           // 숫자만 추출
  if (digits.length === 8)  return digits.replace(/(\d{4})(\d{4})/, "$1-$2");          // 15513174 → 1551-3174
  if (digits.length === 10) return digits.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3"); // 0212345678 → 02-1234-5678
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 03112345678 → 031-1234-5678
  return num;                                      // 못 맞추면 원본 반환
};