import React from 'react';

import { connect } from 'react-redux';

let Input = ({ dispatch }) => {
    let postCode;
    return (
        <div id="crimeStats">
            <h1>Local Crime Statistics</h1>
            <h3>Jay Allen Actual Experience</h3>
            <form id="postcode" onSubmit={(event) => {
                event.preventDefault();
                dispatch(savePostCodeToState(postCode.value));
                postCode.value = '';
            }}>
                <input type="text" id="postcode_input" placeholder="Enter a postcode to search local crime statistics" ref={input => postCode = input} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

const savePostCodeToState = (postCode) => (dispatch, getState) => {
    //store the post code into the state
    new Promise(resolve => {
        dispatch({
            type: 'SET_POSTCODE',
            postCode
        });
        resolve(getState());
    })
        //We will then get the coordinates of the postcode, to use with the police crime API
        .then(
            response => {
                fetch(`http://api.postcodes.io/postcodes/${postCode}`)
                    .then(response => response.json())
                    .then(json => json.result)
                    //save the coordinates into the state
                    .then(result => {
                        new Promise(resolve => {
                            dispatch({
                                type: 'SET_COORDS',
                                long: result.longitude,
                                lat: result.latitude,
                            });
                            resolve(getState());
                        })
                        //Get crime information from the police API and JSON it, then save the results
                            .then(response => {
                                const { long, lat } = response.coordinates;
                                fetch(`https://data.police.uk/api/crimes-street/all-crime?lng=${long}&lat=${lat}`)
                                    .then(response => response.json())
                                    .then(result => {
                                        new Promise(resolve => {
                                            dispatch({
                                                type: 'SET_CRIMES',
                                                crimes: result,
                                            });
                                            resolve(getState());
                                        })
                                            //The display libraries need differently formatted data, save this new format
                                            //into the state for use in the template
                                            .then(()=> {
                                                dispatch({
                                                    data: getState().crimeInfo,
                                                    type: 'SET_RADIAL_DATA'
                                                });
                                                dispatch({
                                                    data: getState().crimeInfo,
                                                    type: 'SET_BAR_DATA'
                                                });
                                            })
                                    })
                            })
                            //If the postcode cannot be found (bad data) don't crash the program.
                            .catch(error => {
                                console.log("Postcode was not recognised...");
                            })
                    })

            }
        )
};

Input = connect()(Input);

export default Input;