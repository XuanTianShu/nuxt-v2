import Vue from 'vue';
const util={
    testEmail(str){
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(str)
    },
    testMobile(str){
        const reg =/^1[3-9]\d{9}$/;
        return reg.test(str)
    },
    testWebsite(str){
        const reg = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        return reg.test(str)
    },
}

Vue.prototype.$util = util;