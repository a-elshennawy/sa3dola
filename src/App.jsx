import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
  ClerkLoaded,
} from "@clerk/clerk-react";
import { Suspense, lazy } from "react";
import { PacmanLoader } from "react-spinners";

const Home = lazy(() => import("./components/Home/Home"));
const ChatRoom = lazy(() => import("./components/ChatRoom/ChatRoom"));
const SignUp = lazy(() => import("./components/SignUp/SignUp"));

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",

              justifyContent: "center",

              padding: "50px",
            }}
          >
            <PacmanLoader color="#00fd15" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              isLoaded ? (
                isSignedIn ? (
                  <Navigate to="/chat-room" replace />
                ) : (
                  <Home />
                )
              ) : (
                <div
                  style={{
                    display: "flex",

                    justifyContent: "center",

                    padding: "50px",
                  }}
                >
                  <PacmanLoader color="#00fd15" />
                </div>
              )
            }
          />

          <Route path="/sign-up" element={<SignUp />} />

          <Route
            path="/chat-room"
            element={
              <>
                <SignedIn>
                  <ChatRoom />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
