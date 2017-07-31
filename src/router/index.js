import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import Font from '@/components/Font'
import Grid from '@/components/Grid'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  	{
  		path: '/projects',
  		name: 'Projects',
  		component: Projects
  	},
    {
      path: '/font',
      name: 'Font',
      component: Font
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    }
  ]
})
