import styles from "../styles/Modal.module.css";

function Modal({ isOpen, setOpen, product, page }) {
  const wrapperStyles = isOpen ? "" : styles.hidden;
  if(product === null) return <div>Ошибка</div>;
  async function buyProduct() {
    const user = JSON.parse(localStorage.getItem('user'));
    let prodTypeId = 0;
    if(page === 'clothes') prodTypeId = 1;
    if(page === 'phones') prodTypeId = 2;
    const answer = await fetch(
      `http://localhost:3001/buyProduct/${user.id}&${product.id}&${prodTypeId}`
    );
    const result = await answer.json();
    if (result.status) {
      setOpen(false);
    }
  }
  return (
    <section className={[styles.wrapper, wrapperStyles].join(" ")}>
      <div className={styles.form}>
        <div className={styles.photo}>
          <img src={product.image} alt="product photo" />
          <button onClick={buyProduct}>Купить</button>
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <h1 className={styles.title}>Подробности:</h1>
          <div className={styles.options}>
            <div className={styles.option}>
              <span>Количество:</span> {product.count}
            </div>
            {product.details.map((detail) => 
              <div className={styles.option}>
                <span>{detail.title}:</span> {detail.data}
              </div>
            )}
            <div className={styles.option}>
              <span>Цена:</span> {product.price}
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className={styles.close}>
          Закрыть
        </button>
      </div>
    </section>
  );
}

export default Modal;
