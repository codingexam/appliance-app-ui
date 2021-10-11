import React from 'react'
import {Link} from 'react-router-dom';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h2>Welcome <span>{this.props.match.params.name || sessionStorage.getItem('authenticatedUser')}</span>. To manage your home appliances <Link to="/appliances">Click here</Link></h2>
            </div>
        )
    }
} 

export default Home