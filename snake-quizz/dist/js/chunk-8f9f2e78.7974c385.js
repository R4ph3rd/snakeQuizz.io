(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f9f2e78"],{"10b4":function(e,t,s){"use strict";s("71d0")},"13d5":function(e,t,s){"use strict";var n=s("23e7"),r=s("d58f").left,i=s("a640"),c=s("ae40"),o=s("2d00"),u=s("605d"),a=i("reduce"),l=c("reduce",{1:0}),d=!u&&o>79&&o<83;n({target:"Array",proto:!0,forced:!a||!l||d},{reduce:function(e){return r(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"23e6":function(e,t,s){},"2f7f":function(e,t,s){"use strict";s("e74e")},5425:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"title"},[s("h2",[e._v(e._s(e.question))]),s("div",{staticClass:"timer"},[s("p",[e._v(e._s(e.countdown))])])]),s("v-list",{attrs:{items:e.answers},on:{teamChoiceMade:e.teamAction}}),s("div",{directives:[{name:"show",rawName:"v-show",value:""!=e.answer,expression:"answer != ''"}],staticClass:"alert"},[s("div",[s("p",[e._v("Rabbit team, "),s("br"),e._v(" you choose "),s("strong",[e._v(e._s(e.answer))])]),e.getPlayerTurn==e.$store.state.me?s("p",{staticClass:"correct"},[e._v("Correct response !")]):s("p",{staticClass:"wrong"},[e._v("Wrong response !")])])])],1)},r=[],i=(s("c740"),s("13d5"),s("5530")),c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",e._l(e.items,(function(t,n){return s("list-item",{key:t,attrs:{users:e.usersSelected[n]},on:{select:function(t){return e.action()}}},[e._v(e._s(t))])})),1)},o=[],u=(s("fb6a"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"item",on:{click:function(t){return e.select()}}},[s("input",{attrs:{type:"radio"}}),s("p",[e._t("default")],2),s("span"),e.users?s("div",{staticClass:"users"},e._l(e.users,(function(e){return s("div",{key:e,staticClass:"bubble",class:e},[s("img",{attrs:{src:"https://source.unsplash.com/random/30x30",alt:""}})])})),0):e._e()])}),a=[],l={name:"ListItem",props:{users:{type:Array,required:!1}},methods:{select:function(){this.$el.children[0].checked=!0,this.$emit("select",this.$slots.default[0].text)}}},d=l,h=(s("e610"),s("2877")),f=Object(h["a"])(d,u,a,!1,null,"316a7f3c",null),m=f.exports,p=s("2f62"),v={name:"List",components:{"list-item":m},props:{items:{type:[Array,Object],required:!0}},data:function(){return{tempUsers:[],usersSelected:[]}},computed:Object(i["a"])({},Object(p["c"])(["getUsers"])),created:function(){if(this.tempUsers=this.getUsers.slice(0,this.getUsers.length),Array.isArray(this.items))while(this.tempUsers.length>1){var e=Math.floor(Math.random()*(this.items.length-1));this.usersSelected[e]?this.usersSelected[e].push(this.tempUsers.shift()):this.usersSelected[e]=[this.tempUsers.shift()]}},methods:{action:function(){var e=this;setTimeout((function(){var t=e.usersSelected.reduce((function(e,t,s){return t.length>e.length?t:e}),[]);t.push(e.tempUsers.shift()),e.$emit("teamChoiceMade",e.items[e.usersSelected.findIndex((function(e){return e==t}))])}),1e3)}}},g=v,b=(s("2f7f"),Object(h["a"])(g,c,o,!1,null,"36621260",null)),w=b.exports,_={name:"Quizz",components:{"v-list":w},data:function(){return{questions:['Quelle est la couleur du ciel aujourd"hui ?'],answers:["Blue","Rouge","Pink","Yellow","Cool","banana","oqudh spidg qydg pgyD PGSQPYDIGPGY"],answer:"",countdown:33,choice:!1,timer:function(){}}},computed:Object(i["a"])(Object(i["a"])({},Object(p["c"])(["getPlayerTurn"])),{},{question:function(){return this.questions[Math.floor(Math.random()*this.questions.length)]}}),methods:Object(i["a"])(Object(i["a"])({},Object(p["b"])({toggleMove:"toggleMove"})),{},{teamAction:function(e){console.log(e),this.answer=e,this.choiceMade()},choiceMade:function(){var e=this;setTimeout((function(){e.$store.state.playerTurn==e.$store.state.me&&e.toggleMove(),clearInterval(e.timer),e.$router.push("/")}),2e3)}}),mounted:function(){var e=this;this.timer=setInterval((function(){if(e.countdown--,0==e.countdown){var t=e.$children[0].usersSelected.reduce((function(e,t){return t.length>e.length?t:e}),[]),s=e.$children[0].usersSelected.findIndex((function(e){return e==t}));e.answer=e.$children[0].$children[s],e.choiceMade()}}),1e3)}},y=_,$=(s("10b4"),Object(h["a"])(y,n,r,!1,null,"9b877272",null));t["default"]=$.exports},"71d0":function(e,t,s){},d58f:function(e,t,s){var n=s("1c0b"),r=s("7b0b"),i=s("44ad"),c=s("50c4"),o=function(e){return function(t,s,o,u){n(s);var a=r(t),l=i(a),d=c(a.length),h=e?d-1:0,f=e?-1:1;if(o<2)while(1){if(h in l){u=l[h],h+=f;break}if(h+=f,e?h<0:d<=h)throw TypeError("Reduce of empty array with no initial value")}for(;e?h>=0:d>h;h+=f)h in l&&(u=s(u,l[h],h,a));return u}};e.exports={left:o(!1),right:o(!0)}},e610:function(e,t,s){"use strict";s("23e6")},e74e:function(e,t,s){}}]);
//# sourceMappingURL=chunk-8f9f2e78.7974c385.js.map