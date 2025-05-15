import './App.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite"
import {useContext} from 'react';
import { Context } from '.';
import { useEffect, useState } from 'react';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import Footer from './components/Footer';


const App = observer ( () => {
  const {user} = useContext(Context)
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        await check();
        user.setUser(true);
        user.setIsAuth(true);
      } catch (error) {
        console.error("Authentication failed:", error);
        user.setIsAuth(false); 
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      initAuth();
    } else {
      setLoading(false);
    }
  }, []);

  if(loading){
    return <Spinner animation='grow'/>
  }

  

  

  return (
    <BrowserRouter>
    <div className='App'>
      <NavBar />
      <AppRouter />
      <Footer/>
      </div>
    </BrowserRouter>
  );
});

export default App;
