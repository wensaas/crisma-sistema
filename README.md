# Tienda Crisma — Sistema de Gestión
WenSAAS · 2026

Sistema integral de administración para Tienda Crisma con 7 módulos: Inventario, Clientes, Créditos, Ingresos, Egresos, Liquidación y Dashboard.

## Módulos
- **Inventario** — productos, stock, alertas de bajo inventario
- **Clientes** — base de datos con historial
- **Créditos** — gestión de créditos, pagos y vencimientos
- **Ingresos** — ventas y entradas de dinero
- **Egresos** — gastos por categoría
- **Liquidación** — informes por rango de fechas
- **Dashboard** — resumen general

## Usuarios
| Rol | Permisos |
|-----|----------|
| **Administrador** | Acceso completo (todos los módulos, editar/eliminar) |
| **Cajero** | Solo registrar ventas y crear créditos/clientes |

---

## Configuración Firebase (paso a paso)

### 1. Crear proyecto Firebase
1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Clic en **Agregar proyecto** → nombre: `crisma-tienda`
3. Desactiva Google Analytics (opcional) → **Crear proyecto**

### 2. Configurar Authentication
1. En el menú lateral: **Authentication** → **Comenzar**
2. Pestaña **Sign-in method** → habilitar **Correo electrónico/contraseña**

### 3. Configurar Firestore
1. En el menú lateral: **Firestore Database** → **Crear base de datos**
2. Elegir **Modo de producción** → selecciona la región más cercana (ej: `us-central1`)
3. En la pestaña **Reglas**, pega estas reglas y publica:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuth() { return request.auth != null; }
    function isAdmin() {
      return isAuth() && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin';
    }
    match /usuarios/{uid} {
      allow read: if isAuth();
      allow write: if isAdmin() || request.auth.uid == uid;
    }
    match /{collection}/{doc} {
      allow read: if isAuth();
      allow write: if isAuth();
      allow delete: if isAdmin();
    }
    match /_config/{doc} {
      allow read, write: if true;
    }
  }
}
```

### 4. Obtener configuración
1. En la página principal del proyecto: clic en el ícono **</>** (Web)
2. Nombre de la app: `crisma-web` → **Registrar app**
3. Copia el objeto `firebaseConfig`

### 5. Editar js/config.js
Reemplaza los valores en `js/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### 6. Agregar dominio autorizado
1. Firebase Console → **Authentication** → **Settings** → **Dominios autorizados**
2. Agrega: `wensaas.github.io`

### 7. Crear las cuentas de usuario
1. Abre `https://wensaas.github.io/crisma-sistema/setup.html`
2. Ingresa los datos para admin y cajero
3. Haz clic en **Crear cuentas**
4. ¡Listo! Ve a `https://wensaas.github.io/crisma-sistema/`

---

## Acceso al sistema
URL: `https://wensaas.github.io/crisma-sistema/`
Setup: `https://wensaas.github.io/crisma-sistema/setup.html`

---

## Stack técnico
- HTML5 + CSS3 + JavaScript (vanilla)
- Firebase Authentication (correo/contraseña)
- Firebase Firestore (base de datos en tiempo real)
- GitHub Pages (hosting)
