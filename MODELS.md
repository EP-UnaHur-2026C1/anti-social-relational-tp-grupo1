# Modelos de Datos

Este documento describe los 6 modelos de la base de datos de la red social Anti Social.

---

## 1. Usuario

Representa a un usuario de la plataforma.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental, único |
| `nickName` | STRING | Nombre del usuario, único |
| `email` | STRING | Email del usuario, único |
| `password` | STRING | Contraseña del usuario |
| `createdAt` | DATE | Fecha de creación del usuario |
| `updatedAt` | DATE | Fecha de última actualización del usuario |
| `deletedAt` | DATE | Fecha de eliminación lógica del usuario. Puede ser `null` |

### Ejemplo

```json
{
  "id": 1,
  "nickName": "Juan Perez",
  "email": "juanperez@gmail.com",
  "password": "juanperez123",
  "createdAt": "2026-05-31T15:30:00.000Z",
  "updatedAt": "2026-05-31T15:30:00.000Z",
  "deletedAt": null
}
```

---

## 2. Post

Representa una publicación en la red social.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idPost` | INTEGER | Clave primaria, autoincremental |
| `fecha` | DATE | Fecha y hora de la publicación |
| `texto` | TEXT | Contenido de la publicación |
| `idUsuario` | INTEGER | Clave Foránea que referencia al usuario |

### Ejemplo

```json
{
  "idPublicacion": 1,
  "fecha": "2026-05-15",
  "texto": "Hola mundo!",
  "idUsuario": 1
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
| `createdAt` | DATE | Fecha de creación del comentario |
| `updatedAt` | DATE | Fecha de última actualización del comentario |
| `deletedAt` | DATE | Fecha de eliminación lógica del comentario. Puede ser `null` |
| `idPost` | INTEGER | Clave foránea que referencia al post |
| `idUsuario` | INTEGER | Clave foránea que referencia al usuario |


### Ejemplo

```json
{
  "id": 1,
  "texto": "Muy buen post!",
  "fecha": "2026-05-15",
  "esVisible": true,
  "createdAt": "2026-05-31T15:30:00.000Z",
  "updatedAt": "2026-05-31T15:30:00.000Z",
  "deletedAt": null,
  "idPost": 1,
  "idUsuario": 1
}
```

---

## 4. Tag

Representa una etiqueta/categoría para posts.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, autoincremental |
| `nombre` | STRING | Nombre de la etiqueta | Unico |
| `createdAt` | DATE | Fecha de creación del tag |
| `updatedAt` | DATE | Fecha de última actualización del tag |
| `deletedAt` | DATE | Fecha de eliminación lógica del tag. Puede ser `null` |


### Ejemplo

```json
{
  "id": 1,
  "nombre": "tecnologia",
  "createdAt": "2026-05-31T15:30:00.000Z",
  "updatedAt": "2026-05-31T15:30:00.000Z",
  "deletedAt": null
}
```

---

## 5. PostImagen

Representa una imagen asociada a un post.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idImagen` | INTEGER | Clave primaria, autoincremental |
| `url` | STRING | URL de la imagen |
| `idPost` | STRING | Clave Foránea que referencia al post |

### Ejemplo

```json
{
  "idImagen": 1,
  "url": "https://ejemplo.com/imagen.jpg",
  "idPost": 1
}
```

---

## 6. Index (Relaciones)

Este archivo (`models/index.js`) configura las asociaciones entre los modelos mediante Sequelize.

### Relaciones esperadas 

- **Usuario** tiene muchos **Post**
- **Post** tiene muchos **Comentario**
- **Post** tiene muchos **Tag**
- **Post** tiene muchos **PostImagen**
- **Usuario** tiene muchos **Comentario**
- **Usuario** tiene muchos **Usuario**

---

## Notas

- Todos los modelos usan **Sequelize** como ORM
- Base de datos: **SQLite** (configurable en `config/config.json`)
- Las migraciones se encuentran en la carpeta `migrations/`
