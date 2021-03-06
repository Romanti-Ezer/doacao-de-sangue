import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface User {
    userID: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    userCEP: string,
    userAddress: string,
    userAddressNum: string,
    userCity: string,
    userState: string,
    userBlood: string,
    userGender: string
}

export class User {
    userID: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userCEP: string;
    userAddress: string;
    userAddressNum: string;
    userCity: string;
    userState: string;
    userBlood: string;
    userGender: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export interface Campaign {
    campBloodType: string,
    campDonateType: string,
    campLimitDate: Date,
    campBloodCenter: string,
    campBloodCenterCEP: string,
    campBloodCenterAddress: string,
    campBloodCenterAddressNum: string,
    campBloodCenterCity: string,
    campBloodCenterState: string,
    campPromoterName: string,
    campPromoterEmail: string,
    campPromoterPhone: string,
    campPromoterCEP: string,
    campPromoterAddress: string,
    campPromoterAddressNum: string,
    campPromoterCity: string,
    campPromoterState: string,
    campPromoterIsPatient: boolean,
    campIndicatedPatient: string,
    campObservations: string
}

export class Donation {
    donatUserID: string;
    donatBloodCenter: string;
    donatDate: any;
    donatType: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

@Injectable()
export class FirestoreService {

    // user is an observable of ther User
    private user: Observable<User[]>;

    // usersCollectionRef is a collection of User
    private usersCollectionRef: AngularFirestoreCollection<User>;

    // campaigns is an observable of Campanha
    private campaigns: Observable<Campaign[]>;

    // campaignsCollectionRef is a collection of Campaign
    private campaignsCollectionRef: AngularFirestoreCollection<Campaign>;

    // donations is an observable of Donation
    private donations: Observable<Donation[]>;

    // donationsCollectionRef is a collection of Donation
    private donationsCollectionRef: AngularFirestoreCollection<Donation>;
    
	constructor(public afAuth: AngularFireAuth, public angularFirestore: AngularFirestore) {
        
        // When the service is instantiated, data is synchronized
        
        // If we already have a logged user
        if (this.afAuth.auth.currentUser) {

            // Constructs a query for Firestone: logged user in users collection
            this.usersCollectionRef = angularFirestore.collection<User>('users', ref => ref.where('userID', '==', this.afAuth.auth.currentUser.uid).limit(1));

            // Runs the query constructed and stores in user
            this.user = this.usersCollectionRef.snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as User;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });

            // Constructs a query: donations of logged user
            this.donationsCollectionRef = angularFirestore.collection('donations', ref => ref.where('donatUserID', '==', this.afAuth.auth.currentUser.uid));

            // Observes changes in donations collection
            this.donations = this.donationsCollectionRef.valueChanges();

        } else {

            // Constructs a query for Firestone: all users in users collection
            this.usersCollectionRef = angularFirestore.collection<User>('users');

        }

        // Constructs a query: all campaigns in campaigns collection
        this.campaignsCollectionRef = this.angularFirestore.collection('campaigns');
        
        // Observes changes in campaigns collection
        this.campaigns = this.campaignsCollectionRef.valueChanges();

    }

    public updateCollectionRef() {
        // If we already have a logged user
        if (this.afAuth.auth.currentUser) {

            // Constructs a query for Firestone: logged user in users collection
            this.usersCollectionRef = this.angularFirestore.collection<User>('users', ref => ref.where('userID', '==', this.afAuth.auth.currentUser.uid).limit(1));

            // Runs the query constructed and stores in user
            this.user = this.usersCollectionRef.snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as User;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });

            // Constructs a query: donations of logged user
            this.donationsCollectionRef = this.angularFirestore.collection('donations', ref => ref.where('donatUserID', '==', this.afAuth.auth.currentUser.uid));

            // Observes changes in donations collection
            this.donations = this.donationsCollectionRef.valueChanges();

        } 
    }
    
    //---------------------- User

    // Returns logged user data
    public getUser() {
        if (this.afAuth.auth.currentUser)
            return this.user;
    }
    public getUserr() {
        if (this.afAuth.auth.currentUser)
            return this.user
                .map(user => {
                    return user.map(user => new User(user))
                });
    }

    // Creates new user on users collection
    public setUser(userID: string, userName: string, userEmail: string, userPhone: string = '', userCEP: string = '', userAddress: string = '', userAddressNum: string = '', userCity: string = '', userState: string = '', userBlood: string = '', userGender: string = '') {
        if (this.afAuth.auth.currentUser) {
            this.usersCollectionRef.add({ userID: userID, userName: userName, userEmail: userEmail, userPhone: userPhone, userCEP: userCEP, userAddress: userAddress, userAddressNum: userAddressNum, userCity: userCity, userState: userState, userBlood: userBlood, userGender: userGender });
        }
    }

    // Updates user data on users collection
    public updateUser(docId, userName, userPhone, userCEP, userAddress, userAddressNum, userCity, userState, userBlood, userGender) {
        if (this.afAuth.auth.currentUser) {
            if (this.usersCollectionRef.doc(docId).update({ userName: userName, userPhone: userPhone, userCEP: userCEP, userAddress: userAddress, userAddressNum: userAddressNum, userCity: userCity, userState: userState, userBlood: userBlood, userGender: userGender })) {
                return true;
            }
            return false;
        }
        return false;
    }

    //---------------------- Donation
    // Returns logged user donations    
    public getDonation(): Observable<Donation[]> {
        if (this.afAuth.auth.currentUser) {
            return this.donations
                .map(donations => {
                    return donations.map((donation) => new Donation(donation));
                });
        }
    }

    // Creates new donation
    public setDonation(donatUserID, donatBloodCenter, donatDate, donatType) : boolean {
        if (this.afAuth.auth.currentUser) {
            if (this.donationsCollectionRef.add({ donatUserID: donatUserID, donatBloodCenter: donatBloodCenter, donatDate: new Date(donatDate), donatType: donatType })) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    //---------------------- Campaign

    // Returns all campaigns
    public getCampaign() {
        if (this.afAuth.auth.currentUser)
            return this.campaigns;
    }

    // Creates new campaign on campaigns collection
    public setCampaign(campBloodType = '', campDonateType = '', campLimitDate = null, campBloodCenter = '', campBloodCenterCEP = '', campBloodCenterAddress = '', campBloodCenterAddressNum = '', campBloodCenterCity = '', campBloodCenterState = '', campPromoterName = '', campPromoterEmail = '', campPromoterPhone = '', campPromoterCEP = '', campPromoterAddress = '', campPromoterAddressNum = '', campPromoterCity = '', campPromoterState = '', campPromoterIsPatient = false, campIndicatedPatient = '', campObservations = '') {
        if (this.afAuth.auth.currentUser) {
            if (this.campaignsCollectionRef.add({
                campBloodType: campBloodType,
                campDonateType: campDonateType,
                campLimitDate: new Date(campLimitDate),
                campBloodCenter: campBloodCenter,
                campBloodCenterCEP: campBloodCenterCEP,
                campBloodCenterAddress: campBloodCenterAddress,
                campBloodCenterAddressNum: campBloodCenterAddressNum,
                campBloodCenterCity: campBloodCenterCity,
                campBloodCenterState: campBloodCenterState,
                campPromoterName: campPromoterName,
                campPromoterEmail: campPromoterEmail,
                campPromoterPhone: campPromoterPhone,
                campPromoterCEP: campPromoterCEP,
                campPromoterAddress: campPromoterAddress,
                campPromoterAddressNum: campPromoterAddressNum,
                campPromoterCity: campPromoterCity,
                campPromoterState: campPromoterState.toUpperCase(),
                campPromoterIsPatient: campPromoterIsPatient,
                campIndicatedPatient: campIndicatedPatient,
                campObservations: campObservations
            })) {
                return true;
            }
            return false;
        }
        return false;
    }

    // Filters campaigns by state and city
    public filterCampaign(campBloodCenterState = '', campBloodCenterCity = '', campBloodType = '') {
        if (this.afAuth.auth.currentUser) {
            
            // If we state and city is provided
            if (campBloodCenterState && campBloodCenterCity && campBloodType) {
                return this.angularFirestore.collection<Campaign>('campaigns', ref => ref.where('campBloodCenterState', '==', campBloodCenterState).where('campBloodCenterCity', '==', campBloodCenterCity).where('campBloodType', '==', campBloodType)).valueChanges();
            }
            
            // If only state is provided
            else if(campBloodCenterState) {
                return this.angularFirestore.collection<Campaign>('campaigns', ref => ref.where('campBloodCenterState', '==', campBloodCenterState)).valueChanges();
            }
            
            //if only state is provided
            else if(campBloodType) {
                return this.angularFirestore.collection<Campaign>('campaigns', ref => ref.where('campBloodType', '==', campBloodType)).valueChanges();
            }

            // If only city is provided
            else if(campBloodCenterCity) {
                return this.angularFirestore.collection<Campaign>('campaigns', ref => ref.where('campBloodCenterCity', '==', campBloodCenterCity)).valueChanges();
            }
            
            // If no data is passed
            else {
                return this.angularFirestore.collection<Campaign>('campaigns').valueChanges();
            }
        }
    }
}
