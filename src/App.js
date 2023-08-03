// import Home from './pages/Home';
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./redux/Auth/authSlice";
import Protected from "./components/Protected";
import { removeSelectedChat, setCurrentUser } from "./redux/Chats/chatSlice";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound/>
  }
]);
const auth = getAuth(app);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch(setUser({ displayName, email, photoURL, uid }));
        dispatch(setCurrentUser({ displayName, email, photoURL, uid }));
      }
      else
      {
        dispatch(setUser(null));
        dispatch(setCurrentUser(null));
        dispatch(removeSelectedChat());
      }
    });

    return () => {
      unsub();
    };
  }, [dispatch]);


  

  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
