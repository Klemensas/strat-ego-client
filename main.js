(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/game/game.module": [
		"./src/app/game/game.module.ts",
		"app-game-game-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n<report-error></report-error>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: tokenGetter, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngrx/store-devtools */ "./node_modules/@ngrx/store-devtools/fesm5/store-devtools.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angulartics2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angulartics2 */ "./node_modules/angulartics2/fesm5/angulartics2.js");
/* harmony import */ var angulartics2_ga__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angulartics2/ga */ "./node_modules/angulartics2/ga/fesm5/angulartics2-ga.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _full_guard__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./full.guard */ "./src/app/full.guard.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _services_game_data_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./services/game-data.service */ "./src/app/services/game-data.service.ts");
/* harmony import */ var _game_services_socket_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./game/services/socket.service */ "./src/app/game/services/socket.service.ts");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./auth/auth.module */ "./src/app/auth/auth.module.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./reducers */ "./src/app/reducers.ts");
/* harmony import */ var _world_world_effects__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./world/world.effects */ "./src/app/world/world.effects.ts");
/* harmony import */ var _rollbar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./rollbar */ "./src/app/rollbar.ts");
/* harmony import */ var _report_error_report_error_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./report-error/report-error.component */ "./src/app/report-error/report-error.component.ts");
/* harmony import */ var _report_error_report_dialog_report_dialog_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./report-error/report-dialog/report-dialog.component */ "./src/app/report-error/report-dialog/report-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























function tokenGetter() {
    return localStorage.getItem('jwt');
}
var AppModule = /** @class */ (function () {
    function AppModule(angulartics2GoogleAnalytics) {
        window.screen.orientation.lock('landscape')
            .then(function () { })
            .catch(function () { });
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _ngrx_store__WEBPACK_IMPORTED_MODULE_6__["StoreModule"].forRoot(_reducers__WEBPACK_IMPORTED_MODULE_22__["reducers"], { metaReducers: _reducers__WEBPACK_IMPORTED_MODULE_22__["metaReducers"] }),
                _ngrx_effects__WEBPACK_IMPORTED_MODULE_7__["EffectsModule"].forRoot([_world_world_effects__WEBPACK_IMPORTED_MODULE_23__["WorldEffects"]]),
                _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production ? [] : _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_8__["StoreDevtoolsModule"].instrument(),
                _app_routing__WEBPACK_IMPORTED_MODULE_16__["routing"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"].forRoot(),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_5__["JwtModule"].forRoot({
                    config: {
                        headerName: 'Authorization',
                        tokenGetter: tokenGetter,
                        whitelistedDomains: ['localhost:9000', 'server.stratego.xyz']
                    }
                }),
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_12__["FontAwesomeModule"],
                _auth_auth_module__WEBPACK_IMPORTED_MODULE_21__["AuthModule"],
                angulartics2__WEBPACK_IMPORTED_MODULE_10__["Angulartics2Module"].forRoot([angulartics2_ga__WEBPACK_IMPORTED_MODULE_11__["Angulartics2GoogleAnalytics"]]),
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatListModule"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"],
                _app_routing__WEBPACK_IMPORTED_MODULE_16__["routedComponents"],
                _report_error_report_error_component__WEBPACK_IMPORTED_MODULE_25__["ReportErrorComponent"],
                _report_error_report_dialog_report_dialog_component__WEBPACK_IMPORTED_MODULE_26__["ReportDialogComponent"],
            ],
            providers: [
                _game_services_socket_service__WEBPACK_IMPORTED_MODULE_20__["SocketService"],
                _auth_guard__WEBPACK_IMPORTED_MODULE_18__["AuthGuard"],
                _full_guard__WEBPACK_IMPORTED_MODULE_17__["FullGuard"],
                _services_game_data_service__WEBPACK_IMPORTED_MODULE_19__["GameDataService"],
                _rollbar__WEBPACK_IMPORTED_MODULE_24__["RollbarService"].provider(),
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ErrorHandler"], useClass: _rollbar__WEBPACK_IMPORTED_MODULE_24__["RollbarErrorHandler"] },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"]],
            entryComponents: [
                _report_error_report_dialog_report_dialog_component__WEBPACK_IMPORTED_MODULE_26__["ReportDialogComponent"],
            ]
        }),
        __metadata("design:paramtypes", [angulartics2_ga__WEBPACK_IMPORTED_MODULE_11__["Angulartics2GoogleAnalytics"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routing, routedComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routedComponents", function() { return routedComponents; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/ */ "./src/app/home/index.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _full_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./full.guard */ "./src/app/full.guard.ts");




var appRoutes = [
    { path: '', component: _home___WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    {
        path: 'manage',
        canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { role: 'admin' },
        component: _home___WEBPACK_IMPORTED_MODULE_1__["HomeComponent"]
    },
    {
        path: 'world/:name',
        canActivate: [/* AuthGuard, SocketGuard, WorldGuard */ _full_guard__WEBPACK_IMPORTED_MODULE_3__["FullGuard"]],
        loadChildren: 'app/game/game.module#GameModule'
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes);
var routedComponents = [_home___WEBPACK_IMPORTED_MODULE_1__["HomeComponent"]];


/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { AuthActions, AuthState, getUserState } from './store/auth';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(store, router) {
        this.store = store;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route) {
        var b = new Promise(function (resolve) { return setTimeout(function () { return resolve(true); }, 5000); });
        // return this.store.select(getUserState)
        //   .filter(({ inProgress }) => !inProgress)
        //   .map((d) => ({ lol: 'wut' }))
        //   .subscribe(d => console.log('hmm', d));
        return b;
        //   return this.store.select(getUserState)
        //     .filter(({ inProgress }) => !inProgress)
        //     .map(({ user, token }) => {
        //       console.log('hrllo', user, token)
        //       const canAccess = !!user && !!token;
        //       if (canAccess && (!route.data.role || route.data.role === user.role)) {
        //         return true;
        //       }
        //       this.router.navigate(['login']);
        //       return false;
        //     });
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth.actions.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.actions.ts ***!
  \**************************************/
/*! exports provided: AuthActionTypes, Login, LoginSuccess, LoginFail, LoadProfileSuccess, LoadProfileFail, Register, RegisterSuccess, RegisterFail, Logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthActionTypes", function() { return AuthActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginSuccess", function() { return LoginSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginFail", function() { return LoginFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadProfileSuccess", function() { return LoadProfileSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadProfileFail", function() { return LoadProfileFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSuccess", function() { return RegisterSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterFail", function() { return RegisterFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logout", function() { return Logout; });
var AuthActionTypes;
(function (AuthActionTypes) {
    AuthActionTypes["Login"] = "[Auth] Login";
    AuthActionTypes["LoginSuccess"] = "[Auth] Login Success";
    AuthActionTypes["LoginFail"] = "[Auth] Login Fail";
    AuthActionTypes["LoadProfileSuccess"] = "[Auth] Load Profile Success";
    AuthActionTypes["LoadProfileFail"] = "[Auth] Load Profile Fail";
    AuthActionTypes["Register"] = "[Auth] Register";
    AuthActionTypes["RegisterSuccess"] = "[Auth] Register Success";
    AuthActionTypes["RegisterFail"] = "[Auth] Register Fail";
    AuthActionTypes["Logout"] = "[Auth] Logout";
})(AuthActionTypes || (AuthActionTypes = {}));
var Login = /** @class */ (function () {
    function Login(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.Login;
    }
    return Login;
}());

var LoginSuccess = /** @class */ (function () {
    function LoginSuccess(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.LoginSuccess;
    }
    return LoginSuccess;
}());

var LoginFail = /** @class */ (function () {
    function LoginFail(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.LoginFail;
    }
    return LoginFail;
}());

var LoadProfileSuccess = /** @class */ (function () {
    function LoadProfileSuccess(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.LoadProfileSuccess;
    }
    return LoadProfileSuccess;
}());

var LoadProfileFail = /** @class */ (function () {
    function LoadProfileFail(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.LoadProfileFail;
    }
    return LoadProfileFail;
}());

var Register = /** @class */ (function () {
    function Register(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.Register;
    }
    return Register;
}());

var RegisterSuccess = /** @class */ (function () {
    function RegisterSuccess(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RegisterSuccess;
    }
    return RegisterSuccess;
}());

var RegisterFail = /** @class */ (function () {
    function RegisterFail(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RegisterFail;
    }
    return RegisterFail;
}());

var Logout = /** @class */ (function () {
    function Logout() {
        this.type = AuthActionTypes.Logout;
    }
    return Logout;
}());



/***/ }),

/***/ "./src/app/auth/auth.effects.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.effects.ts ***!
  \**************************************/
/*! exports provided: AuthEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthEffects", function() { return AuthEffects; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.actions */ "./src/app/auth/auth.actions.ts");
/* harmony import */ var _game_services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../game/services */ "./src/app/game/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthEffects = /** @class */ (function () {
    function AuthEffects(actions$, authService, socketService, router) {
        var _this = this;
        this.actions$ = actions$;
        this.authService = authService;
        this.socketService = socketService;
        this.router = router;
        this.login$ = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_auth_actions__WEBPACK_IMPORTED_MODULE_6__["AuthActionTypes"].Login), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (action) { return action.payload; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (credentials) {
            return _this.authService.login(credentials).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (token) { return new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["LoginSuccess"](token); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["LoginFail"](error)); }));
        }));
        this.profile$ = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_auth_actions__WEBPACK_IMPORTED_MODULE_6__["AuthActionTypes"].LoginSuccess, _auth_actions__WEBPACK_IMPORTED_MODULE_6__["AuthActionTypes"].RegisterSuccess), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function () {
            return _this.authService.getUser().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (user) { return new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["LoadProfileSuccess"](user); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["LoadProfileFail"](error)); }));
        }));
        this.loginError$ = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_auth_actions__WEBPACK_IMPORTED_MODULE_6__["AuthActionTypes"].LoadProfileFail), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return _this.authService.removeToken(); }));
        this.register$ = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_auth_actions__WEBPACK_IMPORTED_MODULE_6__["AuthActionTypes"].Register), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (action) { return action.payload; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (credentials) {
            return _this.authService.register(credentials).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (token) { return new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["RegisterSuccess"](token); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["RegisterFail"](error)); }));
        }));
        this.logout$ = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_auth_actions__WEBPACK_IMPORTED_MODULE_6__["AuthActionTypes"].Logout), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
            _this.authService.removeToken();
            _this.socketService.disconnect();
            _this.router.navigate(['/']);
        }));
        this.checkToken$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["defer"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_this.authService.getToken()); });
    }
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], AuthEffects.prototype, "login$", void 0);
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], AuthEffects.prototype, "profile$", void 0);
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])({ dispatch: false }),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], AuthEffects.prototype, "loginError$", void 0);
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], AuthEffects.prototype, "register$", void 0);
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])({ dispatch: false }),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], AuthEffects.prototype, "logout$", void 0);
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])({ dispatch: false }),
        __metadata("design:type", Object)
    ], AuthEffects.prototype, "checkToken$", void 0);
    AuthEffects = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Actions"],
            _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _game_services__WEBPACK_IMPORTED_MODULE_7__["SocketService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthEffects);
    return AuthEffects;
}());



/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router/ */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _auth_effects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.effects */ "./src/app/auth/auth.effects.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reducers */ "./src/app/auth/reducers.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _login_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login/index */ "./src/app/auth/login/index.ts");
/* harmony import */ var _register_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./register/index */ "./src/app/auth/register/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var pages = [
    _login_index__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"],
    _register_index__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"],
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: pages,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_router___WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild([
                    { path: 'login', component: _login_index__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"] },
                    { path: 'register', component: _register_index__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"] },
                ]),
                _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["StoreModule"].forFeature('auth', _reducers__WEBPACK_IMPORTED_MODULE_7__["reducers"]),
                _ngrx_effects__WEBPACK_IMPORTED_MODULE_5__["EffectsModule"].forFeature([_auth_effects__WEBPACK_IMPORTED_MODULE_6__["AuthEffects"]])
            ],
            providers: [
                _auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"],
            ],
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.reducer.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.reducer.ts ***!
  \**************************************/
/*! exports provided: initialState, reducer, getUser, getProgress, getError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProgress", function() { return getProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getError", function() { return getError; });
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.actions */ "./src/app/auth/auth.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialState = {
    inProgress: false,
    user: null,
    token: null,
    error: null,
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].Login:
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].Register:
            return __assign({}, state, { inProgress: true, error: null });
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].LoginSuccess:
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].RegisterSuccess:
            return __assign({}, state, { inProgress: false, token: action.payload });
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].LoadProfileSuccess:
            return __assign({}, state, { inProgress: false, user: action.payload });
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].LoginFail:
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].RegisterFail:
            return __assign({}, state, { inProgress: false, error: action.payload });
        case _auth_actions__WEBPACK_IMPORTED_MODULE_0__["AuthActionTypes"].Logout:
            return initialState;
        default: {
            return state;
        }
    }
}
var getUser = function (state) { return state.user; };
var getProgress = function (state) { return state.inProgress; };
var getError = function (state) { return state.error; };


/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.actions */ "./src/app/auth/auth.actions.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AuthService = /** @class */ (function () {
    function AuthService(http, router, store) {
        this.http = http;
        this.router = router;
        this.store = store;
        this.user = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_8__["JwtHelperService"]();
    }
    AuthService.prototype.getToken = function () {
        var token = localStorage.getItem('jwt');
        if (!token || this.jwtHelper.isTokenExpired(token)) {
            localStorage.removeItem('jwt');
            return false;
        }
        // this.tokenData = this.jwtHelper.decodeToken(token);
        this.store.dispatch(new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["LoginSuccess"](token));
    };
    AuthService.prototype.storeToken = function (token) {
        var tokenExpires = new Date(this.jwtHelper.getTokenExpirationDate(token)).getTime();
        this.tokenExpirationTimeout = setTimeout(this.tokenExpiration, tokenExpires - Date.now());
        localStorage.setItem('jwt', token);
        return token;
    };
    AuthService.prototype.removeToken = function () {
        clearTimeout(this.tokenExpirationTimeout);
        localStorage.removeItem('jwt');
    };
    AuthService.prototype.login = function (data) {
        var _this = this;
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].server.auth + "local", data).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return response.token; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (token) { return _this.storeToken(token); }));
    };
    AuthService.prototype.register = function (data) {
        var _this = this;
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].server.api + "users", data).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return response.token; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (token) { return _this.storeToken(token); }));
    };
    AuthService.prototype.tokenExpiration = function () {
        this.store.dispatch(new _auth_actions__WEBPACK_IMPORTED_MODULE_6__["Logout"]());
    };
    AuthService.prototype.getUser = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].server.api + "users/me");
        // .cache();
        // user$.subscribe(
        //   u => this.user.next(u),
        //   err => {
        //     this.logout();
        //     console.error('get user error', err)
        //   }
        // );
        // return user$;
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/auth/login/index.ts":
/*!*************************************!*\
  !*** ./src/app/auth/login/index.ts ***!
  \*************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ "./src/app/auth/login/login.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });




/***/ }),

/***/ "./src/app/auth/login/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/auth/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div>\r\n    <h1>Login Form</h1>\r\n    <form (ngSubmit)=\"onSubmit(loginForm)\" #loginForm=\"ngForm\">\r\n      <div class=\"form-group\">\r\n        <label for=\"email\">Email</label>\r\n        <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" [(ngModel)]=\"loginForm.email\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password</label>\r\n        <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" [(ngModel)]=\"loginForm.password\" required>\r\n      </div>\r\n      <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!loginForm.form.valid\">Submit</button>\r\n      <span class=\"text-danger\" *ngIf=\"loginForm.errors\">{{loginForm.errors.errorMessage}}</span>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/login/login.component.scss":
/*!*************************************************!*\
  !*** ./src/app/auth/login/login.component.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth.actions */ "./src/app/auth/auth.actions.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers */ "./src/app/auth/reducers.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, store) {
        this.router = router;
        this.store = store;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubscription = this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_5__["getAuthState"]).subscribe(function (auth) {
            if (auth.user) {
                _this.router.navigate(['/']);
                return;
            }
            if (auth.error) {
                if (auth.error.status === 401) {
                    var errBody = auth.error.json();
                    var errorMessage = errBody.message || 'Unauthorized';
                    _this.form.form.setErrors({ errorMessage: errorMessage });
                    return;
                }
                _this.form.form.setErrors({ errorMessage: 'Unforseen server error.' });
            }
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    LoginComponent.prototype.onSubmit = function (form) {
        this.store.dispatch(new _auth_actions__WEBPACK_IMPORTED_MODULE_4__["Login"](form.value));
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loginForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"])
    ], LoginComponent.prototype, "form", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            // tslint:disable-next-line:component-selector
            selector: 'login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/auth/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/auth/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/reducers.ts":
/*!**********************************!*\
  !*** ./src/app/auth/reducers.ts ***!
  \**********************************/
/*! exports provided: reducers, getState, getAuthState, getUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getState", function() { return getState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthState", function() { return getAuthState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _auth_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.reducer */ "./src/app/auth/auth.reducer.ts");


var reducers = {
    auth: _auth_reducer__WEBPACK_IMPORTED_MODULE_1__["reducer"],
};
var getState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])('auth');
var getAuthState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getState, function (state) { return state.auth; });
var getUser = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getAuthState, _auth_reducer__WEBPACK_IMPORTED_MODULE_1__["getUser"]);


/***/ }),

/***/ "./src/app/auth/register/index.ts":
/*!****************************************!*\
  !*** ./src/app/auth/register/index.ts ***!
  \****************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.component */ "./src/app/auth/register/register.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return _register_component__WEBPACK_IMPORTED_MODULE_0__["RegisterComponent"]; });




/***/ }),

/***/ "./src/app/auth/register/register.component.html":
/*!*******************************************************!*\
  !*** ./src/app/auth/register/register.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div>\r\n    <h1>Register Form</h1>\r\n    <form (ngSubmit)=\"onSubmit(loginForm)\" #loginForm=\"ngForm\">\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">Name</label>\r\n        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" [(ngModel)]=\"loginForm.name\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"email\">Email</label>\r\n        <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" [(ngModel)]=\"loginForm.email\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password</label>\r\n        <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" [(ngModel)]=\"loginForm.password\" required>\r\n      </div>\r\n      <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!loginForm.form.valid\">Submit</button>\r\n      <span class=\"text-danger\" *ngIf=\"loginForm.errors\">{{loginForm.errors.errorMessage}}</span>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/register/register.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/auth/register/register.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/register/register.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/auth/register/register.component.ts ***!
  \*****************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers */ "./src/app/auth/reducers.ts");
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth.actions */ "./src/app/auth/auth.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(store, router) {
        this.store = store;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubscription = this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_4__["getAuthState"]).subscribe(function (auth) {
            if (auth.user) {
                _this.router.navigate(['/']);
                return;
            }
            if (auth.error) {
                if (auth.error.status === 422) {
                    var errBody = auth.error.json();
                    var errorMessage = errBody.message || 'Could not register user';
                    _this.form.form.setErrors({ errorMessage: errorMessage });
                    return;
                }
                _this.form.form.setErrors({ errorMessage: 'Unforseen server error.' });
            }
        });
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    RegisterComponent.prototype.onSubmit = function (form) {
        this.store.dispatch(new _auth_actions__WEBPACK_IMPORTED_MODULE_5__["Register"](form.value));
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loginForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"])
    ], RegisterComponent.prototype, "form", void 0);
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            // tslint:disable-next-line:component-selector
            selector: 'register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/auth/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/auth/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/full.guard.ts":
/*!*******************************!*\
  !*** ./src/app/full.guard.ts ***!
  \*******************************/
/*! exports provided: FullGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullGuard", function() { return FullGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _game_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game/services */ "./src/app/game/services/index.ts");
/* harmony import */ var _auth_reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/reducers */ "./src/app/auth/reducers.ts");
/* harmony import */ var _world_world_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./world/world.actions */ "./src/app/world/world.actions.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reducers */ "./src/app/reducers.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FullGuard = /** @class */ (function () {
    function FullGuard(store, router, socket) {
        this.store = store;
        this.router = router;
        this.socket = socket;
    }
    FullGuard.prototype.canActivate = function (route) {
        var _this = this;
        var target = route.params['name'].toLowerCase();
        return this.store.select(_auth_reducers__WEBPACK_IMPORTED_MODULE_6__["getAuthState"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (_a) {
            var inProgress = _a.inProgress;
            return !inProgress;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
            var user = _a.user, token = _a.token;
            var canAccess = !!user && !!token;
            if (!canAccess || route.data.role && route.data.role !== user.role) {
                _this.router.navigate(['login']);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false);
            }
            // this.store.dispatch({ type: PlayerActions.SET_PROGRESS })
            return _this.worldGuard(target, token);
        }));
    };
    FullGuard.prototype.worldGuard = function (target, token) {
        var _this = this;
        return this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_8__["getWorlds"]).pipe(
        // .combineLatest(this.store.select(getPlayerState))
        // .filter(([world, player]) => !player.inProgress)
        // .map(([world, player]) => {
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (worlds) {
            var world = worlds.find(function (item) { return item.world.name.toLowerCase() === target; });
            if (!world) {
                _this.router.navigate(['/']);
                return false;
            }
            _this.store.dispatch(new _world_world_actions__WEBPACK_IMPORTED_MODULE_7__["SelectWorld"](world.world.name));
            _this.socket.connect(token);
            return true;
        }));
    };
    FullGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _game_services__WEBPACK_IMPORTED_MODULE_5__["SocketService"]])
    ], FullGuard);
    return FullGuard;
}());



/***/ }),

/***/ "./src/app/game/services/command.service.ts":
/*!**************************************************!*\
  !*** ./src/app/game/services/command.service.ts ***!
  \**************************************************/
/*! exports provided: CommandService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandService", function() { return CommandService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommandService = /** @class */ (function () {
    function CommandService() {
        this.targeting = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
    }
    CommandService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CommandService);
    return CommandService;
}());



/***/ }),

/***/ "./src/app/game/services/index.ts":
/*!****************************************!*\
  !*** ./src/app/game/services/index.ts ***!
  \****************************************/
/*! exports provided: SocketService, MapService, CommandService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.service */ "./src/app/game/services/socket.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return _socket_service__WEBPACK_IMPORTED_MODULE_0__["SocketService"]; });

/* harmony import */ var _map_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.service */ "./src/app/game/services/map.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapService", function() { return _map_service__WEBPACK_IMPORTED_MODULE_1__["MapService"]; });

/* harmony import */ var _command_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./command.service */ "./src/app/game/services/command.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommandService", function() { return _command_service__WEBPACK_IMPORTED_MODULE_2__["CommandService"]; });






/***/ }),

/***/ "./src/app/game/services/map.service.ts":
/*!**********************************************!*\
  !*** ./src/app/game/services/map.service.ts ***!
  \**********************************************/
/*! exports provided: Hex, Layout, MapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hex", function() { return Hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapService", function() { return MapService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.service */ "./src/app/game/services/socket.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(seedrandom__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Hex = /** @class */ (function () {
    function Hex(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Hex.prototype.round = function () {
        var xi = Math.round(this.x);
        var yi = Math.round(this.y);
        var zi = Math.round(this.z);
        var xDiff = Math.abs(xi - this.x);
        var yDiff = Math.abs(yi - this.y);
        var zDiff = Math.abs(zi - this.z);
        if (xDiff > yDiff && xDiff > zDiff) {
            xi = -yi - zi;
        }
        else if (yDiff > zDiff) {
            yi = -xi - zi;
        }
        else {
            zi = -xi - yi;
        }
        return new Hex(xi, yi, zi);
    };
    Hex.prototype.distance = function (target) {
        return (Math.abs(this.x - target.x) + Math.abs(this.y - target.y) + Math.abs(this.z - target.z)) / 2;
    };
    Hex.prototype.toString = function () {
        return this.x + "," + this.y + "," + this.z;
    };
    return Hex;
}());

var Layout = /** @class */ (function () {
    function Layout(origin, size, centerCoord) {
        this.origin = origin;
        this.size = size;
        this.centerCoord = centerCoord;
        this.orientation = {
            f0: Math.sqrt(3.0),
            f1: Math.sqrt(3.0) / 2,
            f2: 0,
            f3: 1.5,
            b0: Math.sqrt(3.0) / 3,
            b1: -1 / 3,
            b2: 0,
            b3: 2 / 3,
            startAngle: 0.5
        };
    }
    Layout.prototype.coordToHex = function (coord) {
        var offsetCoord = [
            coord[0] - this.centerCoord,
            coord[1] - this.centerCoord,
        ];
        var x = offsetCoord[0] - (offsetCoord[1] + (offsetCoord[1] & 1)) / 2;
        var y = offsetCoord[1];
        var z = -x - y;
        return new Hex(x, y, z);
    };
    Layout.prototype.coordToPixel = function (coord) {
        var hex = this.coordToHex(coord);
        return this.hexToPixel(hex);
    };
    Layout.prototype.hexToCoord = function (hex) {
        return [hex.x + (hex.y + (hex.y & 1)) / 2 + this.centerCoord, hex.y + this.centerCoord];
    };
    Layout.prototype.hexToPixel = function (hex) {
        var x = (this.orientation.f0 * hex.x + this.orientation.f1 * hex.y) * this.size.x;
        var y = (this.orientation.f2 * hex.x + this.orientation.f3 * hex.y) * this.size.y;
        return {
            x: x + this.origin.x,
            y: y + this.origin.y
        };
    };
    Layout.prototype.pixelToHex = function (point) {
        var pt = {
            x: (point.x - this.origin.x) / this.size.x,
            y: (point.y - this.origin.y) / this.size.y
        };
        var x = this.orientation.b0 * pt.x + this.orientation.b1 * pt.y;
        var y = this.orientation.b2 * pt.x + this.orientation.b3 * pt.y;
        return new Hex(x, y, -x - y);
    };
    Layout.prototype.pixelToCoord = function (point) {
        var hex = this.pixelToHex(point);
        return this.hexToCoord(hex.round());
    };
    Layout.prototype.hexCornerOffset = function (corner) {
        var angle = 2.0 * Math.PI * (this.orientation.startAngle - corner) / 6;
        return {
            x: this.size.x * Math.cos(angle),
            y: this.size.y * Math.sin(angle)
        };
    };
    Layout.prototype.polygonCorners = function (target, mapOffset) {
        if (mapOffset === void 0) { mapOffset = { x: 0, y: 0 }; }
        var corners = [];
        var center = target instanceof Hex ? this.hexToPixel(target) : target;
        for (var i = 0; i < 6; i++) {
            var offset = this.hexCornerOffset(i);
            offset.x -= mapOffset.x;
            offset.y -= mapOffset.y;
            corners.push({
                x: center.x + offset.x,
                y: center.y + offset.y
            });
        }
        return corners;
    };
    return Layout;
}());

var MapService = /** @class */ (function () {
    function MapService(socket) {
        this.socket = socket;
        this.imagesLoaded = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        // TODO: use dynamic marker coloring, add markers for allies and naps
        this.mapTiles = {
            image: null,
            tiles: [
                [0, 0], [120, 0], [240, 0], [360, 0], [480, 0], [600, 0],
                [0, 140], [120, 140], [240, 140],
            ],
            object: [360, 140],
            objectType: {
                abandoned: [480, 140],
                ownedActive: [600, 140],
                owned: [0, 280],
                member: [120, 280],
                war: [240, 280],
            },
            size: [120, 140]
        };
        this.mapImgeLoc = './assets/images/tiles_small.png';
        this.imgPreload(this.mapImgeLoc);
        // Test version with all available map data
        // this.socket.events.get('map').subscribe(event => {
        //   this.lastUpdate = Date.now();
        //   Object.assign(this.mapData, event);
        //   if (this.queuedPromise.length && this.imagesLoaded) {
        //     this.formatMapData(this.queuedPromise.shift());
        //   }
        // });
    }
    MapService.prototype.rng = function (seed) {
        // TODO: use actual active world here
        return seedrandom__WEBPACK_IMPORTED_MODULE_3__["xor4096"]("megapolis." + seed).quick();
    };
    MapService.prototype.imgPreload = function (imageURL) {
        var _this = this;
        this.mapTiles.image = new Image();
        this.mapTiles.image.src = imageURL;
        this.mapTiles.image.onload = function () { return _this.imagesLoaded.next(true); };
    };
    MapService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], MapService);
    return MapService;
}());



/***/ }),

/***/ "./src/app/game/services/socket.service.ts":
/*!*************************************************!*\
  !*** ./src/app/game/services/socket.service.ts ***!
  \*************************************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import 'rxjs/add/operator/cache';



var SocketService = /** @class */ (function () {
    function SocketService(store) {
        var _this = this;
        this.store = store;
        this.name = 'tmp';
        this.host = 'watever';
        // TODO: using subjects to delay registering after socket is initialized. This is required due to socket load on app startup
        // Consider separating game module and lazy loading it with sockets. That could potentially simplify registering logic.
        this.eventsToRegister$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.registeredEvents = [];
        this.readyToRegister$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.registerEventsSubscription = this.eventsToRegister$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.readyToRegister$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
            var events = _a[0], ready = _a[1];
            return ready && !!events.length;
        })).subscribe(function (_a) {
            var events = _a[0];
            events.forEach(function (_a) {
                var event = _a[0], callback = _a[1];
                if (_this.registeredEvents.includes(event)) {
                    return;
                }
                _this.socket.on(event, callback);
                _this.registeredEvents.push(event);
            });
        });
        this.events = new Map();
    }
    SocketService.prototype.registerEvents = function (events) {
        // Add to already existing events
        this.eventsToRegister$.next(this.eventsToRegister$.value.concat(events));
    };
    SocketService.prototype.connect = function (token) {
        var _this = this;
        var world = 'megapolis'; // replace with target world data
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_4__["connect"](_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].server.base, {
            path: '/socket.io-client',
            query: "token=" + token + "&world=" + world,
        });
        this.readyToRegister$.next(true);
        // TODO: rework returned value into something valid when working with server side socket authentication
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(function (observer) {
            _this.socket.on('connect', function (data) { return observer.next(_this.socket); });
        });
    };
    SocketService.prototype.disconnect = function () {
        this.socket.close();
        this.registeredEvents = [];
        this.readyToRegister$.next(false);
    };
    SocketService.prototype.sendEvent = function (event, data) {
        console.log("[Socket emit: " + event + "]", data);
        this.socket.emit(event, data);
    };
    SocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <nav class=\"navbar navbar-expand-md navbar-light bg-faded\" ngbDropdown>\r\n    <a class=\"navbar-brand\" href=\"#\">Strat-ego</a>\r\n    <button class=\"navbar-toggler\" type=\"button\" (click)=\"isCollapsed = !isCollapsed\" [attr.aria-expanded]=\"!isCollapsed\" aria-controls=\"navbarCollapse\" ngbDropdownToggle>\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse justify-content-lg-between\" [ngbCollapse]=\"isCollapsed\">\r\n      <ul class=\"nav navbar-nav align-items-center\">\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" [routerLink]=\"['/']\">Home</a>\r\n        </li>\r\n      </ul>\r\n      <div class=\"d-flex justify-content-center align-items-center\" *ngIf=\"user\">\r\n        <span>Welcome <strong>{{ user.name }}</strong></span>\r\n        <a class=\"nav-link\" [routerLink]=\"['/']\" (click)=\"logout()\">Logout</a>\r\n      </div>\r\n      <div class=\"d-flex justify-content-center align-items-center\" *ngIf=\"!user\">\r\n        <a class=\"nav-link\" [routerLink]=\"['/login']\">Login</a>\r\n        <span>or</span>\r\n        <a class=\"nav-link\" [routerLink]=\"['/register']\">register</a>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n</header>\r\n<div class=\"container py-5 mb-5\">\r\n  <div class=\"worlds\">\r\n    <h1>Available worlds</h1>\r\n    <div class=\"row mt-5\">\r\n      <div class=\"col-4\" *ngFor=\"let world of worlds$ | async\">\r\n        <mat-card>\r\n          <mat-card-header>\r\n            <mat-card-title><h3 class=\"text-uppercase font-weight-bold\">{{world.world.name}}</h3></mat-card-title>\r\n            <mat-card-subtitle>Started on {{world.world.createdAt | date:'short'}}</mat-card-subtitle>\r\n          </mat-card-header>\r\n          <mat-card-content class=\"mx-2\">\r\n            <div class=\"d-flex justify-content-between\">\r\n              <div>World speed</div>\r\n              <div>{{world.world.speed}}</div>\r\n            </div>\r\n            <div class=\"d-flex justify-content-between\">\r\n              <div>Current ring</div>\r\n              <div>{{world.world.currentRing}}</div>\r\n            </div>\r\n            <div class=\"d-flex justify-content-between\">\r\n              <div>Barbarian percentage</div>\r\n              <div>{{world.world.barbPercent | percent}}</div>\r\n            </div>\r\n          </mat-card-content>\r\n          <mat-card-actions class=\"pb-3 mx-2 d-flex\">\r\n            <button *ngIf=\"user\" mat-raised-button color=\"primary\" class=\"w-100\" [routerLink]=\"['/world', world.world.name]\">Play</button>\r\n            <button *ngIf=\"!user\" mat-button color=\"info\" class=\"w-50\" [routerLink]=\"['/login']\">Login</button>\r\n            <button *ngIf=\"!user\" mat-button color=\"info\" class=\"w-50\" [routerLink]=\"['/register']\">Register</button>\r\n          </mat-card-actions>\r\n        </mat-card>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"worldError$ | async as error\" class=\"alert alert-danger\">{{ error }}</div>\r\n  </div>\r\n  <div class=\"introduction mt-5\">\r\n    <h2>About</h2>\r\n    <div class=\"row\">\r\n      <div class=\"col-12\">\r\n        <p>Welcome to the alpha play test of <b>Stratego </b><i class=\"text-muted\">(working title)</i>! A free real time MMO strategy game about growing your empire and conquering others.</p>\r\n        <p>You start out with a small village and must navigate the dangerous political landscape of an unknown world to expand and grow into an empire. With passage of time you'll make trusty allies and find dangerous enemies. Will you band together with your new friends to stand your ground or will you try to survive on your own?</p>\r\n      </div>\r\n      <div class=\"col-12 mt-4\">\r\n        <ngb-alert [dismissible]=\"false\" type=\"success\" class=\"text-center\">\r\n          <i>Looking for a designer to help shape the games visual identity, if you're interested please contact me at <a href=\"mailto:hello@klemensas.net?Subject=Designer\">hello@klemensas.net</a></i>\r\n        </ngb-alert>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"development pt-5\">\r\n    <h2>Roadmap</h2>\r\n    <div class=\"row\">\r\n      <div class=\"col-12\">\r\n        <p>Generally each stage consists of base feature implementation, play test and changes according to feedback. After a full cycle work starts on another stages features. Once they are ready the world is completely reset to a clean state and the play testing for the next stage starts. While work goes on between stages the world is still kept in tact and players can continue playing.</p>\r\n        <p>The current alpha stage will be the most unstable one. This stage only consists of various base features and will be go through a lot of changes including game theme, design, naming revamp. Some features are already planned but various details are still undecided so you can contribute and impact growth of the game. You can contribute your ideas for possible features or just drop in to say hello, everything is appreciated.</p>\r\n      </div>\r\n      <div class=\"col-12 roadmap mt-3\">\r\n        <mat-expansion-panel expanded class=\"roadmap-current\">\r\n          <mat-expansion-panel-header>\r\n            <mat-panel-title>Alpha</mat-panel-title>\r\n            <mat-panel-description>in progress</mat-panel-description>\r\n          </mat-expansion-panel-header>\r\n          <div>\r\n            <mat-expansion-panel class=\"roadmap-complete\">\r\n              <mat-expansion-panel-header>\r\n                <mat-panel-title>Alpha features</mat-panel-title>\r\n                <mat-panel-description>complete</mat-panel-description>\r\n              </mat-expansion-panel-header>\r\n              <mat-list>\r\n                <mat-list-item>Basic interface</mat-list-item>\r\n                <mat-list-item>Town management</mat-list-item>\r\n                <mat-list-item>Unit recruitment</mat-list-item>\r\n                <mat-list-item>Dynamic map</mat-list-item>\r\n                <mat-list-item>Supporting and attacking</mat-list-item>\r\n                <mat-list-item>Abandoned town creation and growth</mat-list-item>\r\n                <mat-list-item>Unit commands</mat-list-item>\r\n                <mat-list-item>Combat reports</mat-list-item>\r\n                <mat-list-item>Alliances and management</mat-list-item>\r\n                <mat-list-item>Alliance chat</mat-list-item>\r\n                <mat-list-item>Alliance diplomacy</mat-list-item>\r\n                <mat-list-item>Rankings</mat-list-item>\r\n              </mat-list>\r\n                </mat-expansion-panel>\r\n            <mat-expansion-panel expanded class=\"roadmap-current\">\r\n              <mat-expansion-panel-header>\r\n                <mat-panel-title>Alpha play test</mat-panel-title>\r\n                <mat-panel-description>in progress</mat-panel-description>\r\n              </mat-expansion-panel-header>\r\n              <div>\r\n                <p>Currently the play test is ongoing. It's planned to go on for at least a few months before continuing.</p>\r\n              </div>\r\n            </mat-expansion-panel>\r\n            <mat-expansion-panel class=\"roadmap-upcoming\">\r\n              <mat-expansion-panel-header>\r\n                <mat-panel-title>Alpha feedback</mat-panel-title>\r\n                <mat-panel-description>upcoming</mat-panel-description>\r\n              </mat-expansion-panel-header>\r\n              <div>\r\n                <p><b>No feedback yet</b></p>\r\n                <p>Here will be listed various improvements made from player feedback</p>\r\n              </div>\r\n            </mat-expansion-panel>\r\n          </div>\r\n        </mat-expansion-panel>\r\n        <mat-expansion-panel class=\"roadmap-future\">\r\n          <mat-expansion-panel-header>\r\n            <mat-panel-title>Beta</mat-panel-title>\r\n            <mat-panel-description>planned</mat-panel-description>\r\n          </mat-expansion-panel-header>\r\n          <div>\r\n            <mat-expansion-panel expanded class=\"roadmap-future\">\r\n              <mat-expansion-panel-header>\r\n                <mat-panel-title>Beta features</mat-panel-title>\r\n                <mat-panel-description>planned</mat-panel-description>\r\n              </mat-expansion-panel-header>\r\n              <mat-list>\r\n                <mat-list-item><b>Apply a game theme</b></mat-list-item>\r\n                <mat-list-item><b>Create and implement a custom design</b></mat-list-item>\r\n                <mat-list-item>Reconsider unit resource</mat-list-item>\r\n                <mat-list-item>More caching</mat-list-item>\r\n                <mat-list-item>Minimap</mat-list-item>\r\n                <mat-list-item>Trading</mat-list-item>\r\n                <mat-list-item>Map districts</mat-list-item>\r\n                <mat-list-item>More statistics, rankings</mat-list-item>\r\n                <mat-list-item>Game events</mat-list-item>\r\n                <mat-list-item>Introduce alternative expansion method</mat-list-item>\r\n                <mat-list-item>Game administration, moderation</mat-list-item>\r\n              </mat-list>\r\n                </mat-expansion-panel>\r\n          </div>\r\n        </mat-expansion-panel>\r\n        <mat-expansion-panel class=\"roadmap-future\">\r\n          <mat-expansion-panel-header>\r\n            <mat-panel-title>Release candidate</mat-panel-title>\r\n            <mat-panel-description>planned</mat-panel-description>\r\n          </mat-expansion-panel-header>\r\n          <div>Not detailed yet</div>\r\n        </mat-expansion-panel>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".roadmap > mat-expansion-panel > mat-expansion-panel-header {\n  text-transform: uppercase; }\n  .roadmap > mat-expansion-panel > mat-expansion-panel-header mat-panel-title {\n    font-size: 1.3rem; }\n  .roadmap mat-expansion-panel mat-expansion-panel {\n  margin: 0 -24px; }\n  .roadmap mat-panel-title {\n  font-weight: 700;\n  font-size: 1.1rem; }\n  .roadmap mat-panel-description {\n  flex-grow: 0;\n  text-transform: uppercase;\n  font-size: 0.7rem;\n  font-weight: 700; }\n  .roadmap /deep/ .mat-content {\n  align-items: center; }\n  .roadmap .roadmap-complete {\n  color: white;\n  background-color: var(--green); }\n  .roadmap .roadmap-complete mat-panel-title,\n  .roadmap .roadmap-complete mat-list-item {\n    color: white; }\n  .roadmap .roadmap-upcoming {\n  background-color: var(--yellow); }\n  .roadmap .roadmap-future {\n  color: white;\n  background-color: var(--orange); }\n  .roadmap .roadmap-future mat-panel-title,\n  .roadmap .roadmap-future mat-list-item {\n    color: white; }\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/auth.actions */ "./src/app/auth/auth.actions.ts");
/* harmony import */ var _auth_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth/reducers */ "./src/app/auth/reducers.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers */ "./src/app/reducers.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, store) {
        this.authService = authService;
        this.store = store;
        this.worlds$ = this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_5__["getWorlds"]);
        this.worldError$ = this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_5__["getWorldError"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (error) { return !!error; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (error) { return 'Could not connect to the server.'; }));
        this.isCollapsed = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubscription$ = this.store.select(_auth_reducers__WEBPACK_IMPORTED_MODULE_4__["getUser"]).subscribe(function (user) {
            _this.user = user;
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.userSubscription$.unsubscribe();
    };
    HomeComponent.prototype.userOnWorld = function (world) {
        return this.user.UserWorlds.find(function (w) { return w.id === world.id; });
    };
    HomeComponent.prototype.logout = function () {
        this.store.dispatch(new _auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__["Logout"]());
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")],
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"], _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/home/index.ts":
/*!*******************************!*\
  !*** ./src/app/home/index.ts ***!
  \*******************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ "./src/app/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]; });




/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! exports provided: AppComponent, tokenGetter, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]; });

/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return _app_module__WEBPACK_IMPORTED_MODULE_1__["tokenGetter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]; });





/***/ }),

/***/ "./src/app/reducers.ts":
/*!*****************************!*\
  !*** ./src/app/reducers.ts ***!
  \*****************************/
/*! exports provided: reducers, logger, reset, metaReducers, getWorldState, getWorlds, getWorldError, getActiveWorld */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaReducers", function() { return metaReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorldState", function() { return getWorldState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorlds", function() { return getWorlds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorldError", function() { return getWorldError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveWorld", function() { return getActiveWorld; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _world_world_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./world/world.reducer */ "./src/app/world/world.reducer.ts");
/* harmony import */ var _auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth.actions */ "./src/app/auth/auth.actions.ts");




var reducers = {
    world: _world_world_reducer__WEBPACK_IMPORTED_MODULE_2__["reducer"]
};
function logger(reducer) {
    return function (state, action) {
        console.debug('state', state);
        console.debug('action', action);
        return reducer(state, action);
    };
}
function reset(reducer) {
    return function (state, action) {
        if (action.type === _auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__["AuthActionTypes"].Logout) {
            state = { world: state.world };
        }
        return reducer(state, action);
    };
}
// TODO: Observable.timer causes freeze to throw
var metaReducers = !_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production ? [logger, reset,] : [];
var getWorldState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])('world');
var getWorlds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(getWorldState, _world_world_reducer__WEBPACK_IMPORTED_MODULE_2__["getWorlds"]);
var getWorldError = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(getWorldState, _world_world_reducer__WEBPACK_IMPORTED_MODULE_2__["getWorldError"]);
var getActiveWorld = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(getWorldState, _world_world_reducer__WEBPACK_IMPORTED_MODULE_2__["getActiveWorld"]);


/***/ }),

/***/ "./src/app/report-error/report-dialog/report-dialog.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/report-error/report-dialog/report-dialog.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Give feedback</h1>\r\n<mat-dialog-content>\r\n  <p>\r\n    Here you can give feedback or report bugs, please select the corresponding category.<br>\r\n    Your feedback is appreciated.\r\n  </p>\r\n  <div>\r\n    <mat-form-field>\r\n      <mat-select [(value)]=\"category\" placeholder=\"Category\">\r\n        <mat-option *ngFor=\"let category of categories\" [value]=\"category\">\r\n          {{category}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <div class=\"mb-2\">\r\n      <mat-slide-toggle color=\"primary\" [(checked)]=\"canContact\">Contact me for further discussion via registered email</mat-slide-toggle>\r\n    </div>\r\n    <mat-form-field [(ngModel)]=\"description\" ngDefaultControl style=\"width: 100%;\">\r\n      <textarea [ngModel]=\"description\" matInput placeholder=\"Description\" matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\"></textarea>\r\n    </mat-form-field>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions>\r\n  <button mat-raised-button color=\"primary\" [disabled]=\"!description || !category\" (click)=\"sendReport()\">Send</button>\r\n  <button mat-raised-button color=\"warn\" mat-dialog-close class=\"float-right\">Cancel</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "./src/app/report-error/report-dialog/report-dialog.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/report-error/report-dialog/report-dialog.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/report-error/report-dialog/report-dialog.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/report-error/report-dialog/report-dialog.component.ts ***!
  \***********************************************************************/
/*! exports provided: ReportDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportDialogComponent", function() { return ReportDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rollbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../rollbar */ "./src/app/rollbar.ts");
/* harmony import */ var _node_modules_angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReportDialogComponent = /** @class */ (function () {
    function ReportDialogComponent(rollbarService, snackBar, dialogRef) {
        this.rollbarService = rollbarService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.categories = [
            'bug',
            'feedback',
            'suggestion',
            'other',
        ];
        this.category = '';
        this.description = '';
        this.canContact = true;
    }
    ReportDialogComponent.prototype.sendReport = function () {
        var _this = this;
        this.rollbarService.rollbar.info({
            category: this.category,
            description: this.description,
            canContact: this.canContact,
        }, function () { return _this.reportSent(); });
    };
    ReportDialogComponent.prototype.reportSent = function () {
        this.dialogRef.close();
        this.snackBar.open('Report submitted successfully', null, { panelClass: ['snackbar-event', 'snackbar-success'], duration: 1800 });
    };
    ReportDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'report-dialog',
            template: __webpack_require__(/*! ./report-dialog.component.html */ "./src/app/report-error/report-dialog/report-dialog.component.html"),
            styles: [__webpack_require__(/*! ./report-dialog.component.scss */ "./src/app/report-error/report-dialog/report-dialog.component.scss")]
        }),
        __metadata("design:paramtypes", [_rollbar__WEBPACK_IMPORTED_MODULE_1__["RollbarService"], _node_modules_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"], _node_modules_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], ReportDialogComponent);
    return ReportDialogComponent;
}());



/***/ }),

/***/ "./src/app/report-error/report-error.component.html":
/*!**********************************************************!*\
  !*** ./src/app/report-error/report-error.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button mat-mini-fab mat-accent (click)=\"openDialog()\">\r\n  <fa-icon [icon]=\"['fas', 'bug']\"></fa-icon>\r\n</button>\r\n"

/***/ }),

/***/ "./src/app/report-error/report-error.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/report-error/report-error.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: fixed;\n  right: 20px;\n  bottom: 90px;\n  z-index: 1;\n  border-radius: 50%; }\n  :host button {\n    width: 56px;\n    height: 56px;\n    outline: 0; }\n"

/***/ }),

/***/ "./src/app/report-error/report-error.component.ts":
/*!********************************************************!*\
  !*** ./src/app/report-error/report-error.component.ts ***!
  \********************************************************/
/*! exports provided: ReportErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportErrorComponent", function() { return ReportErrorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _report_dialog_report_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./report-dialog/report-dialog.component */ "./src/app/report-error/report-dialog/report-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportErrorComponent = /** @class */ (function () {
    function ReportErrorComponent(dialog) {
        this.dialog = dialog;
    }
    ReportErrorComponent.prototype.ngOnInit = function () {
        _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faBug"]);
    };
    ReportErrorComponent.prototype.openDialog = function () {
        var _this = this;
        this.reportDialog = this.dialog.open(_report_dialog_report_dialog_component__WEBPACK_IMPORTED_MODULE_4__["ReportDialogComponent"], { maxWidth: 500 });
        this.reportDialog.afterClosed().subscribe(function (result) {
            _this.reportDialog = null;
        });
    };
    ReportErrorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'report-error',
            template: __webpack_require__(/*! ./report-error.component.html */ "./src/app/report-error/report-error.component.html"),
            styles: [__webpack_require__(/*! ./report-error.component.scss */ "./src/app/report-error/report-error.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], ReportErrorComponent);
    return ReportErrorComponent;
}());



/***/ }),

/***/ "./src/app/rollbar.ts":
/*!****************************!*\
  !*** ./src/app/rollbar.ts ***!
  \****************************/
/*! exports provided: RollbarService, RollbarErrorHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollbarService", function() { return RollbarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollbarErrorHandler", function() { return RollbarErrorHandler; });
/* harmony import */ var rollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rollbar */ "./node_modules/rollbar/dist/rollbar.umd.min.js");
/* harmony import */ var rollbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rollbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _auth_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/reducers */ "./src/app/auth/reducers.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var rollbarConfig = {
    accessToken: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].rollbarToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production ? 'production' : 'development',
};
var RollbarService = /** @class */ (function () {
    function RollbarService(rollbar, store) {
        var _this = this;
        this.rollbar = rollbar;
        this.store = store;
        this.personSubscription = this.store.select(_auth_reducers__WEBPACK_IMPORTED_MODULE_4__["getUser"]).subscribe(function (user) {
            var person = user ? __assign({}, user, { username: user.name }) : null;
            _this.rollbar.configure({
                payload: {
                    person: person,
                }
            });
        });
    }
    RollbarService_1 = RollbarService;
    RollbarService.factory = function (store) {
        if (!rollbarConfig.accessToken) {
            throw new Error('Missing rollbar token');
        }
        return new RollbarService_1(new rollbar__WEBPACK_IMPORTED_MODULE_0__(rollbarConfig), store);
    };
    RollbarService.provider = function () {
        return {
            provide: RollbarService_1,
            deps: [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]],
            useFactory: RollbarService_1.factory
        };
    };
    RollbarService = RollbarService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [rollbar__WEBPACK_IMPORTED_MODULE_0__, _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], RollbarService);
    return RollbarService;
    var RollbarService_1;
}());

var RollbarErrorHandler = /** @class */ (function () {
    function RollbarErrorHandler(injector) {
        this.injector = injector;
    }
    RollbarErrorHandler.prototype.handleError = function (err) {
        var rollbarService = this.injector.get(RollbarService);
        rollbarService.rollbar.error(err.originalError || err);
    };
    RollbarErrorHandler = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], RollbarErrorHandler);
    return RollbarErrorHandler;
}());



/***/ }),

/***/ "./src/app/services/game-data.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/game-data.service.ts ***!
  \***********************************************/
/*! exports provided: GameDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameDataService", function() { return GameDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GameDataService = /** @class */ (function () {
    function GameDataService(http) {
        this.http = http;
    }
    GameDataService.prototype.getActiveWorlds = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].server.api + "world");
    };
    GameDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], GameDataService);
    return GameDataService;
}());



/***/ }),

/***/ "./src/app/world/world.actions.ts":
/*!****************************************!*\
  !*** ./src/app/world/world.actions.ts ***!
  \****************************************/
/*! exports provided: WorldActionTypes, Load, Loadsuccess, LoadFail, SelectWorld */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldActionTypes", function() { return WorldActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Load", function() { return Load; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loadsuccess", function() { return Loadsuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadFail", function() { return LoadFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectWorld", function() { return SelectWorld; });
var WorldActionTypes;
(function (WorldActionTypes) {
    WorldActionTypes["Load"] = "[World] Load";
    WorldActionTypes["Loadsuccess"] = "[World] Load Success";
    WorldActionTypes["LoadFail"] = "[World] Load Fail";
    WorldActionTypes["SelectWorld"] = "[World] Select World";
})(WorldActionTypes || (WorldActionTypes = {}));
var Load = /** @class */ (function () {
    function Load() {
        this.type = WorldActionTypes.Load;
    }
    return Load;
}());

var Loadsuccess = /** @class */ (function () {
    function Loadsuccess(payload) {
        this.payload = payload;
        this.type = WorldActionTypes.Loadsuccess;
    }
    return Loadsuccess;
}());

var LoadFail = /** @class */ (function () {
    function LoadFail(payload) {
        this.payload = payload;
        this.type = WorldActionTypes.LoadFail;
    }
    return LoadFail;
}());

var SelectWorld = /** @class */ (function () {
    function SelectWorld(payload) {
        this.payload = payload;
        this.type = WorldActionTypes.SelectWorld;
    }
    return SelectWorld;
}());



/***/ }),

/***/ "./src/app/world/world.effects.ts":
/*!****************************************!*\
  !*** ./src/app/world/world.effects.ts ***!
  \****************************************/
/*! exports provided: WorldEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldEffects", function() { return WorldEffects; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _world_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./world.actions */ "./src/app/world/world.actions.ts");
/* harmony import */ var _services_game_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/game-data.service */ "./src/app/services/game-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WorldEffects = /** @class */ (function () {
    function WorldEffects(actions$, dataService, router, store) {
        var _this = this;
        this.actions$ = actions$;
        this.dataService = dataService;
        this.router = router;
        this.store = store;
        this.load$ = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_world_actions__WEBPACK_IMPORTED_MODULE_6__["WorldActionTypes"].Load), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function () {
            return _this.dataService.getActiveWorlds().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) { return new _world_actions__WEBPACK_IMPORTED_MODULE_6__["Loadsuccess"](data); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _world_actions__WEBPACK_IMPORTED_MODULE_6__["LoadFail"](error)); }));
        }));
        this.initLoad$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["defer"])(function () {
            return _this.store.dispatch(new _world_actions__WEBPACK_IMPORTED_MODULE_6__["Load"]());
        });
    }
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], WorldEffects.prototype, "load$", void 0);
    __decorate([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])({ dispatch: false }),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], WorldEffects.prototype, "initLoad$", void 0);
    WorldEffects = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Actions"],
            _services_game_data_service__WEBPACK_IMPORTED_MODULE_7__["GameDataService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"]])
    ], WorldEffects);
    return WorldEffects;
}());



/***/ }),

/***/ "./src/app/world/world.reducer.ts":
/*!****************************************!*\
  !*** ./src/app/world/world.reducer.ts ***!
  \****************************************/
/*! exports provided: initialState, reducer, getWorlds, getWorldError, getActiveWorld */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorlds", function() { return getWorlds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorldError", function() { return getWorldError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveWorld", function() { return getActiveWorld; });
/* harmony import */ var _world_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world.actions */ "./src/app/world/world.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var initialState = {
    worlds: [],
    activeWorld: null,
    error: null,
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _world_actions__WEBPACK_IMPORTED_MODULE_0__["WorldActionTypes"].Loadsuccess:
            return __assign({}, state, { worlds: state.worlds.concat(action.payload) });
        case _world_actions__WEBPACK_IMPORTED_MODULE_0__["WorldActionTypes"].SelectWorld:
            return __assign({}, state, { activeWorld: action.payload });
        case _world_actions__WEBPACK_IMPORTED_MODULE_0__["WorldActionTypes"].LoadFail:
            return __assign({}, state, { error: action.payload });
        case _world_actions__WEBPACK_IMPORTED_MODULE_0__["WorldActionTypes"].Load:
        default: {
            return state;
        }
    }
}
var getWorlds = function (state) { return state.worlds; };
var getWorldError = function (state) { return state.error; };
var getActiveWorld = function (state) { return state.worlds.find(function (_a) {
    var world = _a.world;
    return world.name === state.activeWorld;
}); };


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    rollbarToken: 'a11b482162fc4f729661b4549b943a0f',
    rankingUpdateFrequency: 600000,
    server: {
        base: 'http://localhost:9000',
        api: 'http://localhost:9000/api/',
        auth: 'http://localhost:9000/auth/'
    }
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/ */ "./src/app/index.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__["platformBrowserDynamic"])().bootstrapModule(_app___WEBPACK_IMPORTED_MODULE_3__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\X\strat-ego-client\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map