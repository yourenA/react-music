webpackJsonp([1],{314:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),u=e(i),c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),a(t,[{key:"render",value:function(){return u.default.createElement("div",{id:"caseBlanche"},u.default.createElement("div",{id:"rond"},u.default.createElement("div",{id:"test"})),u.default.createElement("div",{id:"load"},u.default.createElement("p",null,this.props.info)))}}]),t}(i.Component);t.default=c}).call(this)}finally{}},312:function(e,t,n){try{(function(){"use strict";function e(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return(0,f.bindActionCreators)(L,e)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(2),s=r(c),f=n(178),p=n(313),d=e(p),h=n(280),y=e(h),b=n(281),m=e(b),_=n(167),v=n(302),g=r(v),E=n(307),O=r(E),j=n(314),w=r(j),L=Object.assign({},d,y,m),C=function(e){function t(e){o(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.playAll=n.playAll.bind(n),n}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.fetchChannelList(this.props.params.id,!1)}},{key:"componentWillReceiveProps",value:function(e){e.params.id!=this.props.params.id&&this.props.fetchChannelList(e.params.id,!1)}},{key:"playAll",value:function(){var e=this.props.channelState,t=e[this.props.params.id],n=t.song_list;this.props.playAll(n)}},{key:"render",value:function(){var e=this.props.channelState,t=!!e.isFetching&&"Loading...",n=e[this.props.params.id],r=null,o=null,l=null,a=null,i=null,u=void 0;if(n&&(r=n.name,o=n.length,l=n.date,a=n.comment,i=n.song_list,u=""!==n.avator_url?{backgroundImage:'url("'+n.avator_url+'")'}:{}),t)return s.default.createElement(w.default,{info:t});var c=!0;return s.default.createElement("div",null,s.default.createElement(g.default,{url:u,listName:r,listcnt:o,date:l,comment:a,playAll:this.playAll}),s.default.createElement(O.default,{listContent:i,durationShow:c,playSpecialSong:this.props.playSpecialSong,addToPlayList:this.props.addToPlayList,addToLocalList:this.props.addToLocalList}))}}]),t}(c.Component);t.default=(0,_.connect)(i)(C)}).call(this)}finally{}},313:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function r(e){return{isFetching:!0,type:a.REQUESTCHANNELLIST,channel_type:e}}function o(e,t){var n={type:a.RECEIVECHANNELLIST,channel_type:e,list:{length:t.billboard.billboard_songnum,date:t.billboard.update_date,name:t.billboard.name,comment:t.billboard.comment,avator_url:t.billboard.pic_s210,song_list:t.song_list}};return{isFetching:!1,type:a.RECEIVECHANNELLIST,items:n}}function l(e,t){return function(t,n){var l=0;console.log("getState()",n()),t(r(e));var u=i.CONFIG.base_url+"?method="+i.CONFIG.channel_method+"&type="+e+"&offset="+l;return(0,c.default)(u,{timeout:3e4,jsonpCallback:"callback"}).then(function(e){return e.json()}).then(function(n){return t(o(e,n))}).catch(function(n){return console.log(n),t({type:a.FAILQUERYCHANNELLIST,channel_type:e,isFetching:!1,success:!1})})}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchChannelList=l;var a=n(279),i=n(283),u=n(282),c=e(u)}).call(this)}finally{}}});