import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const LoginPage = () => import('@/presentation/pages/LoginPage.vue')
const RegisterPage = () => import('@/presentation/pages/RegisterPage.vue')

export enum RootPage {
  LOGIN = 'LOGIN_PAGE',
  REGISTER = 'REGISTER_PAGE'
}

export const routes: RouteRecordRaw[] = [
  {
    component: LoginPage,
    name: RootPage.LOGIN,
    path: '/login'
  },
  {
    component: RegisterPage,
    name: RootPage.REGISTER,
    path: '/register'
  }
]

const router = createRouter({ routes, history: createWebHashHistory() })

export default router
