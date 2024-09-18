import {createBrowserRouter, useParams} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login/Login'
import Favoritos from '../pages/Favoritos/Favoritos'
import SignUp from '../pages/SignUp/SignUp'
import Home from '../pages/Home/Home'
import AddBook from '../../src/pages/AddBook/AddBook'
import { PageChangeProvider } from '../Context/pageChange'
import ShowBook from '../pages/ShowBook/ShowBook'
import EditBook from '../pages/EditBook/EditBook'
import MyBooks from '../pages/MyBooks/MyBooks'
import MyAccount from '../pages/MyAccount/MyAccount'
import Cart from '../pages/Cart/Cart'
import MyPurchases from '../pages/MyPurchases/MyPurchases'
import MySales from '../pages/MySales/MySales'

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
                path: '/cadastrarlivro',
                element: <AddBook />
            },
            {
                path: '/signup',
                element: <PageChangeProvider><SignUp /></PageChangeProvider>
            },
            {
                path: '/livro/:id', // rota para um livro específico
                element: <ShowBook />
            },
            {
                path: '/editarlivro/:id',
                element: <EditBook/>
            },
            {
                path: '/meuslivros',
                element: <MyBooks/>
            },
            {
                path: '/minhaconta',
                element: <MyAccount/>
            },
            {
                path: '/carrinho',
                element: <Cart/>
            },
            {
                path: '/minhascompras',
                element: <MyPurchases/>
            },
            {
                path: '/minhasvendas',
                element: <MySales/>
            }
        ] 
    }
])

export default router;
