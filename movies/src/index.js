import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import MoviePage from './components/MoviePage';
import MovieSearch from './components/MovieSearch';
import MyList from './components/MyList';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />}></Route>
          <Route path="/search/:id" element={<MovieSearch/>}></Route>
          <Route exact path="/" element={<App />}></Route>
          <Route exact path="/my-list" element={<MyList></MyList>}></Route>
        </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
