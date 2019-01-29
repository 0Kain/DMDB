import { QuerySnapshot } from "@google-cloud/firestore";
import { resolve } from "path";

export default async function(){
    let firebase = require("firebase");

    let films=[
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BMTY1OTA2MjI5OV5BMl5BanBnXkFtZTgwNzkxMjU4NjM@._V1_SX300.jpg',
            Plot: 'oui',
            Title: 'Glass',
            Rating: '11',
            Genre: 'glass'
        },
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BNmY4ZjljMzMtMTZmYi00NTNlLTlmNDUtMGM2NjEzYjc3YThiXkEyXkFqcGdeQXVyMTU1NTI2MA@@._V1_SX300.jpg',
            Plot: 'aaaaaa',
            Title: 'Rengeteg',
            Rating: '6.7',
            Genre: 'Drama'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen1',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen2',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen3',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen4',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen5',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen6',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen7',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen8',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen9',
            Rating: '2.9',
            Genre: 'merde'
        },
        {
            Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Mjk3MDg4MF5BMl5BanBnXkFtZTcwMzQ4MjA0MQ@@._V1_SX300.jpg%22,%22Ratings%22:%5B%7B%22Source%22:%22Internet',
            Plot: 'dlamerde',
            Title: 'Ice Queen10',
            Rating: '2.9',
            Genre: 'merde'
        }
    ]

    let counter = 13;
    
    let indexedDBWork = () => {
        return new Promise((resolve) => {
            let storedFilms = []
            let storeName = 'movies_store'
            let request = window.indexedDB.open('DB_APP', 1);
            let indexeddb;
            request.onupgradeneeded = (event) => {
                console.log('[onupgradeneeded]', request.result);
                indexeddb = event.target.result;
                let store = indexeddb.createObjectStore(storeName, {keyPath: 'Title'});
                store.createIndex('movies_unqiue', 'Title', {unique: true});
            };
            request.onsuccess = (event) => {
                console.log('[onsuccess]', request.result);
                indexeddb = event.target.result;
                let transaction = indexeddb.transaction(storeName,'readwrite')
                transaction.onsuccess = (event) => {
                    console.log('[Transaction] ALL DONE!');
                };
                let movieStore = transaction.objectStore(storeName);
                let countRequest = movieStore.count()
                countRequest.onsuccess = async () => {
                    let idbsize = countRequest.result
                    if(counter > idbsize){
                        let promise = readDB(films).then(value => {
                            value.forEach((film) => {
                                movieStore.add(film);
                                console.log("film "+film.Title+" ajouté à idb")
                            });

                            let transaction2 = indexeddb.transaction(storeName);
                            let objectStore = transaction2.objectStore(storeName);
                            let getAllReq = objectStore.getAll();
                            getAllReq.onerror = (event) => {
                                console.log('[onerror]', getAllReq.error);
                            };
                            getAllReq.onsuccess = (event) => {
                                console.log('[onsuccess]', getAllReq.result);
                                getAllReq.result.forEach(val => storedFilms.push(val))
                                return resolve(storedFilms)
                            };
                        })
                    }
                }
        
            };
            request.onerror = (event) => {
                console.log('[onerror]', request.error);
            };
        }) 
    }

    var api_config = require('./dmdb_api_key.json');

    if (!firebase.apps.length) {
        firebase.initializeApp(api_config)
    }

    var db = firebase.firestore();
    db.settings({})

    let addFilm = (film) => {
        db.collection("Films").doc().set(film).then(() => {
            console.log("Film "+film.Title+" ajouté");
        });
    }
    
    /**
     * Prend une collection de films et retourne cette collection + la base firebase.
     * 
     * @param films liste de films
     */
    let readDB = async (films) => {
        let allFilms = films;
        db.collection("Films").get().then((QuerySnapshot) => {
            QuerySnapshot.forEach((elem) => allFilms.push(elem.data()))
        })
        console.log('# films:',allFilms.length)
        console.log('all films:',allFilms)
        return await allFilms;
    }

    let pad = (n, width=3, z=0) => {
        return (String(z).repeat(width) + String(n)).slice(String(n).length)
    }
    

    let addingFilms = false;//change this to add films
    let startId = 810000;//change this to index particular films

    let omdbKey = '40152a39';//keys = ['bf456695','b8c9cbda','893e9938','40152a39','','','','']
    for(let i=startId;addingFilms && i<startId+1000;++i){
        try{
            let promise=fetch('http://omdbapi.com/?apikey='+omdbKey+'&i=tt'+pad(i, 7)).then((value) => value.json()).then(value => {
                console.log(value)
    
                let re1 = /(\d+)/g;
                let match = re1.exec(value.Runtime);
                return {
                    Actors: value.Actors||"unknown",
                    Country: value.Country||"unknown",
                    Director: value.Director||"unknown",
                    Genre: value.Genre||"unknown",
                    Language: value.Language||"unknown",
                    Plot: value.Plot||"unknown",
                    Poster: value.Poster||"unknown",
                    Production: value.Production||"unknown",
                    Rated: value.Rated||"unknown",
                    Rating: value.imdbRating||"unknown",
                    Runtime: match[0]||"unknown",
                    Title: value.Title||"unknown",
                    Writers: value.Writer||"unknown",
                    Year: value.Year||"unknown"
                }
            });
            let filmToAdd = await promise;
            addFilm(filmToAdd)

        }catch(e){
            console.error(e)
            continue
        }
    }

    let storedFilms = await indexedDBWork()
    return storedFilms;

    //var admin = require("firebase-admin");
    /*
    var serviceAccount = require("dmdb-726d1-firebase-adminsdk-kppj6-d9f40de4ad.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://dmdb-726d1.firebaseio.com"
    });

    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("server/saving-data/fireblog/posts");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

    ref.orderByChild("height").on("child_added", function(snapshot) {
    console.log(snapshot.key + " test ");
    });
    */
}