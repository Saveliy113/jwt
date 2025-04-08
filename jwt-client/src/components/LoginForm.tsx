import { FC, useContext, useState } from 'react';
import { Context } from '../main';
import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>(''); 
    const { store } = useContext(Context);
    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'

            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
            />
            <button
                onClick={() => store.signIn(email, password)}
            >
                Войти
            </button>
            <button
                onClick={() => store.signUp(email, password)}
            >
                Регистрация
            </button>
        </div>
    )
}

export default observer(LoginForm);