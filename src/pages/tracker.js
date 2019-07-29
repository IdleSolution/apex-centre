import React, { Component } from 'react';

import SearchProfile from '../components/Tracker/SearchProfile';
import Layout from '../components/Layout/Layout';
import Aux from './../hoc/_Aux'
import { Helmet } from 'react-helmet';

class Tracker extends Component{
    state = {
        error: null
    }
    componentDidMount() {
        const { search } = this.props.location;
        const error = search.match(/err=([^&]*)/);
        if(error) {
            this.setState({error: error[1].split('_').join(' ')})
        }
    }
    render(){
        return(
            <Aux>
                <Helmet>
                    <title>Apex Legends Tracker - Check Your Stats!</title>
                    <meta name="description" content='Check your Apex Legends stats now! Watch as you progress with the best Apex Legends Tracker'/>
                    <meta name='keywords' content='apex, legends, tracker, stats, player' />
                    <meta name="og:title" content='Apex Centre - Check Your Stats!'/>
                    <meta property="og:image" content="https://pbs.twimg.com/media/DzP4GgXUUAAWi8Q.jpg:large"/>
                    <link rel="canonical" href="https://www.apex-centre.com/tracker/"/>

                </Helmet>
                <Layout>
                    <SearchProfile navigate={this.props.navigate} err={this.state.error}/>
                </Layout>
            </Aux>
        )
    }

}

export default Tracker;