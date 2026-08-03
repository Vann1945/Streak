var H={exports:{}},n={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z;function et(){if(z)return n;z=1;var f=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),m=Symbol.for("react.profiler"),E=Symbol.for("react.consumer"),A=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),k=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),G=Symbol.for("react.activity"),O=Symbol.iterator;function Z(t){return t===null||typeof t!="object"?null:(t=O&&t[O]||t["@@iterator"],typeof t=="function"?t:null)}var x={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L=Object.assign,I={};function h(t,e,o){this.props=t,this.context=e,this.refs=I,this.updater=o||x}h.prototype.isReactComponent={},h.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},h.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Y(){}Y.prototype=h.prototype;function S(t,e,o){this.props=t,this.context=e,this.refs=I,this.updater=o||x}var $=S.prototype=new Y;$.constructor=S,L($,h.prototype),$.isPureReactComponent=!0;var b=Array.isArray;function P(){}var c={H:null,A:null,T:null,S:null},U=Object.prototype.hasOwnProperty;function j(t,e,o){var r=o.ref;return{$$typeof:f,type:t,key:e,ref:r!==void 0?r:null,props:o}}function Q(t,e){return j(t.type,e,t.props)}function M(t){return typeof t=="object"&&t!==null&&t.$$typeof===f}function X(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(o){return e[o]})}var q=/\/+/g;function N(t,e){return typeof t=="object"&&t!==null&&t.key!=null?X(""+t.key):e.toString(36)}function J(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(P,P):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function d(t,e,o,r,u){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var i=!1;if(t===null)i=!0;else switch(s){case"bigint":case"string":case"number":i=!0;break;case"object":switch(t.$$typeof){case f:case a:i=!0;break;case T:return i=t._init,d(i(t._payload),e,o,r,u)}}if(i)return u=u(t),i=r===""?"."+N(t,0):r,b(u)?(o="",i!=null&&(o=i.replace(q,"$&/")+"/"),d(u,e,o,"",function(tt){return tt})):u!=null&&(M(u)&&(u=Q(u,o+(u.key==null||t&&t.key===u.key?"":(""+u.key).replace(q,"$&/")+"/")+i)),e.push(u)),1;i=0;var _=r===""?".":r+":";if(b(t))for(var p=0;p<t.length;p++)r=t[p],s=_+N(r,p),i+=d(r,e,o,s,u);else if(p=Z(t),typeof p=="function")for(t=p.call(t),p=0;!(r=t.next()).done;)r=r.value,s=_+N(r,p++),i+=d(r,e,o,s,u);else if(s==="object"){if(typeof t.then=="function")return d(J(t),e,o,r,u);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return i}function w(t,e,o){if(t==null)return t;var r=[],u=0;return d(t,r,"","",function(s){return e.call(o,s,u++)}),r}function V(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(o){(t._status===0||t._status===-1)&&(t._status=1,t._result=o)},function(o){(t._status===0||t._status===-1)&&(t._status=2,t._result=o)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var D=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},F={map:w,forEach:function(t,e,o){w(t,function(){e.apply(this,arguments)},o)},count:function(t){var e=0;return w(t,function(){e++}),e},toArray:function(t){return w(t,function(e){return e})||[]},only:function(t){if(!M(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};return n.Activity=G,n.Children=F,n.Component=h,n.Fragment=l,n.Profiler=m,n.PureComponent=S,n.StrictMode=y,n.Suspense=g,n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,n.__COMPILER_RUNTIME={__proto__:null,c:function(t){return c.H.useMemoCache(t)}},n.cache=function(t){return function(){return t.apply(null,arguments)}},n.cacheSignal=function(){return null},n.cloneElement=function(t,e,o){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var r=L({},t.props),u=t.key;if(e!=null)for(s in e.key!==void 0&&(u=""+e.key),e)!U.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(r[s]=e[s]);var s=arguments.length-2;if(s===1)r.children=o;else if(1<s){for(var i=Array(s),_=0;_<s;_++)i[_]=arguments[_+2];r.children=i}return j(t.type,u,r)},n.createContext=function(t){return t={$$typeof:A,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:E,_context:t},t},n.createElement=function(t,e,o){var r,u={},s=null;if(e!=null)for(r in e.key!==void 0&&(s=""+e.key),e)U.call(e,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(u[r]=e[r]);var i=arguments.length-2;if(i===1)u.children=o;else if(1<i){for(var _=Array(i),p=0;p<i;p++)_[p]=arguments[p+2];u.children=_}if(t&&t.defaultProps)for(r in i=t.defaultProps,i)u[r]===void 0&&(u[r]=i[r]);return j(t,s,u)},n.createRef=function(){return{current:null}},n.forwardRef=function(t){return{$$typeof:R,render:t}},n.isValidElement=M,n.lazy=function(t){return{$$typeof:T,_payload:{_status:-1,_result:t},_init:V}},n.memo=function(t,e){return{$$typeof:k,type:t,compare:e===void 0?null:e}},n.startTransition=function(t){var e=c.T,o={};c.T=o;try{var r=t(),u=c.S;u!==null&&u(o,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(P,D)}catch(s){D(s)}finally{e!==null&&o.types!==null&&(e.types=o.types),c.T=e}},n.unstable_useCacheRefresh=function(){return c.H.useCacheRefresh()},n.use=function(t){return c.H.use(t)},n.useActionState=function(t,e,o){return c.H.useActionState(t,e,o)},n.useCallback=function(t,e){return c.H.useCallback(t,e)},n.useContext=function(t){return c.H.useContext(t)},n.useDebugValue=function(){},n.useDeferredValue=function(t,e){return c.H.useDeferredValue(t,e)},n.useEffect=function(t,e){return c.H.useEffect(t,e)},n.useEffectEvent=function(t){return c.H.useEffectEvent(t)},n.useId=function(){return c.H.useId()},n.useImperativeHandle=function(t,e,o){return c.H.useImperativeHandle(t,e,o)},n.useInsertionEffect=function(t,e){return c.H.useInsertionEffect(t,e)},n.useLayoutEffect=function(t,e){return c.H.useLayoutEffect(t,e)},n.useMemo=function(t,e){return c.H.useMemo(t,e)},n.useOptimistic=function(t,e){return c.H.useOptimistic(t,e)},n.useReducer=function(t,e,o){return c.H.useReducer(t,e,o)},n.useRef=function(t){return c.H.useRef(t)},n.useState=function(t){return c.H.useState(t)},n.useSyncExternalStore=function(t,e,o){return c.H.useSyncExternalStore(t,e,o)},n.useTransition=function(){return c.H.useTransition()},n.version="19.2.8",n}var B;function nt(){return B||(B=1,H.exports=et()),H.exports}var C=nt();/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=f=>f.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ot=f=>f.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,l,y)=>y?y.toUpperCase():l.toLowerCase()),K=f=>{const a=ot(f);return a.charAt(0).toUpperCase()+a.slice(1)},W=(...f)=>f.filter((a,l,y)=>!!a&&a.trim()!==""&&y.indexOf(a)===l).join(" ").trim(),ut=f=>{for(const a in f)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var st={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=C.forwardRef(({color:f="currentColor",size:a=24,strokeWidth:l=2,absoluteStrokeWidth:y,className:m="",children:E,iconNode:A,...R},g)=>C.createElement("svg",{ref:g,...st,width:a,height:a,stroke:f,strokeWidth:y?Number(l)*24/Number(a):l,className:W("lucide",m),...!E&&!ut(R)&&{"aria-hidden":"true"},...R},[...A.map(([k,T])=>C.createElement(k,T)),...Array.isArray(E)?E:[E]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(f,a)=>{const l=C.forwardRef(({className:y,...m},E)=>C.createElement(ct,{ref:E,iconNode:a,className:W(`lucide-${rt(K(f))}`,`lucide-${f}`,y),...m}));return l.displayName=K(f),l};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],vt=v("activity",it);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],ht=v("calendar",ft);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],dt=v("chart-pie",at);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],mt=v("check",pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Ct=v("chevron-right",lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Rt=v("pen-line",yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Tt=v("rotate-ccw",_t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],wt=v("target",Et);export{vt as A,mt as C,Rt as P,Tt as R,wt as T,C as a,dt as b,ht as c,Ct as d,nt as r};
