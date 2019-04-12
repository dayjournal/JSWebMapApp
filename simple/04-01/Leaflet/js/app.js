
// MIERUNE MONO読み込み
let m_mono = new L.tileLayer("https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

// MIERUNE Color読み込み
let m_color = new L.tileLayer("https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

// 地理院タイル 淡色読み込み
let t_pale = new L.tileLayer("http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});

// 地理院タイル オルソ読み込み
let t_ort = new L.tileLayer("http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg", {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});

// OpenStreetMap読み込み
let o_std = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


// レイヤ設定
let Map_BaseLayer = {
    "MIERUNE MONO": m_mono,
    "MIERUNE Color": m_color,
    "地理院タイル 淡色": t_pale,
    "地理院タイル オルソ": t_ort,
    "OpenStreetMap": o_std
};


// Map読み込み
let map = L.map("map", {
    center: [35.6810,139.7670],
    zoom: 14,
    zoomControl: false,
    layers: [m_mono]
});


// レイヤコントロール
L.control.layers(Map_BaseLayer, null, {
    collapsed: false
}).addTo(map);
