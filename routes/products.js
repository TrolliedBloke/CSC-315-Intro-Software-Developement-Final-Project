// Product API routes
const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET all products
router.get("/", async (req, res) => {
  try {
    const { brand, limit } = req.query;
    
    let query = `
      SELECT 
        p.id,
        p.product_id,
        p.title,
        p.brand,
        p.style_code,
        p.year,
        p.condition,
        p.colorway,
        p.hero_image,
        COALESCE(
          json_agg(
            json_build_object(
              'size', ps.size,
              'price', ps.price
            )
          ) FILTER (WHERE ps.size IS NOT NULL),
          '[]'
        ) as sizes
      FROM products p
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
    `;
    
    const params = [];
    if (brand) {
      query += ` WHERE p.brand = $1`;
      params.push(brand);
    }
    
    query += ` GROUP BY p.id, p.product_id, p.title, p.brand, p.style_code, p.year, p.condition, p.colorway, p.hero_image`;
    
    if (limit) {
      query += ` LIMIT $${params.length + 1}`;
      params.push(parseInt(limit));
    }
    
    const result = await pool.query(query, params);
    
    // Format the response to match frontend expectations
    const products = result.rows.map(row => ({
      id: row.product_id,
      title: row.title,
      brand: row.brand,
      styleCode: row.style_code,
      year: row.year,
      condition: row.condition,
      colorway: row.colorway,
      hero: row.hero_image,
      sizes: row.sizes || []
    }));
    
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET product by ID
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Get product details
    const productResult = await pool.query(
      `SELECT * FROM products WHERE product_id = $1`,
      [productId]
    );
    
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    const product = productResult.rows[0];
    
    // Get product images
    const imagesResult = await pool.query(
      `SELECT image_url FROM product_images 
       WHERE product_id = $1 
       ORDER BY display_order`,
      [product.id]
    );
    
    // Get product sizes
    const sizesResult = await pool.query(
      `SELECT size, price FROM product_sizes 
       WHERE product_id = $1 
       ORDER BY size`,
      [product.id]
    );
    
    // Get related products
    const relatedResult = await pool.query(
      `SELECT p.product_id, p.title, p.hero_image
       FROM products p
       INNER JOIN related_products rp ON p.id = rp.related_product_id
       WHERE rp.product_id = $1
       LIMIT 5`,
      [product.id]
    );
    
    // Format response
    const response = {
      id: product.product_id,
      title: product.title,
      brand: product.brand,
      styleCode: product.style_code,
      year: product.year,
      condition: product.condition,
      colorway: product.colorway,
      hero: product.hero_image,
      thumbs: imagesResult.rows.length > 0 
        ? imagesResult.rows.map(row => row.image_url)
        : [product.hero_image],
      sizes: sizesResult.rows.map(row => ({
        size: row.size,
        price: parseFloat(row.price)
      })),
      related: relatedResult.rows.map(row => row.product_id)
    };
    
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// GET products by brand
router.get("/brand/:brand", async (req, res) => {
  try {
    const { brand } = req.params;
    
    const result = await pool.query(
      `SELECT 
        p.id,
        p.product_id,
        p.title,
        p.brand,
        p.hero_image,
        MIN(ps.price) as min_price
      FROM products p
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
      WHERE p.brand = $1
      GROUP BY p.id, p.product_id, p.title, p.brand, p.hero_image
      ORDER BY p.title`,
      [brand]
    );
    
    const products = result.rows.map(row => ({
      id: row.product_id,
      title: row.title,
      brand: row.brand,
      hero: row.hero_image,
      minPrice: row.min_price ? parseFloat(row.min_price) : null
    }));
    
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products by brand" });
  }
});

module.exports = router;

