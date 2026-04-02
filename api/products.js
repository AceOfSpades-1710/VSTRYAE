import { runQuery } from "./dbClient.js";

const defaultProducts = [
  {
    id: 1,
    title: "Leather Jacket",
    cost: 15000,
    description: "Rent",
    location: "Delhi",
    size: "M",
    image: "/assets/items/bg1.jpg"
  },
  {
    id: 2,
    title: "Desi Traditional",
    cost: 8000,
    description: "Sell",
    location: "Delhi",
    size: "S",
    image: "/assets/items/bg2.jpg"
  }
  // etc fallback sample product
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const query = `SELECT id, title, cost, description, location, size, image FROM products ORDER BY id ASC LIMIT 300`;
    const result = await runQuery(query);

    if (result.rows.length === 0) {
      return res.status(200).json({ products: defaultProducts });
    }
    const products = result.rows.map((row) => ({
      id: Number(row.id),
      title: row.title,
      cost: Number(row.cost),
      description: row.description,
      location: row.location,
      size: row.size,
      image: row.image
    }));

    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Product fetch error", error: err.message });
  }
}
