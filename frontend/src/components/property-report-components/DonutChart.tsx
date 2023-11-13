
// Ripped straight from HW #3, edit and stick into the list component as needed

// Define background and border colors for the chart
const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(40, 159, 64, 0.8)',
    'rgba(210, 199, 199, 0.8)',
    'rgba(78, 52, 199, 0.8)',
    'rgba(128, 0, 0, 0.8)',
    'rgba(0, 128, 0, 0.8)',
    'rgba(0, 0, 128, 0.8)',
    'rgba(128, 128, 0, 0.8)',
    'rgba(128, 0, 128, 0.8)',
    'rgba(0, 128, 128, 0.8)',
    'rgba(192, 192, 192, 0.8)',
    'rgba(128, 128, 128, 0.8)',
    'rgba(0, 0, 0, 0.8)',
    'rgba(255, 0, 0, 0.8)',
    'rgba(0, 255, 0, 0.8)',
    'rgba(0, 0, 255, 0.8)',
    'rgba(255, 255, 0, 0.8)',
    'rgba(0, 255, 255, 0.8)',
    'rgba(255, 0, 255, 0.8)',
    'rgba(220, 20, 60, 0.8)',
    'rgba(184, 134, 11, 0.8)',
  ];
  
  const borderColors = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(159, 159, 159, 1)',
    'rgba(83, 102, 255, 1)',
    'rgba(40, 159, 64, 1)',
    'rgba(210, 199, 199, 1)',
    'rgba(78, 52, 199, 1)',
    'rgba(128, 0, 0, 0.8)',
    'rgba(0, 128, 0, 0.8)',
    'rgba(0, 0, 128, 0.8)',
    'rgba(128, 128, 0, 0.8)',
    'rgba(128, 0, 128, 0.8)',
    'rgba(0, 128, 128, 0.8)',
    'rgba(192, 192, 192, 0.8)',
    'rgba(128, 128, 128, 0.8)',
    'rgba(0, 0, 0, 0.8)',
    'rgba(255, 0, 0, 0.8)',
    'rgba(0, 255, 0, 0.8)',
    'rgba(0, 0, 255, 0.8)',
    'rgba(255, 255, 0, 0.8)',
    'rgba(0, 255, 255, 0.8)',
    'rgba(255, 0, 255, 0.8)',
    'rgba(220, 20, 60, 0.8)',
    'rgba(184, 134, 11, 0.8)',
  ];
  
  // Function to fetch Thrones API data
  const fetchCharacters = async () => {
    try{
    const res = await fetch('https://thronesapi.com/api/v2/Characters');
    const data = await res.json();
    return data;
    } 
    catch (error) {
    console.error("There was an error fetching the characters:", error);
    return [];
    }
  };
  
  // Function to sanitize house names
  const sanitizeHouseName = (name) => {
    switch (name) {
      case 'Mormont':
        return 'House Mormont';
      case 'Baratheon':
        return 'House Baratheon';
      case 'Bolton':
        return 'House Bolton';
      case 'Stark':
        return 'House Stark';
      case 'Targaryan':
      case 'Targaryen':
        return 'House Targaryen';
      case 'House Lannister':
      case 'Lannister':
      case 'Lanister':
      case 'House Lanister':
        return 'House Lannister';
      case 'Tarth':
        return 'House Tarth';
      case 'Greyjoy':
        return 'House Greyjoy';
      case '':
      case 'None':
      case 'Unkown':
      case undefined:
        return 'Unknown';
      default:
        return name;
    }
  };
  
  const countByHouse = (characters) => {
    const counts = {};
  
    characters.forEach((character) => {
      const house = sanitizeHouseName(character.family);
      if (house) {
        counts[house] = (counts[house] || 0) + 1;
      }
    });
    return counts;
  };
  
  const renderChart = (houseData) => {
    const labels = Object.keys(houseData);
    const data = Object.values(houseData);
    const donutChart = document.querySelector('.donut-chart');
  
    new Chart(donutChart, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: true
        }
      }
    });
  };
  
  // Render to DOM post-fetch
  document.addEventListener('DOMContentLoaded', async () => {
    const characters = await fetchCharacters();
    const houseCounts = countByHouse(characters);
    renderChart(houseCounts);
  });
