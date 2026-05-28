# App Android/iOS

Este proyecto quedo preparado para empaquetarse con Capacitor.

## Que falta instalar

- Node.js con npm
- Android Studio con Android SDK, para generar APK/AAB
- Una Mac con Xcode, para generar la app de iPhone/iPad

## Backend HTTPS

La app usa endpoints como `/api/profiles` y `/api/dishes`. Para Android/iOS real, publica `server.js` en un hosting HTTPS, por ejemplo Render o Railway, y luego cambia `public/mobile-config.js`:

```js
window.MENU_ABP_API_BASE_URL = "https://tu-backend.onrender.com";
```

En desarrollo web local puede quedarse vacio.

## Comandos

```powershell
npm install
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
```

Desde Android Studio:

- Build > Generate Signed Bundle / APK
- Elige APK para instalacion directa o AAB para Google Play

Para iOS:

```powershell
npm run cap:add:ios
npm run cap:sync
```

Luego abre el proyecto iOS en una Mac con Xcode para compilar y publicar en TestFlight/App Store.
