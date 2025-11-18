// public/products.js
// Central product catalog for StockY

window.PRODUCTS = {
  "aj4-cool-grey": {
    id: "aj4-cool-grey",
    title: 'Air Jordan 4 Retro “Cool Grey”',
    brand: "Jordan",
    styleCode: "308497-007",
    year: 2019,
    condition: "Brand New (Deadstock)",
    colorway: "Cool Grey / White",
    hero: "/assets/placeholder-shoe.png",
    thumbs: [
      "/assets/placeholder-shoe.png",
      "/assets/placeholder-shoe-2.png",
      "/assets/placeholder-shoe-3.png"
    ],
    sizes: [
      { size: "8",   price: 225 },
      { size: "8.5", price: 234 },
      { size: "9",   price: 256 },
      { size: "9.5", price: 263 },
      { size: "10",  price: 289 },
      { size: "10.5",price: 282 },
      { size: "11",  price: 271 },
      { size: "11.5",price: 278 },
      { size: "12",  price: 286 },
      { size: "12.5",price: 267 },
      { size: "13",  price: 259 },
      { size: "14",  price: 250 }
    ],
    related: ["aj4-bred", "nb-550", "nike-dunk-low"]
  },

  "nike-dunk-low": {
    id: "nike-dunk-low",
    title: "Nike Dunk Low",
    brand: "Nike",
    styleCode: "DD1391-100",
    year: 2021,
    condition: "Brand New",
    colorway: "White / Black",
    hero: "/assets/placeholder-shoe-nike.png",
    thumbs: ["/assets/placeholder-shoe-nike.png"],
    sizes: [
      { size: "7", price: 170 },
      { size: "8", price: 180 },
      { size: "9", price: 185 },
      { size: "10", price: 190 },
      { size: "11", price: 195 }
    ],
    related: ["aj4-cool-grey", "nb-550"]
  },

  "nb-550": {
    id: "nb-550",
    title: "New Balance 550",
    brand: "New Balance",
    styleCode: "BB550WT1",
    year: 2022,
    condition: "Brand New",
    colorway: "White / Green",
    hero: "/assets/placeholder-shoe-nb.png",
    thumbs: ["/assets/placeholder-shoe-nb.png"],
    sizes: [
      { size: "8", price: 150 },
      { size: "9", price: 155 },
      { size: "10", price: 160 },
      { size: "11", price: 165 }
    ],
    related: ["aj4-cool-grey", "nike-dunk-low"]
  },

  "nb-990v5": {
  id: "nb-990v5",
  title: "New Balance 990v5",
  brand: "New Balance",
  styleCode: "M990GL5",
  year: 2019,
  condition: "Brand New",
  colorway: "Grey / White",
  hero: "/assets/placeholder-shoe-nb.png",
  thumbs: ["/assets/placeholder-shoe-nb.png"],
  sizes: [
    { size: "8", price: 185 },
    { size: "9", price: 190 },
    { size: "10", price: 195 },
    { size: "11", price: 200 }
  ],
  related: ["nb-550", "nb-2002r"]
},

"nb-2002r": {
  id: "nb-2002r",
  title: "New Balance 2002R",
  brand: "New Balance",
  styleCode: "M2002R",
  year: 2020,
  condition: "Brand New",
  colorway: "Rain Cloud / Grey",
  hero: "/assets/placeholder-shoe-nb.png",
  thumbs: ["/assets/placeholder-shoe-nb.png"],
  sizes: [
    { size: "7", price: 140 },
    { size: "8", price: 145 },
    { size: "9", price: 150 },
    { size: "10", price: 155 }
  ],
  related: ["nb-990v5", "nb-574"]
},

"nb-574": {
  id: "nb-574",
  title: "New Balance 574",
  brand: "New Balance",
  styleCode: "ML574EVG",
  year: 2018,
  condition: "Brand New",
  colorway: "Grey / White",
  hero: "/assets/placeholder-shoe-nb.png",
  thumbs: ["/assets/placeholder-shoe-nb.png"],
  sizes: [
    { size: "6", price: 90 },
    { size: "7", price: 95 },
    { size: "8", price: 100 },
    { size: "9", price: 105 }
  ],
  related: ["nb-550", "nb-2002r"]
},

  "aj4-bred": {
    id: "aj4-bred",
    title: 'Air Jordan 4 “Bred”',
    brand: "Jordan",
    styleCode: "308497-060",
    year: 2019,
    condition: "Brand New",
    colorway: "Black / Cement Grey / Fire Red",
    hero: "/assets/placeholder-shoe-bred.png",
    thumbs: ["/assets/placeholder-shoe-bred.png"],
    sizes: [
      { size: "8", price: 310 },
      { size: "9", price: 320 },
      { size: "10", price: 330 }
    ],
    related: ["aj4-cool-grey"]
  },

  // ----------------- New Nike entries -----------------

  "nike-air-max-270": {
    id: "nike-air-max-270",
    title: "Nike Air Max 270",
    brand: "Nike",
    styleCode: "AH8050-100",
    year: 2018,
    condition: "Brand New",
    colorway: "White / Black",
    hero: "/assets/placeholder-shoe-nike.png",
    thumbs: ["/assets/placeholder-shoe-nike.png"],
    sizes: [
      { size: "7", price: 150 },
      { size: "8", price: 160 },
      { size: "9", price: 165 },
      { size: "10", price: 170 },
      { size: "11", price: 175 }
    ],
    related: ["nike-dunk-low", "nb-550"]
  },

  "nike-zoom-fly-5": {
    id: "nike-zoom-fly-5",
    title: "Nike Zoom Fly 5",
    brand: "Nike",
    styleCode: "DM8968-001",
    year: 2022,
    condition: "Brand New",
    colorway: "Black / White",
    hero: "/assets/placeholder-shoe-nike.png",
    thumbs: ["/assets/placeholder-shoe-nike.png"],
    sizes: [
      { size: "7", price: 190 },
      { size: "8", price: 200 },
      { size: "9", price: 210 },
      { size: "10", price: 215 },
      { size: "11", price: 220 }
    ],
    related: ["nike-dunk-low"]
  },

  "nike-air-force-1": {
    id: "nike-air-force-1",
    title: "Nike Air Force 1",
    brand: "Nike",
    styleCode: "CW2288-111",
    year: 2020,
    condition: "Brand New",
    colorway: "White / White",
    hero: "/assets/placeholder-shoe-nike.png",
    thumbs: ["/assets/placeholder-shoe-nike.png"],
    sizes: [
      { size: "6", price: 110 },
      { size: "7", price: 115 },
      { size: "8", price: 120 },
      { size: "9", price: 125 },
      { size: "10", price: 130 }
    ],
    related: ["nike-dunk-low", "aj4-cool-grey"]
  },
   // ----------------- Adidas entries -----------------

  "adidas-ultraboost": {
    id: "adidas-ultraboost",
    title: "Adidas Ultraboost",
    brand: "Adidas",
    styleCode: "BB6149",
    year: 2018,
    condition: "Brand New",
    colorway: "Core Black / White",
    hero: "/assets/placeholder-shoe.png",
    thumbs: ["/assets/placeholder-shoe.png"],
    sizes: [
      { size: "7", price: 180 },
      { size: "8", price: 190 },
      { size: "9", price: 195 },
      { size: "10", price: 200 },
      { size: "11", price: 205 }
    ],
    related: ["adidas-samba-og", "adidas-nmd-r1"]
  },

  "adidas-samba-og": {
    id: "adidas-samba-og",
    title: "Adidas Samba OG",
    brand: "Adidas",
    styleCode: "B75807",
    year: 2020,
    condition: "Brand New",
    colorway: "White / Black / Gum",
    hero: "/assets/placeholder-shoe.png",
    thumbs: ["/assets/placeholder-shoe.png"],
    sizes: [
      { size: "6", price: 100 },
      { size: "7", price: 105 },
      { size: "8", price: 110 },
      { size: "9", price: 115 },
      { size: "10", price: 120 }
    ],
    related: ["adidas-ultraboost", "adidas-forum-low"]
  },

  "adidas-forum-low": {
    id: "adidas-forum-low",
    title: "Adidas Forum Low",
    brand: "Adidas",
    styleCode: "FY7756",
    year: 2021,
    condition: "Brand New",
    colorway: "White / Blue",
    hero: "/assets/placeholder-shoe.png",
    thumbs: ["/assets/placeholder-shoe.png"],
    sizes: [
      { size: "7", price: 120 },
      { size: "8", price: 125 },
      { size: "9", price: 130 },
      { size: "10", price: 135 },
      { size: "11", price: 140 }
    ],
    related: ["adidas-samba-og", "adidas-nmd-r1"]
  },

  "adidas-nmd-r1": {
    id: "adidas-nmd-r1",
    title: "Adidas NMD R1",
    brand: "Adidas",
    styleCode: "BA7245",
    year: 2017,
    condition: "Brand New",
    colorway: "Core Black / White",
    hero: "/assets/placeholder-shoe.png",
    thumbs: ["/assets/placeholder-shoe.png"],
    sizes: [
      { size: "7", price: 140 },
      { size: "8", price: 150 },
      { size: "9", price: 155 },
      { size: "10", price: 160 },
      { size: "11", price: 165 }
    ],
    related: ["adidas-ultraboost", "nb-550"]
  }
};
