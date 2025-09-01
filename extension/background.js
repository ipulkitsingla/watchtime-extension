async function sendToServer(userId, site, time) {
  try {
    await fetch("https://watchtime-extension.onrender.com/api/watch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, site, time })
    });
  } catch (err) {
    console.error("Failed to send data:", err);
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.event === "watched") {
    let site = new URL(sender.tab.url).hostname;

    // use fixed userId for now (later: login system)
    let userId = "demoUser123";
    sendToServer(userId, site, msg.time);
  }
});