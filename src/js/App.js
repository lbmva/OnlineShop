import { useState } from 'react';
import '../styles/App.css';
import Content from './Content';
import Form from './Form';
import History from './History';
import Modal from './Modal';
import NavMenu from './NavMenu';

function App() {
  const [page, setPage] = useState('products');
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenForm, setOpenForm] = useState(false);
  const [isOpenHistory, setOpenHistory] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(localStorage.getItem('isUserLogin') ? true : false);
  const [choosenProduct, setChoosenProduct] = useState(null);
  return (
    <div className="App">
      <NavMenu setOpenHistory={setOpenHistory} setOpenForm={setOpenForm} isUserLogin={isUserLogin} setIsUserLogin={setIsUserLogin} page={page} setPage={setPage}/>
      <Content setOpenForm={setOpenForm} isUserLogin={isUserLogin} page={page} setOpen={setOpenModal} setChoosenProduct={setChoosenProduct}/>
      <Modal page={page} isOpen={isOpenModal} setOpen={setOpenModal} product={choosenProduct}/>
      <Form isOpen={isOpenForm} setOpen={setOpenForm} setIsUserLogin={setIsUserLogin} />
      <History isOpen={isOpenHistory} setOpen={setOpenHistory} />
    </div>
  );
}

export default App;
