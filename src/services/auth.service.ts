import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

    // Login with e-mail and password
	public signInWithEmail(credentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}
    
    // Create an account with e-mail and password
	public signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }
    
    // Create an account with e-mail and password
	public resetPassword(email) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
    }
    
    // Sign out of the user
	public signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}
    
    // Return data about the logged user
	public getUserData() {
		return this.user;
	}
}
