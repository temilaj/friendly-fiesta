import React, {Fragment } from 'react'
import axios from 'axios';
import {XYPlot, LineSeries, VerticalGridLines,XAxis, YAxis, HorizontalGridLines, AreaSeries} from 'react-vis';

import SiderBar from './SiderBar';

class Home extends React.Component {
    state = {
        temperatureReadings: [],
        temperatureData: [],
        hearRateData: [],
    }
    componentDidMount() {
        axios.get('/temperature')
            .then(response => {
                console.log('response.data');
                console.log(response.data);
                const { temperatures } = response.data;
                const lineData = temperatures.map(temp => {
                    return {
                        x: Date.parse(temp.createdAt),
                        y: temp.value,
                    }
                })
                this.setState({
                    temperatureReadings: [...temperatures],
                    temperatureData: [...lineData], 
                })
            })
        
        axios.get('/heartrate')
            .then(response => {
                console.log('response.data');
                console.log(response.data);
                const { heartRates } = response.data;
                const lineData = heartRates.map(temp => {
                    return {
                        x: Date.parse(temp.createdAt),
                        y: temp.value,
                    }
                })
                this.setState({
                    hearRateData: [...lineData], 
                })
            })
    }

    renderTemperatureChart(temperatureData) {
        return (
        <XYPlot height={400} width={1200} xType="time">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={temperatureData} />
          </XYPlot>)
    }

    renderHeartRateChart(heartRateData) {
        return (
        <XYPlot height={400} width={1200} xType="time" opacity={0.6}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <AreaSeries data={heartRateData} />
          </XYPlot>)
    }
    render() {
        const {temperatureReadings, temperatureData, hearRateData} = this.state;
        return (
        <Fragment>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Walk Assure</a>
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
                        <div className="">
                            <h2 className="h3">Temperature</h2>

                            {temperatureData.length > 0 && 
                                this.renderTemperatureChart(temperatureData)
                            }
                        </div>

                        <div className="">
                            <h2 className="h3">Heart Rate</h2>

                            {hearRateData.length > 0 && 
                                this.renderHeartRateChart(hearRateData)
                            }
                        </div>

                    </main>

                </div>

            </div>
        </Fragment>)
    }
}


export default Home;