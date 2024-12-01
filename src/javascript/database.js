import { initializeApp } from "firebase/app"; //eslint-disable-line
import { getDatabase, ref, set, push, onValue } from "firebase/database"; //eslint-disable-line
import globalState from "./globalState.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1cx1zT-jBq1vppzHGUzd-Jf4nYxw75Bs",
  authDomain: "phaser-3-game-94b32.firebaseapp.com",
  databaseURL: "https://phaser-3-game-94b32-default-rtdb.firebaseio.com",
  projectId: "phaser-3-game-94b32",
  storageBucket: "phaser-3-game-94b32.appspot.com",
  messagingSenderId: "544630940225",
  appId: "1:544630940225:web:0a595922080305f6c0dcc0",
  measurementId: "G-B6L6NBNLW7",
};

const app = initializeApp(firebaseConfig);

const postScore = (score) => {
  const db = getDatabase(app);
  const postListRef = ref(db, "scores");
  const newPostRef = push(postListRef);

  set(newPostRef, { username: globalState.username, score });
};

const getScores = () => {
  const db = getDatabase(app);
  const listRef = ref(db, "scores");
  const array = [];
  onValue(listRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      array.push(childSnapshot.val());
    });
  });

  return array.sort((a, b) => (a.score < b.score ? 1 : -1));
};

getScores();

export { postScore, getScores };
