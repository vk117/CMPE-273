import React from 'react';
import NavBar from './NavBar';
import Jumbo from './Jumbo';
import Footer from './Footer';

class HomePage extends React.Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div>
                <NavBar/>
                <Jumbo/>
                <Footer/>
            </div>
            
        )
    }
}

export default HomePage;