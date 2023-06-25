import { useHistory } from 'react-router-dom'


const Logout = () => { 
    const history = useHistory()  
	localStorage.removeItem('myData');  
    history.push("/")
    return "";
  
}

export default Logout
