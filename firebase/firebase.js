import app from 'firebase/app'
import 'firebase/auth'

import FirebaseContext from './config'

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(FirebaseContext)
        }
        this.auth = app.auth()
    }

    // Registry an user
    async registry(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password)

        return await newUser.user.updateProfile({
            displayName: name
        })
    }

    // Log in
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    // Log out
    async logOut() {
        await this.auth.signOut()
    }
}

const firebase = new Firebase()
export default firebase