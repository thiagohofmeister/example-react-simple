const Rebase = require('re-base')
const firebase = require('firebase')

const FirebaseConfig = {
  apiKey: "AIzaSyADkRWINor_qTXq38BGnE9aRPVQpY8JIeg",
  authDomain: "company-portfolio-82366.firebaseapp.com",
  databaseURL: "https://company-portfolio-82366.firebaseio.com",
  projectId: "company-portfolio-82366",
  storageBucket: "company-portfolio-82366.appspot.com",
  messagingSenderId: "1038608106711"
}

const app = firebase.initializeApp(FirebaseConfig)

const config = Rebase.createClass(app.database())

export const storage = app.storage()

export const auth = app.auth()

export default config
