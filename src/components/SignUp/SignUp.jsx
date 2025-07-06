import { useSignUp, useSignIn, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";

export default function SignUpPage() {
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { setActive } = useClerk();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      if (isSignIn) {
        if (!isSignInLoaded) {
          setMessage("Clerk sign-in not loaded yet.");
          return;
        }

        const result = await signIn.create({
          identifier: username,
          password,
        });

        if (result.status === "complete") {
          // This is the correct way to set the active session
          await setActive({ session: result.createdSessionId });
          navigate("/chat-room");
        }
      } else {
        if (!isSignUpLoaded) {
          setMessage("Clerk sign-up not loaded yet.");
          return;
        }

        const result = await signUp.create({
          username,
          password,
        });

        if (result.status === "complete") {
          // For sign-up, we need to handle email verification first
          if (result.verifications.emailAddress.status === "verified") {
            await setActive({ session: result.createdSessionId });
            navigate("/chat-room");
          } else {
            // Handle email verification flow
            setMessage("Please check your email to verify your account");
          }
        }
      }
    } catch (err) {
      console.error("Authentication Error:", err);
      setMessage(
        `Authentication failed: ${
          err.errors?.[0]?.longMessage ||
          err.message ||
          "An unknown error occurred."
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="SignUpFormContainer container-fluid">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at top center, rgba(0, 255, 0, 0.15), transparent 70%)",
            zIndex: 1,
          }}
        />
        <form className="row" onSubmit={handleSubmit}>
          <label className="col-12" htmlFor="username">
            اسمك ايه يابني
          </label>
          <input
            className="col-6"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern={!isSignIn ? ".*ola" : undefined}
            title={
              !isSignIn ? "لازم الاسم يخلص بـ 'ولا' زي 'sa3dola'" : undefined
            }
            required
          />
          <label className="col-12" htmlFor="password">
            كلمة السر
          </label>
          <input
            className="col-6"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message && (
            <div className="col-12 py-2 text-white text-sm z-1111">
              {message}
            </div>
          )}
          <div className="col-12 py-2 px-0">
            <button className="SignBtn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span>اصبر بتحمل ...</span>
              ) : isSignIn ? (
                "بيتك ومطرحك"
              ) : (
                "خش هتجيبك"
              )}
            </button>
          </div>
          <div className="col-12 py-2 px-0">
            <button
              type="button"
              className="SignBtn bg-transparent text-white border-0 hover:bg-transparent hover:text-green-400"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setMessage("");
                setUsername("");
                setPassword("");
              }}
            >
              {isSignIn ? " اول مره تيجي ؟ " : "  معاك اكونت ؟ "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
