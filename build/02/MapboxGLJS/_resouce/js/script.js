
// MIERUNE MONO読み込み
var map = new mapboxgl.Map({
    container: "map",
    style: {
        "version": 8,
        "sources": {
            "MIERUNEMAP": {
                "type": "raster",
                "tiles": ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
                "tileSize": 256
            }
        },
        "layers": [{
            "id": "MIERUNEMAP",
            "type": "raster",
            "source": "MIERUNEMAP",
            "minzoom": 0,
            "maxzoom": 18
        }]
    },
    center: [139.767, 35.681],
    zoom: 11
});

// コントロール関係表示
map.addControl(new mapboxgl.NavigationControl());
