import React from 'react';
// import { getAllgames, getTypes, filterType, filterCreated, orderAlfa, orderForce } from '../../redux/actions'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import logo from "./logo.png";
import './Navbar.css';

export default function Navbar() {
    // const dispatch = useDispatch()
    // const types = useSelector(state => state.types)
    // const [order, setOrder] = useState('')
   
   

    // useEffect(() => {
    //     dispatch(getTypes())
    // }, [dispatch])
  
    // function filterTypeHdl(e) {
    //     dispatch(filterType(e.target.value));
    // }
    // function filterCreatedHdl(e) {
    //     dispatch(filterCreated(e.target.value));
    // }
    // function orderAlfaHdl(e) {
    //     e.preventDefault();
    //     dispatch(orderAlfa(e.target.value));
    //     setOrder(e.target.value)
    // }
    // function orderForceHdl(e) {
    //     e.preventDefault();
    //     dispatch(orderForce(e.target.value));
    //     setOrder(e.target.value)
    // }
 
 

    return (
        <header className='header'>
            <div className='container logo-nav-container'>
                <img className="imgl" src={logo} width="110px" height="45px" alt="logo" />
                
                <nav className="navigation">
                    <Link to='/create' >
                        <button className='btnCreate'>Create</button>
                    </Link>
                    <Link to='/about'>
                        <button className='btnCreate'>About</button>
                    </Link>

                    <Link to='/' >
                        <button className='btnLogout'>LogOut</button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
