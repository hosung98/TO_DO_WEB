"use strict";

var serverUrl = document.location.href;

if(serverUrl.indexOf("http://localhost:3001/") !== -1) { // local
  serverUrl = "http://localhost:3000"
}else { // server
  serverUrl = "https://port-0-to-do-api-108dypx2ale7rwesa.sel3.cloudtype.app"
}
