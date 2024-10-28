import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAuth } from "../../features/user/userSlice";

export default function GetAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuth());
  }, []);

  return null;
}
