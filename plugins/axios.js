import axios from 'axios'

export default function ({ $axios,store}) {
  // 请求拦截器
  $axios.onRequest((config) => {
    // .post(`goods/factoryDetail`, obj, { auth: true })
    // .get(`goods/factoryDetail`, { params: obj, auth: true })
    if(config.auth){
      
        const token = store.state.user.userInfo.token

        if(token){
          config.headers.token=token
          return config
        }else{
            console.error('未登录');
            store.commit('user/init',{
              key:'auth',
              data:'sign'
            })
        }
    }else{
        return config
    }
  });


  $axios.onResponse((response) => {
    return response;
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code != 200) {
      redirect('/');
    }
    // return Promise.reject(error);
  })

}