import React from 'react';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    render() {
        var {options, value, multiple} = this.props;

        if(value !== undefined){
            this.state = {
                value: value
            };
        }


        return (
            <div>
                <div className="dropdown">
                    <button className="editor-control btn btn-default dropdown-toggle" type="button"
                            data-toggle="dropdown">{this.props.placeholder + ' '}
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {
                            options.map((option, index)=> {

                                var selected = (value !== undefined && (option === value || (typeof value === 'object' && value[option] === true)));

                                var tick = (selected === false)? '':
                                    <i className="fa fa-check" aria-hidden="true"></i>;

                                return <li key={index} className={(selected)? 'selected' : ''}><a
                                    href="#" onClick={(e)=>{
                                    e.preventDefault();
                                    if(multiple){
                                        var value = this.state.value;
                                        value[option] = !value[option];
                                        this.setState({ value: value});
                                        this.props.onChange(option, this.state.value[option]);
                                    }else {
                                        this.setState({ value: option});
                                        this.props.onChange(option);
                                    }

                                    }
                                    }>{tick} {option}</a></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}