import { useDispatch, useSelector } from "react-redux";
import { addAction } from "../../features/user/userSlice";

export default function ProtectedAction({ action, children }) {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isAuth) {
      dispatch(action);
    } else {
      action();
    }
  };

  return <button onClick={handleClick}>{children}</button>;
}
