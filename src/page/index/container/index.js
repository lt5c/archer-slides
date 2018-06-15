import React, { Component } from 'react';
import Connect from '../connect/connect';
import sharejs from 'page/common/sharejs';

import ArcherTextarea from '../components/archer-textarea';

import './index.less';

class Wrapper extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {};

      this.renderSlides = this.renderSlides.bind(this);
      this.commitOP = this.commitOP.bind(this);
    }

    componentDidMount() {
      this.listenServerOP();
    }

    //监听server op
    listenServerOP() {
      let {jsonOP} = this.props;
      let doc = sharejs.connect();
      doc.on('before op', (op, source) => {
        // if(!source) { //source from server
          jsonOP(op, 'server', true);
        // }
      });
      this.doc = doc;
    }

    commitOP(op) {
      let {jsonOP} = this.props;
      let doc = this.doc;

      doc.submitOp(op);
    }

    renderSlides() {
      let slides = this.props.slides || {};
      let commitOP = this.props.commitOP;

      return Object.keys(slides).map(id=>{
        let item = slides[id];
        let path = [id];
        switch (item.type) {
          case 'at':
            return <ArcherTextarea data={item} path={path} key={id} commitOP={commitOP}/>
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
