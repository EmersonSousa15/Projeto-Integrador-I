import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login/Login'
import Favoritos from '../pages/Favoritos/Favoritos'
import Opcoes from '../pages/Opcoes/Opcoes'
import SignUp from '../pages/SignUp/SignUp'
import Home from '../pages/Home/Home'
import AddBook from '../../src/pages/AddBook/AddBook'
import { PageChangeProvider } from '../contexts/pageChange'

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/favoritos',
                element: <Favoritos />
            },
            {
                path: '/opcoes',
                element: <Opcoes />
            },
            {
                path: '/cadastrarlivro',
                element: <AddBook />
            },
            {
                path: '/signup',
                element: <PageChangeProvider><SignUp /></PageChangeProvider>
            },
        ] 
    }
])

export default router