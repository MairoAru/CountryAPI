const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const { response } = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', ejs)
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.render('CountryAPI.ejs', {CountryInfo: ''});
});

app.post('/', (req, res)=>{
    
    const userCountry = req.body.country;
    const url = `https://restcountries.com/v2/name/${userCountry}`;


    axios.get(url)
    .then((response)=>{
        let DataCountry = {
            countryName: '',
            countryDomain: '',
            countryCallingCode: '',
            countryCapital: '',
            countryRegion: '',
            countrySubregion: '',
            countryPopulation: '',
            countryTimezone: '',
            countryLanguage: '',
            countryCurrency: '',
            result: ''
            
            
        };
         console.log(response.data);
        
            DataCountry.countryName = response.data[0].name;
            DataCountry.countryDomain = response.data[0].topLevelDomain[0];
            DataCountry.countryCallingCode = response.data[0].callingCodes[0];
            DataCountry.countryCapital = response.data[0].capital;
            DataCountry.countryRegion = response.data[0].region;
            DataCountry.countrySubregion = response.data[0].subregion;
            DataCountry.countryPopulation = response.data[0].population;
            DataCountry.countryTimezone = response.data[0].timezones[0];
            DataCountry.countryLanguage = response.data[0].languages[0].name;
            DataCountry.countryCurrency = response.data[0].currencies[0].code;
        // DataCountry.result =  countryName;
            
        

        res.render('CountryAPI.ejs',{CountryInfo:DataCountry});

    });
});

app.listen(3001, ()=> {  //function() / ()=>{}
    console.log('server is running on port 3001');

});
