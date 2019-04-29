import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
    tipoSangue: string,
    tipoDoacao: string,
    dataLimite: Date,

    nomeHemocentro: string,
    endHemocentroCEP: string,
    endHemocentro: string,
    endHemocentroNro: string,
    endHemocentroCidade: string,
    endHemocentroUF: string,

    nomeDivulgador: string,
    emailDivulgador: string,
    telDivulgador: string,
    endDivulgadorCEP: string,
    endDivulgador: string,
    endDivulgadorNum: string,
    endDivulgadorCidade: string,
    endDivulgadorUF: string,

    divulgadorPaciente: boolean,
    pacienteIndicado: string,
    
    observacoes: string
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
    
    //---------------------- User

    // Pegar os dados do usuário
    public getUserData() {
        return this.usuario;
    }

    // Registrar um usuário na collection 'usuarios' no Firestone
    public setUser(id: string, nome: string, email: string, tel: string = '', cep: string = '', end: string = '', nro: string = '', cidade: string = '', uf: string = '', sangue: string = '') {
        this.usuariosCollectionRef.add({ userID: id, userNome: nome, userEmail: email, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    }

    // Atualizar os dados do usuário
    public updateUserData(docId, nome, tel, cep, end, nro, cidade, uf, sangue) {
        this.usuariosCollectionRef.doc(docId).update({ userNome: nome, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    }

    //---------------------- Campanhas

    // Pegar campanhas
    public getCampanhas() {
        return this.campanhas;
    }

    // Registrar um usuário na collection 'usuarios' no Firestone
    public setCampanha(tipoSangue = '', tipoDoacao = '', dataLimite = null, nomeHemocentro = '', endHemocentroCEP = '', endHemocentro = '', endHemocentroNro = '', endHemocentroCidade = '', endHemocentroUF = '', nomeDivulgador = '', emailDivulgador = '', telDivulgador = '', endDivulgadorCEP = '', endDivulgador = '', endDivulgadorNum = '', endDivulgadorCidade = '', endDivulgadorUF = '', divulgadorPaciente = false, pacienteIndicado = '', observacoes = '') {
        if (this.campanhasCollectionRef.add({
            tipoSangue: tipoSangue,
            tipoDoacao: tipoDoacao,
            dataLimite: new Date(dataLimite),
            nomeHemocentro: nomeHemocentro,
            endHemocentroCEP: endHemocentroCEP,
            endHemocentro: endHemocentro,
            endHemocentroNro: endHemocentroNro,
            endHemocentroCidade: endHemocentroCidade,
            endHemocentroUF: endHemocentroUF,
            nomeDivulgador: nomeDivulgador,
            emailDivulgador: emailDivulgador,
            telDivulgador: telDivulgador,
            endDivulgadorCEP: endDivulgadorCEP,
            endDivulgador: endDivulgador,
            endDivulgadorNum: endDivulgadorNum,
            endDivulgadorCidade: endDivulgadorCidade,
            endDivulgadorUF: endDivulgadorUF,
            divulgadorPaciente: divulgadorPaciente,
            pacienteIndicado: pacienteIndicado,
            observacoes: observacoes
        })) {
            return true;
        }
        return false;
    }

    public filterCampanha(estado = '', cidade = '') {
        return this.angularFirestore.collection<Campanha>('campanhas', ref => ref.where('endHemocentroUF', '==', estado).where('endHemocentroCidade', '==', cidade)).valueChanges();
    }
}
