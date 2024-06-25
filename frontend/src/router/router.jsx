import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login/Login'
import Favoritos from '../pages/Favoritos/Favoritos'
import Opcoes from '../pages/Opcoes/Opcoes'
import CadastrarLivro from '../pages/Cadastrar Livro/CadastrarLivro'
import SignUp from '../pages/SignUp/SignUp'
import Home from '../pages/Home/Home'
import Teste from '../pages/Teste/Teste'
import IndividualForm from '../components/SignUp Components/IndividualForm'
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
                element: <CadastrarLivro />
            },
            {
                path: '/signup',
                element: <PageChangeProvider><SignUp /></PageChangeProvider>
            },
            {
                path: '/teste',
                element: <IndividualForm />
            }
        ] 
    }
])

export default router