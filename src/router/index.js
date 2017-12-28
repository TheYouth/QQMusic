import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Recommend = (resolve) => {
    import('@/components/recommend/recommend').then( (module) => {
        resolve(module)
    } )
}
const Singer = (resolve) => {
    import('@/components/singer/singer').then( (module) => {
        resolve(module)
    } )
}
const Rank = (resolve) => {
    import('@/components/rank/rank').then( (module) => {
        resolve(module)
    } )
}
const Search = (resolve) => {
    import('@/components/search/search').then( (module) => {
        resolve(module)
    } )
}
const SingerDetail = (resolve) => {
    import('@/components/singerDetail/singerDetail').then( (module) => {
        resolve(module)
    } )
}
const RecommendDetail = (resolve) => {
    import('@/components/recommendDetail/recommendDetail').then( (module) => {
        resolve(module)
    } )
}
const RankDetail = (resolve) => {
    import('@/components/rankDetail/rankDetail').then( (module) => {
        resolve(module)
    } )
}
const Login = (resolve) => {
    import('@/components/login/login').then( (module) => {
        resolve(module)
    } )
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
    	path: '/recommend',
    	component: Recommend,
        children: [
            {
                path: ':id',
                component: RecommendDetail
            }
        ]
    },
    {
    	path: '/singer',
    	component: Singer,
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
    	path: '/rank',
    	component: Rank,
        children: [
            {
                path: ':id',
                component: RankDetail
            }        
        ]
    },
    {
    	path: '/search',
    	component: Search,
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }
  ]
})
