import React from 'react';
import { useSearchParams } from 'react-router-dom'
import { withRoute } from '../../Utils/HigherOrderComp';
import "./_info.scss";

class Info extends React.Component {



    render() {
        return (
            <div>
                <h1 className='info-header' style={{ color: 'lightblue' }}>Info Page</h1>
                <div>{this.props.queryString[0].get('data')}</div>
                <div>data from location state, {this.props.location?.state?.data}</div>
                <div>data from router parameter, {this.props.params.id}</div>
                <input onChange={() => console.log('changed')} type="text" name="" id="" />

            </div>
        )
    }
}

export default withRoute(Info);