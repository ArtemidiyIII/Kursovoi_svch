import './App.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite"
import {useContext} from 'react';
import { Context } from '.';


const App = observer ( () => {
  const {user} = useContext(Context)

  

  

  return (
    <BrowserRouter>
    <div className='App'>
      <NavBar />
      <AppRouter />
      </div>
    </BrowserRouter>
  );
});

export default App;
