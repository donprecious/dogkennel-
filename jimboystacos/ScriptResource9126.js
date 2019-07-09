// (c) 2010 CodePlex Foundation
(function(g,b){var o="object",t="set_",l="#",n="$",k="string",j=".",h=" ",s="onreadystatechange",m="load",y="_readyQueue",x="_domReadyQueue",r="error",d=false,q="on",a=null,c=true,e="undefined",f="function",i="number",A=function(a){a=a||{};p(arguments,function(b){b&&v(b,function(c,b){a[b]=c})},1);return a},v=function(a,c){for(var b in a)c(a[b],b)},p=function(a,g,h){var d;if(a){a=a instanceof Array||typeof a.length===i&&(typeof a.callee===f||a.item&&typeof a.nodeType===e&&!a.addEventListener&&!a.attachEvent)?a:[a];for(var b=h||0,j=a.length;b<j;b++)if(g(a[b],b)){d=c;break}}return!d},u=function(b,e,d){var c=b[e],a=typeof c===f;a&&c.call(b,d);return a};if(!b||!b.loader){function M(a){a=a||{};p(arguments,function(b){b&&v(b,function(c,b){if(typeof a[b]===e)a[b]=c})},1);return a}var z=!!document.attachEvent;function C(b,a){var c=b[a];delete b[a];return c}function K(d,b,c){p(C(d,b),function(b){b.apply(a,c||[])})}function I(a,c,b){return a?(a[c]=a[c]||b):b}function G(c,b,a){I(c,b,[]).push(a)}function B(b,a){return(a||document).getElementsByTagName(b)}function J(a){return document.createElement(a)}function D(b,e,g,i,h,f){function c(){if(!z||!h||/loaded|complete/.test(b.readyState)){if(z)b.detachEvent(g||q+e,c);else{b.removeEventListener(e,c,d);f&&b.removeEventListener(r,c,d)}i.apply(b);b=a}}if(z)b.attachEvent(g||q+e,c);else{b.addEventListener(e,c,d);f&&b.addEventListener(r,c,d)}}function E(){b._domReady&&b._2Pass(C(b,x))}function F(){var a=b._ready;if(!a&&b._domReady&&!(b.loader&&b.loader._loading))b._ready=a=c;a&&b._2Pass(C(b,y))}g.Sys=b=M(b,{version:[3,0,31106,0],__namespace:c,debug:d,scripts:{},activateDom:c,composites:{},components:{},plugins:{},create:{},converters:{},_domLoaded:function(){if(b._domChecked)return;b._domChecked=c;function d(){if(!b._domReady){b._domReady=c;var d=b._autoRequire;d&&b.require(d,function(){b._autoRequire=a;K(b,"_autoQueue")},autoToken);E();F()}}D(g,m,a,d);var e;if(z)if(g==g.top&&document.documentElement.doScroll){var h,i,f=J("div");e=function(){try{f.doScroll("left")}catch(b){h=g.setTimeout(e,0);return}f=a;d()};e()}else D(document,a,s,d,c);else document.addEventListener&&D(document,"DOMContentLoaded",a,d)},_getById:function(b,d,h,f,a,g){if(a)if(f&&a.id===d)b.push(a);else!g&&p(B("*",a),function(a){if(a.id===d){b.push(a);return c}});else{var e=document.getElementById(d);e&&b.push(e)}return b.length},_getByClass:function(l,d,g,m,a,n){function i(b){var e,a=b.className;if(a&&(a===d||a.indexOf(h+d)>=0||a.indexOf(d+h)>=0)){l.push(b);e=c}return e}var b,f,e;if(m&&i(a)&&g)return c;if(!n){a=a||document;var k=a.querySelectorAll||a.getElementsByClassName;if(k){if(a.querySelectorAll)d=j+d;e=k.call(a,d);for(b=0,f=e.length;b<f;b++){l.push(e[b]);if(g)return c}}else{e=B("*",a);for(b=0,f=e.length;b<f;b++)if(i(e[b])&&g)return c}}},query:function(a,c){return new b.ElementSet(a,c)},"get":function(b,a){return a&&typeof a.get===f?a.get(b):this._find(b,a,c)},_find:function(m,d,f,h){var e=[],j;if(typeof m===k)j=[m];else j=m;var i=d instanceof Array,o=/^([\$#\.])((\w|[$:\.\-])+)$/,q=/^((\w+)|\*)$/;if(typeof d===k||d instanceof Array)d=b._find(d);if(d instanceof b.ElementSet)d=d.get();p(j,function(a){if(typeof a!==k)if(h)contains(d,a)&&e.push(a);else e.push(a);else{var j=o.exec(a);if(j&&j.length===4){a=j[2];var s=j[1];if(s===n)b._getComponent(e,a,d);else{var r=s===l?b._getById:b._getByClass;if(d)p(d,function(b){if(b.nodeType===1)return r(e,a,f,i,b,h)});else r(e,a,f)}}else if(q.test(a))if(d instanceof Array)p(d,function(b){if(b.nodeType===1){if(i&&(a==="*"||b.tagName.toLowerCase()===a)){e.push(b);if(f)return c}if(!h)if(!p(B(a,b),function(a){e.push(a);if(f)return c}))return c}});else{var m=B(a,d);if(f){m[0]&&e.push(m[0]);return c}p(m,function(a){e.push(a)})}else if(g.jQuery){!h&&e.push.apply(e,jQuery(a,d).get());i&&e.push.apply(e,jQuery(d).filter(a).get())}}});return e.length?f?e[0]||a:e:a},onDomReady:function(a){G(this,x,a);E()},onReady:function(a){G(this,y,a);F()},_set:function(a,b){v(b,function(c,b){u(a,"add_"+b,c)||u(a,t+b,c)||(a[b]=c)})}});b._getComponent=b._getComponent||function(){};b._2Pass=b._2Pass||function(a){p(a,function(a){a()})};var w;if(!b.ElementSet){w=b.ElementSet=function(c,a){this._elements=typeof a===o&&typeof a.query===f?a.query(c).get():b._find(c,a)||[]};w.prototype={__class:c,components:function(d,c){var a=new b.ElementSet(this.get());return new b.ComponentSet(a,d,c)},component:function(b,a){return this.components(b,a).get(0)},each:function(c){for(var b=this._elements,a=0,e=b.length;a<e;a++)if(c.call(b[a],a)===d)break;return this},"get":function(c){var b=this._elements;return typeof c===e?Array.apply(a,b):b[c]||a},find:function(a){return new b.ElementSet(a,this)},filter:function(a){return new b.ElementSet(b._find(a,this._elements,d,c))}}}if(!b.ComponentSet){w=b.ComponentSet=function(a,d,c){this._elementSet=a||(a=new b.ElementSet);this._components=this._execute(a,d,c)};w.prototype={__class:c,setProperties:function(a){return this.each(function(){b._set(this,a)})},"get":function(c){var b=this._components;return typeof c===e?Array.apply(a,b):b[c||0]||a},each:function(a){p(this._components,function(b,e){if(a.call(b,e)===d)return c});return this},elements:function(){return this._elementSet},_execute:function(f,b,c){var a=[];function d(c){var a;return c instanceof b||(a=c.constructor)&&(a===b||a.inheritsFrom&&a.inheritsFrom(b)||a.implementsInterface&&a.implementsInterface(b))}if(b instanceof Array)a.push.apply(a,b);else f.each(function(){var c=this.control;c&&(!b||d(c))&&a.push(c);p(this._behaviors,function(c){(!b||d(c))&&a.push(c)})});if(typeof c!==e)if(a[c])a=[a[c]];else a=[];return a}}}w=a}var L=function(a,d){if(d)return function(){return b.plugins[a.name].plugin.apply(this,arguments)};else{var c=function(){var c=arguments.callee,a=c._component;return b._createComp.call(this,a,a.defaults,arguments)};c._component=a;return c}};b._getCreate=L;function H(){var sb="callback",Q="completed",hb="completedRequest",gb="invokingRequest",vb="Sys.Net.XMLHttpExecutor",M="Content-Type",kb="text/xml",rb="SelectionLanguage",fb="navigate",eb="dispose",db="init",L="unload",P="none",cb="HTML",I="absolute",O="BODY",bb="InternetExplorer",ab="disposing",H="+",qb="MonthNames",pb="MonthGenitiveNames",Z="Abbreviated",E="-",D="../index.html",Y="yyyy",X="MMMM",W="dddd",B=100,J="collectionChanged",V="get_",C="propertyChanged",G=",",U="null",S="Firefox",T="initialize",jb="beginUpdate",y=-1,ob="Undefined",x="",F="\n",nb="Exception",w,z;b._foreach=p;b._forIn=v;b._merge=A;b._callIf=u;w=Function;w.__typeName="Function";w.__class=c;w.createCallback=function(b,a){return function(){var e=arguments.length;if(e>0){for(var d=[],c=0;c<e;c++)d[c]=arguments[c];d[e]=a;return b.apply(this,d)}return b.call(this,a)}};w.createDelegate=function(a,b){return function(){return b.apply(a,arguments)}};w.emptyFunction=w.emptyMethod=function(){};w.validateParameters=function(c,b,a){return Function._validateParams(c,b,a)};w._validateParams=function(i,g,e){var b,f=g.length;e=e!==d;b=Function._validateParameterCount(i,g,e);if(b){b.popStackFrame();return b}for(var c=0,k=i.length;c<k;c++){var h=g[Math.min(c,f-1)],j=h.name;if(h.parameterArray)j+="["+(c-f+1)+"]";else if(!e&&c>=f)break;b=Function._validateParameter(i[c],h,j);if(b){b.popStackFrame();return b}}return a};w._validateParameterCount=function(m,g,l){var b,f,e=g.length,h=m.length;if(h<e){var i=e;for(b=0;b<e;b++){var j=g[b];if(j.optional||j.parameterArray)i--}if(h<i)f=c}else if(l&&h>e){f=c;for(b=0;b<e;b++)if(g[b].parameterArray){f=d;break}}if(f){var k=Error.parameterCount();k.popStackFrame();return k}return a};w._validateParameter=function(d,b,j){var c,i=b.type,n=!!b.integer,m=!!b.domElement,o=!!b.mayBeNull;c=Function._validateParameterType(d,i,n,m,o,j);if(c){c.popStackFrame();return c}var g=b.elementType,h=!!b.elementMayBeNull;if(i===Array&&typeof d!==e&&d!==a&&(g||!h))for(var l=!!b.elementInteger,k=!!b.elementDomElement,f=0;f<d.length;f++){var p=d[f];c=Function._validateParameterType(p,g,l,k,h,j+"["+f+"]");if(c){c.popStackFrame();return c}}return a};w._validateParameterType=function(c,f,n,m,o,g){var d,k;if(typeof c===e||c===a){if(o)return a;d=c===a?Error.argumentNull(g):Error.argumentUndefined(g);d.popStackFrame();return d}if(f&&f.__enum){if(typeof c!==i){d=Error.argumentType(g,Object.getType(c),f);d.popStackFrame();return d}if(c%1===0){var h=f.prototype;if(!f.__flags||c===0){for(k in h)if(h[k]===c)return a}else{var l=c;for(k in h){var j=h[k];if(j===0)continue;if((j&c)===j)l-=j;if(l===0)return a}}}d=Error.argumentOutOfRange(g,c,String.format(b.Res.enumInvalidValue,c,f.getName()));d.popStackFrame();return d}if(m&&(!b._isDomElement(c)||c.nodeType===3)){d=Error.argument(g,b.Res.argumentDomElement);d.popStackFrame();return d}if(f&&!b._isInstanceOfType(f,c)){d=Error.argumentType(g,Object.getType(c),f);d.popStackFrame();return d}if(f===Number&&n)if(c%1!==0){d=Error.argumentOutOfRange(g,c,b.Res.argumentInteger);d.popStackFrame();return d}return a};w=Error;w.__typeName="Error";w.__class=c;b._errorArgument=function(e,a,g){var f="Sys.Argument"+e+nb,d=f+": "+(g||b.Res["argument"+e]);if(a)d+=F+String.format(b.Res.paramName,a);var c=Error.create(d,{name:f,paramName:a});c.popStackFrame();c.popStackFrame();return c};b._error=function(g,f,d){var c="Sys."+g+nb,e=c+": "+(f||b.Res[d]),a=Error.create(e,{name:c});a.popStackFrame();a.popStackFrame();return a};w.create=function(c,b){var a=new Error(c);a.message=c;if(b)for(var d in b)a[d]=b[d];a.popStackFrame();return a};w.argument=function(a,c){return b._errorArgument(x,a,c)};w.argumentNull=function(a,c){return b._errorArgument("Null",a,c)};w.argumentOutOfRange=function(f,c,h){var d="Sys.ArgumentOutOfRangeException: "+(h||b.Res.argumentOutOfRange);if(f)d+=F+String.format(b.Res.paramName,f);if(typeof c!==e&&c!==a)d+=F+String.format(b.Res.actualValue,c);var g=Error.create(d,{name:"Sys.ArgumentOutOfRangeException",paramName:f,actualValue:c});g.popStackFrame();return g};w.argumentType=function(e,d,c,f){var a="Sys.ArgumentTypeException: ";if(f)a+=f;else if(d&&c)a+=String.format(b.Res.argumentTypeWithTypes,d.getName(),c.getName());else a+=b.Res.argumentType;if(e)a+=F+String.format(b.Res.paramName,e);var g=Error.create(a,{name:"Sys.ArgumentTypeException",paramName:e,actualType:d,expectedType:c});g.popStackFrame();return g};w.argumentUndefined=function(a,c){return b._errorArgument(ob,a,c)};w.format=function(a){return b._error("Format",a,"format")};w.invalidOperation=function(a){return b._error("InvalidOperation",a,"invalidOperation")};w.notImplemented=function(a){return b._error("NotImplemented",a,"notImplemented")};w.parameterCount=function(a){return b._error("ParameterCount",a,"parameterCount")};w.prototype.popStackFrame=function(){var b=this;if(typeof b.stack===e||b.stack===a||typeof b.fileName===e||b.fileName===a||typeof b.lineNumber===e||b.lineNumber===a)return;var c=b.stack.split(F),f=c[0],h=b.fileName+":"+b.lineNumber;while(typeof f!==e&&f!==a&&f.indexOf(h)<0){c.shift();f=c[0]}var g=c[1];if(typeof g===e||g===a)return;var d=g.match(/@(.*):(\d+)$/);if(typeof d===e||d===a)return;b.fileName=d[1];b.lineNumber=parseInt(d[2]);c.shift();b.stack=c.join(F)};w=Object;w.__typeName="Object";w.__class=c;w.getType=function(b){var a=b.constructor;return!a||typeof a!==f||!a.__typeName||a.__typeName==="Object"?Object:a};w.getTypeName=function(a){return Object.getType(a).getName()};w=String;w.__typeName="String";w.__class=c;z=w.prototype;z.endsWith=function(a){return this.substr(this.length-a.length)===a};z.startsWith=function(a){return this.substr(0,a.length)===a};z.trim=function(){return this.replace(/^\s+|\s+$/g,x)};z.trimEnd=function(){return this.replace(/\s+$/,x)};z.trimStart=function(){return this.replace(/^\s+/,x)};w.format=function(){return String._toFormattedString(d,arguments)};w._toFormattedString=function(o,m){for(var f=x,h=m[0],b=0;c;){var i=h.indexOf("{",b),g=h.indexOf("}",b);if(i<0&&g<0){f+=h.slice(b);break}if(g>0&&(g<i||i<0)){f+=h.slice(b,g+1);b=g+2;continue}f+=h.slice(b,i);b=i+1;if(h.charAt(b)==="{"){f+="{";b++;continue}if(g<0)break;var k=h.substring(b,g),j=k.indexOf(":"),n=parseInt(j<0?k:k.substring(0,j),10)+1,l=j<0?x:k.substring(j+1),d=m[n];if(typeof d===e||d===a)d=x;if(d.toFormattedString)f+=d.toFormattedString(l);else if(o&&d.localeFormat)f+=d.localeFormat(l);else if(d.format)f+=d.format(l);else f+=d.toString();b=g+1}return f};w=Boolean;w.__typeName="Boolean";w.__class=c;w.parse=function(e){var b=e.trim().toLowerCase(),a;if(b==="false")a=d;else if(b==="true")a=c;return a};w=Date;w.__typeName="Date";w.__class=c;w=Number;w.__typeName="Number";w.__class=c;w=RegExp;w.__typeName="RegExp";w.__class=c;if(!g)this.window=this;g.Type=w=Function;z=w.prototype;z.callBaseMethod=function(a,e,c){var d=b._getBaseMethod(this,a,e);return c?d.apply(a,c):d.apply(a)};z.getBaseMethod=function(a,c){return b._getBaseMethod(this,a,c)};z.getBaseType=function(){return typeof this.__baseType===e?a:this.__baseType};z.getInterfaces=function(){var c=[],a=this;while(a){var b=a.__interfaces;if(b)for(var d=0,f=b.length;d<f;d++){var e=b[d];!Array.contains(c,e)&&c.push(e)}a=a.__baseType}return c};z.getName=function(){return typeof this.__typeName===e?x:this.__typeName};z.implementsInterface=function(h){var f=this;f.resolveInheritance();var g=h.getName(),a=f.__interfaceCache;if(a){var i=a[g];if(typeof i!==e)return i}else a=f.__interfaceCache={};var b=f;while(b){var j=b.__interfaces;if(j&&Array.indexOf(j,h)!==y)return a[g]=c;b=b.__baseType}return a[g]=d};z.inheritsFrom=function(a){this.resolveInheritance();return b._inheritsFrom(this,a)};b._inheritsFrom=function(e,b){var d;if(b){var a=e.__baseType;while(a){if(a===b){d=c;break}a=a.__baseType}}return!!d};z.initializeBase=function(b,c){this.resolveInheritance();var a=this.__baseType;if(a)c?a.apply(b,c):a.apply(b);return b};z.isImplementedBy=function(b){if(typeof b===e||b===a)return d;var c=Object.getType(b);return!!(c.implementsInterface&&c.implementsInterface(this))};z.isInstanceOfType=function(a){return b._isInstanceOfType(this,a)};z.registerClass=function(f,e,g){var a=this,j=a.prototype;j.constructor=a;a.__typeName=f;a.__class=c;if(e){a.__baseType=e;a.__basePrototypePending=c}b.__upperCaseTypes[f.toUpperCase()]=a;if(g)for(var i=a.__interfaces=[],d=2,k=arguments.length;d<k;d++){var h=arguments[d];i.push(h)}return a};b.registerComponent=function(d,c){var f=d.getName(),e=b.UI&&(b._inheritsFrom(d,b.UI.Control)||b._inheritsFrom(d,b.UI.Behavior)),a=c&&c.name;if(!a){a=f;var g=a.lastIndexOf(j);if(g>=0){a=a.substr(g+1);if(a&&a.charAt(0)==="_")return}a=a.substr(0,1).toLowerCase()+a.substr(1)}if(!c)c={};c.name=a;c.type=d;c.typeName=f;c._isBehavior=e;c=b.components[a]=A(b.components[a],c);var i=b._getCreate(c),h=e?b.ElementSet.prototype:b.create;h[a]=i};b.registerPlugin=function(a){var e=a.name,f=a.functionName||e;b.plugins[e]=A(b.plugins[e],a);var g=a.plugin,d;if(a.global)d=b;else if(a.dom)d=b.ElementSet.prototype;else if(a.components)d=b.ComponentSet.prototype;if(d)d[f]=b._getCreate(a,c)};b._createComp=function(d,l,f){var i=d.type,h=d.parameters||[],j=d._isBehavior,m=j?f[0]:a,c=f[h.length]||{};c=A({},l,c);p(h,function(a,g){var d=typeof a===k?a:a.name,b=f[g];if(typeof b!==e&&typeof c[d]===e)c[d]=b});if(this instanceof b.ElementSet){var g=[];this.each(function(){g.push(b._create(i,c,this))});return new b.ComponentSet(this,g)}else return b._create(i,c)};b._create=function(f,g,c){var d=typeof c;if(d===k)c=b.get(c);var a;b._2Pass(function(){a=d===e?new f:new f(c);u(a,jb);b._set(a,g);var h=b.Component;if(!h||!h._register(a))u(a,"endUpdate")||u(a,T)});return a};z.registerInterface=function(d){var a=this;b.__upperCaseTypes[d.toUpperCase()]=a;a.prototype.constructor=a;a.__typeName=d;a.__interface=c;return a};z.resolveInheritance=function(){var a=this;if(a.__basePrototypePending){var e=a.__baseType;e.resolveInheritance();var c=e.prototype,d=a.prototype;for(var b in c)d[b]=d[b]||c[b];delete a.__basePrototypePending}};w.getRootNamespaces=function(){return Array.clone(b.__rootNamespaces)};w.isClass=function(a){return!!(a&&a.__class)};w.isInterface=function(a){return!!(a&&a.__interface)};w.isNamespace=function(a){return!!(a&&a.__namespace)};w.parse=function(d,f){var c;if(f){c=b.__upperCaseTypes[f.getName().toUpperCase()+j+d.toUpperCase()];return c||a}if(!d)return a;var e=Type.__htClasses;if(!e)Type.__htClasses=e={};c=e[d];if(!c){c=g.eval(d);e[d]=c}return c};w.registerNamespace=function(a){Type._registerNamespace(a)};w._registerNamespace=function(h){for(var f=g,e=h.split(j),d=0,k=e.length;d<k;d++){var i=e[d],a=f[i];if(!a)a=f[i]={};if(!a.__namespace){!d&&h!=="Sys"&&b.__rootNamespaces.push(a);a.__namespace=c;a.__typeName=e.slice(0,d+1).join(j);a.getName=function(){return this.__typeName}}f=a}};w._checkDependency=function(f,a){var g=Type._registerScript._scripts,c=g?!!g[f]:d;if(typeof a!==e&&!c)throw Error.invalidOperation(String.format(b.Res.requiredScriptReferenceNotIncluded,a,f));return c};w._registerScript=function(a,e){var d=Type._registerScript._scripts;if(!d)Type._registerScript._scripts=d={};if(d[a])throw Error.invalidOperation(String.format(b.Res.scriptAlreadyLoaded,a));d[a]=c;if(e)for(var f=0,h=e.length;f<h;f++){var g=e[f];if(!Type._checkDependency(g))throw Error.invalidOperation(String.format(b.Res.scriptDependencyNotFound,a,g));}};w._registerNamespace("Sys");b.__upperCaseTypes={};b.__rootNamespaces=[b];b._isInstanceOfType=function(g,f){if(typeof f===e||f===a)return d;if(f instanceof g)return c;var b=Object.getType(f);return!!(b===g)||b.inheritsFrom&&b.inheritsFrom(g)||b.implementsInterface&&b.implementsInterface(g)};b._getBaseMethod=function(e,f,d){var c=e.getBaseType();if(c){var b=c.prototype[d];return b instanceof Function?b:a}return a};b._isDomElement=function(a){var e=d;if(typeof a.nodeType!==i){var c=a.ownerDocument||a.document||a;if(c!=a){var f=c.defaultView||c.parentWindow;e=f!=a}else e=!c.body||!b._isDomElement(c.body)}return!e};var ib=b._isBrowser=function(a){return b.Browser.agent===b.Browser[a]};p(b._ns,w._registerNamespace);delete b._ns;w=Array;w.__typeName="Array";w.__class=c;var tb=b._indexOf=function(d,f,a){if(typeof f===e)return y;var c=d.length;if(c!==0){a=a-0;if(isNaN(a))a=0;else{if(isFinite(a))a=a-a%1;if(a<0)a=Math.max(0,c+a)}for(var b=a;b<c;b++)if(d[b]===f)return b}return y};w.add=w.enqueue=function(a,b){a[a.length]=b};w.addRange=function(a,b){a.push.apply(a,b)};w.clear=function(a){a.length=0};w.clone=function(b){return b.length===1?[b[0]]:Array.apply(a,b)};w.contains=function(a,b){return tb(a,b)>=0};w.dequeue=function(a){return a.shift()};w.forEach=function(b,f,d){for(var a=0,g=b.length;a<g;a++){var c=b[a];typeof c!==e&&f.call(d,c,a,b)}};w.indexOf=tb;w.insert=function(a,b,c){a.splice(b,0,c)};w.parse=function(a){return a?g.eval("("+a+")"):[]};w.remove=function(b,c){var a=tb(b,c);a>=0&&b.splice(a,1);return a>=0};w.removeAt=function(a,b){a.splice(b,1)};Type._registerScript._scripts={"MicrosoftAjaxCore.js":c,"MicrosoftAjaxGlobalization.js":c,"MicrosoftAjaxSerialization.js":c,"MicrosoftAjaxComponentModel.js":c,"MicrosoftAjaxHistory.js":c,"MicrosoftAjaxNetwork.js":c,"MicrosoftAjaxWebServices.js":c};w=b.IDisposable=function(){};w.registerInterface("Sys.IDisposable");w=b.StringBuilder=function(b){this._parts=typeof b!==e&&b!==a&&b!==x?[b.toString()]:[];this._value={};this._len=0};w.prototype={append:function(a){this._parts.push(a);return this},appendLine:function(b){this._parts.push(typeof b===e||b===a||b===x?"\r\n":b+"\r\n");return this},clear:function(){this._parts=[];this._value={};this._len=0},isEmpty:function(){return!this._parts.length||!this.toString()},toString:function(b){var d=this;b=b||x;var c=d._parts;if(d._len!==c.length){d._value={};d._len=c.length}var i=d._value,h=i[b];if(typeof h===e){if(b!==x)for(var f=0;f<c.length;){var g=c[f];if(typeof g===e||g===x||g===a)c.splice(f,1);else f++}i[b]=h=c.join(b)}return h}};w.registerClass("Sys.StringBuilder");var lb=navigator.userAgent,K=b.Browser={InternetExplorer:{},Firefox:{},Safari:{},Opera:{},agent:a,hasDebuggerStatement:d,name:navigator.appName,version:parseFloat(navigator.appVersion),documentMode:0};if(lb.indexOf(" MSIE ")>y){K.agent=K.InternetExplorer;K.version=parseFloat(lb.match(/MSIE (\d+\.\d+)/)[1]);if(K.version>7&&document.documentMode>6)K.documentMode=document.documentMode;K.hasDebuggerStatement=c}else if(lb.indexOf("Firefox/index.html")>y){K.agent=K.Firefox;K.version=parseFloat(lb.match(/ Firefox\/(\d+\.\d+)/)[1]);K.name=S;K.hasDebuggerStatement=c}else if(lb.indexOf("AppleWebKit/index.html")>y){K.agent=K.Safari;K.version=parseFloat(lb.match(/ AppleWebKit\/(\d+(\.\d+)?)/)[1]);K.name="Safari"}else if(lb.indexOf("Opera/index.html")>y)K.agent=K.Opera;w=b.EventArgs=function(){};w.registerClass("Sys.EventArgs");b.EventArgs.Empty=new b.EventArgs;w=b.CancelEventArgs=function(){b.CancelEventArgs.initializeBase(this);this._cancel=d};w.prototype={get_cancel:function(){return this._cancel},set_cancel:function(a){this._cancel=a}};w.registerClass("Sys.CancelEventArgs",b.EventArgs);Type.registerNamespace("Sys.UI");w=b._Debug=function(){};w.prototype={_appendConsole:function(a){typeof Debug!==e&&Debug.writeln;g.console&&g.console.log&&g.console.log(a);g.opera&&g.opera.postError(a);g.debugService&&g.debugService.trace(a)},_getTrace:function(){var c=b.get("#TraceConsole");return c&&c.tagName.toUpperCase()==="TEXTAREA"?c:a},_appendTrace:function(b){var a=this._getTrace();if(a)a.value+=b+F},"assert":function(d,a,c){if(!d){a=c&&this.assert.caller?String.format(b.Res.assertFailedCaller,a,this.assert.caller):String.format(b.Res.assertFailed,a);confirm(String.format(b.Res.breakIntoDebugger,a))&&this.fail(a)}},clearTrace:function(){var a=this._getTrace();if(a)a.value=x},fail:function(a){this._appendConsole(a);b.Browser.hasDebuggerStatement&&g.eval("debugger")},trace:function(a){this._appendConsole(a);this._appendTrace(a)},traceDump:function(a,b){this._traceDump(a,b,c)},_traceDump:function(b,l,n,c,h){var d=this;l=l||"traceDump";c=c||x;var j=c+l+": ";if(b===a){d.trace(j+U);return}switch(typeof b){case e:d.trace(j+ob);break;case i:case k:case"boolean":d.trace(j+b);break;default:if(Date.isInstanceOfType(b)||RegExp.isInstanceOfType(b)){d.trace(j+b.toString());break}if(!h)h=[];else if(Array.contains(h,b)){d.trace(j+"...");return}h.push(b);if(b==g||b===document||g.HTMLElement&&b instanceof HTMLElement||typeof b.nodeName===k){var s=b.tagName||"DomElement";if(b.id)s+=" - "+b.id;d.trace(c+l+" {"+s+"}")}else{var q=Object.getTypeName(b);d.trace(c+l+(typeof q===k?" {"+q+"}":x));if(c===x||n){c+="    ";var m,r,t,o,p;if(b instanceof Array){r=b.length;for(m=0;m<r;m++)d._traceDump(b[m],"["+m+"]",n,c,h)}else for(o in b){p=b[o];typeof p!==f&&d._traceDump(p,o,n,c,h)}}}Array.remove(h,b)}}};w.registerClass("Sys._Debug");w=b.Debug=new b._Debug;w.isDebug=d;function Hb(e,g){var d=this,c,a,m;if(g){c=d.__lowerCaseValues;if(!c){d.__lowerCaseValues=c={};var j=d.prototype;for(var l in j)c[l.toLowerCase()]=j[l]}}else c=d.prototype;function h(c){if(typeof a!==i)throw Error.argument("value",String.format(b.Res.enumInvalidValue,c,this.__typeName));}if(!d.__flags){m=g?e.toLowerCase():e;a=c[m.trim()];typeof a!==i&&h.call(d,e);return a}else{for(var k=(g?e.toLowerCase():e).split(G),n=0,f=k.length-1;f>=0;f--){var o=k[f].trim();a=c[o];typeof a!==i&&h.call(d,e.split(G)[f].trim());n|=a}return n}}function Gb(d){var f=this;if(typeof d===e||d===a)return f.__string;var g=f.prototype,b;if(!f.__flags||d===0){for(b in g)if(g[b]===d)return b}else{var c=f.__sortedValues;if(!c){c=[];for(b in g)c.push({key:b,value:g[b]});c.sort(function(a,b){return a.value-b.value});f.__sortedValues=c}var i=[],j=d;for(b=c.length-1;b>=0;b--){var k=c[b],h=k.value;if(h===0)continue;if((h&d)===h){i.push(k.key);j-=h;if(j===0)break}}if(i.length&&j===0)return i.reverse().join(", ")}return x}w=Type;w.prototype.registerEnum=function(d,f){var a=this;b.__upperCaseTypes[d.toUpperCase()]=a;for(var e in a.prototype)a[e]=a.prototype[e];a.__typeName=d;a.parse=Hb;a.__string=a.toString();a.toString=Gb;a.__flags=f;a.__enum=c};w.isEnum=function(a){return!!(a&&a.__enum)};w.isFlags=function(a){return!!(a&&a.__flags)};w=b.CollectionChange=function(g,b,e,c,f){var d=this;d.action=g;if(b)if(!(b instanceof Array))b=[b];d.newItems=b||a;if(typeof e!==i)e=y;d.newStartingIndex=e;if(c)if(!(c instanceof Array))c=[c];d.oldItems=c||a;if(typeof f!==i)f=y;d.oldStartingIndex=f};w.registerClass("Sys.CollectionChange");w=b.NotifyCollectionChangedAction=function(){};w.prototype={add:0,remove:1,reset:2};w.registerEnum("Sys.NotifyCollectionChangedAction");w=b.NotifyCollectionChangedEventArgs=function(a){this._changes=a;b.NotifyCollectionChangedEventArgs.initializeBase(this)};w.prototype={get_changes:function(){return this._changes||[]}};w.registerClass("Sys.NotifyCollectionChangedEventArgs",b.EventArgs);w=b.Observer=function(){};w.registerClass("Sys.Observer");w.makeObservable=function(a){var d=a instanceof Array,c=b.Observer;if(a.setValue===c._observeMethods.setValue)return a;c._addMethods(a,c._observeMethods);d&&c._addMethods(a,c._arrayMethods);return a};w._addMethods=function(c,a){for(var b in a)c[b]=a[b]};w._addEventHandler=function(e,a,d){b.Observer._getContext(e,c).events._addHandler(a,d)};w.addEventHandler=function(d,a,c){b.Observer._addEventHandler(d,a,c)};w._removeEventHandler=function(e,a,d){b.Observer._getContext(e,c).events._removeHandler(a,d)};w.removeEventHandler=function(d,a,c){b.Observer._removeEventHandler(d,a,c)};w.clearEventHandlers=function(d,a){b.Observer._getContext(d,c).events._removeHandlers(a)};w.raiseEvent=function(c,f,e){var d=b.Observer._getContext(c);if(!d)return;var a=d.events.getHandler(f);a&&a(c,e||b.EventArgs.Empty)};w.addPropertyChanged=function(c,a){b.Observer._addEventHandler(c,C,a)};w.removePropertyChanged=function(c,a){b.Observer._removeEventHandler(c,C,a)};w.beginUpdate=function(a){b.Observer._getContext(a,c).updating=c};w.endUpdate=function(e){var c=b.Observer._getContext(e);if(!c||!c.updating)return;c.updating=d;var g=c.dirty;c.dirty=d;if(g){if(e instanceof Array){var f=c.changes;c.changes=a;b.Observer.raiseCollectionChanged(e,f)}b.Observer.raisePropertyChanged(e,x)}};w.isUpdating=function(c){var a=b.Observer._getContext(c);return a?a.updating:d};w._setValue=function(d,o,l){for(var g,v,p=d,i=o.split(j),n=0,r=i.length-1;n<r;n++){var q=i[n];g=d[V+q];if(typeof g===f)d=g.call(d);else d=d[q];var s=typeof d;if(d===a||s===e)throw Error.invalidOperation(String.format(b.Res.nullReferenceInPath,o));}var k,h=i[r];g=d[V+h];if(typeof g===f)k=g.call(d);else k=d[h];u(d,t+h,l)||(d[h]=l);if(k!==l){var m=b.Observer._getContext(p);if(m&&m.updating){m.dirty=c;return}b.Observer.raisePropertyChanged(p,i[0])}};w.setValue=function(c,a,d){b.Observer._setValue(c,a,d)};w.raisePropertyChanged=function(c,a){b.Observer.raiseEvent(c,C,new b.PropertyChangedEventArgs(a))};w.addCollectionChanged=function(c,a){b.Observer._addEventHandler(c,J,a)};w.removeCollectionChanged=function(c,a){b.Observer._removeEventHandler(c,J,a)};w._collectionChange=function(e,d){var a=this._getContext(e);if(a&&a.updating){a.dirty=c;var b=a.changes;if(!b)a.changes=b=[d];else b.push(d)}else{this.raiseCollectionChanged(e,[d]);this.raisePropertyChanged(e,"length")}};w.add=function(a,c){var d=new b.CollectionChange(b.NotifyCollectionChangedAction.add,[c],a.length);Array.add(a,c);b.Observer._collectionChange(a,d)};w.addRange=function(a,c){var d=new b.CollectionChange(b.NotifyCollectionChangedAction.add,c,a.length);Array.addRange(a,c);b.Observer._collectionChange(a,d)};w.clear=function(c){var d=Array.clone(c);Array.clear(c);b.Observer._collectionChange(c,new b.CollectionChange(b.NotifyCollectionChangedAction.reset,a,y,d,0))};w.insert=function(a,c,d){Array.insert(a,c,d);b.Observer._collectionChange(a,new b.CollectionChange(b.NotifyCollectionChangedAction.add,[d],c))};w.remove=function(e,f){var g=Array.indexOf(e,f);if(g!==y){Array.remove(e,f);b.Observer._collectionChange(e,new b.CollectionChange(b.NotifyCollectionChangedAction.remove,a,y,[f],g));return c}return d};w.removeAt=function(d,c){if(c>y&&c<d.length){var e=d[c];Array.removeAt(d,c);b.Observer._collectionChange(d,new b.CollectionChange(b.NotifyCollectionChangedAction.remove,a,y,[e],c))}};w.raiseCollectionChanged=function(c,a){b.Observer.raiseEvent(c,J,new b.NotifyCollectionChangedEventArgs(a))};w._observeMethods={add_propertyChanged:function(a){b.Observer._addEventHandler(this,C,a)},remove_propertyChanged:function(a){b.Observer._removeEventHandler(this,C,a)},addEventHandler:function(a,c){b.Observer._addEventHandler(this,a,c)},removeEventHandler:function(a,c){b.Observer._removeEventHandler(this,a,c)},clearEventHandlers:function(a){b.Observer._getContext(this,c).events._removeHandlers(a)},get_isUpdating:function(){return b.Observer.isUpdating(this)},beginUpdate:function(){b.Observer.beginUpdate(this)},endUpdate:function(){b.Observer.endUpdate(this)},setValue:function(c,a){b.Observer._setValue(this,c,a)},raiseEvent:function(d,c){b.Observer.raiseEvent(this,d,c||a)},raisePropertyChanged:function(a){b.Observer.raiseEvent(this,C,new b.PropertyChangedEventArgs(a))}};w._arrayMethods={add_collectionChanged:function(a){b.Observer._addEventHandler(this,J,a)},remove_collectionChanged:function(a){b.Observer._removeEventHandler(this,J,a)},add:function(a){b.Observer.add(this,a)},addRange:function(a){b.Observer.addRange(this,a)},clear:function(){b.Observer.clear(this)},insert:function(a,c){b.Observer.insert(this,a,c)},remove:function(a){return b.Observer.remove(this,a)},removeAt:function(a){b.Observer.removeAt(this,a)},raiseCollectionChanged:function(a){b.Observer.raiseEvent(this,J,new b.NotifyCollectionChangedEventArgs(a))}};w._getContext=function(c,d){var b=c._observerContext;return b?b():d?(c._observerContext=this._createContext())():a};w._createContext=function(){var a={events:new b.EventHandlerList};return function(){return a}};function N(a,c,b){return a<c||a>b}function Ib(c,a){var d=new Date,e=wb(d);if(a<B){var b=yb(d,c,e);a+=b-b%B;if(a>c.Calendar.TwoDigitYearMax)a-=B}return a}function wb(f,d){if(!d)return 0;for(var c,e=f.getTime(),b=0,g=d.length;b<g;b+=4){c=d[b+2];if(c===a||e>=c)return b}return 0}function yb(d,b,e,c){var a=d.getFullYear();if(!c&&b.eras)a-=b.eras[e+3];return a}b._appendPreOrPostMatch=function(f,b){for(var e=0,a=d,c=0,h=f.length;c<h;c++){var g=f.charAt(c);switch(g){case"'":if(a)b.push("'");else e++;a=d;break;case"\\":a&&b.push("\\");a=!a;break;default:b.push(g);a=d}}return e};w=Date;w._expandFormat=function(a,c){c=c||"F";var d=c.length;if(d===1)switch(c){case"d":return a.ShortDatePattern;case"D":return a.LongDatePattern;case"t":return a.ShortTimePattern;case"T":return a.LongTimePattern;case"f":return a.LongDatePattern+h+a.ShortTimePattern;case"F":return a.FullDateTimePattern;case"M":case"m":return a.MonthDayPattern;case"s":return a.SortableDateTimePattern;case"Y":case"y":return a.YearMonthPattern;default:throw Error.format(b.Res.formatInvalidString);}else if(d===2&&c.charAt(0)==="%")c=c.charAt(1);return c};w._getParseRegExp=function(g,i){var h=g._parseRegExp;if(!h)g._parseRegExp=h={};else{var o=h[i];if(o)return o}var e=Date._expandFormat(g,i);e=e.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"\\\\$1");var d=["^"],p=[],j=0,m=0,l=Date._getTokenRegExp(),f;while((f=l.exec(e))!==a){var s=e.slice(j,f.index);j=l.lastIndex;m+=b._appendPreOrPostMatch(s,d);if(m%2){d.push(f[0]);continue}var q=f[0],t=q.length,c;switch(q){case W:case"ddd":case X:case"MMM":case"gg":case"g":c="(\\D+)";break;case"tt":case"t":c="(\\D*)";break;case Y:case"fff":case"ff":case"f":c="(\\d{"+t+"})";break;case"dd":case"d":case"MM":case"M":case"yy":case"y":case"HH":case"H":case"hh":case"h":case"mm":case"m":case"ss":case"s":c="(\\d\\d?)";break;case"zzz":c="([+-]?\\d\\d?:\\d{2})";break;case"zz":case"z":c="([+-]?\\d\\d?)";break;case D:c="(\\"+g.DateSeparator+")"}c&&d.push(c);p.push(f[0])}b._appendPreOrPostMatch(e.slice(j),d);d.push(n);var r=d.join(x).replace(/\s+/g,"\\s+"),k={regExp:r,groups:p};h[i]=k;return k};w._getTokenRegExp=function(){return/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g};w.parseLocale=function(a){return Date._parse(a,b.CultureInfo.CurrentCulture,arguments)};w.parseInvariant=function(a){return Date._parse(a,b.CultureInfo.InvariantCulture,arguments)};w._parse=function(k,g,l){var b,f,e,i,h,j=d;for(b=1,f=l.length;b<f;b++){i=l[b];if(i){j=c;e=Date._parseExact(k,i,g);if(e)return e}}if(!j){h=g._getDateTimeFormats();for(b=0,f=h.length;b<f;b++){e=Date._parseExact(k,h[b],g);if(e)return e}}return a};w._parseExact=function(w,J,s){w=w.trim();var e=s.dateTimeFormat,F=this._getParseRegExp(e,J),I=(new RegExp(F.regExp)).exec(w);if(I===a)return a;for(var H=F.groups,y=a,j=a,h=a,i=a,p=a,f=0,k,z=0,A=0,x=0,l=a,v=d,r=0,K=H.length;r<K;r++){var g=I[r+1];if(g){var G=H[r],m=G.length,c=parseInt(g,10);switch(G){case"dd":case"d":i=c;if(N(i,1,31))return a;break;case"MMM":case X:h=s._getMonthIndex(g,m===3);if(N(h,0,11))return a;break;case"M":case"MM":h=c-1;if(N(h,0,11))return a;break;case"y":case"yy":case Y:j=m<4?Ib(e,c):c;if(N(j,0,9999))return a;break;case"h":case"hh":f=c;if(f===12)f=0;if(N(f,0,11))return a;break;case"H":case"HH":f=c;if(N(f,0,23))return a;break;case"m":case"mm":z=c;if(N(z,0,59))return a;break;case"s":case"ss":A=c;if(N(A,0,59))return a;break;case"tt":case"t":var D=g.toUpperCase();v=D===e.PMDesignator.toUpperCase();if(!v&&D!==e.AMDesignator.toUpperCase())return a;break;case"f":case"ff":case"fff":x=c*Math.pow(10,3-m);if(N(x,0,999))return a;break;case"ddd":case W:p=s._getDayIndex(g,m===3);if(N(p,0,6))return a;break;case"zzz":var u=g.split(/:/);if(u.length!==2)return a;k=parseInt(u[0],10);if(N(k,-12,13))return a;var t=parseInt(u[1],10);if(N(t,0,59))return a;l=k*60+(g.startsWith(E)?-t:t);break;case"z":case"zz":k=c;if(N(k,-12,13))return a;l=k*60;break;case"g":case"gg":var o=g;if(!o||!e.eras)return a;o=o.toLowerCase().trim();for(var q=0,L=e.eras.length;q<L;q+=4)if(o===e.eras[q+1].toLowerCase()){y=q;break}if(y===a)return a}}}var b=new Date,C,n=e.Calendar.convert;C=n?n.fromGregorian(b)[0]:b.getFullYear();if(j===a)j=C;else if(e.eras)j+=e.eras[(y||0)+3];if(h===a)h=0;if(i===a)i=1;if(n){b=n.toGregorian(j,h,i);if(b===a)return a}else{b.setFullYear(j,h,i);if(b.getDate()!==i)return a;if(p!==a&&b.getDay()!==p)return a}if(v&&f<12)f+=12;b.setHours(f,z,A,x);if(l!==a){var B=b.getMinutes()-(l+b.getTimezoneOffset());b.setHours(b.getHours()+parseInt(B/60,10),B%60)}return b};z=w.prototype;z.format=function(a){return this._toFormattedString(a,b.CultureInfo.InvariantCulture)};z.localeFormat=function(a){return this._toFormattedString(a,b.CultureInfo.CurrentCulture)};z._toFormattedString=function(h,n){var d=this,e=n.dateTimeFormat,o=e.Calendar.convert;if(!h||!h.length||h==="i"){var a;if(n&&n.name.length)if(o)a=d._toFormattedString(e.FullDateTimePattern,n);else{var z=new Date(d.getTime()),K=wb(d,e.eras);z.setFullYear(yb(d,e,K));a=z.toLocaleString()}else a=d.toString();return a}var A=e.eras,w=h==="s";h=Date._expandFormat(e,h);a=[];var i,J=["0","00","000"];function g(c,a){var b=c+x;return a>1&&b.length<a?(J[a-2]+b).substr(-a):b}var l,t,C=/([^d]|^)(d|dd)([^d]|$)/g;function G(){if(l||t)return l;l=C.test(h);t=c;return l}var v=0,s=Date._getTokenRegExp(),k;if(!w&&o)k=o.fromGregorian(d);for(;c;){var I=s.lastIndex,m=s.exec(h),F=h.slice(I,m?m.index:h.length);v+=b._appendPreOrPostMatch(F,a);if(!m)break;if(v%2){a.push(m[0]);continue}function p(a,b){if(k)return k[b];switch(b){case 0:return a.getFullYear();case 1:return a.getMonth();case 2:return a.getDate()}}var y=m[0],f=y.length;switch(y){case"ddd":case W:q=f===3?e.AbbreviatedDayNames:e.DayNames;a.push(q[d.getDay()]);break;case"d":case"dd":l=c;a.push(g(p(d,2),f));break;case"MMM":case X:var u=f===3?Z:x,r=e[u+pb],q=e[u+qb],j=p(d,1);a.push(r&&G()?r[j]:q[j]);break;case"M":case"MM":a.push(g(p(d,1)+1,f));break;case"y":case"yy":case Y:j=k?k[0]:yb(d,e,wb(d,A),w);if(f<4)j=j%B;a.push(g(j,f));break;case"h":case"hh":i=d.getHours()%12;if(i===0)i=12;a.push(g(i,f));break;case"H":case"HH":a.push(g(d.getHours(),f));break;case"m":case"mm":a.push(g(d.getMinutes(),f));break;case"s":case"ss":a.push(g(d.getSeconds(),f));break;case"t":case"tt":j=d.getHours()<12?e.AMDesignator:e.PMDesignator;a.push(f===1?j.charAt(0):j);break;case"f":case"ff":case"fff":a.push(g(d.getMilliseconds(),3).substr(0,f));break;case"z":case"zz":i=d.getTimezoneOffset()/60;a.push((i<=0?H:E)+g(Math.floor(Math.abs(i)),f));break;case"zzz":i=d.getTimezoneOffset()/60;a.push((i<=0?H:E)+g(Math.floor(Math.abs(i)),2)+":"+g(Math.abs(d.getTimezoneOffset()%60),2));break;case"g":case"gg":e.eras&&a.push(e.eras[wb(d,A)+1]);break;case D:a.push(e.DateSeparator)}}return a.join(x)};String.localeFormat=function(){return String._toFormattedString(c,arguments)};var Fb={P:["Percent",["-n %","-n%","-%n"],["n %","n%","%n"],B],N:["Number",["(n)","-n","- n","n-","n -"],a,1],C:["Currency",["($n)","-$n","$-n","$n-","(n$)","-n$","n-$","n$-","-n $","-$ n","n $-","$ n-","$ -n","n- $","($ n)","(n $)"],["$n","n$","$ n","n $"],1]};b._toFormattedString=function(f,q){var i=this;if(!f||!f.length||f==="i")return q&&q.name.length?i.toLocaleString():i.toString();function o(a,c,d){for(var b=a.length;b<c;b++)a=d?"0"+a:a+"0";return a}function s(l,i,n,q,s){var k=n[0],m=1,r=Math.pow(10,i),p=Math.round(l*r)/r;if(!isFinite(p))p=l;l=p;var b=l+x,a=x,e,g=b.split(/e/i);b=g[0];e=g.length>1?parseInt(g[1]):0;g=b.split(j);b=g[0];a=g.length>1?g[1]:x;var t;if(e>0){a=o(a,e,d);b+=a.slice(0,e);a=a.substr(e)}else if(e<0){e=-e;b=o(b,e+1,c);a=b.slice(-e,b.length)+a;b=b.slice(0,-e)}if(i>0)a=s+(a.length>i?a.slice(0,i):o(a,i,d));else a=x;var f=b.length-1,h=x;while(f>=0){if(k===0||k>f)return b.slice(0,f+1)+(h.length?q+h+a:a);h=b.slice(f-k+1,f+1)+(h.length?q+h:x);f-=k;if(m<n.length){k=n[m];m++}}return b.slice(0,f+1)+q+h+a}var a=q.numberFormat,g=Math.abs(i);f=f||"D";var h=y;if(f.length>1)h=parseInt(f.slice(1),10);var m,e=f.charAt(0).toUpperCase();switch(e){case"D":m="n";if(h!==y)g=o(x+g,h,c);if(i<0)g=-g;break;case"C":case"N":case"P":e=Fb[e];var k=e[0];m=i<0?e[1][a[k+"NegativePattern"]]:e[2]?e[2][a[k+"PositivePattern"]]:"n";if(h===y)h=a[k+"DecimalDigits"];g=s(Math.abs(i)*e[3],h,a[k+"GroupSizes"],a[k+"GroupSeparator"],a[k+"DecimalSeparator"]);break;default:throw Error.format(b.Res.formatBadFormatSpecifier);}for(var r=/n|\$|-|%/g,l=x;c;){var t=r.lastIndex,p=r.exec(m);l+=m.slice(t,p?p.index:m.length);if(!p)break;switch(p[0]){case"n":l+=g;break;case n:l+=a.CurrencySymbol;break;case E:if(/[1-9]/.test(g))l+=a.NegativeSign;break;case"%":l+=a.PercentSymbol}}return l};w=Number;w.parseLocale=function(a){return Number._parse(a,b.CultureInfo.CurrentCulture)};w.parseInvariant=function(a){return Number._parse(a,b.CultureInfo.InvariantCulture)};w._parse=function(b,t){b=b.trim();if(b.match(/^[+-]?infinity$/i))return parseFloat(b);if(b.match(/^0x[a-f0-9]+$/i))return parseInt(b);var c=t.numberFormat,i=Number._parseNumberNegativePattern(b,c,c.NumberNegativePattern),k=i[0],f=i[1];if(k===x&&c.NumberNegativePattern!==1){i=Number._parseNumberNegativePattern(b,c,1);k=i[0];f=i[1]}if(k===x)k=H;var m,e,g=f.indexOf("e");if(g<0)g=f.indexOf("E");if(g<0){e=f;m=a}else{e=f.substr(0,g);m=f.substr(g+1)}var d,n,s=c.NumberDecimalSeparator,q=e.indexOf(s);if(q<0){d=e;n=a}else{d=e.substr(0,q);n=e.substr(q+s.length)}var p=c.NumberGroupSeparator;d=d.split(p).join(x);var r=p.replace(/\u00A0/g,h);if(p!==r)d=d.split(r).join(x);var o=k+d;if(n!==a)o+=j+n;if(m!==a){var l=Number._parseNumberNegativePattern(m,c,1);if(l[0]===x)l[0]=H;o+="e"+l[0]+l[1]}return o.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/)?parseFloat(o):Number.NaN};w._parseNumberNegativePattern=function(a,d,e){var b=d.NegativeSign,c=d.PositiveSign;switch(e){case 4:b=h+b;c=h+c;case 3:if(a.endsWith(b))return[E,a.substr(0,a.length-b.length)];else if(a.endsWith(c))return[H,a.substr(0,a.length-c.length)];break;case 2:b+=h;c+=h;case 1:if(a.startsWith(b))return[E,a.substr(b.length)];else if(a.startsWith(c))return[H,a.substr(c.length)];break;case 0:if(a.startsWith("(")&&a.endsWith(")"))return[E,a.substr(1,a.length-2)]}return[x,a]};z=w.prototype;z.format=function(a){return b._toFormattedString.call(this,a,b.CultureInfo.InvariantCulture)};z.localeFormat=function(a){return b._toFormattedString.call(this,a,b.CultureInfo.CurrentCulture)};function Ab(a){return a.split(" ").join(h).toUpperCase()}function xb(b){var a=[];p(b,function(b,c){a[c]=Ab(b)});return a}function Cb(c){var b={};v(c,function(c,d){b[d]=c instanceof Array?c.length===1?[c]:Array.apply(a,c):typeof c===o?Cb(c):c});return b}w=b.CultureInfo=function(c,b,a){this.name=c;this.numberFormat=b;this.dateTimeFormat=a};w.prototype={_getDateTimeFormats:function(){var b=this._dateTimeFormats;if(!b){var a=this.dateTimeFormat;this._dateTimeFormats=b=[a.MonthDayPattern,a.YearMonthPattern,a.ShortDatePattern,a.ShortTimePattern,a.LongDatePattern,a.LongTimePattern,a.FullDateTimePattern,a.RFC1123Pattern,a.SortableDateTimePattern,a.UniversalSortableDateTimePattern]}return b},_getMonthIndex:function(b,g){var a=this,c=g?"_upperAbbrMonths":"_upperMonths",e=c+"Genitive",h=a[c];if(!h){var f=g?Z:x;a[c]=xb(a.dateTimeFormat[f+qb]);a[e]=xb(a.dateTimeFormat[f+pb])}b=Ab(b);var d=tb(a[c],b);if(d<0)d=tb(a[e],b);return d},_getDayIndex:function(e,c){var a=this,b=c?"_upperAbbrDays":"_upperDays",d=a[b];if(!d)a[b]=xb(a.dateTimeFormat[(c?Z:x)+"DayNames"]);return tb(a[b],Ab(e))}};w.registerClass("Sys.CultureInfo");w._parse=function(a){var c=a.dateTimeFormat;if(c&&!c.eras)c.eras=a.eras;return new b.CultureInfo(a.name,a.numberFormat,c)};w._setup=function(){var c=this,b=g.__cultureInfo,f=["January","February","March","April","May","June","July","August","September","October","November","December",x],e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",x],h={name:x,numberFormat:{CurrencyDecimalDigits:2,CurrencyDecimalSeparator:j,CurrencyGroupSizes:[3],NumberGroupSizes:[3],PercentGroupSizes:[3],CurrencyGroupSeparator:G,CurrencySymbol:"¤",NaNSymbol:"NaN",CurrencyNegativePattern:0,NumberNegativePattern:1,PercentPositivePattern:0,PercentNegativePattern:0,NegativeInfinitySymbol:"-Infinity",NegativeSign:E,NumberDecimalDigits:2,NumberDecimalSeparator:j,NumberGroupSeparator:G,CurrencyPositivePattern:0,PositiveInfinitySymbol:"Infinity",PositiveSign:H,PercentDecimalDigits:2,PercentDecimalSeparator:j,PercentGroupSeparator:G,PercentSymbol:"%",PerMilleSymbol:"‰",NativeDigits:["0","1","2","3","4","5","6","7","8","9"],DigitSubstitution:1},dateTimeFormat:{AMDesignator:"AM",Calendar:{MinSupportedDateTime:"@-62135568000000@",MaxSupportedDateTime:"@253402300799999@",AlgorithmType:1,CalendarType:1,Eras:[1],TwoDigitYearMax:2029},DateSeparator:D,FirstDayOfWeek:0,CalendarWeekRule:0,FullDateTimePattern:"dddd, dd MMMM yyyy HH:mm:ss",LongDatePattern:"dddd, dd MMMM yyyy",LongTimePattern:"HH:mm:ss",MonthDayPattern:"MMMM dd",PMDesignator:"PM",RFC1123Pattern:"ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",ShortDatePattern:"MM/dd/yyyy",ShortTimePattern:"HH:mm",SortableDateTimePattern:"yyyy'-'MM'-'dd'T'HH':'mm':'ss",TimeSeparator:":",UniversalSortableDateTimePattern:"yyyy'-'MM'-'dd HH':'mm':'ss'Z'",YearMonthPattern:"yyyy MMMM",AbbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ShortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],DayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],AbbreviatedMonthNames:e,MonthNames:f,NativeCalendarName:"Gregorian Calendar",AbbreviatedMonthGenitiveNames:Array.clone(e),MonthGenitiveNames:Array.clone(f)},eras:[1,"A.D.",a,0]};c.InvariantCulture=c._parse(h);switch(typeof b){case k:b=g.eval("("+b+")");case o:c.CurrentCulture=c._parse(b);delete __cultureInfo;break;default:b=Cb(h);b.name="en-US";b.numberFormat.CurrencySymbol=n;var d=b.dateTimeFormat;d.FullDatePattern="dddd, MMMM dd, yyyy h:mm:ss tt";d.LongDatePattern="dddd, MMMM dd, yyyy";d.LongTimePattern="h:mm:ss tt";d.ShortDatePattern="M/d/yyyy";d.ShortTimePattern="h:mm tt";d.YearMonthPattern="MMMM, yyyy";c.CurrentCulture=c._parse(b)}};w._setup();Type.registerNamespace("Sys.Serialization");w=b.Serialization.JavaScriptSerializer=function(){};w.registerClass("Sys.Serialization.JavaScriptSerializer");w._esc={charsRegExs:{'"':/\"/g,"\\":/\\/g},chars:["\\",'"'],dateRegEx:/(^|[^\\])\"\\\/Date\((-?[0-9]+)(?:[a-zA-Z]|(?:\+|-)[0-9]{4})?\)\\\/\"/g,escapeChars:{"\\":"\\\\",'"':'\\"',"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r"},escapeRegExG:/[\"\\\x00-\x1F]/g,escapeRegEx:/[\"\\\x00-\x1F]/i,jsonRegEx:/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/g,jsonStringRegEx:/\"(\\.|[^\"\\])*\"/g};w._init=function(){for(var d=this._esc,g=d.chars,f=d.charsRegExs,e=d.escapeChars,b=0;b<32;b++){var a=String.fromCharCode(b);g[b+2]=a;f[a]=new RegExp(a,"g");e[a]=e[a]||"\\u"+("000"+b.toString(16)).slice(-4)}this._load=c};w._serializeNumberWithBuilder=function(a,c){if(!isFinite(a))throw Error.invalidOperation(b.Res.cannotSerializeNonFiniteNumbers);c.append(String(a))};w._serializeStringWithBuilder=function(a,e){e.append('"');var b=this._esc;if(b.escapeRegEx.test(a)){!this._load&&this._init();if(a.length<128)a=a.replace(b.escapeRegExG,function(a){return b.escapeChars[a]});else for(var d=0;d<34;d++){var c=b.chars[d];if(a.indexOf(c)!==y){var f=b.escapeChars[c];a=ib("Opera")||ib(S)?a.split(c).join(f):a.replace(b.charsRegExs[c],f)}}}e.append(a).append('"')};w._serializeWithBuilder=function(b,a,q,p){var h=this,g;switch(typeof b){case o:if(b)if(Number.isInstanceOfType(b))h._serializeNumberWithBuilder(b,a);else if(Boolean.isInstanceOfType(b))a.append(b);else if(String.isInstanceOfType(b))h._serializeStringWithBuilder(b,a);else if(b instanceof Array){a.append("[");for(g=0;g<b.length;++g){g&&a.append(G);h._serializeWithBuilder(b[g],a,d,p)}a.append("]")}else{if(Date.isInstanceOfType(b)){a.append('"\\/Date(').append(b.getTime()).append(')\\/"');break}var j=[],l=0;for(var m in b)if(m.charAt(0)!==n)if(m==="__type"&&l){j[l++]=j[0];j[0]=m}else j[l++]=m;q&&j.sort();a.append("{");var r;for(g=0;g<l;g++){var t=j[g],s=b[t],u=typeof s;if(u!==e&&u!==f){r&&a.append(G);h._serializeWithBuilder(t,a,q,p);a.append(":");h._serializeWithBuilder(s,a,q,p);r=c}}a.append("}")}else a.append(U);break;case i:h._serializeNumberWithBuilder(b,a);break;case k:h._serializeStringWithBuilder(b,a);break;case"boolean":a.append(b);break;default:a.append(U)}};w.serialize=function(c){var a=new b.StringBuilder;b.Serialization.JavaScriptSerializer._serializeWithBuilder(c,a,d);return a.toString()};w.deserialize=function(d,f){if(!d.length)throw Error.argument("data",b.Res.cannotDeserializeEmptyString);var h,c=b.Serialization.JavaScriptSerializer._esc;try{var e=d.replace(c.dateRegEx,"$1new Date($2)");if(f&&c.jsonRegEx.test(e.replace(c.jsonStringRegEx,x)))throw a;return g.eval("("+e+")")}catch(h){throw Error.argument("data",b.Res.cannotDeserializeInvalidJson);}};Type.registerNamespace("Sys.UI");w=b.EventHandlerList=function(){this._list={}};w.prototype={_addHandler:function(b,a){Array.add(this._getEvent(b,c),a)},addHandler:function(b,a){this._addHandler(b,a)},_removeHandler:function(c,b){var a=this._getEvent(c);if(!a)return;Array.remove(a,b)},_removeHandlers:function(b){if(!b)this._list={};else{var a=this._getEvent(b);if(!a)return;a.length=0}},removeHandler:function(b,a){this._removeHandler(b,a)},getHandler:function(c){var b=this._getEvent(c);if(!b||!b.length)return a;b=Array.clone(b);return function(c,d){for(var a=0,e=b.length;a<e;a++)b[a](c,d)}},_getEvent:function(c,d){var b=this._list[c];if(!b){if(!d)return a;this._list[c]=b=[]}return b}};w.registerClass("Sys.EventHandlerList");w=b.CommandEventArgs=function(f,c,d,e){var a=this;b.CommandEventArgs.initializeBase(a);a._commandName=f;a._commandArgument=c;a._commandSource=d;a._commandEvent=e};w.prototype={get_commandName:function(){return this._commandName||a},get_commandArgument:function(){return this._commandArgument},get_commandSource:function(){return this._commandSource||a},get_commandEvent:function(){return this._commandEvent||a}};w.registerClass("Sys.CommandEventArgs",b.CancelEventArgs);w=b.INotifyPropertyChange=function(){};w.registerInterface("Sys.INotifyPropertyChange");w=b.PropertyChangedEventArgs=function(a){b.PropertyChangedEventArgs.initializeBase(this);this._propertyName=a};w.prototype={get_propertyName:function(){return this._propertyName}};w.registerClass("Sys.PropertyChangedEventArgs",b.EventArgs);w=b.INotifyDisposing=function(){};w.registerInterface("Sys.INotifyDisposing");w=b.Component=function(){b.Application&&b.Application.registerDisposableObject(this)};w.prototype={get_events:function(){return b.Observer._getContext(this,c).events},get_id:function(){return this._id||a},set_id:function(a){this._id=a},get_isInitialized:function(){return!!this._initialized},get_isUpdating:function(){return!!this._updating},add_disposing:function(a){this._addHandler(ab,a)},remove_disposing:function(a){this._removeHandler(ab,a)},add_propertyChanged:function(a){this._addHandler(C,a)},remove_propertyChanged:function(a){this._removeHandler(C,a)},_addHandler:function(a,c){b.Observer.addEventHandler(this,a,c)},_removeHandler:function(a,c){b.Observer.removeEventHandler(this,a,c)},beginUpdate:function(){this._updating=c},dispose:function(){var a=this;b.Observer.raiseEvent(a,ab);b.Observer.clearEventHandlers(a);b.Application.unregisterDisposableObject(a);b.Application.removeComponent(a)},endUpdate:function(){var a=this;a._updating=d;!a._initialized&&a.initialize();a.updated()},initialize:function(){this._initialized=c},raisePropertyChanged:function(a){b.Observer.raisePropertyChanged(this,a)},updated:function(){}};w.registerClass("Sys.Component",a,b.IDisposable,b.INotifyPropertyChange,b.INotifyDisposing);w._setProperties=function(c,l){var e,m=Object.getType(c),h=m===Object||m===b.UI.DomElement,k=b.Component.isInstanceOfType(c)&&!c.get_isUpdating();k&&c.beginUpdate();for(var g in l){var d=l[g],i=h?a:c[V+g];if(h||typeof i!==f){var n=c[g];if(!d||typeof d!==o||h&&!n)c[g]=d;else this._setProperties(n,d)}else{var p=c[t+g];if(typeof p===f)p.apply(c,[d]);else if(d instanceof Array){e=i.apply(c);for(var j=0,q=e.length,r=d.length;j<r;j++,q++)e[q]=d[j]}else if(typeof d===o&&Object.getType(d)===Object){e=i.apply(c);this._setProperties(e,d)}}}k&&c.endUpdate()};w._setReferences=function(e,d){var a,c={};v(d,function(d,e){c[e]=a=$find(d);if(!a)throw Error.invalidOperation(String.format(b.Res.referenceNotFound,d));});b._set(e,c)};$create=w.create=function(g,d,c,h,e){var a=e?new g(e):new g;u(a,jb);d&&b.Component._setProperties(a,d);if(c)for(var f in c)a["add_"+f](c[f]);b.Component._register(a,h);return a};w._register=function(a,d,f){var g;if(b.Component.isInstanceOfType(a)){g=c;var e=b.Application;a.get_id()&&e.addComponent(a);if(e.get_isCreatingComponents()){e._createdComponents.push(a);if(d)e._addComponentToSecondPass(a,d);else!f&&a.endUpdate()}else{d&&b.Component._setReferences(a,d);!f&&a.endUpdate()}}return g};b._getComponent=function(d,c){var a=b.Application.findComponent(c);a&&d.push(a)};b._2Pass=function(d){var a=b.Application,c=!a.get_isCreatingComponents();c&&a.beginCreateComponents();p(d,function(a){a()});c&&a.endCreateComponents()};w=b.UI.MouseButton=function(){};w.prototype={leftButton:0,middleButton:1,rightButton:2};w.registerEnum("Sys.UI.MouseButton");w=b.UI.Key=function(){};w.prototype={backspace:8,tab:9,enter:13,esc:27,space:32,pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40,del:127};w.registerEnum("Sys.UI.Key");w=b.UI.Point=function(a,b){this.x=a;this.y=b};w.registerClass("Sys.UI.Point");w=b.UI.Bounds=function(d,e,c,b){var a=this;a.x=d;a.y=e;a.height=b;a.width=c};w.registerClass("Sys.UI.Bounds");w=b.UI.DomEvent=function(h){var c=this,a=h,d=c.type=a.type.toLowerCase();c.rawEvent=a;c.altKey=a.altKey;if(typeof a.button!==e)c.button=typeof a.which!==e?a.button:a.button===4?b.UI.MouseButton.middleButton:a.button===2?b.UI.MouseButton.rightButton:b.UI.MouseButton.leftButton;if(d==="keypress")c.charCode=a.charCode||a.keyCode;else if(a.keyCode&&a.keyCode===46)c.keyCode=127;else c.keyCode=a.keyCode;c.clientX=a.clientX;c.clientY=a.clientY;c.ctrlKey=a.ctrlKey;c.target=a.target||a.srcElement;if(!d.startsWith("key"))if(typeof a.offsetX!==e&&typeof a.offsetY!==e){c.offsetX=a.offsetX;c.offsetY=a.offsetY}else if(c.target&&c.target.nodeType!==3&&typeof a.clientX===i){var f=b.UI.DomElement.getLocation(c.target),g=b.UI.DomElement._getWindow(c.target);c.offsetX=(g.pageXOffset||0)+a.clientX-f.x;c.offsetY=(g.pageYOffset||0)+a.clientY-f.y}c.screenX=a.screenX;c.screenY=a.screenY;c.shiftKey=a.shiftKey};w.prototype={preventDefault:function(){var a=this.rawEvent;if(a.preventDefault)a.preventDefault();else if(g.event)a.returnValue=d},stopPropagation:function(){var a=this.rawEvent;if(a.stopPropagation)a.stopPropagation();else if(g.event)a.cancelBubble=c}};w.registerClass("Sys.UI.DomEvent");$addHandler=w.addHandler=function(f,a,c,e){b.query(f).each(function(){var f=this,i=f.nodeType;if(i===3||i===2||i===8)return;if(!f._events)f._events={};var h=f._events[a];if(!h)f._events[a]=h=[];var j=f,g;if(f.addEventListener){g=function(a){return c.call(j,new b.UI.DomEvent(a))};f.addEventListener(a,g,d)}else if(f.attachEvent){g=function(){var d,a={};try{a=b.UI.DomElement._getWindow(j).event}catch(d){}return c.call(j,new b.UI.DomEvent(a))};f.attachEvent(q+a,g)}h.push({handler:c,browserHandler:g,autoRemove:e});e&&b.UI.DomElement._onDispose(f,b.UI.DomEvent._disposeHandlers)})};b.registerPlugin({name:"addHandler",dom:c,plugin:function(c,d,a){b.UI.DomEvent.addHandler(this.get(),c,d,a);return this}});$addHandlers=w.addHandlers=function(f,c,a,e){b.query(f).each(function(){var b=this.nodeType;if(b===3||b===2||b===8)return;for(var g in c){var f=c[g];if(a)f=Function.createDelegate(a,f);$addHandler(this,g,f,e||d)}})};b.registerPlugin({name:"addHandlers",dom:c,plugin:function(d,a,c){b.UI.DomEvent.addHandlers(this.get(),d,a,c);return this}});$clearHandlers=w.clearHandlers=function(a){b.query(a).each(function(){var a=this.nodeType;if(a===3||a===2||a===8)return;b.UI.DomEvent._clearHandlers(this,d)})};b.registerPlugin({name:"clearHandlers",dom:c,plugin:function(){b.UI.DomEvent.clearHandlers(this.get());return this}});w._clearHandlers=function(c,a){b.query(c).each(function(){var b=this.nodeType;if(b===3||b===2||b===8)return;var c=this._events;if(c)for(var g in c)for(var e=c[g],d=e.length-1;d>=0;d--){var f=e[d];(!a||f.autoRemove)&&$removeHandler(this,g,f.handler)}})};w._disposeHandlers=function(){b.UI.DomEvent._clearHandlers(this,c)};$removeHandler=w.removeHandler=function(c,a,d){b.UI.DomEvent._removeHandler(c,a,d)};w._removeHandler=function(e,c,f){b.query(e).each(function(){var b=this,i=b.nodeType;if(i===3||i===2||i===8)return;for(var h=a,g=b._events[c],e=0,j=g.length;e<j;e++)if(g[e].handler===f){h=g[e].browserHandler;break}if(b.removeEventListener)b.removeEventListener(c,h,d);else b.detachEvent&&b.detachEvent(q+c,h);g.splice(e,1)})};b.registerPlugin({name:"removeHandler",dom:c,plugin:function(a,c){b.UI.DomEvent.removeHandler(this.get(),a,c);return this}});w=b.UI.DomElement=function(){};w.registerClass("Sys.UI.DomElement");w.addCssClass=function(a,c){if(!b.UI.DomElement.containsCssClass(a,c))if(a.className===x)a.className=c;else a.className+=h+c};w.containsCssClass=function(b,a){return Array.contains(b.className.split(h),a)};w.getBounds=function(a){var c=b.UI.DomElement.getLocation(a);return new b.UI.Bounds(c.x,c.y,a.offsetWidth||0,a.offsetHeight||0)};$get=w.getElementById=function(d,c){return b.get(l+d,c||a)};if(document.documentElement.getBoundingClientRect)w.getLocation=function(d){if(d.self||d.nodeType===9||d===document.documentElement||d.parentNode===d.ownerDocument.documentElement)return new b.UI.Point(0,0);var j=d.getBoundingClientRect();if(!j)return new b.UI.Point(0,0);var n,e=d.ownerDocument,i=e.documentElement,f=Math.round(j.left)+(i.scrollLeft||(e.body?e.body.scrollLeft:0)),g=Math.round(j.top)+(i.scrollTop||(e.body?e.body.scrollTop:0));if(ib(bb)){try{var h=d.ownerDocument.parentWindow.frameElement||a;if(h){h=h.frameBorder;var k=h==="0"||h==="no"?2:0;f+=k;g+=k}}catch(n){}if(b.Browser.version===7&&!document.documentMode){var l=document.body,m=l.getBoundingClientRect(),c=(m.right-m.left)/l.clientWidth;c=Math.round(c*B);c=(c-c%5)/B;if(!isNaN(c)&&c!==1){f=Math.round(f/c);g=Math.round(g/c)}}if((document.documentMode||0)<8){f-=i.clientLeft;g-=i.clientTop}}return new b.UI.Point(f,g)};else if(ib("Safari"))w.getLocation=function(e){if(e.window&&e.window===e||e.nodeType===9)return new b.UI.Point(0,0);for(var f=0,g=0,k=a,i=a,d,c=e;c;k=c,i=d,c=c.offsetParent){d=b.UI.DomElement._getCurrentStyle(c);var h=c.tagName?c.tagName.toUpperCase():a;if((c.offsetLeft||c.offsetTop)&&(h!==O||(!i||i.position!==I))){f+=c.offsetLeft;g+=c.offsetTop}if(k&&b.Browser.version>=3){f+=parseInt(d.borderLeftWidth);g+=parseInt(d.borderTopWidth)}}d=b.UI.DomElement._getCurrentStyle(e);var l=d?d.position:a;if(l!==I)for(c=e.parentNode;c;c=c.parentNode){h=c.tagName?c.tagName.toUpperCase():a;if(h!==O&&h!==cb&&(c.scrollLeft||c.scrollTop)){f-=c.scrollLeft||0;g-=c.scrollTop||0}d=b.UI.DomElement._getCurrentStyle(c);var j=d?d.position:a;if(j&&j===I)break}return new b.UI.Point(f,g)};else w.getLocation=function(f){if(f.window&&f.window===f||f.nodeType===9)return new b.UI.Point(0,0);for(var g=0,h=0,j=a,i=a,d=a,c=f;c;j=c,i=d,c=c.offsetParent){var e=c.tagName?c.tagName.toUpperCase():a;d=b.UI.DomElement._getCurrentStyle(c);if((c.offsetLeft||c.offsetTop)&&!(e===O&&(!i||i.position!==I))){g+=c.offsetLeft;h+=c.offsetTop}if(j!==a&&d){if(e!=="TABLE"&&e!=="TD"&&e!==cb){g+=parseInt(d.borderLeftWidth)||0;h+=parseInt(d.borderTopWidth)||0}if(e==="TABLE"&&(d.position==="relative"||d.position===I)){g+=parseInt(d.marginLeft)||0;h+=parseInt(d.marginTop)||0}}}d=b.UI.DomElement._getCurrentStyle(f);var k=d?d.position:a;if(k!==I)for(c=f.parentNode;c;c=c.parentNode){e=c.tagName?c.tagName.toUpperCase():a;if(e!==O&&e!==cb&&(c.scrollLeft||c.scrollTop)){g-=c.scrollLeft||0;h-=c.scrollTop||0;d=b.UI.DomElement._getCurrentStyle(c);if(d){g+=parseInt(d.borderLeftWidth)||0;h+=parseInt(d.borderTopWidth)||0}}}return new b.UI.Point(g,h)};w.isDomElement=function(a){return b._isDomElement(a)};w.removeCssClass=function(d,c){var a=h+d.className+h,b=a.indexOf(h+c+h);if(b>=0)d.className=(a.substr(0,b)+h+a.substring(b+c.length+1,a.length)).trim()};w.resolveElement=function(d,e){var c=d;if(!c)return a;if(typeof c===k)c=b.get(l+c,e);return c};w.raiseBubbleEvent=function(c,d){var b=c;while(b){var a=b.control;if(a&&a.onBubbleEvent&&a.raiseBubbleEvent){!a.onBubbleEvent(c,d)&&a._raiseBubbleEvent(c,d);return}b=b.parentNode}};w._ensureGet=function(a,c){return b.get(a,c)};w.setLocation=function(b,c,d){var a=b.style;a.position=I;a.left=c+"px";a.top=d+"px"};w.toggleCssClass=function(c,a){if(b.UI.DomElement.containsCssClass(c,a))b.UI.DomElement.removeCssClass(c,a);else b.UI.DomElement.addCssClass(c,a)};w.getVisibilityMode=function(a){return a._visibilityMode===b.UI.VisibilityMode.hide?b.UI.VisibilityMode.hide:b.UI.VisibilityMode.collapse};w.setVisibilityMode=function(a,c){b.UI.DomElement._ensureOldDisplayMode(a);if(a._visibilityMode!==c){a._visibilityMode=c;if(b.UI.DomElement.getVisible(a)===d)a.style.display=c===b.UI.VisibilityMode.hide?a._oldDisplayMode:P}};w.getVisible=function(d){var a=d.currentStyle||b.UI.DomElement._getCurrentStyle(d);return a?a.visibility!=="hidden"&&a.display!==P:c};w.setVisible=function(a,c){if(c!==b.UI.DomElement.getVisible(a)){b.UI.DomElement._ensureOldDisplayMode(a);var d=a.style;d.visibility=c?"visible":"hidden";d.display=c||a._visibilityMode===b.UI.VisibilityMode.hide?a._oldDisplayMode:P}};w.setCommand=function(d,f,a,e){b.UI.DomEvent.addHandler(d,"click",function(d){var c=e||this;b.UI.DomElement.raiseBubbleEvent(c,new b.CommandEventArgs(f,a,this,d))},c)};b.registerPlugin({name:"setCommand",dom:c,plugin:function(e,a,d){return this.addHandler("click",function(f){var c=d||this;b.UI.DomElement.raiseBubbleEvent(c,new b.CommandEventArgs(e,a,this,f))},c)}});w._ensureOldDisplayMode=function(b){if(!b._oldDisplayMode){var e=b.currentStyle||this._getCurrentStyle(b);b._oldDisplayMode=e?e.display:a;if(!b._oldDisplayMode||b._oldDisplayMode===P){var d=b.tagName,c="inline";if(/^(DIV|P|ADDRESS|BLOCKQUOTE|BODY|COL|COLGROUP|DD|DL|DT|FIELDSET|FORM|H1|H2|H3|H4|H5|H6|HR|IFRAME|LEGEND|OL|PRE|TABLE|TD|TH|TR|UL)$/i.test(d))c="block";else if(d.toUpperCase()==="LI")c="list-item";b._oldDisplayMode=c}}};w._getWindow=function(a){var b=a.ownerDocument||a.document||a;return b.defaultView||b.parentWindow};w._getCurrentStyle=function(b){if(b.nodeType===3)return a;var c=this._getWindow(b);if(b.documentElement)b=b.documentElement;var d=c&&b!==c&&c.getComputedStyle?c.getComputedStyle(b,a):b.currentStyle||b.style;return d};w._onDispose=function(a,e){var c,d=a.dispose;if(d!==b.UI.DomElement._dispose){a.dispose=b.UI.DomElement._dispose;a.__msajaxdispose=c=[];typeof d===f&&c.push(d)}else c=a.__msajaxdispose;c.push(e)};w._dispose=function(){var b=this,c=b.__msajaxdispose;if(c)for(var d=0,e=c.length;d<e;d++)c[d].apply(b);b.control&&typeof b.control.dispose===f&&b.control.dispose();b.__msajaxdispose=a;b.dispose=a};w=b.IContainer=function(){};w.registerInterface("Sys.IContainer");w=b.ApplicationLoadEventArgs=function(c,a){b.ApplicationLoadEventArgs.initializeBase(this);this._components=c;this._isPartialLoad=a};w.prototype={get_components:function(){return this._components},get_isPartialLoad:function(){return this._isPartialLoad}};w.registerClass("Sys.ApplicationLoadEventArgs",b.EventArgs);w=b._Application=function(){var a=this;b._Application.initializeBase(a);a._disposableObjects=[];a._components={};a._createdComponents=[];a._secondPassComponents=[];a._unloadHandlerDelegate=Function.createDelegate(a,a._unloadHandler);b.UI.DomEvent.addHandler(g,L,a._unloadHandlerDelegate)};w.prototype={_deleteCount:0,get_isCreatingComponents:function(){return!!this._creatingComponents},get_isDisposing:function(){return!!this._disposing},add_init:function(a){if(this._initialized)a(this,b.EventArgs.Empty);else this._addHandler(db,a)},remove_init:function(a){this._removeHandler(db,a)},add_load:function(a){this._addHandler(m,a)},remove_load:function(a){this._removeHandler(m,a)},add_unload:function(a){this._addHandler(L,a)},remove_unload:function(a){this._removeHandler(L,a)},addComponent:function(a){this._components[a.get_id()]=a},beginCreateComponents:function(){this._creatingComponents=c},dispose:function(){var a=this;if(!a._disposing){a._disposing=c;if(a._timerCookie){g.clearTimeout(a._timerCookie);delete a._timerCookie}var f=a._endRequestHandler,d=a._beginRequestHandler;if(f||d){var k=b.WebForms.PageRequestManager.getInstance();f&&k.remove_endRequest(f);d&&k.remove_beginRequest(d);delete a._endRequestHandler;delete a._beginRequestHandler}g.pageUnload&&g.pageUnload(a,b.EventArgs.Empty);b.Observer.raiseEvent(a,L);for(var i=Array.clone(a._disposableObjects),h=0,m=i.length;h<m;h++){var j=i[h];typeof j!==e&&j.dispose()}a._disposableObjects.length=0;b.UI.DomEvent.removeHandler(g,L,a._unloadHandlerDelegate);if(b._ScriptLoader){var l=b._ScriptLoader.getInstance();l&&l.dispose()}b._Application.callBaseMethod(a,eb)}},disposeElement:function(c,m){var i=this;if(c.nodeType===1){for(var h,d,b,k=c.getElementsByTagName("*"),j=k.length,l=new Array(j),e=0;e<j;e++)l[e]=k[e];for(e=j-1;e>=0;e--){var g=l[e];h=g.dispose;if(h&&typeof h===f)g.dispose();else{d=g.control;d&&typeof d.dispose===f&&d.dispose()}b=g._behaviors;b&&i._disposeComponents(b);b=g._components;if(b){i._disposeComponents(b);g._components=a}}if(!m){h=c.dispose;if(h&&typeof h===f)c.dispose();else{d=c.control;d&&typeof d.dispose===f&&d.dispose()}b=c._behaviors;b&&i._disposeComponents(b);b=c._components;if(b){i._disposeComponents(b);c._components=a}}}},endCreateComponents:function(){for(var c=this._secondPassComponents,a=0,g=c.length;a<g;a++){var f=c[a],e=f.component;b.Component._setReferences(e,f.references);e.endUpdate()}this._secondPassComponents=[];this._creatingComponents=d},findComponent:function(d,c){return c?b.IContainer.isInstanceOfType(c)?c.findComponent(d):c[d]||a:b.Application._components[d]||a},getComponents:function(){var c=[],a=this._components;for(var b in a)a.hasOwnProperty(b)&&c.push(a[b]);return c},initialize:function(){g.setTimeout(Function.createDelegate(this,this._doInitialize),0)},_doInitialize:function(){var a=this;if(!a.get_isInitialized()&&!a._disposing){b._Application.callBaseMethod(a,T);a._raiseInit();if(a.get_stateString){if(b.WebForms&&b.WebForms.PageRequestManager){var d=b.WebForms.PageRequestManager.getInstance();a._beginRequestHandler=Function.createDelegate(a,a._onPageRequestManagerBeginRequest);d.add_beginRequest(a._beginRequestHandler);a._endRequestHandler=Function.createDelegate(a,a._onPageRequestManagerEndRequest);d.add_endRequest(a._endRequestHandler)}var c=a.get_stateString();if(c!==a._currentEntry)a._navigate(c);else a._ensureHistory()}a.raiseLoad()}},notifyScriptLoaded:function(){},registerDisposableObject:function(b){if(!this._disposing){var a=this._disposableObjects,c=a.length;a[c]=b;b.__msdisposeindex=c}},raiseLoad:function(){var a=this,d=new b.ApplicationLoadEventArgs(Array.clone(a._createdComponents),!!a._loaded);a._loaded=c;b.Observer.raiseEvent(a,m,d);g.pageLoad&&g.pageLoad(a,d);a._createdComponents=[]},removeComponent:function(b){var a=b.get_id();if(a)delete this._components[a]},unregisterDisposableObject:function(a){var b=this;if(!b._disposing){var g=a.__msdisposeindex;if(typeof g===i){var c=b._disposableObjects;delete c[g];delete a.__msdisposeindex;if(++b._deleteCount>1e3){for(var d=[],f=0,h=c.length;f<h;f++){a=c[f];if(typeof a!==e){a.__msdisposeindex=d.length;d.push(a)}}b._disposableObjects=d;b._deleteCount=0}}}},_addComponentToSecondPass:function(b,a){this._secondPassComponents.push({component:b,references:a})},_disposeComponents:function(a){if(a)for(var b=a.length-1;b>=0;b--){var c=a[b];typeof c.dispose===f&&c.dispose()}},_raiseInit:function(){this.beginCreateComponents();b.Observer.raiseEvent(this,db);this.endCreateComponents()},_unloadHandler:function(){this.dispose()}};w.registerClass("Sys._Application",b.Component,b.IContainer);b.Application=new b._Application;g.$find=b.Application.findComponent;b.onReady(function(){b.Application._doInitialize()});w=b.UI.Behavior=function(a){b.UI.Behavior.initializeBase(this);this._element=a;var c=a._behaviors=a._behaviors||[];c.push(this)};w.prototype={get_element:function(){return this._element},get_id:function(){var c=b.UI.Behavior.callBaseMethod(this,"get_id");if(c)return c;var a=this._element;return!a||!a.id?x:a.id+n+this.get_name()},get_name:function(){var a=this;if(a._name)return a._name;var b=Object.getTypeName(a),c=b.lastIndexOf(j);if(c>=0)b=b.substr(c+1);if(!a._initialized)a._name=b;return b},set_name:function(a){this._name=a},initialize:function(){var a=this;b.UI.Behavior.callBaseMethod(a,T);var c=a.get_name();if(c)a._element[c]=a},dispose:function(){var c=this;b.UI.Behavior.callBaseMethod(c,eb);var d=c._element;if(d){var f=c.get_name();if(f)d[f]=a;var e=d._behaviors;Array.remove(e,c);if(!e.length)d._behaviors=a;delete c._element}}};w.registerClass("Sys.UI.Behavior",b.Component);w.getBehaviorByName=function(d,e){var c=d[e];return c&&b.UI.Behavior.isInstanceOfType(c)?c:a};w.getBehaviors=function(b){var a=b._behaviors;return a?Array.clone(a):[]};b.UI.Behavior.getBehaviorsByType=function(e,f){var a=e._behaviors,d=[];if(a)for(var b=0,g=a.length;b<g;b++){var c=a[b];f.isInstanceOfType(c)&&d.push(c)}return d};w=b.UI.VisibilityMode=function(){};w.prototype={hide:0,collapse:1};w.registerEnum("Sys.UI.VisibilityMode");w=b.UI.Control=function(c){var a=this;b.UI.Control.initializeBase(a);a._element=c;c.control=a;var d=a.get_role();d&&c.setAttribute("role",d)};w.prototype={_parent:a,_visibilityMode:b.UI.VisibilityMode.hide,get_element:function(){return this._element},get_id:function(){return this._id||(this._element?this._element.id:x)},get_parent:function(){var c=this;if(c._parent)return c._parent;if(!c._element)return a;var b=c._element.parentNode;while(b){if(b.control)return b.control;b=b.parentNode}return a},set_parent:function(a){this._parent=a},get_role:function(){return a},get_visibilityMode:function(){return b.UI.DomElement.getVisibilityMode(this._element)},set_visibilityMode:function(a){b.UI.DomElement.setVisibilityMode(this._element,a)},get_visible:function(){return b.UI.DomElement.getVisible(this._element)},set_visible:function(a){b.UI.DomElement.setVisible(this._element,a)},addCssClass:function(a){b.UI.DomElement.addCssClass(this._element,a)},dispose:function(){var c=this;b.UI.Control.callBaseMethod(c,eb);if(c._element){c._element.control=a;delete c._element}if(c._parent)delete c._parent},onBubbleEvent:function(){return d},raiseBubbleEvent:function(a,b){this._raiseBubbleEvent(a,b)},_raiseBubbleEvent:function(b,c){var a=this.get_parent();while(a){if(a.onBubbleEvent(b,c))return;a=a.get_parent()}},removeCssClass:function(a){b.UI.DomElement.removeCssClass(this._element,a)},toggleCssClass:function(a){b.UI.DomElement.toggleCssClass(this._element,a)}};w.registerClass("Sys.UI.Control",b.Component);w=b.HistoryEventArgs=function(a){b.HistoryEventArgs.initializeBase(this);this._state=a};w.prototype={get_state:function(){return this._state}};w.registerClass("Sys.HistoryEventArgs",b.EventArgs);w=b.Application;w._currentEntry=x;w._initialState=a;w._state={};z=b._Application.prototype;z.get_stateString=function(){var b=a;if(ib(S)){var d=g.location.href,c=d.indexOf(l);if(c!==y)b=d.substring(c+1);else b=x;return b}else b=g.location.hash;if(b.length&&b.charAt(0)===l)b=b.substring(1);return b};z.get_enableHistory=function(){return!!this._enableHistory};z.set_enableHistory=function(a){this._enableHistory=a};z.add_navigate=function(a){this._addHandler(fb,a)};z.remove_navigate=function(a){this._removeHandler(fb,a)};z.addHistoryPoint=function(g,j){var b=this;b._ensureHistory();var d=b._state;for(var f in g){var h=g[f];if(h===a){if(typeof d[f]!==e)delete d[f]}else d[f]=h}var i=b._serializeState(d);b._historyPointIsNew=c;b._setState(i,j);b._raiseNavigate()};z.setServerId=function(a,b){this._clientId=a;this._uniqueId=b};z.setServerState=function(a){this._ensureHistory();this._state.__s=a;this._updateHiddenField(a)};z._deserializeState=function(a){var e={};a=a||x;var b=a.indexOf("&&");if(b!==y&&b+2<a.length){e.__s=a.substr(b+2);a=a.substr(0,b)}for(var g=a.split("&"),f=0,j=g.length;f<j;f++){var d=g[f],c=d.indexOf("=");if(c!==y&&c+1<d.length){var i=d.substr(0,c),h=d.substr(c+1);e[i]=decodeURIComponent(h)}}return e};z._enableHistoryInScriptManager=function(){this._enableHistory=c};z._ensureHistory=function(){var a=this;if(!a._historyInitialized&&a._enableHistory){if(ib(bb)&&b.Browser.documentMode<8){a._historyFrame=b.get("#__historyFrame");a._ignoreIFrame=c}a._timerHandler=Function.createDelegate(a,a._onIdle);a._timerCookie=g.setTimeout(a._timerHandler,B);var d;try{a._initialState=a._deserializeState(a.get_stateString())}catch(d){}a._historyInitialized=c}};z._navigate=function(d){var a=this;a._ensureHistory();var c=a._deserializeState(d);if(a._uniqueId){var e=a._state.__s||x,b=c.__s||x;if(b!==e){a._updateHiddenField(b);__doPostBack(a._uniqueId,b);a._state=c;return}}a._setState(d);a._state=c;a._raiseNavigate()};z._onIdle=function(){var a=this;delete a._timerCookie;var b=a.get_stateString();if(b!==a._currentEntry){if(!a._ignoreTimer){a._historyPointIsNew=d;a._navigate(b)}}else a._ignoreTimer=d;a._timerCookie=g.setTimeout(a._timerHandler,B)};z._onIFrameLoad=function(b){var a=this;a._ensureHistory();if(!a._ignoreIFrame){a._historyPointIsNew=d;a._navigate(b)}a._ignoreIFrame=d};z._onPageRequestManagerBeginRequest=function(){this._ignoreTimer=c;this._originalTitle=document.title};z._onPageRequestManagerEndRequest=function(n,m){var f=this,j=m.get_dataItems()[f._clientId],i=f._originalTitle;f._originalTitle=a;var h=b.get("#__EVENTTARGET");if(h&&h.value===f._uniqueId)h.value=x;if(typeof j!==e){f.setServerState(j);f._historyPointIsNew=c}else f._ignoreTimer=d;var g=f._serializeState(f._state);if(g!==f._currentEntry){f._ignoreTimer=c;if(typeof i===k){if(!ib(bb)||b.Browser.version>7){var l=document.title;document.title=i;f._setState(g);document.title=l}else f._setState(g);f._raiseNavigate()}else{f._setState(g);f._raiseNavigate()}}};z._raiseNavigate=function(){var a=this,e=a._historyPointIsNew,d={};for(var c in a._state)if(c!=="__s")d[c]=a._state[c];var f=new b.HistoryEventArgs(d);b.Observer.raiseEvent(a,fb,f);if(!e){var h;try{if(ib(S)&&g.location.hash&&(!g.frameElement||g.top.location.hash))b.Browser.version<3.5?g.history.go(0):(location.hash=a.get_stateString())}catch(h){}}};z._serializeState=function(d){var c=[];for(var a in d){var e=d[a];if(a==="__s")var b=e;else c.push(a+"="+encodeURIComponent(e))}return c.join("&")+(b?"&&"+b:x)};z._setState=function(h,i){var f=this;if(f._enableHistory){h=h||x;if(h!==f._currentEntry){if(g.theForm){var k=g.theForm.action,m=k.indexOf(l);g.theForm.action=(m!==y?k.substring(0,m):k)+l+h}if(f._historyFrame&&f._historyPointIsNew){f._ignoreIFrame=c;var j=f._historyFrame.contentWindow.document;j.open("javascript:'<html></html>'");j.write("<html><head><title>"+(i||document.title)+'</title><script type="text/javascript">parent.Sys.Application._onIFrameLoad('+b.Serialization.JavaScriptSerializer.serialize(h)+");<\/script></head><body></body></html>");j.close()}f._ignoreTimer=d;f._currentEntry=h;if(f._historyFrame||f._historyPointIsNew){var n=f.get_stateString();if(h!==n){g.location.hash=h;f._currentEntry=f.get_stateString();if(typeof i!==e&&i!==a)document.title=i}}f._historyPointIsNew=d}}};z._updateHiddenField=function(b){if(this._clientId){var a=document.getElementById(this._clientId);if(a)a.value=b}};if(!g.XMLHttpRequest)g.XMLHttpRequest=function(){for(var e,c=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP"],b=0,d=c.length;b<d;b++)try{return new ActiveXObject(c[b])}catch(e){}return a};Type.registerNamespace("Sys.Net");w=b.Net.WebRequestExecutor=function(){this._webRequest=a;this._resultObject=a};var R=function(){};w.prototype={get_started:R,get_responseAvailable:R,get_timedOut:R,get_aborted:R,get_responseData:R,get_statusCode:R,get_statusText:R,get_xml:R,executeRequest:R,abort:R,getAllResponseHeaders:R,getResponseHeader:R,get_webRequest:function(){return this._webRequest},_set_webRequest:function(a){this._webRequest=a},get_object:function(){var a=this._resultObject;if(!a)this._resultObject=a=b.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());return a}};w.registerClass("Sys.Net.WebRequestExecutor");b.Net.XMLDOM=function(f){if(!g.DOMParser)for(var j,e=["Msxml2.DOMDocument.3.0","Msxml2.DOMDocument"],c=0,i=e.length;c<i;c++)try{var b=new ActiveXObject(e[c]);b.async=d;b.loadXML(f);b.setProperty(rb,"XPath");return b}catch(j){}else try{var h=new g.DOMParser;return h.parseFromString(f,kb)}catch(j){}return a};w=b.Net.XMLHttpExecutor=function(){var f=this;b.Net.XMLHttpExecutor.initializeBase(f);var d=f;f._onReadyStateChange=function(){if(d._xmlHttpRequest.readyState===4){try{if(typeof d._xmlHttpRequest.status===e)return}catch(f){return}d._clearTimer();d._responseAvailable=c;try{d._webRequest.completed(b.EventArgs.Empty)}finally{if(d._xmlHttpRequest){d._xmlHttpRequest.onreadystatechange=Function.emptyMethod;d._xmlHttpRequest=a}}}};f._clearTimer=function(){if(d._timer){g.clearTimeout(d._timer);d._timer=a}};f._onTimeout=function(){if(!d._responseAvailable){d._clearTimer();d._timedOut=c;var e=d._xmlHttpRequest;e.onreadystatechange=Function.emptyMethod;e.abort();d._webRequest.completed(b.EventArgs.Empty);d._xmlHttpRequest=a}}};w.prototype={get_timedOut:function(){return!!this._timedOut},get_started:function(){return!!this._started},get_responseAvailable:function(){return!!this._responseAvailable},get_aborted:function(){return!!this._aborted},executeRequest:function(){var b=this,e=b.get_webRequest();b._webRequest=e;var i=e.get_body(),h=e.get_headers(),d=new XMLHttpRequest;b._xmlHttpRequest=d;d.onreadystatechange=b._onReadyStateChange;var l=e.get_httpVerb();d.open(l,e.getResolvedUrl(),c);d.setRequestHeader("X-Requested-With","XMLHttpRequest");if(h)for(var k in h){var m=h[k];typeof m!==f&&d.setRequestHeader(k,m)}if(l.toLowerCase()==="post"){(h===a||!h[M])&&d.setRequestHeader(M,"application/x-www-form-urlencoded; charset=utf-8");if(!i)i=x}var j=e.get_timeout();if(j>0)b._timer=g.setTimeout(Function.createDelegate(b,b._onTimeout),j);d.send(i);b._started=c},getResponseHeader:function(b){var c,a;try{a=this._xmlHttpRequest.getResponseHeader(b)}catch(c){}if(!a)a=x;return a},getAllResponseHeaders:function(){return this._xmlHttpRequest.getAllResponseHeaders()},get_responseData:function(){return this._xmlHttpRequest.responseText},get_statusCode:function(){var b,a=0;try{a=this._xmlHttpRequest.status}catch(b){}return a},get_statusText:function(){return this._xmlHttpRequest.statusText},get_xml:function(){var d="parsererror",e=this._xmlHttpRequest,c=e.responseXML;if(!c||!c.documentElement){c=b.Net.XMLDOM(e.responseText);if(!c||!c.documentElement)return a}else navigator.userAgent.indexOf("MSIE")!==y&&c.setProperty(rb,"XPath");return c.documentElement.namespaceURI==="http://www.mozilla.org/newlayout/xml/parsererror.xml"&&c.documentElement.tagName===d?a:c.documentElement.firstChild&&c.documentElement.firstChild.tagName===d?a:c},abort:function(){var d=this;if(d._aborted||d._responseAvailable||d._timedOut)return;d._aborted=c;d._clearTimer();var e=d._xmlHttpRequest;if(e&&!d._responseAvailable){e.onreadystatechange=Function.emptyMethod;e.abort();d._xmlHttpRequest=a;d._webRequest.completed(b.EventArgs.Empty)}}};w.registerClass(vb,b.Net.WebRequestExecutor);w=b.Net._WebRequestManager=function(){this._defaultExecutorType=vb};w.prototype={add_invokingRequest:function(a){b.Observer.addEventHandler(this,gb,a)},remove_invokingRequest:function(a){b.Observer.removeEventHandler(this,gb,a)},add_completedRequest:function(a){b.Observer.addEventHandler(this,hb,a)},remove_completedRequest:function(a){b.Observer.removeEventHandler(this,hb,a)},get_defaultTimeout:function(){return this._defaultTimeout||0},set_defaultTimeout:function(a){this._defaultTimeout=a},get_defaultExecutorType:function(){return this._defaultExecutorType},set_defaultExecutorType:function(a){this._defaultExecutorType=a},executeRequest:function(d){var a=d.get_executor();if(!a){var i,h;try{var f=g.eval(this._defaultExecutorType);a=new f}catch(i){h=c}d.set_executor(a)}if(!a.get_aborted()){var e=new b.Net.NetworkRequestEventArgs(d);b.Observer.raiseEvent(this,gb,e);!e.get_cancel()&&a.executeRequest()}}};w.registerClass("Sys.Net._WebRequestManager");b.Net.WebRequestManager=new b.Net._WebRequestManager;w=b.Net.NetworkRequestEventArgs=function(a){b.Net.NetworkRequestEventArgs.initializeBase(this);this._webRequest=a};w.prototype={get_webRequest:function(){return this._webRequest}};w.registerClass("Sys.Net.NetworkRequestEventArgs",b.CancelEventArgs);w=b.Net.WebRequest=function(){var b=this;b._url=x;b._headers={};b._body=a;b._userContext=a;b._httpVerb=a};w.prototype={add_completed:function(a){b.Observer.addEventHandler(this,Q,a)},remove_completed:function(a){b.Observer.removeEventHandler(this,Q,a)},completed:function(e){var a=this;function d(g,f,d){var a=b.Observer._getContext(g,c).events.getHandler(d);a&&a(f,e)}d(b.Net.WebRequestManager,a._executor,hb);d(a,a._executor,Q);b.Observer.clearEventHandlers(a,Q)},get_url:function(){return this._url},set_url:function(a){this._url=a},get_headers:function(){return this._headers},get_httpVerb:function(){return this._httpVerb===a?this._body===a?"GET":"POST":this._httpVerb},set_httpVerb:function(a){this._httpVerb=a},get_body:function(){return this._body},set_body:function(a){this._body=a},get_userContext:function(){return this._userContext},set_userContext:function(a){this._userContext=a},get_executor:function(){return this._executor||a},set_executor:function(a){this._executor=a;a._set_webRequest(this)},get_timeout:function(){return this._timeout||b.Net.WebRequestManager.get_defaultTimeout()},set_timeout:function(a){this._timeout=a},getResolvedUrl:function(){return b.Net.WebRequest._resolveUrl(this._url)},invoke:function(){b.Net.WebRequestManager.executeRequest(this)}};w._resolveUrl=function(c,a){if(c&&c.indexOf("://")>0)return c;if(!a||!a.length){var e=b.get("base");if(e&&e.href&&e.href.length)a=e.href;else a=document.URL}var d=a.indexOf("?");if(d>0)a=a.substr(0,d);d=a.indexOf(l);if(d>0)a=a.substr(0,d);a=a.substr(0,a.lastIndexOf(D)+1);if(!c||!c.length)return a;if(c.charAt(0)===D){var f=a.indexOf("://"),h=a.indexOf(D,f+3);return a.substr(0,h)+c}else{var g=a.lastIndexOf(D);return a.substr(0,g+1)+c}};w._createQueryString=function(d,c,h){c=c||encodeURIComponent;var j=0,g,i,e,a=new b.StringBuilder;if(d)for(e in d){g=d[e];if(typeof g===f)continue;i=b.Serialization.JavaScriptSerializer.serialize(g);j++&&a.append("&");a.append(e);a.append("=");a.append(c(i))}if(h){j&&a.append("&");a.append(h)}return a.toString()};w._createUrl=function(c,d,e){if(!d&&!e)return c;var f=b.Net.WebRequest._createQueryString(d,a,e);return f.length?c+(c&&c.indexOf("?")>=0?"&":"?")+f:c};w.registerClass("Sys.Net.WebRequest");Type.registerNamespace("Sys.Net");w=b.Net.WebServiceProxy=function(){var a=Object.getType(this);if(a._staticInstance&&typeof a._staticInstance.get_enableJsonp===f)this._jsonp=a._staticInstance.get_enableJsonp()};w.prototype={get_timeout:function(){return this._timeout||0},set_timeout:function(a){this._timeout=a},get_defaultUserContext:function(){return typeof this._userContext===e?a:this._userContext},set_defaultUserContext:function(a){this._userContext=a},get_defaultSucceededCallback:function(){return this._succeeded||a},set_defaultSucceededCallback:function(a){this._succeeded=a},get_defaultFailedCallback:function(){return this._failed||a},set_defaultFailedCallback:function(a){this._failed=a},get_enableJsonp:function(){return!!this._jsonp},set_enableJsonp:function(a){this._jsonp=a},get_path:function(){return this._path||a},set_path:function(a){this._path=a},get_jsonpCallbackParameter:function(){return this._callbackParameter||sb},set_jsonpCallbackParameter:function(a){this._callbackParameter=a},_invoke:function(h,i,k,j,g,f,d){var c=this;g=g||c.get_defaultSucceededCallback();f=f||c.get_defaultFailedCallback();if(d===a||typeof d===e)d=c.get_defaultUserContext();return b.Net.WebServiceProxy.invoke(h,i,k,j,g,f,d,c.get_timeout(),c.get_enableJsonp(),c.get_jsonpCallbackParameter())}};w.registerClass("Sys.Net.WebServiceProxy");w.invoke=function(v,f,r,q,p,h,l,m,C,u){var o=C!==d?b.Net.WebServiceProxy._xdomain.exec(v):a,i,s=o&&o.length===3&&(o[1]!==location.protocol||o[2]!==location.host);r=s||r;if(s){u=u||sb;i="_jsonp"+b._jsonp++}if(!q)q={};var w=q;if(!r||!w)w={};var n,k=a,t=a,A=b.Net.WebRequest._createUrl(f?v+D+encodeURIComponent(f):v,w,s?u+"=Sys."+i:a);if(s){function B(){if(k===a)return;k=a;n=new b.Net.WebServiceError(c,String.format(b.Res.webServiceTimedOut,f));delete b[i];h&&h(n,l,f)}function z(c,j){if(k!==a){g.clearTimeout(k);k=a}delete b[i];i=a;if(typeof j!==e&&j!==200){if(h){n=new b.Net.WebServiceError(d,c.Message||String.format(b.Res.webServiceFailedNoMsg,f),c.StackTrace||a,c.ExceptionType||a,c);n._statusCode=j;h(n,l,f)}}else p&&p(c,l,f)}b[i]=z;m=m||b.Net.WebRequestManager.get_defaultTimeout();if(m>0)k=g.setTimeout(B,m);b._loadJsonp(A,function(){i&&z({Message:String.format(b.Res.webServiceFailedNoMsg,f)},y)});return a}var j=new b.Net.WebRequest;j.set_url(A);j.get_headers()[M]="application/json; charset=utf-8";if(!r){t=b.Serialization.JavaScriptSerializer.serialize(q);if(t==="{}")t=x}j.set_body(t);j.add_completed(E);m>0&&j.set_timeout(m);j.invoke();function E(g){if(g.get_responseAvailable()){var s,i=g.get_statusCode(),c=a,k;try{var m=g.getResponseHeader(M);k=m.startsWith("application/json");c=k?g.get_object():m.startsWith(kb)?g.get_xml():g.get_responseData()}catch(s){}var o=g.getResponseHeader("jsonerror"),j=o==="true";if(j){if(c)c=new b.Net.WebServiceError(d,c.Message,c.StackTrace,c.ExceptionType,c)}else if(k)c=!c||typeof c.d===e?c:c.d;if(i<200||i>=300||j){if(h){if(!c||!j)c=new b.Net.WebServiceError(d,String.format(b.Res.webServiceFailedNoMsg,f));c._statusCode=i;h(c,l,f)}}else p&&p(c,l,f)}else{var n=g.get_timedOut(),q=String.format(n?b.Res.webServiceTimedOut:b.Res.webServiceFailedNoMsg,f);h&&h(new b.Net.WebServiceError(n,q,x,x),l,f)}}return j};w._generateTypedConstructor=function(a){return function(b){if(b)for(var c in b)this[c]=b[c];this.__type=a}};b._jsonp=0;w._xdomain=/^\s*([a-zA-Z0-9\+\-\.]+\:)\/\/([^?#\/]+)/;b._loadJsonp=function(h,g){var c=document.createElement("script");c.type="text/javascript";c.src=h;var f=c.attachEvent;function e(){if(!f||/loaded|complete/.test(c.readyState)){if(f)c.detachEvent(s,e);else{c.removeEventListener(m,e,d);c.removeEventListener(r,e,d)}g.apply(c);c=a}}if(f)c.attachEvent(s,e);else{c.addEventListener(m,e,d);c.addEventListener(r,e,d)}b.get("head").appendChild(c)};w=b.Net.WebServiceError=function(e,f,d,b,c){var a=this;a._timedOut=e;a._message=f;a._stackTrace=d;a._exceptionType=b;a._errorObject=c;a._statusCode=y};w.prototype={get_timedOut:function(){return this._timedOut},get_statusCode:function(){return this._statusCode},get_message:function(){return this._message},get_stackTrace:function(){return this._stackTrace||x},get_exceptionType:function(){return this._exceptionType||x},get_errorObject:function(){return this._errorObject||a}};w.registerClass("Sys.Net.WebServiceError");Type.registerNamespace("Sys.Services");var mb=b.Services,ub="Service",Eb="Role",Db="Authentication",Bb="Profile";function zb(a){this._path=a}mb[Db+ub]={set_path:zb,_setAuthenticated:function(a){this._auth=a}};mb["_"+Db+ub]={};mb[Bb+ub]={set_path:zb};mb["_"+Bb+ub]={};mb.ProfileGroup=function(a){this._propertygroup=a};mb[Eb+ub]={set_path:zb};mb["_"+Eb+ub]={};b._domLoaded()}if(b.loader)b.loader.registerScript("MicrosoftAjax",a,H);else H()})(window,window.Sys);var $get,$create,$addHandler,$addHandlers,$clearHandlers;
Type.registerNamespace('Sys');Sys.Res={"argumentInteger":"Value must be an integer.","argumentType":"Object cannot be converted to the required type.","argumentNull":"Value cannot be null.","scriptAlreadyLoaded":"The script \u0027{0}\u0027 has been referenced multiple times. If referencing Microsoft AJAX scripts explicitly, set the MicrosoftAjaxMode property of the ScriptManager to Explicit.","scriptDependencyNotFound":"The script \u0027{0}\u0027 failed to load because it is dependent on script \u0027{1}\u0027.","formatBadFormatSpecifier":"Format specifier was invalid.","requiredScriptReferenceNotIncluded":"\u0027{0}\u0027 requires that you have included a script reference to \u0027{1}\u0027.","webServiceFailedNoMsg":"The server method \u0027{0}\u0027 failed.","argumentDomElement":"Value must be a DOM element.","actualValue":"Actual value was {0}.","enumInvalidValue":"\u0027{0}\u0027 is not a valid value for enum {1}.","scriptLoadFailed":"The script \u0027{0}\u0027 could not be loaded.","parameterCount":"Parameter count mismatch.","cannotDeserializeEmptyString":"Cannot deserialize empty string.","formatInvalidString":"Input string was not in a correct format.","argument":"Value does not fall within the expected range.","cannotDeserializeInvalidJson":"Cannot deserialize. The data does not correspond to valid JSON.","cannotSerializeNonFiniteNumbers":"Cannot serialize non finite numbers.","argumentUndefined":"Value cannot be undefined.","webServiceInvalidReturnType":"The server method \u0027{0}\u0027 returned an invalid type. Expected type: {1}","servicePathNotSet":"The path to the web service has not been set.","argumentTypeWithTypes":"Object of type \u0027{0}\u0027 cannot be converted to type \u0027{1}\u0027.","paramName":"Parameter name: {0}","nullReferenceInPath":"Null reference while evaluating data path: \u0027{0}\u0027.","format":"One of the identified items was in an invalid format.","assertFailedCaller":"Assertion Failed: {0}\r\nat {1}","argumentOutOfRange":"Specified argument was out of the range of valid values.","webServiceTimedOut":"The server method \u0027{0}\u0027 timed out.","notImplemented":"The method or operation is not implemented.","assertFailed":"Assertion Failed: {0}","invalidOperation":"Operation is not valid due to the current state of the object.","breakIntoDebugger":"{0}\r\n\r\nBreak into debugger?"};
// (c) 2010 CodePlex Foundation
(function(){function a(){var s="aria-hidden",k="status",j="submit",h="=",g="undefined",d=-1,f="",u="function",r="pageLoading",q="pageLoaded",p="initializeRequest",o="endRequest",n="beginRequest",m="script",l="error",t="readystatechange",i="load",a=null,c=true,b=false;Type._registerScript("MicrosoftAjaxWebForms.js",["MicrosoftAjaxCore.js","MicrosoftAjaxSerialization.js","MicrosoftAjaxNetwork.js","MicrosoftAjaxComponentModel.js"]);var e,v;Type.registerNamespace("Sys.WebForms");e=Sys.WebForms.BeginRequestEventArgs=function(d,c,b){var a=this;Sys.WebForms.BeginRequestEventArgs.initializeBase(a);a._request=d;a._postBackElement=c;a._updatePanelsToUpdate=b};e.prototype={get_postBackElement:function(){return this._postBackElement},get_request:function(){return this._request},get_updatePanelsToUpdate:function(){return this._updatePanelsToUpdate?Array.clone(this._updatePanelsToUpdate):[]}};e.registerClass("Sys.WebForms.BeginRequestEventArgs",Sys.EventArgs);e=Sys.WebForms.EndRequestEventArgs=function(e,c,d){var a=this;Sys.WebForms.EndRequestEventArgs.initializeBase(a);a._errorHandled=b;a._error=e;a._dataItems=c||{};a._response=d};e.prototype={get_dataItems:function(){return this._dataItems},get_error:function(){return this._error},get_errorHandled:function(){return this._errorHandled},set_errorHandled:function(a){this._errorHandled=a},get_response:function(){return this._response}};e.registerClass("Sys.WebForms.EndRequestEventArgs",Sys.EventArgs);e=Sys.WebForms.InitializeRequestEventArgs=function(d,c,b){var a=this;Sys.WebForms.InitializeRequestEventArgs.initializeBase(a);a._request=d;a._postBackElement=c;a._updatePanelsToUpdate=b};e.prototype={get_postBackElement:function(){return this._postBackElement},get_request:function(){return this._request},get_updatePanelsToUpdate:function(){return this._updatePanelsToUpdate?Array.clone(this._updatePanelsToUpdate):[]},set_updatePanelsToUpdate:function(a){this._updated=c;this._updatePanelsToUpdate=a}};e.registerClass("Sys.WebForms.InitializeRequestEventArgs",Sys.CancelEventArgs);e=Sys.WebForms.PageLoadedEventArgs=function(c,b,d){var a=this;Sys.WebForms.PageLoadedEventArgs.initializeBase(a);a._panelsUpdated=c;a._panelsCreated=b;a._dataItems=d||{}};e.prototype={get_dataItems:function(){return this._dataItems},get_panelsCreated:function(){return this._panelsCreated},get_panelsUpdated:function(){return this._panelsUpdated}};e.registerClass("Sys.WebForms.PageLoadedEventArgs",Sys.EventArgs);e=Sys.WebForms.PageLoadingEventArgs=function(c,b,d){var a=this;Sys.WebForms.PageLoadingEventArgs.initializeBase(a);a._panelsUpdating=c;a._panelsDeleting=b;a._dataItems=d||{}};e.prototype={get_dataItems:function(){return this._dataItems},get_panelsDeleting:function(){return this._panelsDeleting},get_panelsUpdating:function(){return this._panelsUpdating}};e.registerClass("Sys.WebForms.PageLoadingEventArgs",Sys.EventArgs);e=Sys._ScriptLoaderTask=function(b,a){this._scriptElement=b;this._completedCallback=a};e.prototype={get_scriptElement:function(){return this._scriptElement},dispose:function(){var b=this;if(b._disposed)return;b._disposed=c;b._removeScriptElementHandlers();Sys._ScriptLoaderTask._clearScript(b._scriptElement);b._scriptElement=a},execute:function(){this._addScriptElementHandlers();document.getElementsByTagName("head")[0].appendChild(this._scriptElement)},_addScriptElementHandlers:function(){var a=this;a._scriptLoadDelegate=Function.createDelegate(a,a._scriptLoadHandler);if(document.addEventListener){a._scriptElement.readyState="loaded";$addHandler(a._scriptElement,i,a._scriptLoadDelegate)}else $addHandler(a._scriptElement,t,a._scriptLoadDelegate);if(a._scriptElement.addEventListener){a._scriptErrorDelegate=Function.createDelegate(a,a._scriptErrorHandler);a._scriptElement.addEventListener(l,a._scriptErrorDelegate,b)}},_removeScriptElementHandlers:function(){var c=this;if(c._scriptLoadDelegate){var d=c.get_scriptElement();if(document.addEventListener)$removeHandler(d,i,c._scriptLoadDelegate);else $removeHandler(d,t,c._scriptLoadDelegate);if(c._scriptErrorDelegate){c._scriptElement.removeEventListener(l,c._scriptErrorDelegate,b);c._scriptErrorDelegate=a}c._scriptLoadDelegate=a}},_scriptErrorHandler:function(){if(this._disposed)return;this._completedCallback(this.get_scriptElement(),b)},_scriptLoadHandler:function(){if(this._disposed)return;var a=this.get_scriptElement();if(a.readyState!=="loaded"&&a.readyState!=="complete")return;this._completedCallback(a,c)}};e.registerClass("Sys._ScriptLoaderTask",a,Sys.IDisposable);e._clearScript=function(a){!Sys.Debug.isDebug&&a.parentNode.removeChild(a)};e=Sys._ScriptLoader=function(){var b=this;b._scriptsToLoad=a;b._sessions=[];b._scriptLoadedDelegate=Function.createDelegate(b,b._scriptLoadedHandler)};e.prototype={dispose:function(){var c=this;c._stopSession();c._loading=b;if(c._events)delete c._events;c._sessions=a;c._currentSession=a;c._scriptLoadedDelegate=a},loadScripts:function(f,d,e,c){var b=this,g={allScriptsLoadedCallback:d,scriptLoadFailedCallback:e,scriptLoadTimeoutCallback:c,scriptsToLoad:b._scriptsToLoad,scriptTimeout:f};b._scriptsToLoad=a;b._sessions.push(g);!b._loading&&b._nextSession()},queueCustomScriptTag:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,a)},queueScriptBlock:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{text:a})},queueScriptReference:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{src:a})},_createScriptElement:function(b){var a=document.createElement(m);a.type="text/javascript";for(var c in b)a[c]=b[c];return a},_loadScriptsInternal:function(){var a=this,c=a._currentSession;if(c.scriptsToLoad&&c.scriptsToLoad.length>0){var d=Array.dequeue(c.scriptsToLoad),b=a._createScriptElement(d);if(b.text&&Sys.Browser.agent===Sys.Browser.Safari){b.innerHTML=b.text;delete b.text}if(typeof d.src==="string"){a._currentTask=new Sys._ScriptLoaderTask(b,a._scriptLoadedDelegate);a._currentTask.execute()}else{document.getElementsByTagName("head")[0].appendChild(b);Sys._ScriptLoaderTask._clearScript(b);a._loadScriptsInternal()}}else{a._stopSession();var e=c.allScriptsLoadedCallback;e&&e(a);a._nextSession()}},_nextSession:function(){var d=this;if(d._sessions.length===0){d._loading=b;d._currentSession=a;return}d._loading=c;var e=Array.dequeue(d._sessions);d._currentSession=e;if(e.scriptTimeout>0)d._timeoutCookie=window.setTimeout(Function.createDelegate(d,d._scriptLoadTimeoutHandler),e.scriptTimeout*1e3);d._loadScriptsInternal()},_raiseError:function(){var a=this,d=a._currentSession.scriptLoadFailedCallback,c=a._currentTask.get_scriptElement();a._stopSession();if(d){d(a,c);a._nextSession()}else{a._loading=b;throw Sys._ScriptLoader._errorScriptLoadFailed(c.src);}},_scriptLoadedHandler:function(c,d){var b=this;if(d){Array.add(Sys._ScriptLoader._getLoadedScripts(),c.src);b._currentTask.dispose();b._currentTask=a;b._loadScriptsInternal()}else b._raiseError()},_scriptLoadTimeoutHandler:function(){var a=this,b=a._currentSession.scriptLoadTimeoutCallback;a._stopSession();b&&b(a);a._nextSession()},_stopSession:function(){var b=this;if(b._timeoutCookie){window.clearTimeout(b._timeoutCookie);b._timeoutCookie=a}if(b._currentTask){b._currentTask.dispose();b._currentTask=a}}};e.registerClass("Sys._ScriptLoader",a,Sys.IDisposable);e.getInstance=function(){var a=Sys._ScriptLoader._activeInstance;if(!a)a=Sys._ScriptLoader._activeInstance=new Sys._ScriptLoader;return a};e.isScriptLoaded=function(b){var a=document.createElement(m);a.src=b;return Array.contains(Sys._ScriptLoader._getLoadedScripts(),a.src)};e.readLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts)for(var c=Sys._ScriptLoader._referencedScripts=[],d=document.getElementsByTagName(m),b=d.length-1;b>=0;b--){var e=d[b],a=e.src;if(a.length)!Array.contains(c,a)&&Array.add(c,a)}};e._errorScriptLoadFailed=function(b){var a;a=Sys.Res.scriptLoadFailed;var d="Sys.ScriptLoadFailedException: "+String.format(a,b),c=Error.create(d,{name:"Sys.ScriptLoadFailedException",scriptUrl:b});c.popStackFrame();return c};e._getLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){Sys._ScriptLoader._referencedScripts=[];Sys._ScriptLoader.readLoadedScripts()}return Sys._ScriptLoader._referencedScripts};e=Sys.WebForms.PageRequestManager=function(){var c=this;c._form=a;c._activeDefaultButton=a;c._activeDefaultButtonClicked=b;c._updatePanelIDs=a;c._updatePanelClientIDs=a;c._updatePanelHasChildrenAsTriggers=a;c._asyncPostBackControlIDs=a;c._asyncPostBackControlClientIDs=a;c._postBackControlIDs=a;c._postBackControlClientIDs=a;c._scriptManagerID=a;c._pageLoadedHandler=a;c._additionalInput=a;c._onsubmit=a;c._onSubmitStatements=[];c._originalDoPostBack=a;c._originalDoPostBackWithOptions=a;c._originalFireDefaultButton=a;c._originalDoCallback=a;c._isCrossPost=b;c._postBackSettings=a;c._request=a;c._onFormSubmitHandler=a;c._onFormElementClickHandler=a;c._onWindowUnloadHandler=a;c._asyncPostBackTimeout=a;c._controlIDToFocus=a;c._scrollPosition=a;c._processingRequest=b;c._scriptDisposes={};c._transientFields=["__VIEWSTATEENCRYPTED","__VIEWSTATEFIELDCOUNT"]};e.prototype={get_isInAsyncPostBack:function(){return this._request!==a},add_beginRequest:function(a){Sys.Observer.addEventHandler(this,n,a)},remove_beginRequest:function(a){Sys.Observer.removeEventHandler(this,n,a)},add_endRequest:function(a){Sys.Observer.addEventHandler(this,o,a)},remove_endRequest:function(a){Sys.Observer.removeEventHandler(this,o,a)},add_initializeRequest:function(a){Sys.Observer.addEventHandler(this,p,a)},remove_initializeRequest:function(a){Sys.Observer.removeEventHandler(this,p,a)},add_pageLoaded:function(a){Sys.Observer.addEventHandler(this,q,a)},remove_pageLoaded:function(a){Sys.Observer.removeEventHandler(this,q,a)},add_pageLoading:function(a){Sys.Observer.addEventHandler(this,r,a)},remove_pageLoading:function(a){Sys.Observer.removeEventHandler(this,r,a)},abortPostBack:function(){var b=this;if(!b._processingRequest&&b._request){b._request.get_executor().abort();b._request=a}},beginAsyncPostBack:function(h,e,k,i,j){var d=this;if(i&&typeof Page_ClientValidate===u&&!Page_ClientValidate(j||a))return;d._postBackSettings=d._createPostBackSettings(c,h,e);var g=d._form;g.__EVENTTARGET.value=e||f;g.__EVENTARGUMENT.value=k||f;d._isCrossPost=b;d._additionalInput=a;d._onFormSubmit()},_cancelPendingCallbacks:function(){for(var b=0,g=window.__pendingCallbacks.length;b<g;b++){var e=window.__pendingCallbacks[b];if(e){if(!e.async)window.__synchronousCallBackIndex=d;window.__pendingCallbacks[b]=a;var f="__CALLBACKFRAME"+b,c=document.getElementById(f);c&&c.parentNode.removeChild(c)}}},_commitControls:function(b,d){var c=this;if(b){c._updatePanelIDs=b.updatePanelIDs;c._updatePanelClientIDs=b.updatePanelClientIDs;c._updatePanelHasChildrenAsTriggers=b.updatePanelHasChildrenAsTriggers;c._asyncPostBackControlIDs=b.asyncPostBackControlIDs;c._asyncPostBackControlClientIDs=b.asyncPostBackControlClientIDs;c._postBackControlIDs=b.postBackControlIDs;c._postBackControlClientIDs=b.postBackControlClientIDs}if(typeof d!==g&&d!==a)c._asyncPostBackTimeout=d*1e3},_createHiddenField:function(d,e){var b,a=document.getElementById(d);if(a)if(!a._isContained)a.parentNode.removeChild(a);else b=a.parentNode;if(!b){b=document.createElement("span");b.style.cssText="display:none !important";this._form.appendChild(b)}b.innerHTML="<input type='hidden' />";a=b.childNodes[0];a._isContained=c;a.id=a.name=d;a.value=e},_createPageRequestManagerTimeoutError:function(){var b="Sys.WebForms.PageRequestManagerTimeoutException: "+Sys.WebForms.Res.PRM_TimeoutError,a=Error.create(b,{name:"Sys.WebForms.PageRequestManagerTimeoutException"});a.popStackFrame();return a},_createPageRequestManagerServerError:function(a,d){var c="Sys.WebForms.PageRequestManagerServerErrorException: "+(d||String.format(Sys.WebForms.Res.PRM_ServerError,a)),b=Error.create(c,{name:"Sys.WebForms.PageRequestManagerServerErrorException",httpStatusCode:a});b.popStackFrame();return b},_createPageRequestManagerParserError:function(b){var c="Sys.WebForms.PageRequestManagerParserErrorException: "+String.format(Sys.WebForms.Res.PRM_ParserError,b),a=Error.create(c,{name:"Sys.WebForms.PageRequestManagerParserErrorException"});a.popStackFrame();return a},_createPanelID:function(e,b){var c=b.asyncTarget,a=this._ensureUniqueIds(e||b.panelsToUpdate),d=a instanceof Array?a.join(","):a||this._scriptManagerID;if(c)d+="|"+c;return encodeURIComponent(this._scriptManagerID)+h+encodeURIComponent(d)+"&"},_createPostBackSettings:function(d,a,c,b){return{async:d,asyncTarget:c,panelsToUpdate:a,sourceElement:b}},_convertToClientIDs:function(a,g,e,d){if(a)for(var b=0,i=a.length;b<i;b+=d?2:1){var c=a[b],h=(d?a[b+1]:f)||this._uniqueIDToClientID(c);Array.add(g,c);Array.add(e,h)}},dispose:function(){var b=this;Sys.Observer.clearEventHandlers(b);if(b._form){Sys.UI.DomEvent.removeHandler(b._form,j,b._onFormSubmitHandler);Sys.UI.DomEvent.removeHandler(b._form,"click",b._onFormElementClickHandler);Sys.UI.DomEvent.removeHandler(window,"unload",b._onWindowUnloadHandler);Sys.UI.DomEvent.removeHandler(window,i,b._pageLoadedHandler)}if(b._originalDoPostBack){window.__doPostBack=b._originalDoPostBack;b._originalDoPostBack=a}if(b._originalDoPostBackWithOptions){window.WebForm_DoPostBackWithOptions=b._originalDoPostBackWithOptions;b._originalDoPostBackWithOptions=a}if(b._originalFireDefaultButton){window.WebForm_FireDefaultButton=b._originalFireDefaultButton;b._originalFireDefaultButton=a}if(b._originalDoCallback){window.WebForm_DoCallback=b._originalDoCallback;b._originalDoCallback=a}b._form=a;b._updatePanelIDs=a;b._updatePanelClientIDs=a;b._asyncPostBackControlIDs=a;b._asyncPostBackControlClientIDs=a;b._postBackControlIDs=a;b._postBackControlClientIDs=a;b._asyncPostBackTimeout=a;b._scrollPosition=a},_doCallback:function(d,b,c,f,a,e){!this.get_isInAsyncPostBack()&&this._originalDoCallback(d,b,c,f,a,e)},_doPostBack:function(e,l){var d=this;d._additionalInput=a;var j=d._form;if(e===a||typeof e===g||d._isCrossPost){d._postBackSettings=d._createPostBackSettings(b);d._isCrossPost=b}else{var f=d._masterPageUniqueID,k=d._uniqueIDToClientID(e),i=document.getElementById(k);if(!i&&f)if(k.indexOf(f+"$")===0)i=document.getElementById(k.substr(f.length+1));if(!i)if(Array.contains(d._asyncPostBackControlIDs,e))d._postBackSettings=d._createPostBackSettings(c,a,e);else if(Array.contains(d._postBackControlIDs,e))d._postBackSettings=d._createPostBackSettings(b);else{var h=d._findNearestElement(e);if(h)d._postBackSettings=d._getPostBackSettings(h,e);else{if(f){f+="$";if(e.indexOf(f)===0)h=d._findNearestElement(e.substr(f.length))}if(h)d._postBackSettings=d._getPostBackSettings(h,e);else d._postBackSettings=d._createPostBackSettings(b)}}else d._postBackSettings=d._getPostBackSettings(i,e)}if(!d._postBackSettings.async){j.onsubmit=d._onsubmit;d._originalDoPostBack(e,l);j.onsubmit=a;return}j.__EVENTTARGET.value=e;j.__EVENTARGUMENT.value=l;d._onFormSubmit()},_doPostBackWithOptions:function(a){this._isCrossPost=a&&a.actionUrl;this._originalDoPostBackWithOptions(a)},_elementContains:function(d,a){while(a){if(a===d)return c;a=a.parentNode}return b},_endPostBack:function(d,f,g){var c=this;if(c._request===f.get_webRequest()){c._processingRequest=b;c._additionalInput=a;c._request=a}var e=new Sys.WebForms.EndRequestEventArgs(d,g?g.dataItems:{},f);Sys.Observer.raiseEvent(c,o,e);if(d&&!e.get_errorHandled())throw d;},_ensureUniqueIds:function(a){if(!a)return a;a=a instanceof Array?a:[a];for(var c=[],b=0,g=a.length;b<g;b++){var f=a[b],e=Array.indexOf(this._updatePanelClientIDs,f);c.push(e>d?this._updatePanelIDs[e]:f)}return c},_findNearestElement:function(b){while(b.length>0){var f=this._uniqueIDToClientID(b),e=document.getElementById(f);if(e)return e;var c=b.lastIndexOf("$");if(c===d)return a;b=b.substring(0,c)}return a},_findText:function(b,a){var c=Math.max(0,a-20),d=Math.min(b.length,a+20);return b.substring(c,d)},_fireDefaultButton:function(d,h){if(d.keyCode===13){var f=d.srcElement||d.target;if(!f||f.tagName.toLowerCase()!=="textarea"){var e=document.getElementById(h);if(e&&typeof e.click!==g){this._activeDefaultButton=e;this._activeDefaultButtonClicked=b;try{e.click()}finally{this._activeDefaultButton=a}d.cancelBubble=c;typeof d.stopPropagation===u&&d.stopPropagation();return b}}}return c},_getPageLoadedEventArgs:function(r,g){var q=[],p=[],o=g?g.version4:b,h=g?g.updatePanelData:a,i,k,l,e;if(!h){i=this._updatePanelIDs;k=this._updatePanelClientIDs;l=a;e=a}else{i=h.updatePanelIDs;k=h.updatePanelClientIDs;l=h.childUpdatePanelIDs;e=h.panelsToRefreshIDs}var c,j,n,m;if(e)for(c=0,j=e.length;c<j;c+=o?2:1){n=e[c];m=(o?e[c+1]:f)||this._uniqueIDToClientID(n);Array.add(q,document.getElementById(m))}for(c=0,j=i.length;c<j;c++)(r||Array.indexOf(l,i[c])!==d)&&Array.add(p,document.getElementById(k[c]));return new Sys.WebForms.PageLoadedEventArgs(q,p,g?g.dataItems:{})},_getPageLoadingEventArgs:function(h){var l=[],k=[],c=h.updatePanelData,m=c.oldUpdatePanelIDs,n=c.oldUpdatePanelClientIDs,p=c.updatePanelIDs,o=c.childUpdatePanelIDs,e=c.panelsToRefreshIDs,a,g,b,i,j=h.version4;for(a=0,g=e.length;a<g;a+=j?2:1){b=e[a];i=(j?e[a+1]:f)||this._uniqueIDToClientID(b);Array.add(l,document.getElementById(i))}for(a=0,g=m.length;a<g;a++){b=m[a];Array.indexOf(e,b)===d&&(Array.indexOf(p,b)===d||Array.indexOf(o,b)>d)&&Array.add(k,document.getElementById(n[a]))}return new Sys.WebForms.PageLoadingEventArgs(l,k,h.dataItems)},_getPostBackSettings:function(f,h){var e=this,i=f,g=a;while(f){if(f.id){if(!g&&Array.contains(e._asyncPostBackControlClientIDs,f.id))g=e._createPostBackSettings(c,a,h,i);else if(!g&&Array.contains(e._postBackControlClientIDs,f.id))return e._createPostBackSettings(b);else{var j=Array.indexOf(e._updatePanelClientIDs,f.id);if(j!==d)return e._updatePanelHasChildrenAsTriggers[j]?e._createPostBackSettings(c,[e._updatePanelIDs[j]],h,i):e._createPostBackSettings(c,a,h,i)}if(!g&&e._matchesParentIDInList(f.id,e._asyncPostBackControlClientIDs))g=e._createPostBackSettings(c,a,h,i);else if(!g&&e._matchesParentIDInList(f.id,e._postBackControlClientIDs))return e._createPostBackSettings(b)}f=f.parentNode}return!g?e._createPostBackSettings(b):g},_getScrollPosition:function(){var b=this,a=document.documentElement;if(a&&(b._validPosition(a.scrollLeft)||b._validPosition(a.scrollTop)))return{x:a.scrollLeft,y:a.scrollTop};else{a=document.body;return a&&(b._validPosition(a.scrollLeft)||b._validPosition(a.scrollTop))?{x:a.scrollLeft,y:a.scrollTop}:b._validPosition(window.pageXOffset)||b._validPosition(window.pageYOffset)?{x:window.pageXOffset,y:window.pageYOffset}:{x:0,y:0}}},_initializeInternal:function(k,l,d,e,h,f,g){var b=this;if(b._prmInitialized)throw Error.invalidOperation(Sys.WebForms.Res.PRM_CannotRegisterTwice);b._prmInitialized=c;b._masterPageUniqueID=g;b._scriptManagerID=k;b._form=Sys.UI.DomElement.resolveElement(l);b._onsubmit=b._form.onsubmit;b._form.onsubmit=a;b._onFormSubmitHandler=Function.createDelegate(b,b._onFormSubmit);b._onFormElementClickHandler=Function.createDelegate(b,b._onFormElementClick);b._onWindowUnloadHandler=Function.createDelegate(b,b._onWindowUnload);Sys.UI.DomEvent.addHandler(b._form,j,b._onFormSubmitHandler);Sys.UI.DomEvent.addHandler(b._form,"click",b._onFormElementClickHandler);Sys.UI.DomEvent.addHandler(window,"unload",b._onWindowUnloadHandler);b._originalDoPostBack=window.__doPostBack;if(b._originalDoPostBack)window.__doPostBack=Function.createDelegate(b,b._doPostBack);b._originalDoPostBackWithOptions=window.WebForm_DoPostBackWithOptions;if(b._originalDoPostBackWithOptions)window.WebForm_DoPostBackWithOptions=Function.createDelegate(b,b._doPostBackWithOptions);b._originalFireDefaultButton=window.WebForm_FireDefaultButton;if(b._originalFireDefaultButton)window.WebForm_FireDefaultButton=Function.createDelegate(b,b._fireDefaultButton);b._originalDoCallback=window.WebForm_DoCallback;if(b._originalDoCallback)window.WebForm_DoCallback=Function.createDelegate(b,b._doCallback);b._pageLoadedHandler=Function.createDelegate(b,b._pageLoadedInitialLoad);Sys.UI.DomEvent.addHandler(window,i,b._pageLoadedHandler);d&&b._updateControls(d,e,h,f,c)},_matchesParentIDInList:function(e,d){for(var a=0,f=d.length;a<f;a++)if(e.startsWith(d[a]+"_"))return c;return b},_onFormElementActive:function(a,e,f){var b=this;if(a.disabled)return;b._postBackSettings=b._getPostBackSettings(a,a.name);if(a.name){var c=a.tagName.toUpperCase();if(c==="INPUT"){var d=a.type;if(d===j)b._additionalInput=encodeURIComponent(a.name)+h+encodeURIComponent(a.value);else if(d==="image")b._additionalInput=encodeURIComponent(a.name)+".x="+e+"&"+encodeURIComponent(a.name)+".y="+f}else if(c==="BUTTON"&&a.name.length!==0&&a.type===j)b._additionalInput=encodeURIComponent(a.name)+h+encodeURIComponent(a.value)}},_onFormElementClick:function(a){this._activeDefaultButtonClicked=a.target===this._activeDefaultButton;this._onFormElementActive(a.target,a.offsetX,a.offsetY)},_onFormSubmit:function(r){var e=this,m,C,q=c,D=e._isCrossPost;e._isCrossPost=b;if(e._onsubmit)q=e._onsubmit();if(q)for(m=0,C=e._onSubmitStatements.length;m<C;m++)if(!e._onSubmitStatements[m]()){q=b;break}if(!q){r&&r.preventDefault();return}var w=e._form;if(D)return;e._activeDefaultButton&&!e._activeDefaultButtonClicked&&e._onFormElementActive(e._activeDefaultButton,0,0);if(!e._postBackSettings||!e._postBackSettings.async)return;var f=new Sys.StringBuilder,F=w.elements.length,z=e._createPanelID(a,e._postBackSettings);f.append(z);for(m=0;m<F;m++){var l=w.elements[m],o=l.name;if(typeof o===g||o===a||o.length===0||o===e._scriptManagerID)continue;var v=l.tagName.toUpperCase();if(v==="INPUT"){var t=l.type;if(t==="text"||t==="password"||t==="hidden"||(t==="checkbox"||t==="radio")&&l.checked){f.append(encodeURIComponent(o));f.append(h);f.append(encodeURIComponent(l.value));f.append("&")}}else if(v==="SELECT")for(var E=l.options.length,x=0;x<E;x++){var A=l.options[x];if(A.selected){f.append(encodeURIComponent(o));f.append(h);f.append(encodeURIComponent(A.value));f.append("&")}}else if(v==="TEXTAREA"){f.append(encodeURIComponent(o));f.append(h);f.append(encodeURIComponent(l.value));f.append("&")}}f.append("__ASYNCPOST=true&");if(e._additionalInput){f.append(e._additionalInput);e._additionalInput=a}var i=new Sys.Net.WebRequest,j=w.action;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var y=j.indexOf("#");if(y!==d)j=j.substr(0,y);var u=j.indexOf("?");if(u!==d){var B=j.substr(0,u);if(B.indexOf("%")===d)j=encodeURI(B)+j.substr(u)}else if(j.indexOf("%")===d)j=encodeURI(j)}i.set_url(j);i.get_headers()["X-MicrosoftAjax"]="Delta=true";i.get_headers()["Cache-Control"]="no-cache";i.set_timeout(e._asyncPostBackTimeout);i.add_completed(Function.createDelegate(e,e._onFormSubmitCompleted));i.set_body(f.toString());var s,k;s=e._postBackSettings.panelsToUpdate;k=new Sys.WebForms.InitializeRequestEventArgs(i,e._postBackSettings.sourceElement,s);Sys.Observer.raiseEvent(e,p,k);q=!k.get_cancel();if(!q){r&&r.preventDefault();return}if(k&&k._updated){s=k.get_updatePanelsToUpdate();i.set_body(i.get_body().replace(z,e._createPanelID(s,e._postBackSettings)))}e._scrollPosition=e._getScrollPosition();e.abortPostBack();k=new Sys.WebForms.BeginRequestEventArgs(i,e._postBackSettings.sourceElement,s||e._postBackSettings.panelsToUpdate);Sys.Observer.raiseEvent(e,n,k);e._originalDoCallback&&e._cancelPendingCallbacks();e._request=i;e._processingRequest=b;i.invoke();r&&r.preventDefault()},_onFormSubmitCompleted:function(h){var d=this;d._processingRequest=c;if(h.get_timedOut()){d._endPostBack(d._createPageRequestManagerTimeoutError(),h,a);return}if(h.get_aborted()){d._endPostBack(a,h,a);return}if(!d._request||h.get_webRequest()!==d._request)return;if(h.get_statusCode()!==200){d._endPostBack(d._createPageRequestManagerServerError(h.get_statusCode()),h,a);return}var e=d._parseDelta(h);if(!e)return;var g,j;if(e.asyncPostBackControlIDsNode&&e.postBackControlIDsNode&&e.updatePanelIDsNode&&e.panelsToRefreshNode&&e.childUpdatePanelIDsNode){var x=d._updatePanelIDs,t=d._updatePanelClientIDs,n=e.childUpdatePanelIDsNode.content,v=n.length?n.split(","):[],s=d._splitNodeIntoArray(e.asyncPostBackControlIDsNode),u=d._splitNodeIntoArray(e.postBackControlIDsNode),w=d._splitNodeIntoArray(e.updatePanelIDsNode),l=d._splitNodeIntoArray(e.panelsToRefreshNode),m=e.version4;for(g=0,j=l.length;g<j;g+=m?2:1){var o=(m?l[g+1]:f)||d._uniqueIDToClientID(l[g]);if(!document.getElementById(o)){d._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel,o)),h,e);return}}var k=d._processUpdatePanelArrays(w,s,u,m);k.oldUpdatePanelIDs=x;k.oldUpdatePanelClientIDs=t;k.childUpdatePanelIDs=v;k.panelsToRefreshIDs=l;e.updatePanelData=k}e.dataItems={};var i;for(g=0,j=e.dataItemNodes.length;g<j;g++){i=e.dataItemNodes[g];e.dataItems[i.id]=i.content}for(g=0,j=e.dataItemJsonNodes.length;g<j;g++){i=e.dataItemJsonNodes[g];e.dataItems[i.id]=Sys.Serialization.JavaScriptSerializer.deserialize(i.content)}var q=Sys.Observer._getContext(d,c).events.getHandler(r);q&&q(d,d._getPageLoadingEventArgs(e));Sys._ScriptLoader.readLoadedScripts();Sys.Application.beginCreateComponents();var p=Sys._ScriptLoader.getInstance();d._queueScripts(p,e.scriptBlockNodes,c,b);d._processingRequest=c;p.loadScripts(0,Function.createDelegate(d,Function.createCallback(d._scriptIncludesLoadComplete,e)),Function.createDelegate(d,Function.createCallback(d._scriptIncludesLoadFailed,e)),a)},_onWindowUnload:function(){this.dispose()},_pageLoaded:function(a,b){Sys.Observer.raiseEvent(this,q,this._getPageLoadedEventArgs(a,b));!a&&Sys.Application.raiseLoad()},_pageLoadedInitialLoad:function(){this._pageLoaded(c,a)},_parseDelta:function(n){var h=this,g=n.get_responseData(),i,o,K,L,J,f=0,j=a,p=[];while(f<g.length){i=g.indexOf("|",f);if(i===d){j=h._findText(g,f);break}o=parseInt(g.substring(f,i),10);if(o%1!==0){j=h._findText(g,f);break}f=i+1;i=g.indexOf("|",f);if(i===d){j=h._findText(g,f);break}K=g.substring(f,i);f=i+1;i=g.indexOf("|",f);if(i===d){j=h._findText(g,f);break}L=g.substring(f,i);f=i+1;if(f+o>=g.length){j=h._findText(g,g.length);break}J=g.substr(f,o);f+=o;if(g.charAt(f)!=="|"){j=h._findText(g,f);break}f++;Array.add(p,{type:K,id:L,content:J})}if(j){h._endPostBack(h._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_ParserErrorDetails,j)),n,a);return a}for(var D=[],B=[],v=[],C=[],y=[],I=[],G=[],F=[],A=[],x=[],r,u,z,s,t,w,E,m,q=0,M=p.length;q<M;q++){var e=p[q];switch(e.type){case"#":m=e;break;case"updatePanel":Array.add(D,e);break;case"hiddenField":Array.add(B,e);break;case"arrayDeclaration":Array.add(v,e);break;case"scriptBlock":Array.add(C,e);break;case"scriptStartupBlock":Array.add(y,e);break;case"expando":Array.add(I,e);break;case"onSubmit":Array.add(G,e);break;case"asyncPostBackControlIDs":r=e;break;case"postBackControlIDs":u=e;break;case"updatePanelIDs":z=e;break;case"asyncPostBackTimeout":s=e;break;case"childUpdatePanelIDs":t=e;break;case"panelsToRefreshIDs":w=e;break;case"formAction":E=e;break;case"dataItem":Array.add(F,e);break;case"dataItemJson":Array.add(A,e);break;case"scriptDispose":Array.add(x,e);break;case"pageRedirect":if(m&&parseFloat(m.content)>=4)e.content=unescape(e.content);if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var k=document.createElement("a");k.style.display="none";k.attachEvent("onclick",H);k.href=e.content;h._form.parentNode.insertBefore(k,h._form);k.click();k.detachEvent("onclick",H);h._form.parentNode.removeChild(k);function H(a){a.cancelBubble=c}}else window.location.href=e.content;return a;case l:h._endPostBack(h._createPageRequestManagerServerError(Number.parseInvariant(e.id),e.content),n,a);return a;case"pageTitle":document.title=e.content;break;case"focus":h._controlIDToFocus=e.content;break;default:h._endPostBack(h._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_UnknownToken,e.type)),n,a);return a}}return{version4:m?parseFloat(m.content)>=4:b,executor:n,updatePanelNodes:D,hiddenFieldNodes:B,arrayDeclarationNodes:v,scriptBlockNodes:C,scriptStartupNodes:y,expandoNodes:I,onSubmitNodes:G,dataItemNodes:F,dataItemJsonNodes:A,scriptDisposeNodes:x,asyncPostBackControlIDsNode:r,postBackControlIDsNode:u,updatePanelIDsNode:z,asyncPostBackTimeoutNode:s,childUpdatePanelIDsNode:t,panelsToRefreshNode:w,formActionNode:E}},_processUpdatePanelArrays:function(e,r,s,g){var d,c,b;if(e){var j=e.length,k=g?2:1;d=new Array(j/k);c=new Array(j/k);b=new Array(j/k);for(var h=0,i=0;h<j;h+=k,i++){var q,a=e[h],l=g?e[h+1]:f;q=a.charAt(0)==="t";a=a.substr(1);if(!l)l=this._uniqueIDToClientID(a);b[i]=q;d[i]=a;c[i]=l}}else{d=[];c=[];b=[]}var o=[],m=[];this._convertToClientIDs(r,o,m,g);var p=[],n=[];this._convertToClientIDs(s,p,n,g);return{updatePanelIDs:d,updatePanelClientIDs:c,updatePanelHasChildrenAsTriggers:b,asyncPostBackControlIDs:o,asyncPostBackControlClientIDs:m,postBackControlIDs:p,postBackControlClientIDs:n}},_queueScripts:function(d,b,e,f){for(var a=0,h=b.length;a<h;a++){var g=b[a].id;switch(g){case"ScriptContentNoTags":if(!f)continue;d.queueScriptBlock(b[a].content);break;case"ScriptContentWithTags":var c=window.eval("("+b[a].content+")");if(c.src){if(!e||Sys._ScriptLoader.isScriptLoaded(c.src))continue}else if(!f)continue;d.queueCustomScriptTag(c);break;case"ScriptPath":if(!e||Sys._ScriptLoader.isScriptLoaded(b[a].content))continue;d.queueScriptReference(b[a].content)}}},_registerDisposeScript:function(a,b){if(!this._scriptDisposes[a])this._scriptDisposes[a]=[b];else Array.add(this._scriptDisposes[a],b)},_scriptIncludesLoadComplete:function(j,e){var i=this;if(e.executor.get_webRequest()!==i._request)return;i._commitControls(e.updatePanelData,e.asyncPostBackTimeoutNode?e.asyncPostBackTimeoutNode.content:a);if(e.formActionNode)i._form.action=e.formActionNode.content;var d,h,g;for(d=0,h=e.updatePanelNodes.length;d<h;d++){g=e.updatePanelNodes[d];var o=document.getElementById(g.id);if(!o){i._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel,g.id)),e.executor,e);return}i._updatePanel(o,g.content)}for(d=0,h=e.scriptDisposeNodes.length;d<h;d++){g=e.scriptDisposeNodes[d];i._registerDisposeScript(g.id,g.content)}for(d=0,h=i._transientFields.length;d<h;d++){var l=document.getElementById(i._transientFields[d]);if(l){var p=l._isContained?l.parentNode:l;p.parentNode.removeChild(p)}}for(d=0,h=e.hiddenFieldNodes.length;d<h;d++){g=e.hiddenFieldNodes[d];i._createHiddenField(g.id,g.content)}if(e.scriptsFailed)throw Sys._ScriptLoader._errorScriptLoadFailed(e.scriptsFailed.src,e.scriptsFailed.multipleCallbacks);i._queueScripts(j,e.scriptBlockNodes,b,c);var n=f;for(d=0,h=e.arrayDeclarationNodes.length;d<h;d++){g=e.arrayDeclarationNodes[d];n+="Sys.WebForms.PageRequestManager._addArrayElement('"+g.id+"', "+g.content+");\r\n"}var m=f;for(d=0,h=e.expandoNodes.length;d<h;d++){g=e.expandoNodes[d];m+=g.id+" = "+g.content+"\r\n"}n.length&&j.queueScriptBlock(n);m.length&&j.queueScriptBlock(m);i._queueScripts(j,e.scriptStartupNodes,c,c);var k=f;for(d=0,h=e.onSubmitNodes.length;d<h;d++){if(d===0)k="Array.add(Sys.WebForms.PageRequestManager.getInstance()._onSubmitStatements, function() {\r\n";k+=e.onSubmitNodes[d].content+"\r\n"}if(k.length){k+="\r\nreturn true;\r\n});\r\n";j.queueScriptBlock(k)}j.loadScripts(0,Function.createDelegate(i,Function.createCallback(i._scriptsLoadComplete,e)),a,a)},_scriptIncludesLoadFailed:function(d,c,b,a){a.scriptsFailed={src:c.src,multipleCallbacks:b};this._scriptIncludesLoadComplete(d,a)},_scriptsLoadComplete:function(k,h){var c=this,j=h.executor;if(window.__theFormPostData)window.__theFormPostData=f;if(window.__theFormPostCollection)window.__theFormPostCollection=[];window.WebForm_InitCallback&&window.WebForm_InitCallback();if(c._scrollPosition){window.scrollTo&&window.scrollTo(c._scrollPosition.x,c._scrollPosition.y);c._scrollPosition=a}Sys.Application.endCreateComponents();c._pageLoaded(b,h);c._endPostBack(a,j,h);if(c._controlIDToFocus){var d,i;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var e=$get(c._controlIDToFocus);d=e;if(e&&!WebForm_CanFocus(e))d=WebForm_FindFirstFocusableChild(e);if(d&&typeof d.contentEditable!==g){i=d.contentEditable;d.contentEditable=b}else d=a}WebForm_AutoFocus(c._controlIDToFocus);if(d)d.contentEditable=i;c._controlIDToFocus=a}},_splitNodeIntoArray:function(b){var a=b.content,c=a.length?a.split(","):[];return c},_uniqueIDToClientID:function(a){return a.replace(/\$/g,"_")},_updateControls:function(d,a,c,b,e){this._commitControls(this._processUpdatePanelArrays(d,a,c,e),b)},_updatePanel:function(b,g){var a=this;for(var d in a._scriptDisposes)if(a._elementContains(b,document.getElementById(d))){for(var f=a._scriptDisposes[d],e=0,h=f.length;e<h;e++)window.eval(f[e]);delete a._scriptDisposes[d]}Sys.Application.disposeElement(b,c);b.innerHTML=g},_validPosition:function(b){return typeof b!==g&&b!==a&&b!==0}};e.getInstance=function(){var a=Sys.WebForms.PageRequestManager._instance;if(!a)a=Sys.WebForms.PageRequestManager._instance=new Sys.WebForms.PageRequestManager;return a};e._addArrayElement=function(a){if(!window[a])window[a]=[];for(var b=1,c=arguments.length;b<c;b++)Array.add(window[a],arguments[b])};e._initialize=function(){var a=Sys.WebForms.PageRequestManager.getInstance();a._initializeInternal.apply(a,arguments)};e.registerClass("Sys.WebForms.PageRequestManager");e=Sys.UI._UpdateProgress=function(d){var b=this;Sys.UI._UpdateProgress.initializeBase(b,[d]);b._displayAfter=500;b._dynamicLayout=c;b._associatedUpdatePanelId=a;b._beginRequestHandlerDelegate=a;b._startDelegate=a;b._endRequestHandlerDelegate=a;b._pageRequestManager=a;b._timerCookie=a};e.prototype={get_displayAfter:function(){return this._displayAfter},set_displayAfter:function(a){this._displayAfter=a},get_dynamicLayout:function(){return this._dynamicLayout},set_dynamicLayout:function(a){this._dynamicLayout=a},get_associatedUpdatePanelId:function(){return this._associatedUpdatePanelId},set_associatedUpdatePanelId:function(a){this._associatedUpdatePanelId=a},get_role:function(){return k},_clearTimeout:function(){if(this._timerCookie){window.clearTimeout(this._timerCookie);this._timerCookie=a}},_getUniqueID:function(c){var b=Array.indexOf(this._pageRequestManager._updatePanelClientIDs,c);return b===d?a:this._pageRequestManager._updatePanelIDs[b]},_handleBeginRequest:function(i,h){var a=this,e=h.get_postBackElement(),d=c,g=a._associatedUpdatePanelId;if(a._associatedUpdatePanelId){var f=h.get_updatePanelsToUpdate();if(f&&f.length)d=Array.contains(f,g)||Array.contains(f,a._getUniqueID(g));else d=b}while(!d&&e){if(e.id&&a._associatedUpdatePanelId===e.id)d=c;e=e.parentNode}if(d)a._timerCookie=window.setTimeout(a._startDelegate,a._displayAfter)},_startRequest:function(){var b=this;if(b._pageRequestManager.get_isInAsyncPostBack()){var c=b.get_element();if(b._dynamicLayout)c.style.display="block";else c.style.visibility="visible";b.get_role()===k&&c.setAttribute(s,"false")}b._timerCookie=a},_handleEndRequest:function(){var a=this,b=a.get_element();if(a._dynamicLayout)b.style.display="none";else b.style.visibility="hidden";a.get_role()===k&&b.setAttribute(s,"true");a._clearTimeout()},dispose:function(){var b=this;if(b._beginRequestHandlerDelegate!==a){b._pageRequestManager.remove_beginRequest(b._beginRequestHandlerDelegate);b._pageRequestManager.remove_endRequest(b._endRequestHandlerDelegate);b._beginRequestHandlerDelegate=a;b._endRequestHandlerDelegate=a}b._clearTimeout();Sys.UI._UpdateProgress.callBaseMethod(b,"dispose")},initialize:function(){var b=this;Sys.UI._UpdateProgress.callBaseMethod(b,"initialize");b.get_role()===k&&b.get_element().setAttribute(s,"true");b._beginRequestHandlerDelegate=Function.createDelegate(b,b._handleBeginRequest);b._endRequestHandlerDelegate=Function.createDelegate(b,b._handleEndRequest);b._startDelegate=Function.createDelegate(b,b._startRequest);if(Sys.WebForms&&Sys.WebForms.PageRequestManager)b._pageRequestManager=Sys.WebForms.PageRequestManager.getInstance();if(b._pageRequestManager!==a){b._pageRequestManager.add_beginRequest(b._beginRequestHandlerDelegate);b._pageRequestManager.add_endRequest(b._endRequestHandlerDelegate)}}};e.registerClass("Sys.UI._UpdateProgress",Sys.UI.Control)}if(window.Sys&&Sys.loader)Sys.loader.registerScript("WebForms",["ComponentModel","Serialization","Network"],a);else a()})();
Type.registerNamespace('Sys.WebForms');Sys.WebForms.Res={"PRM_UnknownToken":"Unknown token: \u0027{0}\u0027.","PRM_MissingPanel":"Could not find UpdatePanel with ID \u0027{0}\u0027. If it is being updated dynamically then it must be inside another UpdatePanel.","PRM_ServerError":"An unknown error occurred while processing the request on the server. The status code returned from the server was: {0}","PRM_ParserError":"The message received from the server could not be parsed. Common causes for this error are when the response is modified by calls to Response.Write(), response filters, HttpModules, or server trace is enabled.\r\nDetails: {0}","PRM_TimeoutError":"The server request timed out.","PRM_ParserErrorDetails":"Error parsing near \u0027{0}\u0027.","PRM_CannotRegisterTwice":"The PageRequestManager cannot be initialized more than once."};
//////////////////////////////////////////////////////////
// Loading dialog
//////////////////////////////////////////////////////////

var LoadingMessage = "";
var LoadingCount = 8000;
var LoadingCode = "";
var LoadingTimer = null;

function ShowLoading(sMessage, sCode, fTimeoutSeconds, sValidationGroup) {
    if (sValidationGroup != null) {
        if (sValidationGroup == "*") {
            sValidationGroup = null;
        }
        if (!Page_ClientValidate(sValidationGroup)) {
            return false;
        }
    }

    // Show popup and text
    if (sMessage == "" || sMessage == null) {
        sMessage = GetResourceObject('WebOrder.Master.ContactingStoreMessage');
    }
    LoadingMessage = sMessage;
    LoadingCount = fTimeoutSeconds * 10;
    LoadingCode = sCode;

    var InfoBehavior = $find('InfoBehavior');
    InfoBehavior.add_shown(OnPopupLoadingShown);
    InfoBehavior.show();
    return true;
}

function OnPopupLoadingShown(e) {
    var InfoBehavior = $find('InfoBehavior');
    InfoBehavior.remove_shown(OnPopupLoadingShown);
    $get("InfoMessage").innerHTML = LoadingMessage;
    UpdateLoading(0, LoadingCount);
    if (LoadingCode !== "" && LoadingCode != null) {
        LoadingTimer = setTimeout(LoadingCode, 100);
    }
}

function UpdateLoading(fCurrent, fMax) {
    if (fCurrent < fMax) {
        $get("ProgressBarStatus").style.width = (fCurrent / fMax) * 100 + "%";
        LoadingTimer = setTimeout("UpdateLoading(" + (fCurrent + 1) + "," + fMax + ");", 100);
    }
    else {
        HideLoading();
    }
}

function HideLoading() {
    var InfoBehavior = $find('InfoBehavior');
    InfoBehavior.hide();
    if (LoadingTimer != null) {
        clearTimeout(LoadingTimer);
        LoadingTimer = null;
    }
}

//////////////////////////////////////////////////////////
// Question dialog
//////////////////////////////////////////////////////////

var QuestionMessage = "";
var QuestionOKText = "";
var QuestionCancelText = "";
var QuestionOKCode = "";
var QuestionCancelCode = "";

function DisplayQuestion(Message, OKText, CancelText, OKCode, CancelCode) {
    QuestionMessage = Message;
    QuestionOKText = OKText;
    QuestionCancelText = CancelText;
    QuestionOKCode = OKCode;
    QuestionCancelCode = CancelCode;

    //IE6 seems to have problems displaying the button graphic if the functions and content
    //are assigned before the popup is shown

    var QuestionBehavior = $find('QuestionBehavior');
    QuestionBehavior.add_shown(OnPopupQuestionShown);
    QuestionBehavior.show();
    return false;
}

function DisplayOrderTypeQuestion(Message) {
    QuestionMessage = Message;
    var OrderTypeBehavior = $find('OrderTypeBehavior');
    OrderTypeBehavior.add_shown(OnPopupOrderTypeQuestionShown);
    OrderTypeBehavior.show();
    return false;
}

function DisplayNoSiteRangeQuestion(Message) {
    QuestionMessage = Message;
    var NoSiteInRangeBehavior = $find('NoSiteInRangeBehavior');
    NoSiteInRangeBehavior.add_shown(OnNoSiteInRangeQuestionShown);
    NoSiteInRangeBehavior.show();
    return false;
}

function OnNoSiteInRangeQuestionShown(e) {
    var NoSiteInRangeBehavior = $find('NoSiteInRangeBehavior');
    NoSiteInRangeBehavior.remove_shown(OnAddressSuggestionQuestionShown);

    var MessageText = $("#DivNoSiteInRangeSuggestion");
    if (MessageText.length > 0) {
        MessageText.html(QuestionMessage);
    }
}

function DisplayTimeSelectorModal(Message) {

    if ($.browser.msie || $.browser.opera) {
        $('#DropDownContainer').css('margin-left', '-28px');
        $('#DropDownContainer').css('margin-top', '-3px');
    }
    else {
        $('#DropDownContainer').css('margin-left', '-28px');
        $('#DropDownContainer').css('margin-top', '-5px');
    }
    if ($.browser.msie && $.browser.version == 7 && document.documentMode == 7) {
        $("#TimeList").css("margin-left", "-39%");
        $("#TimeList").css("margin-top", "10%");
        $("#TimeList").css("width", "127px");
        $("#DivPlaceHolder").addClass("PlaceHolderCompatibilityDiv");
    } else if ($.browser.msie) {
        $("#TimeList").css("margin-left", "-45%");
        $("#TimeList").css("margin-top", "15%");
        $("#TimeList").css("width", "132px");
        $("#DivPlaceHolder").addClass("PlaceHolderDiv");
    }
    else if ($.browser.mozilla) {
        $("#TimeList").css("margin-left", "-45%");
        $("#TimeList").css("margin-top", "11%");
        $("#TimeList").css("width", "132px");
        $("#DivPlaceHolder").addClass("PlaceHolderDiv");
    }
    else {
        $("#TimeList").css("margin-left", "-44%");
        $("#TimeList").css("margin-top", "10%");
        $("#TimeList").css("width", "132px");
        $("#DivPlaceHolder").addClass("PlaceHolderDiv");
    }

    QuestionMessage = Message;
    var TimeSelectorBehavior = $find('TimeSelectorBehavior');
    TimeSelectorBehavior.add_shown(OnTimeSelectorBehaviorModalShown);
    TimeSelectorBehavior.show();
    return false;
}

function OnTimeSelectorBehaviorModalShown(e) {
    var TimeSelectorBehavior = $find('TimeSelectorBehavior');
    TimeSelectorBehavior.remove_shown(OnTimeSelectorBehaviorModalShown);

    var MessageText = $("#DivTimeSelector");
    if (MessageText.length > 0) {
        MessageText.html(QuestionMessage);
    }
}

function OnPopupOrderTypeQuestionShown(e) {
    var OrderTypeBehavior = $find('OrderTypeBehavior');
    OrderTypeBehavior.remove_shown(OnPopupQuestionShown);

    var MessageText = $("div[id$=QuestionMessageOrderType]");
    if (MessageText.length >  0) {
        MessageText.html(QuestionMessage);
    }
}

function DisplaySuggestedAddressQuestion(Message) {
    QuestionMessage = Message;
    var AddressSuggestionBehavior = $find('AddressSuggestionBehavior');
    AddressSuggestionBehavior.add_shown(OnAddressSuggestionQuestionShown);
    AddressSuggestionBehavior.show();
    return false;
}

function OnAddressSuggestionQuestionShown(e) {
    var AddressSuggestionBehavior = $find('AddressSuggestionBehavior');
    AddressSuggestionBehavior.remove_shown(OnAddressSuggestionQuestionShown);

    var btnOk = $('#QuestionAddressSuggestionMiddle div#CssButton1Div .Button');
    $('#QuestionAddressSuggestionMiddle div#CssButton2Div .Button').attr('tabindex', 301);;
    btnOk.attr('tabindex', 300);
    btnOk.focus();

    var MessageText = $("#DivAddressSuggestion");
    if (MessageText.length > 0) {
        MessageText.html(QuestionMessage);
    }

}

function DisplayLoyaltyRewards(Message) {
    QuestionMessage = Message;
    var showLoyaltyRewardsBehavior = $find('ShowLoyaltyRewardsBehavior');
    showLoyaltyRewardsBehavior.add_shown(OnLoyaltyRewardsShown);
    showLoyaltyRewardsBehavior.show();
    return false;
}

function OnLoyaltyRewardsShown(e) {
    var AddressSuggestionBehavior = $find('ShowLoyaltyRewardsBehavior');
    AddressSuggestionBehavior.remove_shown(OnLoyaltyRewardsShown);

    var checklistDiv = $("#ModalChecklistPopupTable");
    if (QuestionMessage.length > 0) {
        checklistDiv.html(QuestionMessage);
    }
}

function HideLoyaltyRewards() {
    var showLoyaltyRewardsBehavior = $find('ShowLoyaltyRewardsBehavior');
    showLoyaltyRewardsBehavior.hide();
}

function OnPopupQuestionShown(e) {
    var QuestionBehavior = $find('QuestionBehavior');
    QuestionBehavior.remove_shown(OnPopupQuestionShown);

    var MessageDiv = $get("QuestionMessage");
    var MessageText = GetChildByClass(MessageDiv, "QuestionMessageText");
    if (MessageText != null) {
        MessageText.innerHTML = QuestionMessage;
    }

    var HaveCancel = ((QuestionCancelText != null) && (QuestionCancelText != ""));
    if ((QuestionOKText != null) && (QuestionOKText != "")) {
        var Button = $get("QuestionOKButtonDiv");
        if (!HaveCancel) {
            SetClass(Button, "Center");
        }
        else {
            SetClass(Button, "Left");
        }
        var ButtonText = GetChildByTag(Button, "SPAN");
        if (ButtonText != null) {
            ButtonText.innerHTML = QuestionOKText;
        }
        var Input = GetImmediateChildByTag(Button, "INPUT");
        if (Input != null) {
            Input.onclick = new Function(QuestionOKCode);
        }
        $(Button).find('.Button').attr('tabindex', '300');//assign high tabindex to button so it wont clash with other elements
        $(Button).find('.Button').focus();//set focus on ok button
    }

    var Button = $get("QuestionCancelButtonDiv");
    if (HaveCancel) {
        Button.style.display = "inline-block"
        var ButtonText = GetChildByTag(Button, "SPAN");
        if (ButtonText != null) {
            ButtonText.innerHTML = QuestionCancelText;
        }
        var Input = GetImmediateChildByTag(Button, "INPUT");
        if (Input != null) {
            Input.onclick = new Function(QuestionCancelCode);
        }
        $(Button).find('.Button').attr('tabindex', '301');
    }
    else {
        Button.style.display = "none"
    }
}

function HideQuestion() {
    var QuestionBehavior = $find('QuestionBehavior');
    QuestionBehavior.hide();
}

function HideOrderTypeQuestion() {
    var OrderTypeBehavior = $find('OrderTypeBehavior');
    OrderTypeBehavior.hide();
}

function HideAddressSuggestionQuestion() {
    var AddressSuggestionBehavior = $find('AddressSuggestionBehavior');
    AddressSuggestionBehavior.hide();
}

//////////////////////////////////////////////////////////
// Misc Utilities
//////////////////////////////////////////////////////////

function PopupURL(url, name) {
    newwindow = window.open(url, name);
    if (window.focus) { newwindow.focus() }
    return false;
}

function ReplaceNoSiteInRangePanel(chooseLocationImageName, choosePickupImageName) {
    var chooseLocationDiv = $get("div_choose_location");
    var choosePickupDiv = $get("div_choose_pickup");
    
    if (chooseLocationDiv != null) {
        chooseLocationDiv.style.backgroundImage = chooseLocationImageName;
    }

    if (choosePickupDiv != null) {
        choosePickupDiv.style.backgroundImage = choosePickupImageName;
    }
}


//////////////////////////////////////////////////////////
// Alternative Recipet Box Rendering
//////////////////////////////////////////////////////////

function ReplaceRightPanel(imageName, siteText) {
    var orderReceiptDiv = $get("ctl00_ctl00_ReceiptDiv");
    if (orderReceiptDiv != null) {
        orderReceiptDiv.innerHTML = "<div id='promotionalText'>" + siteText + "</div>";
        orderReceiptDiv.style.backgroundImage = imageName;
    }
}

function ReplaceRightPanelWithLocation(siteText) {
    var oOrderDiv = $get("OrderDiv");
    var newHTML;

    if (oOrderDiv != null) {
        newHTML = "<div id='OrderNotes' style='display: none;'></div>"
        newHTML += "<br class='Clear'>";
        newHTML += "<div id='ReceiptButtonStartDiv' style='display: none;'></div>";
        newHTML += "<div id='StartOrder' style='display: none;'></div>";
        newHTML += "<div id='EmptyReceiptSiteText'>" + siteText + "</div>";

        oOrderDiv.innerHTML = newHTML;
    }
}


//
/*global Radiant,GetWebServbiceFailed*/
var PubSiteId = null;
var PubSiteOrderBrowseOnly = false;
var PubOrderReadOnly = true;
var PubOrderComplete = false;
var PubOrder = null;
var PubTime = false;
var PubEmptyOrder = false;
var PubClosed = false;
var PubStartOrdering = false;
var PubVerifyPayment = false;
var PubSiteHtmlFragment = null;
var HideTax = GetHideTaxCompanyOrSiteSetting();
var AssignLoyaltyAndASVAtSite = GetAssignLoyaltyAndASVAtSite();

var PubMenu = null;
var PubSubMenus = null;
var PubDateTime = null;

var ItemOrderingMode_Normal = 0;
var ItemOrderingMode_Pizza = 1;
var ItemOrderingMode_QtyModifierItem = 2;
var ItemOrderingMode_BuildYourOwn = 3;
var ItemOrderingMode_ModifierDeterminesQty = 4;


var modifierAction = {
    Default: 0,
    Add: 1,
    No: 2,
    Extra: 4,
    Side: 8,
    Light: 16,
    Everything: 32,
    Plain: 64
};

var SiteBrowsableState_NotBrowsable = 0;
var SiteBrowsableState_Browsable = 1;

var SiteOrderingState_NotAcceptingOrders = 0;
var SiteOrderingState_PreLive = 1;
var SiteOrderingState_PublicLive = 2;
var SiteOrderingState_CallInOrdersOnly = 3;

var OrderModeType_Pickup = 1;
var OrderModeType_Delivery = 2;

var OrderType_Individual = 1;
var OrderType_GroupOrderOrganizer = 2;
var OrderType_GroupOrderInvitee = 3;
var OrderType_GroupOrderByName = 5;
var OrderType_PortionAssistant = 6;
var bEnableATODeposites = false;

function GetOrder(functionPointer) {
    if (functionPointer == null) {
        Radiant.AlohaOnline.OrderEntryService.GetOrder(GetOrderOK, GetWebServiceFailed, "GetOrder()");
    }
    else {
        Radiant.AlohaOnline.OrderEntryService.GetOrder(functionPointer, GetWebServiceFailed, "GetOrder()");
    }
}

function GetOrderOK(oOrder) {
    if (oOrder != null)
    {
        if (oOrder.SiteId == 0) 
        {
            window.location = "locations.aspx";
        }

        SetVirtualReceiptType(oOrder.OrderType);

        PubSiteId = oOrder.SiteId;
        PubOrder = oOrder;
    }

    DisplayOrder(oOrder, false);
}

function RefreshPortionAssistantWithOrder() {
    Radiant.AlohaOnline.OrderEntryService.GetOrder(RefreshPortionAssistantWithOrderOK,
                                                   GetWebServiceFailed, 
                                                   "RefreshPortionAssistantWithOrder()");
}

function RefreshPortionAssistantWithOrderOK(oOrder) {
    if (oOrder != null) {
        if (oOrder.SiteId == 0) {
            window.location = "locations.aspx";
        }

        PubSiteId = oOrder.SiteId;
        PubOrder = oOrder;
    }

    PortionAssistantCurrentDisplay(oOrder.CurrentPortionCount);
    PortionAssistantGraphicDisplay(oOrder.CurrentPortionCount, oOrder.TargetPortionCount);
}

function CancelOrder(askConfirm) {
    DisplayQuestion(GetResourceObject('WebOrder.Order.ConfirmCancelPrompt'),
        GetResourceObject('WebOrder.QuestionPopup.YesButton'),
        GetResourceObject('WebOrder.QuestionPopup.NoButton'),
        'window.location = "StartOrder.aspx"', null);
}

function ValidateOrderForCheckout() {
    PubVirtualReceipt.ValidateOrderForCheckout();
}

function UnderOrderConfirmCheckout(orderCurrent, orderTarget) {
    DisplayQuestion(FormatResourceString(GetResourceObject('WebOrder.Order.UnderOrderConfirmationPrompt'), orderCurrent, orderTarget),
        GetResourceObject('WebOrder.Order.UnderOrderOrderMoreButton'),
        GetResourceObject('WebOrder.Order.UnderOrderContinueButton'),
        null, "CheckForUpsellItems()");
}

function DeleteOrderOK(result) {
    window.location = "StartOrder.aspx";
}

function SessionExpired() {
    DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.SessionExpiredError"),
        GetResourceObject('WebOrder.QuestionPopup.OKButton'), null,
        'window.location = "Login.aspx"',null);
}

function DisplayModifiers(oModifiers, spacing, hideprice, order) {
    var Section, oModifier, HTML = "", Action = "", Qty = "";

    for (var j in oModifiers) {
        oModifier = oModifiers[j];
        Action = "";
        var displayMappings = jQuery.parseJSON($("input[id$=hfModMappings]").val());//json object for modactionmappings
        if (oModifier.Action == modifierAction.Add) {
            if (displayMappings.keys.indexOf(modifierAction.Add) > -1) {
                Action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Add)] + " ";
            }
            else {
                Action = GetResourceObject('WebOrder.Order.ModifierActionAddLabel') + " ";
            }
        }
        else if (oModifier.Action == modifierAction.No) {
            if (displayMappings.keys.indexOf(modifierAction.No) > -1) {
                Action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.No)] + " ";
            }
            else {
                Action = GetResourceObject('WebOrder.Order.ModifierActionNoLabel') + " ";
            }
        }
        else if (oModifier.Action == modifierAction.Extra) {
            if (displayMappings.keys.indexOf(modifierAction.Extra) > -1) {
                Action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Extra)] + " ";
            }
            else {
                Action = GetResourceObject('WebOrder.Order.ModifierActionExtraLabel') + " ";
            }
        }
        else if (oModifier.Action == modifierAction.Side) {
            if (displayMappings.keys.indexOf(modifierAction.Side) > -1) {
                Action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Side)] + " ";
            }
            else {
                Action = GetResourceObject('WebOrder.Order.ModifierActionSideLabel') + " ";
            }
        }
        else if (oModifier.Action == modifierAction.Light) {
            if (displayMappings.keys.indexOf(modifierAction.Light) > -1) {
                Action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Light)] + " ";
            }
            else {
                Action = GetResourceObject('WebOrder.Order.ModifierActionLightLabel') + " ";
            }
        }
       
        // Add section info
        if (oModifier.IsOnSection1) {
            Section = " " + GetResourceObject('WebOrder.Order.ModifierIsOnLeftLabel');
        }
        else if (oModifier.IsOnSection2) {
            Section = " " + GetResourceObject('WebOrder.Order.ModifierIsOnRightLabel');
        }
        else {
            Section = "";
        }

        Qty = "";
        if (oModifier.Quantity > 1) {
            Qty = oModifier.Quantity + "x ";
        }

        if (oModifier.Status == 0) {
            HTML += "<tr class='OrderLineModifier'>";
        }
        else {
            HTML += "<tr class='OrderLineModifierError'>";
        }
        
        var price = CurrencyFormattedSuppressZero(oModifier.ExtendedPrice);
        if (hideprice != undefined && hideprice == true)
            price = "";
        HTML += "  <td>" + spacing + Qty + Action + oModifier.Name + Section + "</td>" +
                "  <td></td>" +
                "  <td style='text-align:right'>" + price + "</td>" +
                "</tr>";

        //order.RecomputedSubTotal += parseFloat(oModifier.ExtendedPrice);

        // Recursively add nested modifiers
        HTML += DisplayModifiers(oModifier.Modifiers, spacing + "&nbsp;&nbsp;", false, order);
    }
    
    return HTML;
}

function DisplayItemComp(lineItem) {
    var html = "";

    if (lineItem.CompValue != 0) {
        html = "<tr class='OrderLineDiscount'>" +
            "<td>" + GetResourceObject('WebOrder.Order.LineItemDiscountLabel') + "</td>" +
            "<td></td>" +
            "<td style='text-align:right'>" + CurrencyFormattedSuppressZero(-lineItem.CompValue) + "</td>" +
            "</tr>";
    }

    return html;
}

function DisplayCompNotQualifiedForLineItem(lineItem) {
    var html = "<tr class='OrderCompNotQualified'>" +
                   "<td>" + GetResourceObject('WebOrder.Order.CompNotQualified') + "</td>" +
               "</tr>";
    return html;
}

function BrowseOnly() {
}

function FormatPromiseTime(oOrder) {
    var promiseHTML = tformatter.dateFormat(TranslateServerTime(oOrder.PromiseDateTime)) + ", " + tformatter.formatDisplayTime(FormatTime(GetTime(TranslateServerTime(oOrder.PromiseDateTime))));
    if ((oOrder.OrderMode == OrderModeType_Delivery)) {
        if (getCookie("ASAPDeliveryEnabled") == "true") {
            promiseHTML = promiseHTML.replace(",", "<br/>");
            promiseHTML += " " + GetResourceObject('WebOrder.Time.ASAPTimeSuffix');
        }
        else {
            if (GetDeliveryTimesAsRange()) {
                promiseHTML = promiseHTML.replace(",", "<br/>");
                var upperLimit = new Date();
                upperLimit.setTime(TranslateServerTime(oOrder.PromiseDateTime).getTime() +
                    GetDeliveryTimeGranularity() * 1000 * 60);
                promiseHTML += " - " + tformatter.formatDisplayTime(FormatTime(GetTime(upperLimit)));
            } 
        }

    }
    return promiseHTML;
}

function FormatPromiseTimeTime(dTime) {
    var promiseHTML = tformatter.formatDisplayTime(FormatTime(dTime));
    if ((GetOrderMode() == OrderModeType_Delivery) && GetDeliveryTimesAsRange()) {
        var dUpperLimit = dTime + GetDeliveryTimeGranularity() / 60;
        promiseHTML += " - " + tformatter.formatDisplayTime(FormatTime(dUpperLimit));
    }
    return promiseHTML;
}

function VirtualReceipt()
{


}

function UpdateElementsTabOrderAfterReceiptGenerated() {
    //Update tabindex of buttons & labels
    var tabindex = parseInt($("#hfReceiptStartingTabIndex").val());
    $('#ReceiptContent .OrderLineItem').each(function () {
        var qtyInput = $(this).find('.OrderLineItemQty');
        if (qtyInput.attr('readonly') == false) {
            qtyInput.attr('tabindex', tabindex);
            $(this).find('.OrderCancelLineItem').attr('tabindex', tabindex + 1);
            tabindex = tabindex + 2;
        }
        else 
            qtyInput.attr('tabindex', '-1');
    });

    $("div[uniqueattribute$=StartCancelButton]").attr('tabindex', tabindex);
    $("div[uniqueattribute$=CheckoutModifyOrderButton]").attr('tabindex', ++tabindex);

    if ($('#ShowSiteButton').length > 0) {
        $('#ShowSiteButton').attr('tabindex', ++tabindex);
        $('#ShowPAButton').attr('tabindex', ++tabindex);
        tabindex += UpdateElementsTabOrderGroupOrderNamesReceipt(parseInt($('#ShowPAButton').attr('tabindex')));
    }
    $("a[id$=ReceiptTimeSelectionLink]").attr('tabindex', ++tabindex);
    $("a[id$=ReceiptLocations]").attr('tabindex', ++tabindex);
    $("a[id$=PrivacyPolicy]").attr('tabindex', ++tabindex);
    $("a[id$=TermsOfUse]").attr('tabindex', ++tabindex);
}

function UpdateElementsTabOrderForEmptyReceipt() {
    //update tab order
    var tabindex = parseInt($("#hfReceiptStartingTabIndex").val());
    $("div[uniqueattribute$=StartCancelButton]").attr('tabindex', tabindex);

    if ($('#ShowSiteButton').length > 0) {
        $('#ShowSiteButton').attr('tabindex', ++tabindex);
        $('#ShowPAButton').attr('tabindex', ++tabindex);
        tabindex += UpdateElementsTabOrderGroupOrderNamesReceipt(parseInt($('#ShowPAButton').attr('tabindex')));
    }

    $("a[id$=ReceiptTimeSelectionLink]").attr('tabindex', ++tabindex);
    $("a[id$=ReceiptLocations]").attr('tabindex', ++tabindex);
    $("a[id$=PrivacyPolicy]").attr('tabindex', ++tabindex);
    $("a[id$=TermsOfUse]").attr('tabindex', ++tabindex);
}

function UpdateElementsTabOrderGroupOrderNamesReceipt(lastIndex)
{
    var items = $("#GroupOrderNamesTable").attr('rows');
    $(items).each(function (i, row) {
        var divDelete = $(row).find('div[class*="GroupOrderInviteeRemoveAction"]');
        $(divDelete).attr('tabindex', ++lastIndex);
    });
    return (items !== null) ? items.length : 0;
}
VirtualReceipt.prototype = {

    DisplayOrder: function (oOrder, bScrollToEnd) {
        this.DisplayPromiseTime(oOrder);

        this.DisplayPortionAssistant(oOrder);
        this.DisplayGroupOrderNames(oOrder);

        if (PubSiteOrderBrowseOnly || oOrder == null || oOrder.LineItems == null ||
            oOrder.LineItems == "" || oOrder.LineItems.Count == 0) {
            this.DisplayEmptyOrder(oOrder);
            return;
        }

        var OrderHTML = this.GetReceiptBoxHtml(oOrder);
        OrderHTML += this.GetTotalsHtml(oOrder);

        OrderHTML += this.GetNavButtonHtml();
        var oOrderDiv = $get("OrderBufferDiv");
        oOrderDiv.innerHTML = OrderHTML;

        //Update the receipt once the HTML has been loaded into the DOM
        setTimeout("SwapReceiptBuffer(" + bScrollToEnd + ");", 100);

        UpdateElementsTabOrderAfterReceiptGenerated();

        if (oOrder.LoyaltyCardNumber != null && oOrder.LoyaltyCardNumber.length > 0 && PubOrderComplete && (oOrder.OrderDiscounts.length > 0)) {
            var loyaltyRewards = oOrder.OrderDiscounts.filter(function (x) { return x.DiscountType <= 2 });
            var loyaltyRewardsTotals = 0;
            for (var i in loyaltyRewards) {
                loyaltyRewardsTotals += loyaltyRewards[i].Amount;
            }

            if (loyaltyRewardsTotals > 0) {
                var loyaltyText = [];
                var textColor = '';
                if (oOrder.TotalAmount !== 0 && (oOrder.PaymentMode === 2 || AssignLoyaltyAndASVAtSite)) {
                    loyaltyText.push(GetResourceObject('WebOrder.OrderReceipt.LoyaltyPayAtSite'));
                    textColor = 'style="color:#ff0000"';
                } else {
                    loyaltyText.push(GetResourceObject('WebOrder.OrderReceipt.LoyaltyProcessedPrompt') + " ");
                    for (var i = 0; i < oOrder.LoyaltyCardNumber.length - 4; i++) {
                        loyaltyText.push('*');
                    }
                    loyaltyText.push(oOrder.LoyaltyCardNumber.slice(oOrder.LoyaltyCardNumber.length - 4));
                    textColor = 'style="color:#000000"';
                }
                $("div[id$=ReceiptDiv]").append('<div class="LoyaltyCardNumber"' + textColor + '>' + loyaltyText.join("") + '</div>');
            }   
        }

    },

    DisplayPromiseTime: function (oOrder) {
        if (PubSiteOrderBrowseOnly) {
            SetHTML("PickupDiv", GetResourceObject('WebOrder.Order.BrowsingMenuLabel'));

            var container = $get("order_control_section_pickup");
            var link = GetChildLink(container);
            if (link != null) {
                link.href = "javascript:BrowseOnly()";
            }
        }
            // Show promise time
        else if (oOrder != null) {
            if (oOrder.PromiseDateTime == null) {
                var todayText = GetResourceObject('WebOrder.Time.TodayLabel');
                if (typeof SelectedDate !== 'undefined') {

                    var dateString = (SelectedDate.GetValue() !== null) ? SelectedDate.GetValue().replace(todayText, "") : "";//filter today text for datestring
                    var ASAPEnabled  = $('#ASAPDetails').css('display') != 'none';
                    var selectedTime = $("#TimeList option:selected").val();
                    if (ASAPEnabled && $('input[name=group1]:checked').val().toString() == "yes") {
                        $('#PickupDiv').html(dateString + "<br>" + tformatter.formatDisplayTime(selectedTime) + " " + GetResourceObject('WebOrder.Time.ASAPTimeSuffix'));
                    }

                }
                else
                {
                    selectedTime = $("#TimeList option:selected").text();
                    if (getCookie("OrderMode") != "2") {
                        SetHTML("PickupDiv", dateString + ", " + tformatter.formatDisplayTime(selectedTime));
                    }
                    else
                    {
                        if (GetDeliveryTimesAsRange()) {
                            SetHTML("PickupDiv", dateString + "<br>" + tformatter.formatDisplayTime(selectedTime));
                        }
                        else {
                            SetHTML("PickupDiv", dateString + ", " + tformatter.formatDisplayTime(selectedTime));
                        }
                    }
                }
                    
                
            }
            else {
                PubDateTime = oOrder.PromiseDateTime;
                SetHTML("PickupDiv", FormatPromiseTime(oOrder));
            }
        }
    },

    DisplayPortionAssistant: function (oOrder) {

        if (oOrder == null || oOrder.OrderType != OrderType_PortionAssistant) {
            return;
        }

        var oTabs = $get("OrderControlButtons");
        var oTabsStyle = null;

        if (oTabs != null)
            oTabsStyle = GetStyle(oTabs);

        if (oOrder != null && oTabsStyle != null) {

            oTabs.style.display = "inline";

            var oOrderActiveDiv = GetElementsByClassName(document, "order");
            if (oOrderActiveDiv != null && oOrderActiveDiv.length > 0) {
                oOrderActiveDiv[0].style.height = "440px";
            }

            var selectedTab = $get("SelectedTab");
            var selectedTabValue = "0";

            if (window.location.pathname.toLowerCase() == "/orderentry.aspx") {
                selectedTabValue = "1";
            }

            if (selectedTab != null)
                selectedTabValue = selectedTab.value;

            var tabsHTML = "";

            var t0Class = "ButtonReceiptTab";
            var t1Class = "ButtonReceiptTab";

            switch (selectedTabValue) {
                case "0":
                    t0Class = "ButtonReceiptTabSelected";
                    break;
                case "1":
                    t1Class = "ButtonReceiptTabSelected";
                    break;
            }

            tabsHTML += "<div id=\"ShowSiteButton\" class=\"" + t0Class + " Left\" onclick=\"ToggleReceiptFooterControls(0)\"  onkeypress='HandleKeyPressEvent(event);' >";
            tabsHTML += "<span>" + GetResourceObject('WebOrder.Order.ShowOrderDetailsButton') + "</span></div>";

            tabsHTML += "<div id=\"ShowPAButton\" class=\"" + t1Class + " Right\" onclick=\"ToggleReceiptFooterControls(1)\"  onkeypress='HandleKeyPressEvent(event);' >";
            tabsHTML += "<span>" + GetResourceObject('WebOrder.Order.ShowPortionAssistantButton') + "</span></div>";

            tabsHTML += "<input id=\"SelectedTab\" type=\"hidden\" runat=\"server\" value=\"" + selectedTabValue + "\"/>";

            SetHTML("OrderControlButtons", tabsHTML);

            var portionAssistantHTML = "";

            var sTargetPortion;
            if (oOrder.TargetPortionCount == null)
                sTargetPortion = 0;
            else
                sTargetPortion = oOrder.TargetPortionCount;

            var targetPortionReadOnly = "";
            var targetPortionClassModifier = "";

            if (PubOrderReadOnly) {
                targetPortionReadOnly = "readonly='readonly'";
                targetPortionClassModifier = " ReadOnly";
            }

            portionAssistantHTML = "<div id='PortionAssistantPic' style='float:right'>";
            portionAssistantHTML += "</div>";

            portionAssistantHTML += "<div id='PortionAssistantCurrent'>";
            portionAssistantHTML += "</div>";

            portionAssistantHTML += "<div id='PortionAssistantTarget'>";
            portionAssistantHTML += "<span>" + GetResourceObject('WebOrder.Order.PortionAssistantTargetPortionCountLabel') + " </span>";
            portionAssistantHTML += "<input type='text' " + targetPortionReadOnly + " onChange='onTargetPortionCountChange(this)' " +
                                     "class='OrderTargetPortionCount" + targetPortionClassModifier + "' maxlength='3' value='" + sTargetPortion + "'/>";
            portionAssistantHTML += "</div>";

            portionAssistantHTML += "<div id='PortionAssistantButton'>";
            portionAssistantHTML += "<div class='ButtonSmall FloatRight' uniqueattribute='AddToOrderButton' onmouseover='ButtonClassHover(this, &quot;ButtonSmallHover FloatRight&quot;);' " +
                "onfocus='ButtonClassHover(this, &quot;ButtonSmallHover FloatRight&quot;);' onmouseout='ButtonClassOut(this, &quot;ButtonSmall FloatRight&quot;);'" +
                " onblur='ButtonClassOut(this, &quot;ButtonSmall FloatRight&quot;);' classname='ButtonSmall FloatRight'><span>" +
                GetResourceObject('WebOrder.Order.PortionAssistantTargetPortionButton') + "</span></div>";
            portionAssistantHTML += "</div>";

            SetHTML("OrderPortionAssistant", portionAssistantHTML);

            PortionAssistantCurrentDisplay(oOrder.CurrentPortionCount);
            PortionAssistantGraphicDisplay(oOrder.CurrentPortionCount, oOrder.TargetPortionCount);

            PubOrder.CurrentPortionCount = oOrder.CurrentPortionCount;

            ToggleReceiptFooterControls(selectedTabValue);
        }
    },

    DisplayEmptyOrder: function (oOrder) {

        var oOrderDiv = $get("OrderDiv");

        PubEmptyOrder = true;
        if (PubSiteOrderBrowseOnly) {
            OrderHTML = "<div id='OrderNotes'>";
            OrderHTML += GetResourceObject('WebOrder.Order.BrowsingOnlyInstructions');
            OrderHTML += "</div>";
        }
        else {
            OrderHTML = "<div id='OrderNotes'>" +
                        FormatResourceString(GetResourceObject("WebOrder.Order.ReceiptEmptyOrderMessage"),
                                                GetMaxOrderDollarAmount()) + "</div>";
        }
        OrderHTML += "<br class='Clear' />";
        if (PubStartOrdering) {
            OrderHTML += RenderButton("ReceiptButtonStart", "ButtonReceiptRight FloatNone", "ButtonReceiptRightHover FloatNone",
                                        "center", 'deletecookie("BrowseMode");window.location="StartOrder.aspx"', "cssclassswap",
                                        GetResourceObject('WebOrder.Order.StartOrderingButton'), "StartCancelButton");
        }
        else {
            OrderHTML += RenderButton("ReceiptButtonStart", "ButtonReceiptRight FloatNone", "ButtonReceiptRightHover FloatNone",
                                        "center", 'deletecookie("BrowseMode");window.location="StartOrder.aspx"', "cssclassswap",
                                        GetResourceObject('WebOrder.Order.StartOverButton'), "StartCancelButton");
        }

        //text below start order/start over button
        OrderHTML += "<div id='StartOrder'>";
        OrderHTML += GetResourceObject('WebOrder.Order.StartOrderOverLabel');
        OrderHTML += "</div>";
        OrderHTML += "<div id='EmptyReceiptSiteText'>";
        if (PubSiteHtmlFragment !== null && window.location.pathname.toLowerCase() !== "/orderentry.aspx") {
            OrderHTML += PubSiteHtmlFragment;
        }
        OrderHTML += "</div>";
        oOrderDiv.innerHTML = OrderHTML;
        oOrderDiv.style.display = "";

        Radiant.AlohaOnline.OrderEntryService.CheckIfPesIsEnabled(onSuccessPesEnabled);
        UpdateElementsTabOrderForEmptyReceipt();
    },

    DisplayGroupOrderNames: function (oOrder) {
        //Only needed for group order by name
    },

    GetReceiptBoxHtml: function (oOrder) {
        var html = "<div id='ReceiptBox'><div id='ReceiptContent'>";
        html += "<table width='100%'>";

        var loyaltyRewards = oOrder.OrderDiscounts.filter(function (x) { return x.DiscountType <= 2 });
        var loyaltyRewardsTotals = 0;
        for (var i in loyaltyRewards) {
            loyaltyRewardsTotals += loyaltyRewards[i].Amount;
        }

        for (var i in oOrder.LineItems) 
        {
            var DeleteHTML = "";
            var nameClassModifier = "";
            var qtyClassModifier = "";
            var qtyReadOnlyHTML = "";
            var item = oOrder.LineItems[i];

            //if line item is contained in websalesgroup lineitems, skip
            if (jQuery.inArray(item.ItemLineNumber, oOrder.WebSalesGroupLineItemNumbers) !== -1)
            {
                continue;
            }

            if (PubOrderReadOnly) {
                nameClassModifier = " ReadOnly";
                qtyClassModifier = " ReadOnly";
                qtyReadOnlyHTML = "readonly='readonly'";
            }

            if (item.ItemOrderingMode == ItemOrderingMode_ModifierDeterminesQty) {
                qtyClassModifier = " ReadOnly";
                qtyReadOnlyHTML = "readonly='readonly'";
            }

            if (!PubOrderReadOnly) {
                DeleteHTML = "<div class='OrderCancelLineItem' "
                    + "onclick='onDelOrderLine(" + item.ItemLineNumber + ")' onkeypress='HandleKeyPressEvent(event);'></div>";
            }

            var onClick = "";
            if (!PubOrderComplete && !PubOrderReadOnly) {
                onClick = "onclick='CustomizeItem(" + item.MenuItemId + "," + item.SalesItemId + "," + (item.ItemLineNumber) + ");' onkeypress='HandleKeyPressEvent(event);'";
            }

            if (item.Status == 0) {
                html += "<tr class='OrderLineItem' style=''>";
            }
            else {
                html += "<tr class='OrderLineItemError' style=''>";
            }

            html += "<td style='width:140px;' class='OrderLineItemName" + nameClassModifier + "' "
                + onClick + " ><label for='" + item.SalesItemId + "'>" + item.Name
                + "</label></td>" //result.LineItems[i].ItemName
                + "<td style='width:20px'>"
                + "<input id='" + item.SalesItemId + "' type='text' " + qtyReadOnlyHTML + " onChange='onQtyChange(" + item.ItemLineNumber + ",this.value)'"
                + " class='OrderLineItemQty" + qtyClassModifier + "' maxlength='3' value='" + item.Quantity + "'/></td>"
                + "<td style='text-align:right'>" + CurrencyFormatted(item.ExtendedPrice) + "</td>" //result.LineItems[i].Price
                + "<td style='width:18px'>" + DeleteHTML + "</td></tr>";

            // add modifiers to line item
            html += DisplayModifiers(oOrder.LineItems[i].Modifiers, "", false, oOrder);

            if (compAppliesToOrder(oOrder) && !compAppliesToLineItem(item)) {
                html += DisplayCompNotQualifiedForLineItem(item);
            }
            else if (compAppliesToLineItem(item) && !compAppliesToOrder(oOrder) && loyaltyRewardsTotals === 0) {
                html += DisplayItemComp(item);
            }

            // add special instructions line (who is this for?)
            if (!IsEmpty(oOrder.LineItems[i].RecipientName)) {
                html += "<tr><td class='OrderInstructions' colspan='4'>";
                html += GetResourceObject('WebOrder.Order.ForRecipientLabel');
                html += "&nbsp;";
                html += oOrder.LineItems[i].RecipientName + "</td></tr>";
            }
            if (!IsEmpty(oOrder.LineItems[i].SpecialInstructions)) {

                html += "<tr><td class='OrderInstructions' colspan='4'>";
                html += GetResourceObject('WebOrder.Order.SpecialInstructionsLabel');
                html += "&nbsp;";
                html += oOrder.LineItems[i].SpecialInstructions + "</td></tr>";
            }

            html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
        }

        if (loyaltyRewardsTotals > 0)
        {
            html += "<tr class ='OrderLineItem'>" +
                "<td style='width:140px' class='OrderLineItemName ReadOnly'><label for='loyaltyRewards'>Loyalty Rewards</label></td>" +
                "<td style='width:20px'></td>" +
                "<td style='text-align:right'>-$" +
                loyaltyRewardsTotals.toFixed(2) +
                "</td>" +
                "<td style='width:18px'></td></tr>";
        }

        //lets create a receipt using websalesgroup

        // loop through each combo, think of a lineId as quick combo id in case of quick combo 

        for (var i in oOrder.WebSalesGroupLineIds) 
        {
            var lineId = oOrder.WebSalesGroupLineIds[i];
            // items - OrderWebSalesGroupItems, for each lineId, they have same MenuItemName, Price (PromoPrice)
            var items = [];
            var lineitem = null;
            
            for (var co in oOrder.ComboItems) 
            {
                var wsglitems = oOrder.ComboItems[co].WebSalesGroupItems;

                //grab all the websales group line items objects, group them by lineIds
                for (var idx in wsglitems)
                {
                    if (wsglitems[idx].GroupLineId == lineId)
                    {
                        items.push(wsglitems[idx]);
                    }
                }
            }

            //build the receipt
            var totalPrice = 0;
            var totalCombinedItemPrice = 0;
            var comboStatus = 0;
            var menuItemName = items[0].MenuItemName;
            var menuItemId = 0;
            var salesitems = "";

            var itemsHtml = "";

            // loop through each combo
            for (var co in oOrder.ComboItems) 
            {
                // get list of line items under combo
                var wsglitems = oOrder.ComboItems[co].WebSalesGroupItems;
                for (var j in wsglitems)
                {
                    // if line item belongs to combo: think of a lineId as quick combo id in case of quick combo
                    if (wsglitems[j].GroupLineId != lineId)
                    {
                        continue;
                    }

                    for (var idx in oOrder.LineItems) 
                    {
                        var li = oOrder.LineItems[idx];

                        // If Item is part of this combo, add it to receipt.

                        if (wsglitems[j].LineItemNumber == li.ItemLineNumber) 
                        {
                            // price is same in each group
                            totalPrice = oOrder.ComboItems[co].Price;

                            if (totalPrice == 0)
                            {
                                totalCombinedItemPrice += li.ExtendedPrice;
                            }

                            lineitem = li;

                            if (comboStatus == 0) // this means that the current status of the combo is all good.
                            {
                                comboStatus = lineitem.Status;
                            }

                            menuItemId = lineitem.MenuItemId;
                            salesitems += lineitem.MenuItemId + ",";

                            if (!PubOrderComplete && !PubOrderReadOnly) 
                            {
                                onClick = 'onclick="CustomizeWebSalesGroupItem(' + lineitem.MenuItemId + ',' + lineitem.SalesItemId + ',' + (lineitem.ItemLineNumber) + ",'" + wsglitems[j].WebSalesGroupId + "')\" onkeypress='HandleKeyPressEvent(event);'";
                            }

                            itemsHtml += "<td style='width:160px;' class='OrderLineItemName" + nameClassModifier + "' colspan='3' " + onClick + ">" + lineitem.Name + "</td></tr>";

                            // add modifiers to line item
                            itemsHtml += DisplayModifiers(lineitem.Modifiers, "&nbsp;&nbsp;", false, oOrder);

                            if (lineitem.CompId != 0)
                            {
                                itemsHtml += DisplayItemComp(lineitem);
                            }

                            // add special instructions line (who is this for?)
                            if (!IsEmpty(lineitem.RecipientName))
                            {
                                itemsHtml += "<tr><td class='OrderInstructions' colspan='4'>";
                                itemsHtml += GetResourceObject('WebOrder.Order.ForRecipientLabel');
                                itemsHtml += "&nbsp;";
                                itemsHtml += lineitem.RecipientName + "</td></tr>";
                            }

                            if (!IsEmpty(lineitem.SpecialInstructions))
                            {
                                itemsHtml += "<tr><td class='OrderInstructions' colspan='4'>";
                                itemsHtml += GetResourceObject('WebOrder.Order.SpecialInstructionsLabel');
                                itemsHtml += "&nbsp;";
                                itemsHtml += lineitem.SpecialInstructions + "</td></tr>";
                            }

                            break;
                        }
                    }
                }
            }

            var DeleteHTML = "";
            var nameClassModifier = "";
            var qtyClassModifier = "";
            var qtyReadOnlyHTML = "";
            salesitems = salesitems.substring(0, salesitems.length - 2);

            if (!PubOrderReadOnly)
            {
                DeleteHTML = "<div class='OrderCancelLineItem' "
                    + "onclick='onDelWebSalesGroups(\"" + items[0].GroupLineId + "\")' onkeypress='HandleKeyPressEvent(event);'></div>";
            }

            var onClick = "";
            
            if (comboStatus == 0) 
            {
                html += "<tr class='OrderLineItem' style=''>";
            }
            else
            {
                html += "<tr class='OrderLineItemError' style=''>";
            }

            if (totalPrice == 0)//if no price(if its combo, there will be a price), else lets use the combined item price
            {
                totalPrice = totalCombinedItemPrice;
            }

            if (!PubOrderComplete && !PubVerifyPayment) 
            {
                html += "<td style='width:160px;' colspan='2' class='OrderLineItemNameBold" + nameClassModifier + "' "
                    + onClick + " ><label for='" + items[0].GroupLineId + "'>" + items[0].MenuItemName
                    + "</label></td>"
                    + "<td style='text-align:right'>" + "**" + CurrencyFormatted(totalPrice) + "</td>" //result.LineItems[i].Price
                    + "<td style='width:18px'>" + DeleteHTML + "</td></tr>";

            }
            else
            {
                html += "<td style='width:160px;' colspan='2' class='OrderLineItemNameBold" + nameClassModifier + "' "
                    + onClick + " ><label for='" + items[0].GroupLineId + "'>" + items[0].MenuItemName
                    + "</label></td>"
                    + "<td style='text-align:right'>" + CurrencyFormatted(totalPrice) + "</td>" //result.LineItems[i].Price
                    + "<td style='width:18px'>" + DeleteHTML + "</td></tr>";
            }

            html += itemsHtml;
            // end of items portion of receipt
            html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
        }
        
        var pesRewardsTotal = GetPesRewardDollarTotal(oOrder.OrderDiscounts);

        if (oOrder.CompId !== 0 && oOrder.CompValue > 0) 
        {
            if (oOrder.CompName !== null && oOrder.CompName !== "") 
            {
                html += "<tr class='OrderLineItem'><td colspan='3'>" + oOrder.CompName + "</td></tr>";
            }

            if (!PubOrderComplete && !PubVerifyPayment) 
            {
                html += "<tr class='OrderLineModifier'><td colspan='3'>";
                html += GetResourceObject('WebOrder.Order.DiscountAtCheckoutLabel');
                html += "</td></tr>";
            }

            html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
        }

        if (pesRewardsTotal > 0) {
            html += "<tr class='OrderLineItem'><td colspan='3'>" + GetResourceObject('WebOrder.VerifyPayment.RewardDollars') + "</td></tr>";

            if (!PubOrderComplete && !PubVerifyPayment) {
                html += "<tr class='OrderLineModifier'><td colspan='3'>";
                html += GetResourceObject('WebOrder.Order.DiscountAtCheckoutLabel');
                html += "</td></tr>";
            }

            html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
        }

        if (oOrder.PromoId != 0) 
        {
            html += "<tr class='OrderLineItem'><td colspan='3'>" + GetResourceObject('WebOrder.Order.PromoAppliedLabel') + "</td></tr>";
            if (!PubOrderComplete && !PubVerifyPayment) 
            {
                html += "<tr class='OrderLineModifier'><td colspan='3'>";
                html += GetResourceObject('WebOrder.Order.DiscountAtCheckoutLabel');
                html += "</td></tr>";
            }
            html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
        }

        html += "</table></div>";
        if ($.cookie("LoyaltyProcessor") === "Pes") {
            var promotionName = $.cookie("promotionName-" + PubOrder.OrderId + "-" + PubSiteId);
            if (promotionName !== null && promotionName !== '') {
                html += "<div id='OrderReceiptRewardOffer'>"
                    + "<div id='RewardOfferStyle'>"
                    + GetResourceObject('WebOrder.LoyaltyBanner.Offer') + ": " + promotionName
                    + "</div>"
                    + "</div>";
            }
        }
        html += "</div>";
        html += "<div id='ReceiptScrollBar' class='ReceiptScrollBar' style='display:none'>";
        html += "<div id='ReceiptScrollPageUp' class='ReceiptScrollPageUp'></div>";
        html += "<div id='ReceiptScrollButton' class='ReceiptScrollButton'></div>";
        html += "<div id='ReceiptScrollPageDown' class='ReceiptScrollPageDown'></div>";
        html += "</div><br class='Clear'/>";

        Radiant.AlohaOnline.OrderEntryService.CheckIfPesIsEnabled(onSuccessPesEnabled);
        return html;
    },    

    CreateDepositAppliedWarning: function (order) {
        var html = "";
        if (order.Payments[0] && order.Payments[0].PaymentReference === "Deposit") {
            html += "<div id='OrderNotesWarn'>*" + GetResourceObject('WebOrder.VerifyPayment.DepositAppliedMessage');
            html += "</div>";
        }
        return html;
    },

    GetDeliveryFeeHtml: function(oOrder)
    {
        var html = "";
        if (oOrder.DeliveryFeeAmount > 0) 
        {
            html += "<div class='OrderRowSubtotal'>";
            html += "<div class='OrderSubtotalPrompt'>" + GetResourceObject('WebOrder.Order.DeliveryFeeLabel') + "</div>";
            html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(oOrder.DeliveryFeeAmount) + "</div>"
            html += "</div>";
        }
        return html;
    },

    GetSubTotalHtml: function (oOrder, lineItemCompTotal) 
    {
        var html = "<div class='OrderRowSubtotal'>";
        html += "<div class='OrderSubtotalPrompt'>" + GetResourceObject('WebOrder.Order.SubTotalLabel') + "</div>";

        // we need to add back loyalty promos back to the subtotal because they are taken
        // out of the subtotal
        var loyaltyPromoRewardsTotal = 0;

        if (oOrder.RecomputedSubTotal > oOrder.SubTotalAmount) {
            loyaltyPromoRewardsTotal = oOrder.OrderDiscounts.filter(function (orderDiscount) {
                return orderDiscount.DiscountType == 1;
            }).reduce(function (total, orderDiscount) {
                return orderDiscount.Amount + total;
            }, 0);
        }

        if (!(PubOrderComplete || PubVerifyPayment))
        {
            // Include delivery fee in subtotal on order entry page. Amount is only estimated based
            // on our data. This may even change if you come here back from verify payment page,
            // cause prices are updated after successfull CTT by prices returned from CTT.
            html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(oOrder.RecomputedAmt + loyaltyPromoRewardsTotal) + "</div>";
        }
        else
        {
            // Include delivery fee on verify order / complete order page. Amount is computed by CTT call.
            html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(oOrder.SubTotalAmount - lineItemCompTotal + loyaltyPromoRewardsTotal) + "</div>";
        }
        html += "</div>";
        return html;
    },

    GetTotalsHtml: function (oOrder) {
        var html = "";
        var lineItemCompTotal = 0;
        var loyaltyRewards = oOrder.OrderDiscounts.filter(function(x) { return x.DiscountType <= 2 });
        var loyaltyRewardsTotals = 0;

        for (var i in loyaltyRewards) 
        {
            loyaltyRewardsTotals += loyaltyRewards[i].Amount;
        }

        if (loyaltyRewardsTotals === 0)
        {
            //we need to subtract out any line item comps out of the subtotal
            //for display purposes
            for (var i in oOrder.LineItems)
            {
                if (oOrder.LineItems[i].CompId != 0)
                {
                    lineItemCompTotal += oOrder.LineItems[i].CompValue;
                }
            }
        }

        html += "<div id='OrderRowSubtotalDiv'>";
        
        html += this.GetDeliveryFeeHtml(oOrder);
        html += this.GetSubTotalHtml(oOrder, lineItemCompTotal);

        if (loyaltyRewardsTotals > 0) 
        {
            html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
            html += GetResourceObject('WebOrder.Order.DiscountsLabel');
            html += "</div>";
            html += "<div class='OrderSubtotalValue'>-" + CurrencyFormatted(loyaltyRewardsTotals) + "</div></div>";
        }

        var pesRewardsTotal = GetPesRewardDollarTotal(oOrder.OrderDiscounts);
        var pesOfferTotal = GetPesOfferTotal(oOrder.OrderDiscounts);

        if (PubOrderComplete || PubVerifyPayment) 
        {
            if ((oOrder.CompId !== 0 && oOrder.CompValue > 0) || pesOfferTotal > 0) {
                var compValue = oOrder.CompId !== 0 ? oOrder.CompValue : 0;
                html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
                html += GetResourceObject('WebOrder.Order.DiscountsLabel');
                html += "</div>";
                html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(-compValue - pesOfferTotal) + "</div></div>";
            }
            if (pesRewardsTotal > 0) {
                html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
                html += GetResourceObject('WebOrder.VerifyPayment.RewardDollars') + ":";
                html += "</div>";
                html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(-pesRewardsTotal) + "</div></div>";
            }

            if (!HideTax) 
            {
                var taxString = "";
                var totalString = "";

                if (oOrder.IsFailover) {
                    taxString = "";
                    if (oOrder.OrderMode == OrderModeType_Pickup) {
                        totalString = GetResourceObject('WebOrder.Order.OrderTotalCalculatedAtPickupLabel');
                    }
                    else if (oOrder.OrderMode == OrderModeType_Delivery) {
                        totalString = GetResourceObject('WebOrder.Order.OrderTotalCalculatedAtDeliveryLabel');
                    }
                }
                else {
                    taxString = CurrencyFormatted(oOrder.TaxAmount);
                    totalString = CurrencyFormatted(oOrder.TotalAndTip);
                }

                html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";

                if (oOrder.CustomerIsTaxExempt == true)
                    html += GetResourceObject('WebOrder.VerifyPayment.TaxExemptLabel');
                else
                    html += GetResourceObject('WebOrder.Order.TaxLabel');

                html += "</div>";
                html += "<div class='OrderSubtotalValue'>" + taxString + "</div></div>";

                // Button to Remove Tip From Shopping Cart
                if (oOrder.TipAmount != 0) {
                    html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
                    html += GetResourceObject('WebOrder.Order.TipLabel');
                    html += "</div>";
                    html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(oOrder.TipAmount) + "</div>";

                    if (window.location.pathname.toLowerCase() != "/orderreceipt.aspx") {
                        html += "<div class='OrderDeleteTipAmountContainer'><div class='OrderDeleteTipAmount' id='DeleteTipAmountClick'" + "onclick='onDelTipAmount()' onkeypress='HandleKeyPressEvent(event);'></div></div></div>";
                    }
                    else {
                        html += "</div>"
                    }
                }

                html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
                html += GetResourceObject('WebOrder.Order.TotalLabel');
                html += "</div>";
                html += "<div class='OrderSubtotalValue'>" + totalString + "</div></div>";
                if (bEnableATODeposites && PubVerifyPayment) {
                    html += "<div id='OrderNotesWarn'>";
                    html += GetResourceObject('WebOrder.VerifyPayment.DepositWarningMessage');
                    html += "";
                }
                html += this.CreateDepositAppliedWarning(oOrder);
            } 
            else 
            {
                html += "<div id='OrderNotes'>";
                html += GetResourceObject('WebOrder.Order.TaxAtStoreLabel');
                html += "<br>";
                if (bEnableATODeposites && PubVerifyPayment) {
                    html += "<div id='OrderNotesWarn'>*" + GetResourceObject('WebOrder.VerifyPayment.DepositWarningMessage');
                    html += "</div>";
                }
                html += this.CreateDepositAppliedWarning(oOrder);
            }

            if (oOrder.SVCAmount > 0) {
                html += "<div class='receipt_spacer'></div>";

                html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
                html += GetResourceObject('WebOrder.Order.GiftCardAppliedLabel');
                html += "</div>";
                html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(-oOrder.SVCAmount) + "</div></div>";

                html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
                html += GetResourceObject('WebOrder.Order.AmountDueAfterGiftCardLabel');
                html += "</div>";
                html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(oOrder.AmountDueAfterGiftCard) + "</div></div>";

                if ($("input[id$=giftCardBalance]").length > 0) {
                    var gcBal = $("input[id$=giftCardBalance]").val();
                    if (gcBal != "" && gcBal !== undefined) {
                        html += "<div class='OrderRowSubtotal virtual-receipt-gift-card-top'><div class='OrderSubtotalPrompt'>";
                        html += GetResourceObject('WebOrder.UserInformation.VirtualReceiptGiftCardValueLabel');
                        html += "</div>";
                        html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(gcBal) + "</div></div>";
                    }
                }
            }

            html += "</div>";
        }
        else 
        {
            html += "</div>";
            html += "<div id='OrderNotes'>";
            if (!HideTax) {
                if (oOrder.OrderDiscounts.filter(function (x) { return x.DiscountType === 8 }).length > 0) {
                    html += GetResourceObject('WebOrder.Order.TaxAndDiscountAtCheckoutLabel');
                }
                else {
                    html += GetResourceObject('WebOrder.Order.TaxAtCheckoutLabel');
                }
                html += "<br>";
            } else {
                html += GetResourceObject('WebOrder.Order.TaxAtStoreLabel');
                html += "<br>";
            }
            if (oOrder.ComboItems != null && oOrder.ComboItems.length > 0) {
                html += GetResourceObject('WebOrder.Order.FinalPriceAtCheckoutLabel');
            }
            html += "</div>";
        }
        html += "<br class='Clear' />";

        return html;
    },

    GetNavButtonHtml: function () {
        var html = "";
        if (!PubOrderComplete) {

            if (!PubEmptyOrder && PubTime && PubDateTime == null) {
                html += RenderButton("ReceiptButtonCancel", "ButtonReceiptLeft FloatNone", "ButtonReceiptRightHover FloatNone", "center",
                                  "CancelOrder(true);", "cssclassswap",
                                  GetResourceObject('WebOrder.Order.CancelOrderButton'), "StartCancelButton");
            }
            else if (!PubVerifyPayment) {

                html += RenderButton("ReceiptButtonCancel", "ButtonReceiptLeft", null, "center",
                                  "CancelOrder(true);", "cssclassswap",
                                  GetResourceObject('WebOrder.Order.CancelOrderButton'), "StartCancelButton");

                if (!PubOrderReadOnly) {

                    html += RenderButton("ReceiptButtonCheckout", "ButtonReceiptRight FloatRight", "ButtonReceiptRightHover FloatRight", "center",
                                     "ValidateOrderForCheckout();", "cssclassswap",
                                     GetResourceObject("WebOrder.Order.ContinueToCheckoutButton"), "CheckoutModifyOrderButton");
                }
                else {
                    html += RenderButton("ReceiptButtonModify", "ButtonReceiptRight FloatRight", "ButtonReceiptRightHover FloatRight", "center",
                                     "window.location=\"OrderEntry.aspx\"", "cssclassswap",
                                      GetResourceObject("WebOrder.Order.ReturnToMenuButton"), "CheckoutModifyOrderButton");
                }
            }
            else {
                if (!PubOrderReadOnly) {

                    html += RenderButton("ReceiptButtonCheckout", "ButtonReceiptRight FloatNone", "ButtonReceiptRightHover FloatNone", "center",
                                         "ValidateOrderForCheckout();", "cssclassswap",
                                         GetResourceObject("WebOrder.Order.ContinueToCheckoutButton"), "CheckoutModifyOrderButton");
                }
                else {
                    html += RenderButton("ReceiptButtonModify", "ButtonReceiptRight FloatNone", "ButtonReceiptRightHover FloatNone", "center",
                                        "try {window.location.href=\"OrderEntry.aspx\";} catch( e ) { };", "cssclassswap",
                                          GetResourceObject("WebOrder.Order.ReturnToMenuButton"), "CheckoutModifyOrderButton");
                }
            }
        }
        return html;
    },

    ValidateOrderForCheckout: function () {

        if (PubOrder == null)
            return;

        if (PubOrder.TargetPortionCount != null && PubOrder.CurrentPortionCount < PubOrder.TargetPortionCount) {
            UnderOrderConfirmCheckout(PubOrder.CurrentPortionCount, PubOrder.TargetPortionCount);
        }
        else {
            CheckForUpsellItems();
        }
    }
};

function GetPesRewardDollarTotal(orderDiscounts) {
    var pesRewards = orderDiscounts.filter(function (x) { return x.DiscountType === 7 });
    var pesRewardsTotal = 0;
    for (var i in pesRewards) {
        pesRewardsTotal += pesRewards[i].Amount;
    }
    return pesRewardsTotal;
}

function GetPesOfferTotal(orderDiscounts) {
    var pesRewards = orderDiscounts.filter(function (x) { return x.DiscountType === 8 });
    var pesRewardsTotal = 0;
    for (var i in pesRewards) {
        pesRewardsTotal += pesRewards[i].Amount;
    }
    return pesRewardsTotal;
}

function onSuccessPesEnabled(isEnabled) {
    if (isEnabled) {
        Radiant.AlohaOnline.OrderEntryService.GetRewardPromotionIdAndName(AppendRewardOfferForEmptyReceipt);
    }
}

function AppendRewardOfferForEmptyReceipt(promotion) {
    removeRewardOffers();
    if (promotion.Item1 !== '' && promotion.Item1 !== "null" && promotion.Item1 !== null) {
        var EmptyReceiptDiv = $get("EmptyReceiptSiteText");
        var OrderNotesDiv = $get("OrderNotes");
        var OrderReceiptDiv = $get("ReceiptBox");
        if (EmptyReceiptDiv !== null && OrderNotesDiv !== null && OrderReceiptDiv === null) {
            html = (
                "<div id='EmptyReceiptRewardOffer'>" +
                    "<div id='EmptyRewardOfferStyle'>" + GetResourceObject('WebOrder.LoyaltyBanner.Offer') + ": " + promotion.Item2 + "</div>" +
                "</div>"
            );
            $(OrderNotesDiv).prepend(html);
        }

        if (OrderReceiptDiv !== null) {
            html = (
              "<div id='OrderReceiptRewardOffer'>" +
                  "<div id='RewardOfferStyle'>" + GetResourceObject('WebOrder.LoyaltyBanner.Offer') + ": " + promotion.Item2 + "</div>" +
               "</div>"
            );
            if (!HideTax) {
                $(OrderNotesDiv).text(GetResourceObject('WebOrder.LoyaltyBanner.Order.TaxAndOfferLabel'));
            } else {
                $(OrderNotesDiv).text(GetResourceObject('WebOrder.LoyaltyBanner.Order.TaxAndOfferAtStoreLabel'));
            }
            $(OrderReceiptDiv).append(html);
        }
    }
}

function removeRewardOffers() {
    var EmptyReceiptRewardOffer = $get("EmptyReceiptRewardOffer");
    var OrderReceiptRewardOffer = $get("OrderReceiptRewardOffer");
    if (EmptyReceiptRewardOffer !== null) {
        $(EmptyReceiptRewardOffer).remove();
    }
    if (OrderReceiptRewardOffer !== null) {
        $(OrderReceiptRewardOffer).remove();
        var OrderNotesDiv = $get("OrderNotes");
        if (!HideTax) {
            $(OrderNotesDiv).text(GetResourceObject('WebOrder.Order.TaxAtCheckoutLabel'));
        } else {
            $(OrderNotesDiv).text(GetResourceObject('WebOrder.Order.TaxAtStoreLabel'));
        }
    }
}

function compAppliesToOrder(order) {
    return order.CompId != 0;
}

function compAppliesToLineItem(item) {
    return item.CompId != 0;
}

function GroupOrderInviteeVirtualReceipt()
{
    VirtualReceipt.call(this);
}

GroupOrderInviteeVirtualReceipt.prototype = new VirtualReceipt();

GroupOrderInviteeVirtualReceipt.prototype.constructor = GroupOrderInviteeVirtualReceipt;

GroupOrderInviteeVirtualReceipt.prototype.DisplayPromiseTime = function (oOrder) {
    // Show promise time
    if (oOrder != null) {
        if (oOrder.PromiseDateTime == null) {
            SetHTML("PickupDiv", GetResourceObject('WebOrder.Order.NoTimeLabel'));
        }
        else {
            SetHTML("PickupDiv", FormatPromiseTime(oOrder));
        }
        
        DisableHyperLinks("order_control_section_site");
        DisableHyperLinks("order_control_section_pickup");

    }
};

GroupOrderInviteeVirtualReceipt.prototype.DisplayPortionAssistant = function (oOrder) {
    //Not relevant for group orders
};

GroupOrderInviteeVirtualReceipt.prototype.DisplayEmptyOrder = function (oOrder) {
    var oOrderDiv = $get("OrderDiv");

    OrderHTML = "<div id='OrderNotes'>";
    OrderHTML += GetResourceObject('WebOrder.Order.ReceiptEmptyInviteeOrderMessage');
    OrderHTML += "</div>";

    OrderHTML += "<br class='Clear' />";

    oOrderDiv.innerHTML = OrderHTML;
    oOrderDiv.style.display = "";
    UpdateElementsTabOrderForEmptyReceipt();
};

GroupOrderInviteeVirtualReceipt.prototype.GetTotalsHtml = function (oOrder) {
    //only show the subtotal because that is the only thing the invitee would be concerned with
    var html = "";

    var subTotal = oOrder.RecomputedSubTotal;
    //we need to subtract out any line item comps out of the subtotal
    //for display purposes
    for (var i in oOrder.LineItems) {
        if (oOrder.LineItems[i].CompId != 0) {
            subTotal -= oOrder.LineItems[i].CompValue;
        }
    }
    
    html += "<div id='OrderRowSubtotalDiv'>";
    html += "<div class='OrderRowSubtotal'><div class='OrderSubtotalPrompt'>";
    html += GetResourceObject('WebOrder.Order.SubTotalLabel');
    html += "</div>";
    html += "<div class='OrderSubtotalValue'>" + CurrencyFormatted(subTotal) + "</div></div>";
    html += "</div>";
    html += "<br class='Clear' />";

    //If there is a limit, maybe display that

    return html;
};

GroupOrderInviteeVirtualReceipt.prototype.GetNavButtonHtml = function () {
    var html = "";
    if (!PubOrderComplete) {

        html += RenderButton("ReceiptButtonSubmit", "ButtonReceiptRight FloatRight", "ButtonReceiptRightHover FloatRight", "right",
                                "ValidateOrderForCheckout();", "cssclassswap",
                                "Submit");
    }
    return html;
};

GroupOrderInviteeVirtualReceipt.prototype.ValidateOrderForCheckout = function () {
    window.location = "Submit.aspx";
};

function GroupOrderOrganizerVirtualReceipt() {
    VirtualReceipt.call(this);
}

GroupOrderOrganizerVirtualReceipt.prototype = new VirtualReceipt();

GroupOrderOrganizerVirtualReceipt.prototype.constructor = GroupOrderOrganizerVirtualReceipt;

GroupOrderOrganizerVirtualReceipt.prototype.DisplayPromiseTime = function (oOrder) {
    // Show promise time
    if (oOrder != null) {
        if (oOrder.PromiseDateTime == null) {
            SetHTML("PickupDiv", GetResourceObject('WebOrder.Order.NoTimeLabel'));
        }
        else {
            SetHTML("PickupDiv", FormatPromiseTime(oOrder));
        }

        DisableHyperLinks("order_control_section_site");
        DisableHyperLinks("order_control_section_pickup");
    }
};

GroupOrderOrganizerVirtualReceipt.prototype.DisplayEmptyOrder = function (oOrder) {
    var oOrderDiv = $get("OrderDiv");

    OrderHTML = "<div id='OrderNotes'>";
    OrderHTML += FormatResourceString(GetResourceObject('WebOrder.Order.ReceiptEmptyGroupOrderMessage'),
                                                GetMaxOrderDollarAmount());
    OrderHTML += "</div>";

    OrderHTML += "<br class='Clear' />";

    OrderHTML += RenderButton("ReceiptButtonStart", "ButtonReceiptLeft FloatNone", "ButtonReceiptLeftHover FloatNone",
                                        "center", "window.location=\"\/StartOrder.aspx\"", "cssclassswap",
                                        GetResourceObject('WebOrder.Order.StartNewOrderButton'), "StartCancelButton");
    oOrderDiv.innerHTML = OrderHTML;
    oOrderDiv.style.display = "";
    UpdateElementsTabOrderForEmptyReceipt();
};

GroupOrderOrganizerVirtualReceipt.prototype.GetNavButtonHtml = function () {
    var html = "";
    if (!PubOrderComplete) {

        if (!PubEmptyOrder && PubTime && PubDateTime == null) {
            html += RenderButton("ReceiptButtonCancel", "ButtonReceiptLeft FloatNone", "ButtonReceiptRightHover FloatNone", "center",
                                  "CancelOrder(true);", "cssclassswap",
                                  GetResourceObject('WebOrder.Order.CancelOrderButton'), "StartCancelButton");
        }
        else if (!PubVerifyPayment) {
            html += RenderButton("ReceiptReturnGroup", "ButtonReceiptLeft FloatNone", "ButtonReceiptLeftHover FloatNone",
                            "left", "window.location=\"\/StartOrder.aspx\"", "cssclassswap",
                            "New Order", "StartCancelButton");

            if (!PubOrderReadOnly) {

                html += RenderButton("ReceiptButtonCheckout", "ButtonReceiptRight FloatRight", "ButtonReceiptRightHover FloatRight", "center",
                                             "ValidateOrderForCheckout();", "cssclassswap",
                                             GetResourceObject("WebOrder.Order.ContinueToCheckoutButton"), "CheckoutModifyOrderButton");
            }
            else {
                html += RenderButton("ReceiptButtonModify", "ButtonReceiptRight FloatRight", "ButtonReceiptRightHover FloatRight", "center",
                                             "window.location=\"\/OrderEntry.aspx\"", "cssclassswap",
                                              GetResourceObject("WebOrder.Order.ReturnToMenuButton"), "CheckoutModifyOrderButton");
            }
        }
        else {
            if (!PubOrderReadOnly) {

                html += RenderButton("ReceiptButtonCheckout", "ButtonReceiptRight FloatNone", "ButtonReceiptRightHover FloatNone", "center",
                                             "ValidateOrderForCheckout();", "cssclassswap",
                                             GetResourceObject("WebOrder.Order.ContinueToCheckoutButton"), "CheckoutModifyOrderButton");
            }
            else {
                html += RenderButton("ReceiptButtonModify", "ButtonReceiptRight FloatNone", "ButtonReceiptRightHover FloatNone", "center",
                                             "window.location=\"\/OrderEntry.aspx\"", "cssclassswap",
                                              GetResourceObject("WebOrder.Order.ReturnToMenuButton"), "CheckoutModifyOrderButton");
            }
        }
    }
    return html;
};

GroupOrderOrganizerVirtualReceipt.prototype.DisplayPortionAssistant = function (oOrder) {
    //Not relevant for group orders
};

function GroupOrderByNameVirtualReceipt()
{
    VirtualReceipt.call(this);
}

GroupOrderByNameVirtualReceipt.prototype = new VirtualReceipt();

GroupOrderByNameVirtualReceipt.prototype.constructor = GroupOrderByNameVirtualReceipt;
GroupOrderByNameVirtualReceipt.prototype.DisplayPortionAssistant = function (oOrder) {
};

GroupOrderByNameVirtualReceipt.prototype.DisplayGroupOrderNames = function (oOrder) {
    var oTabs = $get("OrderControlButtons");
    var oTabsStyle = null;

    if (oTabs != null)
        oTabsStyle = GetStyle(oTabs);
    if (oOrder != null && oTabsStyle != null) {
        oTabs.style.display = "inline";
        var selectedTab = $get("SelectedTab");
        var selectedTabValue = "1";

        if (window.location.pathname.toLowerCase() == "/time.aspx") {
            selectedTabValue = "0";
        }

        if (selectedTab != null)
            selectedTabValue = selectedTab.value;

        var tabsHTML = "";

        var t0Class = "ButtonReceiptTab";
        var t1Class = "ButtonReceiptTab";

        switch (selectedTabValue) {
            case "0":
                t0Class = "ButtonReceiptTabSelected";
                $get("GroupOrderNames").style.display = "none";
                $get("OrderControls").style.display = "block";
                break;
            case "1":
                t1Class = "ButtonReceiptTabSelected";
                $get("GroupOrderNames").style.display = "block";
                $get("OrderControls").style.display = "none";
                break;
        }

        tabsHTML += "<div id=\"ShowSiteButton\" class=\"" + t0Class + " Left\" onclick=\"ToggleReceiptFooterControls(0)\" onkeypress='HandleKeyPressEvent(event);'>";
        tabsHTML += "<span>" + GetResourceObject('WebOrder.Order.ShowOrderDetailsButton') + "</span></div>";

        tabsHTML += "<div id=\"ShowPAButton\" class=\"" + t1Class + " Right\" onclick=\"ToggleReceiptFooterControls(1)\" onkeypress='HandleKeyPressEvent(event);'>";
        tabsHTML += "<span>" + GetResourceObject('WebOrder.Order.UnorderedButton') + "</span></div>";

        tabsHTML += "<input id=\"SelectedTab\" type=\"hidden\" runat=\"server\" value=\"" + selectedTabValue + "\"/>";

        SetHTML("OrderControlButtons", tabsHTML);

        var sTargetPortion;
        if (oOrder.TargetPortionCount == null) {
            sTargetPortion = 0;
        }
        else {
            sTargetPortion = oOrder.TargetPortionCount;
        }

        var targetPortionReadOnly = "";
        var targetPortionClassModifier = "";

        if (PubOrderReadOnly) {
            targetPortionReadOnly = "readonly='readonly'";
            targetPortionClassModifier = " ReadOnly";
        }
        var oOrderActiveDiv = GetElementsByClassName(document, "order");
        var html = "<b>" + GetResourceObject('WebOrder.Order.StillNeedFoodLabel') + "</b>";
        html += "<br/><div id=\"GroupOrderNamesList\">";
        html += "<table id=\"GroupOrderNamesTable\" cellspacing=\"0\" cellpadding=\"2\" border=\"0\" role=\"presentation\">";
        html += "<col width=\"177\" />";
        html += "<col width=\"37\" />";
        html += "<tbody>";

        for (recipient in oOrder.Recipients) {
            var recipientName = oOrder.Recipients[recipient].RecipientName;
            var isUsed = true;
            for (lineitem in oOrder.LineItems) {
                if (recipientName == oOrder.LineItems[lineitem].RecipientName) {
                    isUsed = false;
                }
            }
            if (isUsed) {
                html += "<tr><td>" + recipientName + "</td><td><div class='GroupOrderInviteeRemoveAction' onkeypress='javascript: if(event.keyCode === 13) RemoveRecipient(event);' onclick='RemoveRecipient(event)' id='RecipientName" + oOrder.Recipients[recipient].RecipientId + "'></div></td></tr>";
            }
        }
        html += "</tbody>";
        html += "</table>";
        html += "</div>";
        oOrderActiveDiv[0].style.height = "440px";
        if (oOrder.PromiseDateTime == null) {
            SetHTML("GroupOrderNames", html);
        }
        else {
            SetHTML("GroupOrderNames", html);
        }
    }
};

function RemoveRecipient(event) {
    var e = getEventTarget(event) || event;
    var nIndex = e.parentNode.parentNode.rowIndex;
    var oTable = document.getElementById("GroupOrderNamesTable");
    oTable.deleteRow(nIndex);
    var recipientId = e.id;
    recipientId = recipientId.charAt(recipientId.length - 1);
    //AJAX call to delete table row
    Radiant.AlohaOnline.OrderEntryService.DeleteRecipientRow(recipientId, null, GetWebServiceFailed, "DeleteRecipientRow()");
    nIndex = oTable.rows.length;
    $("#GroupOrderNamesTable").find('tr:first div.GroupOrderInviteeRemoveAction').focus();
}

GroupOrderByNameVirtualReceipt.prototype.GetReceiptBoxHtml = function (oOrder) {
    var html = "<div id='ReceiptBox' style='height:275px'><div id='ReceiptContent'>";
    html += "<table width='100%' role='presentation'>";
    for (var i in oOrder.LineItems) {
        var DeleteHTML = "";
        var nameClassModifier = "";
        var qtyClassModifier = "";
        var qtyReadOnlyHTML = "";
        var item = oOrder.LineItems[i];

        if (PubOrderReadOnly) {
            nameClassModifier = " ReadOnly";
            qtyClassModifier = " ReadOnly";
            qtyReadOnlyHTML = "readonly='readonly'";
        }

        if (item.ItemOrderingMode == ItemOrderingMode_ModifierDeterminesQty) {
            qtyClassModifier = " ReadOnly";
            qtyReadOnlyHTML = "readonly='readonly'";
        }

        if (!PubOrderReadOnly) {
            DeleteHTML = "<div class='OrderCancelLineItem' "
                           + "onclick='onDelOrderLine(" + item.ItemLineNumber + ")' onkeypress='HandleKeyPressEvent(event);'></div>";
        }

        var onClick = "";
        if (!PubOrderComplete && !PubOrderReadOnly) {
            onClick = "onclick='CustomizeItem(" + item.MenuItemId + "," + item.SalesItemId + "," + (item.ItemLineNumber) + ");' onkeypress='HandleKeyPressEvent(event);' ";
        }

        if (item.Status == 0) {
            html += "<tr class='OrderLineItem' style=''>";
        }
        else {
            html += "<tr class='OrderLineItemError' style=''>";
        }

        html += "<td style='width:140px;' class='OrderLineItemName" + nameClassModifier + "' "
                     + onClick + " >" + item.Name
                     + "</td>" //result.LineItems[i].ItemName
                     + "<td style='width:20px'>"
                     + "<input type='text' " + qtyReadOnlyHTML + " onChange='onQtyChange(" + item.ItemLineNumber + ",this.value)'"
                     + " class='OrderLineItemQty" + qtyClassModifier + "' maxlength='3' value='" + item.Quantity + "'/></td>"
                     + "<td style='text-align:right'>" + CurrencyFormatted(item.ExtendedPrice) + "</td>" //result.LineItems[i].Price
                     + "<td style='width:18px'>" + DeleteHTML + "</td></tr>";

        // add modifiers to line item
        html += DisplayModifiers(oOrder.LineItems[i].Modifiers, "", false, oOrder);

        // add special instructions line (who is this for?)
        if (!IsEmpty(oOrder.LineItems[i].RecipientName)) {
            html += "<tr><td class='OrderInstructions' colspan='4'>";
            html += GetResourceObject('WebOrder.Order.ForRecipientLabel');
            html += "&nbsp;";
            html += oOrder.LineItems[i].RecipientName + "</td></tr>";
        }
        if (!IsEmpty(oOrder.LineItems[i].SpecialInstructions)) {

            html += "<tr><td class='OrderInstructions' colspan='4'>";
            html += GetResourceObject('WebOrder.Order.SpecialInstructionsLabel');
            html += "&nbsp;";
            html += oOrder.LineItems[i].SpecialInstructions + "</td></tr>";
        }

        if (compAppliesToOrder(oOrder) && !compAppliesToLineItem(item)) {
            html += DisplayCompNotQualifiedForLineItem(item);
        }
        else if (compAppliesToLineItem(item) && !compAppliesToOrder(oOrder)) {
            html += DisplayItemComp(item);
        }

        // end of items portion of receipt
        html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
    }

    var pesRewardsTotal = GetPesRewardDollarTotal(oOrder.OrderDiscounts);

    if (oOrder.CompId !== 0 && oOrder.CompValue > 0) {
        if (oOrder.CompName != null && oOrder.CompName != "") {
            html += "<tr class='OrderLineItem'><td colspan='3'>" + oOrder.CompName + "</td></tr>";
        }
        if (!PubOrderComplete && !PubVerifyPayment) {
            html += "<tr class='OrderLineModifier'><td colspan='3'>";
            html += GetResourceObject('WebOrder.Order.DiscountAtCheckoutLabel');
            html += "</td></tr>";
        }
        html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
    }
    if (pesRewardsTotal > 0) {
        html += "<tr class='OrderLineItem'><td colspan='3'>" + GetResourceObject('WebOrder.VerifyPayment.RewardDollars') + "</td></tr>";

        if (!PubOrderComplete && !PubVerifyPayment) {
            html += "<tr class='OrderLineModifier'><td colspan='3'>";
            html += GetResourceObject('WebOrder.Order.DiscountAtCheckoutLabel');
            html += "</td></tr>";
        }

        html += "<tr class='receipt_spacer'><td colspan='4'>&nbsp;</td></tr>";
    }
    html += "</table></div></div>";
    html += "<div id='ReceiptScrollBar' class='ReceiptScrollBar' style='display:none; height:201px;'>";
    html += "<div id='ReceiptScrollPageUp' class='ReceiptScrollPageUp'></div>";
    html += "<div id='ReceiptScrollButton' class='ReceiptScrollButton'></div>";
    html += "<div id='ReceiptScrollPageDown' class='ReceiptScrollPageDown'></div>";
    html += "</div><br class='Clear'/>";

    return html;
};

function SetVirtualReceiptType(orderType) {
    if (orderType == OrderType_GroupOrderInvitee) {
        PubVirtualReceipt = new GroupOrderInviteeVirtualReceipt();
    }
    else if (orderType == OrderType_GroupOrderOrganizer) {
        PubVirtualReceipt = new GroupOrderOrganizerVirtualReceipt();
    }
    else if (orderType == OrderType_GroupOrderByName) {
        PubVirtualReceipt = new GroupOrderByNameVirtualReceipt();
    }
    else {
        PubVirtualReceipt = new VirtualReceipt();
    }
}

function DisplayOrder(oOrder, bScrollToEnd) {
    PubVirtualReceipt.DisplayOrder(oOrder, bScrollToEnd);
}

function SwapReceiptBuffer(bScrollToEnd) {
    var oOrderBufferDiv = $get("OrderBufferDiv");
    var oOrderActiveDiv = $get("OrderDiv");
    var oOldBufferParent = oOrderBufferDiv.parentNode;
    var oOldActiveParent = oOrderActiveDiv.parentNode;

    var bufferHeight = 0;
    var bufferContent = GetChildById(oOrderBufferDiv, "ReceiptContent");
    var bufferButton = GetChildById(oOrderBufferDiv, "ReceiptScrollButton");
    oOrderActiveDiv.parentNode.removeChild(oOrderActiveDiv);
    oOrderActiveDiv.id = "OrderBufferDiv";
    oOrderActiveDiv.style.display = "none";
    oOrderActiveDiv.style.visibility = "hidden";
    oOrderBufferDiv.parentNode.removeChild(oOrderBufferDiv);
    oOrderBufferDiv.id = "OrderDiv";
    oOrderBufferDiv.style.display = "";
    oOrderBufferDiv.style.visibility = "visible";

    oOldBufferParent.appendChild(oOrderActiveDiv);
    oOldActiveParent.appendChild(oOrderBufferDiv);

    if (bufferContent != null) {
        bufferHeight = bufferContent.offsetHeight;
    }

    ScrollBar.Create(bufferButton, bufferContent);

    // Show scrollbar
    if (bScrollToEnd && (bufferHeight != 0)) {
        ScrollBar.MoveToEnd(bufferButton, bufferContent);
    }
}
//
// Site
//

function GetExistingOrderAndSiteInfo() {
    Radiant.AlohaOnline.OrderEntryService.GetExistingOrderAndSiteInfo(PubOrderComplete, GetOrderAndSiteInfoHTMLOK,
    GetWebServiceFailed, "GetExistingOrderAndSiteInfoHTML()");
}

function GetOrderAndSiteInfo() {
    Radiant.AlohaOnline.OrderEntryService.GetOrderAndSiteInfo(GetOrderAndSiteInfoHTMLOK,
    GetWebServiceFailed, "GetOrderAndSiteInfoHTML()");
}

function GetSiteInfo() {
    Radiant.AlohaOnline.OrderEntryService.GetOrderAndSiteInfo(GetSiteInfoHTMLOK,
    GetWebServiceFailed, "GetOrderAndSiteInfoHTML()");
}

function GetSiteInfoHTMLOK(oInfo) {
    //GetSiteInfo is before GetOrder so that the site ordering state can be set
    GetSiteInfoOK(oInfo.SiteInfo);
}

function GetOrderAndSiteInfoHTMLOK(oInfo) {
    //GetSiteInfo is before GetOrder so that the site ordering state can be set
    GetSiteInfoOK(oInfo.SiteInfo);
    GetOrderOK(oInfo.Order);
}

function GetOrderMode(oOrder) {
    if (oOrder == null) {
        oOrder = PubOrder;
    }
    if (oOrder != null) {
        return oOrder.OrderMode;
    }
    else {
        var sCookieMode = getCookie("OrderMode");
        var iCookie = parseInt(sCookieMode, 10);
        if (iCookie > 0) {
            return iCookie;
        }
    }
    return OrderModeType_Pickup;
}

function IsEmptyOrNullString(value) {
    if ((value == null) ||
        (value.length == 0)) {
        return true;
    }
    else {
        return false;
    }
}

function GetSiteInfoOK(Site) {
    var HTML = "";
    if (Site != null) {
        if (Site.SessionExpired)
        {
            SessionExpired();
        }
        PubSiteOrderBrowseOnly = Site.OrderingState == SiteOrderingState_NotAcceptingOrders;
        PubSiteHtmlFragment = Site.HtmlFragment;

        var DefaultSubMenuId = "";
        HTML += "<span id='StoreName'>" + Site.SiteName.substring(0, 20) + "</span><br/>";
        if (!IsEmptyOrNullString(Site.AddressLine1)) {
            HTML += Site.AddressLine1.substring(0, 30) + "<br/>";
        }
        if (!IsEmptyOrNullString(Site.City)) {
            HTML += Site.City.substring(0, 20) + ", ";
        }
        if (!IsEmptyOrNullString(Site.State)) {
            HTML += Site.State + " ";
        }
         if (!IsEmptyOrNullString(Site.Postal)) {
            HTML += Site.Postal + "<br/>";
        }
        if (!IsEmptyOrNullString(Site.VoicePhone)) {
            HTML += Site.VoicePhone;
        }
        HTML += "<br/><br/>";

        if (Site.DefaultSubMenuId != null) {
            DefaultSubMenuId = Site.DefaultSubMenuId;
        }

        HTML += "<input id='__SiteDefaultSubMenuId' type='hidden' value='" + DefaultSubMenuId + "' />";
    }
    else {
        HTML = GetResourceObject('WebOrder.Order.NoSiteLabel');
    }
    SetHTML("SiteInfoDiv", HTML);
    SetHTML("PickupSiteInfo", HTML);
}

function GetSiteInfoHTML() {
    Radiant.AlohaOnline.OrderEntryService.GetSiteInfo(GetSiteInfoOK, GetWebServiceFailed, "GetSiteInfo()");
}

function GetSiteMenuHTML() {
    Radiant.AlohaOnline.OrderEntryService.GetSiteMenu(GetSiteMenuOK, GetWebServiceFailed, "GetSiteMenu()");
}
//
// Display Site List for selection
//
function GetSiteListHTML() {
    Radiant.AlohaOnline.OrderEntryService.GetSiteList(GetSiteListOK, GetSiteListFail, "user context");
}

function GetSiteListOK(result) {
    if ((result == "SessionExpired") ||result.SessionExpired)
    {
        SessionExpired();
    }
    document.getElementById('Locations').innerHTML = result;
    SetTabIndexForLocationsPageButtons();
 
}

function SetTabIndexForLocationsPageButtons() {
    //set tabindex of locations button starting from  11
    var tabindex = 11;
    $("div[uniqueattribute$=SelectLocationButton]").each(function () {
        $(this).attr('tabindex', tabindex);
        tabindex++;
    });
}
function GetSiteListFail(result)
{
    GetWebServiceFailed(result, "GetSiteList");
    //alert("Get Site List Failed!!! " + result);
}

function GetSubMenuNode(subMenuId) {
    return PubSubMenus[subMenuId];
}

function ConfigureSiteMenu(strMenu) {

    var SubMenuId = "";
    try {
        if (strMenu.length == 0) {
            window.location = "Error.aspx?ErrorCode=1&Details=Order.js-ConfigureSiteMenu";
        }

        PubMenu = eval('(' + strMenu + ')');

        if ((PubMenu.RedirectURL != null) &&
            (PubMenu.RedirectURL != "")) {
            window.location = PubMenu.RedirectURL;
            return;
        }
        else if (PubMenu.SessionExpired && (typeof (MenuMode) === "undefined")) {
            SessionExpired();
            return;
        }

        PubSubMenus = new Array();

        for (var i = 0; i < PubMenu.Children.length; i++) {
            var child = PubMenu.Children[i];
            PubSubMenus[child.SubMenuId] = child;
        }

        $get('MenuContent').innerHTML = PubMenu.HTML;
        SubMenuId = $get("__SiteDefaultSubMenuId").value;
    }
    catch (ex) {
    }

    //if the site did not specify a default sub menu see if the menu specified one
    //(it doesn't appear the site default sub menu functionality works anyway...)
    if (!SubMenuId) {
        var menuDefaultSubMenuId = $get("__MenuDefaultSubMenuId");

        if (menuDefaultSubMenuId != null) {
            SubMenuId = menuDefaultSubMenuId.value;
        }
    }

    if (SubMenuId) {

        var mcr = $get("MenuCategoryRow_" + SubMenuId + "_Normal");

        if (mcr) {
            mcr.click();
        }
    }

    setTimeout("VerticalPageBox.Create($get('MenuCategoryMoreButton'), $get('MenuCategoryContent'));", 100);

    //It seems like the PreloadImages function is causing Chrome to not load images
    //until the browser is shutdown and restarted. Also we are waiting until after the menu loads so 
    //that the menu category requests don't get queued up after other images we won't see
    if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
        PreloadImages();
    }

    // set tab order event for menu buttons
    var tabindex = 11; //start tabindex for menuitems
    $('.MenuCategoryRow').each(function () {
        $(this).attr('tabindex', tabindex);
        tabindex++;
    });
}
//
// Display Menu for selected Site
//
function GetSiteMenuOK(result) {

    var SubMenuId = "";
    try {
        if (result.length == 0) {
            window.location = "Error.aspx?ErrorCode=1&Details=Order.js-GetSiteMenuOK";
        }

        if (result == "SessionExpired")
        {
            SessionExpired();
            return;
        }

        PubMenu = eval('(' + result + ')');

        if ((PubMenu.RedirectURL != null) &&
            (PubMenu.RedirectURL != "")) {
            window.location = PubMenu.RedirectURL;
            return;
        }
        else if (PubMenu.SessionExpired && (typeof (MenuMode) === "undefined")) {
            SessionExpired();
            return;
        }

        PubSubMenus = new Array();

        for (var i = 0; i < PubMenu.Children.length; i++) {
            var child = PubMenu.Children[i];
            PubSubMenus[child.SubMenuId] = child;
        }

        $get('MenuContent').innerHTML = PubMenu.HTML;
        SubMenuId = $get("__SiteDefaultSubMenuId").value;
    }
    catch (ex) {
    }

    //if the site did not specify a default sub menu see if the menu specified one
    //(it doesn't appear the site default sub menu functionality works anyway...)
    if (!SubMenuId) {
        var menuDefaultSubMenuId = $get("__MenuDefaultSubMenuId");

        if (menuDefaultSubMenuId != null) {
            SubMenuId = menuDefaultSubMenuId.value;
        }
    }

    if (SubMenuId) {

        var mcr = $get("MenuCategoryRow_" + SubMenuId + "_Normal");

        if (mcr) {
            mcr.click();
        }
    }

    setTimeout("VerticalPageBox.Create($get('MenuCategoryMoreButton'), $get('MenuCategoryContent'));", 100);

    //It seems like the PreloadImages function is causing Chrome to not load images
    //until the browser is shutdown and restarted. Also we are waiting until after the menu loads so 
    //that the menu category requests don't get queued up after other images we won't see
    if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
        PreloadImages();
    }

    // set tab order event for menu buttons
    var tabindex = 11; //start tabindex for menuitems
    $('.MenuCategoryRow').each(function (){
        $(this).attr('tabindex', tabindex);
        tabindex++;
    });
}

function GetSiteMenuFail(result) 
{
    GetWebServiceFailed(result, "GetSiteMenu");
    //alert("Get Site Menu Failed!!! " + result);
}

function GetSubMenuHeaderHTML(SubMenuId) {
    var Node = GetSubMenuNode(SubMenuId);

    if (Node == null) {
        return "";
    }

    if (!Node.IsShowHeader) {
        return "";
    }

    var HTML = "";
    var sTitle = "";

    var oHTMLfrag = Node.TitleTextImage;
    //The old OrderEntryService code used description and not name for $get("_SubMenuName_" + SubMenuId).value;
    //var SubMenuName = $get("_SubMenuName_" + SubMenuId).value;
    var SubMenuName = Node.Description;
    var SubMenuImage = Node.TitleBackgroundImage;
    var SubMenuImageText = Node.TitleTextImage;

    // Optional show text and graphic
    if ((SubMenuImageText != null) && (SubMenuImageText != "")) {
        //For some reason FireFox 3.6.17 and maybe other versions was treating this as a image that needs to be
        //fetched when this was in OrderEntry.aspx even though its in a java script section
        SubMenuImageText = "<img src='" + SubMenuImageText + "' />";
    }

    HTML += "<div id='SubMenuPanel'>";
    HTML += "<div class='SubMenuHeader' style='border:none 1px blue;'>";
    if (SubMenuImage != "") {
        var imageName = GetResourceObject("submenutitle_" + SubMenuId + ".png");
        imageName = (typeof imageName !== 'undefined') ? imageName : "";
        sTitle = "<div class='SubMenuTitle' title='" + imageName + "' style='background-image:url(" + SubMenuImage + ") !important;";
        sTitle += "background-image: none; filter: none !important;";
        sTitle += "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + SubMenuImage + "\", sizingMethod=\"image\");' >";
        sTitle += SubMenuImageText + "</div>";
        if (PubMenuAlign == 1) {
            HTML += sTitle;
        }
    }

    if (SubMenuImage == "" || PubMenuAlign == 2) {
        HTML += "<span>" + SubMenuName + "</span>";
        HTML += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
    }

    HTML += "</div><br class='clear'/>";

    if ((oHTMLfrag != null) && (oHTMLfrag.innerHTML != null) && (oHTMLfrag.innerHTML != "")) {
        // add Submenu custom HTML fragment to header
        HTML += "<div class='SubMenuDescription'>" + oHTMLfrag.innerHTML + "</div>";
    }

    if (PubMenuAlign == 2) {
        HTML += sTitle;
    }

    HTML += "</div>";

    return HTML;
}

//
//
//
var previousColor;

function MakeRed(event) {
    previousColor = getEventTarget(event).style.color;
    getEventTarget(event).style.backgroundColor = "#99CCFF";
}
function RestoreColor(event) {
    getEventTarget(event).style.backgroundColor = previousColor;
}

function SelectSite(siteId, feeId) {
    if (feeId == null || feeId == "") {
        feeId = 0;
    }
    Radiant.AlohaOnline.OrderEntryService.SetSiteId(siteId, feeId, SetSiteOK, GetWebServiceFailed, "user context");
}

function SetSiteOK(result) {
    if (result) {
        if (result.Success) {
            if (result.redirectPage) {
                window.location = result.redirectPage;
            }
            else {
                window.location = "Menus.aspx";
            }
        }
        else if (result.HasMessage) {
            DisplayQuestion(result.Message, result.OkText, result.CancelText, 
                result.OkCode, result.CancelCode);
        }
        else {
            window.location = "Error.aspx?ErrorCode=1&Details=Order.js-SetSiteOK-1";
        }
    }
    else {
        window.location = "Error.aspx?ErrorCode=1&Details=Order.js-SetSiteOK-2";
    }
}

function ToggleReceiptFooterControls(tabSelection) {

    var oOrderDetails = $get("OrderControls");
    var oOrderPortionAssistant;
    if (PubOrder.OrderType == OrderType_GroupOrderByName) {
        oOrderPortionAssistant = $get("GroupOrderNames");
    }
    else if (PubOrder.OrderType == OrderType_PortionAssistant) {
        oOrderPortionAssistant = $get("OrderPortionAssistant");
    }
    var selectedTab = $get("SelectedTab");
    var oTab0 = $get("ShowSiteButton");
    var oTab1 = $get("ShowPAButton");

    selectedTab.value = tabSelection;

    if (tabSelection == 0) {
        oTab0.className = "ButtonReceiptTabSelected";
        oTab1.className = "ButtonReceiptTab";

        oOrderDetails.style.display = "";
        oOrderPortionAssistant.style.display = "none";
    }
    else if (tabSelection == 1) {
        oTab0.className = "ButtonReceiptTab";
        oTab1.className = "ButtonReceiptTabSelected";

        oOrderDetails.style.display = "none";
        oOrderPortionAssistant.style.display = "";
    }

    oTab0.className += " Left";
    oTab1.className += " Right";
}

function PortionAssistantCurrentDisplay(current) {

    var paCurrentDiv = $get("PortionAssistantCurrent");

    if (paCurrentDiv != null) {
        paCurrentDiv.innerHTML = FormatResourceString(GetResourceObject('WebOrder.Order.PortionAssistantCurrentPortionCountLabel'),
                                                      Math.floor(current));
    }
}

function PortionAssistantGraphicDisplay(current, target) {

    var paPicDiv = $get("PortionAssistantPic");

    var fileName = "portion_assistant_";
    var fileIndex = "";
    var fileExtension = ".png";

    var numGraphics = GetPortionAssistantNumGraphics();
    var maxFedPercentage = GetPortionAssistantMaxFedPercentage() / 100;

    var range = Math.round((maxFedPercentage / numGraphics) * 100) / 100;
    var currentPercentage = current / target;

    if (current == 0 || target == null || target == 0) {
        fileIndex = "zero";
    }
    else if (currentPercentage > maxFedPercentage) {
        fileIndex = "max";
    }
    else {
        var index = 1;
        while (index <= numGraphics) {
            if (currentPercentage <= range * index) {
                fileIndex = index;
                break;
            }

            index++;
        }
    }

    var fullFileName = fileName + fileIndex + fileExtension;

    if (paPicDiv != null) {
        paPicDiv.innerHTML = "<img src='" + GetServerContentLocation(fullFileName) + "'/>";
    }
}

var PubVirtualReceipt = new VirtualReceipt();

var PubCustomizeItemContainer = null;
var PubSiteId;
var PubSubMenuId = 0;
var PubItemId = 0;
var PubItemHeaderId = 0;
var PubItemOrderingMode = 0;
var PubDefaultItemId = 0;
var PubSelectedSubMenuElem = null;
var PubSelectedOptionGroupNodeId = null;
var PubShowFullDesc = true;
var PubSkipPopupIfNoModifiers = true;
var PubMenuAlign = 1;
var PubBrowserTouchupDimensions = true;
var PubLastPage = 1;
var PubLineItemNumber = -1; // Editing current item
var PubHierarchy;
var PubHierarchyNodes = null;
var PubHierarchySelections = null;
var PubInitialQuantitySelection = false;

var CreatedTabScroll = new Object;

var ORDER_MODE_DEFAULT = 0;
var ORDER_MODE_PIZZA = 1;
var ORDER_MODE_QTY = 2;
var ORDER_MODE_BYO = 3;

var SELECTION_REASON_RECIPE = 1;
var SELECTION_REASON_DEFAULT = 2;
var SELECTION_REASON_ORDERED = 3;

var modifierAction = {
    Default: 0,
    Add: 1,
    No: 2,
    Extra: 4,
    Side: 8,
    Light: 16,
    Everything: 32,
    Plain: 64
};

var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
var isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6') != -1;
var selectedItemsFromSalesGroups = [];
var webSalesGroupSelectedItems = [];


function InitOrderEntryVariables(skipPopupIfNoModifiers, menuAlign, browserTouchupDimensions) {

    PubOrderReadOnly = false;

    PubSkipPopupIfNoModifiers = skipPopupIfNoModifiers;
    PubMenuAlign = menuAlign;
    PubBrowserTouchupDimensions = browserTouchupDimensions;
    document.onselectstart = function () { return false; }

    if (typeof (document.onselectstart) != "undefined") {
        document.onselectstart = Unselectable.enable;
        document.onselect = Unselectable.enable;
    } else {
        document.onmousedown = Unselectable.enable;
        document.onmouseup = Unselectable.disable;
    }
}

function setBodyHeightToContentHeight() {
    document.body.style.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) + "px";
}

function showModalPopupViaClient(ev) {
    ev.preventDefault();
    var modalPopupBehavior = $find('programmaticModalPopupBehavior');
    modalPopupBehavior.show();
}

function hideModalPopupViaClient(ev) {
    ev.preventDefault();
    var modalPopupBehavior = $find('programmaticModalPopupBehavior');
    modalPopupBehavior.hide();
}

function onDelOrderLine(itemLineNumber) {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Removed',
            eventLabel: 'Sales Item'
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Removed',
            eventLabel: 'Sales Item'
        });
    }

    Radiant.AlohaOnline.OrderEntryService.DeleteOrderLine(itemLineNumber, DeleteOrderLineOK, WebServiceActionFailed);
}

function WebServiceActionFailed(error) {
    GetWebServiceFailed({ message: error.get_message() }, "user context");
}

function postAjaxJSON(settings) {
    settings.type = 'POST';
    settings.dataType = 'json';
    settings.contentType = 'application/json; charset=utf-8';
    $.ajax(settings);
}

function onDelWebSalesGroups(groupLineId) {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Removed',
            eventLabel: 'Combo Item'
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Removed',
            eventLabel: 'Combo Item'
        });
    }

    Radiant.AlohaOnline.OrderEntryService.DeleteOrderLineItems(groupLineId, DeleteOrderLineOK, WebServiceActionFailed);
}

function RefreshNewToken() {
    var selectedTokenValue = $('#tokenCardNumber option:selected').val();
    var isNewToken = selectedTokenValue === '00000000-0000-0000-0000-000000000000';
    if (isNewToken) {
        clearPayment();
    }
}

// Set TipAmount to 0 and refresh from shopping cart
function onDelTipAmount() {
    Radiant.AlohaOnline.OrderEntryService.DeleteOrderTipAmount(DeleteOrderTipAmountOK, WebServiceActionFailed);
    $('#ctl00_ctl00_Content_Content_TipAmount').attr('value', '');
}

function DeleteOrderLineOK(result) {

    if (result.SessionExpired) {
        SessionExpired();
    }
    else {
        GetOrder();
    }
}

function DeleteOrderTipAmountOK(result) {
    if (result.sessionExpired) {
        SessionExpired();
    }
    else if (result.Result) {
        GetOrder();

        if (result.TokenProviderType === 2) {
            RefreshNewToken();
        }

        if ($("#ekashupaypal-ready").is(":visible")) {
            if (typeof CancelEkashuPayPal !== 'undefined') {
                CancelEkashuPayPal();
            }
        }
    }
    else {
        DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.DeleteOrderTipAmountFailedError"),
            GetResourceObject('WebOrder.QuestionPopup.OKButton'),
            null, null, null);
    }
}

function onQtyChange(ItemLineNumber, xQty) {
    if (!CheckValidQty(xQty))
        return;

    var iQty = parseInt(xQty, 10);
    Radiant.AlohaOnline.OrderEntryService.ChangeItemQty(ItemLineNumber, iQty, ChangeItemQtyOK, WebServiceActionFailed);
}

function ChangeItemQtyOK(OrderEntryResult) {
    if (OrderEntryResult.SessionExpired) {
        SessionExpired();
        return;
    }
    else if (OrderEntryResult.Success == false) {
        var message;
        if ((OrderEntryResult.Message !== null) && (OrderEntryResult.Message != "")) {
            message = OrderEntryResult.Message;
        }
        else {
            message = GetResourceObject("WebOrder.OrderEntry.ChangeItemQuantityFailedError");
        }
        DisplayQuestion(message,
            GetResourceObject('WebOrder.QuestionPopup.OKButton'),
            null, null, null);
    }
    GetOrder();
}

function onTargetPortionCountChange(el) {

    var xTarget = el.value;
    var TargetIsValid = false;
    var iTarget = 0;

    if (IsNumeric(xTarget)) {
        iTarget = parseInt(xTarget, 10);

        if (!isNaN(iTarget)) {
            TargetIsValid = !((iTarget < 0) || (iTarget > 999));
        }
    }

    if (!TargetIsValid) {
        DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.InvalidTargetPortionCountError"),
            GetResourceObject('WebOrder.QuestionPopup.OKButton'),
            null, null, null);
        return false;
    }

    el.value = iTarget;
    Radiant.AlohaOnline.OrderEntryService.ChangeTargetPortionCount(iTarget, TargetPortionChangeOK, WebServiceActionFailed);
}

function TargetPortionChangeOK(OrderEntryResult) {
    if (OrderEntryResult.SessionExpired) {
        SessionExpired();
        return;
    }
    else if (OrderEntryResult.Success == false) {
        var message;
        if ((OrderEntryResult.Message !== null) && (OrderEntryResult.Message != "")) {
            message = OrderEntryResult.Message;
        }
        else {
            message = GetResourceObject("WebOrder.OrderEntry.ChangeTargetPortionFailedError");
        }
        DisplayQuestion(message,
            GetResourceObject('WebOrder.QuestionPopup.OKButton'),
            null, null, null);
    }

    if (OrderEntryResult.Order != null) {
        var targetBefore = PubOrder.TargetPortionCount;
        var targetAfter = OrderEntryResult.Order.TargetPortionCount;

        if (targetBefore == null)
            targetBefore = 0;
        if (targetAfter == null)
            targetAfter = 0;

        //if we are going from zero to a non-zero value
        //or from a non-zero value back to zero, we need to refetch the order
        //so as to make sure the CurrentPortionCount value is correct
        if (targetBefore == 0 && targetAfter > 0 ||
            targetBefore >= 0 && targetAfter == 0) {
            RefreshPortionAssistantWithOrder();
        }
        else {
            PortionAssistantGraphicDisplay(OrderEntryResult.Order.CurrentPortionCount,
                OrderEntryResult.Order.TargetPortionCount);

            PubOrder.TargetPortionCount = OrderEntryResult.Order.TargetPortionCount;
        }
    }
}

function IsUpsellSuggestionComplete() {
    return /true/i.test(getCookie('UpsellSuggestionComplete'));
}

function CheckForUpsellItems() {

    if (IsUpsellSuggestionComplete() === false && PubOrder.OrderType != OrderType_GroupOrderOrganizer &&
        PubOrder.OrderType != OrderType_GroupOrderByName) {
        Radiant.AlohaOnline.OrderEntryService.GetOrderUpsellItems(CheckForUpsellItemsOK, WebServiceActionFailed);

    }
    else {

        if (PubOrder.OrderType == OrderType_GroupOrderByName) {
            var testing = function (oOrder) {
                PubOrder = oOrder;
                var html = "<div id =\"GrouporderPopUp\"><b>"
                html += GetResourceObject('WebOrder.OrderEntry.GroupOrderByNamePopUpHeader');
                html += "</b><br/>";
                html += GetResourceObject('WebOrder.OrderEntry.GroupOrderByNamePopUpMessage');
                html += "<br/><div id=\"GroupOrderPopUpNamesList\">";
                html += "<table id=\"GroupOrderPopUpNamesTable\" cellspacing=\"0\" cellpadding=\"2\" border=\"0\" role=\"presentation\"></div>";
                var displayQuestion = false;
                for (recipient in PubOrder.Recipients) {
                    var recipientName = PubOrder.Recipients[recipient].RecipientName;
                    var isUsed = true;
                    for (lineitem in PubOrder.LineItems) {
                        if (recipientName == PubOrder.LineItems[lineitem].RecipientName) {
                            isUsed = false;
                        }
                    }
                    if (isUsed) {
                        html += "<tr><td>" + recipientName + "</td></tr>";
                        displayQuestion = true;
                    }
                }
                html += "</tbody>";
                html += "</table>";
                html += "</div>";
                if (displayQuestion) {
                    DisplayQuestion(html, GetResourceObject('WebOrder.QuestionPopup.OrderMore'),
                        GetResourceObject('WebOrder.QuestionPopup.ContinueButton'),
                        null, "ValidateOrderMaximum()");
                }
                else {
                    ValidateOrderMaximum()
                }
            }
            GetOrder(testing);
        }
        else {
            ValidateOrderMaximum();
        }
    }
}

function ValidateOrderMaximum() {
    Radiant.AlohaOnline.OrderEntryService.ValidateOrderMaximum(ValidateOrderMaximumOK, WebServiceActionFailed);
}

function ValidateOrderMaximumOK(valid) {
    if (valid) {
        ProceedToCheckout();
    }
    else {
        DisplayQuestion(GetResourceObject('WebOrder.OrderEntry.OrderMaximumExceededError'), GetResourceObject('WebOrder.QuestionPopup.OKButton'), null,
            null, null);
    }
}

function CheckForUpsellItemsOK(popUpHTML) {

    if (popUpHTML == null || popUpHTML.length <= 0) {
        ProceedToCheckout();
        return;
    }
    else if ((popUpHTML == "SessionExpired") || popUpHTML.SessionExpired) {
        SessionExpired();
        return;
    }

    document.getElementById('divupsellContainer').innerHTML = popUpHTML;
    setTimeout("ShowUpsellPopup();", 100);
}

function ShowUpsellPopup() {
    var modalPopupBehavior = $find('programmaticUpsellModalPopupBehavior');
    modalPopupBehavior.add_shown(InitUpsellPopup);
    modalPopupBehavior.show();
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Checkout',
            eventLabel: 'Upsell Shown'
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Checkout',
            eventLabel: 'Upsell Shown'
        });
    }
}

function InitUpsellPopup(e) {
    ScrollBar.Create($get('UpsellModifierScrollButton'), $get('UpsellTabScrollDiv'));
    var modalPopupBehavior = $find('programmaticUpsellModalPopupBehavior');
    modalPopupBehavior.remove_shown(InitUpsellPopup);
    modalPopupBehavior._layout();

    //Redisplaying the scroll bar to update the scroll bar once after all dimensions 
    //and default visibility settings have been specified.
    setTimeout("ScrollBar.Update($get('UpsellModifierScrollButton'), $get('UpsellTabScrollDiv'));", 1000);
    setTimeout("UpdateUpsellModalElementsTabIndex();", 100);

}
function UpdateUpsellModalElementsTabIndex() {
    var tabindex = 300; //start high so no clashes
    $('.Upsell_modal_cancel').attr('tabindex', tabindex);
    $('#UpsellTabContent input').each(function () {
        $(this).attr('tabindex', tabindex);
        tabindex++;
    });
    $('.Upsell_modal_cancel').focus();
    $("#_ButtonItemAddUpsellDiv div[uniqueattribute$=ContinueButton]").attr("tabindex", tabindex);
}
function onUpsellItemClick(uniqueId, ChangeQty) {

    var oInput = $get("_UpsellItem_" + uniqueId);

    // Exit if input not found
    if (oInput == null) {
        alert("Input not found: " + uniqueId);
        return;
    }

    var SelectedQty = GetSelectedQty(oInput);

    if (oInput.type == "text") {

        SelectedQty += ChangeQty;
        if (SelectedQty < 0) {
            SelectedQty = 0;
        }

        var maxLineItemQuantity = GetMaxLineItemQuantity();

        if (SelectedQty > maxLineItemQuantity) {
            SelectedQty = maxLineItemQuantity;
        }
    }

    SetSelectedQty(oInput, SelectedQty);
}

function UpsellsCancel() {
    saveCookieGlobalEncOpt('UpsellSuggestionComplete', true, null, true);
    ProceedToCheckout();
}

function AddUpsellItemsToOrder() {
    saveCookieGlobalEncOpt('UpsellSuggestionComplete', true, null, true);
    var menuItems = new Array();
    var salesItems = new Array();
    var qtys = new Array();

    var upsellPopupInputs = $get("UpsellTabContent");
    if (upsellPopupInputs == null) {
        ProceedToCheckout();
        return;
    }

    var oInputList = upsellPopupInputs.getElementsByTagName('input');
    if (oInputList != null && oInputList.length != null) {
        for (var i = 0; i < oInputList.length; i++) {

            var value = 0;
            if (oInputList[i].type == "text") {
                value = GetSelectedQty(oInputList[i]);
            }
            else if (oInputList[i].type == "checkbox") {
                if (oInputList[i].checked == true)
                    value = 1;
            }

            if (!isNumeric(value) || value <= 0) {
                continue;
            }

            if (CheckValidQty(value)) {
                menuItems.push(oInputList[i].getAttribute("menuitemid"));
                salesItems.push(oInputList[i].getAttribute("salesitemid"));
                qtys.push(value);

                if (ga) {
                    ga('newTracker.send', 'event', {
                        eventCategory: 'Menu',
                        eventAction: 'Item Added',
                        eventLabel: 'Upsell Item (Quantity)',
                        eventValue: value
                    });
                    ga('send', 'event', {
                        eventCategory: 'Menu',
                        eventAction: 'Item Added',
                        eventLabel: 'Upsell Item (Quantity)',
                        eventValue: value
                    });
                }
            }
            else {
                return;
            }
        }
    }

    Radiant.AlohaOnline.OrderEntryService.AddDefaultOrderLines(menuItems, salesItems, qtys, "", "", AddDefaultOrderLinesOK, WebServiceActionFailed, "user context");
}

function AddDefaultOrderLinesOK(result) {
    if (result.SessionExpired) {
        SessionExpired();
        return;
    }
    else if (result.Success == false) {

        var message;

        if ((result.Message !== null) && (result.Message != "")) {
            message = result.Message;
        }
        else {
            message = GetResourceObject("WebOrder.OrderEntry.AddDefaultOrderLinesFailedError");
        }

        DisplayQuestion(message, GetResourceObject('WebOrder.QuestionPopup.OKButton'), null,
            "ProceedToCheckout()", null);

        return;
    }

    ProceedToCheckout();
}

function ProceedToCheckout() {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Checkout',
            eventLabel: '(Line Item Count)',
            eventValue: PubOrder.LineItems.length
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Checkout',
            eventLabel: '(Line Item Count)',
            eventValue: PubOrder.LineItems.length
        });
    }

    window.location = "Checkout.aspx";
}

// returns true if the string only contains characters 0-9
function isNumeric(str) {
    var re = /[\D]/g
    if (re.test(str)) return false;
    return true;
}

//
// Display Menu Items for selected SubMenu
//
function OnSubMenuSelected(event, SubMenuId, selectionMode) {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Sub Menu Selected'
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Sub Menu Selected'
        });
    }

    var element;
    if (event.target == null && event.srcElement == null)
        element = event;
    else
        element = getEventTarget(event);

    var e = GetParentByTag(element, "div");
    var old = PubSelectedSubMenuElem;
    var oldSubMenuId = PubSubMenuId;
    if (e == old || e == null) {
        // don't double select the same item unless goal price comps are in use
        return;
    }

    if (old != null) {
        MenuCategoryRowVisibilityNormal("MenuCategoryRow_" + oldSubMenuId);
    }
    else {
        // Flip background
        var center_div = GetElementsByClassName(document, 'center_div');
        if (center_div.length > 0) {
            center_div[0].setAttribute('title', ''); //clear title of center div from "Order From Left Menu"
        }
        var startPage;
        if (typeof (MenuMode) === "undefined") {
            startPage = GetParentByClass(e, "start_page_div");
            if (startPage != null) {
                SetClass(startPage, "menu_page_div");
            }
            else {
                startPage = GetParentByClass(e, "group_order_start_page_div");
                if (startPage != null) {
                    SetClass(startPage, "menu_page_div");
                }
            }
        }
        else {
            startPage = GetParentByClass(e, "start_page_browse_div");
            if (startPage != null) {
                SetClass(startPage, "menu_page_browse_div");
            }
        }
    }

    MenuCategoryRowVisibilitySelected("MenuCategoryRow_" + SubMenuId);
    PubSelectedSubMenuElem = e;
    LoadSubMenuItems(SubMenuId);
}

function LoadSubMenuItems(SubMenuId) {
    PubSubMenuId = SubMenuId;
    var orderType = $("input[id$=hfOrderType]").val();
    if (typeof (MenuMode) === "undefined") {
        Radiant.AlohaOnline.OrderEntryService.GetMenuItemsHtml(
            SubMenuId, orderType, GetMenuItemsHTMLOK, WebServiceActionFailed, "GetMenuItemsHtml()");
    }
    else {
        Radiant.AlohaOnline.OrderEntryService.GetReadOnlyMenuItemsHtml(
            SubMenuId, GetMenuItemsHTMLOK, WebServiceActionFailed, "GetMenuItemsHtml()");
    }
}

function GetMenuItemsHTMLOK(HTML) {
    if ((HTML == null) || (HTML == "") || (HTML == "SessionExpired")) {
        SessionExpired();
        return;
    }

    var SubMenuHeaderHTML = GetSubMenuHeaderHTML(PubSubMenuId);
    if (PubMenuAlign == 1) {
        var containerClass = "MenuItemListWithHeader";
        if (SubMenuHeaderHTML == "") {
            containerClass = "MenuItemListWithoutHeader";
        }

        SetHTML("MenuItemStuff", "<div class='" + containerClass + "'>" + SubMenuHeaderHTML + HTML + "</div>");

        //Hide the left hand menu because even a height of 0 will take up space on IE6
        var left = $get("OrderLeft");
        if (left != null) {
            left.style.display = "none";
        }
    }
    else {
        SetHTML("OrderLeft", SubMenuHeaderHTML);
        SetHTML("MenuItemStuff", HTML);
    }

    // Show scrollbar
    setTimeout("ScrollBar.Create($get('MenuScrollButton'), $get('MenuScrollContent'));", 100);
    UpdateMenuitemsImageTooltips();
    SetMenuItemsTabOrder();

}

function UpdateMenuitemsImageTooltips() {
    $('.ItemContainer').each(function () {
        var divItemImage = $(this).find('.ItemImage');
        var itemName = GetTextFromHtml($(this).find('.ItemName').html()).trim();
        divItemImage.attr('title', itemName);
    });
}

function GetTextFromHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}

function SetMenuItemsTabOrder() {
    var tabIndex = 100; //start high to not conflict with any other elements
    $('.ItemContainer').each(function () {
        $(this).attr('tabindex', tabIndex);
        tabIndex++;
    });
    if ($('.ItemContainer').length > 0)//set focus on first element
        $('.ItemContainer')[0].focus();

    $("#hfReceiptStartingTabIndex").val(tabIndex);
    UpdateElementsTabOrderAfterReceiptGenerated();
}

function RestrictedItemHover(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if (odiv != null)
        SetClass(odiv, "RestrictedItemContainerHover");
}

function RestrictedItemOut(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if (odiv != null)
        SetClass(odiv, "RestrictedItemContainer");
}

function ItemHover(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if ((odiv != null) && (GetClass(odiv) != "ItemContainerCustomizing"))
        SetClass(odiv, "ItemContainerHover");
}

function ItemOut(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if ((odiv != null) && (GetClass(odiv) != "ItemContainerCustomizing"))
        SetClass(odiv, "ItemContainer");
}

// Order As Is Functions
function OrderAsIsRestrictedItemHover(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if (odiv != null)
        SetClass(odiv, "OrderAsIsRestrictedItemContainerHover");
}

function OrderAsIsRestrictedItemOut(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if (odiv != null)
        SetClass(odiv, "OrderAsIsRestrictedItemContainer");
}

function OrderAsIsItemHover(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    if ((odiv != null) && (GetClass(odiv) != "OrderAsIsItemContainerCustomizing"))
        SetClass(odiv, "OrderAsIsItemContainerHover");
}

function OrderAsIsItemOut(event) {
    var odiv = GetParentById(getEventTarget(event), "_ItemContent_");
    // alert(GetClass(odiv));
    if ((odiv != null) && (GetClass(odiv) != "OrderAsIsItemContainerCustomizing"))
        SetClass(odiv, "OrderAsIsItemContainer");
}

function RestrictedItem() {
    DisplayQuestion(GetResourceObject('WebOrder.OrderEntry.ItemDayOfWeekRestrictionError'),
        GetResourceObject('WebOrder.QuestionPopup.OKButton'),
        null, null, null);
}

//
// Show Order Modal PopUp... Get Item with modifier options 
//
function CustomizeItem(ItemHeaderId, ItemId, LineItemNumber) {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Selected'
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Selected'
        });
    }

    //Don't allow two items to be customized at the same time to prevent issues
    //with delays when retrieving item data
    if (PubCustomizeItemContainer != null) {
        return;
    }
    PubLineItemNumber = (LineItemNumber == null || isNaN(LineItemNumber)) ? -1 : parseInt(LineItemNumber);
    PubItemHeaderId = ItemHeaderId;
    PubItemId = ItemId;

    if (PubLineItemNumber == -1) {
        var oContainer = $get("_ItemContent_" + ItemHeaderId);

        if (oContainer != null) {
            if (PubCustomizeItemContainer != null) {
                SetClass(PubCustomizeItemContainer, "ItemContainer");
            }

            PubCustomizeItemContainer = oContainer;

            var oldClass = GetClass(oContainer);
            var oldHeight = oContainer.offsetHeight;
            SetClass(oContainer, "ItemContainerCustomizing");

            if (oContainer.offsetHeight != oldHeight) {
                SetClass(oContainer, oldClass);
            }
        }
    }

    //If the content is not cleared IE6 does not seem to update all the elements properly the next
    //time the popup is displayed. Specifically with pizza, the bases radio group is not having
    //a default selected even though the server is returning marinara as default.
    //This is done before the webservice call because placing it in relation to HidePopup(), even
    //after a SetTimeout call can end up causing IE6 to spin
    document.getElementById('ModContentPlaceHolder').innerHTML = "";
    Radiant.AlohaOnline.OrderEntryService.GetItemWithOptions(ItemHeaderId, ItemId, PubLineItemNumber, $("input[id$=hfModMappings]").val(),
        GetItemModsOK, GetItemModsFailed, "user context");
}


//
// Show Order Modal PopUp... Get Item with modifier options 
//
function CustomizeWebSalesGroupItem(ItemHeaderId, ItemId, LineItemNumber, WebSalesGroupId) {


    //Don't allow two items to be customized at the same time to prevent issues
    //with delays when retrieving item data
    if (PubCustomizeItemContainer != null) {
        return;
    }
    PubLineItemNumber = (LineItemNumber == null || isNaN(LineItemNumber)) ? -1 : parseInt(LineItemNumber);
    PubItemHeaderId = ItemHeaderId;
    PubItemId = ItemId;

    if (PubLineItemNumber == -1) {
        var oContainer = $get("_ItemContent_" + ItemHeaderId);

        if (oContainer != null) {
            if (PubCustomizeItemContainer != null) {
                SetClass(PubCustomizeItemContainer, "ItemContainer");
            }

            PubCustomizeItemContainer = oContainer;

            var oldClass = GetClass(oContainer);
            var oldHeight = oContainer.offsetHeight;
            SetClass(oContainer, "ItemContainerCustomizing");

            if (oContainer.offsetHeight != oldHeight) {
                SetClass(oContainer, oldClass);
            }
        }
    }

    //If the content is not cleared IE6 does not seem to update all the elements properly the next
    //time the popup is displayed. Specifically with pizza, the bases radio group is not having
    //a default selected even though the server is returning marinara as default.
    //This is done before the webservice call because placing it in relation to HidePopup(), even
    //after a SetTimeout call can end up causing IE6 to spin
    document.getElementById('ModContentPlaceHolder').innerHTML = "";
    Radiant.AlohaOnline.OrderEntryService.GetWebSalesGroupItemWithOptions(ItemHeaderId, ItemId, PubLineItemNumber, WebSalesGroupId, $("input[id$=hfModMappings]").val(),
        GetItemModsOK, GetItemModsFailed, "user context");
}

function GetItemModsFailed(result, userContext) {
    GetItemModsCompleted();
    GetWebServiceFailed({ message: result.get_message() }, userContext);
}

function GetItemModsCompleted() {
    if (PubCustomizeItemContainer != null) {
        if (PubCustomizeItemContainer.getAttribute("className") != "OrderAsIsItemContainer") {
            SetClass(PubCustomizeItemContainer, "ItemContainer");
        }
        PubCustomizeItemContainer = null;
    }
}

var maxNodeId = 0;
function PopulatePubHierarchyNodes(Node) {
    //Treat selection nodes specially and don't put them into the main list
    //since their node ids point to other items
    if (Node.NodeType == "OptionSelection") {
        PubHierarchySelections.push(Node);
        return;
    }

    PubHierarchyNodes[Node.NodeId] = Node;

    if (Node.NodeId > maxNodeId) {
        maxNodeId = Node.NodeId;
    }

    for (var i = 0; i < Node.Children.length; i++) {
        var oChild = Node.Children[i];
        PopulatePubHierarchyNodes(oChild);

        if (oChild.NodeType == "Option") {
            if ((oChild.ModifierAction == modifierAction.Everything) ||
                (oChild.ModifierAction == modifierAction.Plain)) {
                Node.HasExclusiveModifier = true;
            }
        }
    }
}

function GetMaxNodeId() {
    return maxNodeId;
}

function GetRecipeSelection(NodeId) {
    if (PubHierarchySelections != null) {
        for (var i = 0; i < PubHierarchySelections.length; i++) {
            var node = PubHierarchySelections[i];
            if ((node.NodeId == NodeId) && (node.Reason == SELECTION_REASON_RECIPE)) {
                return node;
            }
        }
    }
}

function GetNode(NodeId) {
    var Node = PubHierarchyNodes[NodeId];
    if (Node != null) {
        return Node;
    }
    return GetNodeRecursive(PubHierarchy, NodeId);
}

function GetNodeRecursive(CurrentNode, NodeId) {
    if (CurrentNode == null || CurrentNode.NodeId == NodeId) {
        return CurrentNode;
    }

    for (var i = 0; i < CurrentNode.Children.length; i++) {
        var Node = GetNodeRecursive(CurrentNode.Children[i], NodeId);
        if (Node != null) {
            return Node;
        }
    }

    return null;
}

function GetNodeParent(NodeId, ParentNodeType) {
    var Node = GetNode(NodeId);

    var Parent = null;

    if (Node != null) {
        Parent = GetNode(Node.ParentNodeId);
    }

    while (Parent != null) {
        if (Parent.NodeType == ParentNodeType) {
            break;
        }
        Parent = GetNode(Parent.ParentNodeId);
    }
    return Parent;
}

function NodeTypeExists(NodeType) {
    return NodeTypeExistsRecursive(PubHierarchy, NodeType);
}

var optionGroupCount = 0;

function NodeTypeExistsRecursive(CurrentNode, NodeType) {
    if (CurrentNode === null || CurrentNode === undefined) {
        return false;
    }
    else if (CurrentNode.NodeType === NodeType) {
        return true;
    }
    else if (CurrentNode.HideModifier && optionGroupCount === 1) {
        InitPopup();
        return false;
    }

    if (CurrentNode.NodeType === "Item") {
        optionGroupCount = 0;
        optionGroupCount = CurrentNode.Children.length;
    }

    for (var i = 0; i < CurrentNode.Children.length; i++) {
        var result = NodeTypeExistsRecursive(CurrentNode.Children[i], NodeType);
        if (result) {
            return result;
        }
    }

    return false;
}

function GetItemModsOK(ItemWithOptionsJson) {
    var ItemWithOptions = eval('(' + ItemWithOptionsJson + ')');

    if (ItemWithOptions.SessionExpired) {
        SessionExpired();
        return;
    }

    if (ItemWithOptions.ItemNotFound) {
        GetItemModsCompleted();
        DisplayQuestion(ItemWithOptions.ItemNotFoundMessage, "OK", null, "window.location='../Locations.html';return false;", null);
        return;
    }

    var popupDelay = 100;

    PubHierarchy = ItemWithOptions.Hierarchy;

    PubHierarchyNodes = new Array();
    PubHierarchySelections = new Array();
    maxNodeId = 0;
    PopulatePubHierarchyNodes(PubHierarchy);
    //Remove all the options from the pub hierarchy since other code does not expect them to exist
    for (var i = 0; i < PubHierarchy.Children.length; i++) {
        if (PubHierarchy.Children[i].NodeType == 'OptionSelection') {
            PubHierarchy.Children.length = i;
            break;
        }
    }

    document.getElementById('ModContentPlaceHolder').innerHTML = PubHierarchy.HTML;

    var ImagesToLoad = [];
    $(document.getElementById('ModContentPlaceHolder')).find('.ModifierGroupImage').each(function () {
        ImagesToLoad.push(this);
    });
    // show modifier input modal popup  
    PubCurrentTab = 0;

    if (ImagesToLoad.length > 0) {//if there is an image that needs to be loaded, what till its complete before you showing popup
        popupDelay = 500;
    }
    setTimeout("ShowPopup();", popupDelay);
    setTimeout("SetModifierPopupElementsTabOrder();", popupDelay);
}

function SetModifierPopupElementsTabOrder() {

    if ($('.ModifierItemCheck input').length > 0) {
        ReverseTabIndex(true);
    }

    var tabindex = 200; //start at high number so it wont clash with any other element
    $('.modal_cancel').attr('tabindex', 199);
    $('.ModifierItemCheck input').each(function () {
        $(this).attr('tabindex', tabindex);
        tabindex++;
    });

    $('#_ItemAddSpecialInstructionsLabel').attr('tabindex', tabindex);
    $('#_ItemAddNameLabel').attr('tabindex', tabindex + 1);
    $('#_ItemAddNameOptions').attr('tabindex', tabindex + 2);
    $('#_ItemAddQty').attr('tabindex', tabindex + 3);
    $('div[uniqueattribute$=AddToOrderButton]').attr('tabindex', tabindex + 4);

    $('.modal_cancel').focus();//set focus on cancel button
}

function ShowPopup() {

    PubCurrentTab = 0;

    var addItem = false;

    if ((PubSkipPopupIfNoModifiers === 'true') &&
        ((PubLineItemNumber <= 0 &&
            PubHierarchy.Children.length === 1 &&
            !NodeTypeExists("Option")) ||
            (AreAllOptionGroupsHidden() &&
                FindNodeRecursive(PubHierarchy, "Item").length <= 1))) {
        addItem = true;
    }

    if (addItem) {
        CacheClientElements();
        var popupContent = document.getElementById('ModContentPlaceHolder');
        var addButton = GetChildById(popupContent, "_ButtonItemAdd");

        if (addButton != null) {
            addButton.click();
        }
    }
    else {
        var modalPopupBehavior = $find('programmaticModalPopupBehavior');
        modalPopupBehavior.add_shown(InitPopup);
        modalPopupBehavior.show();
    }
    GetItemModsCompleted();
    expandAllDefaultSalesItemModifiers();
}

function AreAllOptionGroupsHidden() {
    var og = FindNodeRecursive(PubHierarchy, "OptionGroup");

    for (var i = 0; i < og.length; i++) {
        if (og[i].HideModifier === false) {
            return false;
        }
    }

    return true;
}

function FindNodeRecursive(node, nodeType) {
    var arNode = [];
    if (node.NodeType === nodeType) {
        arNode.push(node);
    }

    if (node.Children.length > 0) {
        for (var i = 0; i < node.Children.length; i++) {
            var fNode = FindNodeRecursive(node.Children[i], nodeType);
            arNode = arNode.concat(fNode);
        }
    }

    return arNode;
}

function expandAllDefaultSalesItemModifiers() {
    $('.WebSalesGroupPanel input[data-wsgid]:checked').each(function () {
        //var id = $(this).attr("data-wsgid");
        //id = id.replace('_', '');
        //id = '#divPlusMinus' + id;
        //expandDiv(id);
        $(this).click(); //if clicking is ever disabled (ie., in the case of only one item in its websalesgroup), use above commented-out code
    });
}

function InitPopup(e) {

    CacheClientElements();

    var oMode = $get("ItemOrderingMode");
    PubItemOrderingMode = (oMode == null) ? 0 : oMode.value;
    ScrollBar.Create($get('ModifierScrollButton'), $get('TabScrollDiv'));
    TouchupPopupDimensions();

    //if($('.WebSalesGroupPanel').length == 0)
    SelectDefaults();
    AdjustModifierItemColumns();
    var modalPopupBehavior = $find('programmaticModalPopupBehavior');
    modalPopupBehavior.remove_shown(InitPopup);
    modalPopupBehavior._layout();
    //Redisplaying the scroll bar to update the scroll bar once after all dimensions 
    //and default visibility settings have been specified.
    ScrollBar.Update($get('ModifierScrollButton'), $get('TabScrollDiv'));
    ScrollBar.Create($get('ModifierSummaryScrollButton'), $get('ModifierSummaryContent'));
    SetTabNavButtonVisibility();

    var oInitQtySelectionInput = $get("InitialQtySelection");

    if (oInitQtySelectionInput != null) {
        PubInitialQuantitySelection = (oInitQtySelectionInput.value != "0") ? true : false;
    }
    else {
        PubInitialQuantitySelection = false;
    }

    //Reset the cached state of what scroll bars were created
    CreatedTabScroll = new Object;
    if (PubItemOrderingMode == ORDER_MODE_PIZZA || PubItemOrderingMode == ORDER_MODE_BYO) {
        ShowTab(0);
    }

}

function ReverseTabIndex(isNegative) {
    $("body [tabindex]").each(function () {
        var tabindex = parseInt($(this).attr("tabindex"));
        if (isNegative && tabindex > 0) {
            tabindex = tabindex * -1;
        }

        if (!isNegative && tabindex < 0) {
            tabindex = tabindex * -1;
        }
        $(this).attr('tabindex', tabindex);
    });
}

function HidePopup() {
    ReverseTabIndex(false);
    var modalPopupBehavior = $find('programmaticModalPopupBehavior');
    modalPopupBehavior.hide();
}

var modifierItemInputsByNodeId = new Array();
var modifierItemsByNodeId = new Array();
var modifierGroupsByNodeId = new Array();
var nestedModifierGroupsByNodeId = new Array();

function CacheClientElements() {
    modifierItemInputsByNodeId = new Array();
    modifierItemsByNodeId = new Array();
    modifierGroupsByNodeId = new Array();
    nestedModifierGroupsByNodeId = new Array();

    //All inputs will be iterated through in SelectDefaults so precache all of them
    var modifierPopupInputs = $get("_DivModifierOptionsInput");
    if (modifierPopupInputs == null) {
        //Currently we're not preventing the virtual receipt from queuing up updates for
        //mulitple items at the same time. This can cause issues with the element being
        //null
        return;
    }
    var oInputList = modifierPopupInputs.getElementsByTagName('input');
    if (oInputList != null && oInputList.length != null) {
        for (i = 0; i < oInputList.length; i++) {
            var ids = oInputList[i].id.split('_');

            if ((ids.length == 3) && (ids[1] == "Node")) {
                // Index input by id
                modifierItemInputsByNodeId[ids[2]] = oInputList[i];
            }
        }
    }

    //Divs can be lazily cached since there are a lot of divs without ids that cause 
    //.getElementsByTagName() be more of an overhead than any caching
}

function GetModifierItemDiv(nodeId) {
    var oDiv = modifierItemsByNodeId[nodeId];
    if (oDiv == undefined) {
        oDiv = modifierItemsByNodeId[nodeId] = $get("_ModItemOptionDiv_" + nodeId);
    }
    return oDiv;
}

function GetModifierItemInput(nodeId) {
    var oInput = modifierItemInputsByNodeId[nodeId];
    if (oInput == undefined) {
        oInput = modifierItemInputsByNodeId[nodeId] = $get("_Node_" + nodeId);
    }
    return oInput;
}

function GetModifierGroupDiv(nodeId) {
    var oDiv = modifierGroupsByNodeId[nodeId];
    if (oDiv == undefined) {
        oDiv = modifierGroupsByNodeId[nodeId] = $get("_ModGroupDiv_" + nodeId);
    }
    return oDiv;
}

function GetNestedModifierGroupDiv(nodeId) {
    var oDiv = nestedModifierGroupsByNodeId[nodeId];
    if (oDiv == undefined) {
        oDiv = nestedModifierGroupsByNodeId[nodeId] = $get("_NestedMod_" + nodeId);
    }
    return oDiv;
}

function CheckValidQty(xQty) {

    var MinLineItemQty = 1;
    var MaxLineItemQty = GetMaxLineItemQuantity();

    var QtyIsValid = false;

    if (IsNumeric(xQty)) {
        var iQty = parseInt(xQty, 10);

        if (!isNaN(iQty)) {
            QtyIsValid = !((iQty < MinLineItemQty) || (iQty > MaxLineItemQty));
        }
    }

    if (!QtyIsValid) {
        DisplayQuestion(FormatResourceString(GetResourceObject("WebOrder.OrderEntry.InvalidQuantityError"), MinLineItemQty, MaxLineItemQty),
            GetResourceObject('WebOrder.QuestionPopup.OKButton'),
            null, null, null);
        return false;
    }
    return true;
}

function IsGroupNodeActive(optionGroupNode) {
    var active = true;

    if (GetParentItemId(optionGroupNode) != PubItemId) {
        active = false;
    }
    else {
        //Need to go all the way up the tree to make sure node isn't nested 3 levels deep and 
        //a leaf node has a required option that defaults to selected, but doesn't have the top
        //level selected
        var oParent = GetNode(optionGroupNode.ParentNodeId);
        while ((oParent != null) && (oParent.NodeType == "Option")) {
            var oParentInput = GetModifierItemInput(oParent.NodeId);
            if ((oParentInput != null) && GetSelectedQty(oParentInput)) {
                oParent = GetNode(oParent.ParentNodeId);
                if (oParent != null) {
                    oParent = GetNode(oParent.ParentNodeId);
                }
            }
            else {
                active = false;
                break;
            }
        }
    }

    return active;
}

//
// Check if nested group is active or not
//
function IsGroupActive(input, ParentId) {
    var active = true;

    //need to look at the nested mod in relation to the input
    var oNestedModifiers = GetNestedModifierGroupDiv(ParentId);
    if (oNestedModifiers == null) {
        //if we are using tabs, smart modifiers (i.e. sizes) tabs may not be active and shouldn't count
        oTab = GetParentByClass(input, "TabPanel");
        if (oTab != null) {
            tabIds = oTab.id.split('_');
            tabItemId = parseInt(tabIds[2]);

            if (tabItemId != PubItemId) {
                active = false;
            }
        }
    }
    else if (oNestedModifiers.style.display == "none") {
        active = false;
    }
    return active;
}

function debug(str) {
    alert("DEBUG\n" + str);
}

function IsNodeForItem(node, itemId) {
    var oParentNode = GetNode(node.ParentNodeId);
    while (oParentNode != null) {
        if (oParentNode.NodeType == "Item") {
            return (oParentNode.ItemId == itemId);
        }
        oParentNode = GetNode(oParentNode.ParentNodeId);
    }
    return false;
}

function GetParentHeaderItemId(node) {
    var oParentNode = GetNode(node.ParentNodeId);
    while (oParentNode != null) {
        if (oParentNode.NodeType == "Header") {
            return oParentNode.ItemHeaderId;
        }
        oParentNode = GetNode(oParentNode.ParentNodeId);
    }
    return -1;
}

function GetParentItemId(node) {
    var oParentNode = GetNode(node.ParentNodeId);
    while (oParentNode != null) {
        if (oParentNode.NodeType == "Item") {
            return oParentNode.ItemId;
        }
        oParentNode = GetNode(oParentNode.ParentNodeId);
    }
    return -1;
}

function GetValue(id, defaultValue) {
    var oObject = $get(id);
    if (oObject) {
        return oObject.value;
    }
    return defaultValue;
}


//
// Add Item to Order As Is
//
function ItemAddAsIs(itemHeaderIdOrderAsIs, itemIdOrderAsIs, LineItemNumber_OrderAsIs) {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Added',
            eventLabel: 'Added As Is',
            eventValue: 1
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Added',
            eventLabel: 'Added As Is',
            eventValue: 1
        });
    }

    //
    // add line [create order first if needed]
    //
    if (PubOrder == null) {
        GetOrder();
    }
    else {

        var menuItems = new Array();
        var salesItems = new Array();
        var qtys = new Array();

        menuItems.push(itemHeaderIdOrderAsIs);
        salesItems.push(itemIdOrderAsIs);
        qtys.push(1);

        Radiant.AlohaOnline.OrderEntryService.AddDefaultOrderLines(menuItems, salesItems, qtys, "", "", AddOrderLineOK, AddOrderLineFailed, "user context");
    }
}


function ItemAddWithWebSalesGroups() {
    if ($('.WebSalesGroupPanel').length > 0) {
        var wsgroupCount = $('.WebSalesGroupPanel').length;//first lets get the websales group count
        selectedItemsFromSalesGroups = [];
        webSalesGroupSelectedItems = [];
        var success = true;

        //let put the input in an array and select them so that we can run verification against each selected sales item in a group
        $('.WebSalesGroupPanel input[data-wsgid]:checked').each(function () {
            selectedItemsFromSalesGroups.push($(this));
        });

        //if selected inputs are less than websales group count, there is a missing selection. Lets display an message
        if (selectedItemsFromSalesGroups.length < wsgroupCount) {
            DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.ChooseItemFromSalesGroupPrompt"), "OK", null, null, null);
            return false;
        }

        //we are now ready to run verification against each group by setting the selection 1 at a time so it can work against current logic
        for (var i = 0; i < selectedItemsFromSalesGroups.length; i++) {
            success = VerifyBeforeItemAdd($(selectedItemsFromSalesGroups[i]));//verify selections and display necesssary message
            if (!success)
                return false;
        }

        if (($('.WebSalesGroupPanel input[data-wsgid]:checked').length == 0 && selectedItemsFromSalesGroups.length == 0)) {//if there are no selections, display a prompt for selection
            DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.ChooseItemFromSalesGroupPrompt"), "OK", null, null, null);
            return false;
        }
        else {
            if (success) {// if all is good,reselect radio options and submit order
                var text = GetResourceObject("WebOrder.OrderEntry.PleaseWaitItemAddedMessage");
                ShowLoading(text, '', 40, null);
                addSelectedItemsFromWebSalesGroups();
            }
        }
    }
    else {
        ItemAdd();
    }
}
function addSelectedItemsFromWebSalesGroups() {
    while (selectedItemsFromSalesGroups.length > 0) {
        ItemAdd();
    }
}

function SetCancelAndCloseButton(disable) {
    var btnAdd = $get("_ButtonItemAdd");
    var btnCancel = $get("_ButtonItemCancel");
    if (disable) {
        if (!btnAdd.disabled) // already disable
        {
            btnAdd.disabled = true;
            btnAdd.disabledClick = btnAdd.onclick;
            btnAdd.onclick = '';
        }
        if (!btnCancel.disabled) {
            btnCancel.disabled = true;
            btnCancel.disabledClick = btnCancel.onclick;
            btnCancel.onclick = '';
        }
    }
    else {
        if (btnAdd.disabled) {
            btnAdd.disabled = false;
            btnAdd.onclick = btnAdd.disabledClick;
        }
        if (btnCancel.disabled) {
            btnCancel.disabled = false;
            btnCancel.onclick = btnCancel.disabledClick;
        }
    }
}

function VerifyBeforeItemAdd(obj) {
    var webSalesGroupName = '<b>(' + $(obj).attr('title') + ' - ' + $(obj).closest('.WebSalesGroupPanel').find('.WebSalesGroupsName').text() + ')</b>';
    var SpecialInstruction = GetValue("_ItemAddSpecialInstructionsLabel", "");
    var RecipientName = GetValue("_ItemAddNameLabel", "");

    if (!isAlphabetNumeric(SpecialInstruction))
        return false;
    if (!isAlphabetNumeric(RecipientName))
        return false;

    var iQty = 1;

    if (PubHierarchyNodes[0].ItemOrderingMode != ItemOrderingMode_ModifierDeterminesQty) {
        var xQty = document.getElementById("_ItemAddQty").value;
        if (!CheckValidQty(xQty))
            return false;
        iQty = parseInt(xQty, 10);
    }

    // add Modifier List to order
    var ModOptionGroupNodeIds = new Array();
    var ModGrpIds = new Array();
    var ModIds = new Array();
    var ModQuantity = new Array();
    var ModActions = new Array();
    var DefaultModActions = new Array();
    var ModParentIndices = new Array();
    var ModSection1 = new Array();
    var ModSection2 = new Array();
    var ModCount = 0;
    var ModData = "";
    var ModItemId = 0;
    var ModAction = 0;
    var ModGrpId = 0;
    var DefaultModAction = 0;
    var ModParentIndex = 0;
    var OptionGroupId = 0;
    var SelCount;
    var HasSmartItemSelection, IsSmartItemSelected;

    // prepare Modifier Group List dictionary
    var SelectedCount = {};
    var DistinctSelectedCount = {};

    var oInputList = [];
    PubItemId = GetNode(obj.val()).ItemId;
    var wsgid = obj.data('wsgid');
    var wsgDiv = $('#wsgdiv' + wsgid).find('.WebSalesGroupDiv');
    var selectedInputs = wsgDiv.find("[data-selected='true']");
    if (selectedInputs.length > 0) {
        for (var i = 0; i < selectedInputs.length; i++)
            oInputList.push(selectedInputs.get(i));
    }
    for (var i = 0; i <= oInputList.length; i++) {
        if (oInputList[i] != null) {
            var nodeId = parseInt($(oInputList[i]).attr('id').replace('_Node_', ''));
            var oNode = GetNode(nodeId);
            if (oNode == null) {
                continue;
            }

            if (oNode.NodeType == "Item") {
                HasSmartItemSelection = true;
                if (GetSelectedQty(oInputList[i])) {
                    PubItemId = oNode.ItemId;
                    IsSmartItemSelected = true;
                }
                continue;
            }

            if (oNode.NodeType != "Option") {
                continue;
            }

            if ((oNode.NodeType == "Option") &&
                !IsNodeForItem(oNode, PubItemId)) {
                continue;
            }

            var oOptionGroup = GetNode(oNode.ParentNodeId);

            ModAction = oNode.ModifierAction;
            ModGrpId = oNode.ModifierGroupId;
            ModParentIndex = -1;

            // Subtract out recipe quantities
            var SelectedQty = GetSelectedQty(oInputList[i]);


            var recipeSelection = GetRecipeSelection(oNode.NodeId);
            var isRecipeOnSection1 = false;
            var isRecipeOnSection2 = false;

            if (recipeSelection != null) {
                isRecipeOnSection1 = IsOnSection(0, oOptionGroup.NodeId, oNode.NodeId, 1);
                isRecipeOnSection2 = IsOnSection(0, oOptionGroup.NodeId, oNode.NodeId, 2);

                //Only subtract out the recipe quantity here if it is on the whole pizza
                if (!isRecipeOnSection1 && !isRecipeOnSection2) {
                    SelectedQty -= recipeSelection.Quantity;
                    if (SelectedQty < 0) {
                        // If quantity is negative, flip to positive and change action to 'no'
                        SelectedQty *= -1;
                        ModAction = modifierAction.No;
                    }
                }
            }

            if (SelectedQty && !isNaN(ModGrpId)) {
                OptionGroupId = oOptionGroup.NodeId;
                ModItemId = oNode.ModifierId;
                DefaultModAction = oNode.ModifierAction;
                if (!IsGroupNodeActive(oOptionGroup)) {
                    continue;
                }

                // track count of selections per option group
                if (ModAction != modifierAction.No) {
                    if (SelectedCount[OptionGroupId]) {
                        SelCount = parseInt(SelectedCount[OptionGroupId]);
                        SelectedCount[OptionGroupId] = SelCount + (SelectedQty * oNode.Weight);
                    }
                    else {
                        SelectedCount[OptionGroupId] = (SelectedQty * oNode.Weight);
                    }
                }

                if (DistinctSelectedCount[OptionGroupId]) {
                    DistinctSelectedCount[OptionGroupId] += 1;
                }
                else {
                    DistinctSelectedCount[OptionGroupId] = 1;
                }

                var oOptionGroupParent = GetNode(oOptionGroup.ParentNodeId);

                if ((oOptionGroupParent != null) &&
                    (oOptionGroupParent.NodeType == "Option")) {
                    for (ModParentIndex = ModCount; ModParentIndex >= 0; ModParentIndex--) {
                        if (ModOptionGroupNodeIds[ModParentIndex] == oOptionGroupParent.NodeId) {
                            break;
                        }
                    }
                }

                //Check recipe options
                if (isRecipeOnSection1 || isRecipeOnSection2) {
                    //Convert only on one side of the recipe to a NO for the other side
                    //This way price won't be affected
                    ModOptionGroupNodeIds[ModCount] = oNode.NodeId;
                    ModGrpIds[ModCount] = ModGrpId;
                    ModIds[ModCount] = ModItemId;
                    ModQuantity[ModCount] = 1;
                    ModActions[ModCount] = modifierAction.No;
                    DefaultModActions[ModCount] = DefaultModAction;
                    ModParentIndices[ModCount] = ModParentIndex;
                    ModSection1[ModCount] = !isRecipeOnSection1;
                    ModSection2[ModCount] = !isRecipeOnSection2;
                    ModCount++;
                    SelectedQty -= recipeSelection.Quantity;
                }

                //Check extra options
                if (SelectedQty > 0) {
                    ModOptionGroupNodeIds[ModCount] = oNode.NodeId;
                    ModGrpIds[ModCount] = ModGrpId;
                    ModIds[ModCount] = ModItemId;
                    ModQuantity[ModCount] = SelectedQty;
                    ModActions[ModCount] = ModAction;
                    DefaultModActions[ModCount] = DefaultModAction;
                    ModParentIndices[ModCount] = ModParentIndex;
                    ModSection1[ModCount] = IsOnSection(1, oOptionGroup.NodeId, oNode.NodeId, 1);
                    ModSection2[ModCount] = IsOnSection(1, oOptionGroup.NodeId, oNode.NodeId, 2);
                    ModCount++;
                }
            }
        }
    }

    //
    // check order line biz rules
    //
    if (HasSmartItemSelection && !IsSmartItemSelected) {
        var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.ChooseSizePrompt");
        DisplayQuestion(prompTtext, "OK", null, null, null);
        return false;
    }

    var Alert = "";
    var ModifierDeterminesQtyFactor = -1;
    var ModifierDeterminesQtyGroupName = "";
    var GroupList = document.getElementsByName("_ModGroupInfo");

    for (i = 0; i < GroupList.length; i++) {
        var ids = GroupList[i].id.split("_");

        var oGroupNode = GetNode(ids[2]);

        if ((oGroupNode == null) || !IsGroupNodeActive(oGroupNode)) {
            continue;
        }

        var GrpId = oGroupNode.NodeId;
        var GrpName = oGroupNode.Name;
        var GrpMin = oGroupNode.MinItems;
        var GrpMax = oGroupNode.MaxItems;
        var GrpMaxDistinct = oGroupNode.MaxDistinctOptions;

        // Alert if counts not valid      
        var GrpCount = (SelectedCount[GrpId] ? parseInt(SelectedCount[GrpId]) : 0);
        var DistinctCount = (DistinctSelectedCount[GrpId] ? parseInt(DistinctSelectedCount[GrpId]) : 0);

        if (PubHierarchyNodes[0].ItemOrderingMode != ItemOrderingMode_ModifierDeterminesQty) {
            if ((GrpMaxDistinct > 0) && (DistinctCount > GrpMaxDistinct)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.MaximumDistinctNumberModifierError");
                Alert += FormatResourceString(prompTtext, GrpMaxDistinct, GrpName);
            }
            else if ((GrpMin == GrpMax) && (GrpCount != GrpMin) && (GrpMax > 0)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.ExactNumberModifierError");
                Alert += FormatResourceString(prompTtext, GrpMin, GrpName);
            }
            else if (GrpCount < GrpMin) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.MinimumNumberModifierError");
                Alert += FormatResourceString(prompTtext, GrpMin, GrpName);
            }
            else if ((GrpCount > GrpMax) && (GrpMax > 0)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.MaximumNumberModifierError");
                Alert += FormatResourceString(prompTtext, GrpMax, GrpName);
            }
        }
        else {
            //Only display the "at least" message for the first option group
            //Other groups will have separate messages to match the first group
            if ((ModifierDeterminesQtyFactor == -1) &&
                (GrpCount < GrpMin)) {
                DisplayQuestion(FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MinimumNumberModifierError"), GrpMin, GrpName), "OK", null, null, null);
                return false;
            }

            if ((GrpMaxDistinct > 0) && (DistinctCount > GrpMaxDistinct)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MaximumDistinctNumberModifierError"), GrpMaxDistinct, GrpName);
            }

            var oParentNode = GetNode(oGroupNode.ParentNodeId);
            //Only consider options under items and not nested under SalesItemOptions
            //SalesItemOptions may have required modifiers that are defaulted and would
            //always have a quantity of one
            //Optionally this might be able to be driven off having a group max of 1
            //if the main item had a modifier group that has a max defined
            if (oParentNode.NodeType == "Item") {
                if (ModifierDeterminesQtyFactor == -1) {
                    ModifierDeterminesQtyFactor = GrpCount;
                    ModifierDeterminesQtyGroupName = GrpName;
                    iQty = GrpCount;
                }
                else if (ModifierDeterminesQtyFactor != GrpCount) {
                    if (Alert != "") {
                        Alert += "<BR/>";
                    }
                    else {
                        var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.ModifierDeterminesQuantityError");
                        Alert += FormatResourceString(prompTtext, ModifierDeterminesQtyFactor, ModifierDeterminesQtyGroupName);
                        Alert += "<BR/><BR/>";
                    }
                    Alert += GrpName;
                    if (ModifierDeterminesQtyFactor > GrpCount) {
                        var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.ChooseMoreError");
                        Alert += " " + FormatResourceString(prompTtext, (ModifierDeterminesQtyFactor - GrpCount));
                    }
                    else {
                        var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.ChooseLessError");
                        Alert += " " + FormatResourceString(prompTtext, (GrpCount - ModifierDeterminesQtyFactor));
                    }
                }
            }
        }
    }

    if (Alert != "") {
        DisplayQuestion(Alert, "OK", null, null, null);
        return false;
    }

    if (PubHierarchyNodes[0].ItemOrderingMode == ItemOrderingMode_ModifierDeterminesQty) {
        if (iQty == 0) {
            var prompTtext = webSalesGroupName + '<br/>' + GetResourceObject("WebOrder.OrderEntry.ChooseOptionPrompt");
            DisplayQuestion(prompTtext, "OK", null, null, null);
            return false;
        }
        else if (!CheckValidQty("" + iQty)) {
            return false;
        }
    }
    return true;
}

function ItemAdd() {

    var SpecialInstruction = GetValue("_ItemAddSpecialInstructionsLabel", "");
    var RecipientName = GetValue("_ItemAddNameLabel", "");

    if (!isAlphabetNumeric(SpecialInstruction))
        return;
    if (!isAlphabetNumeric(RecipientName))
        return;

    var iQty = 1;

    if (PubHierarchyNodes[0].ItemOrderingMode != ItemOrderingMode_ModifierDeterminesQty) {
        var xQty = document.getElementById("_ItemAddQty").value;
        iQty = parseInt(xQty, 10);

        if (ga) {
            ga('newTracker.send', 'event', {
                eventCategory: 'Menu',
                eventAction: 'Item Added',
                eventLabel: 'Sales Item (Quantity)',
                eventValue: iQty
            });
            ga('send', 'event', {
                eventCategory: 'Menu',
                eventAction: 'Item Added',
                eventLabel: 'Sales Item (Quantity)',
                eventValue: iQty
            });
        }

        if (!CheckValidQty(xQty))
            return;
    }

    // add Modifier List to order
    var ModOptionGroupNodeIds = new Array();
    var ModGrpIds = new Array();
    var ModIds = new Array();
    var ModQuantity = new Array();
    var ModActions = new Array();
    var DefaultModActions = new Array();
    var ModParentIndices = new Array();
    var ModSection1 = new Array();
    var ModSection2 = new Array();
    var ModCount = 0;
    var ModData = "";
    var ModItemId = 0;
    var ModAction = 0;
    var ModGrpId = 0;
    var DefaultModAction = 0;
    var ModParentIndex = 0;
    var OptionGroupId = 0;
    var SelCount;
    var comboType;
    var promoPrice;
    var HasSmartItemSelection, IsSmartItemSelected;
    
    // prepare Modifier Group List dictionary
    var SelectedCount = {};
    var DistinctSelectedCount = {};
    var selectedModifierQtyCount = {};

    var oInputList = modifierItemInputsByNodeId;

    //if we are using websalesgroups, lets populate the list with only the selected list
    var wsgid = "";
    var promoId = 0;
    var menuItemName = "";
    if (selectedItemsFromSalesGroups !== undefined && selectedItemsFromSalesGroups.length > 0) {
        oInputList = [];
        PubItemId = GetNode(parseInt(selectedItemsFromSalesGroups[0].val())).ItemId;
        wsgid = $(selectedItemsFromSalesGroups[0]).data('wsgid');
        menuItemName = $(selectedItemsFromSalesGroups[0]).data('menuitemname');
        var wsgDiv = $('#wsgdiv' + wsgid).find('.WebSalesGroupDiv');
        promoId = wsgDiv.data('promoid');
        comboType = wsgDiv.data('combotype');
        promoPrice = wsgDiv.data('comboprice');
        var selectedInputs = wsgDiv.find("[data-selected='true']");
        maxNodeId = selectedInputs.length;
        if (selectedInputs.length > 0)
            for (var i = 0; i < selectedInputs.length; i++)
                oInputList.push(selectedInputs.get(i));
    }

    for (var i = 0; i <= maxNodeId; i++) {
        if (oInputList[i] != null) {
            var oNode;
            if (selectedItemsFromSalesGroups !== undefined && selectedItemsFromSalesGroups.length > 0) {
                var nodeId = parseInt($(oInputList[i]).attr('id').replace('_Node_', ''));
                oNode = GetNode(nodeId)
            } else {
                oNode = GetNode(i);
            }

            if (oNode == null) {
                continue;
            }

            if (oNode.NodeType == "Item") {
                HasSmartItemSelection = true;
                if (GetSelectedQty(oInputList[i])) {
                    PubItemId = oNode.ItemId;
                    IsSmartItemSelected = true;
                }
                continue;
            }
            if (oNode.NodeType != "Option") {
                continue;
            }

            if ((oNode.NodeType == "Option") &&
                !IsNodeForItem(oNode, PubItemId)) {
                continue;
            }

            var oOptionGroup = GetNode(oNode.ParentNodeId);

            ModAction = oNode.ModifierAction;
            ModGrpId = oNode.ModifierGroupId;
            ModParentIndex = -1;

            // Subtract out recipe quantities
            var SelectedQty = GetSelectedQty(oInputList[i]);

            var recipeSelection = GetRecipeSelection(oNode.NodeId);
            var isRecipeOnSection1 = false;
            var isRecipeOnSection2 = false;

            if (SelectedQty > 0 && oNode.ModifierAction !== modifierAction.No) {
                if (selectedModifierQtyCount[oOptionGroup.NodeId]) {
                    selectedModifierQtyCount[oOptionGroup.NodeId] += SelectedQty;
                }
                else {
                    selectedModifierQtyCount[oOptionGroup.NodeId] = SelectedQty;
                }
            }

            if (recipeSelection != null) {
                isRecipeOnSection1 = IsOnSection(0, oOptionGroup.NodeId, oNode.NodeId, 1);
                isRecipeOnSection2 = IsOnSection(0, oOptionGroup.NodeId, oNode.NodeId, 2);

                //Only subtract out the recipe quantity here if it is on the whole pizza
                if (!isRecipeOnSection1 && !isRecipeOnSection2) {
                    SelectedQty -= recipeSelection.Quantity;
                    if (SelectedQty < 0) {
                        // If quantity is negative, flip to positive and change action to 'no'
                        SelectedQty *= -1;
                        ModAction = modifierAction.No;
                    }
                }
            }

            if (SelectedQty && !isNaN(ModGrpId)) {
                OptionGroupId = oOptionGroup.NodeId;
                ModItemId = oNode.ModifierId;
                DefaultModAction = oNode.ModifierAction;
                if (!IsGroupNodeActive(oOptionGroup)) {
                    continue;
                }

                // track count of selections per option group
                if (ModAction != modifierAction.No) {
                    if (SelectedCount[OptionGroupId]) {
                        SelCount = parseInt(SelectedCount[OptionGroupId]);
                        SelectedCount[OptionGroupId] = SelCount + (SelectedQty * oNode.Weight);
                    }
                    else {
                        SelectedCount[OptionGroupId] = (SelectedQty * oNode.Weight);
                    }
                }

                if (DistinctSelectedCount[OptionGroupId]) {
                    DistinctSelectedCount[OptionGroupId] += 1;
                }
                else {
                    DistinctSelectedCount[OptionGroupId] = 1;
                }

                var oOptionGroupParent = GetNode(oOptionGroup.ParentNodeId);

                if ((oOptionGroupParent != null) &&
                    (oOptionGroupParent.NodeType == "Option")) {
                    for (ModParentIndex = ModCount; ModParentIndex >= 0; ModParentIndex--) {
                        if (ModOptionGroupNodeIds[ModParentIndex] == oOptionGroupParent.NodeId) {
                            break;
                        }
                    }
                }

                //Check recipe options
                if (isRecipeOnSection1 || isRecipeOnSection2) {
                    //Convert only on one side of the recipe to a NO for the other side
                    //This way price won't be affected
                    ModOptionGroupNodeIds[ModCount] = oNode.NodeId;
                    ModGrpIds[ModCount] = ModGrpId;
                    ModIds[ModCount] = ModItemId;
                    ModQuantity[ModCount] = 1;
                    ModActions[ModCount] = modifierAction.No;
                    DefaultModActions[ModCount] = DefaultModAction;
                    ModParentIndices[ModCount] = ModParentIndex;
                    ModSection1[ModCount] = !isRecipeOnSection1;
                    ModSection2[ModCount] = !isRecipeOnSection2;
                    ModCount++;
                    SelectedQty -= recipeSelection.Quantity;
                }

                //Check extra options
                if (SelectedQty > 0) {
                    ModOptionGroupNodeIds[ModCount] = oNode.NodeId;
                    ModGrpIds[ModCount] = ModGrpId;
                    ModIds[ModCount] = ModItemId;
                    ModQuantity[ModCount] = SelectedQty;
                    ModActions[ModCount] = ModAction;
                    DefaultModActions[ModCount] = DefaultModAction;
                    ModParentIndices[ModCount] = ModParentIndex;
                    ModSection1[ModCount] = IsOnSection(1, oOptionGroup.NodeId, oNode.NodeId, 1);
                    ModSection2[ModCount] = IsOnSection(1, oOptionGroup.NodeId, oNode.NodeId, 2);
                    ModCount++;
                }
            }
        }
    }

    //
    // check order line biz rules
    //
    if (HasSmartItemSelection && !IsSmartItemSelected) {
        DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.ChooseSizePrompt"), "OK", null, null, null);
        return;
    }

    var Alert = "";
    var ModifierDeterminesQtyFactor = -1;
    var ModifierDeterminesQtyGroupName = "";
    var GroupList = document.getElementsByName("_ModGroupInfo");

    for (i = 0; i < GroupList.length; i++) {
        var ids = GroupList[i].id.split("_");

        var oGroupNode = GetNode(ids[2]);

        if ((oGroupNode == null) || !IsGroupNodeActive(oGroupNode)) {
            continue;
        }

        var GrpId = oGroupNode.NodeId;
        var GrpName = oGroupNode.Name;
        var GrpMin = oGroupNode.MinItems;
        var GrpMax = oGroupNode.MaxItems;
        var GrpMaxDistinct = oGroupNode.MaxDistinctOptions;

        // Alert if counts not valid      
        var GrpCount = (SelectedCount[GrpId] ? parseInt(SelectedCount[GrpId]) : 0);
        var DistinctCount = (DistinctSelectedCount[GrpId] ? parseInt(DistinctSelectedCount[GrpId]) : 0);
        var modifiedOptionsCount = (selectedModifierQtyCount[GrpId] ? selectedModifierQtyCount[GrpId] : 0);

        if (PubHierarchyNodes[0].ItemOrderingMode !== ItemOrderingMode_ModifierDeterminesQty) {
            if ((GrpMaxDistinct > 0) && (modifiedOptionsCount > GrpMaxDistinct)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MaximumDistinctNumberModifierError"), GrpMaxDistinct, GrpName);
            }
            else if ((GrpMin == GrpMax) && (GrpCount != GrpMin) && (GrpMax > 0)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.ExactNumberModifierError"), GrpMin, GrpName);
            }
            else if (GrpCount < GrpMin) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MinimumNumberModifierError"), GrpMin, GrpName);
            }
            else if ((GrpCount > GrpMax) && (GrpMax > 0)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MaximumNumberModifierError"), GrpMax, GrpName);
            }
        }
        else {
            //Only display the "at least" message for the first option group
            //Other groups will have separate messages to match the first group
            if ((ModifierDeterminesQtyFactor == -1) &&
                (GrpCount < GrpMin)) {
                DisplayQuestion(FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MinimumNumberModifierError"), GrpMin, GrpName), "OK", null, null, null);
                return;
            }

            if ((GrpMaxDistinct > 0) && (DistinctCount > GrpMaxDistinct)) {
                if (Alert != "") {
                    Alert += "<BR/>";
                }
                Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.MaximumDistinctNumberModifierError"), GrpMaxDistinct, GrpName);
            }

            var oParentNode = GetNode(oGroupNode.ParentNodeId);
            //Only consider options under items and not nested under SalesItemOptions
            //SalesItemOptions may have required modifiers that are defaulted and would
            //always have a quantity of one
            //Optionally this might be able to be driven off having a group max of 1
            //if the main item had a modifier group that has a max defined
            if (oParentNode.NodeType == "Item") {
                if (ModifierDeterminesQtyFactor == -1) {
                    ModifierDeterminesQtyFactor = GrpCount;
                    ModifierDeterminesQtyGroupName = GrpName;
                    iQty = GrpCount;
                }
                else if (ModifierDeterminesQtyFactor != GrpCount) {
                    if (Alert != "") {
                        Alert += "<BR/>";
                    }
                    else {
                        Alert += FormatResourceString(GetResourceObject("WebOrder.OrderEntry.ModifierDeterminesQuantityError"), ModifierDeterminesQtyFactor, ModifierDeterminesQtyGroupName);
                        Alert += "<BR/><BR/>";
                    }
                    Alert += GrpName;
                    if (ModifierDeterminesQtyFactor > GrpCount) {
                        Alert += " " + FormatResourceString(GetResourceObject("WebOrder.OrderEntry.ChooseMoreError"), (ModifierDeterminesQtyFactor - GrpCount));
                    }
                    else {
                        Alert += " " + FormatResourceString(GetResourceObject("WebOrder.OrderEntry.ChooseLessError"), (GrpCount - ModifierDeterminesQtyFactor));
                    }
                }
            }
        }
    }

    if (Alert != "") {
        DisplayQuestion(Alert, "OK", null, null, null);
        return;
    }

    if (PubHierarchyNodes[0].ItemOrderingMode == ItemOrderingMode_ModifierDeterminesQty) {
        if (iQty == 0) {
            DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.ChooseOptionPrompt"), "OK", null, null, null);
            return;
        }
        else if (!CheckValidQty("" + iQty)) {
            return;
        }
    }

    //Some browsers like firefox still have the onclick handlers fire after the button is disabled
    SetCancelAndCloseButton(true);

    //
    // add line [create order first if needed]
    //
    if (PubOrder == null) {
        GetOrder();
    }
    else {

        if (selectedItemsFromSalesGroups.length > 0) {//if we are using combos,websalesgroups, generate json object to package multiple items
            var OrderWebSalesGroupLineItem = {};
            OrderWebSalesGroupLineItem.GroupLineId = 0;//this will be randomly generated upon insert
            OrderWebSalesGroupLineItem.MenuItemName = menuItemName;
            OrderWebSalesGroupLineItem.WebSalesGroupId = wsgid;
            OrderWebSalesGroupLineItem.LineItemNumber = PubLineItemNumber;
            OrderWebSalesGroupLineItem.MenuItemId = PubItemHeaderId;
            OrderWebSalesGroupLineItem.ItemId = PubItemId;
            OrderWebSalesGroupLineItem.Quantity = iQty;
            OrderWebSalesGroupLineItem.SpecialInstruction = SpecialInstruction;
            OrderWebSalesGroupLineItem.RecipientName = RecipientName;
            OrderWebSalesGroupLineItem.ModGrpIds = ModGrpIds;
            OrderWebSalesGroupLineItem.ModIds = ModIds;
            OrderWebSalesGroupLineItem.ModQuantity = ModQuantity;
            OrderWebSalesGroupLineItem.IModActions = ModActions;
            OrderWebSalesGroupLineItem.ModParentIndex = ModParentIndices;
            OrderWebSalesGroupLineItem.ModSection1 = ModSection1;
            OrderWebSalesGroupLineItem.ModSection2 = ModSection2;
            OrderWebSalesGroupLineItem.RolledUpModQty = PubInitialQuantitySelection;
            OrderWebSalesGroupLineItem.IDefaultModActions = DefaultModActions;
            OrderWebSalesGroupLineItem.PromoId = promoId;
            OrderWebSalesGroupLineItem.PromoType = comboType;
            OrderWebSalesGroupLineItem.Price = promoPrice;
            webSalesGroupSelectedItems.push(OrderWebSalesGroupLineItem);
            selectedItemsFromSalesGroups.shift();
            if (selectedItemsFromSalesGroups.length == 0) {
                postAjaxJSON({
                    url: '/OrderEntryService.asmx/AddOrderLineItems',
                    data: JSON.stringify({ lstOrderLineItems: webSalesGroupSelectedItems }),
                    error: function (jqXHR, textStatus, errorThrown) {
                        result = { get_message: function () { return errorThrown; } };
                        AddOrderLineFailed(result, "user context");
                    },
                    success: function (data, textStatus, jqXHR) {
                        AddOrderLineOK(data.d);
                    }
                });
            }
        }
        else {
            Radiant.AlohaOnline.OrderEntryService.AddOrderLine(PubLineItemNumber, PubItemHeaderId, PubItemId,
                iQty, SpecialInstruction, RecipientName, ModGrpIds, ModIds, ModQuantity, ModActions, ModParentIndices,
                ModSection1, ModSection2, PubInitialQuantitySelection, DefaultModActions, null, AddOrderLineOK, AddOrderLineFailed, "user context");
        }
    }
}

function AddOrderLineOKSuccess(OrderEntryResult) {
    if (OrderEntryResult.Order != null) {
        GetOrder();
    }

    var addonQuantity = 0;
    var oInput = $get("_UpsellAddonQuantityInput");
    var oDetails = $get("_UpsellAddonItemIds");
    if ((oInput != null) && (oDetails != null)) {
        addonQuantity = parseInt(oInput.value);
        //Reset the value so that if we add the upsell, we don't think we need to add 
        //another upsell
        oInput.value = "0";
    }

    if (addonQuantity) {
        var ids = oDetails.value.split('_');
        var menuItems = new Array();
        var salesItems = new Array();
        var qtys = new Array();
        menuItems.push(ids[0]);
        salesItems.push(ids[1]);
        qtys.push(addonQuantity);

        var recipientName = GetValue("_ItemAddNameLabel", "");
        var oesResponse = Radiant.AlohaOnline.OrderEntryService.AddDefaultOrderLines(menuItems, salesItems, qtys, "", recipientName,
            AddOrderLineOK, AddOrderLineFailed, "user context");

    }
    else {
        HidePopup();
    }

    selectedItemsFromSalesGroups = [];
    webSalesGroupSelectedItems = [];
    HidePopup();
    HideLoading();
}

function AddOrderLineOK(OrderEntryResult) {

    if (OrderEntryResult.SessionExpired) {
        SessionExpired();
    }
    else if (OrderEntryResult.Success == false) {
        //HidePopup();
        SetCancelAndCloseButton(false);
        HideLoading();
        if (OrderEntryResult.ItemNotFound) {
            DisplayQuestion(OrderEntryResult.ItemNotFoundMessage, "OK",
                null, "window.location='../Locations.html';return false;", null);
        }
        else if ((OrderEntryResult.Message !== null) && (OrderEntryResult.Message != "")) {
            DisplayQuestion(OrderEntryResult.Message,
                GetResourceObject('WebOrder.QuestionPopup.OKButton'), null, null, null);
        }
        else {
            DisplayQuestion(GetResourceObject("WebOrder.OrderEntry.LastOrderedItemError"),
                GetResourceObject('WebOrder.QuestionPopup.OKButton'), null, null, null);
        }
    }
    else {
        AddOrderLineOKSuccess(OrderEntryResult);
    }
}

function GetOrderCompletedOK() {
    HidePopup();
    HideLoading();
}

function AddOrderLineFailed(result, userContext) {
    HidePopup();
    HideLoading();
    GetWebServiceFailed({ error: result.get_message() }, userContext);
    selectedItemsFromSalesGroups = [];
    webSalesGroupSelectedItems = [];
}

//
// item cancel
//
function ItemCancel(iItemId) {
    if (ga) {
        ga('newTracker.send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Canceled'
        });
        ga('send', 'event', {
            eventCategory: 'Menu',
            eventAction: 'Item Canceled'
        });
    }

    // hide modifier input modal popup    
    HidePopup();
}

function ChangeImageMode(img, num) {
    if (img) {
        if (img.runtimeStyle && img.runtimeStyle.filter && img.runtimeStyle.filter != "") {
            img.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.src2.substring(0, img.src2.length - 1) + num + "', sizingMethod='image')";
        }
        else {
            img.src = img.src.substring(0, img.src.length - 1) + num;
        }
    }
}

function MenuCategoryRowVisibilityNormal(clientId) {
    var normal = $get(clientId + "_Normal");
    var hover = $get(clientId + "_Hover");
    var selected = $get(clientId + "_Selected");

    if (normal != null) {
        normal.style.marginLeft = "0px"; //updated for ADA compatibility,using marginLeft to hide element because display:none/visibility:hidden causes IE to not allow focus on tab
        if (selected != null) {
            selected.style.display = "none";
        }
        if (hover != null) {
            hover.style.display = "none";
        }
    }
}

function MenuCategoryRowVisibilityHover(clientId) {
    var normal = $get(clientId + "_Normal");
    var hover = $get(clientId + "_Hover");
    var selected = $get(clientId + "_Selected");
    if (hover != null) {
        //don't change to hover if the item is selected
        if ((selected == null) || (selected.style.display != "")) {
            if (selected != null) {
                selected.style.display = "none";
            }
            if (hover.style.display != "") {
                hover.style.display = "";
            }
            if ((normal != null) && (normal.style.marginLeft != "-1000px")) {//updated for ADA compatibility,using marginLeft to hide element because display:none/visibility:hidden causes IE to not allow focus on tab
                normal.style.marginLeft = "-1000px";
            }
        }
    }
}

function MenuCategoryRowVisibilitySelected(clientId) {
    var normal = $get(clientId + "_Normal");
    var hover = $get(clientId + "_Hover");
    var selected = $get(clientId + "_Selected");

    if (selected != null) {
        if (selected.style.display != "") {
            selected.style.display = "";
        }
        if (normal != null) {
            normal.style.marginLeft = "-1000px"; //updated for ADA compatibility,using marginLeft to hide element because display:none/visibility:hidden causes IE to not allow focus on tab
        }
        if (hover != null) {
            hover.style.display = "none";
        }
    }
}

function MenuCategoryRowVisibilityOut(clientId) {
    var normal = $get(clientId + "_Normal");
    var hover = $get(clientId + "_Hover");
    var selected = $get(clientId + "_Selected");
    //don't do anything if the graphic is selected
    if (normal != null) {
        if ((selected == null) || (selected.style.display != "")) {
            if (normal.style.marginLeft == "-1000px") {
                normal.style.marginLeft = "0px";
            }
            if (selected != null) {
                selected.style.display = "none";
            }
            if (hover != null) {
                hover.style.display = "none";
            }
        }
    }
}

function GetIndex(o) {
    var children = o.parentNode.childNodes;
    var child;
    var i = 0;
    var count = 0;
    while ((child = children.item(i++)) && child != o) count++;

    return count;
}

// Handle modifier image click
function onModImageClick(obj, nodeId) {
    SelectMod(nodeId, true);
}

// Programatically click checkbox/radio
function SelectMod(nodeId, bOn, bExtra) {

    var oInput = $("#_Node_" + nodeId);

    if (oInput) {
        var quantity = (bOn) ? 1 : -999;
        if (bExtra && !bOn) {
            //If we are removing the extra portion of a modifier, allow the recipe portion to
            //remain since that is free
            var SelectedQty = GetSelectedQty(oInput);
            var recipeSelection = GetRecipeSelection(nodeId);

            if (recipeSelection != null) {
                quantity = recipeSelection.Quantity - SelectedQty;
            }
        }
        onModItemActualClick(nodeId, quantity, null);
    }
    else {
        alert("Input not found: '_AddMod_" + id + "_" + mgId + "_" + HeaderItemId + "'");
    }
}

function SetChecked(obj, bOn) {
    if (bOn) {
        obj.checked = "checked";
        //Setting this to checked has the side effect of not allowing the option to be unchecked
        //on chrome, but it works on IE
        //obj.setAttribute("checked", "checked");
    }
    else {
        obj.checked = "";
        obj.removeAttribute("checked");
    }
}

function IsChecked(obj) {

    // IE8 Radio Button Selection
    if (obj.type == "radio" && ($.browser.msie && parseInt($.browser.version, 10) === 8)) {

        if (obj.checked) {
            return true;
        } else {
            return false;
        }
    }

    if ((obj.getAttribute("checked") != null) &&
        (obj.getAttribute("checked") == "checked")) {
        //While the checked attribute is needed to set the state from the server, not
        //all browsers will clear the attribute once the checkbox is unchecked
        obj.removeAttribute("checked");
        obj.checked = true;
        return true;
    }
    else if (obj.checked) {
        return true;
    }
    return false;
}

function IsQtyInput(obj) {
    return (obj.type == "text");
}

function SetSelectedQty(obj, value) {
    if ((obj.type == "radio") || (obj.type == "checkbox")) {
        SetChecked(obj, value);
    }
    else if ((obj.type == "text") || (obj.type == "hidden")) {
        obj.value = value;
    }
}

function GetSelectedQty(obj) {
    if ((obj.type == "radio") || (obj.type == "checkbox")) {
        if (IsChecked(obj)) {
            return 1;
        }
        return 0;
    }
    else if ((obj.type == "text") || (obj.type == "hidden")) {
        var result = parseInt(obj.value, 10);
        if (isNaN(result)) {
            return 0;
        }
        return result;
    }
    return 0;
}

function UpdateModifierGroupInstructionsByNode(node) {
    //Don't update the modifier group instructions with a summary of what is selected if we
    //already have the modifier summary receipt to display what options are selected
    var modifierReceipt = $get("ModifierSummary");
    if (modifierReceipt != null) {
        return;
    }

    var modifierGroupDiv = GetModifierGroupDiv(node.NodeId);

    var defaultSummary = ""
    var summary = defaultSummary;
    var spacer = $get("_ModGroupHS_" + node.NodeId);
    var instructions = $get("_ModGroupInst_" + node.NodeId);
    if (instructions != null) {
        if (instructions.originalInstructions == null) {
            instructions.originalInstructions = instructions.innerHTML;
        }

        //Update the description to the selected options as soon as the node is visited
        for (var i = 0; i < node.Children.length; i++) {
            if (node.Children[i].NodeType == "Option") {
                var childNode = node.Children[i];
                var childInput = GetModifierItemInput(childNode.NodeId);
                if (childInput != null) {
                    var quantity = GetSelectedQty(childInput);
                    if (quantity > 0) {
                        if (summary.length > defaultSummary.length) {
                            summary += ", ";
                        }
                        if (quantity > 1) {
                            summary += quantity + "x ";
                        }
                        summary += childInput.title;
                    }
                }
            }
        }

        if (summary.length > defaultSummary.length) {
            spacer.style.display = "";
            instructions.innerHTML = summary;
        }
        else {
            spacer.style.display = "none";
            instructions.innerHTML = instructions.originalInstructions;
        }
    }
}

function UpdateInputModifierGroupInstructions(modifierGroupDiv) {
    var groupModifiers = GetChildByClass(modifierGroupDiv, "ModifierGroupModifiers");
    if (groupModifiers == null) {
        return;
    }

    var defaultSummary = ""
    var summary = defaultSummary;
    var spacer = GetChildByClass(modifierGroupDiv, "ModifierGroupHeaderSpacer");
    var instructions = GetChildByClass(modifierGroupDiv, "ModifierGroupInstructions");
    if (instructions != null) {
        if (instructions.originalInstructions == null) {
            instructions.originalInstructions = instructions.innerHTML;
        }
        //Update the description to the selected options as soon as the node is visited
        var inputs = groupModifiers.getElementsByTagName("input");

        if ((inputs != null) && (inputs.length > 0)) {
            summary = inputs[0].value;
        }

        if (summary.length > defaultSummary.length) {
            spacer.style.display = "";
            instructions.innerHTML = summary;
        }
        else {
            spacer.style.display = "none";
            instructions.innerHTML = instructions.originalInstructions;
        }
    }

}

function HideSpecialInstructions() {
    HideModifierGroup(null, $get("_ModGroupDiv_SpecialInstructions"));
}

function HideModifierGroup(shownGroup, modifierGroupDiv) {
    if (modifierGroupDiv != shownGroup) {
        var groupModifiers = GetChildByClass(modifierGroupDiv, "ModifierGroupModifiers");

        if (groupModifiers != null) {
            groupModifiers.style.display = "none";
        }

        var header = GetImmediateChildByClass(modifierGroupDiv, "ModifierGroupContentSelected");
        if (header != null) {
            SetClass(header, "ModifierGroupContent");
        }
    }
}

function HideOtherModifierGroups(shownGroup, nodeId, oldNodeId) {
    var oParent = GetNode(nodeId);

    if (oParent == null) {
        //TODO try to find the select item, the groups under that an hide all of them
        //may want to try to make it specific to a tab for pizza
        oParent = GetNode(PubSelectedOptionGroupNodeId);

        if (oParent == null) {
            return;
        }
    }
    else {
        HideSpecialInstructions();
        UpdateInputModifierGroupInstructions($get("_ModGroupDiv_SpecialInstructions"));
    }

    for (var i = 0; i < oParent.Children.length; i++) {
        if (oParent.Children[i].NodeType == "OptionGroup") {
            var childNodeId = oParent.Children[i].NodeId;
            if (childNodeId != nodeId) {
                HideModifierGroup(shownGroup, GetModifierGroupDiv(childNodeId));
            }
        }
    }

    if (nodeId != oldNodeId) {
        var oOldParent = GetNode(oldNodeId);

    }
}

function onModGroupHover(div) {
    var className = GetClass(div);
    if ((className.indexOf("ModifierGroupContentHover") < 0) &&
        (className.indexOf("ModifierGroupContentSelected") < 0)) {
        SetClass(div, "ModifierGroupContentHover");
    }
}

function onModGroupOut(div) {
    var className = GetClass(div);
    if (className.indexOf("ModifierGroupContentHover") >= 0) {
        SetClass(div, "ModifierGroupContent");
    }
}

function onModGroupClick(div, groupId) {
    var modifierGroupDiv = GetParentByClass(div, "ModifierGroupDiv");
    var groupModifiers = GetChildByClass(modifierGroupDiv, "ModifierGroupModifiers");

    var divClass = GetClass(div.parentNode);

    if (divClass == "ModifierGroupContentSelected") {
        if (groupModifiers != null) {
            groupModifiers.style.display = "none";
        }
        SetClass(div.parentNode, "ModifierGroupContentHover");
    }
    else {
        if (groupModifiers != null) {
            groupModifiers.style.display = "";
        }
        SetClass(div.parentNode, "ModifierGroupContentSelected");
        HideOtherModifierGroups(modifierGroupDiv, groupId, PubSelectedOptionGroupNodeId);
    }

    if (modifierGroupDiv.id == "_ModGroupDiv_SpecialInstructions") {
        UpdateInputModifierGroupInstructions(modifierGroupDiv);
    }
    else {
        var oModifierGroup = GetNode(groupId);
        UpdateModifierGroupInstructionsByNode(modifierGroupDiv);
    }

    PubSelectedOptionGroupNodeId = groupId;

    updateScrollBars(groupId);

    //Recenter the modal now that the dimensions have changed        
    var modalPopupBehavior = $find('programmaticModalPopupBehavior');
    modalPopupBehavior.show();
}

function updateScrollBars(nodeId) {
    ScrollBar.Update($get('ModifierScrollButton'), $get('TabScrollDiv'));
    ScrollBar.Update($get('ModifierSummaryScrollButton'), $get('ModifierSummaryContent'));

    var oNode = GetNode(nodeId);
    if ((PubItemOrderingMode == ORDER_MODE_PIZZA || PubItemOrderingMode == ORDER_MODE_BYO) &&
        (GetParentItemId(oNode) == PubItemId)) {
        var suffix = "_" + PubItemId + "_" + GetCurrentTab();
        ScrollBar.Update($get("TabPanelScrollButton" + suffix), $get("TabPanelScrollDiv" + suffix));
    }
}

// onModItemClick was being called programatically and not only on user input
function onModItemActualClick(nodeId, changeQty, input) {

    var modItemClickResult = onModItemClick(nodeId, changeQty, input);

    var node = GetNode(nodeId);
    var oOptionGroup = GetNode(node.ParentNodeId);

    if (ga) {
        var eventLabel = 'Optional Modifier ';
        var checked = $get("_Node_" + nodeId).checked;
        if (oOptionGroup.MinItems > 0) {
            eventLabel = 'Required Modifier ';
        }

        // determine the nested modifier level
        var nestedModLevel = 0;
        var currentNode = node;
        while (currentNode.NodeType !== "Item") {
            if (currentNode.NodeType === "OptionGroup") {
                nestedModLevel++;
            }
            currentNode = GetNode(currentNode.ParentNodeId);
        }

        if ((checked && changeQty === 0) || changeQty > 0) {
            eventLabel += 'Selected (Level)';
            ga('newTracker.send', 'event', {
                eventCategory: 'Menu',
                eventAction: 'Modifier Selected',
                eventLabel: eventLabel,
                eventValue: nestedModLevel
            });
            ga('send', 'event', {
                eventCategory: 'Menu',
                eventAction: 'Modifier Selected',
                eventLabel: eventLabel,
                eventValue: nestedModLevel
            });
        } else if (changeQty < 0 || (!checked && changeQty === 0)) {
            eventLabel += 'Deselected (Level)';
            ga('newTracker.send', 'event', {
                eventCategory: 'Menu',
                eventAction: 'Modifier Deselected',
                eventLabel: eventLabel,
                eventValue: nestedModLevel
            });
            ga('send', 'event', {
                eventCategory: 'Menu',
                eventAction: 'Modifier Deselected',
                eventLabel: eventLabel,
                eventValue: nestedModLevel
            });
        }
    }

    return modItemClickResult;
}

// Handle all related UI updates  
function onModItemClick(nodeId, changeQty, input) {
    var node = GetNode(nodeId);
    var oOptionGroup = GetNode(node.ParentNodeId);

    var oInput;
    var oDiv;
    var oNested;

    if (typeof input !== 'undefined' && input != null) {

        if ($(input).attr("type") == "submit") {//in the case where input is not a radio or checkbox, find the corresponding text box
            var parentdiv = $(input).closest('.ModifierItemCheck');
            if (parentdiv.length > 0) {
                input = $(parentdiv.get(0)).find('input[type=text]');
                oInput = input.get(0);
                oDiv = $(input).closest('.ModifierItem').get(0);
                oNested = GetNestedModifierGroupDiv(nodeId);
                $(input).attr('data-selected', 'true');
            }
        }
        else//if input is radio or checkbox
        {
            oInput = input;
            oDiv = $(input).closest('.ModifierItem').get(0);
            oNested = GetNestedModifierGroupDiv(nodeId);
            if ($(input).attr("type").toLowerCase() == "radio") {
                $(input).attr('data-selected', 'true');
            }
            else {
                if ($(input).attr('data-selected') == 'true')
                    $(input).removeAttr('data-selected');
                else
                    $(input).attr('data-selected', 'true');
            }
        }

    }
    else {
        oInput = $get("_Node_" + nodeId);
        oDiv = $get("_ModItemOptionDiv_" + nodeId);
        oNested = GetNestedModifierGroupDiv(nodeId);
    }

    // Exit if not found
    if (oInput == null) {
        alert("Input not found: _Node_" + nodeId);
        return;
    }

    // Calculate new quantity
    var SelectedQty = GetSelectedQty(oInput);
    if (oInput.type == "text") {
        // Increment selected quantity
        SelectedQty += changeQty;
        if (SelectedQty < 0) {
            SelectedQty = 0;
        }
        else if ((oOptionGroup.PerOptionMax > 0) &&
            (SelectedQty > oOptionGroup.PerOptionMax)) {
            if (oOptionGroup.RolloverAtMaxQuantity) {
                SelectedQty = 0;
            }
            else {
                SelectedQty = oOptionGroup.PerOptionMax;
            }
        }
        else if ((oOptionGroup.PerOptionMin > 0) &&
            (SelectedQty < oOptionGroup.PerOptionMin)) {
            //If text is entered into the input ChangeQty will be 0
            if ((changeQty == 0) && (SelectedQty > 0)) {
                SelectedQty = oOptionGroup.PerOptionMin;
            }
            //If someone types in something under the minium, bump up to the minimum
            else if (changeQty > 0) {
                SelectedQty = oOptionGroup.PerOptionMin;
            }
            else {
                SelectedQty = 0;
            }
        }
    }
    else if (changeQty != 0) {
        // Flip the check/radio
        SelectedQty = (SelectedQty) ? 0 : 1;
    }

    // Update quantity and refresh item display           
    onModItem(nodeId, oDiv, oInput, oNested, SelectedQty);
    updateScrollBars(nodeId);

    var oParent = GetNode(node.ParentNodeId);
    UpdateModifierGroupInstructionsByNode(oParent);

    if (SelectedQty == 0) {
        var recipePrefix = "_SUMMOD_0_" + nodeId;
        if (RemoveFromSection(1, recipePrefix) ||
            RemoveFromSection(2, recipePrefix)) {
            SetClass($get(recipePrefix + "_0"), "SummarySection SummaryWholeSelected");
            SetClass($get(recipePrefix + "_1"), "SummarySection SummaryLeft");
            SetClass($get(recipePrefix + "_2"), "SummarySection SummaryRight");
        }
        RemoveFromSection(1, "_SUMMOD_1_" + nodeId);
        RemoveFromSection(2, "_SUMMOD_1_" + nodeId);
    }
    else {
        //Clear any extra mod sections if we are at default quantity specified by the recipe
        var recipeSelection = GetRecipeSelection(node.NodeId);
        if ((recipeSelection != null) &&
            (recipeSelection.Quantity == SelectedQty)) {
            RemoveFromSection(1, "_SUMMOD_1_" + nodeId);
            RemoveFromSection(2, "_SUMMOD_1_" + nodeId);
        }
    }
}

function onModItemSelectQtyChange(nodeId, select) {

    var oInput;
    var oSelect;
    var oDiv;
    var oNested;

    if (select !== undefined || select != null) {
        var parentdiv = $(select).closest('.ModifierItemCheck');
        if (parentdiv.length > 0) {
            oSelect = select;
            oInput = parentdiv.find('input').get(0);
            oDiv = $(select).closest('.ModifierItem').get(0);
            oNested = GetNestedModifierGroupDiv(nodeId);
            $(oInput).attr('data-selected', 'true');
        }
    }
    else {
        oInput = $get("_Node_" + nodeId);
        oSelect = $get("_NodeSelect_" + nodeId);
        oDiv = $get("_ModItemOptionDiv_" + nodeId);
        oNested = GetNestedModifierGroupDiv(nodeId);
    }

    // Exit if not found
    if (oInput == null) {
        alert("Input node not found: node " + nodeId);
        return;
    }

    // Exit if not found
    if (oSelect == null) {
        alert("Select node not found: node " + nodeId);
        return;
    }

    var selectedQty = parseInt(oSelect.value);
    if (isNaN(selectedQty)) {
        selectedQty = 0;
    }
    onModItem(nodeId, oDiv, oInput, oNested, selectedQty);

    updateScrollBars(nodeId);

    var oNode = GetNode(nodeId);
    var oParent = GetNode(oNode.ParentNodeId);
    UpdateModifierGroupInstructionsByNode(oParent);
}

function onModItem(nodeId, oDiv, oInput, oNested, SelectedQty, bExtra) {

    // Update quantity
    SetSelectedQty(oInput, SelectedQty);
    var node = GetNode(nodeId);
    var parentNode = GetNode(node.ParentNodeId);

    var bRadio = (oInput.type == "radio");
    var bExclusiveModifier = (((node.ModifierAction == modifierAction.Everything) ||
        (node.ModifierAction == modifierAction.Plain)) &&
        (SelectedQty > 0));

    if (parentNode.HasExclusiveModifier && !bExclusiveModifier && (SelectedQty > 0)) {
        for (var i = 0; i < parentNode.Children.length; i++) {
            var sibling = parentNode.Children[i];
            if ((sibling.ModifierAction != modifierAction.Everything) &&
                (sibling.ModifierAction != modifierAction.Plain)) {
                continue;
            }

            var siblingInput = GetModifierItemInput(sibling.NodeId);
            if (siblingInput != null) {
                SetSelectedQty(siblingInput, 0);
                var nestedModifiers = GetNestedModifierGroupDiv(sibling.NodeId);
                UpdateModifier(siblingInput, sibling.NodeId, siblingInput.parentNode.parentNode,
                    nestedModifiers, 0, true);
            }
        }
    }

    // Uncheck siblings
    if ((bRadio || bExclusiveModifier) && (SelectedQty > 0)) {
        if (oDiv != null) {
            // Update all of the radio buttons in this group
            for (i = 0; i < parentNode.Children.length; i++) {
                var sibling = parentNode.Children[i];
                if (sibling.NodeId == nodeId) {
                    continue;
                }

                var siblingInput = GetModifierItemInput(sibling.NodeId);

                if (siblingInput != null) {
                    SetSelectedQty(siblingInput, 0);
                    var nestedModifiers = GetNestedModifierGroupDiv(sibling.NodeId);
                    UpdateModifier(siblingInput, sibling.NodeId, siblingInput.parentNode.parentNode,
                        nestedModifiers, 0, true);
                }
            }

            //the radio buttons may be hidden behind a drop down selection
            //and we need to make sure the selection is in synch
            var oSelect = $get("_ModSelection_" + parentNode.NodeId);

            if (oSelect != null) {
                for (i = 0; i < oSelect.options.length; i++) {
                    if (oSelect.options[i].value == nodeId) {
                        oSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    }

    // Update visual styles of option
    UpdateModifier(oInput, nodeId, oDiv, oNested, SelectedQty, bRadio);

    // Update pseudo receipt    
    if ((PubItemOrderingMode == ORDER_MODE_PIZZA || PubItemOrderingMode == ORDER_MODE_BYO) &&
        (GetParentItemId(node) == PubItemId)) {
        var tab = oInput.parentNode.parentNode.parentNode.parentNode;
        UpdateSummary(oInput, nodeId, tab, SelectedQty, bRadio, bExtra);
    }
}

function onUpsellReplacementClick(menuItemId, defaultSalesItemId) {
    CustomizeItem(menuItemId, defaultSalesItemId);
}

function onUpsellAddonQuantityClick(direction) {
    var oInput = $get("_UpsellAddonQuantityInput");

    if (oInput != null) {
        var current = parseInt(oInput.value);
        current += direction;
        if (current < 0) {
            current = 0;
        }
        else if (current > GetMaxLineItemQuantity()) {
            current = GetMaxLineItemQuantity();
        }

        oInput.value = current;
    }
}

function onUpsellItemAddonQuantityClick(inputName, direction) {
    var oInput = $get(inputName);

    if (oInput != null) {
        var current = parseInt(oInput.value);
        current += direction;
        if (current < 0) {
            current = 0;
        }
        else if (current > GetMaxLineItemQuantity()) {
            current = GetMaxLineItemQuantity();
        }

        oInput.value = current;
    }
}

function onItemAddNameOptionChange() {
    var oSelect = $get("_ItemAddNameOptions");
    var oInput = $get("_ItemAddNameLabel");
    if ((oSelect.value != null) && (oSelect.value != "")) {
        oInput.value = oSelect.value;
    }
}

// Update the styles of a modifier image or text
function UpdateModifier(oInput, oInputNodeId, oDiv, oNested, SelectedQty, bRadio) {
    var oNode = GetNode(oInputNodeId);

    // Hide or show nested modifier div
    if (oNested) {
        oNested.style.display = (SelectedQty) ? "inline" : "none";;
    }

    if (oDiv) {
        // Change style - TBD: Refactor and use CSS class
        if (SelectedQty) {
            oDiv.style.fontWeight = "bold";
        } else {
            oDiv.style.fontWeight = "";
        }
    }

    // Change style for image modifiers
    // GetParentByClass seems faster on IE7
    //var oModifierItemDiv = GetModifierItemDiv(oInputNodeId);
    var oModifierItemDiv = GetParentByClass(oInput, "ModifierItem");
    var oImageDiv = null;
    var oPrice = null;
    var orderModifierCaloricValueDiv = null;
    var orderModifierAddMessageSpan = null;
    var orderModifierMinusMessageSpan = null;
    var orderModifierQuantityMessageSpan = null;

    if (oModifierItemDiv != null) {
        // Try to get div by one of the three styles
        oImageDiv = GetChildByClass(oModifierItemDiv, "ModImageSelected");
        if (oImageDiv == null) {
            oImageDiv = GetChildByClass(oModifierItemDiv, "ModImageDouble");
        }
        if (oImageDiv == null) {
            oImageDiv = GetChildByClass(oModifierItemDiv, "ModImage");
        }

        // Change visibility for Calorie Message
        orderModifierCaloricValueDiv = GetChildByClass(oModifierItemDiv, "ModifierCaloricValue");
        if (orderModifierCaloricValueDiv != null) {
            orderModifierMinusMessageSpan = GetChildByClass(oModifierItemDiv, "ModifierMinusMessage");
            orderModifierAddMessageSpan = GetChildByClass(oModifierItemDiv, "ModifierAddMessage");
            orderModifierQuantityMessageSpan = GetChildByClass(oModifierItemDiv, "ModifierQuantityMessage");
            if (orderModifierAddMessageSpan != null && orderModifierMinusMessageSpan != null) {
                if (SelectedQty) {
                    orderModifierAddMessageSpan.style.display = "none";
                    orderModifierMinusMessageSpan.style.display = "inline";
                } else {
                    orderModifierAddMessageSpan.style.display = "inline";
                    orderModifierMinusMessageSpan.style.display = "none";
                }
            }
            if (orderModifierAddMessageSpan != null && orderModifierQuantityMessageSpan != null) {
                if (SelectedQty) {
                    orderModifierAddMessageSpan.style.display = "none";
                    orderModifierQuantityMessageSpan.style.display = "inline";
                } else {
                    orderModifierAddMessageSpan.style.display = "inline";
                    orderModifierQuantityMessageSpan.style.display = "none";
                }
            }
        }

        // Hide price for recipe items that haven't had extra ordered
        if (oNode != null) {
            var recipeSelection = GetRecipeSelection(oNode.NodeId);

            if (recipeSelection != null) {
                oPrice = GetChildByClass(oModifierItemDiv, "ModifierPrice");
                if (oPrice != null) {
                    oPrice.style.display = ((SelectedQty > recipeSelection.Quantity) ? "" : "none");
                }
            }
        }
    }

    if (oImageDiv != null) {
        switch (SelectedQty) {
            case 2: SetClass(oImageDiv, "ModImageDouble"); break;
            case 1: SetClass(oImageDiv, "ModImageSelected"); break;
            case 0: SetClass(oImageDiv, "ModImage"); break;
        }
    }
}

function UpdateSummary(oInput, nodeId, tab, SelectedQty, bUnique, bExtra) {
    var receipt = document.getElementById("ModifierSummaryItems");
    var order = GetIndex(tab);  // Sort order based on tab order    
    var node = GetNode(nodeId);

    if ((receipt == null) || (node == null)) {
        // No pizza item or input is for sizes
        return;
    }

    // Hide options that are required (ex: to go)
    var oGroup = GetNode(node.ParentNodeId);
    if (oGroup && oGroup.MinItems == 1 && oGroup.MaxItems == 1 && oGroup.Children.length == 1) {
        return;
    }

    if (bExtra == null) {
        bExtra = false;
    }

    var name = node.Name;
    var price = node.Price;
    var before = null;
    var bIsRecipe = false;

    var recipeSelection = GetRecipeSelection(nodeId);

    // Check for recipe item, but split if over recipe quantity
    if (recipeSelection != null) {
        bIsRecipe = true;
        if (bExtra) {
            SelectedQty -= recipeSelection.Quantity;
            if (SelectedQty < 0) {
                SelectedQty = 0;
            }
        }
    }
    else {
        bExtra = true;
    }

    // Handle updating extras 
    var id = "_SUMMOD_" + (bExtra ? 1 : 0) + "_" + (bUnique ? oGroup.NodeId : nodeId);
    var div = $get(id);
    var sPrice = ((bIsRecipe && !bExtra) || !price) ? "" : CurrencyFormatted(price);

    // Order recipe and free items first
    //No longer consider free as recipe. Its confusing and can cause non priced instructions 
    //to be identified as comes with
    //        if ((bIsRecipe || !price) && !bExtra)
    if (bIsRecipe && !bExtra) {
        receipt = $get("ModifierSummaryDefaults");
        receipt.style.display = ""; // Show section if hidden
    }

    if (!bIsRecipe) {
        var action = "";
        var displayMappings = jQuery.parseJSON($("input[id$=hfModMappings]").val());//json object for modactionmappings
        if (node.ModifierAction == modifierAction.Add) {
            if (displayMappings.keys.indexOf(modifierAction.Add) > -1)
                action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Add)] + " ";
            else action = GetResourceObject('WebOrder.Order.ModifierActionAddLabel') + " ";
        }
        else if (node.ModifierAction == modifierAction.No) {
            if (displayMappings.keys.indexOf(modifierAction.No) > -1)
                action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.No)] + " ";
            else action = GetResourceObject('WebOrder.Order.ModifierActionNoLabel') + " ";
        }
        else if (node.ModifierAction == modifierAction.Extra) {
            if (displayMappings.keys.indexOf(modifierAction.Extra) > -1)
                action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Extra)] + " ";
            else action = GetResourceObject('WebOrder.Order.ModifierActionExtraLabel') + " ";
        }
        else if (node.ModifierAction == modifierAction.Side) {
            if (displayMappings.keys.indexOf(modifierAction.Side) > -1)
                action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Side)] + " ";
            else action = GetResourceObject('WebOrder.Order.ModifierActionSideLabel') + " ";
        }
        else if (node.ModifierAction == modifierAction.Light) {
            if (displayMappings.keys.indexOf(modifierAction.Light) > -1)
                action = displayMappings.values[displayMappings.keys.indexOf(modifierAction.Light)] + " ";
            else action = GetResourceObject('WebOrder.Order.ModifierActionLightLabel') + " ";
        }
        name = action + name;
    }

    // Update name based on quantity
    name = ((bIsRecipe || SelectedQty < 2) ? "" : SelectedQty + "x ") + name;
    if (bIsRecipe && !bExtra && !SelectedQty) {
        name = "<s>" + name + "</s>";
    }

    if (div) {
        // Already exists
        if (bUnique) {
            // Need exactly one from this group
            if (SelectedQty) {
                div.childNodes[0].innerHTML = name;
                if (oGroup.ForceSection == 0) {
                    div.childNodes[3].innerHTML = sPrice;
                }
            }
        }
        else {
            if (SelectedQty) {
                // Update the quantity field number
                div.childNodes[0].innerHTML = name;
                SetClass(div.childNodes[div.childNodes.length - 1], "SummaryDelete");
            }
            else if (bIsRecipe && !bExtra) {
                // Show 'No Mod' for recipe item
                div.childNodes[0].innerHTML = name;
                SetClass(div.childNodes[div.childNodes.length - 1], "SummaryAdd");
            }
            else {
                // Remove from receipt and unselect
                div.parentNode.removeChild(div);
            }
        }
    }
    else if (SelectedQty || (bIsRecipe && !bExtra)) {
        var addDeleteButtonClass = SelectedQty ? "SummaryDelete" : "SummaryAdd";
        var onClickHandler = "onclick=\"SelectMod(" + nodeId + ",(GetClass(this) != 'SummaryDelete'), " + bExtra + ");\" ";

        // New div: create a new receipt item and select the modifier
        var sHTML = "<DIV class='SummaryName'>" + name + "</div>";
        if (PubItemOrderingMode == ORDER_MODE_BYO) {
            sHTML += "<DIV class='SummarySection'></div>";
            sHTML += "<DIV class='SummaryNoHalves'></div>";
            sHTML += "<DIV class='SummaryPrice'>" + sPrice + "</div>";
            sHTML += "<DIV class='" + addDeleteButtonClass + "' " + onClickHandler + "></div>";
        }
        else if (oGroup.ForceSection != 0) {
            //Since we don't support calculating pizza modifier pricing, do not display price
            sPrice = "";

            sHTML += "<DIV id='" + id + "_0' class=\"SummarySection\" ></div>";
            if (oGroup.ForceSection == 1) {
                sHTML += "<DIV id='" + id + "_1' class=\"SummarySection SummaryLeftSelected\"></div>";
                sHTML += "<DIV id='" + id + "_2' class=\"SummarySection\"></div>";
                AddToSection(1, id);
            }
            else {
                sHTML += "<DIV id='" + id + "_1' class=\"SummarySection\"></div>";
                sHTML += "<DIV id='" + id + "_2' class=\"SummarySection SummaryRightSelected\"></div>";
                AddToSection(2, id);
            }
            sHTML += "<DIV class='SummaryPrice'>" + sPrice + "</div>";
            if (!bUnique) {
                sHTML += "<DIV class='" + addDeleteButtonClass + "' " + onClickHandler + "></div>";
            }
        }
        else if (bUnique) {
            //Since we don't support calculating pizza modifier pricing, do not display price
            sPrice = "";

            sHTML += "<DIV class='SummarySection SummaryWholeSelected'></div>";
            sHTML += "<DIV class='SummaryNoHalves'></div>";
            sHTML += "<DIV class='SummaryPrice'>" + sPrice + "</div>";
        }
        else {
            //Since we don't support calculating pizza modifier pricing, do not display price
            sPrice = "";

            //Only certain groups can be on sections, for now only support halves
            //SectionFlags
            //IsHalfSectionAllowed = 1,
            //IsThirdSectionAllowed = 2,
            //IsFourthSectionAllowed = 4,
            if (oGroup.SectionFlags == 1) {
                sHTML += "<DIV id='" + id + "_0' class=\"SummarySection SummaryWholeSelected\" onclick=\"onSectionClick(this, 'Whole', 0, '" + id + "');\"></div>";
                sHTML += "<DIV id='" + id + "_1' class=\"SummarySection SummaryLeft\" onclick=\"onSectionClick(this, 'Left', 1, '" + id + "');\"></div>";
                sHTML += "<DIV id='" + id + "_2' class=\"SummarySection SummaryRight\" onclick=\"onSectionClick(this, 'Right', 2, '" + id + "');\"></div>";
                sHTML += "<DIV class='SummaryPrice'>" + sPrice + "</div>";
                sHTML += "<DIV class='" + addDeleteButtonClass + "' " + onClickHandler + "></div>";
            }
            else {
                sHTML += "<DIV id='" + id + "_0' class='SummarySection' ></div>";
                sHTML += "<DIV class='SummaryNoHalves'></div>";
                sHTML += "<DIV class='SummaryPrice'>" + sPrice + "</div>";
                sHTML += "<DIV class='" + addDeleteButtonClass + "' " + onClickHandler + "></div>";
            }
        }

        // Find position on receipt
        for (var i = 0; !before && i < receipt.childNodes.length; i++) {
            var child = receipt.childNodes[i];
            if (child && child.getAttribute && child.getAttribute("order") * 1.0 > order) {
                before = child;
            }
        }

        // Append new row
        var el = document.createElement("DIV");
        el.setAttribute("id", id);
        el.setAttribute("order", order);
        el.setAttribute("class", "SummaryItem");
        el.setAttribute("className", "SummaryItem");
        el.innerHTML = sHTML;
        receipt.insertBefore(el, before);
    }

    // Process extras if not done already
    if (bIsRecipe && !bExtra) {
        UpdateSummary(oInput, nodeId, tab, SelectedQty, bUnique, true);
    }
}

function IsOnSection(bExtra, OptionGroupNodeId, OptionNodeId, num) {
    //It doesn't look like options that have a radio button can be put on to sections
    //Since only Pizza toppings which are a special group can support halves, it doesn't
    //seem like the radio button case needs to be handled

    //The format of this is below and it is formatted in code
    //new var id = "_SUMMOD_" + (bExtra ? 1 : 0) + "_" + (bUnique ? oGroup.NodeId : nodeId);

    var prefix = (bExtra) ? "_SUMMOD_1_" : "_SUMMOD_0_";

    var modId = prefix + OptionNodeId;
    var mod = $get(modId);
    if (mod == null) {
        modId = prefix + OptionGroupNodeId;
        mod = $get(modId);
    }

    if (mod == null) {
        return false;
    }

    var id = "Section" + num;
    var obj = $get(id);
    if (obj) {
        var a = obj.value.split(',');
        for (var i = 0; i < a.length; i++) {
            if (a[i] == modId) {
                return true;
            }
        }
    }

    return false;
}

function AddToSection(num, modId) {
    var id = "Section" + num;
    var obj = $get(id);
    if (obj) {
        obj.value += ((obj.value != "" && obj.value != null) ? "," : "") + modId;
    }
}

function RemoveFromSection(num, modId) {
    var sResult = "";
    var id = "Section" + num;
    var obj = $get(id);
    var foundValue = false;
    if (obj) {
        var a = obj.value.split(',');
        for (i = 0; i < a.length; i++) {
            if (a[i] != modId) {
                sResult += ((sResult != "") ? "," : "") + a[i];
            }
            else {
                foundValue = true;
            }
        }

        obj.value = sResult;
    }

    return foundValue;
}

// Change pizza section
function onSectionClick(obj, section, num, modId) {
    sClass = GetClass(obj);

    // Check if not currently selected
    if (sClass.indexOf("Selected") < 0) {
        if (GetChildByClass(obj.parentNode, "SummaryAdd")) {
            var ids = modId.split('_');
            SelectMod(ids[3], true, false);
        }

        // Update section mod ids
        UpdateSection(num, modId);
    }
}

function UpdateSection(sectionNum, modId) {
    // Update styles
    SetClass($get(modId + "_0"), "SummarySection SummaryWhole" + ((sectionNum == 0) ? "Selected" : ""));
    SetClass($get(modId + "_1"), "SummarySection SummaryLeft" + ((sectionNum == 1) ? "Selected" : ""));
    SetClass($get(modId + "_2"), "SummarySection SummaryRight" + ((sectionNum == 2) ? "Selected" : ""));

    AddToSection(sectionNum, modId);
    if (sectionNum != 1) RemoveFromSection(1, modId);
    if (sectionNum != 2) RemoveFromSection(2, modId);
}

function RepaintSection(OptionGroupNodeId, OptionNodeId) {
    var sectionNum = 0;
    //With sections
    if (IsOnSection(0, OptionGroupNodeId, OptionNodeId, 1)) {
        sectionNum = 1;
    }
    else if (IsOnSection(0, OptionGroupNodeId, OptionNodeId, 2)) {
        sectionNum = 2;
    }

    if (sectionNum > 0) {
        var modId = "_SUMMOD_0_" + OptionNodeId;
        SetClass($get(modId + "_0"), "SummarySection SummaryWhole" + ((sectionNum == 0) ? "Selected" : ""));
        SetClass($get(modId + "_1"), "SummarySection SummaryLeft" + ((sectionNum == 1) ? "Selected" : ""));
        SetClass($get(modId + "_2"), "SummarySection SummaryRight" + ((sectionNum == 2) ? "Selected" : ""));
    }

    //Extra sections
    sectionNum = 0;
    if (IsOnSection(1, OptionGroupNodeId, OptionNodeId, 1)) {
        sectionNum = 1;
    }
    else if (IsOnSection(1, OptionGroupNodeId, OptionNodeId, 2)) {
        sectionNum = 2;
    }

    if (sectionNum > 0) {
        var modId = "_SUMMOD_1_" + OptionNodeId;
        SetClass($get(modId + "_0"), "SummarySection SummaryWhole" + ((sectionNum == 0) ? "Selected" : ""));
        SetClass($get(modId + "_1"), "SummarySection SummaryLeft" + ((sectionNum == 1) ? "Selected" : ""));
        SetClass($get(modId + "_2"), "SummarySection SummaryRight" + ((sectionNum == 2) ? "Selected" : ""));
    }
}

function GetCurrentTab() {
    try {
        return parseInt(PubCurrentTab);
    }
    catch (e) {
        return 0;
    }
}

function MouseOverTab(nTab) {
    var nOldTab = GetCurrentTab();
    var oNewTab = $get("mod_tab_" + nTab);
    if (nTab != nOldTab && oNewTab != null) {
        SetClass(oNewTab, "TabHover");
    }
}

function MouseOutTab(nTab) {
    var nOldTab = GetCurrentTab();
    var oNewTab = $get("mod_tab_" + nTab);
    if (nTab != nOldTab && oNewTab != null) {
        SetClass(oNewTab, "TabUnselected");
    }
}

function ShowTab(nTabId) {
    HideAllTabs();
    ShowATab(nTabId);
    SetTabNavButtonVisibility();
}

function ShowATab(nTabId) {
    var oTab = $get("mod_tab_" + nTabId);
    var oPanel = $get("mod_panel_" + ((nTabId == 0) ? "size_" : PubItemId + "_") + nTabId);
    if (oPanel == null) {
        oPanel = $get("mod_panel_" + PubItemId + "_" + nTabId);
    }

    if (oPanel == null) {
        oPanel = $get("mod_panel_instr_" + nTabId);
    }

    if (oPanel && oTab) {
        oPanel.style.display = "";
        SetClass(oTab, "TabSelected");
        PubCurrentTab = nTabId;

        // Init scrollbar
        var suffix = "_" + PubItemId + "_" + nTabId;

        if (CreatedTabScroll[suffix] == null) {
            ScrollBar.Create($get("TabPanelScrollButton" + suffix), $get("TabPanelScrollDiv" + suffix));
            CreatedTabScroll[suffix] = 1;
        }
    }
    else {
        alert("Missing tab");
    }
}

function HideAllTabs() {
    var maxTab = $('#MaxTab').val();
    for (i = 0; i < maxTab; i++) {
        HideTab(i);
    }
}

function HideTab(tabId) {
    var oTab = $get("mod_tab_" + tabId);
    var oPanel = $get("mod_panel_" + ((tabId == 0) ? "size_" : PubItemId + "_") + tabId);
    if (oPanel == null) {
        oPanel = $get("mod_panel_" + PubItemId + "_" + tabId);
    }
    if (oPanel == null) {
        oPanel = $get("mod_panel_instr_" + tabId);
    }
    if (oTab && oPanel) {
        oPanel.style.display = "none";
        SetClass(oTab, "TabUnselected");
    }
}

function SetTabNavButtonVisibility() {
    var next = $get("TabNext");
    var previous = $get("TabPrevious");
    if (next != null) {
        $get("TabNext").style.display = (1.0 * PubCurrentTab + 1 >= $get("MaxTab").value) ? "none" : "";
    }
    if (previous != null) {
        $get("TabPrevious").style.display = (1.0 * PubCurrentTab == 0) ? "none" : "";
    }
}

function NextTab() {
    var nTab = GetCurrentTab();
    ShowTab(nTab + 1);
}

function PrevTab() {
    var nTab = GetCurrentTab();
    ShowTab(nTab - 1);
}

function ChangeItem(obj, nodeId, disableSelect) {
    var i;
    var oNode = GetNode(nodeId);
    PubSelectedOptionGroupNodeId = nodeId;
    PubItemId = oNode.ItemId;

    var oInitQtySelectionInput = $get("InitialQtySelection");
    if (oInitQtySelectionInput != null) {
        if (oInitQtySelectionInput.value != "0") {
            return;
        }
    }

    var oSizeModifier = GetParentByClass(obj, "SizeModifier");
    if (oSizeModifier != null) {
        SetClass(oSizeModifier, "SizeModifierSelected");
    }

    var oHeader = GetNode(oNode.ParentNodeId);
    var divName = 'header_mods_' + GetParentHeaderItemId(oNode);

    // Hide groups from old item, show from current (if on same tab)
    var oDivs = $("[name='" + divName + "']");
    var wsgid = 0;
    //IE doesn't support getElementsByName on divs, only inputs
    if (oDivs.length == 0) {

        var divTabContent = $get("tab_content");

        if (divTabContent != null) {
            oDivs = GetImmediateChildrenByName(divTabContent, divName);
        }
    }

    if (isMultyTab(oHeader, oDivs)) {
        for (i = 0; i < oDivs.length; i++) {
            oDiv = oDivs[i];
            var divId = oDiv.getAttribute("id");
            oDiv.style.display = (divId.indexOf("mod_panel_" + PubItemId + "_" + PubCurrentTab) >= 0) ? "" : "none";
        }
    }

    //One tab per item
    else if (oDivs.length > 0) {
        for (i = 0; i < oDivs.length; i++) {
            oDiv = oDivs[i];
            var divId = oDiv.getAttribute("id");
            wsgid = $(obj).data('wsgid');
            if ((wsgid !== undefined)) {
                var parentwsgid = $(oDiv).parent().data('wsgid');
                if (parentwsgid == wsgid) {
                    oDiv.style.display = (divId.indexOf("mod_panel_" + PubItemId) >= 0) ? "" : "none";
                }
            }
            else {
                oDiv.style.display = (divId.indexOf("mod_panel_" + PubItemId) >= 0) ? "" : "none";
            }
        }
    }

    // clear modifiers for old item
    for (i = 0; i < PubHierarchy.Children.length; i++) {
        var oItem = PubHierarchy.Children[i];

        if (oItem.ItemId != PubItemId) {
            var oInput = $get("_Node_" + oItem.NodeId);
            //SetChecked(oInput, false);

            oOldSizeModifier = GetParentByClass(oInput, "SizeModifierSelected");
            if (oOldSizeModifier != null) {
                SetClass(oOldSizeModifier, "SizeModifier");
            }
        }
    }

    // Update pseudo receipt
    var oTitle = $get("SummaryTitleSize");
    if (oTitle != null) {
        oTitle.innerHTML = obj.title;
    }
    var oPrice = $get("SummaryBasePrice");
    if (oPrice != null) {
        oPrice.innerHTML = CurrencyFormattedSuppressZero(oNode.Price);
    }

    // Clear modifier summary
    for (var j = 0; j < 2; j++) {
        var sName = (j) ? "ModifierSummaryItems" : "ModifierSummaryDefaults";
        var receipt = document.getElementById(sName);
        if (receipt != null) {
            for (var i = receipt.childNodes.length - 1; i >= 0; i--) {
                var oChild = receipt.childNodes[i];
                if (GetClass(oChild) != "ModifierSummarySection") {
                    receipt.removeChild(oChild);
                }
            }
        }
    }

    UpdatePortionLabel(oNode);

    //if we were already called from select defaults do not repaint options
    //since we will just paint over them  
    if (!disableSelect) {
        RepaintItemSelections();
    }

    updatePopupForWebSalesGroup(wsgid);
    updateScrollBars(nodeId);
}

function isMultyTab(oHeader, oDivs) {
    var specialTabCount = 0;
    if ($get("_ModGroupDiv_SpecialInstructions") !== null)
        specialTabCount++;

    return (oHeader.ItemCount < oDivs.length + specialTabCount);
}

function updatePopupForWebSalesGroup(wsgid) {
    if ((wsgid !== undefined)) {
        var firstTime = false;
        $('.WebSalesGroupDiv').each(function () {//hide all the web salesgroup modifiers on initial popup loaded
            if ($(this).data('wsg_clicked') === undefined) {
                $(this).attr('data-wsg_clicked', 'false');
                firstTime = true;
                $(this).hide();
            }
        });
        $('.ButtonModifierPlus').each(function () {//attach input modifier click events to the div
            var plus = $(this);
            // original click handler
            plus.unbind('click');
            plus.unbind('keypress');
            plus.attr("onkeypress", "return false;");
            plus.attr("onclick", "return false;");
            // new click handler
            plus.click(function () {
                $($(this).parent().find('input').get(0)).click();
            });
            plus.keypress(function () {
                $($(this).parent().find('input').get(0)).click();
            });
        });
    }
}

function expandDiv(div) {
    $(div).html("+");
    $(div).show();
    contract(div);
}

function contract(div) {
    if ($(div).text() == "+") {
        $(div).html("-");
        $(div).removeClass('ExpandDiv');
        $(div).addClass('ContractDiv');
        var input = $(div).parent().find('.ModifierGroupDiv input:checked');//find selected salesitem and display the modifiers
        if (input.length > 0) {
            ChangeItem(input, input.val(), false);
        }
        $('#wsgid' + $(div).data('wsgid')).find('.TabPanel ').each(function () {
            if ($(this).css('display') != 'none') {
                if ($(this).find('.ModifierGroupContent').length > 0) {//if there are modifier divs, display it and update scroll bars
                    $('#wsgid' + $(div).data('wsgid')).slideDown(function () { ScrollBar.Update($get('ModifierScrollButton'), $get('TabScrollDiv')); });
                    return false;
                }
                else {//if there are no modifiers, hide modifier div and update scroll bars
                    $(div).hide();
                    $('#wsgid' + $(div).data('wsgid')).slideUp(function () { ScrollBar.Update($get('ModifierScrollButton'), $get('TabScrollDiv')); });
                    return false;
                }
            }
        });
    }
    else {
        $(div).html("+");
        $(div).removeClass('ContractDiv');
        $(div).addClass('ExpandDiv');
        $('#wsgid' + $(div).data('wsgid')).slideUp(function () { ScrollBar.Update($get('ModifierScrollButton'), $get('TabScrollDiv')); });
    }
}

function SelectSizeModifier(nodeId) {
    var oInput = $get("_Node_" + nodeId);
    if (oInput == null) {
        return;
    }

    SetChecked(oInput, true);

    var oSizeModifier = GetParentByClass(oInput, "SizeModifier");
    if (oSizeModifier != null) {
        SetClass(oSizeModifier, "SizeModifierSelected");
    }
}

function TouchupPopupDimensions() {
    if (PubBrowserTouchupDimensions == 'true') {
        var options = $get("TabDiv");

        TouchupChildWidths(options, GetStyle(options), parseInt(GetStyle(options).width));
    }
}

function GetBufferWidths(obj, objStyle, parentStyle, adjustIE6Bug) {
    var childBuffer = 0;
    var left = 0;
    var right = 0;

    //On Firefox style accesses seem to be expensive so get the combo style and manually parse

    var margins = objStyle.margin.split(" ");
    if (margins.length == 1) {
        left = right = parseInt(margins[0]);
    }
    else if (margins.length == 2) {
        left = right = parseInt(margins[1]);
    }
    else if (margins.length == 4) {
        left = parseInt(margins[3]);
        right = parseInt(margins[1]);
    }

    if (left > 0) {
        childBuffer += left;
        //http://www.positioniseverything.net/explorer/doubled-margin.html
        if (isIE6 && (objStyle.styleFloat == "left") && (parentStyle.styleFloat == "left")) {
            if (adjustIE6Bug) {
                obj.style.marginLeft = (left / 2) + "px";
            }
            else {
                childBuffer += left;
            }
        }
    }
    if (right > 0) {
        childBuffer += right;
        //http://www.positioniseverything.net/explorer/doubled-margin.html
        if (isIE6 && (objStyle.styleFloat == "right") && (parentStyle.styleFloat == "right")) {
            if (adjustIE6Bug) {
                obj.style.marginRight = (right / 2) + "px";
            }
            else {
                childBuffer += right;
            }
        }
    }

    left = right = 0;
    var paddings = objStyle.padding.split(" ");
    if (paddings.length == 1) {
        left = right = parseInt(paddings[0]);
    }
    else if (paddings.length == 2) {
        left = right = parseInt(paddings[1]);
    }
    else if (paddings.length == 4) {
        left = parseInt(paddings[3]);
        right = parseInt(paddings[1]);
    }

    if (left > 0) {
        childBuffer += left;
    }
    if (right > 0) {
        childBuffer += right;
    }

    left = parseInt(objStyle.borderLeftWidth);
    right = parseInt(objStyle.borderLeftRight);

    if (left > 0) {
        childBuffer += left;
    }
    if (right > 0) {
        childBuffer += right;
    }

    return childBuffer;
}

var classesWithBufferWidths = new Object;

function TouchupChildWidths(obj, objStyle, width) {
    var parentStyle = objStyle;
    var lastClass = null;
    var lastBufferWidth = 0;
    var lastWidth = 0;
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            var child = obj.childNodes[i];

            if (child.nodeName == "DIV") {
                var childStyle = GetStyle(child);
                var childClass = GetClass(child);
                var childWidth = -1;
                var childBuffer = 0;

                if (childClass != "") {
                    if (childClass == lastClass) {
                        childWidth = lastWidth;
                        childBuffer = lastBufferWidth;
                    }
                    else if (classesWithBufferWidths[childClass] != null) {
                        if (childStyle.width.indexOf("px") >= 0) {
                            childWidth = parseInt(childStyle.width);
                        }

                        childBuffer = classesWithBufferWidths[childClass];
                    }
                    else {
                        if (childStyle.width.indexOf("px") >= 0) {
                            childWidth = parseInt(childStyle.width);
                        }

                        childBuffer = GetBufferWidths(child, childStyle, parentStyle, true);
                        classesWithBufferWidths[childClass] = childBuffer;
                    }
                }
                else {
                    if (childStyle.width.indexOf("px") >= 0) {
                        childWidth = parseInt(childStyle.width);
                    }

                    childBuffer = GetBufferWidths(child, childStyle, parentStyle, true);
                }

                var maxWidth = width;
                var setWidth = false;

                if (width > 0) {
                    if ((childWidth + childBuffer) > width) {
                        setWidth = true;
                    }
                }
                else {
                    maxWidth = childWidth;
                }

                TouchupChildWidths(child, childStyle, maxWidth - childBuffer);

                var newMax = (maxWidth - childBuffer);
                child.style.maxWidth = newMax + "px";
                if (setWidth) {
                    child.style.width = newMax + "px";
                }

                if (isIE6) {
                    try {
                        //IE expression to work around lack of maxWidth
                        child.style.setExpression("width", "(this.runtimeStyle.width > " + (newMax + 1) + ") ? '" + newMax + "px' : 'this.runtimeStyle.width' ");
                    }
                    catch (e) {

                    }
                }

                if (childClass != null) {
                    lastClass = childClass;
                }
            }
        }
    }
}

function SelectDefaults() {
    //Reset the selected option group node id since it may still be set from a previous popup display
    PubSelectedOptionGroupNodeId = null;

    //Check to see if the menu item has multiple sales items and select the default
    if (PubHierarchy.Children.length > 1) {
        for (var i = 0; i < PubHierarchy.Children.length; i++) {
            var oItem = PubHierarchy.Children[i];

            if (PubLineItemNumber > 0) {
                if (oItem.ItemId == PubItemId) {
                    var oSizeInput = $get("_Node_" + oItem.NodeId);
                    ChangeItem(oSizeInput, oItem.NodeId, true);
                    break;
                }
            }
            else if (oItem.IsDefault) {
                var oSizeInput = $get("_Node_" + oItem.NodeId);
                ChangeItem(oSizeInput, oItem.NodeId, true);
                break;
            }
        }
    }
    else {
        var oNode = GetNode(PubHierarchy.Children[0].NodeId);
        if (oNode != null) {
            PubSelectedOptionGroupNodeId = oNode.NodeId;
        }
        UpdatePortionLabel(oNode);
    }

    for (var i = 0; i < PubHierarchySelections.length; i++) {
        var oSelection = PubHierarchySelections[i];
        var oNode = GetNode(oSelection.NodeId);
        if (oNode == null) {
            continue;
        }

        //Auto select options, i.e. min max = 1 will not have inputs
        var oInput = modifierItemInputsByNodeId[oNode.NodeId];
        if (oInput == null) {
            continue;
        }

        var wsgid = $("#_Node_" + oNode.NodeId).data('wsgid');
        // Even zero quantity options need to be initialized when dealing with recipe quantities        
        var bModSummary = ((oNode.NodeType != "Item") && (PubItemOrderingMode == ORDER_MODE_PIZZA || PubItemOrderingMode == ORDER_MODE_BYO));
        var oOptionGroup = null;
        //We are only looking at selections so always process
        if (oNode.NodeType == "Option") {
            oOptionGroup = GetNode(oNode.ParentNodeId);
            if (PubSelectedOptionGroupNodeId == null) {
                PubSelectedOptionGroupNodeId = oOptionGroup.ParentNodeId;
            }
        }
        else if (oNode.NodeType == "Item") {
            if (wsgid === undefined || wsgid == null || wsgid.length == 0)//if we are not using web sales group
                SelectSizeModifier(oNode.NodeId);
            continue;
        }

        if (wsgid === undefined || wsgid == null || wsgid.length == 0) {//if we are not using websalesgroup proceed with selecting defaults

            //Do not check if the group is active because we still want default modifiers selected 
            //on other smart modifier options that may not be selected.
            //IsGroupActive(oInputList[i], ParentId)
            var oDiv = GetModifierItemDiv(oNode.NodeId);
            var oNestedModifiers = GetNestedModifiersForInput(oInput);

            //Ordered quantities are added after recipe quantities so we can adjust 
            //quantities on the client
            var recipeSelection = GetRecipeSelection(oSelection.NodeId);
            var quantity = oSelection.Quantity;
            var updateSectionNum = 0;
            var updateSectionIsExtra = false;

            if (oSelection.Reason == SELECTION_REASON_ORDERED) {
                if (oSelection.ModifierAction == modifierAction.No) {
                    if (recipeSelection != null) {
                        //Flip the section
                        if (!oSelection.IsOnEntireItem) {
                            updateSectionNum = (oSelection.IsOnSection1) ? 2 : 1;
                        }
                        else {
                            quantity -= oSelection.Quantity;
                        }
                    }
                }
                else {
                    if (recipeSelection != null) {
                        quantity += recipeSelection.Quantity;
                    }

                    if (!oSelection.IsOnEntireItem) {
                        updateSectionNum = (oSelection.IsOnSection1) ? 1 : 2;
                    }
                    updateSectionIsExtra = true;
                }
            }

            // Select Element Before Click
            SetSelectedQty(oInput, quantity);
            onModItemClick(oNode.NodeId, 0);
            $(oInput).change();
            onModItem(oNode.NodeId, oDiv, oInput, oNestedModifiers, quantity, updateSectionIsExtra);

            var select = $get("_NodeSelect_" + oNode.NodeId);
            if (select != null) {
                select.value = quantity;
            }

            if (updateSectionNum != 0) {
                //If sections are forced, do not update sections because that will make the other sections 
                //become visible
                if ((oOptionGroup != null) && (oOptionGroup.ForceSection == 0)) {
                    if ((oInput != null) && (oInput.type == "radio")) {
                        UpdateSection(updateSectionNum, "_SUMMOD_" + (updateSectionIsExtra ? 1 : 0) + "_" + oNode.ParentNodeId);
                    }
                    else {
                        UpdateSection(updateSectionNum, "_SUMMOD_" + (updateSectionIsExtra ? 1 : 0) + "_" + oNode.NodeId);
                    }
                }
            }
        }
    }
}

function RepaintItemSelections() {

    var oInputList = modifierItemInputsByNodeId;
    for (var i = 0; i <= maxNodeId; i++) {
        if (oInputList[i] != null) {
            var ids = oInputList[i].id.split('_');
            var SelectedQty = GetSelectedQty(oInputList[i]);
            var oNode = GetNode(ids[2]);

            if (oNode == null) {
                continue;
            }

            if (oNode.NodeType == "OptionGroup") {
                continue;
            }

            // Even zero quantity options need to be initialized when dealing with recipe quantities        
            var bModSummary = ((oNode.NodeType != "Item") && (PubItemOrderingMode == ORDER_MODE_PIZZA || PubItemOrderingMode == ORDER_MODE_BYO));

            if (SelectedQty || bModSummary) {
                if ((oNode.NodeType == "Option") && (PubSelectedOptionGroupNodeId == null)) {
                    var oOptionGroup = GetNode(oNode.ParentNodeId);
                    PubSelectedOptionGroupNodeId = oOptionGroup.ParentNodeId;
                }

                //Do not check if the group is active because we still want default modifiers selected 
                //on other smart modifier options that may not be selected.
                //IsGroupActive(oInputList[i], ParentId)
                var oDiv = GetModifierItemDiv(oNode.NodeId);
                var oNestedModifiers = GetNestedModifiersForInput(oInputList[i]);
                onModItem(ids[2], oDiv, oInputList[i], oNestedModifiers, SelectedQty);

                RepaintSection(oNode.ParentNodeId, oNode.NodeId);
            }
        }
    }
}

function AdjustModifierItemColumns() {
    if (PubBrowserTouchupDimensions != 'true') {
        return;
    }
    for (var i = 0; i < PubHierarchyNodes.length; i++) {
        var oNode = PubHierarchyNodes[i];
        if ((oNode != null) &&
            (oNode.NodeType == "OptionGroup")) {
            if (oNode.Columns > 0) {
                var parentStyle = null;
                for (var childIndex = 0; childIndex < oNode.Children.length; childIndex++) {
                    var child = oNode.Children[childIndex];
                    var oModifierItemDiv = GetModifierItemDiv(child.NodeId);
                    if (parentStyle == null) {
                        parentStyle = GetStyle(oModifierItemDiv.parentNode);
                    }
                    var oModifierItemStyle = GetStyle(oModifierItemDiv);
                    var bufferWidth = GetBufferWidths(oModifierItemDiv, oModifierItemStyle,
                        parentStyle, false);

                    var newMax = (parseInt(oModifierItemStyle.maxWidth) / oNode.Columns) - 1;
                    //If TouchupPopupDimensions isn't run because there is too much data
                    //and there aren't indented nested modifier groups that require it,
                    //maxWidth may not be set
                    if (isNaN(newMax) || (newMax == -1)) {
                        newMax = (parseInt(parentStyle.width) / oNode.Columns) - 1;
                    }
                    if (isNaN(newMax) || (newMax == -1)) {
                        newMax = (oModifierItemDiv.parentNode.offsetWidth / oNode.Columns) - 1;
                    }
                    if (newMax < 2) {
                        continue;
                    }
                    newMax -= bufferWidth;
                    oModifierItemDiv.style.maxWidth = newMax + "px";
                    if (parseInt(oModifierItemDiv.style.width) > newMax) {
                        oModifierItemDiv.style.width = newMax = "px";
                    }
                    if (isIE6) {
                        try {
                            //IE expression to work around lack of maxWidth
                            oModifierItemDiv.style.setExpression("width", "(this.runtimeStyle.width > " + (newMax + 1) + ") ? '" + newMax + "px' : 'this.runtimeStyle.width' ");
                        }
                        catch (e) {

                        }
                    }
                }
            }
        }
    }
}

function UpdatePortionLabel(oNode) {
    var oPortionAsstLbl = $get("PortionAssistantLabel");
    var quantity = $get("_ItemAddQty");
    if (oPortionAsstLbl != null) {
        var oHeader = GetNode(oNode.ParentNodeId);

        if (oHeader != null && oNode.PortionCount > 0) {
            var orderPortStr = FormatResourceString(GetResourceObject("WebOrder.OrderEntry.OrderPortionStatusLabel"),
                oHeader.OrderCurrentPortionCount + (oNode.PortionCount * quantity.value), oHeader.OrderTargetPortionCount);

            var itemPortStr = FormatResourceString(GetResourceObject("WebOrder.OrderEntry.ItemPortionLabel"),
                oNode.PortionCount);

            oPortionAsstLbl.innerHTML = orderPortStr + "<BR/>" + itemPortStr;
        }
        else {
            oPortionAsstLbl.innerHTML = "";
        }
    }
}

//needed for Chrome drop down behavior
function FireModDropDownSelection(nodeId) {

    var modSelection = document.getElementById("_ModSelection_" + nodeId);

    if (modSelection != null) {
        onModItemActualClick(modSelection.value, 1);
    }
}

function QtyContinue() {

    //copy the initial quantity value to the final quantity input field and disable it
    var aQty = $get("_ItemAddQty_initial");

    if (aQty != null) {

        if (!CheckValidQty(aQty.value))
            return;
    }

    var bQty = $get("_ItemAddQty");

    if (bQty != null) {
        bQty.value = aQty.value;
        bQty.disabled = true;
    }

    //disable the size selection inputs
    var sizePanel = $get("PANEL_SIZE");

    if (sizePanel != null) {
        var oSizeInputList = sizePanel.getElementsByTagName('input');

        if (oSizeInputList != null && oSizeInputList.length != null) {
            for (var i = 0; i < oSizeInputList.length; i++) {
                oSizeInputList[i].disabled = true;
            }
        }
    }

    //swap out the initial quantity entry footer for the final one
    var quantityDiv = $get("initial_qty_selection_div");

    if (quantityDiv != null) {
        quantityDiv.style.display = "none";
    }

    var addItemDiv = $get("add_item_info_div");

    if (addItemDiv != null) {
        addItemDiv.style.display = "";
    }

    //unhide any upsell or instructions panels
    var upsellPanel = $get("mod_panel_upsell_" + PubCurrentTab);

    if (upsellPanel != null) {
        upsellPanel.style.display = "";
    }

    var instrPanel = $get("mod_panel_instr_" + PubCurrentTab);

    if (instrPanel != null) {
        instrPanel.style.display = "";
    }

    //hide the initial quantity selection instructions div
    var qtyInstrDiv = $get("initial_qty_selection_instr_div");

    if (qtyInstrDiv != null) {
        qtyInstrDiv.style.display = "none";
    }

    //adjust the numerical rules on the nodes per the quantity
    for (var i = 0; i < PubHierarchyNodes.length; i++) {

        var node = PubHierarchyNodes[i];

        if (node != null && node.NodeType == 'OptionGroup') {
            node.MinItems = node.MinItems * bQty.value;
            node.MaxItems = node.MaxItems * bQty.value;
            node.PerOptionMin = node.PerOptionMin * bQty.value;
            node.PerOptionMax = node.PerOptionMax * bQty.value;
        }
    }

    //clear the hidden input to indicate we are done with the quantity selection
    var oInitQtySelectionInput = $get("InitialQtySelection");

    if (oInitQtySelectionInput != null) {
        oInitQtySelectionInput.value = "0";
    }

    //select the sales item such that the modifier panels will now show themselves
    if (PubHierarchy.Children.length > 1) {
        ChangeItem($get("_Node_" + PubSelectedOptionGroupNodeId), PubSelectedOptionGroupNodeId, true);
    }
    else {
        var modPanel = $get("mod_panel_" + PubItemId + "_" + PubCurrentTab);

        if (modPanel != null) {
            modPanel.style.display = "";
        }
    }

    //swap the TabDiv id back to the standard one
    var tabDiv = $get("TabDiv_SizeQtyOnly");

    if (tabDiv != null) {
        tabDiv.id = "TabDiv";
    }

    //Recenter the modal now that the dimensions have changed        
    var modalPopupBehavior = $find('programmaticModalPopupBehavior');
    modalPopupBehavior.show();

    //Refresh the scrollbar
    ScrollBar.Update($get('ModifierScrollButton'), $get('TabScrollDiv'));
}

function loadImageBypassCache(image) {
    //if we get in here, lets bypass the cachae and grab a new image 
    $(image).unbind('onerror');
    $(image).attr('onerror', 'return false');
    var src = $(image).attr('src') + "&bypasscache=true";
    $(image).attr('src', src);
}


function saveCookie(name, value, days) {
    if (days == null) {
        days = 1;
    }
    $.cookie(name, encodeURI(value), { expires: days });
}

function saveCookieGlobal(name, value, days) {
    saveCookieGlobalEncOpt(name, value, days, false);
}

function saveCookieGlobalEncOpt(name, value, days, encode) {
    if (days == null) {
        days = 1;
    }

    var savedvalue = value;

    if(encode == true){
        savedvalue = encodeURI(value);
    }

    $.cookie(name, savedvalue, { expires: days, path: '/' });
}

function getCookie(name) {
    if ($.cookie(name) != null) {
        return decodeURI($.cookie(name));
    }
    return "";
}

function eraseCookie(name) {
    saveCookie(name, "", -1);
    saveCookieGlobal(name, "", -1);
}

function eraseAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
        eraseCookie(cookies[i].split("=")[0]);
}
/*! Improved jQuery.cookie plugin by @mathias: http://mths.be/cookie */
(function (a, b) { b.cookie = function (g, h, f) { var c = "", e, d; if (typeof h != "undefined") { f || (f = {}); if (!h) { h = ""; f.expires = -1 } if (f.expires && (typeof f.expires == "number" || f.expires.toUTCString)) { e = new Date; if (typeof f.expires == "number") { e.setTime(+new Date() + (f.expires * 86400000)) } else { e = f.expires } c = "; expires=" + e.toUTCString() } a.cookie = [g, "=", encodeURIComponent(h), c, f.path ? "; path=" + f.path : "", f.domain ? "; domain=" + f.domain : "", f.secure ? "; secure" : ""].join("") } else { d = a.cookie.match(new RegExp("(?:^|;)\\s?" + g.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=(.*?)(?:;|$)", "i")); return d && unescape(d[1]) } } } (document, jQuery));
/*
 * jQuery Format Date/Time - v1.1.6 - 2015-03-09
 * https://github.com/agschwender/jquery.formatDateTime
 * Copyright (c) 2015 Adam Gschwender
 * Licensed MIT, GPLv2
 */
; (function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals: jQuery or jQuery-like library, such as Zepto
        factory(window.jQuery || window.$);
    }
}(function ($) {

    var ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4)
                        - Math.floor(1970 / 100)
                        + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);

    var formatDateTime = function (format, date, settings) {
        var output = '';
        var literal = false;
        var iFormat = 0;

        // Check whether a format character is doubled
        var lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length
                           && format.charAt(iFormat + 1) == match);
            if (matches) {
                iFormat++;
            }
            return matches;
        };

        // Format a number, with leading zero if necessary
        var formatNumber = function (match, value, len) {
            var num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        };

        // Format a name, short or long as requested
        var formatName = function (match, value, shortNames, longNames) {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };

        // Get the value for the supplied unit, e.g. year for y
        var getUnitValue = function (unit) {
            var utc = settings.utc;
            switch (unit) {
                case 'y': return utc ? date.getUTCFullYear() : date.getFullYear();
                case 'm': return (utc ? date.getUTCMonth() : date.getMonth()) + 1;
                case 'M': return utc ? date.getUTCMonth() : date.getMonth();
                case 'd': return utc ? date.getUTCDate() : date.getDate();
                case 'D': return utc ? date.getUTCDay() : date.getDay();
                case 'g':
                    return (utc ? date.getUTCHours() : date.getHours()) % 12 || 12;
                case 'h': return utc ? date.getUTCHours() : date.getHours();
                case 'i': return utc ? date.getUTCMinutes() : date.getMinutes();
                case 's': return utc ? date.getUTCSeconds() : date.getSeconds();
                case 'u':
                    return utc ? date.getUTCMilliseconds() : date.getMilliseconds();
                default: return '';
            }
        };

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    output += format.charAt(iFormat);
                }
            } else {
                switch (format.charAt(iFormat)) {
                    case 'a':
                        output += getUnitValue('h') < 12
                            ? settings.ampmNames[0]
                            : settings.ampmNames[1];
                        break;
                    case 'd':
                        output += formatNumber('d', getUnitValue('d'), 2);
                        break;
                    case 'S':
                        var v = getUnitValue(iFormat && format.charAt(iFormat - 1));
                        output += (v && (settings.getSuffix || $.noop)(v)) || '';
                        break;
                    case 'D':
                        output += formatName('D',
                                             getUnitValue('D'),
                                             settings.dayNamesShort,
                                             settings.dayNames);
                        break;
                    case 'o':
                        var end = new Date(date.getFullYear(),
                                           date.getMonth(),
                                           date.getDate()).getTime();
                        var start = new Date(date.getFullYear(), 0, 0).getTime();
                        output += formatNumber(
                            'o', Math.round((end - start) / 86400000), 3);
                        break;
                    case 'g':
                        output += formatNumber('g', getUnitValue('g'), 2);
                        break;
                    case 'h':
                        output += formatNumber('h', getUnitValue('h'), 2);
                        break;
                    case 'u':
                        output += formatNumber('u', getUnitValue('u'), 3);
                        break;
                    case 'i':
                        output += formatNumber('i', getUnitValue('i'), 2);
                        break;
                    case 'm':
                        output += formatNumber('m', getUnitValue('m'), 2);
                        break;
                    case 'M':
                        output += formatName('M',
                                             getUnitValue('M'),
                                             settings.monthNamesShort,
                                             settings.monthNames);
                        break;
                    case 's':
                        output += formatNumber('s', getUnitValue('s'), 2);
                        break;
                    case 'y':
                        output += (lookAhead('y')
                                   ? getUnitValue('y')
                                   : ('' + getUnitValue('y')).substr(2));
                        break;
                    case '@':
                        output += date.getTime();
                        break;
                    case '!':
                        output += date.getTime() * 10000 + ticksTo1970;
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            output += "'";
                        } else {
                            literal = true;
                        }
                        break;
                    default:
                        output += format.charAt(iFormat);
                }
            }
        }
        return output;
    };

    $.fn.formatDateTime = function (format, settings) {
        settings = $.extend({}, $.formatDateTime.defaults, settings);

        this.each(function () {
            var date = $(this).attr(settings.attribute);

            // Use explicit format string first,
            // then fallback to format attribute
            var fmt = format || $(this).attr(settings.formatAttribute);

            if (typeof date === 'undefined' || date === false) {
                date = $(this).text();
            }

            if (date === '') {
                $(this).text('');
            } else {
                $(this).text(formatDateTime(fmt, new Date(date), settings));
            }
        });

        return this;
    };

    /**
       Format a date object into a string value.
       The format can be combinations of the following:
       a - Ante meridiem and post meridiem
       d  - day of month (no leading zero)
       dd - day of month (two digit)
       o  - day of year (no leading zeros)
       oo - day of year (three digit)
       D  - day name short
       DD - day name long
       g  - 12-hour hour format of day (no leading zero)
       gg - 12-hour hour format of day (two digit)
       h  - 24-hour hour format of day (no leading zero)
       hh - 24-hour hour format of day (two digit)
       u  - millisecond of second (no leading zeros)
       uu - millisecond of second (three digit)
       i  - minute of hour (no leading zero)
       ii - minute of hour (two digit)
       m  - month of year (no leading zero)
       mm - month of year (two digit)
       M  - month name short
       MM - month name long
       S  - ordinal suffix for the previous unit
       s  - second of minute (no leading zero)
       ss - second of minute (two digit)
       y  - year (two digit)
       yy - year (four digit)
       @  - Unix timestamp (ms since 01/01/1970)
       !  - Windows ticks (100ns since 01/01/0001)
       '...' - literal text
       '' - single quote
       @param  format    string - the desired format of the date
       @param  date      Date - the date value to format
       @param  settings  Object - attributes include:
           ampmNames        string[2] - am/pm (optional)
           dayNamesShort    string[7] - abbreviated names of the days
                                        from Sunday (optional)
           dayNames         string[7] - names of the days from Sunday (optional)
           monthNamesShort  string[12] - abbreviated names of the months
                                         (optional)
           monthNames       string[12] - names of the months (optional)
           getSuffix        function(num) - accepts a number and returns
                                            its suffix
           attribute        string - Attribute which stores datetime, defaults
                                     to data-datetime, only valid when called
                                     on dom element(s). If not present,
                                     uses text.
           formatAttribute  string - Attribute which stores the format, defaults
                                     to data-dateformat.
           utc              bool - render dates using UTC instead of local time
       @return  string - the date in the above format
    */
    $.formatDateTime = function (format, date, settings) {
        settings = $.extend({}, $.formatDateTime.defaults, settings);
        if (!date) { return ''; }
        return formatDateTime(format, date, settings);
    };

    $.formatDateTime.defaults = {
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November',
                     'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                          'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                   'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ampmNames: ['AM', 'PM'],
        getSuffix: function (num) {
            if (num > 3 && num < 21) {
                return 'th';
            }

            switch (num % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        },
        attribute: 'data-datetime',
        formatAttribute: 'data-dateformat',
        utc: false
    };

}));
/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.11
*/

!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";var a,i,r;"function"==typeof Symbol&&Symbol.iterator;!function(o){i=[n(2)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e){return e})},function(e,t,n){"use strict";var a,i,r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(o){i=[n(0),n(10),n(11)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t,n,a){function i(t,n,o){if(!(this instanceof i))return new i(t,n,o);this.el=a,this.events={},this.maskset=a,this.refreshValue=!1,!0!==o&&(e.isPlainObject(t)?n=t:(n=n||{}).alias=t,this.opts=e.extend(!0,{},this.defaults,n),this.noMasksCache=n&&n.definitions!==a,this.userOptions=n||{},this.isRTL=this.opts.numericInput,r(this.opts.alias,n,this.opts))}function r(t,n,o){var s=i.prototype.aliases[t];return s?(s.alias&&r(s.alias,a,o),e.extend(!0,o,s),e.extend(!0,o,n),!0):(null===o.mask&&(o.mask=t),!1)}function s(t,n){function r(t,r,o){var s=!1;if(null!==t&&""!==t||((s=null!==o.regex)?t=(t=o.regex).replace(/^(\^)(.*)(\$)$/,"$2"):(s=!0,t=".*")),1===t.length&&!1===o.greedy&&0!==o.repeat&&(o.placeholder=""),o.repeat>0||"*"===o.repeat||"+"===o.repeat){var l="*"===o.repeat?0:"+"===o.repeat?1:o.repeat;t=o.groupmarker.start+t+o.groupmarker.end+o.quantifiermarker.start+l+","+o.repeat+o.quantifiermarker.end}var c,u=s?"regex_"+o.regex:o.numericInput?t.split("").reverse().join(""):t;return i.prototype.masksCache[u]===a||!0===n?(c={mask:t,maskToken:i.prototype.analyseMask(t,s,o),validPositions:{},_buffer:a,buffer:a,tests:{},metadata:r,maskLength:a},!0!==n&&(i.prototype.masksCache[u]=c,c=e.extend(!0,{},i.prototype.masksCache[u]))):c=e.extend(!0,{},i.prototype.masksCache[u]),c}if(e.isFunction(t.mask)&&(t.mask=t.mask(t)),e.isArray(t.mask)){if(t.mask.length>1){t.keepStatic=null===t.keepStatic||t.keepStatic;var o=t.groupmarker.start;return e.each(t.numericInput?t.mask.reverse():t.mask,function(n,i){o.length>1&&(o+=t.groupmarker.end+t.alternatormarker+t.groupmarker.start),i.mask===a||e.isFunction(i.mask)?o+=i:o+=i.mask}),o+=t.groupmarker.end,r(o,t.mask,t)}t.mask=t.mask.pop()}return t.mask&&t.mask.mask!==a&&!e.isFunction(t.mask.mask)?r(t.mask.mask,t.mask,t):r(t.mask,t.mask,t)}function l(r,s,c){function m(e,t,n){t=t||0;var i,r,o,s=[],l=0,u=v();do{!0===e&&h().validPositions[l]?(r=(o=h().validPositions[l]).match,i=o.locator.slice(),s.push(!0===n?o.input:!1===n?r.nativeDef:I(l,r))):(r=(o=b(l,i,l-1)).match,i=o.locator.slice(),(!1===c.jitMasking||l<u||"number"==typeof c.jitMasking&&isFinite(c.jitMasking)&&c.jitMasking>l)&&s.push(!1===n?r.nativeDef:I(l,r))),l++}while((Q===a||l<Q)&&(null!==r.fn||""!==r.def)||t>l);return""===s[s.length-1]&&s.pop(),h().maskLength=l+1,s}function h(){return s}function g(e){var t=h();t.buffer=a,!0!==e&&(t.validPositions={},t.p=0)}function v(e,t,n){var i=-1,r=-1,o=n||h().validPositions;e===a&&(e=-1);for(var s in o){var l=parseInt(s);o[l]&&(t||!0!==o[l].generatedInput)&&(l<=e&&(i=l),l>=e&&(r=l))}return-1!==i&&e-i>1||r<e?i:r}function y(t,n,i,r){var o,s=t,l=e.extend(!0,{},h().validPositions),u=!1;for(h().p=t,o=n-1;o>=s;o--)h().validPositions[o]!==a&&(!0!==i&&(!h().validPositions[o].match.optionality&&function(e){var t=h().validPositions[e];if(t!==a&&null===t.match.fn){var n=h().validPositions[e-1],i=h().validPositions[e+1];return n!==a&&i!==a}return!1}(o)||!1===c.canClearPosition(h(),o,v(),r,c))||delete h().validPositions[o]);for(g(!0),o=s+1;o<=v();){for(;h().validPositions[s]!==a;)s++;if(o<s&&(o=s+1),h().validPositions[o]===a&&M(o))o++;else{var p=b(o);!1===u&&l[s]&&l[s].match.def===p.match.def?(h().validPositions[s]=e.extend(!0,{},l[s]),h().validPositions[s].input=p.input,delete h().validPositions[o],o++):P(s,p.match.def)?!1!==R(s,p.input||I(o),!0)&&(delete h().validPositions[o],o++,u=!0):M(o)||(o++,s--),s++}}g(!0)}function k(e,t){for(var n,i=e,r=v(),o=h().validPositions[r]||S(0)[0],s=o.alternation!==a?o.locator[o.alternation].toString().split(","):[],l=0;l<i.length&&(!((n=i[l]).match&&(c.greedy&&!0!==n.match.optionalQuantifier||(!1===n.match.optionality||!1===n.match.newBlockMarker)&&!0!==n.match.optionalQuantifier)&&(o.alternation===a||o.alternation!==n.alternation||n.locator[o.alternation]!==a&&O(n.locator[o.alternation].toString().split(","),s)))||!0===t&&(null!==n.match.fn||/[0-9a-bA-Z]/.test(n.match.def)));l++);return n}function b(e,t,n){return h().validPositions[e]||k(S(e,t?t.slice():t,n))}function x(e){return h().validPositions[e]?h().validPositions[e]:S(e)[0]}function P(e,t){for(var n=!1,a=S(e),i=0;i<a.length;i++)if(a[i].match&&a[i].match.def===t){n=!0;break}return n}function S(t,n,i){function r(n,i,o,l){function p(o,l,g){function v(t,n){var a=0===e.inArray(t,n.matches);return a||e.each(n.matches,function(e,i){if(!0===i.isQuantifier&&(a=v(t,n.matches[e-1])))return!1}),a}function y(t,n,i){var r,o;if(h().validPositions[t-1]&&i&&h().tests[t])for(var s=h().validPositions[t-1].locator,l=h().tests[t][0].locator,c=0;c<i;c++)if(s[c]!==l[c])return s.slice(i+1);return(h().tests[t]||h().validPositions[t])&&e.each(h().tests[t]||[h().validPositions[t]],function(e,t){var s=i!==a?i:t.alternation,l=t.locator[s]!==a?t.locator[s].toString().indexOf(n):-1;(o===a||l<o)&&-1!==l&&(r=t,o=l)}),r?r.locator.slice((i!==a?i:r.alternation)+1):i!==a?y(t,n):a}if(u>1e4)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+h().mask;if(u===t&&o.matches===a)return f.push({match:o,locator:l.reverse(),cd:m}),!0;if(o.matches!==a){if(o.isGroup&&g!==o){if(o=p(n.matches[e.inArray(o,n.matches)+1],l))return!0}else if(o.isOptional){var k=o;if(o=r(o,i,l,g)){if(s=f[f.length-1].match,!v(s,k))return!0;d=!0,u=t}}else if(o.isAlternator){var b,x=o,P=[],S=f.slice(),w=l.length,A=i.length>0?i.shift():-1;if(-1===A||"string"==typeof A){var E,C=u,O=i.slice(),R=[];if("string"==typeof A)R=A.split(",");else for(E=0;E<x.matches.length;E++)R.push(E);for(var M=0;M<R.length;M++){if(E=parseInt(R[M]),f=[],i=y(u,E,w)||O.slice(),!0!==(o=p(x.matches[E]||n.matches[E],[E].concat(l),g)||o)&&o!==a&&R[R.length-1]<x.matches.length){var _=e.inArray(o,n.matches)+1;n.matches.length>_&&(o=p(n.matches[_],[_].concat(l.slice(1,l.length)),g))&&(R.push(_.toString()),e.each(f,function(e,t){t.alternation=l.length-1}))}b=f.slice(),u=C,f=[];for(var D=0;D<b.length;D++){var j=b[D],N=!1;j.alternation=j.alternation||w;for(var I=0;I<P.length;I++){var F=P[I];if("string"!=typeof A||-1!==e.inArray(j.locator[j.alternation].toString(),R)){if(function(e,t){return e.match.nativeDef===t.match.nativeDef||e.match.def===t.match.nativeDef||e.match.nativeDef===t.match.def}(j,F)){N=!0,j.alternation===F.alternation&&-1===F.locator[F.alternation].toString().indexOf(j.locator[j.alternation])&&(F.locator[F.alternation]=F.locator[F.alternation]+","+j.locator[j.alternation],F.alternation=j.alternation),j.match.nativeDef===F.match.def&&(j.locator[j.alternation]=F.locator[F.alternation],P.splice(P.indexOf(F),1,j));break}if(j.match.def===F.match.def){N=!1;break}if(function(e,n){return null===e.match.fn&&null!==n.match.fn&&n.match.fn.test(e.match.def,h(),t,!1,c,!1)}(j,F)||function(e,n){return null!==e.match.fn&&null!==n.match.fn&&n.match.fn.test(e.match.def.replace(/[\[\]]/g,""),h(),t,!1,c,!1)}(j,F)){j.alternation===F.alternation&&-1===j.locator[j.alternation].toString().indexOf(F.locator[F.alternation].toString().split("")[0])&&(j.na=j.na||j.locator[j.alternation].toString(),-1===j.na.indexOf(j.locator[j.alternation].toString().split("")[0])&&(j.na=j.na+","+j.locator[F.alternation].toString().split("")[0]),N=!0,j.locator[j.alternation]=F.locator[F.alternation].toString().split("")[0]+","+j.locator[j.alternation],P.splice(P.indexOf(F),0,j));break}}}N||P.push(j)}}"string"==typeof A&&(P=e.map(P,function(t,n){if(isFinite(n)){var i=t.alternation,r=t.locator[i].toString().split(",");t.locator[i]=a,t.alternation=a;for(var o=0;o<r.length;o++)-1!==e.inArray(r[o],R)&&(t.locator[i]!==a?(t.locator[i]+=",",t.locator[i]+=r[o]):t.locator[i]=parseInt(r[o]),t.alternation=i);if(t.locator[i]!==a)return t}})),f=S.concat(P),u=t,d=f.length>0,o=P.length>0,i=O.slice()}else o=p(x.matches[A]||n.matches[A],[A].concat(l),g);if(o)return!0}else if(o.isQuantifier&&g!==n.matches[e.inArray(o,n.matches)-1])for(var T=o,G=i.length>0?i.shift():0;G<(isNaN(T.quantifier.max)?G+1:T.quantifier.max)&&u<=t;G++){var B=n.matches[e.inArray(T,n.matches)-1];if(o=p(B,[G].concat(l),B)){if(s=f[f.length-1].match,s.optionalQuantifier=G>T.quantifier.min-1,v(s,B)){if(G>T.quantifier.min-1){d=!0,u=t;break}return!0}return!0}}else if(o=r(o,i,l,g))return!0}else u++}for(var g=i.length>0?i.shift():0;g<n.matches.length;g++)if(!0!==n.matches[g].isQuantifier){var v=p(n.matches[g],[g].concat(o),l);if(v&&u===t)return v;if(u>t)break}}function o(e){if(c.keepStatic&&t>0&&e.length>1+(""===e[e.length-1].match.def?1:0)&&!0!==e[0].match.optionality&&!0!==e[0].match.optionalQuantifier&&null===e[0].match.fn&&!/[0-9a-bA-Z]/.test(e[0].match.def)){if(h().validPositions[t-1]===a)return[k(e)];if(h().validPositions[t-1].alternation===e[0].alternation)return[k(e)];if(h().validPositions[t-1])return[k(e)]}return e}var s,l=h().maskToken,u=n?i:0,p=n?n.slice():[0],f=[],d=!1,m=n?n.join(""):"";if(t>-1){if(n===a){for(var g,v=t-1;(g=h().validPositions[v]||h().tests[v])===a&&v>-1;)v--;g!==a&&v>-1&&(p=function(t){var n=[];return e.isArray(t)||(t=[t]),t.length>0&&(t[0].alternation===a?0===(n=k(t.slice()).locator.slice()).length&&(n=t[0].locator.slice()):e.each(t,function(e,t){if(""!==t.def)if(0===n.length)n=t.locator.slice();else for(var a=0;a<n.length;a++)t.locator[a]&&-1===n[a].toString().indexOf(t.locator[a])&&(n[a]+=","+t.locator[a])})),n}(g),m=p.join(""),u=v)}if(h().tests[t]&&h().tests[t][0].cd===m)return o(h().tests[t]);for(var y=p.shift();y<l.length&&!(r(l[y],p,[y])&&u===t||u>t);y++);}return(0===f.length||d)&&f.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:"",placeholder:""},locator:[],cd:m}),n!==a&&h().tests[t]?o(e.extend(!0,[],f)):(h().tests[t]=e.extend(!0,[],f),o(h().tests[t]))}function w(){return h()._buffer===a&&(h()._buffer=m(!1,1),h().buffer===a&&(h().buffer=h()._buffer.slice())),h()._buffer}function A(e){return h().buffer!==a&&!0!==e||(h().buffer=m(!0,v(),!0)),h().buffer}function E(e,t,n){var i,r;if(!0===e)g(),e=0,t=n.length;else for(i=e;i<t;i++)delete h().validPositions[i];for(r=e,i=e;i<t;i++)if(g(!0),n[i]!==c.skipOptionalPartCharacter){var o=R(r,n[i],!0,!0);!1!==o&&(g(!0),r=o.caret!==a?o.caret:o.pos+1)}}function C(t,n,a){switch(c.casing||n.casing){case"upper":t=t.toUpperCase();break;case"lower":t=t.toLowerCase();break;case"title":var r=h().validPositions[a-1];t=0===a||r&&r.input===String.fromCharCode(i.keyCode.SPACE)?t.toUpperCase():t.toLowerCase();break;default:if(e.isFunction(c.casing)){var o=Array.prototype.slice.call(arguments);o.push(h().validPositions),t=c.casing.apply(this,o)}}return t}function O(t,n,i){for(var r,o=c.greedy?n:n.slice(0,1),s=!1,l=i!==a?i.split(","):[],u=0;u<l.length;u++)-1!==(r=t.indexOf(l[u]))&&t.splice(r,1);for(var p=0;p<t.length;p++)if(-1!==e.inArray(t[p],o)){s=!0;break}return s}function R(t,n,r,o,s,l){function u(e){var t=Z?e.begin-e.end>1||e.begin-e.end==1:e.end-e.begin>1||e.end-e.begin==1;return t&&0===e.begin&&e.end===h().maskLength?"full":t}function p(n,i,r){var s=!1;return e.each(S(n),function(l,p){for(var d=p.match,m=i?1:0,k="",b=d.cardinality;b>m;b--)k+=j(n-(b-1));if(i&&(k+=i),A(!0),!1!==(s=null!=d.fn?d.fn.test(k,h(),n,r,c,u(t)):(i===d.def||i===c.skipOptionalPartCharacter)&&""!==d.def&&{c:I(n,d,!0)||d.def,pos:n})){var x=s.c!==a?s.c:i;x=x===c.skipOptionalPartCharacter&&null===d.fn?I(n,d,!0)||d.def:x;var P=n,S=A();if(s.remove!==a&&(e.isArray(s.remove)||(s.remove=[s.remove]),e.each(s.remove.sort(function(e,t){return t-e}),function(e,t){y(t,t+1,!0)})),s.insert!==a&&(e.isArray(s.insert)||(s.insert=[s.insert]),e.each(s.insert.sort(function(e,t){return e-t}),function(e,t){R(t.pos,t.c,!0,o)})),s.refreshFromBuffer){var w=s.refreshFromBuffer;if(E(!0===w?w:w.start,w.end,S),s.pos===a&&s.c===a)return s.pos=v(),!1;if((P=s.pos!==a?s.pos:n)!==n)return s=e.extend(s,R(P,x,!0,o)),!1}else if(!0!==s&&s.pos!==a&&s.pos!==n&&(P=s.pos,E(n,P,A().slice()),P!==n))return s=e.extend(s,R(P,x,!0)),!1;return(!0===s||s.pos!==a||s.c!==a)&&(l>0&&g(!0),f(P,e.extend({},p,{input:C(x,d,P)}),o,u(t))||(s=!1),!1)}}),s}function f(t,n,i,r){if(r||c.insertMode&&h().validPositions[t]!==a&&i===a){var o,s=e.extend(!0,{},h().validPositions),l=v(a,!0);for(o=t;o<=l;o++)delete h().validPositions[o];h().validPositions[t]=e.extend(!0,{},n);var u,p=!0,f=h().validPositions,m=!1,y=h().maskLength;for(o=u=t;o<=l;o++){var k=s[o];if(k!==a)for(var b=u;b<h().maskLength&&(null===k.match.fn&&f[o]&&(!0===f[o].match.optionalQuantifier||!0===f[o].match.optionality)||null!=k.match.fn);){if(b++,!1===m&&s[b]&&s[b].match.def===k.match.def)h().validPositions[b]=e.extend(!0,{},s[b]),h().validPositions[b].input=k.input,d(b),u=b,p=!0;else if(P(b,k.match.def)){var x=R(b,k.input,!0,!0);p=!1!==x,u=x.caret||x.insert?v():b,m=!0}else if(!(p=!0===k.generatedInput)&&b>=h().maskLength-1)break;if(h().maskLength<y&&(h().maskLength=y),p)break}if(!p)break}if(!p)return h().validPositions=e.extend(!0,{},s),g(!0),!1}else h().validPositions[t]=e.extend(!0,{},n);return g(!0),!0}function d(t){for(var n=t-1;n>-1&&!h().validPositions[n];n--);var i,r;for(n++;n<t;n++)h().validPositions[n]===a&&(!1===c.jitMasking||c.jitMasking>n)&&(""===(r=S(n,b(n-1).locator,n-1).slice())[r.length-1].match.def&&r.pop(),(i=k(r))&&(i.match.def===c.radixPointDefinitionSymbol||!M(n,!0)||e.inArray(c.radixPoint,A())<n&&i.match.fn&&i.match.fn.test(I(n),h(),n,!1,c))&&!1!==(x=p(n,I(n,i.match,!0)||(null==i.match.fn?i.match.def:""!==I(n)?I(n):A()[n]),!0))&&(h().validPositions[x.pos||n].generatedInput=!0))}r=!0===r;var m=t;t.begin!==a&&(m=Z&&!u(t)?t.end:t.begin);var x=!0,w=e.extend(!0,{},h().validPositions);if(e.isFunction(c.preValidation)&&!r&&!0!==o&&!0!==l&&(x=c.preValidation(A(),m,n,u(t),c)),!0===x){if(d(m),u(t)&&(V(a,i.keyCode.DELETE,t,!0,!0),m=h().p),m<h().maskLength&&(Q===a||m<Q)&&(x=p(m,n,r),(!r||!0===o)&&!1===x&&!0!==l)){var D=h().validPositions[m];if(!D||null!==D.match.fn||D.match.def!==n&&n!==c.skipOptionalPartCharacter){if((c.insertMode||h().validPositions[_(m)]===a)&&!M(m,!0))for(var N=m+1,F=_(m);N<=F;N++)if(!1!==(x=p(N,n,r))){!function(t,n){var i=h().validPositions[n];if(i)for(var r=i.locator,o=r.length,s=t;s<n;s++)if(h().validPositions[s]===a&&!M(s,!0)){var l=S(s).slice(),c=k(l,!0),u=-1;""===l[l.length-1].match.def&&l.pop(),e.each(l,function(e,t){for(var n=0;n<o;n++){if(t.locator[n]===a||!O(t.locator[n].toString().split(","),r[n].toString().split(","),t.na)){var i=r[n],s=c.locator[n],l=t.locator[n];i-s>Math.abs(i-l)&&(c=t);break}u<n&&(u=n,c=t)}}),(c=e.extend({},c,{input:I(s,c.match,!0)||c.match.def})).generatedInput=!0,f(s,c,!0),h().validPositions[n]=a,p(n,i.input,!0)}}(m,x.pos!==a?x.pos:N),m=N;break}}else x={caret:_(m)}}!1===x&&c.keepStatic&&!r&&!0!==s&&(x=function(t,n,i){var r,s,l,u,p,f,d,m,y=e.extend(!0,{},h().validPositions),k=!1,b=v();for(u=h().validPositions[b];b>=0;b--)if((l=h().validPositions[b])&&l.alternation!==a){if(r=b,s=h().validPositions[r].alternation,u.locator[l.alternation]!==l.locator[l.alternation])break;u=l}if(s!==a){m=parseInt(r);var x=u.locator[u.alternation||s]!==a?u.locator[u.alternation||s]:d[0];x.length>0&&(x=x.split(",")[0]);var P=h().validPositions[m],w=h().validPositions[m-1];e.each(S(m,w?w.locator:a,m-1),function(r,l){d=l.locator[s]?l.locator[s].toString().split(","):[];for(var u=0;u<d.length;u++){var b=[],S=0,w=0,A=!1;if(x<d[u]&&(l.na===a||-1===e.inArray(d[u],l.na.split(","))||-1===e.inArray(x.toString(),d))){h().validPositions[m]=e.extend(!0,{},l);var E=h().validPositions[m].locator;for(h().validPositions[m].locator[s]=parseInt(d[u]),null==l.match.fn?(P.input!==l.match.def&&(A=!0,!0!==P.generatedInput&&b.push(P.input)),w++,h().validPositions[m].generatedInput=!/[0-9a-bA-Z]/.test(l.match.def),h().validPositions[m].input=l.match.def):h().validPositions[m].input=P.input,p=m+1;p<v(a,!0)+1;p++)(f=h().validPositions[p])&&!0!==f.generatedInput&&/[0-9a-bA-Z]/.test(f.input)?b.push(f.input):p<t&&S++,delete h().validPositions[p];for(A&&b[0]===l.match.def&&b.shift(),g(!0),k=!0;b.length>0;){var C=b.shift();if(C!==c.skipOptionalPartCharacter&&!(k=R(v(a,!0)+1,C,!1,o,!0)))break}if(k){h().validPositions[m].locator=E;var O=v(t)+1;for(p=m+1;p<v()+1;p++)((f=h().validPositions[p])===a||null==f.match.fn)&&p<t+(w-S)&&w++;k=R((t+=w-S)>O?O:t,n,i,o,!0)}if(k)return!1;g(),h().validPositions=e.extend(!0,{},y)}}})}return k}(m,n,r)),!0===x&&(x={pos:m})}if(e.isFunction(c.postValidation)&&!1!==x&&!r&&!0!==o&&!0!==l){var T=c.postValidation(A(!0),x,c);if(T.refreshFromBuffer&&T.buffer){var G=T.refreshFromBuffer;E(!0===G?G:G.start,G.end,T.buffer)}x=!0===T?x:T}return x&&x.pos===a&&(x.pos=m),!1!==x&&!0!==l||(g(!0),h().validPositions=e.extend(!0,{},w)),x}function M(e,t){var n=b(e).match;if(""===n.def&&(n=x(e).match),null!=n.fn)return n.fn;if(!0!==t&&e>-1){var a=S(e);return a.length>1+(""===a[a.length-1].match.def?1:0)}return!1}function _(e,t){var n=h().maskLength;if(e>=n)return n;var a=e;for(S(n+1).length>1&&(m(!0,n+1,!0),n=h().maskLength);++a<n&&(!0===t&&(!0!==x(a).match.newBlockMarker||!M(a))||!0!==t&&!M(a)););return a}function D(e,t){var n,a=e;if(a<=0)return 0;for(;--a>0&&(!0===t&&!0!==x(a).match.newBlockMarker||!0!==t&&!M(a)&&((n=S(a)).length<2||2===n.length&&""===n[1].match.def)););return a}function j(e){return h().validPositions[e]===a?I(e):h().validPositions[e].input}function N(t,n,i,r,o){if(r&&e.isFunction(c.onBeforeWrite)){var s=c.onBeforeWrite.call(W,r,n,i,c);if(s){if(s.refreshFromBuffer){var l=s.refreshFromBuffer;E(!0===l?l:l.start,l.end,s.buffer||n),n=A(!0)}i!==a&&(i=s.caret!==a?s.caret:i)}}t!==a&&(t.inputmask._valueSet(n.join("")),i===a||r!==a&&"blur"===r.type?H(t,i,0===n.length):d&&r&&"input"===r.type?setTimeout(function(){G(t,i)},0):G(t,i),!0===o&&(X=!0,e(t).trigger("input")))}function I(t,n,i){if((n=n||x(t).match).placeholder!==a||!0===i)return e.isFunction(n.placeholder)?n.placeholder(c):n.placeholder;if(null===n.fn){if(t>-1&&h().validPositions[t]===a){var r,o=S(t),s=[];if(o.length>1+(""===o[o.length-1].match.def?1:0))for(var l=0;l<o.length;l++)if(!0!==o[l].match.optionality&&!0!==o[l].match.optionalQuantifier&&(null===o[l].match.fn||r===a||!1!==o[l].match.fn.test(r.match.def,h(),t,!0,c))&&(s.push(o[l]),null===o[l].match.fn&&(r=o[l]),s.length>1&&/[0-9a-bA-Z]/.test(s[0].match.def)))return c.placeholder.charAt(t%c.placeholder.length)}return n.def}return c.placeholder.charAt(t%c.placeholder.length)}function F(t,r,o,s,l){function u(e,t){return-1!==w().slice(e,_(e)).join("").indexOf(t)&&!M(e)&&x(e).match.nativeDef===t.charAt(t.length-1)}var p=s.slice(),f="",d=-1,m=a;if(g(),o||!0===c.autoUnmask)d=_(d);else{var y=w().slice(0,_(-1)).join(""),k=p.join("").match(new RegExp("^"+i.escapeRegex(y),"g"));k&&k.length>0&&(p.splice(0,k.length*y.length),d=_(d))}if(-1===d?(h().p=_(d),d=0):h().p=d,e.each(p,function(n,i){if(i!==a)if(h().validPositions[n]===a&&p[n]===I(n)&&M(n,!0)&&!1===R(n,p[n],!0,a,a,!0))h().p++;else{var r=new e.Event("_checkval");r.which=i.charCodeAt(0),f+=i;var s=v(a,!0),l=h().validPositions[s],y=b(s+1,l?l.locator.slice():a,s);if(!u(d,f)||o||c.autoUnmask){var k=o?n:null==y.match.fn&&y.match.optionality&&s+1<h().p?s+1:h().p;m=ae.keypressEvent.call(t,r,!0,!1,o,k),d=k+1,f=""}else m=ae.keypressEvent.call(t,r,!0,!1,!0,s+1);if(!1!==m&&!o&&e.isFunction(c.onBeforeWrite)){var x=m;if(m=c.onBeforeWrite.call(W,r,A(),m.forwardPosition,c),(m=e.extend(x,m))&&m.refreshFromBuffer){var P=m.refreshFromBuffer;E(!0===P?P:P.start,P.end,m.buffer),g(!0),m.caret&&(h().p=m.caret,m.forwardPosition=m.caret)}}}}),r){var P=a;n.activeElement===t&&m&&(P=c.numericInput?D(m.forwardPosition):m.forwardPosition),N(t,A(),P,l||new e.Event("checkval"),l&&"input"===l.type)}}function T(t){if(t){if(t.inputmask===a)return t.value;t.inputmask&&t.inputmask.refreshValue&&ae.setValueEvent.call(t)}var n=[],i=h().validPositions;for(var r in i)i[r].match&&null!=i[r].match.fn&&n.push(i[r].input);var o=0===n.length?"":(Z?n.reverse():n).join("");if(e.isFunction(c.onUnMask)){var s=(Z?A().slice().reverse():A()).join("");o=c.onUnMask.call(W,s,o,c)}return o}function G(e,i,r,o){function s(e){return!0===o||!Z||"number"!=typeof e||c.greedy&&""===c.placeholder||(e=A().join("").length-e),e}var l;if(i===a)return e.setSelectionRange?(i=e.selectionStart,r=e.selectionEnd):t.getSelection?(l=t.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode!==e&&l.commonAncestorContainer!==e||(i=l.startOffset,r=l.endOffset):n.selection&&n.selection.createRange&&(r=(i=0-(l=n.selection.createRange()).duplicate().moveStart("character",-e.inputmask._valueGet().length))+l.text.length),{begin:s(i),end:s(r)};if(i.begin!==a&&(r=i.end,i=i.begin),"number"==typeof i){i=s(i),r="number"==typeof(r=s(r))?r:i;var p=parseInt(((e.ownerDocument.defaultView||t).getComputedStyle?(e.ownerDocument.defaultView||t).getComputedStyle(e,null):e.currentStyle).fontSize)*r;if(e.scrollLeft=p>e.scrollWidth?p:0,u||!1!==c.insertMode||i!==r||r++,e.setSelectionRange)e.selectionStart=i,e.selectionEnd=r;else if(t.getSelection){if(l=n.createRange(),e.firstChild===a||null===e.firstChild){var f=n.createTextNode("");e.appendChild(f)}l.setStart(e.firstChild,i<e.inputmask._valueGet().length?i:e.inputmask._valueGet().length),l.setEnd(e.firstChild,r<e.inputmask._valueGet().length?r:e.inputmask._valueGet().length),l.collapse(!0);var d=t.getSelection();d.removeAllRanges(),d.addRange(l)}else e.createTextRange&&((l=e.createTextRange()).collapse(!0),l.moveEnd("character",r),l.moveStart("character",i),l.select());H(e,{begin:i,end:r})}}function B(t){var n,i,r=A(),o=r.length,s=v(),l={},c=h().validPositions[s],u=c!==a?c.locator.slice():a;for(n=s+1;n<r.length;n++)u=(i=b(n,u,n-1)).locator.slice(),l[n]=e.extend(!0,{},i);var p=c&&c.alternation!==a?c.locator[c.alternation]:a;for(n=o-1;n>s&&(((i=l[n]).match.optionality||i.match.optionalQuantifier&&i.match.newBlockMarker||p&&(p!==l[n].locator[c.alternation]&&null!=i.match.fn||null===i.match.fn&&i.locator[c.alternation]&&O(i.locator[c.alternation].toString().split(","),p.toString().split(","))&&""!==S(n)[0].def))&&r[n]===I(n,i.match));n--)o--;return t?{l:o,def:l[o]?l[o].match:a}:o}function L(e){for(var t,n=B(),i=e.length,r=h().validPositions[v()];n<i&&!M(n,!0)&&(t=r!==a?b(n,r.locator.slice(""),r):x(n))&&!0!==t.match.optionality&&(!0!==t.match.optionalQuantifier&&!0!==t.match.newBlockMarker||n+1===i&&""===(r!==a?b(n+1,r.locator.slice(""),r):x(n+1)).match.def);)n++;for(;(t=h().validPositions[n-1])&&t&&t.match.optionality&&t.input===c.skipOptionalPartCharacter;)n--;return e.splice(n),e}function U(t){if(e.isFunction(c.isComplete))return c.isComplete(t,c);if("*"===c.repeat)return a;var n=!1,i=B(!0),r=D(i.l);if(i.def===a||i.def.newBlockMarker||i.def.optionality||i.def.optionalQuantifier){n=!0;for(var o=0;o<=r;o++){var s=b(o).match;if(null!==s.fn&&h().validPositions[o]===a&&!0!==s.optionality&&!0!==s.optionalQuantifier||null===s.fn&&t[o]!==I(o,s)){n=!1;break}}}return n}function V(t,n,r,o,s){if((c.numericInput||Z)&&(n===i.keyCode.BACKSPACE?n=i.keyCode.DELETE:n===i.keyCode.DELETE&&(n=i.keyCode.BACKSPACE),Z)){var l=r.end;r.end=r.begin,r.begin=l}n===i.keyCode.BACKSPACE&&(r.end-r.begin<1||!1===c.insertMode)?(r.begin=D(r.begin),h().validPositions[r.begin]!==a&&h().validPositions[r.begin].input===c.groupSeparator&&r.begin--):n===i.keyCode.DELETE&&r.begin===r.end&&(r.end=M(r.end,!0)&&h().validPositions[r.end]&&h().validPositions[r.end].input!==c.radixPoint?r.end+1:_(r.end)+1,h().validPositions[r.begin]!==a&&h().validPositions[r.begin].input===c.groupSeparator&&r.end++),y(r.begin,r.end,!1,o),!0!==o&&function(){if(c.keepStatic){for(var n=[],i=v(-1,!0),r=e.extend(!0,{},h().validPositions),o=h().validPositions[i];i>=0;i--){var s=h().validPositions[i];if(s){if(!0!==s.generatedInput&&/[0-9a-bA-Z]/.test(s.input)&&n.push(s.input),delete h().validPositions[i],s.alternation!==a&&s.locator[s.alternation]!==o.locator[s.alternation])break;o=s}}if(i>-1)for(h().p=_(v(-1,!0));n.length>0;){var l=new e.Event("keypress");l.which=n.pop().charCodeAt(0),ae.keypressEvent.call(t,l,!0,!1,!1,h().p)}else h().validPositions=e.extend(!0,{},r)}}();var u=v(r.begin,!0);if(u<r.begin)h().p=_(u);else if(!0!==o&&(h().p=r.begin,!0!==s))for(;h().p<u&&h().validPositions[h().p]===a;)h().p++}function K(a){function i(e){var t,i=n.createElement("span");for(var o in r)isNaN(o)&&-1!==o.indexOf("font")&&(i.style[o]=r[o]);i.style.textTransform=r.textTransform,i.style.letterSpacing=r.letterSpacing,i.style.position="absolute",i.style.height="auto",i.style.width="auto",i.style.visibility="hidden",i.style.whiteSpace="nowrap",n.body.appendChild(i);var s,l=a.inputmask._valueGet(),c=0;for(t=0,s=l.length;t<=s;t++){if(i.innerHTML+=l.charAt(t)||"_",i.offsetWidth>=e){var u=e-c,p=i.offsetWidth-e;i.innerHTML=l.charAt(t),t=(u-=i.offsetWidth/3)<p?t-1:t;break}c=i.offsetWidth}return n.body.removeChild(i),t}var r=(a.ownerDocument.defaultView||t).getComputedStyle(a,null),o=n.createElement("div");o.style.width=r.width,o.style.textAlign=r.textAlign,($=n.createElement("div")).className="im-colormask",a.parentNode.insertBefore($,a),a.parentNode.removeChild(a),$.appendChild(o),$.appendChild(a),a.style.left=o.offsetLeft+"px",e(a).on("click",function(e){return G(a,i(e.clientX)),ae.clickEvent.call(a,[e])}),e(a).on("keydown",function(e){e.shiftKey||!1===c.insertMode||setTimeout(function(){H(a)},0)})}function H(e,t,i){function r(){f||null!==s.fn&&l.input!==a?f&&(null!==s.fn&&l.input!==a||""===s.def)&&(f=!1,p+="</span>"):(f=!0,p+="<span class='im-static'>")}function o(a){!0!==a&&d!==t.begin||n.activeElement!==e||(p+="<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>")}var s,l,u,p="",f=!1,d=0;if($!==a){var m=A();if(t===a?t=G(e):t.begin===a&&(t={begin:t,end:t}),!0!==i){var g=v();do{o(),h().validPositions[d]?(l=h().validPositions[d],s=l.match,u=l.locator.slice(),r(),p+=m[d]):(l=b(d,u,d-1),s=l.match,u=l.locator.slice(),(!1===c.jitMasking||d<g||"number"==typeof c.jitMasking&&isFinite(c.jitMasking)&&c.jitMasking>d)&&(r(),p+=I(d,s))),d++}while((Q===a||d<Q)&&(null!==s.fn||""!==s.def)||g>d||f);-1===p.indexOf("im-caret")&&o(!0),f&&r()}var y=$.getElementsByTagName("div")[0];y.innerHTML=p,e.inputmask.positionColorMask(e,y)}}s=s||this.maskset,c=c||this.opts;var z,q,Q,$,W=this,Y=this.el,Z=this.isRTL,J=!1,X=!1,ee=!1,te=!1,ne={on:function(t,n,r){var o=function(t){if(this.inputmask===a&&"FORM"!==this.nodeName){var n=e.data(this,"_inputmask_opts");n?new i(n).mask(this):ne.off(this)}else{if("setvalue"===t.type||"FORM"===this.nodeName||!(this.disabled||this.readOnly&&!("keydown"===t.type&&t.ctrlKey&&67===t.keyCode||!1===c.tabThrough&&t.keyCode===i.keyCode.TAB))){switch(t.type){case"input":if(!0===X)return X=!1,t.preventDefault();break;case"keydown":J=!1,X=!1;break;case"keypress":if(!0===J)return t.preventDefault();J=!0;break;case"click":if(p||f){var o=this,s=arguments;return setTimeout(function(){r.apply(o,s)},0),!1}}var l=r.apply(this,arguments);return!1===l&&(t.preventDefault(),t.stopPropagation()),l}t.preventDefault()}};t.inputmask.events[n]=t.inputmask.events[n]||[],t.inputmask.events[n].push(o),-1!==e.inArray(n,["submit","reset"])?null!==t.form&&e(t.form).on(n,o):e(t).on(n,o)},off:function(t,n){if(t.inputmask&&t.inputmask.events){var a;n?(a=[])[n]=t.inputmask.events[n]:a=t.inputmask.events,e.each(a,function(n,a){for(;a.length>0;){var i=a.pop();-1!==e.inArray(n,["submit","reset"])?null!==t.form&&e(t.form).off(n,i):e(t).off(n,i)}delete t.inputmask.events[n]})}}},ae={keydownEvent:function(t){var a=this,r=e(a),o=t.keyCode,s=G(a);if(o===i.keyCode.BACKSPACE||o===i.keyCode.DELETE||f&&o===i.keyCode.BACKSPACE_SAFARI||t.ctrlKey&&o===i.keyCode.X&&!function(e){var t=n.createElement("input"),a="on"+e,i=a in t;return i||(t.setAttribute(a,"return;"),i="function"==typeof t[a]),t=null,i}("cut"))t.preventDefault(),V(a,o,s),N(a,A(!0),h().p,t,a.inputmask._valueGet()!==A().join("")),a.inputmask._valueGet()===w().join("")?r.trigger("cleared"):!0===U(A())&&r.trigger("complete");else if(o===i.keyCode.END||o===i.keyCode.PAGE_DOWN){t.preventDefault();var l=_(v());c.insertMode||l!==h().maskLength||t.shiftKey||l--,G(a,t.shiftKey?s.begin:l,l,!0)}else o===i.keyCode.HOME&&!t.shiftKey||o===i.keyCode.PAGE_UP?(t.preventDefault(),G(a,0,t.shiftKey?s.begin:0,!0)):(c.undoOnEscape&&o===i.keyCode.ESCAPE||90===o&&t.ctrlKey)&&!0!==t.altKey?(F(a,!0,!1,z.split("")),r.trigger("click")):o!==i.keyCode.INSERT||t.shiftKey||t.ctrlKey?!0===c.tabThrough&&o===i.keyCode.TAB?(!0===t.shiftKey?(null===x(s.begin).match.fn&&(s.begin=_(s.begin)),s.end=D(s.begin,!0),s.begin=D(s.end,!0)):(s.begin=_(s.begin,!0),s.end=_(s.begin,!0),s.end<h().maskLength&&s.end--),s.begin<h().maskLength&&(t.preventDefault(),G(a,s.begin,s.end))):t.shiftKey||!1===c.insertMode&&(o===i.keyCode.RIGHT?setTimeout(function(){var e=G(a);G(a,e.begin)},0):o===i.keyCode.LEFT&&setTimeout(function(){var e=G(a);G(a,Z?e.begin+1:e.begin-1)},0)):(c.insertMode=!c.insertMode,G(a,c.insertMode||s.begin!==h().maskLength?s.begin:s.begin-1));c.onKeyDown.call(this,t,A(),G(a).begin,c),ee=-1!==e.inArray(o,c.ignorables)},keypressEvent:function(t,n,r,o,s){var l=this,u=e(l),p=t.which||t.charCode||t.keyCode;if(!(!0===n||t.ctrlKey&&t.altKey)&&(t.ctrlKey||t.metaKey||ee))return p===i.keyCode.ENTER&&z!==A().join("")&&(z=A().join(""),setTimeout(function(){u.trigger("change")},0)),!0;if(p){46===p&&!1===t.shiftKey&&""!==c.radixPoint&&(p=c.radixPoint.charCodeAt(0));var f,d=n?{begin:s,end:s}:G(l),m=String.fromCharCode(p);h().writeOutBuffer=!0;var v=R(d,m,o);if(!1!==v&&(g(!0),f=v.caret!==a?v.caret:n?v.pos+1:_(v.pos),h().p=f),!1!==r&&(setTimeout(function(){c.onKeyValidation.call(l,p,v,c)},0),h().writeOutBuffer&&!1!==v)){var y=A();N(l,y,c.numericInput&&v.caret===a?D(f):f,t,!0!==n),!0!==n&&setTimeout(function(){!0===U(y)&&u.trigger("complete")},0)}if(t.preventDefault(),n)return!1!==v&&(v.forwardPosition=f),v}},pasteEvent:function(n){var a,i=this,r=n.originalEvent||n,o=e(i),s=i.inputmask._valueGet(!0),l=G(i);Z&&(a=l.end,l.end=l.begin,l.begin=a);var u=s.substr(0,l.begin),p=s.substr(l.end,s.length);if(u===(Z?w().reverse():w()).slice(0,l.begin).join("")&&(u=""),p===(Z?w().reverse():w()).slice(l.end).join("")&&(p=""),Z&&(a=u,u=p,p=a),t.clipboardData&&t.clipboardData.getData)s=u+t.clipboardData.getData("Text")+p;else{if(!r.clipboardData||!r.clipboardData.getData)return!0;s=u+r.clipboardData.getData("text/plain")+p}var f=s;if(e.isFunction(c.onBeforePaste)){if(!1===(f=c.onBeforePaste.call(W,s,c)))return n.preventDefault();f||(f=s)}return F(i,!1,!1,Z?f.split("").reverse():f.toString().split("")),N(i,A(),_(v()),n,z!==A().join("")),!0===U(A())&&o.trigger("complete"),n.preventDefault()},inputFallBackEvent:function(t){var n=this,a=n.inputmask._valueGet();if(A().join("")!==a){var r=G(n);if(!1===function(t,n,a){if("."===n.charAt(a.begin-1)&&""!==c.radixPoint&&((n=n.split(""))[a.begin-1]=c.radixPoint.charAt(0),n=n.join("")),n.charAt(a.begin-1)===c.radixPoint&&n.length>A().length){var i=new e.Event("keypress");return i.which=c.radixPoint.charCodeAt(0),ae.keypressEvent.call(t,i,!0,!0,!1,a.begin-1),!1}}(n,a,r))return!1;if(a=a.replace(new RegExp("("+i.escapeRegex(w().join(""))+")*"),""),!1===function(t,n,a){if(p){var i=n.replace(A().join(""),"");if(1===i.length){var r=new e.Event("keypress");return r.which=i.charCodeAt(0),ae.keypressEvent.call(t,r,!0,!0,!1,h().validPositions[a.begin-1]?a.begin:a.begin-1),!1}}}(n,a,r))return!1;r.begin>a.length&&(G(n,a.length),r=G(n));var o=A().join(""),s=a.substr(0,r.begin),l=a.substr(r.begin),u=o.substr(0,r.begin),f=o.substr(r.begin),d=r,m="",g=!1;if(s!==u){d.begin=0;for(var v=(g=s.length>=u.length)?s.length:u.length,y=0;s.charAt(y)===u.charAt(y)&&y<v;y++)d.begin++;g&&(m+=s.slice(d.begin,d.end))}l!==f&&(l.length>f.length?g&&(d.end=d.begin):l.length<f.length?d.end+=f.length-l.length:l.charAt(0)!==f.charAt(0)&&d.end++),N(n,A(),d),m.length>0?e.each(m.split(""),function(t,a){var i=new e.Event("keypress");i.which=a.charCodeAt(0),ee=!1,ae.keypressEvent.call(n,i)}):(d.begin===d.end-1&&G(n,D(d.begin+1),d.end),t.keyCode=i.keyCode.DELETE,ae.keydownEvent.call(n,t)),t.preventDefault()}},setValueEvent:function(t){this.inputmask.refreshValue=!1;var n=this,a=n.inputmask._valueGet(!0);e.isFunction(c.onBeforeMask)&&(a=c.onBeforeMask.call(W,a,c)||a),a=a.split(""),F(n,!0,!1,Z?a.reverse():a),z=A().join(""),(c.clearMaskOnLostFocus||c.clearIncomplete)&&n.inputmask._valueGet()===w().join("")&&n.inputmask._valueSet("")},focusEvent:function(e){var t=this,n=t.inputmask._valueGet();c.showMaskOnFocus&&(!c.showMaskOnHover||c.showMaskOnHover&&""===n)&&(t.inputmask._valueGet()!==A().join("")?N(t,A(),_(v())):!1===te&&G(t,_(v()))),!0===c.positionCaretOnTab&&!1===te&&""!==n&&(N(t,A(),G(t)),ae.clickEvent.apply(t,[e,!0])),z=A().join("")},mouseleaveEvent:function(e){var t=this;if(te=!1,c.clearMaskOnLostFocus&&n.activeElement!==t){var a=A().slice(),i=t.inputmask._valueGet();i!==t.getAttribute("placeholder")&&""!==i&&(-1===v()&&i===w().join("")?a=[]:L(a),N(t,a))}},clickEvent:function(t,i){function r(t){if(""!==c.radixPoint){var n=h().validPositions;if(n[t]===a||n[t].input===I(t)){if(t<_(-1))return!0;var i=e.inArray(c.radixPoint,A());if(-1!==i){for(var r in n)if(i<r&&n[r].input!==I(r))return!1;return!0}}}return!1}var o=this;setTimeout(function(){if(n.activeElement===o){var e=G(o);if(i&&(Z?e.end=e.begin:e.begin=e.end),e.begin===e.end)switch(c.positionCaretOnClick){case"none":break;case"radixFocus":if(r(e.begin)){var t=A().join("").indexOf(c.radixPoint);G(o,c.numericInput?_(t):t);break}default:var s=e.begin,l=v(s,!0),u=_(l);if(s<u)G(o,M(s,!0)||M(s-1,!0)?s:_(s));else{var p=h().validPositions[l],f=b(u,p?p.match.locator:a,p),d=I(u,f.match);if(""!==d&&A()[u]!==d&&!0!==f.match.optionalQuantifier&&!0!==f.match.newBlockMarker||!M(u,!0)&&f.match.def===d){var m=_(u);(s>=m||s===u)&&(u=m)}G(o,u)}}}},0)},dblclickEvent:function(e){var t=this;setTimeout(function(){G(t,0,_(v()))},0)},cutEvent:function(a){var r=this,o=e(r),s=G(r),l=a.originalEvent||a,c=t.clipboardData||l.clipboardData,u=Z?A().slice(s.end,s.begin):A().slice(s.begin,s.end);c.setData("text",Z?u.reverse().join(""):u.join("")),n.execCommand&&n.execCommand("copy"),V(r,i.keyCode.DELETE,s),N(r,A(),h().p,a,z!==A().join("")),r.inputmask._valueGet()===w().join("")&&o.trigger("cleared")},blurEvent:function(t){var n=e(this),i=this;if(i.inputmask){var r=i.inputmask._valueGet(),o=A().slice();""!==r&&(c.clearMaskOnLostFocus&&(-1===v()&&r===w().join("")?o=[]:L(o)),!1===U(o)&&(setTimeout(function(){n.trigger("incomplete")},0),c.clearIncomplete&&(g(),o=c.clearMaskOnLostFocus?[]:w().slice())),N(i,o,a,t)),z!==A().join("")&&(z=o.join(""),n.trigger("change"))}},mouseenterEvent:function(e){var t=this;te=!0,n.activeElement!==t&&c.showMaskOnHover&&t.inputmask._valueGet()!==A().join("")&&N(t,A())},submitEvent:function(e){z!==A().join("")&&q.trigger("change"),c.clearMaskOnLostFocus&&-1===v()&&Y.inputmask._valueGet&&Y.inputmask._valueGet()===w().join("")&&Y.inputmask._valueSet(""),c.removeMaskOnSubmit&&(Y.inputmask._valueSet(Y.inputmask.unmaskedvalue(),!0),setTimeout(function(){N(Y,A())},0))},resetEvent:function(e){Y.inputmask.refreshValue=!0,setTimeout(function(){q.trigger("setvalue")},0)}};i.prototype.positionColorMask=function(e,t){e.style.left=t.offsetLeft+"px"};var ie;if(r!==a)switch(r.action){case"isComplete":return Y=r.el,U(A());case"unmaskedvalue":return Y!==a&&r.value===a||(ie=r.value,ie=(e.isFunction(c.onBeforeMask)?c.onBeforeMask.call(W,ie,c)||ie:ie).split(""),F(a,!1,!1,Z?ie.reverse():ie),e.isFunction(c.onBeforeWrite)&&c.onBeforeWrite.call(W,a,A(),0,c)),T(Y);case"mask":!function(t){ne.off(t);var i=function(t,i){var r=t.getAttribute("type"),s="INPUT"===t.tagName&&-1!==e.inArray(r,i.supportsInputType)||t.isContentEditable||"TEXTAREA"===t.tagName;if(!s)if("INPUT"===t.tagName){var l=n.createElement("input");l.setAttribute("type",r),s="text"===l.type,l=null}else s="partial";return!1!==s?function(t){function r(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():-1!==v()||!0!==i.nullable?n.activeElement===this&&i.clearMaskOnLostFocus?(Z?L(A().slice()).reverse():L(A().slice())).join(""):l.call(this):"":l.call(this)}function s(t){c.call(this,t),this.inputmask&&e(this).trigger("setvalue")}var l,c;if(!t.inputmask.__valueGet){if(!0!==i.noValuePatching){if(Object.getOwnPropertyDescriptor){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===o("test".__proto__)?function(e){return e.__proto__}:function(e){return e.constructor.prototype});var u=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value"):a;u&&u.get&&u.set?(l=u.get,c=u.set,Object.defineProperty(t,"value",{get:r,set:s,configurable:!0})):"INPUT"!==t.tagName&&(l=function(){return this.textContent},c=function(e){this.textContent=e},Object.defineProperty(t,"value",{get:r,set:s,configurable:!0}))}else n.__lookupGetter__&&t.__lookupGetter__("value")&&(l=t.__lookupGetter__("value"),c=t.__lookupSetter__("value"),t.__defineGetter__("value",r),t.__defineSetter__("value",s));t.inputmask.__valueGet=l,t.inputmask.__valueSet=c}t.inputmask._valueGet=function(e){return Z&&!0!==e?l.call(this.el).split("").reverse().join(""):l.call(this.el)},t.inputmask._valueSet=function(e,t){c.call(this.el,null===e||e===a?"":!0!==t&&Z?e.split("").reverse().join(""):e)},l===a&&(l=function(){return this.value},c=function(e){this.value=e},function(t){if(e.valHooks&&(e.valHooks[t]===a||!0!==e.valHooks[t].inputmaskpatch)){var n=e.valHooks[t]&&e.valHooks[t].get?e.valHooks[t].get:function(e){return e.value},r=e.valHooks[t]&&e.valHooks[t].set?e.valHooks[t].set:function(e,t){return e.value=t,e};e.valHooks[t]={get:function(e){if(e.inputmask){if(e.inputmask.opts.autoUnmask)return e.inputmask.unmaskedvalue();var t=n(e);return-1!==v(a,a,e.inputmask.maskset.validPositions)||!0!==i.nullable?t:""}return n(e)},set:function(t,n){var a,i=e(t);return a=r(t,n),t.inputmask&&i.trigger("setvalue"),a},inputmaskpatch:!0}}}(t.type),function(t){ne.on(t,"mouseenter",function(t){var n=e(this);this.inputmask._valueGet()!==A().join("")&&n.trigger("setvalue")})}(t))}}(t):t.inputmask=a,s}(t,c);if(!1!==i&&(Y=t,q=e(Y),-1===(Q=Y!==a?Y.maxLength:a)&&(Q=a),!0===c.colorMask&&K(Y),d&&(Y.hasOwnProperty("inputmode")&&(Y.inputmode=c.inputmode,Y.setAttribute("inputmode",c.inputmode)),"rtfm"===c.androidHack&&(!0!==c.colorMask&&K(Y),Y.type="password")),!0===i&&(ne.on(Y,"submit",ae.submitEvent),ne.on(Y,"reset",ae.resetEvent),ne.on(Y,"mouseenter",ae.mouseenterEvent),ne.on(Y,"blur",ae.blurEvent),ne.on(Y,"focus",ae.focusEvent),ne.on(Y,"mouseleave",ae.mouseleaveEvent),!0!==c.colorMask&&ne.on(Y,"click",ae.clickEvent),ne.on(Y,"dblclick",ae.dblclickEvent),ne.on(Y,"paste",ae.pasteEvent),ne.on(Y,"dragdrop",ae.pasteEvent),ne.on(Y,"drop",ae.pasteEvent),ne.on(Y,"cut",ae.cutEvent),ne.on(Y,"complete",c.oncomplete),ne.on(Y,"incomplete",c.onincomplete),ne.on(Y,"cleared",c.oncleared),d||!0===c.inputEventOnly?Y.removeAttribute("maxLength"):(ne.on(Y,"keydown",ae.keydownEvent),ne.on(Y,"keypress",ae.keypressEvent)),ne.on(Y,"compositionstart",e.noop),ne.on(Y,"compositionupdate",e.noop),ne.on(Y,"compositionend",e.noop),ne.on(Y,"keyup",e.noop),ne.on(Y,"input",ae.inputFallBackEvent),ne.on(Y,"beforeinput",e.noop)),ne.on(Y,"setvalue",ae.setValueEvent),z=w().join(""),""!==Y.inputmask._valueGet(!0)||!1===c.clearMaskOnLostFocus||n.activeElement===Y)){var r=e.isFunction(c.onBeforeMask)?c.onBeforeMask.call(W,Y.inputmask._valueGet(!0),c)||Y.inputmask._valueGet(!0):Y.inputmask._valueGet(!0);""!==r&&F(Y,!0,!1,Z?r.split("").reverse():r.split(""));var s=A().slice();z=s.join(""),!1===U(s)&&c.clearIncomplete&&g(),c.clearMaskOnLostFocus&&n.activeElement!==Y&&(-1===v()?s=[]:L(s)),N(Y,s),n.activeElement===Y&&G(Y,_(v()))}}(Y);break;case"format":return ie=(e.isFunction(c.onBeforeMask)?c.onBeforeMask.call(W,r.value,c)||r.value:r.value).split(""),F(a,!0,!1,Z?ie.reverse():ie),r.metadata?{value:Z?A().slice().reverse().join(""):A().join(""),metadata:l.call(this,{action:"getmetadata"},s,c)}:Z?A().slice().reverse().join(""):A().join("");case"isValid":r.value?(ie=r.value.split(""),F(a,!0,!0,Z?ie.reverse():ie)):r.value=A().join("");for(var re=A(),oe=B(),se=re.length-1;se>oe&&!M(se);se--);return re.splice(oe,se+1-oe),U(re)&&r.value===A().join("");case"getemptymask":return w().join("");case"remove":if(Y&&Y.inputmask){q=e(Y),Y.inputmask._valueSet(c.autoUnmask?T(Y):Y.inputmask._valueGet(!0)),ne.off(Y);Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Y),"value")&&Y.inputmask.__valueGet&&Object.defineProperty(Y,"value",{get:Y.inputmask.__valueGet,set:Y.inputmask.__valueSet,configurable:!0}):n.__lookupGetter__&&Y.__lookupGetter__("value")&&Y.inputmask.__valueGet&&(Y.__defineGetter__("value",Y.inputmask.__valueGet),Y.__defineSetter__("value",Y.inputmask.__valueSet)),Y.inputmask=a}return Y;case"getmetadata":if(e.isArray(s.metadata)){var le=m(!0,0,!1).join("");return e.each(s.metadata,function(e,t){if(t.mask===le)return le=t,!1}),le}return s.metadata}}var c=navigator.userAgent,u=/mobile/i.test(c),p=/iemobile/i.test(c),f=/iphone/i.test(c)&&!p,d=/android/i.test(c)&&!p;return i.prototype={dataAttribute:"data-inputmask",defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,regex:null,oncomplete:e.noop,onincomplete:e.noop,oncleared:e.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,alias:null,onKeyDown:e.noop,onBeforeMask:null,onBeforePaste:function(t,n){return e.isFunction(n.onBeforeMask)?n.onBeforeMask.call(this,t,n):t},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:e.noop,skipOptionalPartCharacter:" ",numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",radixPointDefinitionSymbol:a,groupSeparator:"",keepStatic:null,positionCaretOnTab:!0,tabThrough:!1,supportsInputType:["text","tel","password"],ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123,0,229],isComplete:null,canClearPosition:e.noop,preValidation:null,postValidation:null,staticDefinitionSymbol:a,jitMasking:!1,nullable:!0,inputEventOnly:!1,noValuePatching:!1,positionCaretOnClick:"lvp",casing:null,inputmode:"verbatim",colorMask:!1,androidHack:!1,importDataAttributes:!0},definitions:{9:{validator:"[0-9１-９]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9１-９A-Za-zА-яЁёÀ-ÿµ]",cardinality:1}},aliases:{},masksCache:{},mask:function(o){function c(n,i,o,s){if(!0===i.importDataAttributes){var l,c,u,p,f=function(e,i){null!==(i=i!==a?i:n.getAttribute(s+"-"+e))&&("string"==typeof i&&(0===e.indexOf("on")?i=t[i]:"false"===i?i=!1:"true"===i&&(i=!0)),o[e]=i)},d=n.getAttribute(s);if(d&&""!==d&&(d=d.replace(new RegExp("'","g"),'"'),c=JSON.parse("{"+d+"}")),c){u=a;for(p in c)if("alias"===p.toLowerCase()){u=c[p];break}}f("alias",u),o.alias&&r(o.alias,o,i);for(l in i){if(c){u=a;for(p in c)if(p.toLowerCase()===l.toLowerCase()){u=c[p];break}}f(l,u)}}return e.extend(!0,i,o),("rtl"===n.dir||i.rightAlign)&&(n.style.textAlign="right"),("rtl"===n.dir||i.numericInput)&&(n.dir="ltr",n.removeAttribute("dir"),i.isRTL=!0),i}var u=this;return"string"==typeof o&&(o=n.getElementById(o)||n.querySelectorAll(o)),o=o.nodeName?[o]:o,e.each(o,function(t,n){var r=e.extend(!0,{},u.opts);c(n,r,e.extend(!0,{},u.userOptions),u.dataAttribute);var o=s(r,u.noMasksCache);o!==a&&(n.inputmask!==a&&(n.inputmask.opts.autoUnmask=!0,n.inputmask.remove()),n.inputmask=new i(a,a,!0),n.inputmask.opts=r,n.inputmask.noMasksCache=u.noMasksCache,n.inputmask.userOptions=e.extend(!0,{},u.userOptions),n.inputmask.isRTL=r.isRTL||r.numericInput,n.inputmask.el=n,n.inputmask.maskset=o,e.data(n,"_inputmask_opts",r),l.call(n.inputmask,{action:"mask"}))}),o&&o[0]?o[0].inputmask||this:this},option:function(t,n){return"string"==typeof t?this.opts[t]:"object"===(void 0===t?"undefined":o(t))?(e.extend(this.userOptions,t),this.el&&!0!==n&&this.mask(this.el),this):void 0},unmaskedvalue:function(e){return this.maskset=this.maskset||s(this.opts,this.noMasksCache),l.call(this,{action:"unmaskedvalue",value:e})},remove:function(){return l.call(this,{action:"remove"})},getemptymask:function(){return this.maskset=this.maskset||s(this.opts,this.noMasksCache),l.call(this,{action:"getemptymask"})},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return this.maskset=this.maskset||s(this.opts,this.noMasksCache),l.call(this,{action:"isComplete"})},getmetadata:function(){return this.maskset=this.maskset||s(this.opts,this.noMasksCache),l.call(this,{action:"getmetadata"})},isValid:function(e){return this.maskset=this.maskset||s(this.opts,this.noMasksCache),l.call(this,{action:"isValid",value:e})},format:function(e,t){return this.maskset=this.maskset||s(this.opts,this.noMasksCache),l.call(this,{action:"format",value:e,metadata:t})},analyseMask:function(t,n,r){function o(e,t,n,a){this.matches=[],this.openGroup=e||!1,this.alternatorGroup=!1,this.isGroup=e||!1,this.isOptional=t||!1,this.isQuantifier=n||!1,this.isAlternator=a||!1,this.quantifier={min:1,max:1}}function s(t,o,s){s=s!==a?s:t.matches.length;var l=t.matches[s-1];if(n)0===o.indexOf("[")||b&&/\\d|\\s|\\w]/i.test(o)||"."===o?t.matches.splice(s++,0,{fn:new RegExp(o,r.casing?"i":""),cardinality:1,optionality:t.isOptional,newBlockMarker:l===a||l.def!==o,casing:null,def:o,placeholder:a,nativeDef:o}):(b&&(o=o[o.length-1]),e.each(o.split(""),function(e,n){l=t.matches[s-1],t.matches.splice(s++,0,{fn:null,cardinality:0,optionality:t.isOptional,newBlockMarker:l===a||l.def!==n&&null!==l.fn,casing:null,def:r.staticDefinitionSymbol||n,placeholder:r.staticDefinitionSymbol!==a?n:a,nativeDef:n})})),b=!1;else{var c=(r.definitions?r.definitions[o]:a)||i.prototype.definitions[o];if(c&&!b){for(var u=c.prevalidator,p=u?u.length:0,f=1;f<c.cardinality;f++){var d=p>=f?u[f-1]:[],m=d.validator,h=d.cardinality;t.matches.splice(s++,0,{fn:m?"string"==typeof m?new RegExp(m,r.casing?"i":""):new function(){this.test=m}:new RegExp("."),cardinality:h||1,optionality:t.isOptional,newBlockMarker:l===a||l.def!==(c.definitionSymbol||o),casing:c.casing,def:c.definitionSymbol||o,placeholder:c.placeholder,nativeDef:o}),l=t.matches[s-1]}t.matches.splice(s++,0,{fn:c.validator?"string"==typeof c.validator?new RegExp(c.validator,r.casing?"i":""):new function(){this.test=c.validator}:new RegExp("."),cardinality:c.cardinality,optionality:t.isOptional,newBlockMarker:l===a||l.def!==(c.definitionSymbol||o),casing:c.casing,def:c.definitionSymbol||o,placeholder:c.placeholder,nativeDef:o})}else t.matches.splice(s++,0,{fn:null,cardinality:0,optionality:t.isOptional,newBlockMarker:l===a||l.def!==o&&null!==l.fn,casing:null,def:r.staticDefinitionSymbol||o,placeholder:r.staticDefinitionSymbol!==a?o:a,nativeDef:o}),b=!1}}function l(t){t&&t.matches&&e.each(t.matches,function(e,i){var o=t.matches[e+1];(o===a||o.matches===a||!1===o.isQuantifier)&&i&&i.isGroup&&(i.isGroup=!1,n||(s(i,r.groupmarker.start,0),!0!==i.openGroup&&s(i,r.groupmarker.end))),l(i)})}function c(){if(P.length>0){if(m=P[P.length-1],s(m,f),m.isAlternator){h=P.pop();for(var e=0;e<h.matches.length;e++)h.matches[e].isGroup=!1;P.length>0?(m=P[P.length-1]).matches.push(h):x.matches.push(h)}}else s(x,f)}function u(e){e.matches=e.matches.reverse();for(var t in e.matches)if(e.matches.hasOwnProperty(t)){var n=parseInt(t);if(e.matches[t].isQuantifier&&e.matches[n+1]&&e.matches[n+1].isGroup){var i=e.matches[t];e.matches.splice(t,1),e.matches.splice(n+1,0,i)}e.matches[t].matches!==a?e.matches[t]=u(e.matches[t]):e.matches[t]=function(e){return e===r.optionalmarker.start?e=r.optionalmarker.end:e===r.optionalmarker.end?e=r.optionalmarker.start:e===r.groupmarker.start?e=r.groupmarker.end:e===r.groupmarker.end&&(e=r.groupmarker.start),e}(e.matches[t])}return e}var p,f,d,m,h,g,v,y=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,k=/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,b=!1,x=new o,P=[],S=[];for(n&&(r.optionalmarker.start=a,r.optionalmarker.end=a);p=n?k.exec(t):y.exec(t);){if(f=p[0],n)switch(f.charAt(0)){case"?":f="{0,1}";break;case"+":case"*":f="{"+f+"}"}if(b)c();else switch(f.charAt(0)){case r.escapeChar:b=!0,n&&c();break;case r.optionalmarker.end:case r.groupmarker.end:if(d=P.pop(),d.openGroup=!1,d!==a)if(P.length>0){if((m=P[P.length-1]).matches.push(d),m.isAlternator){h=P.pop();for(var w=0;w<h.matches.length;w++)h.matches[w].isGroup=!1,h.matches[w].alternatorGroup=!1;P.length>0?(m=P[P.length-1]).matches.push(h):x.matches.push(h)}}else x.matches.push(d);else c();break;case r.optionalmarker.start:P.push(new o(!1,!0));break;case r.groupmarker.start:P.push(new o(!0));break;case r.quantifiermarker.start:var A=new o(!1,!1,!0),E=(f=f.replace(/[{}]/g,"")).split(","),C=isNaN(E[0])?E[0]:parseInt(E[0]),O=1===E.length?C:isNaN(E[1])?E[1]:parseInt(E[1]);if("*"!==O&&"+"!==O||(C="*"===O?0:1),A.quantifier={min:C,max:O},P.length>0){var R=P[P.length-1].matches;(p=R.pop()).isGroup||((v=new o(!0)).matches.push(p),p=v),R.push(p),R.push(A)}else(p=x.matches.pop()).isGroup||(n&&null===p.fn&&"."===p.def&&(p.fn=new RegExp(p.def,r.casing?"i":"")),(v=new o(!0)).matches.push(p),p=v),x.matches.push(p),x.matches.push(A);break;case r.alternatormarker:if(P.length>0){var M=(m=P[P.length-1]).matches[m.matches.length-1];g=m.openGroup&&(M.matches===a||!1===M.isGroup&&!1===M.isAlternator)?P.pop():m.matches.pop()}else g=x.matches.pop();if(g.isAlternator)P.push(g);else if(g.alternatorGroup?(h=P.pop(),g.alternatorGroup=!1):h=new o(!1,!1,!1,!0),h.matches.push(g),P.push(h),g.openGroup){g.openGroup=!1;var _=new o(!0);_.alternatorGroup=!0,P.push(_)}break;default:c()}}for(;P.length>0;)d=P.pop(),x.matches.push(d);return x.matches.length>0&&(l(x),S.push(x)),(r.numericInput||r.isRTL)&&u(S[0]),S}},i.extendDefaults=function(t){e.extend(!0,i.prototype.defaults,t)},i.extendDefinitions=function(t){e.extend(!0,i.prototype.definitions,t)},i.extendAliases=function(t){e.extend(!0,i.prototype.aliases,t)},i.format=function(e,t,n){return i(t).format(e,n)},i.unmask=function(e,t){return i(t).unmaskedvalue(e)},i.isValid=function(e,t){return i(t).isValid(e)},i.remove=function(t){e.each(t,function(e,t){t.inputmask&&t.inputmask.remove()})},i.escapeRegex=function(e){var t=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];return e.replace(new RegExp("(\\"+t.join("|\\")+")","gim"),"\\$1")},i.keyCode={ALT:18,BACKSPACE:8,BACKSPACE_SAFARI:127,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91,X:88},i})},function(e,t){e.exports=jQuery},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}n(4),n(9),n(12),n(13),n(14),n(15);var i=a(n(1)),r=a(n(0)),o=a(n(2));r.default===o.default&&n(16),window.Inputmask=i.default},function(e,t,n){var a=n(5);"string"==typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0};i.transform=void 0;n(7)(a,i);a.locals&&(e.exports=a.locals)},function(e,t,n){(e.exports=n(6)(void 0)).push([e.i,"span.im-caret {\r\n    -webkit-animation: 1s blink step-end infinite;\r\n    animation: 1s blink step-end infinite;\r\n}\r\n\r\n@keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\nspan.im-static {\r\n    color: grey;\r\n}\r\n\r\ndiv.im-colormask {\r\n    display: inline-block;\r\n    border-style: inset;\r\n    border-width: 2px;\r\n    -webkit-appearance: textfield;\r\n    -moz-appearance: textfield;\r\n    appearance: textfield;\r\n}\r\n\r\ndiv.im-colormask > input {\r\n    position: absolute;\r\n    display: inline-block;\r\n    background-color: transparent;\r\n    color: transparent;\r\n    -webkit-appearance: caret;\r\n    -moz-appearance: caret;\r\n    appearance: caret;\r\n    border-style: none;\r\n    left: 0; /*calculated*/\r\n}\r\n\r\ndiv.im-colormask > input:focus {\r\n    outline: none;\r\n}\r\n\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > input::selection{\r\n    background: none;\r\n}\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > div {\r\n    color: black;\r\n    display: inline-block;\r\n    width: 100px; /*calculated*/\r\n}",""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=a(i),o=i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"});return[n].concat(o).concat([r]).join("\n")}return[n].join("\n")}function a(e){return"/*# "+("sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e)))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var a=n(t,e);return t[2]?"@media "+t[2]+"{"+a+"}":a}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var a={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(a[r]=!0)}for(i=0;i<e.length;i++){var o=e[i];"number"==typeof o[0]&&a[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),t.push(o))}},t}},function(e,t,n){function a(e,t){for(var n=0;n<e.length;n++){var a=e[n],i=m[a.id];if(i){i.refs++;for(o=0;o<i.parts.length;o++)i.parts[o](a.parts[o]);for(;o<a.parts.length;o++)i.parts.push(u(a.parts[o],t))}else{for(var r=[],o=0;o<a.parts.length;o++)r.push(u(a.parts[o],t));m[a.id]={id:a.id,refs:1,parts:r}}}}function i(e,t){for(var n=[],a={},i=0;i<e.length;i++){var r=e[i],o=t.base?r[0]+t.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};a[o]?a[o].parts.push(s):n.push(a[o]={id:o,parts:[s]})}return n}function r(e,t){var n=g(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=k[k.length-1];if("top"===e.insertAt)a?a.nextSibling?n.insertBefore(t,a.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),k.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=g(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,i)}}function o(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=k.indexOf(e);t>=0&&k.splice(t,1)}function s(e){var t=document.createElement("style");return e.attrs.type="text/css",c(t,e.attrs),r(e,t),t}function l(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",c(t,e.attrs),r(e,t),t}function c(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function u(e,t){var n,a,i,r;if(t.transform&&e.css){if(!(r=t.transform(e.css)))return function(){};e.css=r}if(t.singleton){var c=y++;n=v||(v=s(t)),a=p.bind(null,n,c,!1),i=p.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),a=d.bind(null,n,t),i=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),a=f.bind(null,n),i=function(){o(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else i()}}function p(e,t,n,a){var i=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=x(t,i);else{var r=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(r,o[t]):e.appendChild(r)}}function f(e,t){var n=t.css,a=t.media;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function d(e,t,n){var a=n.css,i=n.sourceMap,r=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||r)&&(a=b(a)),i&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var o=new Blob([a],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}var m={},h=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),g=function(e){var t={};return function(n){if(void 0===t[n]){var a=e.call(this,n);if(a instanceof window.HTMLIFrameElement)try{a=a.contentDocument.head}catch(e){a=null}t[n]=a}return t[n]}}(function(e){return document.querySelector(e)}),v=null,y=0,k=[],b=n(8);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=h()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=i(e,t);return a(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(l=m[s.id]).refs--,r.push(l)}e&&a(i(e,t),t);for(o=0;o<r.length;o++){var l=r[o];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete m[l.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,a=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return e;var r;return r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:a+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")"})}},function(e,t,n){"use strict";var a,i,r;"function"==typeof Symbol&&Symbol.iterator;!function(o){i=[n(0),n(1)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t){function n(e){return isNaN(e)||29===new Date(e,2,0).getDate()}return t.extendAliases({"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+n+"[01])")},val2:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|[12][0-9])"+n+"(0[1-9]|1[012]))|(30"+n+"(0[13-9]|1[012]))|(31"+n+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(e,t,n){if(isNaN(e))return!1;var a=parseInt(e.concat(t.toString().slice(e.length))),i=parseInt(e.concat(n.toString().slice(e.length)));return!isNaN(a)&&(t<=a&&a<=n)||!isNaN(i)&&(t<=i&&i<=n)},determinebaseyear:function(e,t,n){var a=(new Date).getFullYear();if(e>a)return e;if(t<a){for(var i=t.toString().slice(0,2),r=t.toString().slice(2,4);t<i+n;)i--;var o=i+r;return e>o?e:o}if(e<=a&&a<=t){for(var s=a.toString().slice(0,2);t<s+n;)s--;var l=s+n;return l<e?e:l}return a},onKeyDown:function(n,a,i,r){var o=e(this);if(n.ctrlKey&&n.keyCode===t.keyCode.RIGHT){var s=new Date;o.val(s.getDate().toString()+(s.getMonth()+1).toString()+s.getFullYear().toString()),o.trigger("setvalue")}},getFrontValue:function(e,t,n){for(var a=0,i=0,r=0;r<e.length&&"2"!==e.charAt(r);r++){var o=n.definitions[e.charAt(r)];o?(a+=i,i=o.cardinality):i++}return t.join("").substr(a,i)},postValidation:function(e,t,a){var i,r,o=e.join("");return 0===a.mask.indexOf("y")?(r=o.substr(0,4),i=o.substring(4,10)):(r=o.substring(6,10),i=o.substr(0,6)),t&&(i!==a.leapday||n(r))},definitions:{1:{validator:function(e,t,n,a,i){var r=i.regex.val1.test(e);return a||r||e.charAt(1)!==i.separator&&-1==="-./".indexOf(e.charAt(1))||!(r=i.regex.val1.test("0"+e.charAt(0)))?r:(t.buffer[n-1]="0",{refreshFromBuffer:{start:n-1,end:n},pos:n,c:e.charAt(0)})},cardinality:2,prevalidator:[{validator:function(e,t,n,a,i){var r=e;isNaN(t.buffer[n+1])||(r+=t.buffer[n+1]);var o=1===r.length?i.regex.val1pre.test(r):i.regex.val1.test(r);if(o&&t.validPositions[n]&&(i.regex.val2(i.separator).test(e+t.validPositions[n].input)||(t.validPositions[n].input="0"===e?"1":"0")),!a&&!o){if(o=i.regex.val1.test(e+"0"))return t.buffer[n]=e,t.buffer[++n]="0",{pos:n,c:"0"};if(o=i.regex.val1.test("0"+e))return t.buffer[n]="0",n++,{pos:n}}return o},cardinality:1}]},2:{validator:function(e,t,n,a,i){var r=i.getFrontValue(t.mask,t.buffer,i);-1!==r.indexOf(i.placeholder[0])&&(r="01"+i.separator);var o=i.regex.val2(i.separator).test(r+e);return a||o||e.charAt(1)!==i.separator&&-1==="-./".indexOf(e.charAt(1))||!(o=i.regex.val2(i.separator).test(r+"0"+e.charAt(0)))?o:(t.buffer[n-1]="0",{refreshFromBuffer:{start:n-1,end:n},pos:n,c:e.charAt(0)})},cardinality:2,prevalidator:[{validator:function(e,t,n,a,i){isNaN(t.buffer[n+1])||(e+=t.buffer[n+1]);var r=i.getFrontValue(t.mask,t.buffer,i);-1!==r.indexOf(i.placeholder[0])&&(r="01"+i.separator);var o=1===e.length?i.regex.val2pre(i.separator).test(r+e):i.regex.val2(i.separator).test(r+e);return o&&t.validPositions[n]&&(i.regex.val2(i.separator).test(e+t.validPositions[n].input)||(t.validPositions[n].input="0"===e?"1":"0")),a||o||!(o=i.regex.val2(i.separator).test(r+"0"+e))?o:(t.buffer[n]="0",n++,{pos:n})},cardinality:1}]},y:{validator:function(e,t,n,a,i){return i.isInYearRange(e,i.yearrange.minyear,i.yearrange.maxyear)},cardinality:4,prevalidator:[{validator:function(e,t,n,a,i){var r=i.isInYearRange(e,i.yearrange.minyear,i.yearrange.maxyear);if(!a&&!r){var o=i.determinebaseyear(i.yearrange.minyear,i.yearrange.maxyear,e+"0").toString().slice(0,1);if(r=i.isInYearRange(o+e,i.yearrange.minyear,i.yearrange.maxyear))return t.buffer[n++]=o.charAt(0),{pos:n};if(o=i.determinebaseyear(i.yearrange.minyear,i.yearrange.maxyear,e+"0").toString().slice(0,2),r=i.isInYearRange(o+e,i.yearrange.minyear,i.yearrange.maxyear))return t.buffer[n++]=o.charAt(0),t.buffer[n++]=o.charAt(1),{pos:n}}return r},cardinality:1},{validator:function(e,t,n,a,i){var r=i.isInYearRange(e,i.yearrange.minyear,i.yearrange.maxyear);if(!a&&!r){var o=i.determinebaseyear(i.yearrange.minyear,i.yearrange.maxyear,e).toString().slice(0,2);if(r=i.isInYearRange(e[0]+o[1]+e[1],i.yearrange.minyear,i.yearrange.maxyear))return t.buffer[n++]=o.charAt(1),{pos:n};if(o=i.determinebaseyear(i.yearrange.minyear,i.yearrange.maxyear,e).toString().slice(0,2),r=i.isInYearRange(o+e,i.yearrange.minyear,i.yearrange.maxyear))return t.buffer[n-1]=o.charAt(0),t.buffer[n++]=o.charAt(1),t.buffer[n++]=e.charAt(0),{refreshFromBuffer:{start:n-3,end:n},pos:n}}return r},cardinality:2},{validator:function(e,t,n,a,i){return i.isInYearRange(e,i.yearrange.minyear,i.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+n+"[0-3])|(02"+n+"[0-2])")},val2:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+n+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+n+"30)|((0[13578]|1[02])"+n+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(n,a,i,r){var o=e(this);if(n.ctrlKey&&n.keyCode===t.keyCode.RIGHT){var s=new Date;o.val((s.getMonth()+1).toString()+s.getDate().toString()+s.getFullYear().toString()),o.trigger("setvalue")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(n,a,i,r){var o=e(this);if(n.ctrlKey&&n.keyCode===t.keyCode.RIGHT){var s=new Date;o.val(s.getFullYear().toString()+(s.getMonth()+1).toString()+s.getDate().toString()),o.trigger("setvalue")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(e,t,n,a,i){if("24"===i.hourFormat&&24===parseInt(e,10))return t.buffer[n-1]="0",t.buffer[n]="0",{refreshFromBuffer:{start:n-1,end:n},c:"0"};var r=i.regex.hrs.test(e);if(!a&&!r&&(e.charAt(1)===i.timeseparator||-1!=="-.:".indexOf(e.charAt(1)))&&(r=i.regex.hrs.test("0"+e.charAt(0))))return t.buffer[n-1]="0",t.buffer[n]=e.charAt(0),n++,{refreshFromBuffer:{start:n-2,end:n},pos:n,c:i.timeseparator};if(r&&"24"!==i.hourFormat&&i.regex.hrs24.test(e)){var o=parseInt(e,10);return 24===o?(t.buffer[n+5]="a",t.buffer[n+6]="m"):(t.buffer[n+5]="p",t.buffer[n+6]="m"),(o-=12)<10?(t.buffer[n]=o.toString(),t.buffer[n-1]="0"):(t.buffer[n]=o.toString().charAt(1),t.buffer[n-1]=o.toString().charAt(0)),{refreshFromBuffer:{start:n-1,end:n+6},c:t.buffer[n]}}return r},cardinality:2,prevalidator:[{validator:function(e,t,n,a,i){var r=i.regex.hrspre.test(e);return a||r||!(r=i.regex.hrs.test("0"+e))?r:(t.buffer[n]="0",n++,{pos:n})},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(e,t,n,a,i){var r=i.regex.mspre.test(e);return a||r||!(r=i.regex.ms.test("0"+e))?r:(t.buffer[n]="0",n++,{pos:n})},cardinality:1}]},t:{validator:function(e,t,n,a,i){return i.regex.ampm.test(e+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"mm/dd/yyyy hh:mm xm":{mask:"1/2/y h:s t\\m",placeholder:"mm/dd/yyyy hh:mm xm",alias:"datetime12",regex:{val2pre:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+n+"[0-3])|(02"+n+"[0-2])")},val2:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+n+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+n+"30)|((0[13578]|1[02])"+n+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(n,a,i,r){var o=e(this);if(n.ctrlKey&&n.keyCode===t.keyCode.RIGHT){var s=new Date;o.val((s.getMonth()+1).toString()+s.getDate().toString()+s.getFullYear().toString()),o.trigger("setvalue")}}},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"},shamsi:{regex:{val2pre:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+n+"[0-3])")},val2:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+n+"(0[1-9]|[12][0-9]))|((0[1-9]|1[012])"+n+"30)|((0[1-6])"+n+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},yearrange:{minyear:1300,maxyear:1499},mask:"y/1/2",leapday:"/12/30",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",clearIncomplete:!0},"yyyy-mm-dd hh:mm:ss":{mask:"y-1-2 h:s:s",placeholder:"yyyy-mm-dd hh:mm:ss",alias:"datetime",separator:"-",leapday:"-02-29",regex:{val2pre:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+n+"[0-3])|(02"+n+"[0-2])")},val2:function(e){var n=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+n+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+n+"30)|((0[13578]|1[02])"+n+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},onKeyDown:function(e,t,n,a){}}}),t})},function(e,t,n){"use strict";var a;"function"==typeof Symbol&&Symbol.iterator;void 0!==(a=function(){return window}.call(t,n,t,e))&&(e.exports=a)},function(e,t,n){"use strict";var a;"function"==typeof Symbol&&Symbol.iterator;void 0!==(a=function(){return document}.call(t,n,t,e))&&(e.exports=a)},function(e,t,n){"use strict";var a,i,r;"function"==typeof Symbol&&Symbol.iterator;!function(o){i=[n(0),n(1)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t){return t.extendDefinitions({A:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,casing:"upper"},"&":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,casing:"upper"},"#":{validator:"[0-9A-Fa-f]",cardinality:1,casing:"upper"}}),t.extendAliases({url:{definitions:{i:{validator:".",cardinality:1}},mask:"(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",insertMode:!1,autoUnmask:!1,inputmode:"url"},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(e,t,n,a,i){return n-1>-1&&"."!==t.buffer[n-1]?(e=t.buffer[n-1]+e,e=n-2>-1&&"."!==t.buffer[n-2]?t.buffer[n-2]+e:"0"+e):e="00"+e,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e)},cardinality:1}},onUnMask:function(e,t,n){return e},inputmode:"numeric"},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",greedy:!1,onBeforePaste:function(e,t){return(e=e.toLowerCase()).replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"},"-":{validator:"[0-9A-Za-z-]",cardinality:1,casing:"lower"}},onUnMask:function(e,t,n){return e},inputmode:"email"},mac:{mask:"##:##:##:##:##:##"},vin:{mask:"V{13}9{4}",definitions:{V:{validator:"[A-HJ-NPR-Za-hj-npr-z\\d]",cardinality:1,casing:"upper"}},clearIncomplete:!0,autoUnmask:!0}}),t})},function(e,t,n){"use strict";var a,i,r;"function"==typeof Symbol&&Symbol.iterator;!function(o){i=[n(0),n(1)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t,n){function a(e,n){for(var a="",i=0;i<e.length;i++)t.prototype.definitions[e.charAt(i)]||n.definitions[e.charAt(i)]||n.optionalmarker.start===e.charAt(i)||n.optionalmarker.end===e.charAt(i)||n.quantifiermarker.start===e.charAt(i)||n.quantifiermarker.end===e.charAt(i)||n.groupmarker.start===e.charAt(i)||n.groupmarker.end===e.charAt(i)||n.alternatormarker===e.charAt(i)?a+="\\"+e.charAt(i):a+=e.charAt(i);return a}return t.extendAliases({numeric:{mask:function(e){if(0!==e.repeat&&isNaN(e.integerDigits)&&(e.integerDigits=e.repeat),e.repeat=0,e.groupSeparator===e.radixPoint&&("."===e.radixPoint?e.groupSeparator=",":","===e.radixPoint?e.groupSeparator=".":e.groupSeparator="")," "===e.groupSeparator&&(e.skipOptionalPartCharacter=n),e.autoGroup=e.autoGroup&&""!==e.groupSeparator,e.autoGroup&&("string"==typeof e.groupSize&&isFinite(e.groupSize)&&(e.groupSize=parseInt(e.groupSize)),isFinite(e.integerDigits))){var t=Math.floor(e.integerDigits/e.groupSize),i=e.integerDigits%e.groupSize;e.integerDigits=parseInt(e.integerDigits)+(0===i?t-1:t),e.integerDigits<1&&(e.integerDigits="*")}e.placeholder.length>1&&(e.placeholder=e.placeholder.charAt(0)),"radixFocus"===e.positionCaretOnClick&&""===e.placeholder&&!1===e.integerOptional&&(e.positionCaretOnClick="lvp"),e.definitions[";"]=e.definitions["~"],e.definitions[";"].definitionSymbol="~",!0===e.numericInput&&(e.positionCaretOnClick="radixFocus"===e.positionCaretOnClick?"lvp":e.positionCaretOnClick,e.digitsOptional=!1,isNaN(e.digits)&&(e.digits=2),e.decimalProtect=!1);var r="[+]";if(r+=a(e.prefix,e),!0===e.integerOptional?r+="~{1,"+e.integerDigits+"}":r+="~{"+e.integerDigits+"}",e.digits!==n){e.radixPointDefinitionSymbol=e.decimalProtect?":":e.radixPoint;var o=e.digits.toString().split(",");isFinite(o[0]&&o[1]&&isFinite(o[1]))?r+=e.radixPointDefinitionSymbol+";{"+e.digits+"}":(isNaN(e.digits)||parseInt(e.digits)>0)&&(e.digitsOptional?r+="["+e.radixPointDefinitionSymbol+";{1,"+e.digits+"}]":r+=e.radixPointDefinitionSymbol+";{"+e.digits+"}")}return r+=a(e.suffix,e),r+="[-]",e.greedy=!1,r},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,enforceDigitsOnBlur:!1,radixPoint:".",positionCaretOnClick:"radixFocus",groupSize:3,groupSeparator:"",autoGroup:!1,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",integerOptional:!0,prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:null,max:null,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,inputmode:"numeric",preValidation:function(t,a,i,r,o){if("-"===i||i===o.negationSymbol.front)return!0===o.allowMinus&&(o.isNegative=o.isNegative===n||!o.isNegative,""===t.join("")||{caret:a,dopost:!0});if(!1===r&&i===o.radixPoint&&o.digits!==n&&(isNaN(o.digits)||parseInt(o.digits)>0)){var s=e.inArray(o.radixPoint,t);if(-1!==s)return!0===o.numericInput?a===s:{caret:s+1}}return!0},postValidation:function(a,i,r){var o=r.suffix.split(""),s=r.prefix.split("");if(i.pos===n&&i.caret!==n&&!0!==i.dopost)return i;var l=i.caret!==n?i.caret:i.pos,c=a.slice();r.numericInput&&(l=c.length-l-1,c=c.reverse());var u=c[l];if(u===r.groupSeparator&&(u=c[l+=1]),l===c.length-r.suffix.length-1&&u===r.radixPoint)return i;u!==n&&u!==r.radixPoint&&u!==r.negationSymbol.front&&u!==r.negationSymbol.back&&(c[l]="?",r.prefix.length>0&&l>=(!1===r.isNegative?1:0)&&l<r.prefix.length-1+(!1===r.isNegative?1:0)?s[l-(!1===r.isNegative?1:0)]="?":r.suffix.length>0&&l>=c.length-r.suffix.length-(!1===r.isNegative?1:0)&&(o[l-(c.length-r.suffix.length-(!1===r.isNegative?1:0))]="?")),s=s.join(""),o=o.join("");var p=c.join("").replace(s,"");if(p=p.replace(o,""),p=p.replace(new RegExp(t.escapeRegex(r.groupSeparator),"g"),""),p=p.replace(new RegExp("[-"+t.escapeRegex(r.negationSymbol.front)+"]","g"),""),p=p.replace(new RegExp(t.escapeRegex(r.negationSymbol.back)+"$"),""),isNaN(r.placeholder)&&(p=p.replace(new RegExp(t.escapeRegex(r.placeholder),"g"),"")),p.length>1&&1!==p.indexOf(r.radixPoint)&&("0"===u&&(p=p.replace(/^\?/g,"")),p=p.replace(/^0/g,"")),p.charAt(0)===r.radixPoint&&""!==r.radixPoint&&!0!==r.numericInput&&(p="0"+p),""!==p){if(p=p.split(""),(!r.digitsOptional||r.enforceDigitsOnBlur&&"blur"===i.event)&&isFinite(r.digits)){var f=e.inArray(r.radixPoint,p),d=e.inArray(r.radixPoint,c);-1===f&&(p.push(r.radixPoint),f=p.length-1);for(var m=1;m<=r.digits;m++)r.digitsOptional&&(!r.enforceDigitsOnBlur||"blur"!==i.event)||p[f+m]!==n&&p[f+m]!==r.placeholder.charAt(0)?-1!==d&&c[d+m]!==n&&(p[f+m]=p[f+m]||c[d+m]):p[f+m]=i.placeholder||r.placeholder.charAt(0)}if(!0!==r.autoGroup||""===r.groupSeparator||u===r.radixPoint&&i.pos===n&&!i.dopost)p=p.join("");else{var h=p[p.length-1]===r.radixPoint&&i.c===r.radixPoint;p=t(function(e,t){var n="";if(n+="("+t.groupSeparator+"*{"+t.groupSize+"}){*}",""!==t.radixPoint){var a=e.join("").split(t.radixPoint);a[1]&&(n+=t.radixPoint+"*{"+a[1].match(/^\d*\??\d*/)[0].length+"}")}return n}(p,r),{numericInput:!0,jitMasking:!0,definitions:{"*":{validator:"[0-9?]",cardinality:1}}}).format(p.join("")),h&&(p+=r.radixPoint),p.charAt(0)===r.groupSeparator&&p.substr(1)}}if(r.isNegative&&"blur"===i.event&&(r.isNegative="0"!==p),p=s+p,p+=o,r.isNegative&&(p=r.negationSymbol.front+p,p+=r.negationSymbol.back),p=p.split(""),u!==n)if(u!==r.radixPoint&&u!==r.negationSymbol.front&&u!==r.negationSymbol.back)(l=e.inArray("?",p))>-1?p[l]=u:l=i.caret||0;else if(u===r.radixPoint||u===r.negationSymbol.front||u===r.negationSymbol.back){var g=e.inArray(u,p);-1!==g&&(l=g)}r.numericInput&&(l=p.length-l-1,p=p.reverse());var v={caret:u===n||i.pos!==n?l+(r.numericInput?-1:1):l,buffer:p,refreshFromBuffer:i.dopost||a.join("")!==p.join("")};return v.refreshFromBuffer?v:i},onBeforeWrite:function(a,i,r,o){if(a)switch(a.type){case"keydown":return o.postValidation(i,{caret:r,dopost:!0},o);case"blur":case"checkval":var s;if(function(e){e.parseMinMaxOptions===n&&(null!==e.min&&(e.min=e.min.toString().replace(new RegExp(t.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.min=e.min.replace(e.radixPoint,".")),e.min=isFinite(e.min)?parseFloat(e.min):NaN,isNaN(e.min)&&(e.min=Number.MIN_VALUE)),null!==e.max&&(e.max=e.max.toString().replace(new RegExp(t.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.max=e.max.replace(e.radixPoint,".")),e.max=isFinite(e.max)?parseFloat(e.max):NaN,isNaN(e.max)&&(e.max=Number.MAX_VALUE)),e.parseMinMaxOptions="done")}(o),null!==o.min||null!==o.max){if(s=o.onUnMask(i.join(""),n,e.extend({},o,{unmaskAsNumber:!0})),null!==o.min&&s<o.min)return o.isNegative=o.min<0,o.postValidation(o.min.toString().replace(".",o.radixPoint).split(""),{caret:r,dopost:!0,placeholder:"0"},o);if(null!==o.max&&s>o.max)return o.isNegative=o.max<0,o.postValidation(o.max.toString().replace(".",o.radixPoint).split(""),{caret:r,dopost:!0,placeholder:"0"},o)}return o.postValidation(i,{caret:r,placeholder:"0",event:"blur"},o);case"_checkval":return{caret:r}}},regex:{integerPart:function(e,n){return n?new RegExp("["+t.escapeRegex(e.negationSymbol.front)+"+]?"):new RegExp("["+t.escapeRegex(e.negationSymbol.front)+"+]?\\d+")},integerNPart:function(e){return new RegExp("[\\d"+t.escapeRegex(e.groupSeparator)+t.escapeRegex(e.placeholder.charAt(0))+"]+")}},definitions:{"~":{validator:function(e,a,i,r,o,s){var l=r?new RegExp("[0-9"+t.escapeRegex(o.groupSeparator)+"]").test(e):new RegExp("[0-9]").test(e);if(!0===l){if(!0!==o.numericInput&&a.validPositions[i]!==n&&"~"===a.validPositions[i].match.def&&!s){var c=a.buffer.join(""),u=(c=(c=c.replace(new RegExp("[-"+t.escapeRegex(o.negationSymbol.front)+"]","g"),"")).replace(new RegExp(t.escapeRegex(o.negationSymbol.back)+"$"),"")).split(o.radixPoint);u.length>1&&(u[1]=u[1].replace(/0/g,o.placeholder.charAt(0))),"0"===u[0]&&(u[0]=u[0].replace(/0/g,o.placeholder.charAt(0))),c=u[0]+o.radixPoint+u[1]||"";var p=a._buffer.join("");for(c===o.radixPoint&&(c=p);null===c.match(t.escapeRegex(p)+"$");)p=p.slice(1);l=(c=(c=c.replace(p,"")).split(""))[i]===n?{pos:i,remove:i}:{pos:i}}}else r||e!==o.radixPoint||a.validPositions[i-1]!==n||(a.buffer[i]="0",l={pos:i+1});return l},cardinality:1},"+":{validator:function(e,t,n,a,i){return i.allowMinus&&("-"===e||e===i.negationSymbol.front)},cardinality:1,placeholder:""},"-":{validator:function(e,t,n,a,i){return i.allowMinus&&e===i.negationSymbol.back},cardinality:1,placeholder:""},":":{validator:function(e,n,a,i,r){var o="["+t.escapeRegex(r.radixPoint)+"]",s=new RegExp(o).test(e);return s&&n.validPositions[a]&&n.validPositions[a].match.placeholder===r.radixPoint&&(s={caret:a+1}),s},cardinality:1,placeholder:function(e){return e.radixPoint}}},onUnMask:function(e,n,a){if(""===n&&!0===a.nullable)return n;var i=e.replace(a.prefix,"");return i=i.replace(a.suffix,""),i=i.replace(new RegExp(t.escapeRegex(a.groupSeparator),"g"),""),""!==a.placeholder.charAt(0)&&(i=i.replace(new RegExp(a.placeholder.charAt(0),"g"),"0")),a.unmaskAsNumber?(""!==a.radixPoint&&-1!==i.indexOf(a.radixPoint)&&(i=i.replace(t.escapeRegex.call(this,a.radixPoint),".")),i=i.replace(new RegExp("^"+t.escapeRegex(a.negationSymbol.front)),"-"),i=i.replace(new RegExp(t.escapeRegex(a.negationSymbol.back)+"$"),""),Number(i)):i},isComplete:function(e,n){var a=e.join("");if(e.slice().join("")!==a)return!1;var i=a.replace(n.prefix,"");return i=i.replace(n.suffix,""),i=i.replace(new RegExp(t.escapeRegex(n.groupSeparator),"g"),""),","===n.radixPoint&&(i=i.replace(t.escapeRegex(n.radixPoint),".")),isFinite(i)},onBeforeMask:function(e,a){if(a.isNegative=n,e=e.toString().charAt(e.length-1)===a.radixPoint?e.toString().substr(0,e.length-1):e.toString(),""!==a.radixPoint&&isFinite(e)){var i=e.split("."),r=""!==a.groupSeparator?parseInt(a.groupSize):0;2===i.length&&(i[0].length>r||i[1].length>r||i[0].length<=r&&i[1].length<r)&&(e=e.replace(".",a.radixPoint))}var o=e.match(/,/g),s=e.match(/\./g);if(e=s&&o?s.length>o.length?(e=e.replace(/\./g,"")).replace(",",a.radixPoint):o.length>s.length?(e=e.replace(/,/g,"")).replace(".",a.radixPoint):e.indexOf(".")<e.indexOf(",")?e.replace(/\./g,""):e.replace(/,/g,""):e.replace(new RegExp(t.escapeRegex(a.groupSeparator),"g"),""),0===a.digits&&(-1!==e.indexOf(".")?e=e.substring(0,e.indexOf(".")):-1!==e.indexOf(",")&&(e=e.substring(0,e.indexOf(",")))),""!==a.radixPoint&&isFinite(a.digits)&&-1!==e.indexOf(a.radixPoint)){var l=e.split(a.radixPoint)[1].match(new RegExp("\\d*"))[0];if(parseInt(a.digits)<l.toString().length){var c=Math.pow(10,parseInt(a.digits));e=e.replace(t.escapeRegex(a.radixPoint),"."),e=(e=Math.round(parseFloat(e)*c)/c).toString().replace(".",a.radixPoint)}}return e},canClearPosition:function(e,t,n,a,i){var r=e.validPositions[t],o=r.input!==i.radixPoint||null!==e.validPositions[t].match.fn&&!1===i.decimalProtect||r.input===i.radixPoint&&e.validPositions[t+1]&&null===e.validPositions[t+1].match.fn||isFinite(r.input)||t===n||r.input===i.groupSeparator||r.input===i.negationSymbol.front||r.input===i.negationSymbol.back;return!o||"+"!==r.match.nativeDef&&"-"!==r.match.nativeDef||(i.isNegative=!1),o},onKeyDown:function(n,a,i,r){var o=e(this);if(n.ctrlKey)switch(n.keyCode){case t.keyCode.UP:o.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(r.step)),o.trigger("setvalue");break;case t.keyCode.DOWN:o.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(r.step)),o.trigger("setvalue")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,digitsOptional:!0,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowMinus:!1}}),t})},function(e,t,n){"use strict";var a,i,r;"function"==typeof Symbol&&Symbol.iterator;!function(o){i=[n(0),n(1)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t){function n(e,t){var n=(e.mask||e).replace(/#/g,"9").replace(/\)/,"9").replace(/[+()#-]/g,""),a=(t.mask||t).replace(/#/g,"9").replace(/\)/,"9").replace(/[+()#-]/g,""),i=(e.mask||e).split("#")[0],r=(t.mask||t).split("#")[0];return 0===r.indexOf(i)?-1:0===i.indexOf(r)?1:n.localeCompare(a)}var a=t.prototype.analyseMask;return t.prototype.analyseMask=function(t,n,i){function r(e,n,a){n=n||"",a=a||s,""!==n&&(a[n]={});for(var i="",o=a[n]||a,l=e.length-1;l>=0;l--)o[i=(t=e[l].mask||e[l]).substr(0,1)]=o[i]||[],o[i].unshift(t.substr(1)),e.splice(l,1);for(var c in o)o[c].length>500&&r(o[c].slice(),c,o)}function o(t){var n="",a=[];for(var r in t)e.isArray(t[r])?1===t[r].length?a.push(r+t[r]):a.push(r+i.groupmarker.start+t[r].join(i.groupmarker.end+i.alternatormarker+i.groupmarker.start)+i.groupmarker.end):a.push(r+o(t[r]));return 1===a.length?n+=a[0]:n+=i.groupmarker.start+a.join(i.groupmarker.end+i.alternatormarker+i.groupmarker.start)+i.groupmarker.end,n}var s={};return i.phoneCodes&&(i.phoneCodes&&i.phoneCodes.length>1e3&&(r((t=t.substr(1,t.length-2)).split(i.groupmarker.end+i.alternatormarker+i.groupmarker.start)),t=o(s)),t=t.replace(/9/g,"\\9")),a.call(this,t,n,i)},t.extendAliases({abstractphone:{groupmarker:{start:"<",end:">"},countrycode:"",phoneCodes:[],mask:function(e){return e.definitions={"#":t.prototype.definitions[9]},e.phoneCodes.sort(n)},keepStatic:!0,onBeforeMask:function(e,t){var n=e.replace(/^0{1,2}/,"").replace(/[\s]/g,"");return(n.indexOf(t.countrycode)>1||-1===n.indexOf(t.countrycode))&&(n="+"+t.countrycode+n),n},onUnMask:function(e,t,n){return e.replace(/[()#-]/g,"")},inputmode:"tel"}}),t})},function(e,t,n){"use strict";var a,i,r;"function"==typeof Symbol&&Symbol.iterator;!function(o){i=[n(0),n(1)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t){return t.extendAliases({Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(e,t){return new RegExp(t.regex,t.casing?"i":"").test(e.join(""))},definitions:{r:{validator:function(t,n,a,i,r){function o(e,t){this.matches=[],this.isGroup=e||!1,this.isQuantifier=t||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function s(t,n){var a=!1;n&&(p+="(",d++);for(var i=0;i<t.matches.length;i++){var o=t.matches[i];if(!0===o.isGroup)a=s(o,!0);else if(!0===o.isQuantifier){var c=e.inArray(o,t.matches),u=t.matches[c-1],f=p;if(isNaN(o.quantifier.max)){for(;o.repeaterPart&&o.repeaterPart!==p&&o.repeaterPart.length>p.length&&!(a=s(u,!0)););(a=a||s(u,!0))&&(o.repeaterPart=p),p=f+o.quantifier.max}else{for(var m=0,h=o.quantifier.max-1;m<h&&!(a=s(u,!0));m++);p=f+"{"+o.quantifier.min+","+o.quantifier.max+"}"}}else if(void 0!==o.matches)for(var g=0;g<o.length&&!(a=s(o[g],n));g++);else{var v;if("["==o.charAt(0)){v=p,v+=o;for(b=0;b<d;b++)v+=")";a=(x=new RegExp("^("+v+")$",r.casing?"i":"")).test(l)}else for(var y=0,k=o.length;y<k;y++)if("\\"!==o.charAt(y)){v=p,v=(v+=o.substr(0,y+1)).replace(/\|$/,"");for(var b=0;b<d;b++)v+=")";var x=new RegExp("^("+v+")$",r.casing?"i":"");if(a=x.test(l))break}p+=o}if(a)break}return n&&(p+=")",d--),a}var l,c,u=n.buffer.slice(),p="",f=!1,d=0;null===r.regexTokens&&function(){var e,t,n=new o,a=[];for(r.regexTokens=[];e=r.tokenizer.exec(r.regex);)switch((t=e[0]).charAt(0)){case"(":a.push(new o(!0));break;case")":c=a.pop(),a.length>0?a[a.length-1].matches.push(c):n.matches.push(c);break;case"{":case"+":case"*":var i=new o(!1,!0),s=(t=t.replace(/[{}]/g,"")).split(","),l=isNaN(s[0])?s[0]:parseInt(s[0]),u=1===s.length?l:isNaN(s[1])?s[1]:parseInt(s[1]);if(i.quantifier={min:l,max:u},a.length>0){var p=a[a.length-1].matches;(e=p.pop()).isGroup||((c=new o(!0)).matches.push(e),e=c),p.push(e),p.push(i)}else(e=n.matches.pop()).isGroup||((c=new o(!0)).matches.push(e),e=c),n.matches.push(e),n.matches.push(i);break;default:a.length>0?a[a.length-1].matches.push(t):n.matches.push(t)}n.matches.length>0&&r.regexTokens.push(n)}(),u.splice(a,0,t),l=u.join("");for(var m=0;m<r.regexTokens.length;m++){var h=r.regexTokens[m];if(f=s(h,h.isGroup))break}return f},cardinality:1}}}}),t})},function(e,t,n){"use strict";var a,i,r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(o){i=[n(2),n(1)],void 0!==(r="function"==typeof(a=o)?a.apply(t,i):a)&&(e.exports=r)}(function(e,t){return void 0===e.fn.inputmask&&(e.fn.inputmask=function(n,a){var i,r=this[0];if(void 0===a&&(a={}),"string"==typeof n)switch(n){case"unmaskedvalue":return r&&r.inputmask?r.inputmask.unmaskedvalue():e(r).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":return r&&r.inputmask?r.inputmask.getemptymask():"";case"hasMaskedValue":return!(!r||!r.inputmask)&&r.inputmask.hasMaskedValue();case"isComplete":return!r||!r.inputmask||r.inputmask.isComplete();case"getmetadata":return r&&r.inputmask?r.inputmask.getmetadata():void 0;case"setvalue":e(r).val(a),r&&void 0===r.inputmask&&e(r).triggerHandler("setvalue");break;case"option":if("string"!=typeof a)return this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(a)});if(r&&void 0!==r.inputmask)return r.inputmask.option(a);break;default:return a.alias=n,i=new t(a),this.each(function(){i.mask(this)})}else{if("object"==(void 0===n?"undefined":o(n)))return i=new t(n),void 0===n.mask&&void 0===n.alias?this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(n);i.mask(this)}):this.each(function(){i.mask(this)});if(void 0===n)return this.each(function(){(i=new t(a)).mask(this)})}}),e.fn.inputmask})}]);
/*
js185188 - 24.06.2015
sb185131 - 01.07.2015
Phone Formatter Class, this class works only for freeform phone numbers

Parameters
    controls - requires the input controls to attach formatting methods
    freeFormMaxLength - max length
    freeFormMinDigits - minimum number of digits
    freeFormFormatChars - mask format e.g. (63) (917) 301 - 5688
    freeFormRegEx - regex validation for allowed input

Usage
    var controls = $("input[PhoneMask=true]");
    var freeFormMaxLength = '@PhoneFormat.MaxLength';
    var freeFormMinDigits = '@PhoneFormat.MinDigits';
    var freeFormFormatChars = '@PhoneFormat.FormatChars';
    var freeFormRegEx = '@PhoneFormat.FormatRegEx';
    var phone = new phoneCtrls(controls, freeFormMaxLength, freeFormMinDigits, freeFormFormatChars, freeFormRegEx);
    phone.bind(phone.getFreeFormatRegEx(), phone.getFreeFormFormatChars());
    phone.setMaxLength();
    phone.setErrorRequiredMsg(GetResourceObject('WebOrder.PhoneNumberInput.PhoneRequiredError'));
    phone.setErrorInvalidFormatMsg(GetResourceObject('WebOrder.PhoneNumberInput.PhoneNotValidError'));
*/

var phoneCtrls = function (controls, freeFormMaxLength, freeFormMinDigits, freeFormFormatChars, freeFormRegEx) {
    var parent = this;
    var errorRequired = '';
    var errorInvalidForm = '';
    var errMsgs = '';
    
    this.getFreeFormMaxLength = function () {
        return freeFormMaxLength;
    };

    this.getFreeFormMinDigits = function () {
        return freeFormMinDigits;
    };

    this.getFreeFormFormatChars = function () {
        return freeFormFormatChars;
    };

    this.getFreeFormatRegEx = function () {
        return freeFormRegEx;
    };

    this.bind = function (freeFormRegEx, freeFormFormatChars) {
        //set formatting on load
        $.each(controls, function (index, control) {
            if ($(control) != null && $(control).val() != null && $(control).val() != undefined) {
                parent.applyPhoneMask($(control), freeFormRegEx, freeFormFormatChars);
            }
        });

        //set formatting on keypress
        controls.bind('keydown keypress keyup blur', function () {
            parent.applyPhoneMask(this, freeFormRegEx, freeFormFormatChars);
        });
    };

    this.setMaxLength = function () {
        controls.attr('maxlength', this.getFreeFormMaxLength());
    };

    this.setErrorRequiredMsg = function (value) {
        errorRequired = value;
    };

    this.setErrorInvalidFormatMsg = function (value) {
        errorInvalidForm = value;
    };

    this.applyPhoneMask = function (control, regex, pattern) {
        if (regex.length <= 0 || pattern.length <= 0)
            return true;
        
        var inputVal = $(control).is('input') ? $(control).val() : $(control).text();
        var value = this.phoneFormat(inputVal, new RegExp(regex), pattern);
        if (value != inputVal) {
            if ($(control).is('input'))
                $(control).val(value);
            else
                $(control).text(value);
        }
    };

    this.phoneFormat = function (val, reg, pat) {
        var newVal = val.replace(/\D/g, "");
        newVal = newVal.replace(reg, pat);
        return newVal;
    };

    this.clientValidation = function (control) {

        if ($(control) == null)
            return true;

        var isValid = false;
        var allowEmpty = /true/i.test($(control).attr('allowempty'));
        var value = $(control).val();

        if (allowEmpty == null)
            return isValid = true;

        if (!allowEmpty && value.length == 0) {
            isValid = false;
            errMsgs = errorRequired;
            return isValid;
        }

        if (!allowEmpty && value.length > 0) {
            isValid = this.freeFormPhoneLogicCheck(value);

            if (!isValid) {
                errMsgs = errorInvalidForm;
                return isValid;
            }
        }
        else {
            if (value.length === 0) {
                isValid = true;
            }
            else {
                isValid = this.freeFormPhoneLogicCheck(value);

                if (!isValid) {
                    errMsgs = errorInvalidForm;
                    return isValid;
                }
            }
        }

        return isValid;
    };


    this.regexEsc = function (s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    this.freeFormPhoneLogicCheck = function (freeFormPhoneNumber) {
        var isValid = false;

        var maxLength = parent.getFreeFormMaxLength();
        var minDigit = parent.getFreeFormMinDigits();

        if (freeFormPhoneNumber.length >= minDigit && freeFormPhoneNumber.length <= maxLength) {

            var digitCount = freeFormPhoneNumber.replace(/\D/g, "").length;
            var esc = this.regexEsc(parent.getFreeFormFormatChars());
            var regex = new RegExp("^[0-9," + esc + "]+$");                    
            var allAllowedChar = regex.test(freeFormPhoneNumber);

            if (digitCount >= parent.getFreeFormMinDigits() && allAllowedChar) {
                isValid = true;
            }            
        }
        return isValid;
    };

    this.getErrorMsg = function () {
        return errMsgs;
    };
};
function isAlphabetNumeric(Data){
    var iCount,iDataLen;
    var Compare = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,";
    var cData;
    
    if (Data.length > 0) {
        for (var iCount=0; iCount < Data.length; iCount++)  {
            cData = Data.charAt(iCount);
            if (Compare.indexOf(cData) < 0) {

                alert(FormatResourceString(GetResourceObject("WebOrder.Util.NonAlphaNumericMessage"), cData));
                return false;
            }
        }
     }
     return true;
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function deletecookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//
// Append a cookie name/value pair to the collection. Note that this doesn't
// replace an existing value for a pre-existing cookie name.
//
function setSessionCookie(c_name, value) 
{
    document.cookie = c_name + "=" + escape(value);
}

//
// GENERIC FAILED WEB SERVICE CALLBACK
//
function GetWebServiceFailed(result, userContext) 
{
    if ((result.message != null) && (result.message== "SessionTimeout"))
    {
        SessionExpired();
    }

    if (window.location.pathname.toLowerCase().indexOf("error.aspx") < 0)
    {
        window.location = "Error.aspx?ErrorCode=1&Details=GetWebServiceFailed-" + result.message;
    }
/* Debugging functionality
    var msg = String.format("statusCode={0}\r\nexceptionType={1}\r\ntimedOut={2}\r\nmessage={3}\r\nstackTrace={4}",
    result.get_statusCode(), result.get_exceptionType(), result.get_timedOut(), result.get_message(), result.get_stackTrace());
    var userContext = "";
    alert(userContext + " Failed!!! " + msg);
*/
}

function getEventTarget(event)
{
    return event.target || event.srcElement;
}

function FailIfEnterKey(e)
{
    var key;
    if (window.event)
        key = window.event.keyCode; //IE
    else
        key = e.which; //firefox

    return (key != 13);
}

function CurrencyFormattedSuppressZero(amount) {
    var result = CurrencyFormatted(amount);
    return (result == CurrencyFormatted(0.00)) ? "" : result;
}

function CurrencyFormatted(amount) {

    amount = ConvertAmountToDecimalPeriodFormat(amount);

    var i = parseFloat(amount);
    if (isNaN(i)) { i = 0.00; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) { s += '.00'; }
    if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;

    s = ConvertToCurrentCultureCurrencyFormat(s);

    return FormatCurrencyPosition(s);
}

//Expected to get the same amount in the following format: xxxxxx.yyy
//There should be no special characters except one decimal.
function ConvertAmountToDecimalPeriodFormat(amount) {
    var testUSNumberFormat = Number(amount).toLocaleString('en-US');//force to use decimalSeparator
    if (isNaN(testUSNumberFormat) || "NaN" == testUSNumberFormat) {//when amount cannot be converted into US format, it returns a string "NaN"
        //Replace comma with periodo as decimal separtor
        amount = amount.toString().replace(/,/g, '.');
    } else {
        amount = testUSNumberFormat.replace(/,/g, '');//when number is big, remove commas
    }
    return amount;
}

function ConvertDecimalValueToUSFormat(dValue) {
    if (typeof window.GetCultureCode == 'function') {
        var numberDecimalSeparator = window.GetCultureCurrencyDecimalSeparator();
        if (numberDecimalSeparator !== '.') {
            dValue = dValue.replace(numberDecimalSeparator, ".");
        }
    }
    return dValue;
}

function ConvertToCurrentCultureCurrencyFormat(amount) {
    if (typeof window.GetCultureCode == 'function') {
        var cultureCode = window.GetCultureCode();

        //Test currency to find out if the decimal separator is a comma
        var testCommaInsteadPeriodNumber = new String(parseFloat("1.25").toLocaleString(cultureCode));

        //Default decimal separator
        var decimalSeparator = '.';

        if (testCommaInsteadPeriodNumber.substring(1, 2) === ",") {
            decimalSeparator = window.GetCultureCurrencyDecimalSeparator();
            //Format amount to the current culture with comma decimal separator
            amount = amount.toString().replace(".", decimalSeparator);
        }

        //Add zeros to have two decimal after parsing
        if (amount.indexOf(decimalSeparator) < 0) {amount += decimalSeparator + '00';}
        if (amount.indexOf(decimalSeparator) === (amount.length - 2)) {amount += '0';}
    }
    return amount;
}

function FormatCurrencyPosition(amount) {
    var isCurrSymbolLeft = /true/i.test(IsCurrencyPositionLeft());
    var amt = (isCurrSymbolLeft) ? CurrencySymbol + amount.toString() : amount.toString() + CurrencySymbol;
    return amt;
}

function IsEmpty(myVar) {  // todo: improve to use trim()
    if ((myVar == "") || (myVar == null)) {
        return true;
    } else {
        return false;
    }
}

function SetHTML(id, HTML) {
    var obj = $get(id);
    if (obj) obj.innerHTML = HTML;
}

function IsNumeric(strString)
//  check for valid numeric strings	
{
    var strValidChars = "0123456789.-";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    //  test strString consists of valid characters listed above
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function IsValidName(name) {
    return !isBlank(name) && !isEmpty(name) && name.indexOf("'") === -1;
}

//from ResourceStrings.resx same as login Email validation 
function IsValidEmail(value) {
    return /^([0-9a-zA-Z]+[-._+&amp;amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/i.test(value);
}

function GetClientGMTOffset()
{
    return (new Date().getTimezoneOffset() / 60);
}

function TranslateServerTime(dt)
{
    var s = GetServerGMTOffset();
    var c = GetClientGMTOffset();
    var translated = new Date()
    var offset = (c - s) * 3600*1000;
    translated.setTime(dt.getTime() + offset);
    return translated;
}

function GetTime(dt)
{
    var h = dt.getHours();
    var m = dt.getMinutes();
    return h + m / 60.0;
}

function FormatTime(fTime) {
    var h = Math.floor(fTime);
    var m = Math.round((fTime - h) * 60);
    //Rounding issues like 11.999999966
    //will cause minutes to round to 60
    if (m == 60) {
        h += 1;
        m = 0;
    }
    var a = (h < 12) ? " AM" : " PM";
    if (h > 12) h = h - 12;
    if (h == 0) h = "12";
    if (m < 10) m = "0" + m;
    return h + ":" + m + a;
}

function FormatDate(dt) {
    if (dt == null) 
        return "";

    return GetShortDayStringForDayOfWeek(dt.getDay()) + " " +
           GetShortMonthString(dt.getMonth()) + " " +
           dt.getDate();
}

function SetTime(timeString, dateObject, hoursToDeduct, minsToDeduct) {
  var arrTimeList = timeString.split(" ");
  var arrHoursVsMinutes = arrTimeList[0].split(":");

  var intHours = parseInt(arrHoursVsMinutes[0]);
  var intMinutes = parseInt(arrHoursVsMinutes[1]);

  if (arrTimeList[1] === "PM") {

    if (arrHoursVsMinutes[0] !== "12") {
      intHours += 12;
    }
  }
  if (arrTimeList[1] === "AM") {

    if (arrHoursVsMinutes[0] === "12") {
      intHours = 0;
    }
  }

  dateObject.setHours(intHours - hoursToDeduct);
  dateObject.setMinutes(intMinutes - minsToDeduct);
}

function FormatResourceString() {
    if (arguments.length == 0) {
        return "";
    }

    var resourceString = arguments[0];
    if (resourceString != null) {
        for (var i = 1; i < arguments.length; i++) {
            resourceString = resourceString.replace("{" + (i - 1) + "}", arguments[i]);
        }
    }
    else {
        return "";
    }
    return resourceString;
}

function AddOption(sName, text, value) {
    var select = $get(sName);
    if (select != null) {
        var optn = document.createElement("OPTION");
        optn.text = text;
        optn.value = value;
        select.options.add(optn);
    }
}

function ClearOptions(sName) {
    var select = $get(sName);
    if (select != null) select.options.length=0
}

function Delay(str) {
    setTimeout(str, 10);
}

function GetSelectedRadioButtonValue(listBoxId)
{
    var i = 0;

    for (i = 0; ; i++)
    {
        o = document.getElementById(listBoxId + "_" + i);
        if (o !== null)
        {
            if (o.checked == true)
            {
                return o.value;
            }
        }
        else
        {
            break;
        }
    }
    return null;
}

function RenderButton(id, cssClass, hoverCssClass, horizontalAlignment, onClick, hoverMode, text, uniqueval) {

    var uniqueattr = (uniqueval == null) ? "" : "uniqueattribute='" + uniqueval + "'";
    var buttonHtml = "";
    var idText = "";

    if ((id != null) && (id != "")) {
        idText = "id='" + id + "'";
    }

    if ((hoverCssClass == null) || (hoverCssClass == "")) {
        hoverCssClass = cssClass + "Hover";
    }

    var containerClass = "";
    switch (horizontalAlignment.toLowerCase())
    {
        case "center":
            containerClass = "Center";
            break;
        case "right":
            containerClass = "Right";
            break;
        case "left":
            containerClass = "Left";
            break;
    }

    if (hoverMode.toLowerCase() != "cssclassswap") {
        cssClass += " " + containerClass;
        hoverCssClass += " " + containerClass;
    }
    
    switch (hoverMode.toLowerCase()) {
        case "backgroundimageswap":
            buttonHtml += "<div id='" + id + "' class='" + cssClass + " FloatNone' onclick='" + onClick + "'  onkeypress='HandleKeyPressEvent(event);' onmouseover='ButtonHover(this);'  onfocus='ButtonHover(this);' onmouseout='ButtonOut(this);' onblur='ButtonOut(this);' "+uniqueattr+" >" + text + "</div>";
            break;
        case "divvisibility":
            buttonHtml += "<div id='" + id + "_Normal' class='" + cssClass;
            buttonHtml += "' onclick='" + onClick + "'  onkeypress='HandleKeyPressEvent(event);' onmouseover='ButtonVisibilityHover(\"" + id + "\");'  onfocus='ButtonVisibilityHover(\"" + id + "\");' onmouseout='ButtonVisibilityOut(\"" + id + "\");'  onblur='ButtonVisibilityOut(\"" + id + "\");' "+uniqueattr+">";
            buttonHtml += "<span>";
            buttonHtml += text;
            buttonHtml += "</span>";
            buttonHtml += "</div>";

            buttonHtml += "<div id='" + id + "_Hover' class='" + hoverCssClass;
            buttonHtml += "' onclick='" + onClick + "'  onkeypress='HandleKeyPressEvent(event);' onmouseover='ButtonVisibilityHover(\"" + id + "\");'  onfocus='ButtonVisibilityHover(\"" + id + "\");' onmouseout='ButtonVisibilityOut(\"" + id + "\");'  onblur='ButtonVisibilityOut(\"" + id + "\");' style='display:none; ' >";
            buttonHtml += "<span>";
            buttonHtml += text;
            buttonHtml += "</span>";
            buttonHtml += "</div>";
            break;
        case "cssclassswap":
            if (containerClass != "") {
                buttonHtml += "<div id='" + id + "Div' class='" + containerClass + "' style='display:inline' >";
            }
            else {
                buttonHtml += "<div id='" + id + "Div' style='display:inline' >";
            }

            buttonHtml += "<div class='" + cssClass;
            buttonHtml += "' onclick='" + onClick + "' onkeypress='HandleKeyPressEvent(event);'";
            if (hoverCssClass != cssClass) {
                buttonHtml += " onmouseover='ButtonClassHover(this,\"" + hoverCssClass + "\");'  onfocus='ButtonClassHover(this,\"" + hoverCssClass + "\");' onmouseout='ButtonClassOut(this,\"" + cssClass + "\");' onblur='ButtonClassOut(this,\"" + cssClass + "\");' "+uniqueattr+" ";
            }
            buttonHtml += " >";
            buttonHtml += "<span>";
            buttonHtml += text;
            buttonHtml += "</span>";
            buttonHtml += "</div>";

            if (hoverCssClass != cssClass) {
                buttonHtml += "<div class='" + hoverCssClass + "' style='display:none;'></div>";
            }
            
            buttonHtml += "</div>";

            break;
    }
    return buttonHtml;
}

function ButtonHover(control) {
    var src = GetBackgroundImage(control).replace(/_hover/gi, ""); // remove any existing hover text
    if ((src != "") && (src.length > 4 )) {
        var ext = src.substring(src.length - 5, src.length);
        src = src.substring(0, src.length - 5);    // back out file extension
        control.style.backgroundImage = src + "_hover" + ext;
    }
    //alert(src + "_hover" + ext);
}

function ButtonOut(control) {
    control.style.backgroundImage = GetBackgroundImage(control).replace(/_hover/gi, ""); // remove any existing hover text
}

function ButtonClassHover(event, hoverClass) {
    var e = getEventTarget(event) || event;
    SetClass(e, hoverClass);
}

function ButtonClassOut(event, normalClass) {
    var e = getEventTarget(event) || event;
    SetClass(e, normalClass);
}

function ButtonVisibilityHover(clientId) {

    var normal = $get(clientId + "_Normal");
    var hover = $get(clientId + "_Hover");

    if ((normal != null) && (hover != null)) {
        normal.style.display = "none";
        hover.style.display = "";
    }
}

function ButtonVisibilityOut(clientId) {
    var normal = $get(clientId + "_Normal");
    var hover = $get(clientId + "_Hover");

    if ((normal != null) && (hover != null)) {
        normal.style.display = "";
        hover.style.display = "none";
    }
}

function GetBackgroundImage(control) {
    return GetStyle(control).backgroundImage.replace(/\"/gi, "");
}

function GetStyle(control) {
    if (window.getComputedStyle) {
        try {
            return document.defaultView.getComputedStyle(control, "");
        }
        catch (e) {

        }
    }
    try {
        return control.currentStyle;
    }
    catch (e) {
        return control.style;
    }
}

function SetClass(obj, name) {
    if (obj == null) {
        alert("MISSING OBJECT");
        return;
    }
    
    obj.setAttribute("className", name);
    obj.setAttribute("class", name);
}

function GetClass(obj) {
    //Only DOM elements support getAttribute so shortcut out to minimize exception
    if (obj.nodeType != 1) {
        return "";
    }

    try {
        return obj.className;
    }
    catch (ex) {
        try {
            className = obj.getAttribute("className");
            if ((className != null) && (className != "")) {
                return className
            }
        }
        catch (e) {

        }
        try {
            className = obj.getAttribute("class");
            if ((className != null) && (className != "")) {
                return className
            }
        }
        catch (e) {

        }
        return "";
    }
}

function GetElementsByClassName(node, classname) {
    //Found implementation from http://stackoverflow.com/questions/1933602/how-to-getelementbyclass-instead-of-getelementbyid-with-javascript
    if (node.getElementsByClassName) { // use native implementation if available
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass, node) {
            if (node == null)
                node = document;
            var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"), i, j;

            for (i = 0, j = 0; i < elsLen; i++) {
                if (pattern.test(els[i].className)) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}

function GetElementsByTagNameFromArray(array, tagName) {
    var elements = new Array();
    var element = 0;

    if ((array != null) && (array.length != null)) {
        for (var i = 0; i < array.length; i++) {
            var oItemElements = array[i].getElementsByTagName(tagName);
            for (var j = 0; j < oItemElements.length; j++) {
                elements[element] = oItemElements[j];
                element++;
            }
        }
    }
    return elements;
}

function GetImmediateChildrenByName(obj, name) {
    var children = new Array();
    var child = 0;

    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if ((obj.childNodes[i].name == name) ||
                (obj.childNodes[i].getAttribute("name") == name)) //IE9 removed support for the name property and switched it to an attribute
            {
                children[child] = obj.childNodes[i];
                child++;
            }
        }
    }
    return children;
}

function GetImmediateChildrenByClass(obj, className) {
    var children = new Array();
    var child = 0;
    
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if (GetClass(obj.childNodes[i]) == className) {
                children[child] = obj.childNodes[i];
                child++;
            }
        }
    }
    return children;
}

function GetImmediateChildByClass(obj, className) {
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if (GetClass(obj.childNodes[i]) == className) {
                return obj.childNodes[i];
            }
        }
    }
    return null;
}

function GetChildByClass(obj, className) {
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if (GetClass(obj.childNodes[i]) == className) {
                return obj.childNodes[i];
            }
            var child = GetChildByClass(obj.childNodes[i], className);
            if (child != null) {
                return child;
            }
        }
    }
    return null;
}

function GetChildByTag(obj, tag) {
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        var tagUpper = tag.toUpperCase();
        for (var i = 0; i < obj.childNodes.length; i++) {
            if ((obj.childNodes[i].tagName != null) &&
                (obj.childNodes[i].tagName.toUpperCase() == tagUpper)) {
                return obj.childNodes[i];
            }
            var child = GetChildByTag(obj.childNodes[i], tagUpper);
            if (child != null) {
                return child;
            }
        }
    }
    return null;
}

function GetImmediateChildByTag(obj, tag) {
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        var tagUpper = tag.toUpperCase();
        for (var i = 0; i < obj.childNodes.length; i++) {
            if ((obj.childNodes[i].tagName != null) &&
                (obj.childNodes[i].tagName.toUpperCase() == tagUpper)) {
                return obj.childNodes[i];
            }
        }
    }
    return null;
}

function GetImmediateChildById(obj, id) {
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if (obj.childNodes[i].id == id) {
                return obj.childNodes[i];
            }
        }
    }
    return null;
}

function GetChildById(obj, id) {
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if (obj.childNodes[i].id == id) {
                return obj.childNodes[i];
            }
            var child = GetChildById(obj.childNodes[i], id);
            if (child != null) {
                return child;
            }
        }
    }
    return null;
}

function GetParentByClass(obj, className) {
    while (obj != null) {
        if (GetClass(obj) == className) {
            break;
        }
        obj = obj.parentNode;
    }
    return obj;
}

function GetParentById(obj, id) {
    if (obj == null) {
        return null;
    }

    if (obj.id.indexOf(id) >= 0) {
        return obj;
    }

    return GetParentById(obj.parentNode, id);
}

function GetParentByExactId(obj, id) {
    if (obj == null) {
        return null;
    }

    if (obj.id == id) {
        return obj;
    }

    return GetParentByExactId(obj.parentNode, id);
}

function GetParentByTag(obj, tag) {
    if (obj == null) {
        return null;
    }

    return (obj.tagName.toUpperCase() == tag.toUpperCase()) ? obj : GetParentByTag(obj.parentNode, tag);
}

function GetChildLink(obj)
{
    if ((obj != null) && (obj.childNodes != null) && (obj.childNodes.length != null)) {
        for (var i = 0; i < obj.childNodes.length; i++) {
            if (obj.childNodes[i].href != null) {
                return obj.childNodes[i];
            }
            var child = GetChildLink(obj.childNodes[i]);
            if (child != null) {
                return child;
            }
        }
    }
}

function DisableHyperLinks(containerId) {
    var containerDiv = $get(containerId);
    if (containerDiv != null) {
        var link = GetChildLink(containerDiv, "");

        if (link != null) {
            link.href = "javascript:DisabledLink()";
        }
    }
}

function DisabledLink() {
}

function PreloadImages() {
    var oPreloadDiv = $get("preload_image_div");

    var imageName = null;
    if (oPreloadDiv != null) {
        var oImgList = oPreloadDiv.getElementsByTagName('input');

        if ((oImgList != null) && (oImgList.length != null)) {
            for (var i = 0; i < oImgList.length; i++) {
                if (oImgList[i].preloaded == null) {
                    imageName = oImgList[i].value;
                    oImgList[i].preloaded = "preloaded";
                    break;                    
                }
            }
        }
    }

    if (imageName != null) {
        var image = new Image();
        image.src = imageName;
        setTimeout("PreloadImages()", 200);
    }
}

function Attach(obj, name, func) {
    if (obj.addEventListener) obj.addEventListener(name, func, false);
    else if (obj.attachEvent) obj.attachEvent("on" + name, func);
    else eval("obj.on" + name + " = func;");
}

function Detach(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, handler);
  } else {
    element["on" + type] = null;
  }
}

/* Scrollbar */

var ScrollBar = {
    Create: function (btn, content) {
        if ((btn == null) || (content == null)) {
            return;
        }
        ScrollBar.Display(btn, content, false);
        //Tie up scroll wheel functionality
        content.ScrollButton = btn;
        ScrollBar.HookEvent(content, 'mousewheel', ScrollBar.OnScrollEvent);
        btn.parentNode.ScrollButton = btn;
        ScrollBar.HookEvent(btn.parentNode, 'mousewheel', ScrollBar.OnScrollEvent);
        //Tie up clicking on the bar to page up/page down
        ScrollBar.HookEvent(btn.parentNode, 'click', ScrollBar.OnBarClickEvent);
    },

    Update: function (btn, content) {
        if ((btn == null) || (content == null)) {
            return;
        }
        ScrollBar.Display(btn, content, true);
    },

    Display: function (btn, content, refresh) {
        if ((btn == null) || (content == null)) {
            return;
        }

        // Initialize content div
        // IE6 will not report offsetHeight correctly unless a width is set
        // width can be set in the style sheet, but if it isn't set it here to prevent errors
        // from client stylesheets not setting the width on MenuScrollContent
        try {
            if (content.currentStyle.width.indexOf("px", 0) < 0) {
                content.style.width = content.parentNode.offsetWidth + "px";
            }
        }
        catch (ex) {
        }

        var scrollbarStyle = GetStyle(btn.parentNode);
        var scrollBorderHeight = 0;
        if (scrollbarStyle != null) {
            var border = parseInt(scrollbarStyle.borderTopWidth);
            if (!isNaN(border) && (border != 0)) {
                scrollBorderHeight += border;
            }
            border = parseInt(scrollbarStyle.borderBottomWidth);
            if (!isNaN(border) && (border != 0)) {
                scrollBorderHeight += border;
            }
        }

        oldContentDifference = content.offsetHeight - content.parentNode.offsetHeight;
        btn.ContentHeight = content.offsetHeight;
        btn.ContainerHeight = content.parentNode.offsetHeight;
        newContentDifference = content.offsetHeight - content.parentNode.offsetHeight;
        btn.parentNode.Content = content;
        btn.Content = content;
        if (refresh == false) {
            btn.Content.style.top = "0px";
        }
        btn.parentNode.style.display = "";
        btn.parentNode.style.visibility = "visible";
        //alert(content.clientHeight + ":" + content.offsetTop + ":" + content.offsetHeight + "\n");

        // Skip out if scroll isn't needed
        if (btn.ContainerHeight >= btn.ContentHeight) {
            btn.parentNode.style.visibility = "hidden";
            btn.parentNode.style.display = "none";
            btn.Content.style.top = "0px";
            return;
        }

        var pageButtonHeights = 0;
        var oPageUp = GetChildByClass(btn.parentNode, "ScrollPageUp");
        var oPageDown = GetChildByClass(btn.parentNode, "ScrollPageDown");

        if (oPageUp != null) {
            if ((oPageUp.style.display == "") && (oPageUp.offsetWidth != 0)) {
                btn.parentNode.PageUpHeight = oPageUp.offsetHeight;
                pageButtonHeights += oPageUp.offsetHeight;
                oPageUp.onclick = ScrollBar.OnPrevPage;
                oPageUp.ScrollButton = btn;
            }
            else {
                btn.parentNode.PageUpHeight = 0;
                oPageUp = null;
            }
        }
        if (oPageDown != null) {
            if ((oPageDown.style.display == "") && (oPageDown.offsetWidth != 0)) {
                btn.parentNode.PageDownHeight = oPageDown.offsetHeight;
                pageButtonHeights += oPageDown.offsetHeight;
                oPageDown.onclick = ScrollBar.OnNextPage;
                oPageDown.ScrollButton = btn;
            }
            else {
                btn.parentNode.PageDownHeight = 0;
                oPageDown = null;
            }
        }

        // Scrolling space = height of MenuScrollBar div - MenuScrollButton height
        oldScrollDelta = btn.ScrollDelta;
        btn.ScrollDelta = Math.round(btn.parentNode.offsetHeight - btn.offsetHeight - pageButtonHeights - (scrollBorderHeight * 2));
        btn.MaxY = btn.ScrollDelta;
        btn.StartY = 0;
        if (refresh == false) {
            btn.LastY = 0;
            btn.style.top = "0px";
        } else {
            oldContentTop = parseFloat(btn.Content.style.top.replace(/px/, ""));
            if (-oldContentTop >= newContentDifference) {
                btn.Content.style.top = -newContentDifference + "px";
                btn.LastY = btn.ScrollDelta;
                btn.style.top = btn.ScrollDelta + "px";
            } else {
                newButtonTop = (-oldContentTop * btn.ScrollDelta) / newContentDifference;
                btn.LastY = newButtonTop;
                btn.style.top = newButtonTop + "px";
            }
        }

        if (oPageDown != null) {
            var top = btn.ContainerHeight - pageButtonHeights - btn.offsetHeight - scrollBorderHeight;
            oPageDown.style.top = top + "px";
        }

        // Initialize dragging
        btn.OnDragStart = ScrollBar.OnDragStart;
        btn.OnDrag = ScrollBar.OnDrag;
        btn.OnDragEnd = ScrollBar.OnDragEnd;
        btn.onmousedown = btn.OnDragStart;
    },

    MoveToEnd: function (btn, content) {
        if ((btn == null) || (content == null)) {
            return;
        }

        ScrollBar.Display(btn, content, true);

        if (content.offsetHeight > content.parentNode.offsetHeight) {
            btn.ContentHeight = content.offsetHeight;
            btn.ContainerHeight = content.parentNode.offsetHeight;
            newContentDifference = content.offsetHeight - content.parentNode.offsetHeight;
            btn.Content = content;
            btn.Content.style.top = -newContentDifference + "px";

            btn.MaxY = btn.ScrollDelta;
            btn.StartY = btn.MaxY;
            btn.LastY = btn.MaxY;

            btn.style.top = btn.MaxY + "px";
        }
    },

    GetEvent: function (e) {
        return (typeof e == 'undefined') ? window.event : e;
    },

    OnPrevPage: function (e) {
        e = ScrollBar.GetEvent(e);

        var oPage = getEventTarget(e);
        var o = oPage.ScrollButton;
        var currentOffset = -parseInt(o.Content.style.top);

        currentOffset -= o.ContainerHeight;
        if (currentOffset < 0) {
            currentOffset = 0;
        }

        o.Content.style.top = -currentOffset + "px";

        ScrollBar.Display(o, o.Content, true);

        ScrollBar.CancelScrollEvent(e);

        return false;
    },

    OnNextPage: function (e) {
        e = ScrollBar.GetEvent(e);

        var oPage = getEventTarget(e);
        var o = oPage.ScrollButton;
        var currentOffset = -parseInt(o.Content.style.top);

        currentOffset += o.ContainerHeight;
        if ((currentOffset + o.ContainerHeight) > o.ContentHeight) {
            currentOffset = o.ContentHeight - o.ContainerHeight;
        }

        o.Content.style.top = -currentOffset + "px";

        ScrollBar.Display(o, o.Content, true);

        ScrollBar.CancelScrollEvent(e);

        return false;
    },

    OnDragStart: function (e) {
        e = ScrollBar.GetEvent(e);

        ScrollBar.Current = this;
        this.MouseStartY = parseInt(e.clientY);
        this.StartY = this.LastY;
        this.MouseMaxY = this.MouseStartY + this.ScrollDelta - this.StartY;
        this.MouseMinY = this.MouseStartY - this.StartY;
        document.onmousemove = this.OnDrag;
        document.onmouseup = this.OnDragEnd;
        ScrollBar.OldSelect = document.onselectstart;
        document.onselectstart = function () { return false; }

        return false;
    },

    OnDrag: function (e) {
        e = ScrollBar.GetEvent(e);
        var o = ScrollBar.Current;
        var y = parseInt(e.clientY);

        // Make sure mouse is on the button
        if (y > o.MouseMaxY) y = o.MouseMaxY;
        if (y < o.MouseMinY) y = o.MouseMinY;

        // Calculate change in y
        y = y - o.MouseStartY;

        //alert(o.StartY + y);

        // Update scroll button
        o.LastY = (o.StartY + y);
        o.style.top = o.LastY + "px";

        // Update content
        y = -1 * (o.StartY + y) * (o.Content.offsetHeight - o.Content.parentNode.offsetHeight) / o.ScrollDelta;
        o.Content.style.top = y + "px";
    },

    OnDragEnd: function () {
        document.onmousemove = null;
        document.onmouseup = null;
        document.onselectstart = ScrollBar.OldSelect;
    },


    HookEvent: function (element, eventName, callback) {
        if (typeof (element) == "string")
            element = document.getElementById(element);
        if (element == null)
            return;
        if (element.addEventListener) {
            if (eventName == 'mousewheel')
                element.addEventListener('DOMMouseScroll', callback, false);
            element.addEventListener(eventName, callback, false);
        }
        else if (element.attachEvent)
            element.attachEvent("on" + eventName, callback);
    },

    CancelScrollEvent: function (e) {
        e = ScrollBar.GetEvent(e);
        if (e.stopPropagation)
            e.stopPropagation();
        if (e.preventDefault)
            e.preventDefault();
        e.cancelBubble = true;
        e.cancel = true;
        e.returnValue = false;
        return false;
    },

    OnScrollEvent: function (e) {
        e = ScrollBar.GetEvent(e);
        var oContent = e.currentTarget;
        //IE does not support the current target attribute so we need to iterate through 
        //parents to try to find it
        if (oContent == null) {
            oContent = ScrollBar.GetIECurrentTarget(e.srcElement);
        }
        if (oContent == null) {
            ScrollBar.CancelScrollEvent(e);
            return;
        }
        var o = oContent.ScrollButton;
        if ((o.ContainerHeight == 0) ||
            (o.ContainerHeight >= o.ContentHeight)) {
            ScrollBar.CancelScrollEvent(e);
            return;
        }

        var currentOffset = -parseInt(o.Content.style.top);

        var normal = e.detail ? e.detail * -1 : e.wheelDelta / 40;
        currentOffset -= 10 * normal;
        if ((currentOffset + o.ContainerHeight) > o.ContentHeight) {
            currentOffset = o.ContentHeight - o.ContainerHeight;
        }
        else if (currentOffset < 0) {
            currentOffset = 0;
        }
        o.Content.style.top = -currentOffset + "px";

        ScrollBar.Display(o, o.Content, true);

        ScrollBar.CancelScrollEvent(e);
    },

    GetIECurrentTarget: function (element) {
        while (element != null) {
            if (element.ScrollButton != null) {
                return element;
            }
            element = element.parentNode;
        }

        return null;
    },

    OnBarClickEvent: function (e) {
        e = ScrollBar.GetEvent(e);
        var oContent = e.currentTarget;
        //IE does not support the current target attribute so we need to iterate through 
        //parents to try to find it
        if (oContent == null) {
            oContent = ScrollBar.GetIECurrentTarget(e.srcElement);
        }
        if (oContent == null) {
            return;
        }
        var o = oContent.ScrollButton;

        //The event offset will be based on the box that is clicked, so if the button was clicked on
        //return so that we don't process the offset inside the button and interpret it as
        //going back to the top
        if ((e.srcElement != null) && (e.srcElement.id == o.id)) {
            return;
        }
        var currentOffset = -parseInt(o.Content.style.top);

        var buttonTop = o.offsetTop - o.clientTop;
        var eventY = e.offsetY;
        //Firefox doesn't support offsetY
        if (eventY == null) {
            eventY = e.layerY;
        }

        if (eventY < oContent.PageUpHeight) {
            return;
        }
        else if (eventY > (oContent.offsetHeight - oContent.PageDownHeight)) {
            return;
        }

        if (eventY < buttonTop) {
            currentOffset -= o.ContentHeight;
        }
        else if (eventY > (buttonTop + o.clientHeight)) {
            currentOffset += o.ContentHeight;
        }

        if ((currentOffset + o.ContainerHeight) > o.ContentHeight) {
            currentOffset = o.ContentHeight - o.ContainerHeight;
        }
        else if (currentOffset < 0) {
            currentOffset = 0;
        }
        o.Content.style.top = -currentOffset + "px";

        ScrollBar.Display(o, o.Content, true);

        ScrollBar.CancelScrollEvent(e);
    }

}

var VerticalPageBox = {
    Create: function (btn, content) {
        if ((btn == null) || (content == null)) {
            return;
        }
        VerticalPageBox.Display(btn, content, false);
    },

    Update: function (btn, content) {
        if ((btn == null) || (content == null)) {
            return;
        }
        VerticalPageBox.Display(btn, content, true);
    },

    Display: function (btn, content, refresh) {
        if ((btn == null) || (content == null)) {
            return;
        }

        // Initialize content div
        // IE6 will not report offsetHeight correctly unless a width is set
        // width can be set in the style sheet, but if it isn't set it here to prevent errors
        // from client stylesheets not setting the width on MenuScrollContent
        try {
            if (content.currentStyle.width.indexOf("px", 0) < 0) {
                content.style.width = content.parentNode.offsetWidth + "px";
            }
        }
        catch (ex) {
        }
        oldContentDifference = content.offsetHeight - content.parentNode.offsetHeight;
        btn.ContentHeight = content.offsetHeight;
        btn.ContainerHeight = content.parentNode.offsetHeight;
        newContentDifference = content.offsetHeight - content.parentNode.offsetHeight;
        btn.Content = content;
        if (refresh == false) {
            btn.Content.style.top = "0px";
        }
        btn.parentNode.style.display = "block";
        btn.parentNode.style.visibility = "visible";
        //alert(content.clientHeight + ":" + content.offsetTop + ":" + content.offsetHeight + "\n");

        // Skip out if scroll isn't needed
        if (btn.ContainerHeight >= btn.ContentHeight) {
            btn.parentNode.style.visibility = "hidden";
            btn.parentNode.style.display = "none";
            btn.Content.style.top = "0px";
            return;
        }

        // Initialize dragging
        btn.OnClick = VerticalPageBox.OnNextPage;
    },

    GetEvent: function (e) {
        return (typeof e == 'undefined') ? window.event : e;
    },

    OnNextPage: function (e) {
        e = VerticalPageBox.GetEvent(e);

        var o = getEventTarget(e);
        var currentOffset = -parseInt(o.Content.style.top);

        currentOffset += o.ContainerHeight;
        if (currentOffset > o.Content.offsetHeight) {
            currentOffset = 0;
        }

        o.Content.style.top = -currentOffset + "px";

        return false;
    }

}

var Unselectable = {

    enable: function (e) {
        var e = e ? e : window.event;

        if (e.button != 1) {
            if (e.target) {
                var target = e.target;
            } else if (e.srcElement) {
                var target = e.srcElement;
            }

            if (target.tagName != null) {
                var targetTag = target.tagName.toLowerCase();
                if ((targetTag != "input") && (targetTag != "textarea") && (targetTag != "select")) {
                    return false;
                }
            }
        }
    },

    disable: function () {
        return true;
    }

}

////////////////////////////////////////
// Modifier Utility methods
////////////////////////////////////////

function GetNestedModifiersForInput(input) {
    var oIds = input.id.split('_');
    return GetNestedModifiersForGroup(input, oIds[2]);
}

function GetNestedModifiersForGroup(input, nodeId) {
    var nestedModifiers = $get("_NestedMod_" + nodeId);
    return nestedModifiers;
}

////////////////////////////////////////
// Store Locator / Geocoding Methods
////////////////////////////////////////
var StoreLocatorAddressCookieName = "StoreLocatorAddress";
var StoreLocatorAddress2CookieName = "StoreLocatorAddress2";
var StoreLocatorCityCookieName = "StoreLocatorCity";
var StoreLocatorStateCookieName = "StoreLocatorState";
var StoreLocatorPostalCookieName = "StoreLocatorPostal";

function GeocodeAddressFromControl(addressControlClientID, callback) 
{
    GeocodeAddressFromInputs(
        document.getElementById(addressControlClientID + "_AddressText"),
        document.getElementById(addressControlClientID + "_Address2Text"),
        document.getElementById(addressControlClientID + "_CityText"),
        document.getElementById(addressControlClientID + "_StateCombo"),
        document.getElementById(addressControlClientID + "_ZipCodeText"),callback);
}

function GeocodeAddressFromInputs(txtAddressControl, txtAddress2Control, txtCityControl,
    ddlStateControl, txtPostalControl,callback) 
{
    var address = BuildLocatorAddressCookieFromInputs(txtAddressControl, txtAddress2Control, txtCityControl,
        ddlStateControl, txtPostalControl, callback);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, callback);
}


function BuildLocatorAddressCookieFromControl(addressControlClientID) 
{
    BuildLocatorAddressCookieFromInputs(
        document.getElementById(addressControlClientID + "_AddressText"),
        document.getElementById(addressControlClientID + "_Address2Text"),
        document.getElementById(addressControlClientID + "_CityText"),
        document.getElementById(addressControlClientID + "_StateCombo"),
        document.getElementById(addressControlClientID + "_ZipCodeText"));
}

function BuildLocatorAddressCookieFromInputs(txtAddressControl, txtAddress2Control, txtCityControl,
    ddlStateControl, txtPostalControl)
{
    var address = "";

    address = BuildAddress(address, txtAddressControl, StoreLocatorAddressCookieName);
    if (txtAddress2Control != null) {
        address = BuildAddress(address, txtAddress2Control, StoreLocatorAddress2CookieName);
    }
    address = BuildAddress(address, txtCityControl, StoreLocatorCityCookieName);
    
    if (ddlStateControl != null) 
    {
        var selIndex = ddlStateControl.selectedIndex;
        var state = "";
        if (selIndex > 0) 
        {
            if (address != "") 
            {
                address += ", ";
            }
            state = "" + $(ddlStateControl.options[selIndex]).attr('title');
            address += state;
        }
        setSessionCookie(StoreLocatorStateCookieName, ddlStateControl.options[selIndex].value);
    }

    address = BuildAddress(address, txtPostalControl, StoreLocatorPostalCookieName);
    return address;
}

function BuildAddress(address, inputCtrl, cookieName) 
{
    if (inputCtrl != null) 
    {
        setSessionCookie(cookieName, inputCtrl.value);
        if (inputCtrl.value != "") 
        {
            if (address != "") 
            {
                address += ", ";
            }
            address += inputCtrl.value;
        }
    }

    return address;
}

////////////////////////////////////////
// Validation Tooltip Methods
////////////////////////////////////////

//Based on code found at http://forums.asp.net/t/1286673.aspx/1
function TooltipValidators(validatorErrorCssClass) {
    //Creating the global validation error css class variable
    document.validatorErrorCssClass = validatorErrorCssClass || "ValidationError";

    //Creating a function to validate the control
    ValidateControl = function (control, validationGroup) {
        control.isvalid = true;
        control.errormessages = [];
        for (var num1 = 0; num1 < control.Validators.length; num1++) {
            var val1 = control.Validators[num1];
            ValidatorValidate(val1, validationGroup, null);
            if (!val1.isvalid) {
                control.isvalid = false;
                control.errormessages.push(val1.errormessage);
            }
        }
        return control.isvalid;
    }

    //Checking if ValidatorUpdateDisplay exists
    if (typeof (ValidatorUpdateDisplay) != "undefined") {

        //Copy ValidatorUpdateDisplay to BaseValidatorUpdateDisplay
        BaseValidatorUpdateDisplay = ValidatorUpdateDisplay;

        //Replacing ValidatorUpdateDisplay
        ValidatorUpdateDisplay = function (val) {
            //Invoking original ValidatorUpdateDisplay function saved in BaseValidatorUpdateDisplay
            BaseValidatorUpdateDisplay(val);

            //Getting the control to validate
            var el = document.getElementById(val.controltovalidate);
            if (el != null) {
                //Getting the css class for the error
                var cssClass = val.ValidationErrorCssClass || val.getAttribute("validationErrorCssClass") || validatorErrorCssClass;

                //Checking if it has already the css class
                var hasErrorClass = el.className.indexOf(cssClass) != -1;
                //Checking if all validators are valid
                var array1 = [];
                var isValid = true;
                if (el.Validators != null) {
                    for (var num1 = 0; num1 < el.Validators.length; num1++) {
                        var val1 = el.Validators[num1];
                        if (!val1.isvalid) {
                            isValid = false;
                            array1.push(val1.errormessage);
                        }
                    }
                }
                el.isvalid = isValid;
                el.errormessages = array1;

                //If it is a checkbox or radio button using the parent element
                if (el.type == "checkbox" || el.type == "radio") el = el.parentNode;

                //if it is valid and it has the css class remove it
                if (hasErrorClass && isValid) {
                    //Removing the css class
                    el.className = el.className.replace(new RegExp("\\b" + cssClass + "\\b", "i"), "").replace(/^\s+|\s(?=\s+)|\s+$/m, "");
                    var tooltip = document.getElementById("ErrorTooltip" + el.id);
                    el.parentNode.removeChild(tooltip);
                }
                //if it is not valid and it has not the css class add it
                else if (!hasErrorClass && !isValid) {
                    //Adding the css class
                    el.className += (el.className.length != 0 ? " " : "") + cssClass;
                    var tooltipPosition = document.createElement('div');
                    tooltipPosition.setAttribute('id', "ErrorTooltip" + el.id);
                    if (el == document.activeElement) {
                        tooltipPosition.className = "ErrorTooltipContainer"
                    }
                    else {
                        tooltipPosition.className = "ErrorTooltipContainer hidden";
                    }
                    tooltipPosition.style.left = getAbsPos(el.id, "left") / 2 + "px";
                    if (el.id != "" && (document.getElementById(el.id).offsetHeight > 50)) {
                        tooltipPosition.style.bottom = "31px";
                    }
                    else {
                        tooltipPosition.style.bottom = (-5 + 2 * getAbsPos(el.id, "top")) + "px";
                    }
                    var tooltip = document.createElement('div');
                    tooltip.setAttribute('id', "ErrorTooltipInner" + el.id);
                    tooltip.className = "ErrorToolTipContent";
                    tooltip.innerHTML = el.errormessages[0];
                    tooltipPosition.appendChild(tooltip);
                    var tooltipArrow = document.createElement('div');
                    tooltipArrow.setAttribute('id', "ErrorToolTipArrow" + el.id);
                    tooltipArrow.className = "ErrorToolTipArrow";
                    var arrowHtml = "";
                    for (var i = 10; i > 0; i--) {
                        arrowHtml += "<div class='line" + i + "'> <!-- --></div>"
                    }
                    tooltipArrow.innerHTML = arrowHtml;
                    tooltipPosition.appendChild(tooltipArrow);

                    el.parentNode.insertBefore(tooltipPosition, el);
                    el.onfocus = ShowErrorMessages;
                    el.onblur = HideErrorMessages;


                }
            }
        }
    }
}

function getAbsPos(oId, tl) {
    var o = (typeof oId == typeof "") ? document.getElementById(oId) : oId;
    var val = parseInt((tl == 'top') ? o.offsetHeight : o.offsetWidth);
    return val;
}
function ShowErrorMessages() {
    var tooltip = document.getElementById("ErrorTooltip" + this.id);
    if (tooltip != null) {
        tooltip.className = "ErrorTooltipContainer";
    }
}
function HideErrorMessages() {
    var tooltip = document.getElementById("ErrorTooltip" + this.id);
    if (tooltip != null) {
        tooltip.className += (tooltip.className.length != 0 ? " " : "") + "hidden";
    }
}

function SpawnErrormessage(errorMessage, el, trigger) {
    if (trigger == null) {
        trigger = el;
    }
    if (el != null) {
        var existingErrorToolTip = document.getElementById("ErrorTooltip" + el.id);
        if (existingErrorToolTip != null) {
            existingErrorToolTip.getElementsByClassName("ErrorToolTipContent").innerText = errorMessage;
            return;
        }
        var tooltipPosition = document.createElement('div');
        tooltipPosition.setAttribute('id', "ErrorTooltip" + el.id);

        tooltipPosition.className = "ErrorTooltipContainer";

        tooltipPosition.style.left = getAbsPos(el.id, "left") / 2 + "px";
        if (el.id != "" && (document.getElementById(el.id).offsetHeight > 50)) {
            tooltipPosition.style.bottom = "31px";
        }
        else {
            tooltipPosition.style.bottom = (-5 + 2 * getAbsPos(el.id, "top")) + "px";
        }
        var tooltip = document.createElement('div');
        tooltip.setAttribute('id', "ErrorTooltipInner" + el.id);
        tooltip.className = "ErrorToolTipContent";
        tooltip.innerHTML = errorMessage;
        tooltipPosition.appendChild(tooltip);
        var tooltipArrow = document.createElement('div');
        tooltipArrow.setAttribute('id', "ErrorToolTipArrow" + el.id);
        tooltipArrow.className = "ErrorToolTipArrow";
        var arrowHtml = "";
        for (var i = 10; i > 0; i--) {
            arrowHtml += "<div class='line" + i + "'></div>";
        }
        tooltipArrow.innerHTML = arrowHtml;
        tooltipPosition.appendChild(tooltipArrow);

        el.parentNode.insertBefore(tooltipPosition, el);

        trigger.onfocus = function () {
            tooltipPosition.parentNode.removeChild(tooltipPosition);
            trigger.onfocus = null;
        };
    }
}


//////////////////////Tab Ordering/////////////////////////////////
function SetFocus(className, currElementClassName) {
    var elements;
    // if tabindex is defined and currElementClassName != null, then multiple items with same class name so iterate in order for focus
    if ((currElementClassName != null) && (typeof tabidx !== 'undefined')) {
        elements = GetElementsByClassName(document, currElementClassName);
        if (elements.length > 0) {
            if (tabidx != 0 && null != elements[tabidx + 1]) {
                tabidx = tabidx + 1;
            }

            $(elements[tabidx]).focus();
            if (tabidx < elements.length) {
                tabidx = tabidx + 1;
                return false;
            }
            else {
                tabidx = 0;
                return SetFocusOnElement(className);
            }
        }
    }
    else//set focus on next item
    {
        return SetFocusOnElement(className);
    }
}

//Handles the key press event, determines if its a tab event or enter key pressed.
function HandleKeyPressEvent(e) {
    var el = e.srcElement ? e.srcElement : e.target;
    var keycode = null;
    if (window.event) { keycode = window.event.keyCode; }
    else if (e) { keycode = e.which; }
    if (keycode == 13) {//enter key pressed
        if (el.onclick) el.onclick();
        else if (el.click) el.click();
        return false;
    }
    return false;
}

var DateTimeFormatter = function (cpattern, cDatePattern) {
    var me = this;
    me.pattern = cpattern;
    me.datePattern = cDatePattern;

    me.getTimeFormat = function() {
        var jpattern = me.pattern
            .replace(/h/g, 'g')         //replace 12 H format to g
            .replace(/H/g, 'h')         //replace 24 H format to h
            .replace(/m/g, 'i')         //replace m format as i for minutes
            .replace(/tt/g, 'a');       //replace tt with a as ante meridiem/post meridiem
        return jpattern;
    };

    me.getDateFormat = function () {
        var jpattern = me.datePattern
            .replace(/(^|[^d])ddd([^d]|$)/g, '$1D$2')
            .replace(/(^|[^M])MMM([^M]|$)/g, '$1M$2')
            .replace(/MM/g, 'm')
            .replace(/yy/g, 'y');                
        return jpattern;
    };
 
    me.formatDisplayTime = function (time) {
        var dtSplit = time.split('-');
        var formattedTimes = jQuery.map(dtSplit, function (timeString) {
            var cdate = (new Date()).toDateString();
            var dt = new Date(cdate + ' ' + timeString);
            return $.formatDateTime(me.getTimeFormat(), dt);
        });
        return formattedTimes.join(" - ");
    };
    me.dateFormat = function (date) {
        return $.formatDateTime(me.getDateFormat(), date);
    };

}

var CreditCard = function(cardtype)
{
    var me = this;
    me.cardtype = cardtype;

    me.validateCVV = function (cvv) {               
        return (me.validateIsNumericCVV(cvv) && me.validateCVVNotZero(cvv) && me.validateCVVCardLength(cvv));
    }
    me.validateCVVNotZero = function (cvv)
    {
        return (cvv != "000" && cvv != "0000");
    }
    me.validateIsNumericCVV = function (cvv) {
        return isNumeric(cvv)
    }
    me.validateCVVCardLength  = function(cvv)
    {
        if(cardtype.indexOf(CustomerPaymentMethodTypeEnum.Amex.toString()) != -1)
        {
            return (cvv.length == 4);                
        }
        else
        {
            return (cvv.length == 3);
        }              
    }
    isNumeric = function (number)
    {
        return !isNaN(Number(number));
    }
};

var CreditCardValidator = function(binRegEx) {
    var me = this;
    var re = binRegEx;

    me.GetCardType = function (number) {
        if (re.visa.test(number)) {
            return "7"; //Visa
        } else if (re.mastercard.test(number)) {
            return "6"; //MasterCard
        } else if (re.amex.test(number)) {
            return "0"; //AMEX
        } else if (re.diners.test(number)) {
            return "2"; //Diners
        } else if (re.discover.test(number)) {
            return "3"; //Discover
        } else if (re.jcb.test(number)) {
            return "5"; //JCB
        } else if (re.maestro.test(number)) {
            return "21"; //Maestro
        }
        return "";
    }
}

var CustomerPaymentMethodTypeEnum =
{
    /// <summary>
    /// Amex
    /// </summary>
    Amex: "Amex",             // American Express

    /// <summary>
    /// Credit
    /// </summary>        
    Credit: "Credit",           // Unspecified Card Type – Not Supported

    /// <summary>
    /// Diners
    /// </summary>    
    Diners: "Diners",           // Diners Club

    /// <summary>
    /// Discover
    /// </summary>    
    Discover: "Discover",         // Discover Card

    /// <summary>
    /// GiftCard
    /// </summary>   
    GiftCard: "GiftCard",         // Non-Credit Gift Cards

    /// <summary>
    /// JCB
    /// </summary>    
    JCB: "JCB",              // JCB

    /// <summary>
    /// MasterCard
    /// </summary>    
    MasterCard: "MasterCard",       // Master Card

    /// <summary>
    /// Visa
    /// </summary>    
    Visa: "Visa",             // Visa

    /// <summary>
    /// Prepaid
    /// </summary>    
    PrePaid: "PrePaid",           // Prepaid

    /// <summary>
    /// Prepaid_Amex
    /// </summary>    
    Prepaid_Amex: "Prepaid_Amex",

    /// <summary>
    /// Prepaid_Discover
    /// </summary>    
    Prepaid_Discover: "Prepaid_Discover",

    /// <summary>
    /// Prepaid_MasterCard
    /// </summary>    
    Prepaid_MasterCard: "Prepaid_MasterCard",

    /// <summary>
    /// Prepaid_Visa
    /// </summary>    
    Prepaid_Visa: "Prepaid_Visa",

    /// <summary>
    /// Prepaid_GlobalBlue
    /// </summary>    
    PrePaid_GlobalBlue: "PrePaid_GlobalBlue",

    /// <summary>
    /// Prepaid_Worldpay
    /// </summary>    
    Prepaid_Worldpay: "Prepaid_Worldpay",

    /// <summary>
    /// Prepaid_PayPal
    /// </summary>    
    PrePaid_PayPal: "PrePaid_PayPal",

    /// <summary>
    /// Prepaid_GiftCard
    /// </summary>    
    Prepaid_GiftCard: "Prepaid_GiftCard",

    /// <summary>
    /// Paytronix_GiftCard
    /// </summary>
    PrePaid_Paytronix: "PrePaid_Paytronix",

    /// <summary>
    /// Deposit
    /// </summary>
    Deposit: "Deposit",

    /// <summary>
    /// First data value link gift card
    /// </summary>

    PrePaid_FirstDataValueLink: "PrePaid_FirstDataValueLink",

    /// <summary>
    /// Maestro
    /// </summary>

    Maestro : "Maestro"
};