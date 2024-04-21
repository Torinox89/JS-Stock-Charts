
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

   const response = await fetch(`https://api.twelvedata.com/time_series?symbol= GME, MSFT, DIS, BNTX&interval=1min&apikey=d83308b70234447f80bc98d310fdea48
    `)

    const result = await response.json()

//Array of stock: creatring, data por instructions.
//"Destructuring" creates new variables from an object or an array
   //const { GME, MSFT, DIS, BNTX } = result;
        //console.log(result)


//console.log the response from the server to make sure the data (result) still looks correct

// let GME = result.GME
// let MSFT = result.MSFT
// let DIS = result.DIS
// let BTNX = result.BTNX

const { GME, MSFT, DIS, BNTX } = mockData;

const stocks = [GME, MSFT, DIS, BNTX];
           console.log(stocks)

   //stock data:reverse.         
stocks.forEach( stock => stock.values.reverse())

   //new Chart(timeChartCanvas.getContext('2d'), {
    // type: 'line',
    // data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: 
    //             'rgba(255, 99, 132, 0.2)',
    //         borderColor: 
    //             'rgba(255, 99, 132, 1)',
    //     }]
    // }
//});

console.log(Chart)

console.log(stocks[0].values)  //we have an array of objects; each of which contain the current day.                                               
// map: iterator that transform each element of an array; we can collect an array of the properties in each value object.
//.datatime: property of each stock value (want to use as a label).
//stocks[0].values.map( value => value.datetime)



//Avarage value
function calculateAverage(values) {
    let total = 0;
    values.forEach(value => {
        total += parseFloat(value.high)
    })
    return total / values.length
}

//highest value
function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}


    // Time Chart:Adding.
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    
    // High Chart; adding.
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });

    // Average Chart; adding
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    calculateAverage(stock.values)
                ))
            }]
        }
    });
}





main()










