# 📸 Projet Perso - App Photo sociale

Une application Angular pour capturer, publier, commenter et liker des photos.  
Le backend Express est hébergé sur Render et le frontend Angular est déployé sur GitHub Pages.

---

## 🔧 Technologies

- **Frontend** : Angular 17 + Material Design
- **Backend** : Node.js + Express + Multer
- **Base de données** : Fichier JSON (`photos.json`)
- **Stockage des images** : local (dossier `/uploads`)
- **Déploiement** :
  - Frontend : GitHub Pages
  - Backend : Render Web Service

---

## 🌐 Démo en ligne

- 🖼️ Frontend : [https://<TON-UTILISATEUR>.github.io/perso_project/](https://<TON-UTILISATEUR>.github.io/perso_project/)
- 🔙 Backend API : [https://<TON-BACKEND>.onrender.com/api/photos](https://<TON-BACKEND>.onrender.com/api/photos)

> Remplace `<TON-UTILISATEUR>` et `<TON-BACKEND>` par ton nom GitHub / Render

---

## 🚀 Fonctionnalités

- 📷 Capturer des photos via la caméra
- 🖼️ Publier une photo avec description
- ❤️ Aimer une photo (likes persistants)
- 💬 Ajouter un commentaire (persistant)
- 🗂️ Galerie en mode "fil d’actualité"
- 🧩 Mode jeu mémoire (cartes à retourner)

---

## 📁 Architecture du dépôt

```
perso_project/
├── src/                      # Angular frontend
├── dist/                     # App compilée (prod)
├── backend/                  # Backend Express
│   ├── server.js
│   ├── photos.json
│   └── uploads/
└── README.md
```

---

## 🧪 Lancer en local

### Backend :
```bash
cd backend
npm install
node server.js
# Serveur : http://localhost:3000
```

### Frontend :
```bash
cd perso_project
npm install
ng serve
# App : http://localhost:4200
```

---

## 🌍 Déploiement

### 📤 Frontend (GitHub Pages)

```bash
ng build --configuration production
cp dist/test1/browser/index.html dist/test1/browser/404.html
npx angular-cli-ghpages --dir=dist/test1/browser
```

### 🔁 Backend (Render Web Service)

- Crée un dépôt `backend-api`
- Déploie via Render :
  - Build command : `npm install`
  - Start command : `node server.js`
  - Root dir : `backend/` ou `.`
  - Port auto géré par Render

---

## 🧠 Auteur

- [@Krukry05](https://github.com/Krukry05)
