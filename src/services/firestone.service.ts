import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export interface User {
    userID: string,
    userNome: string,
    userEmail: string,
    userTel: string,
    userCEP: string,
    userEnd: string,
    userEndNum: string,
    userCidade: string,
    userUF: string,
    userSangue: string
}

@Injectable()
export class FirestoneService {
	private user: firebase.User;
    auth: any;
    usuarios: Observable<User[]>;

    // Dizendo que campanhas é um Observable da Interface Campanha
    private usuario: Observable<User[]>;
    // campanhasCollectionRef é uma collection de Campanhas -> Coleção de campanhas
    private usuariosCollectionRef: AngularFirestoreCollection<User>;

	constructor(public afAuth: AngularFireAuth, public angularFirestore: AngularFirestore) {
		afAuth.authState.subscribe(user => {
			this.user = user;
        });
        
        // Assim que o serviço é instânciado, os dados são sincronizados
        // Dados da collection usuarios vão para o atributo usuarios
        // this.usuariosCollectionRef = this.angularFirestore.collection('usuarios', ref => ref.where('userID', '==', this.afAuth.auth.currentUser.uid).limit(1));
        this.usuariosCollectionRef = this.angularFirestore.collection('usuarios');
        this.usuario = this.usuariosCollectionRef.valueChanges();
    }
    
    // Método para registrar um usuário na collection 'usuarios' no Firestone
    public registerUser(id: string, nome: string, email: string, tel: string = '', cep: string = '', end: string = '', nro: string = '', cidade: string = '', uf: string = '', sangue: string = '') {
        this.usuariosCollectionRef.add({ userID: id, userNome: nome, userEmail: email, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    }

    // Método para pegar os dados do usuário
    public getUserData() {
        return this.usuario;
    }

    // Método para atualizar os dados do usuário
    public updateUserData(user: User) {
        this.usuariosCollectionRef.doc(user.userID).update({ user });
    }
}
