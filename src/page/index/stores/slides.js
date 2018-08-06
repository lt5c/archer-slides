import {
    observable,
    computed,
    action
} from 'mobx';

export default class Slides {

    @observable slides = {};
    @observable tabs = [];
    @observable focusId = null;

    @computed get curSlide() {
        return (this.focusId && this.slides[this.focusId]);
    }
    @computed get curSlideID() {
        return this.focusId;
    }
    @computed get curSlideIndex() {
        return this.tabs.findIndex(tabid => tabid === this.focusId);
    }

    @computed get tabCount() {
        return (((this.tabs instanceof Array) && this.tabs.length) || 0);
    }

    @action.bound
    onKeyframe = (keyframe) => {
        this.slides = keyframe.slides;
        this.tabs = keyframe.tabs;
        if (!this.focusId || !this.slides[this.focusId]) {
            this.focusId = this.tabs[0];
        }
    }

    @action.bound
    selectTab = (tabId) => {
        this.focusId = tabId;
    }


}
