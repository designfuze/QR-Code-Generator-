let qr = new QRious({
  element: document.getElementById('qrCanvas'),
  size: 300
});

function createQR(){
  let type = document.getElementById("type").value;
  let data = document.getElementById("data").value;
  let color = document.getElementById("color").value;
  let size = document.getElementById("size").value;

  if(data=="") return alert("Enter something");

  if(type=="whatsapp") data = "https://wa.me/" + data;
  if(type=="phone") data = "tel:" + data;

  qr.set({
    value: data,
    size: size,
    foreground: color
  });

  saveHistory(data);
}

function downloadQR(){
  let link = document.createElement("a");
  link.download = "qr.png";
  link.href = qr.toDataURL();
  link.click();
}

function saveHistory(data){
  let history = JSON.parse(localStorage.getItem("qrHistory")) || [];
  history.unshift(data);
  localStorage.setItem("qrHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory(){
  let history = JSON.parse(localStorage.getItem("qrHistory")) || [];
  let div = document.getElementById("history");
  div.innerHTML="";
  history.slice(0,5).forEach(item=>{
    let d=document.createElement("div");
    d.innerText=item;
    div.appendChild(d);
  });
}

renderHistory();
