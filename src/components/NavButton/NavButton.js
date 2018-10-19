import React, {
    Component
} from 'react';
import NavButton from './NavButton.css';

class NavBtn extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /*
  toggle(openSideMenuHandler, closeSideMenuHandler) {
    let container = document.querySelector('.container')
    container.classList.toggle("change")

    if (this.state.sideOpen) closeSideMenuHandler()
    else openSideMenuHandler()

    this.setState({
      sideOpen: !this.state.sideOpen
    })
  }
*/
    handleClick(e) {
        e.className.toggle("change");
        console.log("Btn clicked!");
    }

    render() {
        return ( <
            div className = "navbtn-container"
            onClick = {
                this.handleClick
            } >
            <
            div className = "bar1" > < /div> <
            div className = "bar2" > < /div> <
            div className = "bar3" > < /div> <
            /div>

        );
    }
}

export default NavBtn;