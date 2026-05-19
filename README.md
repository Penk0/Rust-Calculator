# Rust Recycling Calculator

Simple web app for calculating recycler outputs from an inventory list.

## Run locally

### Option 1 (quick)
Open `index.html` directly in your browser.

### Option 2 (recommended)
Serve the folder locally (better for browser consistency):

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## How to test it

### 1) Syntax check

```bash
node --check app.js
```

If you see no output and exit code `0`, JavaScript syntax is valid.

### 2) UI smoke test

1. Open the app.
2. Confirm item rows render from `data/recycler-data.js`.
3. Use search (example: `tech`) and verify filtering works.
4. Click `+1` on an item and confirm quantity updates.
5. Click **Clear Inventory** and confirm all results reset.

### 3) Math verification test (with sample data)

Using the included demo data:

- `Tech Trash` outputs:
  - `Scrap` 20 (`guaranteed`)
  - `High Quality Metal` 1 (`chance`)

Set `Tech Trash` quantity to `2` and verify:

- **Radtown (60%)**
  - Scrap: `40.00`
  - High Quality Metal: `1.20`
- **Safezone (40%)**
  - Scrap: `40.00`
  - High Quality Metal: `0.80`

This confirms that:

- `guaranteed` outputs are full amount
- `chance` outputs are multiplied by recycler efficiency

## Data format

Edit `data/recycler-data.js` with the full recycle list (for all Rust items) using this shape:

```js
window.RECYCLER_DATA = [
  {
    item: "Item Name",
    outputs: [
      { name: "Resource", amount: 10, type: "guaranteed" },
      { name: "Resource", amount: 1, type: "chance" }
    ]
  }
];
```

- `guaranteed` = always returned at full amount.
- `chance` = multiplied by recycler efficiency (60% radtown, 40% safezone).

## Notes

- This project is prepared for your full RustClash recycler list.
- Replace demo entries with the complete list you already collected.
