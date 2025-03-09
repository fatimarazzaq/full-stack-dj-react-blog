import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const uid = searchParams.get("uid");
      const token = searchParams.get("token");

      if (!uid || !token) {
        setMessage("Please activate your account by clicking the link sent to your email address.");
        setLoading(false);
        return;
      }

      try {
        console.log("uid",uid);
        console.log("token",token);
        const response = await axiosInstance.get(`auth/account-activate/${uid}/${token}/`);
        
        if (response.status === 200) {
          setMessage("✅ Email verified successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        setMessage("❌ Verification failed or link expired.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="container">
        <div className="flex flex-col items-center justify-center min-h-screen border rounded my-5 py-4">
        <h2 className="text-md font-semibold text-center">{message}</h2>
        {loading && <p className="text-gray-500 text-center">⏳ Please wait...</p>}
        </div>
    </div>
  );
};

export default EmailVerification;
