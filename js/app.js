async function loadKhutbahs(){

const response = await fetch("/data/khutbahs.json");

const data = await response.json();

const container = document.getElementById("khutbah-list");

data.khutbahs.forEach(k => {

const div = document.createElement("div");

div.innerHTML = `
<h3>${k.title}</h3>
<p>Speaker: ${k.speaker}</p>
<p>Date: ${k.date}</p>
`;

container.appendChild(div);

});

}

loadKhutbahs();
