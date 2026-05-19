const RATE = { radtown: 0.6, safezone: 0.4 };
const rowsEl = document.getElementById("itemRows");
const searchEl = document.getElementById("search");
const out60 = document.getElementById("out60");
const out40 = document.getElementById("out40");
const clearBtn = document.getElementById("clear");

const inventory = new Map();
const items = (window.RECYCLER_DATA || []).sort((a, b) => a.item.localeCompare(b.item));

function expectedAmount(output, qty, rate) {
  const total = output.amount * qty;
  return output.type === "chance" ? total * rate : total;
}

function renderList(target, totals) {
  target.innerHTML = "";
  if (!totals.size) {
    target.innerHTML = "<li>Recycler is empty.</li>";
    return;
  }
  [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, amount]) => {
      const li = document.createElement("li");
      li.textContent = `${name}: ${amount.toFixed(2)}`;
      target.appendChild(li);
    });
}

function calculate() {
  const t60 = new Map();
  const t40 = new Map();

  for (const [itemName, qty] of inventory) {
    const item = items.find((x) => x.item === itemName);
    if (!item || qty <= 0) continue;

    for (const output of item.outputs) {
      const v60 = expectedAmount(output, qty, RATE.radtown);
      const v40 = expectedAmount(output, qty, RATE.safezone);
      t60.set(output.name, (t60.get(output.name) || 0) + v60);
      t40.set(output.name, (t40.get(output.name) || 0) + v40);
    }
  }

  renderList(out60, t60);
  renderList(out40, t40);
}

function buildRows(filter = "") {
  rowsEl.innerHTML = "";
  const q = filter.trim().toLowerCase();

  items
    .filter((it) => it.item.toLowerCase().includes(q))
    .forEach((it) => {
      const tr = document.createElement("tr");
      const tdItem = document.createElement("td");
      const tdQty = document.createElement("td");
      const tdAdd = document.createElement("td");

      tdItem.textContent = it.item;

      const input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.value = inventory.get(it.item) || 0;
      input.addEventListener("change", () => {
        inventory.set(it.item, Number(input.value || 0));
        calculate();
      });
      tdQty.appendChild(input);

      const addOne = document.createElement("button");
      addOne.textContent = "+1";
      addOne.addEventListener("click", () => {
        const next = (inventory.get(it.item) || 0) + 1;
        inventory.set(it.item, next);
        input.value = next;
        calculate();
      });
      tdAdd.appendChild(addOne);

      tr.append(tdItem, tdQty, tdAdd);
      rowsEl.appendChild(tr);
    });
}

searchEl.addEventListener("input", () => buildRows(searchEl.value));
clearBtn.addEventListener("click", () => {
  inventory.clear();
  buildRows(searchEl.value);
  calculate();
});

buildRows();
calculate();
