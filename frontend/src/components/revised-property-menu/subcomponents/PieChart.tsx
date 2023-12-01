//Travis Block

//This subcomponent renders a pie chart using chart js. the data comes from the Chart Channel
//Travis Block

/*This is a default piechart with predetermined variables for use on the property report page.
Later these can be further edited with more props to make it work with more than just the one piechart I want*/


import { Pie } from "react-chartjs-2";
import { borderColors, backgroundColors } from "../src/charParams";

const PieChart = ({ labels, dataValues }) => {

  const chartData = {
    labels: labels, 
    datasets: [
      {
        label: "Active Work Issue Types",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2
      }
    ]
  };

return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Types of Active Issues</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "How many types of issues are happening in the given building."
            }
          },
          responsive: true
        }}
      />
    </div>
  );
}

export default PieChart;