import Chart from 'chart.js/auto';

const ctx = document.getElementById('nutrients-chart');
const NutrientChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Carbs', 'Proteins', 'Fats'],
        datasets: [{
            label: 'gram of 100 grams',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

export default NutrientChart;