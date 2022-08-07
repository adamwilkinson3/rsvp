import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Pages/Login';
import RSVP from './Pages/RSVP';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Attendance from './Pages/Attendance';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  // uri: "http://localhost:3001/graphql",
   uri: "https://rsvp-mysql.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/rsvp/:id' element={<RSVP />} />
          <Route path='/attendance' element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
