import React, { Component } from 'react';
import Connect from '../connect/connect';

import ArcherTextarea from '../components/archer-textarea';

import './index.less';

class Wrapper extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {};

      this.renderSlides = this.renderSlides.bind(this);
    }

    renderSlides() {
      let slides = this.props.slides || {};

      return Object.keys(slides).map(id=>{
        let item = slides[id];
        switch (item.type) {
          case 'at':
            return <ArcherTextarea data={item} key={id}/>
          default:
            return null
        }
      });
    }

    render() {
      let mainStyle = {
        height: (window.innerHeight - 50)+'px',
      }

      return (
        <div className="wrapper">
          <div className="toolbar"></div>
          <div className="main" style={mainStyle}>
            <div className="sidebar"></div>
            <div className="editor">
              {this.renderSlides()}
            </div>
          </div>
        </div>
      );
    }
}

export default Connect(Wrapper);
