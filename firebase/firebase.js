import app from 'firebase/app'

import FirebaseContext from './config'

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(FirebaseContext)
        }
    }
}

const firebase = new Firebase()
export default firebase