
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
    zoomControl: true,
    layers: [m_mono]
});


// マーカー追加
let MapMarker = L.marker([
    35.6810,139.7670
]).addTo(map);

// サークル追加
let MapCircle = L.circle([35.6800,139.7600], 50,{
    color: "#1253A4",
    weight: 3,
    opacity: 0.8,
    fillColor: "#1253A4",
    fillOpacity: 0.5
}).addTo(map);

// ライン追加
let MapLine = L.polyline([
    [35.6641,139.7627],
    [35.6721,139.7552],
    [35.6888,139.7580],
    [35.6970,139.7666]
],{
    color: "#FFD464",
    weight: 10,
    opacity: 0.8
}).addTo(map);

// ポリゴン追加
let MapPolygon = L.polygon([
    [35.6759,139.7661],
    [35.6741,139.7718],
    [35.6745,139.7722],
    [35.6837,139.7786],
    [35.6843,139.7734],
    [35.6846,139.7709],
    [35.6799,139.7687],
    [35.6759,139.7661]
],{
    color: "#58BE89",
    weight: 10,
    opacity: 0.8,
    fillColor: "#58BE89",
    fillOpacity: 0.5
}).addTo(map);


// レイヤコントロール
L.control.layers(Map_BaseLayer, null, {
    collapsed: false
}).addTo(map);


// スケールバーコントロール
L.control.scale({
    imperial: false,
    maxWidth: 300
}).addTo(map);
