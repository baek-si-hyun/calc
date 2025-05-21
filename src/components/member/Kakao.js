import { useEffect } from "react";

function Kakao() {
  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.URL).searchParams;
      const code = params.get("code");
      console.log("인가 코드:", code);

      const response = await fetch(
        `http://218.153.109.31:3007/auth/kakao/callback?code=${code}`
      );

      const json = await response.json();
      console.log(json);


    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
      </div>
    </div>
  );
}

export default Kakao;
