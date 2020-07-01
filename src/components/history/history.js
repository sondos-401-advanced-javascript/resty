import React from 'react';
import { Link } from 'react-router-dom';
import './history.scss';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }
    handlerClick(e) {
        let array = e.target.value.split('  ');
        if (array[5]) {
            let method = array[1];
            let url = array[3];
            let data = array[5];
            this.props.handel(method,url,data);
        }
        else {
            let method = array[1];
            let url = array[3];
            this.props.handel(method,url); 
        }
    }

    getDataLocal() {
        let queryLocalStorage = JSON.parse(localStorage.getItem('query'));
        let items = [];
        if (queryLocalStorage) {
            return items = queryLocalStorage.map((item, i) => {
                if (item.body) {
                    let body = JSON.stringify(item.body);
                    return <input type='text' readOnly='readonly' onClick={this.handlerClick} key={i} value={`method:  ${item.method}  url:  ${item.url}  body:  ${body}`} />
                }
                else {
                    return <input type='text' readOnly='readonly' onClick={this.handlerClick} key={i} value={`method:  ${item.method}  url:  ${item.url}`} />
                }
            });
        }
    }


    render() {
        return (
            <ul>
                <Link to='/'>
                {this.getDataLocal()}
                </Link>
                
            </ul>
        )
    }
}
export default History;