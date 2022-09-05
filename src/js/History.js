import { useEffect, useState } from "react";
import styles from "../styles/History.module.css";

function History({ isOpen, setOpen }) {
  const wrapperStyles = isOpen ? "" : styles.hidden;
  const [purchases, setPurchases] = useState([]);
  async function getHistory() {
    const user = JSON.parse(localStorage.getItem('user'));
    const answer = await fetch(
      `http://localhost:3001/getPurchaseHistory/${user.id}`
    );
    const result = await answer.json();
    if (result.status) {
      setPurchases(result.data);
    }
  }
  useEffect(() => {
    getHistory();
  });
  return (
    <section className={[styles.wrapper, wrapperStyles].join(" ")}>
      <div className={styles.history}>
        <h1 className={styles.title}>История покупок</h1>
        {purchases.map(value => (
          <div className={styles.purchase}>
            <img src={value.image} alt="prodPhoto"/>
            <h1 className={styles.name}>{value.name}</h1>
            <h1 className={styles.price}>{value.price}</h1>
          </div>
        ))}
      </div>
      <button className={styles.close} onClick={() => setOpen(false)}>Закрыть</button>
    </section>
  );
}

export default History;
