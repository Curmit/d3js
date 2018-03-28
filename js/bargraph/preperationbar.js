function totalEducation(){

    'use strict';

    const fs = require('fs');
    
    let rawdata = fs.readFileSync('vacancies.json');  
    let vacancies = JSON.parse(rawdata);  
    console.log(vacancies);  




}