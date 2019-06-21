import React, {Fragment } from 'react'

import SiderBar from './SiderBar';

class Home extends React.Component {
    state = {
        temperatureReadings: []
    }
    componentDidMount() {
        this.state.temperatureReadings = [...this.fetchTemperature()];
    }

    fetchTemperature(){
        const results = fetch('/temperature').then(data => data.json()).then(results => {
            console.log(results);
            return results;
        })

    }
    render() {
        return (
        <Fragment>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Smart Assist</a>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <SiderBar />
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group mr-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                <span data-feather="calendar"></span>
                                This week
                            </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Fragment>)
    }
}


export default Home;