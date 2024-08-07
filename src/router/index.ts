<<<<<<< HEAD
import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue';
import Categorie from '@/pages/Categorie.vue';
import Experience from '@/pages/Experience.vue'
import BabylonScene from '@/components/BabylonScene.vue';
import inertie from '@/components/inertie.vue';
import poids_corps from '@/components/poids_corps.vue';
import PFD from '@/components/PFD.vue';
import action_reaction from "@/components/action_reaction.vue";
import element_base_cinematique from '@/components/element_base_cinematique.vue';
import energie_cinetique_potentielle from '@/components/energie_cinetique_potentielle.vue';
import Travail_mecanique_corps_mvt from '@/components/Travail_mecanique_corps_mvt.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/categorie', component: Categorie },
  { path: '/categorie/:tit/:cat', name : 'catDetail' , component: Experience, props:true },

  // Les experiences
  {path : '/3', component : BabylonScene},
  {path : '/5', component : inertie},
  {path : '/6', component : PFD},
  {path : '/7', component : action_reaction},
  {path : '/4', component : poids_corps},
  {path : '/1', component : element_base_cinematique},
  {path : '/8', component : Travail_mecanique_corps_mvt},
  {path : '/9', component : energie_cinetique_potentielle},

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
=======
import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue';
import Categorie from '@/pages/Categorie.vue';
import Experience from '@/pages/Experience.vue'
import BabylonScene from '@/components/BabylonScene.vue';
import inertie from '@/components/inertie.vue';
import poids_corps from '@/components/poids_corps.vue';
import PFD from '@/components/PFD.vue';
import action_reaction from "@/components/action_reaction.vue";
import element_base_cinematique from '@/components/element_base_cinematique.vue';
import mru from '@/components/mru.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/categorie', component: Categorie },
  { path: '/categorie/:tit/:cat', name : 'catDetail' , component: Experience, props:true },

  // Les experiences
  {path : '/3', component : BabylonScene},
  {path : '/5', component : inertie},
  {path : '/6', component : PFD},
  {path : '/7', component : action_reaction},
  {path : '/4', component : poids_corps},
  {path : '/1', component : element_base_cinematique},
  {path : '/2', component : mru},

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
>>>>>>> 71c316f42b295f0164c35b559b0671c847e5f48e
export default router;