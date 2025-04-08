import { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
import { observer } from 'mobx-react-lite';
import { IUser } from './models/response/IUser';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(`[ App.getUsers ] error: ${error}`)
    }
  }

  if (store.isLoading) {
    return (
      <h1>Загрузка...</h1>
    )
  }
  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }

  return (
    <>
      <h1>{store.isAuth ? `Пользователь авторизван ${store.user.email}` : 'Выполните вход'}</h1>
      <h1>{ store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ'}</h1>
      <button onClick={() => store.signOut()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {
        users.map(user => (
          <div key={user.email}>{user.email}</div>
        ))
      }
    </>
  )
}

export default observer(App);
