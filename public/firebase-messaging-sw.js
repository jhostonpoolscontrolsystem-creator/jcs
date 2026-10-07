importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Configuração padrão do Firebase para background messaging
// Este arquivo é carregado pelo navegador para capturar push com o app fechado/em segundo plano
firebase.initializeApp({
  apiKey: "AIzaSy...", // Será injetado ou alimentado dinamicamente
  projectId: "jhpcs-pools",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Notificação recebida em background:', payload);
  
  const notificationTitle = payload.notification?.title || '🚨 JHoston Pools - Alerta de Auditoria';
  const notificationOptions = {
    body: payload.notification?.body || 'Nova notificação de conformidade química.',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
