import React,{ Component } from 'react';
import { Router,Route,IndexRoute,useRouterHistory,Redirect } from 'react-router';
import { createHashHistory } from 'history';
import NProgress from 'nprogress';
import App from '../Containers/App';
import LocalList from '../Containers/LocalList';

var appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

//require.ensure(dependencies, callback, chunkName)
//这是 webpack 提供的方法，这也是按需加载的核心方法。
//第一个参数是依赖，第二个是回调函数，第三个就是chunkName，用来指定webpack的chunkName：[name]
//将组件放在回调函数的的cb()里
let Channel = (location,cb) => {
	require.ensure([],require => {
    	cb(null,require('../Containers/Channel.js').default);
  	},'channel2');
};
let Search = (location,cb) => {
	require.ensure([],require => {
    	cb(null,require('../Containers/Search.js').default);
  	},'search2');
};
let Lyric = (location,cb) => {
	require.ensure([],require => {
    	cb(null,require('../Containers/Lyric.js').default);
  	},'lyric2');
};

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={LocalList} />
		<Route path="/locallist" component={LocalList} />
		<Route path="/search" getComponent={Search}/>
		<Route path="/channel/:id" getComponent={Channel} />
		<Route path="/lyric" getComponent={Lyric} />
		{/* 404 */}
		<Route path='/404' component={LocalList} />
		{/* 其他重定向到 404 */}
		<Redirect from='*' to='/404' />
	</Route>
);

export default class Root extends Component{
	render(){
		return <Router history={appHistory} routes={routes}/>;
	}
};