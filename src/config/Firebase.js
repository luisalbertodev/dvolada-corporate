import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBJ8KDuvCHjOf-QU-ZB1kGKOwFCtwHkU4k',
	authDomain: 'dvolada-v1.firebaseapp.com',
	databaseURL: 'https://dvolada-v1.firebaseio.com',
	projectId: 'dvolada-v1',
	storageBucket: 'dvolada-v1.appspot.com',
	messagingSenderId: '1064474784886',
	appId: '1:1064474784886:web:3520566f7ca72ea215db57',
	measurementId: 'G-HJ1B3X6C8D',
};

firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database();
