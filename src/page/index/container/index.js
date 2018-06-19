import React, { Component } from 'react';
import Connect from '../connect/connect';
import sharejs from 'page/common/sharejs';
import clonedeep from 'lodash.clonedeep';

import ArcherText from '../slide-components/archer-text';
import ArcherImage from '../slide-components/archer-image';

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
      let doc = sharejs.connect(_=>{
          doc.subscribe(this.applyKeyframe(doc.data));
          doc.on('before op', (op, source) => {
            // if(!source) { //source from server
              jsonOP(op, 'server', true);
            // }
          });
      });
      this.doc = doc;
      window.doc = doc;
    }

    applyKeyframe(k) {
      let {onKeyframe} = this.props;
      let keyframe = clonedeep(k);
      onKeyframe(k);
    }

    commitOP(op) {
      let {jsonOP} = this.props;
      let doc = this.doc;

      doc.submitOp(op);
    }

    renderSlides() {
      let slides = this.props.slides || {};
      let commitOP = this.commitOP;

      return Object.keys(slides).map(id=>{
        let item = slides[id];
        let path = [id];
        switch (item.type) {
          case 'at':
            return <ArcherText data={item} path={path} key={id} commitOP={commitOP}/>
          case 'ai':
            return <ArcherImage data={item} path={path} key={id} commitOP={commitOP}/>
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
