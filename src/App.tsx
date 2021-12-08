import React from "react";
import "./styles.css";
import * as api from "./api";
import { User } from "./model";

function UserView(props: {
  user: User;
  onSelectUserId: (userId: number) => void;
}) {
  const { user, onSelectUserId } = props;
  return (
    <div className="User" onClick={() => onSelectUserId(user.id)}>
      <span>
        <img className="User-avatar" src={props.user.avatarUrl} />
      </span>
      <span className="User-username">{props.user.username}</span>
    </div>
  );
}

function UserList(props: {
  onSelectUserId: (userId: number) => void;
  loading: boolean;
  users: User[];
}) {
  const { loading, users, onSelectUserId } = props;

  return (
    <div className="UserList">
      {loading && <div>Loading...</div>}
      {users.map((user) => (
        <UserView key={user.id} user={user} onSelectUserId={onSelectUserId} />
      ))}
    </div>
  );
}

function UserProfile(props: {
  user: User;
  onDeleteUserId: (userId: number) => void;
}) {
  const { user, onDeleteUserId } = props;
  return (
    <div>
      <img className="UserProfile-avatar" src={props.user.avatarUrl} />
      <span className="UserProfile-username">{user.username}</span>
      <div className="UserProfile-fullName">{user.fullName}</div>
      <div className="UserProfile-delete">
        <button onClick={() => onDeleteUserId(user.id!)}>Delete</button>
      </div>
    </div>
  );
}

function NewUserForm(props: { onNewUser: (user: User) => void }) {
  const [username, setUserName] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  function handleAddUser() {
    const newUser = {
      username,
      fullName,
      avatarUrl: "http://placekitten.com/200/200"
    };
    props.onNewUser(newUser);
  }

  return (
    <div>
      <input
        value={username}
        onChange={(evt) => setUserName(evt.target.value)}
        placeholder="Username"
      />
      <input
        value={fullName}
        onChange={(evt) => setFullName(evt.target.value)}
        placeholder={"Full Name"}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = React.useState([] as User[]);
  const [loading, setLoading] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null
  );

  const user = users.find((_user) => _user.id === selectedUserId);

  async function fetchData() {
    setLoading(true);
    setUsers(await api.getUsers());
    setLoading(false);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  async function handleNewUser(user: User) {
    await api.upsertUser(user);
    fetchData();
  }

  async function handleDeleteUserId(userId: number) {
    await api.deleteUser(userId);
    fetchData();
  }

  return (
    <div className="App">
      <div className="App-left">
        <div className="App-UserList">
          <UserList
            users={users}
            loading={loading}
            onSelectUserId={setSelectedUserId}
          />
        </div>
        <div className="App-NewUserForm">
          <NewUserForm onNewUser={handleNewUser} />
        </div>
      </div>
      <div className="App-right">
        {user && (
          <UserProfile user={user} onDeleteUserId={handleDeleteUserId} />
        )}
      </div>
    </div>
  );
}

// useState -> this.state = {}; this.setState();
// useEffect -> componentDidMount, didUpdate, willUnmount
