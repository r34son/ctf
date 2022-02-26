import { useEffect, useState } from 'react';
import { api } from 'services/api';

export const Test = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get('/users');
      setUsers(data);
    };
    getData();
  }, []);

  return (
    <>
      {users.map((user: any) => (
        <div>{user.firstName}</div>
      ))}
    </>
  );
};
