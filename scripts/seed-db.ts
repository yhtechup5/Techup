import db from '../src/utils/db';

const SQL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS public.products (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NOT NULL UNIQUE,
    color character varying NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
  );`,
  
  `CREATE TABLE IF NOT EXISTS public.users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
  );`,
  
  `CREATE TABLE IF NOT EXISTS public.carts (
    user_id uuid NOT NULL DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT carts_pkey PRIMARY KEY (user_id, product_id),
    CONSTRAINT carts_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
    CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
  );`,
  
  `INSERT INTO public.products (title, color) VALUES 
    ('Ghost White', '#f8f8ff'),
    ('Lavender', '#e6e6fa'),
    ('Papaya Whip', '#ffefd5'),
    ('Light Pink', '#ffb6c1'),
    ('Plum', '#dda0dd'),
    ('Light Gray', '#d3d3d3'),
    ('Platinum', '#e0e0e0'),
    ('Mint Green', '#c8f7c5'),
    ('Rose', '#ffd1dc'),
    ('Powder Blue', '#b0e0e6'),
    ('Wheat', '#f5deb3'),
    ('Thistle', '#d8bfd8'),
    ('Periwinkle', '#dcd0ff'),
    ('Pale Turquoise', '#afeeee'),
    ('Moccasin', '#ffe4b5'),
    ('Orchid', '#da70d6'),
    ('Pale Green', '#98fb98'),
    ('Sky Blue', '#87ceeb'),
    ('Khaki', '#f0e68c'),
    ('Light Sea Green', '#20b2aa'),
    ('Sandy Brown', '#f4a460'),
    ('Pink', '#ffc0cb'),
    ('Light Blue', '#add8e6'),
    ('Light Coral', '#ffcccb'),
    ('Lemon Chiffon', '#fffacd'),
    ('Burlywood', '#deb887'),
    ('Beige', '#f5f5dc'),
    ('Pure White', '#ffffff')
  ON CONFLICT (title) DO NOTHING;`
];

async function main() {
  try {
    for (let i = 0; i < SQL_STATEMENTS.length; i++) {
      const sqlStatement = SQL_STATEMENTS[i];
      console.log(`Executing statement ${i + 1}...`);
      await db.unsafe(sqlStatement);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.end();
  }
}

main();