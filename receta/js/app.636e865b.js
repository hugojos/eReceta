(function(t){function e(e){for(var a,s,n=e[0],c=e[1],l=e[2],d=0,m=[];d<n.length;d++)s=n[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&m.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(m.length)m.shift()();return i.push.apply(i,l||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],a=!0,n=1;n<o.length;n++){var c=o[n];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=o[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var o=a[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=a,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(o,a,function(e){return t[e]}.bind(null,a));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],c=n.push.bind(n);n.push=e,n=n.slice();for(var l=0;l<n.length;l++)e(n[l]);var u=c;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"005b":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",{staticClass:"text-white d-flex align-items-center justify-content-center position-relative"},["Cupon"==t.$route.name?o("font-awesome-icon",{staticClass:"h5 m-0 position-absolute",staticStyle:{left:"20px"},attrs:{icon:"arrow-circle-left",title:"Atras"},on:{click:function(e){return t.$router.back()}}}):t._e(),o("h1",{staticClass:"h5 m-0"},[t._v(t._s(this.$route.meta.title))]),"Login"!=t.$route.name&&"Register"!=t.$route.name?o("font-awesome-icon",{staticClass:"h4 m-0 position-absolute",staticStyle:{right:"20px"},attrs:{icon:"sign-out-alt",title:"Cerrar sesión"},on:{click:function(e){return t.logout()}}}):t._e()],1)},r=[],i=o("5530"),s=o("2f62"),n={methods:Object(i["a"])({},Object(s["b"])(["updateAuth"]),{logout:function(){this.updateAuth({}),this.$router.push("/")}}),mounted:function(){}},c=n,l=(o("fa9e"),o("2877")),u=Object(l["a"])(c,a,r,!1,null,null,null);e["default"]=u.exports},"0079":function(t,e,o){},"034f":function(t,e,o){"use strict";var a=o("85ec"),r=o.n(a);r.a},"14e8":function(t,e,o){"use strict";var a=o("1819"),r=o.n(a);r.a},1819:function(t,e,o){},4386:function(t,e,o){},"4af8":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"position-relative"},[o("input",{class:["form-control pr-4",{"border-danger":t.error}],attrs:{type:t.type,name:"",placeholder:""},on:{input:function(e){return t.setModel(e)}}}),o("font-awesome-icon",{directives:[{name:"show",rawName:"v-show",value:t.error,expression:"error"}],staticClass:"text-danger errorIcon position-absolute",attrs:{id:t.name,icon:"exclamation-triangle"}}),o("b-tooltip",{attrs:{target:t.name,placement:"top"}},[t._v(" "+t._s(t.error)+" ")])],1)},r=[],i=(o("b0c0"),{props:{error:String,model:Object,name:String,type:String},methods:{setModel:function(t){this.$set(this.model,this.name,t.target.value)}}}),s=i,n=(o("c23e"),o("2877")),c=Object(n["a"])(s,a,r,!1,null,null,null);e["default"]=c.exports},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var a=o("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"vh-100",attrs:{id:"app"}},[o("header-component",{staticStyle:{height:"5%"}}),o("div",{staticClass:"container",staticStyle:{height:"95%"}},[o("router-view")],1)],1)},i=[],s=(o("034f"),o("2877")),n={},c=Object(s["a"])(n,r,i,!1,null,null,null),l=c.exports,u=(o("b0c0"),o("b64b"),o("8c4f")),d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"h-100 row justify-content-center align-items-center"},[o("form",{staticClass:"mt-5 col-11 col-md-6 col-lg-4 text-center",attrs:{action:"",method:"POST"},on:{submit:function(e){return t.validate()}}},[o("b-alert",{directives:[{name:"show",rawName:"v-show",value:!t.status,expression:"!status"}],attrs:{show:"",variant:"danger"}},[t._v(t._s(t.alertMessage))]),o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:"email"}},[t._v("Usuario")]),o("form-input",{attrs:{model:t.user,error:t.error.email,type:"text",name:"email"}})],1),o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:"password"}},[t._v("Contraseña")]),o("div",{staticClass:"position-relative"},[o("form-input",{attrs:{model:t.user,error:t.error.password,type:t.showPassword?"text":"password",name:"password"}}),o("font-awesome-icon",{staticClass:"position-absolute",staticStyle:{right:"-25px",top:"12px"},attrs:{icon:t.showPassword?"eye-slash":"eye"},on:{click:function(e){t.showPassword=!t.showPassword}}})],1)]),o("div",{staticClass:"form-group mt-4"},[o("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.validate()}}},[t._v(" Acceder "),o("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{small:""}})],1)],1),o("div",{staticClass:"form-group d-flex flex-column"},[o("router-link",{attrs:{to:"/registrar-medico"}},[t._v("Registrarse")]),o("a",{attrs:{href:""}},[t._v("Recuperar contraseña")])],1)],1)])},m=[],p=(o("4160"),o("d3b7"),o("159b"),o("5530")),f=o("2f62"),v={data:function(){return{user:{email:"",password:""},error:{},showPassword:!1,loading:!1,status:!0,alertMessage:""}},methods:Object(p["a"])({},Object(f["b"])(["updateAuth"]),{validate:function(){var t=this;this.error={},Object.keys(this.user).forEach((function(e){t.user[e]||t.$set(t.error,e,"¡El campo no debe estar vacio!")})),Object.keys(this.error).length||this.login()},login:function(){var t=this;this.loading=!0,console.log(this.user),axios.post("http://190.221.61.114:5004/erp-web/view/recetaCupon/login",this.user).then((function(e){t.updateAuth(e.data),t.$router.push("/nuevo-cupon")})).catch((function(e){t.status=!1,e.response&&401==e.response.status?t.alertMessage="¡Usuario y/o contraseña incorrecto!":t.alertMessage=e.message})).finally((function(e){t.loading=!1}))}})},h=v,b=Object(s["a"])(h,d,m,!1,null,null,null),g=b.exports,x=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"h-100 row justify-content-center align-items-center"},[o("b-modal",{staticClass:"rounded",attrs:{id:"modal-center","hide-footer":"","hide-header":"",centered:""}},[o("p",{staticClass:"my-3 text-center h3 text-white"},[t._v("¡Usuario creado con éxito!")])]),o("form",{staticClass:"mt-2 col-12 col-md-8 col-lg-6 text-center",attrs:{action:"",method:"POST"},on:{submit:function(e){return t.validate()}}},[o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:""}},[t._v("Nombres")]),o("form-input",{attrs:{model:t.medico,error:t.error.nombre,type:"text",name:"nombre"}})],1),o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:""}},[t._v("Apellidos")]),o("form-input",{attrs:{model:t.medico,error:t.error.apellido,type:"text",name:"apellido"}})],1),o("div",{staticClass:"form-group row"},[o("div",{staticClass:"col-6 pr-1 text-left"},[o("label",{attrs:{for:""}},[t._v("DNI")]),o("form-input",{attrs:{model:t.medico,error:t.error.dni,type:"text",name:"dni"}})],1),o("div",{staticClass:"col-6 pl-1 text-left"},[o("label",{attrs:{for:""}},[t._v("Telefono")]),o("form-input",{attrs:{model:t.medico,error:t.error.telefono,type:"text",name:"telefono"}})],1)]),o("div",{staticClass:"form-group row"},[o("div",{staticClass:"col-6 pr-1 text-left"},[o("label",{attrs:{for:""}},[t._v("Email")]),o("form-input",{attrs:{model:t.medico,error:t.error.email,type:"text",name:"email"}})],1),t._m(0),o("div",{staticClass:"col-5 align-items-end d-flex pl-1 text-left"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.medico.servidor,expression:"medico.servidor"}],staticClass:"pl-1 form-control",attrs:{name:""},on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.medico,"servidor",e.target.multiple?o:o[0])}}},[o("option",{attrs:{value:""}},[t._v("Seleccionar")]),o("option",{attrs:{value:"gmail.com"}},[t._v("gmail.com")]),o("option",{attrs:{value:"hotmail.com"}},[t._v("hotmail.com")]),o("option",{attrs:{value:"yahoo.com"}},[t._v("yahoo.com.ar")])])])]),o("div",{staticClass:"form-group row"},[o("div",{staticClass:"col-6 pr-1 text-left"},[o("label",{attrs:{for:""}},[t._v("Nro Matricula")]),o("form-input",{attrs:{model:t.medico,error:t.error.matricula,type:"text",name:"matricula"}})],1),o("div",{staticClass:"col-6 p-0 d-flex flex-column justify-content-end pl-5 text-left"},[o("div",{staticClass:"custom-control custom-radio"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.medico.tipoMatricula,expression:"medico.tipoMatricula"}],staticClass:"custom-control-input",attrs:{type:"radio",name:"tipo",value:"NACIONAL",id:"nacional"},domProps:{checked:t._q(t.medico.tipoMatricula,"NACIONAL")},on:{change:function(e){return t.$set(t.medico,"tipoMatricula","NACIONAL")}}}),o("label",{staticClass:"custom-control-label",attrs:{for:"nacional"}},[t._v("Nacional")])]),o("div",{staticClass:"custom-control custom-radio"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.medico.tipoMatricula,expression:"medico.tipoMatricula"}],staticClass:"custom-control-input",attrs:{type:"radio",name:"tipo",value:"PROVINCIAL",id:"provincial"},domProps:{checked:t._q(t.medico.tipoMatricula,"PROVINCIAL")},on:{change:function(e){return t.$set(t.medico,"tipoMatricula","PROVINCIAL")}}}),o("label",{staticClass:"custom-control-label",attrs:{for:"provincial"}},[t._v("Provincial")])])])]),o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:""}},[t._v("Contraseña")]),o("form-input",{attrs:{model:t.medico,error:t.error.password,type:"password",name:"password"}})],1),o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:""}},[t._v("Confirmar contraseña")]),o("form-input",{attrs:{model:t.medico,error:t.error.confirmPassword,type:"password",name:"confirmPassword"}})],1),o("div",{staticClass:"form-group mb-2"},[o("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.validate()}}},[t._v(" Registrarse "),o("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{small:""}})],1)],1),t.status?t._e():o("span",{staticClass:"d-block mb-2 text-danger"},[t._v("¡Ya existe un medico registrado con esa matricula!")])])],1)},C=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"col-1 align-items-end d-flex justify-content-center"},[o("span",{staticClass:"h4 text-muted"},[t._v("@")])])}],w={data:function(){return{medico:{nombre:"",apellido:"",dni:"",telefono:"",email:"",servidor:"",matricula:"",tipoMatricula:"NACIONAL",password:"",confirmPassword:""},error:{},loading:!1,status:!0}},methods:{validate:function(){var t=this;this.error={},this.medico.servidor||(this.error.email="¡Debe seleccionar un servidor!"),6!=this.medico.matricula.length&&(this.error.matricula="¡La matricula debe ser 6 digitos!"),this.medico.password!=this.medico.confirmPassword&&(this.error.confirmPassword="¡Las contraseñas no coinciden!"),Object.keys(this.medico).forEach((function(e){t.medico[e]||t.$set(t.error,e,"¡El campo no debe estar vacio!")})),Object.keys(this.error).length||this.register(),console.log(this.medico)},register:function(){var t=this;this.loading=!0,this.medico.idMedico="0",this.medico.usaApp="0",this.medico.email+="@"+this.medico.servidor,console.log(this.medico),axios.post("http://190.221.61.114:5004/erp-web/view/recetaCupon/registrar",this.medico).then((function(e){console.log(e),201==e.status?(t.$bvModal.show("modal-center"),setTimeout((function(){t.$router.push("/nuevo-cupon")}),2e3)):t.status=!1})).catch((function(t){console.log(t)})).finally((function(e){t.loading=!1}))}}},y=w,_=(o("14e8"),Object(s["a"])(y,x,C,!1,null,null,null)),O=_.exports,j=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"h-100 row justify-content-center align-items-center"},[o("div",{staticClass:"row justify-content-between h-100 col-12 col-md-8"},[o("div",{staticClass:"col-12 px-0 mt-2 text-left"},[o("span",{staticClass:"text-muted"},[t._v("Datos del paciente")]),o("form",{staticClass:"border border-dark p-2",attrs:{action:"",method:"POST"},on:{submit:function(e){return t.validate()}}},[o("div",{staticClass:"form-group row"},[o("div",{staticClass:"col-6 pr-1 text-left"},[o("label",{attrs:{for:""}},[t._v("Nombre")]),o("form-input",{attrs:{model:t.paciente,error:t.error.nombre,type:"text",name:"nombre"}})],1),o("div",{staticClass:"col-6 pl-1 text-left"},[o("label",{attrs:{for:""}},[t._v("Apellido")]),o("form-input",{attrs:{model:t.paciente,error:t.error.apellido,type:"text",name:"apellido"}})],1)]),o("div",{staticClass:"form-group text-left"},[o("label",{attrs:{for:""}},[t._v("DNI")]),o("form-input",{attrs:{model:t.paciente,error:t.error.dni,type:"text",name:"dni"}})],1)])]),o("div",{staticClass:"col-12 my-3 px-0 position-relative"},[o("input",{staticClass:"form-control pl-4",attrs:{type:"text",placeholder:"¿Qué medicamento esta buscando?"},domProps:{value:t.query},on:{input:function(e){t.query=e.target.value}}}),o("font-awesome-icon",{staticClass:"position-absolute text-muted",staticStyle:{left:"7px",top:"11px"},attrs:{icon:"search"}}),o("ul",{staticClass:"list-unstyled position-absolute w-100 bg-light"},t._l(t.listaMedicamento,(function(e){return o("li",{key:e.id,staticClass:"p-2 text-left",staticStyle:{cursor:"pointer"},on:{click:function(o){return t.addSeleccionado(e)}}},[t._v(t._s(e.nombre))])})),0)],1),o("div",{staticClass:"col-12 px-0"},[o("h2",{staticClass:"text-muted h6"},[t._v("Medicamentos seleccionados")]),o("table",{staticClass:"table mb-0 text-muted table-bordered"},[t._m(0),o("tbody",{staticClass:"text-left"},[t._l(t.seleccionados,(function(e,a){return[o("tr",{key:a},[o("td",{attrs:{scope:"row"}},[t._v(t._s(e.nombre))]),o("td",{staticClass:"d-flex align-items-center justify-content-around position-relative"},[o("div",{staticClass:"mr-2 text-center"},[t._v(" "+t._s(e.cantidad)+" unidades ")]),o("div",{staticClass:"d-flex flex-column"},[o("span",{staticClass:"text-white text-center p-2",staticStyle:{"background-color":"gray",border:"1px solid black","line-height":"0.5",cursor:"pointer"},on:{click:function(t){e.cantidad++}}},[t._v("+")]),o("span",{staticClass:"text-white text-center p-2",staticStyle:{"background-color":"gray",border:"1px solid black","line-height":"0.5",cursor:"pointer"},on:{click:function(t){Number(e.cantidad)&&e.cantidad--}}},[t._v("-")])]),o("font-awesome-icon",{staticClass:"text-danger position-absolute",staticStyle:{right:"-25px",cursor:"pointer"},attrs:{title:"Eliminar",icon:"times"},on:{click:function(o){return t.sacarSeleccionado(e)}}})],1)])]}))],2)])]),o("div",{staticClass:"col-12 px-0 my-2"},[o("button",{staticClass:"btn btn-primary",on:{click:function(e){return t.validate()}}},[t._v("Siguiente")])])])])},P=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("thead",[o("tr",{staticClass:"h6 text-left"},[o("th",[t._v("Nombre")]),o("th",[t._v("Cantidad")])])])}],k=(o("4de4"),o("c740"),o("caad"),o("a434"),o("2532"),{data:function(){return{paciente:{nombre:"",apellido:"",dni:""},error:{},medicamentos:[],seleccionados:[],query:""}},computed:{listaMedicamento:function(){var t=this;if(this.query.length)return this.medicamentos.filter((function(e){return e.nombre.includes(t.query.toUpperCase())}))}},methods:Object(p["a"])({},Object(f["b"])(["updateDataPDF"]),{validate:function(){var t=this;this.error={},isNaN(this.paciente.dni)&&(this.error.dni="¡El DNI es invalido!"),Object.keys(this.paciente).forEach((function(e){t.paciente[e]||t.$set(t.error,e,"¡El campo no debe estar vacio!")})),Object.keys(this.error).length||this.enviar()},addSeleccionado:function(t){this.seleccionados.push(t);var e=this.medicamentos.findIndex((function(e){return e.nombre==t.nombre}));console.log(e),this.medicamentos.splice(e,1)},sacarSeleccionado:function(t){var e=this.seleccionados.findIndex((function(e){return e.nombre==t.nombre}));console.log(e),this.medicamentos.push(this.seleccionados.splice(e,1)[0])},enviar:function(){var t=this,e={usuarioMedicoDto:this.$store.state.auth,pacienteDto:this.paciente,medicamentoDtos:this.seleccionados};axios.post("http://190.221.61.114:5004/erp-web/view/recetaCupon/nuevoCupon",e).then((function(e){t.updateDataPDF(e.data),t.$router.push("/cupon")}))}}),mounted:function(){var t=this;axios.post("http://190.221.61.114:5004/erp-web/view/recetaCupon/medicamentos",{nombre:"",descuento:"",cantidad:""}).then((function(e){console.log(e),t.medicamentos=e.data}))}}),N=k,S=(o("d840"),Object(s["a"])(N,j,P,!1,null,null,null)),$=S.exports,A=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},M=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"h-100 row justify-content-center align-items-center mt-2"},[o("div",{staticClass:"col-12",attrs:{id:"my_pdf_viewer"}},[o("div",{attrs:{id:"canvas_container"}},[o("canvas",{attrs:{id:"pdf_renderer"}})])])])}],E={data:function(){return{state:{pdf:null,currentPage:1,zoom:1}}},methods:{render:function(){this.state.pdf.getPage(this.state.currentPage).then((function(t){var e=document.getElementById("pdf_renderer"),o=e.getContext("2d"),a=t.getViewport(1);e.height=a.height,e.width=a.width,t.render({canvasContext:o,viewport:a})}))}},mounted:function(){var t=this;pdfjsLib.getDocument({data:this.$store.state.dataPDF}).then((function(e){t.state.pdf=e,t.render()}))}},D=E,I=(o("81a1"),Object(s["a"])(D,A,M,!1,null,"718d1c23",null)),L=I.exports;a["default"].use(f["a"]);var R=new f["a"].Store({state:{dataPDF:[],auth:{}},mutations:{mutateDataPDF:function(t,e){return t.dataPDF=e},mutateAuth:function(t,e){return t.auth=e}},actions:{updateDataPDF:function(t,e){var o=t.commit;o("mutateDataPDF",e)},updateAuth:function(t,e){var o=t.commit;o("mutateAuth",e)}},modules:{}});a["default"].use(u["a"]);var T=[{path:"/",name:"Login",component:g,meta:{title:"Iniciar sesión"}},{path:"/registrar-medico",name:"Register",component:O,meta:{title:"Registrar medico"}},{path:"/nuevo-cupon",name:"NuevoCupon",component:$,meta:{title:"Nuevo Cupon"}},{path:"/cupon",name:"Cupon",component:L,meta:{title:"Cupon"}}],F=new u["a"]({routes:T});F.beforeEach((function(t,e,o){"Login"==t.name&&"Register"!=t.name||Object.keys(R.state.auth).length||o({name:"Login"}),"Login"!=t.name&&"Register"!=t.name||!Object.keys(R.state.auth).length?o():o(!1)}));var q=F,U=o("bc3a"),V=o.n(U),J=(o("f9e3"),o("2dd8"),o("5f5b")),z=o("ecee"),B=o("c074"),Q=o("ad3d");a["default"].use(J["a"]),window.axios=V.a,z["c"].add({faEye:B["c"],faSearch:B["e"],faEyeSlash:B["d"],faExclamationTriangle:B["b"],faSignOutAlt:B["f"],faArrowCircleLeft:B["a"],faTimes:B["g"]}),a["default"].component("font-awesome-icon",Q["a"]),a["default"].component("header-component",o("005b").default),a["default"].component("form-input",o("4af8").default),new a["default"]({router:q,store:R,render:function(t){return t(l)}}).$mount("#app")},"81a1":function(t,e,o){"use strict";var a=o("ebf1"),r=o.n(a);r.a},"85ec":function(t,e,o){},c23e:function(t,e,o){"use strict";var a=o("c358"),r=o.n(a);r.a},c358:function(t,e,o){},d840:function(t,e,o){"use strict";var a=o("0079"),r=o.n(a);r.a},ebf1:function(t,e,o){},fa9e:function(t,e,o){"use strict";var a=o("4386"),r=o.n(a);r.a}});
//# sourceMappingURL=app.636e865b.js.map