import React from 'react';

import { connect } from 'react-redux';
import savePostCodeToState from '../actions';

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



Input = connect()(Input);

export default Input;