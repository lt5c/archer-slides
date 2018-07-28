import {
    observable,
    computed,
    action
} from 'mobx';

export default class Slides {

    @observable slides = {};

    @action.bound
    onKeyframe(keyframe) {
        this.slides = keyframe;
    }
}
