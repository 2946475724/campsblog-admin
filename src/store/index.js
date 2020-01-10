import Vue from 'vue'
import Vuex from 'vuex'
import { Notification } from 'element-ui';
import {getRequest} from "../utils/api";

Vue.use(Vuex);

const now = new Date();

const store = new Vuex.Store({
  state: {
    routes: [],
    sessions: {},
    users: [],
    currentSession: null,
    currentUser: JSON.parse(window.sessionStorage.getItem("user")),
    filterKey: '',
    stomp: null,
    isDot: {}
  },
  mutations: {
    INIT_CURRENTUSER(state, user) {
      state.currentUser = user;
    },
    initRoutes(state, data) {
      state.routes = data;
    },
    changeCurrentSession(state, currentSession) {
      Vue.set(state.isDot, state.currentUser.username + '#' + currentSession.username, false);
      state.currentSession = currentSession;
    },
    addMessage(state, msg) {
      let mss = state.sessions[state.currentUser.username + '#' + msg.to];
      if (!mss) {
        // state.sessions[state.currentHr.username+'#'+msg.to] = [];
        Vue.set(state.sessions, state.currentUser.username + '#' + msg.to, []);
      }
      state.sessions[state.currentUser.username + '#' + msg.to].push({
        content: msg.content,
        date: new Date(),
        self: !msg.notSelf
      })
    },
    INIT_DATA(state) {
      //浏览器本地的历史聊天记录可以在这里完成
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    INIT_HR(state, data) {
      state.users = data;
    }
  },
  actions: {
    connect(context) {
      context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
      context.state.stomp.connect({}, success => {
        context.state.stomp.subscribe('/user/queue/chat', msg => {
          let receiveMsg = JSON.parse(msg.body);
          if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
            Notification.info({
              title: '【' + receiveMsg.fromNickname + '】发来一条消息',
              message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
              position: 'bottom-right'
            });
            Vue.set(context.state.isDot, context.state.currentHr.username + '#' + receiveMsg.from, true);
          }
          receiveMsg.notSelf = true;
          receiveMsg.to = receiveMsg.from;
          context.commit('addMessage', receiveMsg);
        })
      }, error => {

      })
    },
    initData(context) {
      context.commit('INIT_DATA');
      getRequest("/chat/users").then(resp => {
        if (resp) {
          context.commit('INIT_HR', resp);
        }
      })
    }
  }
});

store.watch(function (state) {
  return state.sessions
}, function (val) {
  localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
  deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
});



export default store;
