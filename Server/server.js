const express = require("express");
const app = express();
const server = require("http").createServer(app);
const Queries = require("./query");
const queries = new Queries();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const productsArray = [
  {
    name: "Яблоки красные",
    price: 150,
    count: 40,
    image:
      "https://palladi.ru/upload/iblock/d35/d35299c66ecd31066b2ec003adce809c.jpg",
    details: [{ title: "Дата сбора", data: "15.07.2022" }],
  },
  {
    name: "Яблоки зелёные",
    price: 140,
    count: 90,
    image:
      "https://tgabsolut-shop.ru/upload/iblock/7fa/7fa9589ad1cc94d71313caca6d0430b8.jpg",
    details: [{ title: "Дата сбора", data: "25.08.2022" }],
  },
  {
    name: "Огурцы",
    price: 200,
    count: 30,
    image: "https://s.myspar.ru/upload/img/10/1003/100387193.jpg?1579528883",
    details: [{ title: "Дата сбора", data: "05.07.2022" }],
  },
  {
    name: "Помидоры",
    price: 100,
    count: 45,
    image:
      "https://vitamins.ru/system/Product/imgs/000/000/394/watermarked/IMG_1213.jpg",
    details: [{ title: "Дата сбора", data: "19.07.2022" }],
  },
];
const clothesArray = [
  {
    name: "Кофта",
    price: 1500,
    count: 10,
    image:
      "https://static.detmir.st/media_out/539/063/4063539/1500/0.jpg?1652264617864",
    details: [
      { title: "Размер", data: "S" },
      { title: "Дата производства", data: "15.07.2021" },
      { title: "Состав", data: "100% хлопок" },
    ],
  },
  {
    name: "Джинсы",
    price: 2000,
    count: 20,
    image:
      "https://i.pinimg.com/736x/e2/48/ea/e248eae37e9624485ab46080dcd279cd.jpg",
    details: [
      { title: "Размер", data: "M" },
      { title: "Дата производства", data: "15.08.2020" },
      { title: "Состав", data: "Хлопок - 70%, Полиэстер - 28%, Эластан - 2%" },
    ],
  },
  {
    name: "Футболка",
    price: 1000,
    count: 30,
    image:
      "https://static.insales-cdn.com/images/products/1/4653/516756013/DSCF4443.jpg",
    details: [
      { title: "Размер", data: "M" },
      { title: "Дата производства", data: "15.08.2019" },
      { title: "Состав", data: "Хлопок - 70%, Полиэстер - 30%" },
    ],
  },
  {
    name: "Шорты",
    price: 1250,
    count: 45,
    image: "https://www.basketshop.ru/files/catalog/39128/BV9385-011.JPG",
    details: [
      { title: "Размер", data: "M" },
      { title: "Дата производства", data: "25.08.2019" },
      { title: "Состав", data: "Хлопок - 80%, Полиэстер - 20%" },
    ],
  },
];
const phonesArray = [
  {
    name: "Iphone 12",
    price: 67000,
    count: 12,
    image:
      "https://img.mvideo.ru/Pdb/30052892b.jpg",
    details: [
      { title: "Встроенная память (ГБ)", data: "128" },
      { title: "Диагональ (дюйм)", data: "6.1" },
      { title: "Фотокамера (Мп)", data: "12 + 12 (двойная)" },
    ],
  },
  {
    name: "Iphone 11",
    price: 62000,
    count: 16,
    image:
      "https://www.tradeinn.com/f/13735/137354153/apple-iphone-11-64gb-6.1.jpg",
    details: [
      { title: "Встроенная память (ГБ)", data: "128" },
      { title: "Диагональ (дюйм)", data: "6.1" },
      { title: "Фотокамера (Мп)", data: "12 + 12 (двойная)" },
    ],
  },
  {
    name: "Iphone 8",
    price: 22500,
    count: 40,
    image:
      "https://cdn.svyaznoy.ru/upload/iblock/aef/01.jpg/resize/870x725/hq/",
    details: [
      { title: "Встроенная память (ГБ)", data: "256" },
      { title: "Диагональ (дюйм)", data: "5.5" },
      { title: "Фотокамера (Мп)", data: "12 + 12 (двойная)" },
    ],
  },
  {
    name: "Iphone X",
    price: 27400,
    count: 12,
    image:
      "https://img.mvideo.ru/Pdb/30052892b.jpg",
    details: [
      { title: "Встроенная память (ГБ)", data: "256" },
      { title: "Диагональ (дюйм)", data: "5.8" },
      { title: "Фотокамера (Мп)", data: "12 + 12 (двойная)" },
    ],
  },

];
const purchases = [];

app.get("/getProducts/", (req, res) => {
  res.json({
    status: true,
    data: {
      products: productsArray,
      clothes: clothesArray,
      phones: phonesArray,
    },
  });
});
app.get("/buyProduct/:userId&:prodId&:typeId", (req, res) => {
  const {userId, prodId, typeId} = req.params;
  purchases.push({userId, prodId, typeId});
  res.json({ status: true });
});
app.get("/registration/:email&:name&:password", (req, res) => {
  queries.registration(
    req.params.name,
    req.params.email,
    req.params.password,
    (status) => res.json({ status })
  );
});
app.get("/login/:email&:password", (req, res) => {
  queries.login(req.params.email, req.params.password, (status, data) => 
    res.json({ status, data })
  );
});
app.get("/getPurchaseHistory/:userId", (req, res) => {
  const {userId} = req.params;
  const dataArr = [];
  const types = [productsArray, clothesArray, phonesArray];
  purchases.forEach(value => {
    if(value.userId === userId){
      const product = types[value.typeId][value.prodId];
      dataArr.push({name: product.name, price: product.price, image: product.image});
    }
  });
  res.json({status: true, data: dataArr});
});

server.listen(3001, () => console.log(`App is running`));
