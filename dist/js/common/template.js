"use strict";define(["jquery","handle"],function(l,u){return function(e,r,t,n){if(l.isArray(e))for(var i=0;i<t.length;i++){var s=t[i].substr(1);s=u.compile(e[i]),l(t[i]).html(s(r[i]))}else s=t.substr(1),s=u.compile(e),n?l(t).append(s(r)):l(t).html(s(r))}});