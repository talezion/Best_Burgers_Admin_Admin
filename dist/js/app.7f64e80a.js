(function(e){function t(t){for(var a,r,o=t[0],l=t[1],c=t[2],d=0,g=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&g.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);u&&u(t);while(g.length)g.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],a=!0,o=1;o<s.length;o++){var l=s[o];0!==i[l]&&(a=!1)}a&&(n.splice(t--,1),e=r(r.s=s[0]))}return e}var a={},i={app:0},n=[];function r(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=a,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(s,a,function(t){return e[t]}.bind(null,a));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"105a":function(e,t,s){"use strict";var a=s("4f9a"),i=s.n(a);i.a},"13e9":function(e,t,s){"use strict";var a=s("ed21"),i=s.n(a);i.a},"4f9a":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("f751"),s("097d");var a=s("2b0e"),i=s("5f5b"),n=s("8aa5"),r=s.n(n),o={apiKey:"AIzaSyA_n8zAZIEIxbegQpaDRcPuM3BaXm1Apr4",authDomain:"burgers-best-stage.firebaseapp.com",databaseURL:"https://burgers-best-stage.firebaseio.com",projectId:"burgers-best-stage",storageBucket:"burgers-best-stage.appspot.com",messagingSenderId:"1089706900218",appId:"1:1089706900218:web:eeda4bc080b7ea5f"},l=r.a.initializeApp(o),c=l.database(),u=c.ref("burgers"),d=c.ref("images_container"),g=c.ref("images_approved"),h=c.ref("images_rejected"),m=c.ref("images"),p=c.ref("users"),f=s("0ff2"),v=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("router-view")},_=[],b=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row text-center",staticStyle:{"margin-top":"10%"}},[s("div",{staticClass:"col-md-4"}),s("div",{staticClass:"col-md-4 col-sm-12 align-self-center"},[s("h3",{staticClass:"mb-5"},[e._v("Best Burgers Admin Login")]),s("form",{on:{submit:e.loginClicked}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Email",required:""},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Password",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),s("input",{staticClass:"btn btn-primary btn-block",attrs:{type:"submit",value:"Login"}})])]),e.showAnimation?s("div",{staticClass:"col-md-12"},[s("br"),s("LoadingAnimation")],1):e._e()])])},y=[],w=(s("ac6a"),function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),k=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"lds-roller"},[s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div")])}],A={name:"LoadingAnimation"},C=A,x=(s("105a"),s("2877")),I=Object(x["a"])(C,w,k,!1,null,"bb8f76da",null),P=I.exports,j={name:"Login",components:{LoadingAnimation:P},data:function(){return{email:"",password:"",showAnimation:!1}},methods:{loginClicked:function(e){var t=this;e.preventDefault();this.showAnimation=!0,r.a.auth().signInWithEmailAndPassword(this.email,this.password).then(function(e){p.orderByChild("email").equalTo(e.user.email).on("value",function(e){e.forEach(function(e){e.val().role?t.$router.push("home"):(r.a.auth().signOut().then(function(){}),alert("You are not an Admin!"))})});t.showAnimation=!1},function(e){alert(e.message),t.showAnimation=!1})}}},S=j,E=Object(x["a"])(S,b,y,!1,null,null,null),T=E.exports,O={components:{Login:T}},B=O,M=Object(x["a"])(B,v,_,!1,null,null,null),D=M.exports,L=s("8c4f"),$=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("Navbar"),s("div",{staticClass:"container"},[s("CategoryTabs")],1)],1)},F=[],N=(s("a481"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"primary"}},[s("b-navbar-brand",{attrs:{href:"#"}},[e._v("Best Burgers")]),s("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),s("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[s("b-navbar-nav",{staticClass:"ml-auto"},[s("button",{staticClass:"btn text-light",attrs:{type:"button"},on:{click:e.signoutClicked}},[e._v("Logout")])])],1)],1)}),q=[],R=s("d0b9"),K={components:{"b-nav":R["a"]},methods:{signoutClicked:function(){var e=this;r.a.auth().signOut().then(function(){e.$router.replace("login")})}}},U=K,z=Object(x["a"])(U,N,q,!1,null,null,null),Y=z.exports,J=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"mt-3"},[s("b-tabs",{attrs:{"content-class":"mt-3"}},[s("div",{staticClass:"col-md-12"},[e.showProcessing?s("LoadingAnimation"):e._e(),e.showAlert?s("Alert",{attrs:{type:e.alertType},on:{countDownEnded:e.hideAlert}},[e._v(e._s(e.alertMessage))]):e._e()],1),s("b-tab",{attrs:{title:"Burger Thumbnail Setting",active:""}},[s("div",{staticClass:"row"},e._l(e.approved_images,function(t,a){return s("div",{key:a,staticClass:"col-md-3 text-center mb-4"},[s("p",[e._v(e._s(e.getPlaceName(t[".key"])))]),s("Carousel",{attrs:{image_key:t[".key"],type:"thumbnail"}})],1)}),0)]),s("b-tab",{attrs:{title:"Burger Images Validation"}},[e.container.length>0?s("div",{staticClass:"row"},e._l(e.container,function(t,a){return s("div",{key:a,staticClass:"col-md-3 text-center mb-4"},[s("p",[e._v(e._s(e.getPlaceName(t[".key"])))]),s("Carousel",{attrs:{image_key:t[".key"],type:"images"}})],1)}),0):e._e()]),s("b-tab",{attrs:{title:"Burger Place Validation"}},[s("div",{staticClass:"row"},e._l(e.places,function(t,a){return s("div",{key:a,staticClass:"col-md-3 text-center mb-4"},[s("div",{staticClass:"image"},[t.highlight_image?s("img",{staticClass:"img img-responsive full-width",attrs:{src:t.highlight_image.url}}):s("img",{staticClass:"img img-responsive full-width",attrs:{src:"favicon.png"}})]),s("p",[e._v(e._s(t.burger_name))]),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn btn-primary flex-fill",on:{click:function(s){return e.approveClicked(t)}}},[e._v("Approve")]),s("button",{staticClass:"btn btn-danger flex-fill",on:{click:function(s){return e.rejectClicked(t)}}},[e._v("Reject")])]),t.google_url?s("a",{staticClass:"btn btn-success mt-2 btn-block",attrs:{href:t.google_url,target:"_blank"}},[e._v("See on Maps")]):e._e()])}),0)])],1)],1)},V=[],Q=function(){var e=this,t=e.$createElement,s=e._self._c||t;return"thumbnail"==e.type&&e.images.length>0?s("div",[e.showProcessing?s("LoadingAnimation"):e._e(),e.showAlert?s("Alert",{attrs:{type:e.alertType},on:{countDownEnded:e.hideAlert}},[e._v(e._s(e.alertMessage))]):e._e(),s("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",interval:0,controls:"",indicators:"",background:"#ababab"},on:{"sliding-start":e.onSlideStart,"sliding-end":e.onSlideEnd},model:{value:e.slide,callback:function(t){e.slide=t},expression:"slide"}},e._l(e.approved_images_container,function(t,a){return s("b-carousel-slide",{key:a,staticClass:"image"},[t?s("img",{staticClass:"img img-responsive full-width",attrs:{slot:"img",src:e.getImageUrl(a),alt:"image slot"},slot:"img"}):e._e(),e.burger_place.highlight_image&&e.burger_place.highlight_image.url==e.getImageUrl(a)?s("p",[e._v("\n        Thumbnail\n      ")]):e.burger_place.highlight_image?e._e():s("p",[e._v("\n        No Thumbnail\n      ")])])}),1),s("br"),s("button",{staticClass:"btn btn-primary btn-block",on:{click:e.setClicked}},[e._v("Set")])],1):"images"==e.type&&e.images.length>0?s("div",[e.showProcessingImage?s("LoadingAnimation"):e._e(),e.showAlertImage?s("Alert",{attrs:{type:e.alertType},on:{countDownEnded:e.hideAlert}},[e._v(e._s(e.alertMessage))]):e._e(),s("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",interval:0,controls:"",indicators:"",background:"#ababab"},on:{"sliding-start":e.onSlideStart,"sliding-end":e.onSlideEnd},model:{value:e.slide,callback:function(t){e.slide=t},expression:"slide"}},e._l(e.approved_images_container,function(t,a){return s("b-carousel-slide",{key:a,staticClass:"image"},[t?s("img",{staticClass:"img img-responsive full-width",attrs:{slot:"img",src:e.getImageUrl(a),alt:"image slot"},slot:"img"}):e._e()])}),1),s("br"),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn btn-primary flex-fill",on:{click:e.approveClicked}},[e._v("\n      Approve\n    ")]),s("button",{staticClass:"btn btn-danger flex-fill",on:{click:e.rejectClicked}},[e._v("\n      Reject\n    ")])])],1):e._e()},W=[],X=(s("456d"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("b-alert",{attrs:{show:e.dismissCountDown,dismissible:"",fade:"",variant:e.type},on:{"dismiss-count-down":e.countDownChanged}},[e._t("default")],2)}),Z=[],G={props:["type"],data:function(){return{dismissCountDown:3,showDismissibleAlert:!1,dismissSecs:3}},methods:{countDownChanged:function(e){this.dismissCountDown=e,0==this.dismissCountDown&&this.$emit("countDownEnded")}}},H=G,ee=Object(x["a"])(H,X,Z,!1,null,null,null),te=ee.exports,se={name:"carousel",props:["image_key","type"],components:{LoadingAnimation:P,Alert:te},data:function(){return{slide:0,sliding:null,images:[],approved_images_ids:[],current_images:[],approved_images_container:[],container_images:[],approved_images_container_keys:[],rejected_images:[],burger_place:{},showProcessing:!1,showAlert:!1,alertMessage:"",alertType:"",showProcessingImage:!1,showAlertImage:!1}},firebase:{approved_images_ids:g.orderByKey(),images:m.orderByKey(),rejected_images:h.orderByKey(),container_images:d.orderByKey()},methods:{hideAlert:function(){this.showAlert=!1,this.showAlertImage=!1,this.alertMessage=""},onSlideStart:function(e){this.sliding=!0},onSlideEnd:function(e){this.sliding=!1},getImageUrl:function(e){for(var t=-1,s=0;s<this.images.length;s++)if(this.images[s][".key"]==e){t=s;break}return this.images[t].url},approveClicked:function(){var e=this;if(this.showProcessingImage=!0,this.approved_images_container_keys.length>1){var t=this.getSelectedImageIndex();if(-1==this.checkIfApprovedExist()){var s={};s[this.images[t][".key"]]=1,g.child(this.image_key).set(s,function(t){e.showAlertForImages(t)})}else{var a=[];this.approved_images_ids.forEach(function(t){t[".key"]==e.image_key&&(a=t)}),a[this.images[t][".key"]]=1,g.child(this.image_key).set(a,function(t){e.showAlertForImages(t)})}d.child(this.image_key).child(this.images[t][".key"]).remove(),this.getAllData()}else{var i={message:"You can not Approve or Reject image!"};this.showAlertForImages(i)}},rejectClicked:function(){var e=this;if(this.showProcessingImage=!0,this.approved_images_container_keys.length>1){var t=this.getSelectedImageIndex();if(-1==this.checkIfRejectedExist()){var s={};s[this.images[t][".key"]]=1,h.child(this.image_key).set(s,function(t){e.showAlertForImages(t,"Image rejected successfully")})}else{var a=[];this.rejected_images.forEach(function(t){t[".key"]==e.image_key&&(a=t)}),a[this.images[t][".key"]]=1,h.child(this.image_key).set(a,function(t){e.showAlertForImages(t)})}d.child(this.image_key).child(this.images[t][".key"]).remove(),this.getAllData()}else{var i={message:"You can not Approve or Reject image!"};this.showAlertForImages(i)}},setClicked:function(){var e=this;this.showProcessing=!0;var t=this.getSelectedImageIndex();u.child(this.image_key).update({highlight_image:this.images[t]},function(t){e.showAlertForThumbnail(t)})},checkIfApprovedExist:function(){for(var e=-1,t=0;t<this.approved_images_ids.length;t++)if(this.approved_images_ids[t][".key"]==this.image_key){e=t;break}return e},checkIfRejectedExist:function(){for(var e=-1,t=0;t<this.rejected_images.length;t++)if(this.rejected_images[t][".key"]==this.image_key){e=t;break}return e},getSelectedImageIndex:function(){for(var e=-1,t=this.approved_images_container_keys[this.slide],s=0;s<this.images.length;s++)if(this.images[s][".key"]==t){e=s;break}return e},showAlertForImages:function(e,t){e?(this.showProcessingImage=!1,this.alertMessage=e.message,this.alertType="danger",this.showAlertImage=!0):(this.showProcessingImage=!1,t&&(this.alertMessage=t),this.alertType="primary",this.showAlertImage=!0)},showAlertForThumbnail:function(e){e?(this.showProcessing=!1,this.alertMessage=e.message,this.alertType="danger",this.showAlert=!0):(this.showProcessing=!1,this.alertMessage="Thumbnail Set successfully",this.alertType="primary",this.showAlert=!0)},getAllData:function(){var e=this;this.getBurgerPlace(),"thumbnail"==this.type?this.approved_images_ids.forEach(function(t){t[".key"]==e.image_key&&(e.approved_images_container=t,e.approved_images_container_keys=Object.keys(e.approved_images_container))}):this.container_images.forEach(function(t){t[".key"]==e.image_key&&(e.approved_images_container=t,e.approved_images_container_keys=Object.keys(e.approved_images_container))})},getBurgerPlace:function(){var e=this;u.orderByKey().equalTo(this.image_key).on("value",function(t){t.forEach(function(t){e.burger_place=t.val()})})}},mounted:function(){this.getAllData()}},ae=se,ie=(s("13e9"),Object(x["a"])(ae,Q,W,!1,null,"7522fe3c",null)),ne=ie.exports,re={name:"CategoryTabs",components:{Carousel:ne,LoadingAnimation:P,Alert:te},firebase:{places:u.orderByChild("was_reviewed").equalTo(!1),allPlaces:u.orderByKey(),approved_places:u.orderByChild("is_validated").equalTo(!0),approved_images:g,rejected:h,images:m,container:d},data:function(){return{places:[],images:[],approved:[],rejected:[],thumbnails:[],approved_places:[],approved_images:[],slide:0,sliding:null,container:[],allPlaces:[],alertMessage:"",showAlert:!1,showProcessing:!1,alertType:""}},methods:{hideAlert:function(){this.showAlert=!1,this.alertMessage=""},getPlaceName:function(e){for(var t=-1,s=0;s<this.allPlaces.length;s++)if(this.allPlaces[s][".key"]==e){t=s;break}return this.allPlaces[t].burger_name},onSlideStart:function(e){this.sliding=!0},onSlideEnd:function(e){this.sliding=!1},approveClicked:function(e){var t=this;this.showProcessing=!0,u.child(e[".key"]).update({was_reviewed:!0,is_validated:!0},function(e){t.showPlaceAlert(e,"Approved successfully")})},rejectClicked:function(e){var t=this;this.showProcessing=!0,u.child(e[".key"]).update({was_reviewed:!0,is_validated:!1},function(e){t.showPlaceAlert(e,"Rejected successfully")})},showPlaceAlert:function(e,t){e?(this.showProcessing=!1,this.alertMessage=e.message,this.alertType="danger",this.showAlert=!0):(this.showProcessing=!1,this.alertMessage=t,this.alertType="success",this.showAlert=!0)}}},oe=re,le=(s("644b"),Object(x["a"])(oe,J,V,!1,null,"2e04d7fa",null)),ce=le.exports,ue={name:"home",components:{Navbar:Y,CategoryTabs:ce},data:function(){return{}},methods:{signoutClicked:function(){var e=this;r.a.auth().signOut().then(function(){e.$router.replace("login")})}}},de=ue,ge=Object(x["a"])(de,$,F,!1,null,null,null),he=ge.exports;a["default"].use(L["a"]);var me=new L["a"]({mode:"history",base:"/",routes:[{path:"*",component:T},{path:"/",component:T},{path:"/login",name:"login",component:T},{path:"/home",name:"home",component:he,meta:{requeriesAuth:!0}}]});me.beforeEach(function(e,t,s){var a=r.a.auth().currentUser,i=e.matched.some(function(e){return e.meta.requeriesAuth});i&&!a?s("login"):!i&&a?s("home"):s()});var pe=me,fe=s("2f62");a["default"].use(fe["a"]);var ve=new fe["a"].Store({state:{},mutations:{},actions:{}}),_e=s("9483");Object(_e["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});s("f9e3"),s("2dd8");a["default"].config.productionTip=!1;var be="";a["default"].use(i["a"]),a["default"].use(f["a"]),r.a.auth().onAuthStateChanged(function(){be||(be=new a["default"]({router:pe,store:ve,render:function(e){return e(D)}}).$mount("#app"))})},"644b":function(e,t,s){"use strict";var a=s("d236"),i=s.n(a);i.a},d236:function(e,t,s){},ed21:function(e,t,s){}});
//# sourceMappingURL=app.7f64e80a.js.map