
// MIERUNE MONO読み込み
let m_mono = new L.tileLayer("https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

// Map読み込み
let map = L.map("map", {
    center: [35.6810,139.7670],
    zoom: 14,
    layers: [m_mono]
});
