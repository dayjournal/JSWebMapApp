
// Mapbox APIkey (オフィシャルサンプルkey)
mapboxgl.accessToken = "pk.eyJ1Ijoic29iZXJqcCIsImEiOiJjamg0cmNtMmwwZ2Q4MnFvMzh5ODB2dTdwIn0.xezpDoQXZokQcjK9YgkeLQ";
// MIERUNE地図 APIkey (有償版のため今回はダミー)
MIERUNE_apikey = "xxxxxxxx";


// Mapbox Streets読み込み
let map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [139.7670, 35.6810],
    zoom: 13
});


map.on("load", function() {

    // レイヤ設定
    let Map_BaseLayer = {
        streets: "Mapbox Streets",
        dark: "Mapbox Dark",
        satellite: "Mapbox Satellite",
        normal: "MIERUNE Normal",
        warm: "MIERUNE Warm"
    };


    // レイヤメニュー作成
    for (let i = 0; i < Object.keys(Map_BaseLayer).length; i++) {
        // StyleID取得
        let id = Object.keys(Map_BaseLayer)[i];
        // aタグ作成
        let link = document.createElement("a");
        link.href = "#";
        // id追加
        link.id = id;
        // 名称追加
        link.textContent = Map_BaseLayer[id];

        // 初期表示streets以外非表示
        if (id === "streets") {
            link.className = "active";
        } else {
            link.className = "";
        }

        //aタグクリック処理
        link.onclick = function (e) {
            // id取得
            let clickedLayer = this.id;
            e.preventDefault();
            e.stopPropagation();

            // ON/OFF判断
            if (this.className === "active") {
            } else {
                for (let j = 0; j < Object.keys(Map_BaseLayer).length; j++) {
                    // レイヤID取得
                    let ch_id = Object.keys(Map_BaseLayer)[j];

                    // レイヤの表示・非表示
                    if (ch_id === clickedLayer) {
                        // クリックしたレイヤを表示
                        this.className = "active";
                        // レイヤに対応したURLに切り替え
                        if (clickedLayer === "normal" || clickedLayer === "warm") {
                            map.setStyle("https://tile.cdn.mierune.co.jp/styles/" + clickedLayer + "/style.json" + "?key=" + MIERUNE_apikey);
                        } else {
                            map.setStyle('mapbox://styles/mapbox/' + clickedLayer + '-v9');
                        }
                    } else {
                        // クリックしたレイヤ以外を非表示
                        let ch_obj = document.getElementById(ch_id);
                        ch_obj.className = "";
                    }
                }
            }
        };

        // レイヤメニューにレイヤ追加
        let layers = document.getElementById("menu");
        layers.appendChild(link);
    }

});


// ズームコントロール
let nc = new mapboxgl.NavigationControl();
map.addControl(nc, 'top-left');
