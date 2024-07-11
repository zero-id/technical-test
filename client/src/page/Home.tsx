import { useEffect, useState } from "react";
import { API } from "../lib";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
  });

  const getUser = async () => {
    try {
      const res = await API.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-50 m-auto text-center mt-5">
      <h1>Hi, {user.name}</h1>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        size="sm"
        className="btn btn-primary"
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
