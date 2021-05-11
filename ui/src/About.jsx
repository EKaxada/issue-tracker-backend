import React from 'react';
import store from './store.js'

export default class About extends React.Component(){

    constructor(props) {
        super(props);
        const apiAbout =store.initialData?store.initialData.about:null;
        this.state = {apiAbout}
    }

   render() {return(
        <div className="text-center">
            <h3>Issue Tracker version 0.9</h3>
            <h4>
                {store.initialData ? store.initialData.about : 'unknown'} 
            </h4>
        </div>
    )}
}