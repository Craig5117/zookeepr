const express = require('express');
const app = express();
const { animals } = require('./data/animals.json')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toLowerCaseArr(array) {
    let lowerCaseArr = []
    array.forEach(item => {
        item = item.toLowerCase()
        lowerCaseArr = [...lowerCaseArr, item]
    })
    return array = lowerCaseArr;
}

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // this saves the animals array as filteredResults
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits.toLowerCase()];
        }
        else {
            personalityTraitsArray = toLowerCaseArr(query.personalityTraits)
        }
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        // It is indexOf that checks the index of the filtered results 
        // and anything other than filtered is assigned -1.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet.toLowerCase());
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species.toLowerCase());
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === capitalizeFirstLetter(query.name));
    }
    return filteredResults;
}


app.get('/api/animals', (req, res) => {
    let results = animals
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
})