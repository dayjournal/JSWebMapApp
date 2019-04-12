
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
    center: [139.7670, 35.6810],
    zoom: 13
});

map.on("load", function() {

});

// ズームコントロール
let nc = new mapboxgl.NavigationControl();
map.addControl(nc, 'top-left');
