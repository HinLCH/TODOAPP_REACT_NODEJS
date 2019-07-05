import Todoapp from './Todoapp'
import Login from './Login'
import Error from './Error'

const routes = [
    {
        path: '/todoapp',
        component: Todoapp
    },
    {
        path: '/login',
        component: Login
    },
    {
        path:'/error',
        component: Error
    }
];

export default routes;