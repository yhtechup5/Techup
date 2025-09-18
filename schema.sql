CREATE TABLE IF NOT EXISTS public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL UNIQUE,
  color character varying NOT NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
  
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
  
CREATE TABLE IF NOT EXISTS public.carts (
  user_id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT carts_pkey PRIMARY KEY (user_id, product_id),
  CONSTRAINT carts_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);