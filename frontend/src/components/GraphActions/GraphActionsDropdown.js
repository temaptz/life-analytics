import React from 'react';
import AddGraphButton from './AddGraphButton';
import DeleteGraphButton from './DeleteGraphButton';
import './GraphActionsDropdown.css';

class GraphActionsDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownVisible : false,
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    render() {

        const { onAddGraphClick, onDeleteGraphClick } = this.props;

        return (
            <div className="dropdown-container">

                <i className="button fa fa-cog fa-2x"
                   aria-hidden="true"
                   onClick={ this.toggleDropdown.bind(this) }>
                </i>

                <div className={`dropdown ${this.state.dropdownVisible ? '' : 'hidden'}`}>

                    <DeleteGraphButton onButtonClick={ onDeleteGraphClick } />

                    <AddGraphButton onButtonClick={ onAddGraphClick } />

                </div>

            </div>
        );
    }

    // Показать или скрыть dropdown
    toggleDropdown() {

        this.setState({ dropdownVisible : !this.state.dropdownVisible }, () => {

            if ( this.state.dropdownVisible ) {

                document.addEventListener('click', this.handleOutsideClick);

            } else {

                document.removeEventListener('click', this.handleOutsideClick);

            }

        });
    }

    // Определить клик вне компонента
    handleOutsideClick() {
        this.toggleDropdown();
    }

}

export default GraphActionsDropdown;