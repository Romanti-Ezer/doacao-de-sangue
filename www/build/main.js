webpackJsonp([7],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, auth, menuCtrl) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.menuCtrl = menuCtrl;
        this.menuCtrl.enable(true);
    }
    HomePage.prototype.logout = function () {
        this.auth.auth.signOut();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\home\home.html"*/'<ion-header>\n\n  	<ion-navbar>\n\n    	<button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n		<ion-title>My Blood</ion-title>\n\n  	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	 <p>Seja bem-vindo, você está logado.</p>\n\n\n\n	 <ion-card class="fundocard"> <!-- caso pessoal aceite precisaremos fazer um componente a parte-->\n\n			<img src="../../assets/imgs/fatecdoacao.jpeg">\n\n			<ion-card-content>\n\n			  <ion-card-title>\n\n				Doadores (teste)\n\n				</ion-card-title>\n\n			  <p>\n\n				Aqui será as fotos dos doadores de sangue.\n\n			  </p>\n\n			</ion-card-content>\n\n		  </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirestoneService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirestoneService = /** @class */ (function () {
    function FirestoneService(afAuth, angularFirestore) {
        var _this = this;
        this.afAuth = afAuth;
        this.angularFirestore = angularFirestore;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
        // Assim que o serviço é instânciado, os dados são sincronizados
        // Dados da collection usuarios - trazendo apenas 1, referente ao ID do usuário atual
        if (this.afAuth.auth.currentUser) {
            this.usuariosCollectionRef = angularFirestore.collection('usuarios', function (ref) { return ref.where('userID', '==', _this.afAuth.auth.currentUser.uid).limit(1); });
            this.usuario = this.usuariosCollectionRef.snapshotChanges().map(function (actions) {
                return actions.map(function (a) {
                    var data = a.payload.doc.data();
                    var id = a.payload.doc.id;
                    return __assign({ id: id }, data);
                });
            });
            console.log("currentuserid: ", this.afAuth.auth.currentUser.uid);
        }
        else {
            this.usuariosCollectionRef = angularFirestore.collection('usuarios');
        }
        // Dados da collection de campanhas
        this.campanhasCollectionRef = this.angularFirestore.collection('campanhas');
        this.campanhas = this.campanhasCollectionRef.valueChanges();
    }
    // Método para registrar um usuário na collection 'usuarios' no Firestone
    FirestoneService.prototype.registerUser = function (id, nome, email, tel, cep, end, nro, cidade, uf, sangue) {
        if (tel === void 0) { tel = ''; }
        if (cep === void 0) { cep = ''; }
        if (end === void 0) { end = ''; }
        if (nro === void 0) { nro = ''; }
        if (cidade === void 0) { cidade = ''; }
        if (uf === void 0) { uf = ''; }
        if (sangue === void 0) { sangue = ''; }
        this.usuariosCollectionRef.add({ userID: id, userNome: nome, userEmail: email, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    };
    // Método para pegar os dados do usuário
    FirestoneService.prototype.getUserData = function () {
        return this.usuario;
    };
    // Pegar campanhas
    FirestoneService.prototype.getCampanhas = function () {
        return this.campanhas;
    };
    // Método para atualizar os dados do usuário
    FirestoneService.prototype.updateUserData = function (docId, nome, tel, cep, end, nro, cidade, uf, sangue) {
        this.usuariosCollectionRef.doc(docId).update({ userNome: nome, userTel: tel, userCEP: cep, userEnd: end, userEndNum: nro, userCidade: cidade, userUF: uf, userSangue: sangue });
    };
    FirestoneService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["AngularFirestore"]])
    ], FirestoneService);
    return FirestoneService;
}());

//# sourceMappingURL=firestone.service.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuiaInformativoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the GuiaInformativoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GuiaInformativoPage = /** @class */ (function () {
    function GuiaInformativoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GuiaInformativoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GuiaInformativoPage');
    };
    GuiaInformativoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guia-informativo',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\guia-informativo\guia-informativo.html"*/'<!--\n\n  Generated template for the GuiaInformativoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Guia Informativo</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\guia-informativo\guia-informativo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], GuiaInformativoPage);
    return GuiaInformativoPage;
}());

//# sourceMappingURL=guia-informativo.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinhasDoacoesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the MinhasDoacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MinhasDoacoesPage = /** @class */ (function () {
    function MinhasDoacoesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MinhasDoacoesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MinhasDoacoesPage');
    };
    MinhasDoacoesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-minhas-doacoes',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\minhas-doacoes\minhas-doacoes.html"*/'<!--\n\n  Generated template for the MinhasDoacoesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Minhas Doações</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\minhas-doacoes\minhas-doacoes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], MinhasDoacoesPage);
    return MinhasDoacoesPage;
}());

//# sourceMappingURL=minhas-doacoes.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_firestone_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, fb, auth, firestone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.firestone = firestone;
        this.form = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6)])]
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        var data = this.form.value;
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signUp(credentials).then(function (response) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.firestone.registerUser(response.user.uid, '', credentials.email);
        }, function (error) { return _this.signupError = error.message; });
    };
    SignupPage.prototype.login = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\signup\signup.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>Cadastre-se</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n	<img src="../../assets/imgs/logoApp.png" alt="My Blood" class="logo">\n\n\n\n	<form (ngSubmit)="signup()" [formGroup]="form">\n\n		<ion-list inset>\n\n\n\n			<ion-item [ngClass]="{ invalid: emailErrors.hasError(\'*\', [\'touched\']) }">\n\n				<ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="email" #emailErrors="ngxErrors">\n\n				<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\']">É necessário um e-mail válido</div>\n\n			</div>\n\n\n\n			<ion-item [ngClass]="{ invalid: passwordErrors.hasError(\'*\', [\'touched\']) }">\n\n				<ion-input type="password" placeholder="Senha" formControlName="password"></ion-input>\n\n			</ion-item>\n\n			<p class="tip">Dica: escolha uma senha fácil de lembrar, mas que só faça sentido para você.</p>\n\n\n\n			<div ngxErrors="password" #passwordErrors="ngxErrors">\n\n				<div [ngxError]="[\'minlength\', \'required\']" [when]="[\'touched\']">Precisa ter ao menos 6 caracteres</div>\n\n			</div>\n\n		</ion-list>\n\n\n\n		<div padding-horizontal>\n\n			<div class="form-error">{{signupError}}</div>\n\n\n\n			<button ion-button full type="submit" [disabled]="!form.valid">Cadastre-se <ion-icon name="log-in"></ion-icon></button>\n\n	</div>\n\n		\n\n		<ion-list class="c-login-footer">\n\n\n\n				<p class="c-login-footer__p">Já tem uma conta? <a (click)="login()" class="c-login-footer__link">faça login</a></p>\n\n				\n\n		</ion-list>\n\n\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5__services_firestone_service__["a" /* FirestoneService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinhaContaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_firestone_service__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MinhaContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// atualizarCadastroForm: FormGroup;
var MinhaContaPage = /** @class */ (function () {
    function MinhaContaPage(navCtrl, navParams, fb, auth, firestone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.auth = auth;
        this.firestone = firestone;
        // Pegando os dados para já mostrar no formulário
        this.dados = this.firestone.getUserData();
    }
    MinhaContaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MinhaContaPage');
    };
    MinhaContaPage.prototype.setSangue = function (value) {
        this.userSangue = value;
    };
    MinhaContaPage.prototype.atualizarCadastro = function (event) {
        console.log(event.target);
        console.log('this.userSangue: \'', this.userSangue + '\'');
        this.firestone.updateUserData(event.target.userDocId.value, event.target.userNome.value, event.target.userTel.value, event.target.userCEP.value, event.target.userEnd.value, event.target.userEndNum.value, event.target.userCidade.value, event.target.userUF.value, this.userSangue);
    };
    MinhaContaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-minha-conta',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\minha-conta\minha-conta.html"*/'<!--\n\n  Generated template for the MinhaContaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Minha Conta</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  \n\n  <img src="../../assets/imgs/logoApp.png" alt="My Blood" class="logo">\n\n\n\n	<form (ngSubmit)="atualizarCadastro($event)" *ngFor="let user of dados | async">\n\n		<ion-list inset>\n\n\n\n      <!-- Doc ID -->\n\n			<ion-item hidden>\n\n				<ion-input type="text" [(ngModel)]="user.id" name="userDocId"></ion-input>\n\n      </ion-item>\n\n\n\n      <!-- Nome -->\n\n			<ion-item>\n\n				<ion-input type="text" placeholder="Nome" [(ngModel)]="user.userNome" name="userNome"></ion-input>\n\n      </ion-item>\n\n      \n\n      <!-- E-mail -->\n\n			<ion-item>\n\n				<ion-input type="text" placeholder="E-mail" disabled [(ngModel)]="user.userEmail" name="userEmail"></ion-input>\n\n      </ion-item>\n\n      \n\n      <!-- Telefone -->\n\n			<ion-item>\n\n				<ion-input type="tel" placeholder="Telefone" [(ngModel)]="user.userTel" name="userTel"></ion-input>\n\n      </ion-item>\n\n      \n\n      <!-- CEP -->\n\n      <ion-item> \n\n        <ion-input type="number" placeholder="CEP" [(ngModel)]="user.userCEP" name="userCEP"></ion-input>\n\n      </ion-item>\n\n\n\n      <!-- Endereço -->\n\n      <ion-item>\n\n        <!-- Endereço -->\n\n        <ion-input class="umcampo"name="end" type="text" placeholder="Endereço" [(ngModel)]="user.userEnd" name="userEnd"></ion-input>\n\n        <!-- Número -->\n\n        <ion-input type="number" placeholder="Numero" [(ngModel)]="user.userEndNum" name="userEndNum"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <!-- Cidade -->\n\n        <ion-input class="umcampo" name="endCidade" type="text" placeholder="Cidade" [(ngModel)]="user.userCidade" name="userCidade"></ion-input>\n\n        <!-- UF -->\n\n        <ion-input type="text" placeholder="UF" [(ngModel)]="user.userUF" name="userUF"></ion-input>\n\n      </ion-item>\n\n\n\n      <!-- Tipo de Sangue -->\n\n      <ion-list radio-group [(ngModel)]="user.userSangue" name="userSangue" (ionChange)="setSangue($event)">\n\n        <h3 class="subtitle">Tipo de sangue</h3>\n\n        <ion-item>\n\n            <ion-label>AB+</ion-label>\n\n            <ion-radio value="AB+"></ion-radio>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>AB-</ion-label>\n\n            <ion-radio value="AB-"></ion-radio>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label>O+</ion-label>\n\n          <ion-radio value="O+"></ion-radio>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label>O-</ion-label>\n\n          <ion-radio value="O-"></ion-radio>  \n\n        </ion-item>\n\n      </ion-list>\n\n\n\n		</ion-list>\n\n\n\n    <!-- Salvar -->\n\n    <button ion-button full type="submit">Salvar <ion-icon name="checkmark"></ion-icon></button>\n\n	</form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\minha-conta\minha-conta.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__services_firestone_service__["a" /* FirestoneService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__services_firestone_service__["a" /* FirestoneService */]])
    ], MinhaContaPage);
    return MinhaContaPage;
}());

//# sourceMappingURL=minha-conta.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizarCampanhasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firestone_service__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the VisualizarCampanhasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisualizarCampanhasPage = /** @class */ (function () {
    function VisualizarCampanhasPage(navCtrl, navParams, firestone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firestone = firestone;
        this.campanhas = this.firestone.getCampanhas();
    }
    VisualizarCampanhasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisualizarCampanhasPage');
    };
    VisualizarCampanhasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visualizar-campanhas',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\visualizar-campanhas\visualizar-campanhas.html"*/'<!--\n\n  Generated template for the VisualizarCampanhasPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Visualizar Campanhas</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-list>\n\n    <ion-list-header>\n\n      <h2>Campanhas</h2>\n\n    </ion-list-header>\n\n    <ion-item textwrap *ngFor="let campanha of campanhas | async">\n\n\n\n\n\n  \n\n        <ion-card >\n\n            <ion-card-header>\n\n              Necessita de doação {{campanha.tipoSangue}}\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                \n\n                <p>Nome do divulgador: {{ campanha.nomeDivulgador }}</p>\n\n                <p>Estado: {{campanha.endHemocentroUF}}</p>\n\n                <p>Cidade: {{campanha.endHemocentroCidade}}</p>\n\n                <p>Tempo limite para a doação: {{ campanha.dataLimite }}</p>\n\n                <p>Divulgador é o paciente: {{ campanha.divulgadorPrecisa }}</p>\n\n                <p>Emai do divulgador: {{ campanha.emailDivulgador }}</p>\n\n                <p>Email do hemocentro: {{ campanha.emailHemocentro }}</p>\n\n                <p>Endereço do divulgador: {{ campanha.endDivulgador }}</p>\n\n                <p>Cep do divulgador: {{ campanha.endDivulgadorCEP }}</p>\n\n                <p>Endereço hemocentro: {{ campanha.endHemocentro }}</p>\n\n                <p>Cep do hemocentro: {{ campanha.endHemocentroCEP }}</p>\n\n               <!-- <p>{{ campanha.grauUrgencia }}</p> -->\n\n                <p>Observacoes: {{ campanha.infAdicionais }}</p>\n\n                <p>Nome do hemocentro/hospital: {{ campanha.nomeHemocentro }}</p>\n\n                <p>Nome do paciente: {{ campanha.nomePaciente }}</p>\n\n                <!--<p>Contato hemocentro: {{ campanha.outroContatoHemocentro }}</p> -->\n\n                <p>Pagina do facebook do hemocentro: {{ campanha.pagFacebookHemocentro }}</p>\n\n                <p>Possui whatsapp: {{ campanha.possuiWhatsapp }}</p>\n\n                <!--<p>{{ campanha.possuiWhatsapp2 }}</p> -->\n\n                <p>Hemocentro possui site: {{ campanha.siteHemocentro }}</p>\n\n                <p>Telefone do divulgador: {{ campanha.telDivulgador }}</p>\n\n                <p>Telefone secundario do divulgador:{{ campanha.telDivulgador2 }}</p>\n\n                <p>Telefone hemocentro: {{ campanha.telHemocentro }}</p>\n\n                <p>Telefone secundario do hemocentro: {{ campanha.telHemocentro2 }}</p>\n\n                <p>Tipo de doação: {{ campanha.tipoDoacao }}</p>\n\n                <p>Tipo de sangue: {{ campanha.tipoSangue }}</p>\n\n            </ion-card-content>\n\n          </ion-card>\n\n\n\n\n\n\n\n     \n\n      \n\n    </ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\visualizar-campanhas\visualizar-campanhas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_firestone_service__["a" /* FirestoneService */]])
    ], VisualizarCampanhasPage);
    return VisualizarCampanhasPage;
}());

//# sourceMappingURL=visualizar-campanhas.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicarCampanhaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PublicarCampanhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PublicarCampanhaPage = /** @class */ (function () {
    function PublicarCampanhaPage(navCtrl, navParams, angularFirestore) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularFirestore = angularFirestore;
        this.campanhasCollectionRef = this.angularFirestore.collection('campanhas');
        this.campanhas = this.campanhasCollectionRef.valueChanges();
    }
    PublicarCampanhaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PublicarCampanhaPage');
    };
    PublicarCampanhaPage.prototype.cadastro = function () {
        console.log("hello wooorld");
    };
    PublicarCampanhaPage.prototype.habilitar = function () {
        document.getElementById('divHidden').hidden = false;
    };
    ;
    PublicarCampanhaPage.prototype.desabilitar = function () {
        document.getElementById('divHidden').hidden = true;
    };
    ;
    PublicarCampanhaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-publicar-campanha',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\publicar-campanha\publicar-campanha.html"*/'<!--\n\n  Generated template for the PublicarCampanhaPage page.\n\n  \n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Publicar Campanha</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  \n\n  <img src="../../assets/imgs/logoApp.png" alt="My Blood" class="imagemLogo">\n\n  \n\n  <form (ngSubmit)="cadastro()">\n\n\n\n      <h1 ion-text color="dark" class="h1">Publicar Campanha</h1>\n\n    <div>      \n\n\n\n        <div class="descricoes">Mostrar meu</div>\n\n\n\n      <ion-item>\n\n          <ion-toggle checked="true"></ion-toggle>\n\n          <ion-label>Nome</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-toggle checked="true"></ion-toggle>\n\n          <ion-label>Email</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-toggle checked="true"></ion-toggle>\n\n          <ion-label>Telefone</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-toggle checked="false"></ion-toggle>\n\n          <ion-label>Endereço</ion-label>\n\n      </ion-item>\n\n    </div>\n\n\n\n    <div> <!-- eu sou paciente-->\n\n        <div class="descricoes">Eu sou o paciente</div>\n\n\n\n        <ion-list radio-group>\n\n          <ion-item>\n\n            <ion-label>Sim</ion-label>\n\n            <ion-radio value="true" (click)="desabilitar()"></ion-radio>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label>Nao</ion-label>\n\n            <ion-radio value="false" (click)="habilitar()"></ion-radio>  \n\n          </ion-item>\n\n        </ion-list>\n\n    </div>\n\n\n\n    <div id="divHidden" hidden="true"> <!-- indicando paciente -->\n\n        <div class="descricoes">Indique um paciente</div>\n\n        <ion-item>\n\n        <ion-input class="umcampo" name="" maxlength="45" type="text" placeholder="Digite aqui o nome do paciente"></ion-input>\n\n      </ion-item>\n\n    </div>\n\n\n\n    <h2 ion-text color="dark" class="h2">Hemocentro</h2>\n\n\n\n    <div> <!--endereço do hospital-->\n\n    <ion-list>\n\n        <ion-item>\n\n          <ion-input name="nomeHemocentro" type="text" placeholder="Nome"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item> \n\n          <ion-input name="endHemocentroCEP"type="number" placeholder="CEP"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-input class="umcampo"name="endHemocentro" type="text" placeholder="Endereço"></ion-input>\n\n            <ion-input type="number" placeholder="Numero"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-input class="umcampo"  name="endHemocentroCidade" type="text" placeholder="Cidade"></ion-input>\n\n            <ion-input name="endHemocentroUF" minlength="2" maxlength="2" type="text" placeholder="UF"></ion-input>\n\n          </ion-item>\n\n    </ion-list>\n\n    </div>\n\n          \n\n    \n\n    <h2 ion-text color="dark" class="h2">Campanha</h2>\n\n\n\n  <div> <!--tipo de sangue-->\n\n      <div class="descricoes">Tipo de sangue</div>\n\n    <ion-list radio-group>\n\n        <ion-item>\n\n            <ion-label>AB+</ion-label>\n\n            <ion-radio value="AB+"></ion-radio>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>AB-</ion-label>\n\n            <ion-radio value="AB-"></ion-radio>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-label>O+</ion-label>\n\n            <ion-radio value="O+"></ion-radio>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-label>O-</ion-label>\n\n            <ion-radio value="O-"></ion-radio>  \n\n        </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <div> <!--tipo de doação-->\n\n      <div class="descricoes">Tipo de doação</div>\n\n    <ion-list radio-group>\n\n        <ion-item>\n\n            <ion-label>Sangue</ion-label>\n\n            <ion-radio value="sangue"></ion-radio>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label>Plaquetas</ion-label>\n\n            <ion-radio value="plaquetas"></ion-radio>\n\n          </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n\n\n<div> <!--data-->\n\n  <div class="descricoes">Data limite</div>\n\n<ion-item>\n\n    <ion-label>Data</ion-label>\n\n    <ion-datetime name="dataLimite" display-format="MMMM YYYY" min="2019" max="2040-10-31"></ion-datetime>\n\n  </ion-item>\n\n</div>\n\n\n\n\n\n<!-- observacao-->\n\n<div>\n\n    <div class="descricoes">Observação</div>\n\n<ion-item>\n\n    <ion-textarea rows="2" cols="20"></ion-textarea>\n\n  </ion-item>\n\n</div>\n\n\n\n<!-- botao -->\n\n<button ion-button full type="submit">Cadastrar <ion-icon name="person-add"></ion-icon></button>\n\n    \n\n\n\n\n\n\n\n</form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\publicar-campanha\publicar-campanha.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["AngularFirestore"]])
    ], PublicarCampanhaPage);
    return PublicarCampanhaPage;
}());

//# sourceMappingURL=publicar-campanha.js.map

/***/ }),

/***/ 236:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 236;

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/guia-informativo/guia-informativo.module": [
		599,
		6
	],
	"../pages/login/login.module": [
		601,
		5
	],
	"../pages/minha-conta/minha-conta.module": [
		603,
		4
	],
	"../pages/minhas-doacoes/minhas-doacoes.module": [
		600,
		3
	],
	"../pages/publicar-campanha/publicar-campanha.module": [
		605,
		2
	],
	"../pages/signup/signup.module": [
		602,
		1
	],
	"../pages/visualizar-campanhas/visualizar-campanhas.module": [
		604,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 280;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(463);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ultimate_ngxerrors__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_publicar_campanha_publicar_campanha__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_visualizar_campanhas_visualizar_campanhas__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_minhas_doacoes_minhas_doacoes__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_guia_informativo_guia_informativo__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__config__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_minha_conta_minha_conta__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_firestone_service__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Firebase Auth



// Firestone


// Pages and Components











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_publicar_campanha_publicar_campanha__["a" /* PublicarCampanhaPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_visualizar_campanhas_visualizar_campanhas__["a" /* VisualizarCampanhasPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_minhas_doacoes_minhas_doacoes__["a" /* MinhasDoacoesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_guia_informativo_guia_informativo__["a" /* GuiaInformativoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_minha_conta_minha_conta__["a" /* MinhaContaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__ultimate_ngxerrors__["a" /* NgxErrorsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/guia-informativo/guia-informativo.module#GuiaInformativoPageModule', name: 'GuiaInformativoPage', segment: 'guia-informativo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/minhas-doacoes/minhas-doacoes.module#MinhasDoacoesPageModule', name: 'MinhasDoacoesPage', segment: 'minhas-doacoes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/minha-conta/minha-conta.module#MinhaContaPageModule', name: 'MinhaContaPage', segment: 'minha-conta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visualizar-campanhas/visualizar-campanhas.module#VisualizarCampanhasPageModule', name: 'VisualizarCampanhasPage', segment: 'visualizar-campanhas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/publicar-campanha/publicar-campanha.module#PublicarCampanhaPageModule', name: 'PublicarCampanhaPage', segment: 'publicar-campanha', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_20__config__["a" /* credentials */].firebase),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__["AngularFirestoreModule"].enablePersistence(),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["AngularFireDatabaseModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_publicar_campanha_publicar_campanha__["a" /* PublicarCampanhaPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_visualizar_campanhas_visualizar_campanhas__["a" /* VisualizarCampanhasPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_minhas_doacoes_minhas_doacoes__["a" /* MinhasDoacoesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_guia_informativo_guia_informativo__["a" /* GuiaInformativoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_minha_conta_minha_conta__["a" /* MinhaContaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["AngularFireAuth"],
                __WEBPACK_IMPORTED_MODULE_9__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_22__services_firestone_service__["a" /* FirestoneService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_publicar_campanha_publicar_campanha__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_visualizar_campanhas_visualizar_campanhas__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_minhas_doacoes_minhas_doacoes__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_guia_informativo_guia_informativo__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_auth_service__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_minha_conta_minha_conta__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, auth) {
        this.auth = auth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.pages = [
            { titulo: 'Início', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icone: 'home' },
            { titulo: 'Publicar Campanha', component: __WEBPACK_IMPORTED_MODULE_6__pages_publicar_campanha_publicar_campanha__["a" /* PublicarCampanhaPage */], icone: 'person-add' },
            { titulo: 'Visualizar Campanhas', component: __WEBPACK_IMPORTED_MODULE_7__pages_visualizar_campanhas_visualizar_campanhas__["a" /* VisualizarCampanhasPage */], icone: 'eye' },
            { titulo: 'Minhas Doações', component: __WEBPACK_IMPORTED_MODULE_8__pages_minhas_doacoes_minhas_doacoes__["a" /* MinhasDoacoesPage */], icone: 'water' },
            { titulo: 'Guia Informativo', component: __WEBPACK_IMPORTED_MODULE_9__pages_guia_informativo_guia_informativo__["a" /* GuiaInformativoPage */], icone: 'help-circle' },
            { titulo: 'Minha Conta', component: __WEBPACK_IMPORTED_MODULE_11__pages_minha_conta_minha_conta__["a" /* MinhaContaPage */], icone: 'person' },
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.goToPage = function (component) {
        this.nav.push(component);
    };
    MyApp.prototype.logout = function () {
        // Se retornar true (que deu certo o logout, volta para o login)
        if (this.auth.signOut()) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\app\app.html"*/' <!--<ion-split-pane> Exibe o menu expandido em dispositivos maiores-->\n\n<ion-menu [content]="content">\n\n  <ion-content padding>\n\n    <ion-list>\n\n      <button ion-item menuClose *ngFor="let page of pages"\n\n      (click)="goToPage(page.component);">\n\n        <ion-icon [name]="page.icone" item-left></ion-icon>\n\n      {{page.titulo}}</button>\n\n      <button ion-item menuToggle (click)="logout()">Sair\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" main #content swipeBackEnable="false"></ion-nav>\n\n<!--</ion-split-pane>-->'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_10__services_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return credentials; });
var credentials = {
    firebase: {
        apiKey: "AIzaSyB-Cra5SIsSejkSatEghtZcjDeJ5lrGHcc",
        authDomain: "doacao-de-sangue-10147.firebaseapp.com",
        databaseURL: "https://doacao-de-sangue-10147.firebaseio.com",
        projectId: "doacao-de-sangue-10147",
        storageBucket: "doacao-de-sangue-10147.appspot.com",
        messagingSenderId: "26782982541"
    }
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = /** @class */ (function () {
    function AuthService(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
    }
    AuthService.prototype.signInWithEmail = function (credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.signUp = function (credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthService.prototype.getUserData = function () {
        return this.user;
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, auth, fb, menuCtrl) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.menuCtrl = menuCtrl;
        this.menuCtrl.enable(false);
        this.loginForm = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6)])]
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signInWithEmail(credentials)
            .then(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]); }, function (error) { return _this.loginError = error.message; });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\login\login.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>Entrar</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n	<img src="../../assets/imgs/logoApp.png" alt="My Blood" class="logo">\n\n\n\n	<form (ngSubmit)="login()" [formGroup]="loginForm">\n\n		<ion-list inset>\n\n\n\n			<ion-item [ngClass]="{ invalid: emailErrors.hasError(\'*\', [\'touched\', \'dirty\']) }">\n\n				<ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="email" #emailErrors="ngxErrors">\n\n				<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\', \'dirty\']">É necessário um e-mail válido</div>\n\n			</div>\n\n\n\n			<ion-item [ngClass]="{ invalid: passwordErrors.hasError(\'*\', [\'touched\']) }">\n\n				<ion-input type="password" placeholder="Senha" formControlName="password"></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="password" #passwordErrors="ngxErrors">\n\n				<div [ngxError]="[\'minlength\', \'required\']" [when]="[\'touched\']">Precisa ter ao menos 6 caracteres</div>\n\n			</div>\n\n		</ion-list>\n\n\n\n		<div padding-horizontal>\n\n			<div class="form-error">{{loginError}}</div>\n\n\n\n			<button ion-button full type="submit" [disabled]="!loginForm.valid">Entrar <ion-icon name="log-in"></ion-icon></button>\n\n			<!-- <div class="login-footer">\n\n				<p>\n\n					<a href="#">Esqueceu a senha?</a>\n\n					Se você é um usuário novo, por favor cadastre-se.\n\n				</p>\n\n			</div> -->\n\n\n\n			<ion-list class="c-login-footer">\n\n\n\n				<!-- <button ion-button icon-left block clear (click)="loginWithGoogle()">\n\n					<ion-icon name="logo-google"></ion-icon>\n\n					Log in com Google\n\n				</button> -->\n\n\n\n				<p class="c-login-footer__p">Não tem uma conta? <a (click)="signup()" class="c-login-footer__link">cadastre-se</a></p>\n\n				<p class="c-login-footer__p"><a href="#" class="c-login-footer__link">Esqueci minha senha</a></p>\n\n				\n\n			</ion-list>\n\n		</div>\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\PC\Documents\GitHub\doacao-de-sangue\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[342]);
//# sourceMappingURL=main.js.map