import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClientProvider, useClients } from "./context/ClientProvider";

import Layout from "./layout/Layout";
import Days from "./pages/Days";
import Admin from "./pages/Admin";

import Login from "./pages/Login";

import Details from "./components/Details";
// import ClientEntry from "./components/ClientEntry";
import Note from "./components/Note";
import Search from "./components/Search";
import Documents from "./components/Documents";
import PersonPage from "./pages/PersonPage";
import NotFound from "./pages/NotFound";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000",
  cache: new InMemoryCache(),
});

function App() {
  const [worker, setWorker] = useState(null);

  const handleLogin = (worker) => {
    setWorker(worker);
    saveTokenToSessionStorage(worker);
  };
  function saveTokenToSessionStorage(worker) {
    sessionStorage.setItem("worker", JSON.stringify(worker));
  }
  const handleLogout = () => {
    setWorker(null);
    sessionStorage.removeItem("worker");
    client.clearStore();
  };

  const getWorkerFromSessionStorage = () => {
    try {
      const workerString = sessionStorage.getItem("worker");
      const worker = JSON.parse(workerString);
      return worker;
    } catch (error) {
      sessionStorage.setItem("worker", "");
      return null;
    }
  };
  useEffect(() => {
    const worker = getWorkerFromSessionStorage();
    if (worker) {
      setWorker(worker);
    }
  }, []);
  useEffect(() => {
    // check if worker is still in the session storage, if not, set worker to null
    if (sessionStorage.getItem("worker")) {
      const worker = getWorkerFromSessionStorage();
      setWorker(worker);
    } else {
      setWorker(null);
    }
  }, []);
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ClientProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />

              {/*Search the clients only*/}
              <Route path="/persons/" element={<PersonPage />}>
                <Route path="/persons/search" element={<Search />} />
                <Route path="/persons/details" element={<Details />} />
                <Route path="/persons/note" element={<Note />} />
                <Route path="/persons/documents" element={<Documents />} />
              </Route>

              <Route path="/days" element={<Days />} />
              <Route path="/admin" element={<Admin onLogin={handleLogin} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ClientProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

//  <Route path="/" element={<Persons />}>
//    <Route path="/persons" element={<Persons />} />
//    <Route path="/persons/details" element={<Details />} />
//    {/* <Route path="/persons/search" element={<ClientEntry />} /> */}
//    <Route path="/persons/note" element={<Note />} />
//    {/* Add additional document route if needed */}
//    <Route path="persons/documents" element={<Documents />} />
//  </Route>;

export default App;
