"use strict"; 

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); 



// 1. 米津玄師の曲データ
let songs = [
    { id: 1, title: "KICK BACK", mood: "テンションを上げたい", album: "LOST CORNER" },
    { id: 2, title: "Lemon", mood: "しんみりしたい", album: "STRAY SHEEP" },
    { id: 3, title: "毎日", mood: "日常を忘れたい", album: "LOST CORNER" }
];

// 2. アーティストデータ
let artists = [
    { id: 1, name: "米津玄師", genre: "J-POP", description: "徳島県出身のシンガーソングライター" },
    { id: 2, name: "King Gnu", genre: "Mixture Rock", description: "東京藝術大学出身者を中心としたバンド" }
];

// 3. 場所データ
let places = [
    { id: 1, name: "海沿いの公園", vibe: "リラックス", description: "波の音を聞いて落ち着く場所" },
    { id: 2, name: "都心のカフェ", vibe: "集中", description: "作業や読書に最適な静かな空間" }
];



// 削除・更新時の対象検索用
const findItem = (array, id) => array.find(item => item.id == id);
const findIndex = (array, id) => array.findIndex(item => item.id == id);



// トップページ (Root)
app.get("/", (req, res) => {
    res.render("index");
});



// システム1: 今の気分に最適な米津玄師の曲 (Songs)

// 一覧表示 (Read List) 
app.get("/songs", (req, res) => {
    res.render("songs_list", { data: songs });
});

// 新規登録フォーム (Create Form) 
app.get("/songs/create", (req, res) => {
    
    res.render("songs_new"); 
});

// 新規登録処理 (Create Action) 
app.post("/songs", (req, res) => {
    const id = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1; 
    songs.push({
        id: id,
        title: req.body.title,
        mood: req.body.mood,
        album: req.body.album
    });
    res.redirect("/songs");
});

// 詳細表示 (Read Detail) 
app.get("/songs/:id", (req, res) => {
    const item = findItem(songs, req.params.id);
    if (item) {
        res.render("songs_detail", { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 編集フォーム (Update Form) 
app.get("/songs/edit/:id", (req, res) => {
    const item = findItem(songs, req.params.id);
    if (item) {
        res.render("songs_edit", { data: item });
    } else {
        res.send("データが見つかりません");
    }
});

// 更新処理 (Update Action) 
app.post("/songs/update/:id", (req, res) => {
    const index = findIndex(songs, req.params.id);
    if (index !== -1) {
        songs[index].title = req.body.title;
        songs[index].mood = req.body.mood;
        songs[index].album = req.body.album;
    }
    res.redirect("/songs");
});

// 削除処理 (Delete Action) 
app.get("/songs/delete/:id", (req, res) => {
    const index = findIndex(songs, req.params.id);
    if (index !== -1) {
        songs.splice(index, 1); 
    }
    res.redirect("/songs");
});



// システム2: アーティストについて詳しく知る (Artists)


// 一覧
app.get("/artists", (req, res) => res.render("artists_list", { data: artists }));

// 新規登録
app.get("/artists/create", (req, res) => res.render("artists_new"));
app.post("/artists", (req, res) => {
    const id = artists.length > 0 ? artists[artists.length - 1].id + 1 : 1;
    artists.push({ id: id, name: req.body.name, genre: req.body.genre, description: req.body.description });
    res.redirect("/artists");
});

// 詳細
app.get("/artists/:id", (req, res) => {
    const item = findItem(artists, req.params.id);
    item ? res.render("artists_detail", { data: item }) : res.send("Error");
});

// 編集・更新
app.get("/artists/edit/:id", (req, res) => {
    const item = findItem(artists, req.params.id);
    item ? res.render("artists_edit", { data: item }) : res.send("Error");
});
app.post("/artists/update/:id", (req, res) => {
    const index = findIndex(artists, req.params.id);
    if (index !== -1) {
        artists[index].name = req.body.name;
        artists[index].genre = req.body.genre;
        artists[index].description = req.body.description;
    }
    res.redirect("/artists");
});

// 削除
app.get("/artists/delete/:id", (req, res) => {
    const index = findIndex(artists, req.params.id);
    if (index !== -1) artists.splice(index, 1);
    res.redirect("/artists");
});

// システム3: 今の気分に適した場所提案 (Places)


// 一覧
app.get("/places", (req, res) => res.render("places_list", { data: places }));

// 新規登録
app.get("/places/create", (req, res) => res.render("places_new"));
app.post("/places", (req, res) => {
    const id = places.length > 0 ? places[places.length - 1].id + 1 : 1;
    places.push({ id: id, name: req.body.name, vibe: req.body.vibe, description: req.body.description });
    res.redirect("/places");
});

// 詳細
app.get("/places/:id", (req, res) => {
    const item = findItem(places, req.params.id);
    item ? res.render("places_detail", { data: item }) : res.send("Error");
});

// 編集・更新
app.get("/places/edit/:id", (req, res) => {
    const item = findItem(places, req.params.id);
    item ? res.render("places_edit", { data: item }) : res.send("Error");
});
app.post("/places/update/:id", (req, res) => {
    const index = findIndex(places, req.params.id);
    if (index !== -1) {
        places[index].name = req.body.name;
        places[index].vibe = req.body.vibe;
        places[index].description = req.body.description;
    }
    res.redirect("/places");
});

// 削除
app.get("/places/delete/:id", (req, res) => {
    const index = findIndex(places, req.params.id);
    if (index !== -1) places.splice(index, 1);
    res.redirect("/places");
});

// サーバ起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
