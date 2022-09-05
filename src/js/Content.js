import { useEffect, useState } from "react";
import styles from "../styles/Content.module.css";

function Content({ setOpen, page, setChoosenProduct, isUserLogin, setOpenForm }) {
  const [productsArray, setProductsArray] = useState(null);
  async function getProductFetch() {
    const answer = await fetch("http://localhost:3001/getProducts");
    const result = await answer.json();
    if (result.status) {
      setProductsArray(result.data);
    }
  }
  useEffect(() => {
    getProductFetch();
  }, []);
  function setItemsArray() {
    if(productsArray === null) return [];
    if(page === 'products') {
      return productsArray.products;
    }
    if(page === 'clothes') {
      return productsArray.clothes;
    }
    if(page === 'phones') {
      return productsArray.phones;
    }
  }
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Список товаров</h1>
      <div className={styles.container}>
        {setItemsArray().map((product, index) => (
          <article className={styles.product}>
            <div className={styles.productPhoto}>
              <img
                src={product.image}
                alt="product_image"
              />
            </div>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <h2 className={styles.productCount}>Количество: {product.count}</h2>
            <h2 className={styles.productCount}>Цена: {product.price}</h2>
            <button
              onClick={() => {
                if(isUserLogin) {
                  setOpen(true);
                  setChoosenProduct({...product, id: index});
                } else {
                  setOpenForm(true);
                }
              }}
              className={styles.btn}
            >
              Купить
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Content;
