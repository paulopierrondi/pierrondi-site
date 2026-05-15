/**
 * Jarvis Proactive service worker.
 * Handles Web Push events and notification clicks.
 */

self.addEventListener("install", (_event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) return;
  let data;
  try {
    data = event.data.json();
  } catch (_err) {
    return;
  }
  const title = data.title || "Jarvis";
  const options = {
    body: data.body || "",
    icon: "/icons/jarvis-192.png",
    badge: "/icons/jarvis-badge-64.png",
    tag: data.signalId,
    data: {
      signalId: data.signalId,
      actionUrl: data.actionUrl || "/studio/jarvis",
    },
    actions: [
      { action: "open", title: "Ver" },
      { action: "snooze", title: "Snooze 1h" },
    ],
    requireInteraction: false,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const action = event.action;
  const data = event.notification.data || {};
  const url = data.actionUrl || "/studio/jarvis";

  if (action === "snooze" && data.signalId) {
    event.waitUntil(
      fetch(`/api/jarvis/proactive/signals/${data.signalId}/snooze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: 1 }),
        credentials: "include",
      }).catch(() => undefined),
    );
    return;
  }

  event.waitUntil(
    (async () => {
      if (data.signalId) {
        try {
          await fetch(`/api/jarvis/proactive/signals/${data.signalId}/ack`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ via: "push_click" }),
            credentials: "include",
          });
        } catch (_err) {
          // ignore
        }
      }
      const clientsList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of clientsList) {
        if (client.url.includes("/studio") && "focus" in client) {
          await client.focus();
          if ("navigate" in client) {
            try {
              await client.navigate(url);
            } catch (_err) {
              // ignore
            }
          }
          return;
        }
      }
      await self.clients.openWindow(url);
    })(),
  );
});

self.addEventListener("pushsubscriptionchange", (_event) => {
  // Browser rotated subscription; re-subscribe on next user visit
});
