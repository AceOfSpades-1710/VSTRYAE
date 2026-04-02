import { runQuery } from "./dbClient.js";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    if (!userEmail) {
      return res.status(400).json({ message: "Missing email parameter" });
    }

    try {
      const userResult = await runQuery("SELECT id FROM users WHERE email = $1", [userEmail]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const userId = userResult.rows[0].id;

      const ordersResult = await runQuery(
        `SELECT o.id, o.total, o.status, o.payment_method, o.shipping_address, o.created_at,
                json_agg(json_build_object('id', oi.product_id, 'title', p.title, 'quantity', oi.quantity, 'price', oi.price)) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         LEFT JOIN products p ON oi.product_id = p.id
         WHERE o.user_id = $1
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        [userId]
      );

      const orders = ordersResult.rows.map((row) => ({
        id: row.id,
        total: Number(row.total),
        items: row.items || [],
        status: row.status,
        createdAt: row.created_at.toISOString()
      }));
      return res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Orders fetch failed" });
    }
  }

  if (req.method === "POST") {
    const { userEmail, products, total, paymentMethod, shippingAddress } = req.body;
    if (!userEmail || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "userEmail and products required" });
    }

    try {
      const userResult = await runQuery("SELECT id FROM users WHERE email = $1", [userEmail]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const userId = userResult.rows[0].id;

      const orderResult = await runQuery(
        `INSERT INTO orders (user_id, total, status, payment_method, shipping_address)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [userId, total || 0, "placed", paymentMethod || "cod", JSON.stringify(shippingAddress || {})]
      );

      const orderId = orderResult.rows[0].id;

      for (const item of products) {
        await runQuery(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES ($1, $2, $3, $4)`,
          [orderId, item.id, item.quantity || 1, item.price]
        );
      }

      return res.status(201).json({ orderId, message: "Order created" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Order placement failed" });
    }
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
