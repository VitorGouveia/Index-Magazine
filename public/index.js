if("serviceWorker" in navigator) {
  try {
    navigator.serviceWorker.register("./service-worker.js")
  } catch(err) {
    console.log("service worker error", err)
  }
}