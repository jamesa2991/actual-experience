import React from 'react';
import { connect } from 'react-redux';
import {RadialChart, XYPlot, XAxis, YAxis, VerticalBarSeries, VerticalGridLines, HorizontalGridLines} from 'react-vis';

let Stats = ({ crimeInfo, radialData, barData }) => {

    //Only try to display the graphs if there is information available.
    if (crimeInfo.length > 0) {
        return (
            <div id="stats">
                <div id="radial">
                    <RadialChart
                        innerRadius={150}
                        radius={230}
                        data={radialData}
                        width={600}
                        height={600}
                        showLabels={true}
                    />
                </div>
                <div id="bar">
                    <XYPlot
                        xType="ordinal"
                        width={1200}
                        height={750}
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries
                            className="vertical-bar-series-example"
                            data={barData}
                        />
                    </XYPlot>
                </div>
            </div>
        )
    } else {
        return <div id="stats"></div>;
    }
};

const _mapStateToProps = (state) => ({
    crimeInfo: state.crimeInfo,
    radialData: state.radialData,
    barData: state.barData
});

Stats = connect(_mapStateToProps)(Stats);

export default Stats;