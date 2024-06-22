import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login/Login'
import Favoritos from '../pages/Favoritos/Favoritos'
import Opcoes from '../pages/Opcoes/Opcoes'
import CadastrarLivro from '../pages/Cadastrar Livro/CadastrarLivro'
import SignUp from '../pages/SignUp/SignUp'
import Home from '../pages/Home/Home'

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
                element: <CadastrarLivro />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
        ] 
    }
])

export default router