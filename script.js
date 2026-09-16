const properties = [
 {mode:"Buy",title:"Cedar House",location:"North District",type:"Villa",price:1850000,beds:4},
 {mode:"Buy",title:"The Arc",location:"Central Quarter",type:"Apartment",price:920000,beds:2},
 {mode:"Buy",title:"Palm Residence",location:"West Bay",type:"Townhouse",price:1280000,beds:3},
 {mode:"Rent",title:"Park View",location:"Central Quarter",type:"Apartment",price:42000,beds:2},
 {mode:"Rent",title:"Garden Villa",location:"North District",type:"Villa",price:72000,beds:4},
 {mode:"Rent",title:"Harbor Townhouse",location:"West Bay",type:"Townhouse",price:54000,beds:3}
];

let mode = "Buy";
const grid = document.querySelector("#grid");
const count = document.querySelector("#count");

function render() {
  const query = document.querySelector("#query").value.toLowerCase();
  const type = document.querySelector("#type").value;
  const budget = Number(document.querySelector("#budget").value) || Infinity;

  const filtered = properties.filter(p =>
    p.mode === mode &&
    (!query || `${p.title} ${p.location}`.toLowerCase().includes(query)) &&
    (!type || p.type === type) &&
    p.price <= budget
  );

  count.textContent = `${filtered.length} properties`;
  grid.innerHTML = filtered.length ? filtered.map(p => `
    <article class="property">
      <div class="photo">PROPERTY IMAGE</div>
      <div class="property-info">
        <h3>${p.title}</h3><p>${p.location}</p><p>${p.beds} beds · ${p.type}</p>
        <p class="price">${mode === "Buy" ? "$" + p.price.toLocaleString() : "$" + p.price.toLocaleString() + " / year"}</p>
      </div>
    </article>`).join("") : "<p>No properties match your search.</p>";
}

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    mode = btn.dataset.mode;
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});
document.querySelector("#searchBtn").addEventListener("click", render);
["query","type","budget"].forEach(id => document.querySelector("#"+id).addEventListener("input", render));
render();

document.querySelector("#form").addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#status").textContent = `Thanks ${document.querySelector("#name").value}. We'll be in touch shortly.`;
  e.target.reset();
});