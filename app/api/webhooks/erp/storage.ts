// Almacenamiento compartido en memoria para alertas ERP
let latestAlert: any = null;

export function setLatestAlert(alert: any) {
  latestAlert = alert;
}

export function getLatestAlert() {
  return latestAlert;
}
