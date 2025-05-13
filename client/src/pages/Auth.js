import React, { useContext, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite'
import { Context } from '..';

const Auth = observer(() => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { user } = useContext(Context);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // состояние для подтверждения пароля
    const navigate = useNavigate();

    const click = async () => {
        try {
          if (!isLogin) {
            
            if (password !== confirmPassword) {
              return alert('Passwords do not match');
            }
          }
    
          let data;
          if (isLogin) {
            data = await login(email, password);
          } else {
            data = await registration(email, password);
          }
    
          user.setUser(user);
          user.setIsAuth(true);
          navigate(HOME_ROUTE);
        } catch (e) {
          alert(e.response.data.message);
        }
    };


    return(
        <Container 
            className='d-flex justify-content-center align-items-center' 
            style={{ height: window.innerHeight - 190 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                     />
                    {!isLogin && (
                        <Form.Control
                            className='mt-3'
                            placeholder='Повторите пароль'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                        />
                    )}

                    <Row className = 'd-flex justify-content-between mt-3 pl-3 pr-3'>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизуйтесь</NavLink>
                            </div>
                        }
                        <Button variant={'outline-success'}
                            onClick={click}
                            className='mt-2 align-self-end'>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;