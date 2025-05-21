import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();

  useEffect(() => {
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    console.log(code);
    console.log(111);
  }, [location]);

  useEffect(() => {
    const handlePopState = () => {
      console.log('URL 변경됨:', window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  return (
    <div className="login_container">
      <div className="login_logo">
        <span>수집항목 이메일 수집목적</span>
        <span>로그인 및 서비스 이용 용</span>
        <span>보유기간 회원탈퇴 즉시 파기</span>
      </div>
      <div className="login_wrapper">
        <a
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=profile_nickname,account_email&response_type=code`}
          className="login_btn"
        >
          <div>
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
              ></path>
            </svg>
          </div>
          <span>카카오 로그인</span>
          <div></div>
        </a>
      </div>
    </div>
  );
}
export default Login;
