
// MIERUNE MONO読み込み
let map = new mapboxgl.Map({
    container: "map",
    style: {
        version: 8,
        sources: {
            m_mono: {
                type: "raster",
                tiles: ["https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png"],
                tileSize: 256
            }
        },
        layers: [{
            id: "m_mono",
            type: "raster",
            source: "m_mono",
            minzoom: 0,
            maxzoom: 18
        }]
    },
    center: [140.9850,42.3330],
    zoom: 12
});


map.on("load", function() {

    // MIERUNE Color読み込み
    map.addSource("m_color", {
        type: "raster",
        tiles: ["https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "m_color",
        type: "raster",
        source: "m_color",
        minzoom: 0,
        maxzoom: 18
    });

    // 地理院タイル 淡色読み込み
    map.addSource("t_pale", {
        type: "raster",
        tiles: ["http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "t_pale",
        type: "raster",
        source: "t_pale",
        minzoom: 0,
        maxzoom: 18
    });

    // 地理院タイル オルソ読み込み
    map.addSource("t_ort", {
        type: "raster",
        tiles: ["http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg"],
        tileSize: 256
    });
    map.addLayer({
        id: "t_ort",
        type: "raster",
        source: "t_ort",
        minzoom: 0,
        maxzoom: 18
    });

    // OpenStreetMap読み込み
    map.addSource("o_std", {
        type: "raster",
        tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ],
        tileSize: 256
    });
    map.addLayer({
        id: "o_std",
        type: "raster",
        source: "o_std",
        minzoom: 0,
        maxzoom: 18
    });


    // レイヤ設定
    let Map_BaseLayer = {
        m_mono: "MIERUNE MONO",
        m_color: "MIERUNE Color",
        t_pale: "地理院タイル 淡色",
        t_ort: "地理院タイル オルソ",
        o_std: "OpenStreetMap"
    };


    // レイヤメニュー作成
    for (let i = 0; i < Object.keys(Map_BaseLayer).length; i++) {
        // レイヤID取得
        let id = Object.keys(Map_BaseLayer)[i];
        // aタグ作成
        let link = document.createElement("a");
        link.href = "#";
        // id追加
        link.id = id;
        // 名称追加
        link.textContent = Map_BaseLayer[id];

        // 初期表示m_mono以外非表示
        if (id === "m_mono") {
            link.className = "active";
        } else {
            map.setLayoutProperty(id, "visibility", "none");
            link.className = "";
        }

        //aタグクリック処理
        link.onclick = function (e) {
            // id取得
            let clickedLayer = this.id;
            e.preventDefault();
            e.stopPropagation();

            // ON/OFF状態取得
            let visibility = map.getLayoutProperty(clickedLayer, "visibility");

            // ON/OFF判断
            if (visibility === "visible") {
            } else {
                for (let j = 0; j < Object.keys(Map_BaseLayer).length; j++) {
                    // レイヤID取得
                    let ch_id = Object.keys(Map_BaseLayer)[j];

                    // レイヤの表示・非表示
                    if (ch_id === clickedLayer) {
                        // クリックしたレイヤを表示
                        this.className = "active";
                        map.setLayoutProperty(clickedLayer, "visibility", "visible");
                    } else {
                        // クリックしたレイヤ以外を非表示
                        let ch_obj = document.getElementById(ch_id);
                        ch_obj.className = "";
                        map.setLayoutProperty(ch_id, "visibility", "none");
                    }
                }
            }
        };

        // レイヤメニューにレイヤ追加
        let layers = document.getElementById("menu");
        layers.appendChild(link);
    }


    // マーカー画像設定
    map.loadImage("img/pin01.png", function (error, res) {
        map.addImage("pin01", res);
    });
    map.loadImage("img/pin02.png", function (error, res) {
        map.addImage("pin02", res);
    });

    // マーカー追加
    map.addSource("MapMarker", {
        type: "geojson",
        data: pointdata
    });
    map.addLayer({
        id: "MapMarkerPin01",
        type: "symbol",
        source: "MapMarker",
        layout: {
            "icon-image": "pin01",
            "icon-allow-overlap": true,
            "icon-size": 1.0,
            "icon-anchor": "bottom"
        },
        filter: [">", "OBJECTID", 25]
    });
    // 属性設定
    map.on("click", "MapMarkerPin01", function (e) {
        var coordinates = e.lngLat;
        var field = "目標地点: " + e.features[0].properties.OBJECTID;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapMarkerPin01", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapMarkerPin01", function () {
        map.getCanvas().style.cursor = "";
    });
    map.addLayer({
        id: "MapMarkerPin02",
        type: "symbol",
        source: "MapMarker",
        layout: {
            "icon-image": "pin02",
            "icon-allow-overlap": true,
            "icon-size": 1.0,
            "icon-anchor": "bottom"
        },
        filter: ["<=", "OBJECTID", 25]
    });
    // 属性設定
    map.on("click", "MapMarkerPin02", function (e) {
        var coordinates = e.lngLat;
        var field = "目標地点: " + e.features[0].properties.OBJECTID;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapMarkerPin02", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapMarkerPin02", function () {
        map.getCanvas().style.cursor = "";
    });

    // ライン追加
    map.addSource("MapLine", {
        type: "geojson",
        data: linedata
    });
    map.addLayer({
        id: "MapLine",
        type: "line",
        source: "MapLine",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#FFD464",
            "line-width": 3,
            "line-opacity": 0.8,
            "line-dasharray": [10, 5]
        }
    });
    // 属性設定
    map.on("click", "MapLine", function (e) {
        var coordinates = e.lngLat;
        var field = "距離(m): " + e.features[0].properties.Shape_len;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapLine", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapLine", function () {
        map.getCanvas().style.cursor = "";
    });


    // ポリゴン追加
    map.addSource("MapPolygon", {
        type: "geojson",
        data: polygondata
    });
    map.addLayer({
        id: "MapPolygonMax2",
        type: "fill",
        source: "MapPolygon",
        layout: {},
        paint: {
            "fill-color": "#90D6E5",
            "fill-opacity": 0.4
        },
        filter: ["<", "MEANmax_", 2]
    });
    map.addLayer({
        id: "MapPolygonLineMax2",
        type: "line",
        source: "MapPolygon",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#90D6E5",
            "line-width": 0.5,
            "line-opacity": 0.8
        },
        filter: ["<", "MEANmax_", 2]
    });
    // 属性設定
    map.on("click", "MapPolygonMax2", function (e) {
        var coordinates = e.lngLat;
        var field = "浸水深さ(m): " + e.features[0].properties.MEANmax_;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapPolygonMax2", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapPolygonMax2", function () {
        map.getCanvas().style.cursor = "";
    });
    map.addLayer({
        id: "MapPolygonMin2Max4",
        type: "fill",
        source: "MapPolygon",
        layout: {},
        paint: {
            "fill-color": "#2A5CAA",
            "fill-opacity": 0.4
        },
        filter: ["all",[">=", "MEANmax_", 2],["<", "MEANmax_", 4]]
    });
    map.addLayer({
        id: "MapPolygonLineMin2Max4",
        type: "line",
        source: "MapPolygon",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#2A5CAA",
            "line-width": 0.5,
            "line-opacity": 0.8
        },
        filter: ["all",[">=", "MEANmax_", 2],["<", "MEANmax_", 4]]
    });
    // 属性設定
    map.on("click", "MapPolygonMin2Max4", function (e) {
        var coordinates = e.lngLat;
        var field = "浸水深さ(m): " + e.features[0].properties.MEANmax_;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapPolygonMin2Max4", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapPolygonMin2Max4", function () {
        map.getCanvas().style.cursor = "";
    });
    map.addLayer({
        id: "MapPolygonMin4Max6",
        type: "fill",
        source: "MapPolygon",
        layout: {},
        paint: {
            "fill-color": "#F4EE4F",
            "fill-opacity": 0.6
        },
        filter: ["all",[">=", "MEANmax_", 4],["<", "MEANmax_", 6]]
    });
    map.addLayer({
        id: "MapPolygonLineMin4Max6",
        type: "line",
        source: "MapPolygon",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#F4EE4F",
            "line-width": 0.5,
            "line-opacity": 0.8
        },
        filter: ["all",[">=", "MEANmax_", 4],["<", "MEANmax_", 6]]
    });
    // 属性設定
    map.on("click", "MapPolygonMin4Max6", function (e) {
        var coordinates = e.lngLat;
        var field = "浸水深さ(m): " + e.features[0].properties.MEANmax_;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapPolygonMin4Max6", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapPolygonMin4Max6", function () {
        map.getCanvas().style.cursor = "";
    });
    map.addLayer({
        id: "MapPolygonMin6Max8",
        type: "fill",
        source: "MapPolygon",
        layout: {},
        paint: {
            "fill-color": "#F08167",
            "fill-opacity": 0.6
        },
        filter: ["all",[">=", "MEANmax_", 6],["<", "MEANmax_", 8]]
    });
    map.addLayer({
        id: "MapPolygonLineMin6Max8",
        type: "line",
        source: "MapPolygon",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#F08167",
            "line-width": 0.5,
            "line-opacity": 0.8
        },
        filter: ["all",[">=", "MEANmax_", 6],["<", "MEANmax_", 8]]
    });
    // 属性設定
    map.on("click", "MapPolygonMin6Max8", function (e) {
        var coordinates = e.lngLat;
        var field = "浸水深さ(m): " + e.features[0].properties.MEANmax_;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapPolygonMin6Max8", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapPolygonMin6Max8", function () {
        map.getCanvas().style.cursor = "";
    });
    map.addLayer({
        id: "MapPolygonMax8",
        type: "fill",
        source: "MapPolygon",
        layout: {},
        paint: {
            "fill-color": "#EE2E2A",
            "fill-opacity": 0.8
        },
        filter: [">=", "MEANmax_", 8]
    });
    map.addLayer({
        id: "MapPolygonLineMax8",
        type: "line",
        source: "MapPolygon",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#EE2E2A",
            "line-width": 0.5,
            "line-opacity": 0.8
        },
        filter: [">=", "MEANmax_", 8]
    });
    // 属性設定
    map.on("click", "MapPolygonMax8", function (e) {
        var coordinates = e.lngLat;
        var field = "浸水深さ(m): " + e.features[0].properties.MEANmax_;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(field)
            .addTo(map);
    });
    map.on("mouseenter", "MapPolygonMax8", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "MapPolygonMax8", function () {
        map.getCanvas().style.cursor = "";
    });

    // 追加レイヤ設定
    let Map_AddLayer = {
        PointAll: {
            LayerName: "目標地点" ,
            LayerId: [
                "MapMarkerPin01",
                "MapMarkerPin02"
            ]
        },
        LineAll: {
            LayerName: "避難経路",
            LayerId: ["MapLine"]
        },
        PolygonAll: {
            LayerName: "津波区域" ,
            LayerId: [
                "MapPolygonMax2",
                "MapPolygonMin2Max4",
                "MapPolygonMin4Max6",
                "MapPolygonMin6Max8",
                "MapPolygonMax8",
                "MapPolygonLineMax2",
                "MapPolygonLineMin2Max4",
                "MapPolygonLineMin4Max6",
                "MapPolygonLineMin6Max8",
                "MapPolygonLineMax8"
            ]
        }
    };


    // 追加レイヤメニュー作成
    for (let i = 0; i < Object.keys(Map_AddLayer).length; i++) {
        // レイヤID取得
        let id = Object.keys(Map_AddLayer)[i];
        // aタグ作成
        let link = document.createElement("a");
        link.href = "#";
        // id追加
        link.id = id;
        // 名称追加
        link.textContent = Map_AddLayer[id]["LayerName"];

        // 初期表示全て表示
        link.className = "active";

        //aタグクリック処理
        link.onclick = function (e) {
            // id取得
            let clickedLayer = this.id;
            e.preventDefault();
            e.stopPropagation();

            // ON/OFF状態取得
            let visibility = map.getLayoutProperty(Map_AddLayer[clickedLayer]["LayerId"][0], "visibility");

            // ON/OFF判断
            for (let j = 0; j < Object.keys(Map_AddLayer[clickedLayer]["LayerId"]).length; j++) {
                if (visibility === 'visible') {
                    // クリックしたレイヤを非表示
                    map.setLayoutProperty(Map_AddLayer[clickedLayer]["LayerId"][j], 'visibility', 'none');
                    this.className = '';
                } else {
                    // クリックしたレイヤを表示
                    map.setLayoutProperty(Map_AddLayer[clickedLayer]["LayerId"][j], 'visibility', 'visible');
                    this.className = 'active';
                }
            }
        };

        // 追加レイヤメニューにレイヤ追加
        let layers = document.getElementById("menu_geojson");
        layers.appendChild(link);
    }

    // レイヤ表示順
    map.moveLayer("MapLine", "MapPolygonLineMax8");
    map.moveLayer("MapMarkerPin01", "MapPolygonLineMax8");
    map.moveLayer("MapMarkerPin02", "MapPolygonLineMax8");

});


// ズームコントロール
let nc = new mapboxgl.NavigationControl();
map.addControl(nc, 'top-left');


// スケールバーコントロール
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 300,
    unit: 'metric'
}));
