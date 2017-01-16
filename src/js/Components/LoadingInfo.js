import React,{ Component } from 'react';
class LoadingInfo extends Component{

    render(){

        return (
            <div id="caseBlanche">
                <div id="rond">
                    <div id="test"></div>
                </div>
                <div id="load">
                    <p>{this.props.info}</p>
                </div>
            </div>
        );
    }
}

export default LoadingInfo;