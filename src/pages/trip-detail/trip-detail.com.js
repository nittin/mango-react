import React, {Component} from 'react';
import {withRouter} from 'react-router';
import MasterContext from '../../layout/master.context';
import TripService from '../../services/trip.service';
import './trip-detail.com.less';

class TripDetail extends Component {
    constructor() {
        super();
        this.state = {
            trip: {},
        };
    }

    static contextType = MasterContext;

    componentDidMount() {
        const { match, location, history } = this.props;
        const { id } = match.params;

        TripService.getTripById(id).then(response => {
            this.setState({
                trip: response,
            });
            this.context.setTitle(response.name);
        });
    }

    render() {
        const {trip} = this.state;
        const {profiles = []} = trip;
        return (
            <div className="trips">
                <div className="list p-3">
                    {profiles.map(i => (
                        <div className="list-group-item" key={i._id}>
                            <span>{i.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(TripDetail);
