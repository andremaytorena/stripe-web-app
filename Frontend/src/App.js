import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home'
import Login from './pages/authentication/login'
import Signup from './pages/authentication/signup'
import Balances from './pages/balances/balances'
import Transactions from './pages/transactions/transactions';
import Customers from './pages/customers/customers'
import ProductCatalog from './pages/product-catalog/product_catalog'
import TransactionInfo from './pages/transactions/transaction_info'
import './App.css'


import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/balances" element={<Balances />} />

          <Route path="/payments" element={<Transactions />} />
          <Route path="/payments/:transaction_id" element={<TransactionInfo />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App