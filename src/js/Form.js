import { useState } from "react";
import styles from "../styles/Form.module.css";

function Form({ isOpen, setOpen, setIsUserLogin }) {
  const wrapperStyles = isOpen ? "" : styles.hidden;
  const [isLogin, setLogin] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });
  function onChangeHandler(name, value) {
    const newInputs = JSON.parse(JSON.stringify(inputs));
    newInputs[name] = value;
    setInputs(newInputs);
  }
  async function getFetch(params, method) {
    const answer = await fetch(
      `http://localhost:3001/${method}/${Object.values(params).join("&")}`
    );
    const result = await answer.json();
    if (result.status) {
      return result;
    } else {
      return false;
    }
  }
  async function login() {
    const answer = await getFetch([inputs.email, inputs.password], "login");
    if(!answer) return;
    if(answer.status) {
        localStorage.setItem('user', JSON.stringify(answer.data));
        localStorage.setItem('isUserLogin', true);
        setOpen(false);
        setIsUserLogin(true);
    }
  }
  async function register() {
    const answer = await getFetch(
      [inputs.email, inputs.name, inputs.password],
      "registration"
    );
    if(answer) setLogin(true);
  }
  return (
    <section className={[styles.wrapper, wrapperStyles].join(" ")}>
      <div className={styles.form}>
        <input
          placeholder="email"
          name="email"
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        {isLogin ? (
          <></>
        ) : (
          <input
            placeholder="name"
            name="name"
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
        )}
        <input
          placeholder="password"
          name="password"
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <button onClick={isLogin ? login : register}>
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <button onClick={() => setLogin(!isLogin)}>Сменить форму</button>
      </div>
      <button className={styles.close} onClick={() => setOpen(false)}>Закрыть</button>
    </section>
  );
}

export default Form;
