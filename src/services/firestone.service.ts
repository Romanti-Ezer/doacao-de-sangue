import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';

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

export interface Campanha {
    dataLimite: Date,
    divulgadorPrecisa: boolean,
    emailDivulgador: string,
    emailHemocentro: string,
    endDivulgador: string,
    endDivulgadorCEP: string,
    endHemocentro: string,
    endHemocentroCEP: string,
    grauUrgencia: string,
    infAdicionais: string,
    nomeDivulgador: string,
    nomeHemocentro: string,
    nomePaciente: string,
    outroContatoHemocentro: string,
    pagFacebookHemocentro: string,
    possuiWhatsapp: boolean,
    possuiWhatsapp2: boolean,
    siteHemocentro: string,
    telDivulgador: string,
    telDivulgador2: string,
    telHemocentro: string,
    telHemocentro2: string,
    tipoDoacao: string,
    tipoSangue: string
}

@Injectable()
export class FirestoneService {
	private user: firebase.User;
    auth: any;
    usuarios: Observable<User[]>;

    // Dizendo que usuario é um Observable da Interface User
    private usuario: Observable<User[]>;
    // usuariosCollectionRef é uma collection de Users
    private usuariosCollectionRef: AngularFirestoreCollection<User>;

    // Dizendo que campanhas é um Observable da Interface Campanha
    campanhas: Observable<Campanha[]>;
    // campanhasCollectionRef é uma collection de Campanhas -> Coleção de campanhas
    campanhasCollectionRef: AngularFirestoreCollection<Campanha>;

	constructor(public afAuth: AngularFireAuth, public angularFirestore: AngularFirestore) {
		afAuth.authState.subscribe(user => {
			this.user = user;
        });
        
        // Assim que o serviço é instânciado, os dados são sincronizados
        // Dados da collection usuarios - trazendo apenas 1, referente ao ID do usuário atual
        if (this.afAuth.auth.currentUser) {
            this.usuariosCollectionRef = angularFirestore.collection<User>('usuarios', ref => ref.where('userID', '==', this.afAuth.auth.currentUser.uid).limit(1));
            this.usuario = this.usuariosCollectionRef.snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as User;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });
            console.log("currentuserid: ", this.afAuth.auth.currentUser.uid);
        } else {
            this.usuariosCollectionRef = angularFirestore.collection<User>('usuarios');
        }

        // Dados da collection de campanhas
        this.campanhasCollectionRef = this.angularFirestore.collection('campanhas'); 
        this.campanhas = this.campanhasCollectionRef.valueChanges();
    }
    
    // Método para registrar um usuário na collection 'usuarios' no Firestone
    public registerUser(id: string, nome: string, email: string, tel: string = '', cep: string = '', end: string = '', nro: string = '', cidade: string = '', uf: string = '', sangue: string = '') {
        this.usuariosCollectionRef.add({ userID: id, userNome: nome, userEmail: email, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    }

    // Método para pegar os dados do usuário
    public getUserData() {
        return this.usuario;
    }

    // Pegar campanhas
    public getCampanhas() {
        return this.campanhas;
    }

    // Método para atualizar os dados do usuário
    public updateUserData(docId, nome, tel, cep, end, nro, cidade, uf, sangue) {
        this.usuariosCollectionRef.doc(docId).update({ userNome: nome, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    }
}
