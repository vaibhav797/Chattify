import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSlice";
import { changeChat } from "../redux/Chats/chatSlice";
import { Oval } from "react-loader-spinner";

const db = getFirestore(app);

const Search = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        arr.push(doc.data());
      });

      setUsers(arr);
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [userName]);

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleClick = async (index) => {
    const user = users[index];

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;


    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else {
        const { displayName, photoURL, uid } = user;
        dispatch(changeChat({ displayName, photoURL, uid }));
      }
    } catch (err) {
      console.log(err);
    }

    setUsers([]);
    setUserName("");
  };

  return (
    <div className="box border-b-[1px]  bg-inherit border-gray-200">
      <div className="flex justify-between items-center">
        <input
          type="text"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Find a user"
          className="bg-inherit w-full outline-none px-2 py-1 text-white placeholder:text-gray-300"
        />
        {loading && <Oval
                height={20}
                width={20}
                color="lightgray"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="lightgray"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />}
      </div>
      {users.length > 0 &&
        users.map(
          (user, index) =>
            user.uid !== currentUser.uid && (
              <div
                key={user.uid}
                onClick={() => handleClick(index)}
                className="flex items-center cursor-pointer p-2 gap-2 text-white hover:bg-[#2f2d55]"
              >
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-12 w-12 rounded-[50%] object-cover"
                />
                <div>
                  <span>{user.displayName}</span>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default Search;
