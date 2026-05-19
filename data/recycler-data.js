// Replace this dataset with your full rustclash recycle list.
// Shape:
// [{
//   "item": "Tech Trash",
//   "outputs": [
//     {"name": "Scrap", "amount": 20, "type": "guaranteed"},
//     {"name": "HQM", "amount": 1, "type": "chance"}
//   ]
// }]
window.RECYCLER_DATA = [
  {
    item: "Tech Trash",
    outputs: [
      { name: "Scrap", amount: 20, type: "guaranteed" },
      { name: "High Quality Metal", amount: 1, type: "chance" }
    ]
  },
  {
    item: "Road Signs",
    outputs: [
      { name: "Scrap", amount: 5, type: "guaranteed" },
      { name: "High Quality Metal", amount: 1, type: "chance" }
    ]
  },
  {
    item: "Rope",
    outputs: [
      { name: "Cloth", amount: 15, type: "guaranteed" }
    ]
  }
];
