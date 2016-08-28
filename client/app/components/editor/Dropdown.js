import React from 'react';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    render() {
        var {options, value} = this.props;


        return (
            <div>
                <div className="dropdown">
                    <button className="editor-control btn btn-default dropdown-toggle" type="button"
                            data-toggle="dropdown">{this.props.placeholder + ' '}
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {
                            options.map((option, index)=> {
                                return <li key={index} className={(option === this.state.value)? 'selected' : ''}><a
                                    href="#" onClick={(e)=>{
                                    e.preventDefault();
                                    this.setState({ value: option});
                                    this.props.onChange(option);
                                    }
                                    }>{option}</a></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}