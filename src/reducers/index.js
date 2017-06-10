import { combineReducers } from 'redux';

const postcode = (state = '', action) => {
    switch (action.type) {
        case 'SET_POSTCODE':
            return action.postCode;
        default:
            return state;
    }
};

const coordinates = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COORDS':
            return {
                long: action.long,
                lat: action.lat
            };
        default:
            return state;
    }
};

const crimeInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_CRIMES':
            let crimeInfo = {};

            //First we want to go through each category of crime, and generate the total number for each type
            action.crimes.map(crime => {
                const { category } = crime;
                if (crimeInfo[category]) {
                    return crimeInfo[category] += 1;
                } else {
                    return crimeInfo[category] = 1;
                }
            });

            //Now we know how much is in each one, create  an array of objects to pass to our display library
            let crimeInfoPerCategory = [];

            //We will need to transform object keys for different graph styles, so save default keys here.
            Object.keys(crimeInfo).map((category) => {
                return crimeInfoPerCategory = [
                    ...crimeInfoPerCategory,
                    {
                        category,
                        total: crimeInfo[category]
                    }

                ];
            });
            return crimeInfoPerCategory;
        default:
            return state;
    }
};

//Format the crime data into the format that the radial graph requires.
const radialData = (state = [], action) => {
    switch (action.type) {
        case 'SET_RADIAL_DATA':
            if (action.data.length > 0) {
                let radialKeys = [
                    {
                        oldKey: 'category',
                        newKey: 'label'
                    },
                    {
                        oldKey: 'total',
                        newKey: 'angle'
                    }
                ];
                return  _transformData(action.data, radialKeys);
            } else {
                return state;
            }
        default:
            return state;
    }
};

//Format the crime data into the format that the bar graph requires.
const barData = (state = [], action) => {
    switch (action.type) {
        case 'SET_BAR_DATA':
            if (action.data.length > 0) {
                let barKeys = [

                    {
                        oldKey: 'category',
                        newKey: 'x'
                    },
                    {
                        oldKey: 'total',
                        newKey: 'y'
                    }
                ];
                return _transformData(action.data, barKeys);
            } else {
                return state;
            }
        default:
            return state;
    }
};

//Go through each object in the array, create a mirror array with the new key names
const _transformData = (data, keys) => {
    let newData = [];
    data.map(obj => {
        let newObj = {};
        keys.map(key => {
            return newObj[key['newKey']] =  obj[key['oldKey']];
        });
        return newData = [
            ...newData,
            newObj
        ];

    });
    return newData;
};

const crime_store = combineReducers({
    postcode,
    coordinates,
    crimeInfo,
    radialData,
    barData
});

export default crime_store;