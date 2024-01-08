import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import user from "../services/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get("http://localhost:3003/api/users");
      setUsers(users.data);
      console.log(users.data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <h3> blogs created</h3>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            {" has created "}
            {user.blogs.length} {" blogs"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
