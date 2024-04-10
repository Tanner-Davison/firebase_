import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "styles/colors";
import media from "styles/media";
import text from "styles/text";
import { auth, googleProvider } from "../config/firebase";
import BackIcon from "../images/BackIcon.png";
import { GoogleIcon } from "../images/GoogleIcon";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
      if (error.message.includes("auth/email-already-in-use")) {
        setEmailError(true);
      }
    }
  };

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const user = await signInWithPopup(auth, googleProvider);
      if (user) {
        const PROFILEPHOTO = user.user.photoURL;
        localStorage.setItem("profileImageUrl", PROFILEPHOTO);
      }
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSignIn}>
        {!emailError && (
          <>
            <Title>New User</Title>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              autoComplete="email"
            />
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              autoComplete="current-password"
            />
            <SignInButton type="submit">Join</SignInButton>
          </>
        )}
        {emailError && (
          <>
            <ErrorWrapper>
              <Pill $found>{" Account Found "}</Pill>
              <ErrorMessage>Use Google To Continue Sign In </ErrorMessage>{" "}
              <GoogleSignInButton onClick={handleSignInWithGoogle}>
                <GoogleIcon width="30px" height="30px" />
                Login with Google
              </GoogleSignInButton>
              <Pill onClick={() => setEmailError(false)}>
                <Back src={BackIcon} />
                <p> Back to login </p>
              </Pill>
            </ErrorWrapper>
          </>
        )}
      </Form>
      {!emailError && (
        <>
          <Form onSubmit={handleSignIn} $google>
            <Title>{"User Login"}</Title>
            <GoogleSignInButton onClick={handleSignInWithGoogle}>
              <GoogleIcon width="30px" height="30px" />
              Login with Google
            </GoogleSignInButton>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default AuthLogin;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  top: 25%;
  border-radius: 4.722vw;
  height:90vh;
  border: 0.069vw ridge ${colors.loginWhite};
  ${media.fullWidth} {
    border-radius: 68px;

    padding: 15px;
    border: 1px ridge ${colors.loginWhite};
  }

  ${media.tablet} {
    border-radius: 6.641vw;

    padding: 1.465vw;
    border: 0.098vw ridge ${colors.loginWhite};
    flex-direction: column;
  }

  ${media.mobile} {
    flex-direction: column;
    top: 5%;
    border-radius: 18.133vw;

    padding: 4vw;
    border: 0.267vw ridge ${colors.loginWhite};
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.$google ? `${colors.purpleGradient}` : "#5e60ce"};
  border: 3px solid ${colors.primaryPurple};
  border-radius: 10px;
  gap: 22px;

  padding: 50px;
  margin: 58px;
  ${media.fullWidth} {
    border: 3px solid ${colors.primaryPurple};
    border-radius: 10px;
    gap: 22px;

    padding: 50px;
    margin: 58px;
  }

  ${media.tablet} {
    border: 0.293vw solid ${colors.primaryPurple};
    border-radius: 0.977vw;
    gap: 3.148vw;

    padding: 3.883vw;
    margin: 5.664vw;
  }

  ${media.mobile} {
    border: 0.8vw solid ${colors.primaryPurple};
    border-radius: 2.667vw;
    background: ${(props) =>
      props.$google ? `${colors.purpleGradient}` : "#5e60ce"};
    gap: 5.867vw;
    padding: 10vw;
    margin: 12vw 0vw;
  }
`;

const Title = styled.p`
  ${text.bodyLLeagueBold}
  color: white;
  margin: unset;
  align-self: center;
`;

const Input = styled.input`
  ${text.bodyM}
  border: 2px solid transparent;
  border-radius: 0.972vw;
  padding: 10px;
  width: 200px;
  background-color: #fffcf7;
  color: #000000;
  &::placeholder {
    color: ${colors.grey600};
  }
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;

const Button = styled.button`
  cursor: pointer;
  ${text.bodyMBold}
  width: fit-content;
  align-self: center;
  background-color: transparent;
  border-radius: 25px;
  padding: 0.3vw 2vw;
  border: 1px solid transparent;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.051);
  }
`;

const SignInButton = styled(Button)`
  color: #ffffff;
  background-color: #98c439;
`;

const GoogleSignInButton = styled(Button)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0vw 1vw;
  transition: transform 0.2s ease-in-out;
  color: black;
  gap: 0.347vw;
`;
const ErrorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  gap: 10px;
`;
const ErrorMessage = styled.p`
  ${(props) => (props.$found ? `${text.bodyLBold}` : `${text.bodyMBold}`)}
  margin: unset;
  color: ${(props) => (props.$found ? " #66d37e" : "white")};
`;
const Pill = styled.div`
  cursor: pointer;
  ${(props) => (props.$found ? `${text.bodyMBold}` : `${text.bodyM}`)};
  display: flex;
  align-self: center;
  justify-self: flex-end;
  margin-top: ${(props) => (props.$found ? "unset" : "3.472vw")};
  margin-bottom: 3.472vw;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${(props) => (props.$found ? "#66d37e" : " white")};
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  padding: 0vw 1vw;
  border-radius: 25px;
  gap: 5px;
  transition: transform 0.2s ease-in-out, color 0.3s ease-in-out;
  p {
    margin: unset;
  }
  &:hover {
    transform: scale(1.09);
    color: Yellow;
  }
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    padding: 1vw;
  }
`;
const Back = styled.img`
  width: 25px;
`;
