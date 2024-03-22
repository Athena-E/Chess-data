const express = require("express")
const app = express()
const port = process.env.port || 3000
const axios = require("axios")
const fs = require("fs")
app.set("view engine", "pug")
app.use(express.static("public"))

let playerFile = fs.readFileSync("./players.json")
console.log(playerFile)
try {
    var playerData = JSON.parse(playerFile)
    console.log(playerData)
}
catch(err) {
    console.log(err)
}

var playerNames = [
    "Athena-E"
    // "Chall123600", 
    // "BostonStrangler", 
    // "elizabethphilomena", 
    // "Shahil1701",
    // "Vicenttower",
    // "antoprat",
    // "Renegade_Yoda",
    // "SultanAliw009",
    // "ura7733",
    // "JRSnoots",
    // "Henry131065",
    // "ybagy",
    // "Ashu13042018",
    // "drbkt",
    // "RonPionnier",
    // "gguerin",
    // "yesindeed91",
    // "hebo2",
    // "Vanolejan",
    // "HalimBhatti",
    // "0777945954",
    // "bugiaitoc",
    // "zakuzen",
    // "diozakk",
    // "metereis",
    // "Epv158",
    // "taquara",
    // "divyamprakash",
    // "Ehup",
    // "Ivan_Monich",
    // "ZADEX054",
    // "ranu369",
    // "Elquanah",
    // "Ernestomak",
    // "allojumo",
    // "amychapman409",
    // "henjohns1",
    // "shreeshb",
    // "Burnout38",
    // "Pallinho",
    // "Meskaline007",
    // "amjadlandolsi",
    // "Kruk10karp",
    // "foneceka",
    // "salah061991",
    // "Aniketsc10",
    // "petershenai",
    // "geetaalva",
    // "LadyAnnina",
    // "bigP2019",
    // "liiiiisaaaaa",
    // "Rushaldinho",
    // "Piqueres58",
    // "nispeter",
    // "KristianVill",
    // "aryowg",
    // "TeoMoga",
    // "cool--dude",
    // "bergen74",
    // "raihanalifio",
    // "sptrasi",
    // "tahze",
    // "UnPerniflard",
    // "Xoliii",
    // "Bavanongdinh",
    // "JoeJ1800",
    // "LYR2012",
    // "xhevat2021",
    // "Jesseriing",
    // "cadeiton",
    // "dontshootme",
    // "savaliakc094",
    // "Tysi234",
    // "cheshyd",
    // "Quri2027",
    // "lonely_hypebeast",
    // "partho1993",
    // "CHOOSE102",
    // "DogusOren",
    // "avivlavian",
    // "AlbertoArnaldo",
    // "aljomawy",
    // "JJale1",
    // "Sheredar",
    // "parxivada",
    // "GreenSCI",
    // "Jenny-1989",
    // "Grete08",
    // "alonas_karkur",
    // "Magnuficent",
    // "Or_han",
    // "MuslimChe",
    // "matthieusztejnberg",
    // "delamar444",
    // "Kirill1357",
    // "kuldeep77",
    // "SATHISHSTARK",
    // "damianmesuno",
    // "stompy",
    // "goupX",
    // "benzoltech",
    // "charliesmith304",
    // "Pierre-L",
    // "sokrates8",
    // "GMChessrob",
    // "Michaeljackson54",
    // "MuriloDorini",
    // "houcemlaw",
    // "Museum13",
    // "Vijay3742",
    // "gledisajazi1",
    // "Fanty1",
    // "Himanshu_Rana",
    // "Heliohw",
    // "nicol_9_11",
    // "kanbinisarg",
    // "Dozer42LB",
    // "SirFlux",
    // "spartac36",
    // "Riax",
    // "thomasw0402",
    // "tralfmdr",
    // "gewoon_arnold",
    // "A9595950725",
    // "barb5700",
    // "zzzaaa1111",
    // "Trotskyist",
    // "daviup",
    // "Vivek_Aggarwal",
    // "Jackdaw18",
    // "CanOwl",
    // "Khaled-moneim",
    // "kartoffeldieb",
    // "mickchessau",
    // "AarnIQ",
    // "PokeOnCrack",
    // "FlintWestWood",
    // "Jonatas-helio",
    // "SuryaPakalapati",
    // "Sauruos",
    // "kaesoneeeee",
    // "Kevin1234504",
    // "Malej6",
    // "Riyadmaster",
    // "StephanieBee",
    // "afteryou69",
    // "Stefano1983",
    // "es70sso",
    // "Dumkid69",
    // "StefanoCadderi",
    // "Xavigo85",
    // "1878mmarko",
    // "Micholionoabsh",
    // "Kamilryba",
    // "ReniElMejor",
    // "Preolin",
    // "hellergtr",
    // "greatniro",
    // "WarCrimesEnjoyer01",
    // "natan80p",
    // "aoex01",
    // "badr_u",
    // "ottovongust",
    // "catzokiles22",
    // "SabinaParveen",
    // "Lau1493",
    // "aboodaboodabood",
    // "peppergrey",
    // "joaquin2813l",
    // "Felerino",
    // "atongg",
    // "SebRub",
    // "mrpacdva",
    // "fake234",
    // "Wizardmagu",
    // "vytautas1981",
    // "SASIBNAIR",
    // "Zakirov_Ruslan",
    // "Stachu_Jones",
    // "hhashah",
    // "vidaslaukaitis",
    // "faylz1992",
    // "AlexeyHedgehog",
    // "falc0n770",
    // "HALOHAHA",
    // "nkchess90",
    // "parmito671",
    // "Marshie1991",
    // "BappoCastle",
    // "SajanShrestha",
    // "p2olo99",
    // "vladimirnaydyuk",
    // "IAm_Joker75",
    // "riobravo5",
    // "TongAnWasTaken",
    // "zap58",
    // "jacobjoon",
    // "ashish11111994",
    // "jdrew97",
    // "dave4420",
    // "deepdrunk",
    // "erlendgs",
    // "RyanReadPotter",
    // "guido22",
    // "AMIGOSLAYER930",
    // "Makhdoomi07",
    // "yang8976",
    // "ZYY2019",
    // "TikoGh",
    // "chensicilian",
    // "rohithaji",
    // "ka_yi",
    // "Yizou",
    // "san704250025",
    // "lliujincheng",
    // "realyami007",
    // "linglongshun",
    // "hexiaomao",
    // "FelixLo",
    // "XUANJIANG",
    // "xwNathan",
    // "woainia",
    // "PhantomXiao",
    // "Saygoo",
    // "1122334cx",
    // "whiteWlof",
    // "azmearken",
    // "Zak_attak",
    // "kaafp",
    // "6669ecrgtmuk",
    // "seancho3",
    // "CharlieBrownie90",
    // "JoshDot",
    // "SaraCyrus",
    // "itjsn",
    // "dizzyyeung",
    // "robotpasta",
    // "xueyanche",
    // "sd2714313",
    // "hqql1981",
    // "Phoebe110",
    // "mamutian2011",
    // "1385711901",
    // "LUHONG",
    // "collvey",
    // "wbhlavac",
    // "Laval_haz",
    // "zjgpf",
    // "Ronin426",
    // "liema_078",
    // "Blunderinng",
    // "CHANEL1102",
    // "jonduque",
    // "Kurbanjanmph",
    // "yongxinluo",
    // "riyazz009",
    // "frankleochids",
    // "pangtao",
    // "Chens3198",
    // "shwangzr",
    // "zzyqweq",
    // "5krpm",
    // "kaylinzhang",
    // "leamhsi",
    // "FuqiangSun",
    // "zhangriluo",
    // "DeltaVariantPlus",
    // "Jason2012514",
    // "fernando_li",
    // "JinntongLi",
    // "Cumade",
    // "maxinteres",
    // "123luorui",
    // "SDFZ21",
    // "Pleasanthero",
    // "guxianghan",
    // "wyhnb666",
    // "builder2018",
    // "roboitox_9",
    // "NNchaos",
    // "qianqi781",
    // "Raven_Huang",
    // "XDChris",
    // "WeijunSitu",
    // "Gunchuhu8",
    // "Frank6868",
    // "nx280598",
    // "ksksu777",
    // "nynblack",
    // "werwef112",
    // "zgzg1234",
    // "EnzoLu",
    // "LiShan83",
    // "YK686",
    // "Zerozky",
    // "Logic1234567",
    // "shgahzh",
    // "Lucas7765",
    // "Briangao2020",
    // "SteppingGecko",
    // "berrylgu",
    // "pafaking",
    // "eric092222",
    // "NowaxX"
    ]


var playerPromises = []


for (var i = 0; i < playerNames.length; i++) {
    let playerName = playerNames[i]
    let playerExists = false

    for (var j = 0; j < playerData.length; j++) {
        if (playerName === playerData[j].username) {
            playerExists = true
        }
    } 

    if (! playerExists) {
        playerPromises.push(
            axios.get(`https://api.chess.com/pub/player/${playerName}/stats`)
                .then(function (res) {

                    if (res.data.hasOwnProperty("chess_rapid") && res.data.hasOwnProperty("chess_blitz") && res.data.hasOwnProperty("chess_bullet")) {
                        playerData.push({
                            username : playerName,
                            blitz : {
                                rating : res.data.chess_blitz.last.rating,
                                gamesPlayed : res.data.chess_blitz.record.win + res.data.chess_blitz.record.loss + res.data.chess_blitz.record.draw
                            },
                            bullet : {
                                rating : res.data.chess_bullet.last.rating,
                                gamesPlayed : res.data.chess_bullet.record.win + res.data.chess_bullet.record.loss + res.data.chess_bullet.record.draw
                            },
                            rapid : {
                                rating : res.data.chess_rapid.last.rating,
                                gamesPlayed : res.data.chess_rapid.record.win + res.data.chess_rapid.record.loss + res.data.chess_rapid.record.draw
                            }
                        }) 
                    }

                })
                
                .catch(function (err) {
                    console.log(err)
                })

                .then(function () {
                    
                })


            )

    
    }

}


Promise.all(playerPromises).then( () => {
    console.log("All requests fulfilled")
    fs.writeFileSync("./players.json", JSON.stringify(playerData))
})


app.get("/", (req, res) => {
    res.render("index", {"players" : JSON.stringify(playerData)})
})
n
app.listen(port, () => {
    console.log(`Running on ${port}`)
})

