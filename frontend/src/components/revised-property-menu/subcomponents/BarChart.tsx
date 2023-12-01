import { Bar } from "react-chartjs-2";
import {backgroundColors, borderColors} from "../src/charParams"
import React from "react";

const BarChart = ({labels, dataValues}) => {
    const chartData = {
        labels: labels, 
        datasets: [
          {
            label: "Shop Issues Counts",
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2
          }
        ]
      };
    
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Shop Active Issues</h2>
            <Bar data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Number of Issues Per Shop"
                    }
                },
                responsive: true
                }}/>
        </div>
      );
}

export default BarChart;