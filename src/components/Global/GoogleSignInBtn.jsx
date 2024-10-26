import { Button } from "@mui/material";
import googleIMG from "./../../assets/google.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../../../firebase";
import { useDispatch } from "react-redux";
import { googleSignUp } from "../../features/user/userSlice";

export default function GoogleSignInBtn() {
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const token = await user.getIdToken();
      dispatch(googleSignUp(token));
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outlined"
      sx={{
        width: "100%",
        height: 47,
        color: "#1974CE",
        fontSize: 16,
        textTransform: "unset",
        fontWeight: "bold",
        borderRadius: 2,
        borderColor: "#1974CE",
        boxShadow: "none",
        padding: 1,
      }}
    >
      <img className="h-8 mr-2" src={googleIMG} alt="google_icon" />
      <span>Sign In With Google</span>
    </Button>
  );
}
