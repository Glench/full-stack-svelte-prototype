var Page=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function o(t){return"function"==typeof t}function u(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t,n){t.appendChild(n)}function i(t,n,e){t.insertBefore(n,e||null)}function a(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function s(t){return document.createTextNode(t)}function l(){return s(" ")}function h(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function d(t){return Array.from(t.childNodes)}function m(t,n,e,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===n){let n=0;const u=[];for(;n<o.attributes.length;){const t=o.attributes[n++];e[t.name]||u.push(t.name)}for(let t=0;t<u.length;t++)o.removeAttribute(u[t]);return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(n):f(n)}function p(t,n){for(let e=0;e<t.length;e+=1){const r=t[e];if(3===r.nodeType)return r.data=""+n,t.splice(e,1)[0]}return s(n)}function g(t){return p(t," ")}let $;function b(t){$=t}const y=[],_=[],v=[],x=[],E=Promise.resolve();let w=!1;function k(t){v.push(t)}let N=!1;const T=new Set;function A(){if(!N){N=!0;do{for(let t=0;t<y.length;t+=1){const n=y[t];b(n),O(n.$$)}for(b(null),y.length=0;_.length;)_.pop()();for(let t=0;t<v.length;t+=1){const n=v[t];T.has(n)||(T.add(n),n())}v.length=0}while(y.length);for(;x.length;)x.pop()();w=!1,N=!1,T.clear()}}function O(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(k)}}const S=new Set;function C(t,n){-1===t.$$.dirty[0]&&(y.push(t),w||(w=!0,E.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function P(u,c,i,f,s,l,h=[-1]){const m=$;b(u);const p=c.props||{},g=u.$$={fragment:null,ctx:null,props:l,update:t,not_equal:s,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:[]),callbacks:e(),dirty:h,skip_bound:!1};let y=!1;if(g.ctx=i?i(u,p,((t,n,...e)=>{const r=e.length?e[0]:n;return g.ctx&&s(g.ctx[t],g.ctx[t]=r)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](r),y&&C(u,t)),n})):[],g.update(),y=!0,r(g.before_update),g.fragment=!!f&&f(g.ctx),c.target){if(c.hydrate){const t=d(c.target);g.fragment&&g.fragment.l(t),t.forEach(a)}else g.fragment&&g.fragment.c();c.intro&&((_=u.$$.fragment)&&_.i&&(S.delete(_),_.i(v))),function(t,e,u){const{fragment:c,on_mount:i,on_destroy:a,after_update:f}=t.$$;c&&c.m(e,u),k((()=>{const e=i.map(n).filter(o);a?a.push(...e):r(e),t.$$.on_mount=[]})),f.forEach(k)}(u,c.target,c.anchor),A()}var _,v;b(m)}function j(n){let e,r,o,u,$,b,y,_,v,x,E,w,k,N,T=n[0].name+"";return{c(){e=f("a"),r=s("Log in"),o=l(),u=f("h1"),$=s("Hi "),b=s(T),y=s("!"),_=l(),v=f("form"),x=s("Change name: "),E=f("input"),w=l(),k=f("button"),N=s("Submit"),this.h()},l(t){e=m(t,"A",{href:!0});var n=d(e);r=p(n,"Log in"),n.forEach(a),o=g(t),u=m(t,"H1",{});var c=d(u);$=p(c,"Hi "),b=p(c,T),y=p(c,"!"),c.forEach(a),_=g(t),v=m(t,"FORM",{action:!0,method:!0});var i=d(v);x=p(i,"Change name: "),E=m(i,"INPUT",{name:!0,value:!0}),w=g(i),k=m(i,"BUTTON",{type:!0});var f=d(k);N=p(f,"Submit"),f.forEach(a),i.forEach(a),this.h()},h(){h(e,"href","/login"),h(E,"name","user_name"),E.value="val",h(k,"type","submit"),h(v,"action",""),h(v,"method","POST")},m(t,n){i(t,e,n),c(e,r),i(t,o,n),i(t,u,n),c(u,$),c(u,b),c(u,y),i(t,_,n),i(t,v,n),c(v,x),c(v,E),c(v,w),c(v,k),c(k,N)},p(t,[n]){1&n&&T!==(T=t[0].name+"")&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(b,T)},i:t,o:t,d(t){t&&a(e),t&&a(o),t&&a(u),t&&a(_),t&&a(v)}}}function H(t,n,e){let{user:r}=n;return t.$$set=t=>{"user"in t&&e(0,r=t.user)},[r]}return class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),P(this,t,H,j,u,{user:0})}}}();
//# sourceMappingURL=index.js.map