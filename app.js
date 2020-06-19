//console.log("hello from app.js")
//const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const api_de_url = 'https://api.covid19api.com/dayone/country/germany';
const api_pl_url = 'https://api.covid19api.com/dayone/country/poland';

async function getData() {

/*    var a = 1 + 3;
    var b;
    setTimeout(function() {
        b = a + 4;
        console.log(b);
    }, (3 * 1000));
*/
    const response = await fetch(api_de_url);
    //const responsePL = await fetch(api_pl_url);
    const data = await response.json();
    //const {Active, Date} = data[data.length-1];
    
    data.forEach(element => {
        const {Active, Deaths} = element
        const Datee = element.Date
        //console.log(Datee)
        yactcases.push(Active);
        ydeaths.push(Deaths);
        d = new Date(Datee);

        new_date = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        xlabels.push(new_date);
    });


    /*
    Active: 20987
    City: ""
    CityCode: ""
    Confirmed: 168162
    Country: "Germany"
    CountryCode: "DE"
    Date: "2020-05-06T00:00:00Z"
    Deaths: 7275
    Lat: "51.17"
    Lon: "10.45"
    Province: ""
    Recovered: 139900
    */
}

async function getDataPL() {

    const response = await fetch(api_pl_url);
    const data = await response.json();
   
    let first_date = true;

    data.forEach(element => {
        const {Active, Deaths} = element
        const Datee = element.Date
        //console.log(Datee)
       
        d = new Date(Datee);
        new_date = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        if (first_date) {
            for (let e of xlabels) {
                //console.log(e) 
                //console.log(new_date) 
                if (e === new_date) break;
                yactcasespl.push(0);
                ydeathspl.push(0);
            }
            first_date = false
        }

        yactcasespl.push(Active);
        ydeathspl.push(Deaths);
        
        d = new Date(Datee);

        //xlabels.push(new_date);
    });


    /*
    Active: 20987
    City: ""
    CityCode: ""
    Confirmed: 168162
    Country: "Germany"
    CountryCode: "DE"
    Date: "2020-05-06T00:00:00Z"
    Deaths: 7275
    Lat: "51.17"
    Lon: "10.45"
    Province: ""
    Recovered: 139900
    */
}

async function chartIt() {
    await getData();
    await getDataPL();
    //await setTimeout(() => { getData(); }, 2000);
    const ctx = document.getElementById('chart').getContext('2d');
    //console.log(xlabels)
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: xlabels, 
            datasets: [{
                label: 'Active Cases',
                backgroundColor: 'lightblue',
                borderColor: 'lightblue',
                data: yactcases,
                fill:false
                        },
                    {
                label: 'Deaths',
                backgroundColor: 'darkblue',
                borderColor: 'darkblue',
                data: ydeaths,
                fill:false
                    },
                    {
                label: 'Active PL',
                backgroundColor: 'pink',
                borderColor: 'pink',
                data: yactcasespl,
                fill:false
                        },
                    {
                label: 'DeathsPL',
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                data: ydeathspl,
                fill:false

                    }
                ]
        },

        // Configuration options go here
        options: {}
    });
};
