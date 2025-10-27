import GoogleIcon from '/google_icon.svg';

export default function OAuth() {
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self');
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-[#F2F2F2] text-[#1F1F1F] font-(--font-roboto) py-[10px] px-[12px] gap-[10px] flex justify-center items-center rounded-2xl"
    >
      <img src={GoogleIcon} alt="구글 로그인" width={20} height={20} />
      <span>Google로 로그인</span>
    </button>
  );
}
