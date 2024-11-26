import LoginForm from "../components/Auth/Login/LoginForm";
import PromoIllustration from "../components/Common/PromoIllustration.jsx";

const LoginPage = () => {
    const promoData = {
        heading:"Sign in Now",
        title:"Boost Your Learning Capabilities",
        description:`Logging in unlocks your personal progress tracker, letting you evaluate your performance and see how you
          stack up against others. Whether you're preparing for exams, improving your knowledge, or simply having fun,
          there's no better way to sharpen your mind.`
    }
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        <PromoIllustration promoData={promoData}  />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
