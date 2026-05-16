# Modelos de Datos

Este documento describe los 6 modelos de la base de datos de la red social Anti Social.

---

## 1. Usuario

Representa a un usuario de la plataforma.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental | Unico
| `nickname` | STRING | Nombre del usuario | Unico
| `email` | STRING | Email del usuario | Unico
| `password`| STRING | Contraseña del usuario

### Ejemplo

```json
{
  "id": 1,
  "nickName": "Juan Perez",
  "email": "juanperez@gmail.com",
  "password": "juanperez123"
}
```

---

## 2. Post

Representa una publicación en la red social.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental |
| `titulo` | STRING | Título de la publicación |
| `contenido` | STRING | Contenido/texto de la publicación |
| `fecha` | TEXT | Fecha de creación (formato texto) |

### Ejemplo

```json
{
  "id": 1,
  "titulo": "Mi primer post",
  "contenido": "Hola mundo!",
  "fecha": "2026-05-15"
}
```

---

## 3. Comentario

Representa un comentario en una publicación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental |
| `texto` | STRING | Contenido del comentario |
| `fecha` | TEXT | Fecha de creación del comentario |
| `esVisible` | BOOLEAN | Indica si el comentario está visible |

### Ejemplo

```json
{
  "id": 1,
  "texto": "Muy buen post!",
  "fecha": "2026-05-15",
  "esVisible": true
}
```

---

## 4. Tag

Representa una etiqueta/categoría para posts.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental |
| `nombre` | STRING | Nombre de la etiqueta | Unico

### Ejemplo

```json
{
  "id": 1,
  "nombre": "tecnologia"
}
```

---

## 5. PostImagen

Representa una imagen asociada a un post.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental |
| `nombre` | STRING | Nombre/descripción de la imagen |
| `URL` | TEXT | URL de la imagen |

### Ejemplo

```json
{
  "id": 1,
  "nombre": "Foto de perfil",
  "URL": "https://ejemplo.com/imagen.jpg"
}
```

---

## 6. Index (Relaciones)

Este archivo (`models/index.js`) configura las asociaciones entre los modelos mediante Sequelize.

### Relaciones esperadas (a implementar)

- **Usuario** tiene muchos **Post**
- **Post** tiene muchos **Comentario**
- **Post** tiene muchos **Tag** (relación muchos a muchos)
- **Post** tiene muchos **PostImagen**
- **Usuario** tiene muchos **Comentario**

---

## Notas

- Todos los modelos usan **Sequelize** como ORM
- Base de datos: **SQLite** (configurable en `config/config.json`)
- Las migraciones se encuentran en la carpeta `migrations/`