import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Initial from './Initial';
import Login from './Login';
import Register from './Register';
import { LoggedProvider } from './contexts/LoggedContext';
import { CartProvider } from './contexts/CartContext';
import { ToastContainer } from 'react-toastify';
import { NotificationProvider } from './contexts/NotificationContext';
import CheckoutSucesso from './CheckoutSucesso';
import { LoadingProvider } from './contexts/LoadingContext';
import ProtectRoute from './ProtectRoute';
import Carrinho from './Carrinho';
import Cardapio from './Cardapio';
import Pedidos from './myAccount/Pedidos';
import Address from './myAccount/Endereco';
import Info from './myAccount/Info';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="742017218812-praodnpmi8k616clo11ntito9snnb77d.apps.googleusercontent.com">
      <LoadingProvider>
        <NotificationProvider>
          <CartProvider>
            <LoggedProvider>
              <ToastContainer />
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow mt-14">
                    <Routes>
                      <Route path="/" element={<Initial />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/cardapio"
                        element={
                          <ProtectRoute>
                            <Cardapio />
                          </ProtectRoute>
                        }
                      />
                      <Route
                        path="/carrinho"
                        element={
                          <ProtectRoute>
                            <Carrinho />
                          </ProtectRoute>
                        }
                      />
                      <Route path="/sucesso" element={<CheckoutSucesso />} />

                      <Route
                        path="/pedidos"
                        element={
                          <ProtectRoute>
                            <Pedidos />
                          </ProtectRoute>
                        }
                      />

                      <Route
                        path="/enderecos"
                        element={
                          <ProtectRoute>
                            <Address />
                          </ProtectRoute>
                        }
                      />
                      <Route
                        path="/informacoes"
                        element={
                          <ProtectRoute>
                            <Info />
                          </ProtectRoute>
                        }
                      />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </LoggedProvider>
          </CartProvider>
        </NotificationProvider>
      </LoadingProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
