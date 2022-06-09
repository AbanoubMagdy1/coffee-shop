import { getCoffeeStores } from "../../apis/coffeeStores";

export default async function getStoresHandler(req, res){
  const stores = await getCoffeeStores({ ll: req.query.ll });

  res.json(stores);
};