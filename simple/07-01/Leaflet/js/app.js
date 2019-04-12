
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
    center: [42.3330,140.9850],
    zoom: 13,
    zoomControl: true,
    layers: [m_mono]
});


// 追加レイヤグループ設定
let PointAll = L.layerGroup().addTo(map);
let LineAll = L.layerGroup().addTo(map);
let PolygonAll = L.layerGroup().addTo(map);


// 追加レイヤ設定
let Map_AddLayer = {
    "目標地点": PointAll,
    "避難経路": LineAll,
    "津波区域": PolygonAll
};


// マーカーアイコン設定
let IconPin01 = L.icon({
    iconUrl: "img/pin01.png",
    iconSize: [25, 25],
    iconAnchor: [0, 25],
    popupAnchor: [0, -35]
});

let IconPin02 = L.icon({
    iconUrl: "img/pin02.png",
    iconSize: [25, 25],
    iconAnchor: [15, 20],
    popupAnchor: [-5, -30]
});


// GeoJSONマーカー読み込み
fetch("vector/point.geojson")
    .then(data => {
        return data.json();
    })
    .then(geojson => {
        L.geoJson(geojson, {
            // マーカーアイコン設定
            pointToLayer: function (feature, layer) {
                if (feature.properties.OBJECTID > 25) {
                    return L.marker(layer, { icon: IconPin01 });
                }else if (feature.properties.OBJECTID <= 25) {
                    return L.marker(layer, { icon: IconPin02 });
                }
            },
            // 属性設定
            onEachFeature: function (feature, layer) {
                let field ="目標地点: " + feature.properties.OBJECTID;
                layer.bindPopup(field);

                // クリックイベント
                layer.on('click', function(e) {
                    // 経緯度位置に移動
                    map.panTo(e.latlng);
                } );
            }
        }).addTo(PointAll);
    });

// GeoJSONライン読み込み
fetch("vector/line.geojson")
    .then(data => {
        return data.json();
    })
    .then(geojson => {
        L.geoJson(geojson, {
            // スタイル設定
            style: {
                color: "#FFD464",
                    weight: 3,
                    opacity: 0.8,
                    dashArray:[10, 5]
            },
            // 属性設定
            onEachFeature: function (feature, layer) {
                let field ="距離(m): " + feature.properties.Shape_len;
                layer.bindPopup(field);

                // クリックイベント
                layer.on('click', function(e) {
                    // 経緯度位置に移動
                    map.panTo(e.latlng);
                } );
            },
            clickable: true
        }).addTo(LineAll);
    });

// GeoJSONポリゴン読み込み
fetch("vector/polygon.geojson")
    .then(data => {
        return data.json();
    })
    .then(geojson => {
        L.geoJson(geojson, {
            // スタイル設定
            style: function(feature) {
                if (feature.properties.MEANmax_ < 2) {
                    return {
                        color: "#90D6E5",
                        weight: 0.5,
                        opacity: 0.8,
                        fillColor: "#90D6E5",
                        fillOpacity: 0.4
                    };
                }else if (feature.properties.MEANmax_ >= 2 && feature.properties.MEANmax_ < 4) {
                    return {
                        color: "#2A5CAA",
                        weight: 0.5,
                        opacity: 0.8,
                        fillColor: "#2A5CAA",
                        fillOpacity: 0.4
                    };
                }else if (feature.properties.MEANmax_ >= 4 && feature.properties.MEANmax_ < 6) {
                    return {
                        color: "#F4EE4F",
                        weight: 0.5,
                        opacity: 0.8,
                        fillColor: "#F4EE4F",
                        fillOpacity: 0.6
                    };
                }else if (feature.properties.MEANmax_ >= 6 && feature.properties.MEANmax_ < 8) {
                    return {
                        color: "#F08167",
                        weight: 0.5,
                        opacity: 0.8,
                        fillColor: "#F08167",
                        fillOpacity: 0.6
                    };
                }else if (feature.properties.MEANmax_ >= 8) {
                    return {
                        color: "#EE2E2A",
                        weight: 0.5,
                        opacity: 0.8,
                        fillColor: "#EE2E2A",
                        fillOpacity: 0.8
                    };
                }
            },
            // 属性設定
            onEachFeature: function (feature, layer) {
                var field ="浸水深さ(m): " + feature.properties.MEANmax_;
                layer.bindPopup(field);

                // クリックイベント
                layer.on('click', function(e) {
                    // 経緯度位置に移動
                    map.panTo(e.latlng);
                } );
            }
        }).addTo(PolygonAll);
    });


// レイヤコントロール
L.control.layers(Map_BaseLayer, Map_AddLayer, {
    collapsed: false
}).addTo(map);


// スケールバーコントロール
L.control.scale({
    imperial: false,
    maxWidth: 300
}).addTo(map);

// URLに経緯度とズームレベル表示
let hash = new L.Hash(map);
