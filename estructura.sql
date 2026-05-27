-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'empleado'
);

-- 2. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 3. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    stock_actual INT DEFAULT 0,
    stock_minimo INT DEFAULT 5,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. Tabla de Historial de Movimientos
CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'ingreso', 'venta', 'devolucion', 'perdida'
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
