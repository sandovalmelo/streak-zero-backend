# ⚙️ Streak Zero — Backend API

API REST responsável pela gestão de hábitos da aplicação **Streak Zero**.

---

## 🌐 Base URL

```id="z8k2lm"
https://streak-zero-backend.onrender.com/
```

---

## 🧠 Funcionalidades

* ➕ Criar hábitos
* 📋 Listar hábitos
* 🔁 Atualizar hábitos
* 🗑️ Remover hábitos
* 🔥 Gerenciar streak baseado em datas
* 📅 Controle por `lastCompletedDate`

---

## 🧱 Tecnologias

* Node.js
* Express
* MySQL (Railway)

---

## 🗄️ Estrutura da Tabela

```sql id="o3x8qa"
CREATE TABLE habits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  streak INT DEFAULT 0,
  lastCompletedDate DATE
);
```

---

## 🔗 Endpoints

### 📋 Listar hábitos

```http id="x9q2lm"
GET /habits
```

---

### ➕ Criar hábito

```http id="p2k8zs"
POST /habits
```

Body:

```json id="m8x1qp"
{
  "name": "Treinar"
}
```

---

### 🔁 Atualizar hábito

```http id="c7p9lm"
PATCH /habits/:id
```

---

### 🗑️ Deletar hábito

```http id="v1k2zx"
DELETE /habits/:id
```

---

## 🧮 Lógica de Streak

* Se completado ontem → incrementa streak
* Se pulou dia → streak reinicia
* Se já completado hoje → bloqueia ação

---

## ⚙️ Rodando localmente

```bash id="b3q9lm"
npm install
npm run dev
```

---

## 🔐 Variáveis de Ambiente

```env id="k8z1qp"
DATABASE_URL=
PORT=
```

---

## 🚀 Deploy

* Render (API)
* Railway (MySQL)

---

## 👨‍💻 Autor

Desenvolvido por Sandoval Melo

---
