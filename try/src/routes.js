import Todoapp from './Todoapp'
import Login from './Login'
import Err from './Error'

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
        component: Err
    }
];

export default routes;