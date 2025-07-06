import { useSignUp, useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion"; // Corrected import for framer-motion

export default function SignUpPage() {
  // Clerk hooks for sign-up and sign-in
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();

  const navigate = useNavigate();

  // State variables for form inputs and UI state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false); // State to toggle between sign-up and sign-in
  const [message, setMessage] = useState(""); // State for displaying messages (errors/success)

  /**
   * Handles the form submission for both sign-up and sign-in.
   * Based on the 'isSignIn' state, it calls the appropriate Clerk method.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (isSignIn) {
      // --- Sign In Logic ---
      if (!isSignInLoaded) {
        setMessage("Clerk sign-in not loaded yet.");
        return;
      }

      try {
        const result = await signIn.create({
          identifier: username, // For sign-in, username acts as the identifier
          password,
        });

        if (result.status === "complete") {
          navigate("/chat-room"); // Navigate to chat room on successful sign-in
        } else {
          // This case might handle intermediate statuses if Clerk has them
          console.log("Sign-in result status:", result.status);
          setMessage("Sign-in process not completed. Please try again.");
        }
      } catch (err) {
        console.error("Sign-in Error:", err);
        setMessage(
          `Sign-in failed: ${
            err.errors?.[0]?.longMessage ||
            err.message ||
            "An unknown error occurred."
          }`
        );
      }
    } else {
      // --- Sign Up Logic ---
      if (!isSignUpLoaded) {
        setMessage("Clerk sign-up not loaded yet.");
        return;
      }

      try {
        // For simple username/password sign-up, create can often complete the process directly
        const result = await signUp.create({
          username,
          password, // Include password for sign-up
        });

        if (result.status === "complete") {
          navigate("/chat-room"); // Navigate to chat room on successful sign-up
        } else {
          // This case might handle intermediate statuses if Clerk has them
          // For example, if email verification is required, status might be 'needs_email_verification'
          console.log("Sign-up result status:", result.status);
          setMessage(
            "Sign-up process not completed. Please check for verification steps if any, or try again."
          );
        }
      } catch (err) {
        console.error("Sign-up Error:", err);
        setMessage(
          `Sign-up failed: ${
            err.errors?.[0]?.longMessage ||
            err.message ||
            "An unknown error occurred."
          }`
        );
      }
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
            <button className="SignBtn" type="submit">
              {isSignIn ? "بيتك ومطرحك" : "خش هتجيبك"}
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
              {isSignIn ? " اول مره تيجي ؟ " : "  معاك اكونت ؟ "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
