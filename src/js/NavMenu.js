import styles from "../styles/NavMenu.module.css";
function NavMenu({ page, setPage, isUserLogin, setOpenForm, setIsUserLogin, setOpenHistory }) {
  return (
    <nav className={styles.menu}>
      {isUserLogin ? (
        <button onClick={() => setOpenHistory(true)} className={[styles.btn, styles.history].join(' ')}>
          История покупок
        </button>
      ) : (
        <></>
      )}
      <button
        onClick={() => setPage("products")}
        className={[styles.btn, page === "products" ? styles.choosen : ""].join(
          " "
        )}
      >
        Продукты
      </button>
      <button
        onClick={() => setPage("clothes")}
        className={[styles.btn, page === "clothes" ? styles.choosen : ""].join(
          " "
        )}
      >
        Одежда
      </button>
      <button
        onClick={() => setPage("phones")}
        className={[styles.btn, page === "phones" ? styles.choosen : ""].join(
          " "
        )}
      >
        Телефоны
      </button>
      <div className={styles.loginInfo}>
        {isUserLogin ? (
          <>
            <label className={styles.name}>
              Привет,{" "}
              {localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).name
                : ""}
            </label>
            <button
              onClick={() => {
                setIsUserLogin(false);
                localStorage.clear();
              }}
              className={styles.btn}
            >
              Выйти
            </button>
          </>
        ) : (
          <button onClick={() => setOpenForm(true)} className={styles.btn}>
            Авторизоваться
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavMenu;
