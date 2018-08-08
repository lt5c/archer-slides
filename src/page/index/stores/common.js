import {
    observable,
    computed,
    action
} from 'mobx';
import {
    EDITOR_WRAPPER_WIDTH,
    EDITOR_WRAPPER_HEIGHT,
} from '../constants/constants';

export default class Common {

    @observable showRevealRender = false;

    @observable editorWrapper = {
        width: EDITOR_WRAPPER_WIDTH,
        height: EDITOR_WRAPPER_HEIGHT,
    }

    @computed get editorScale() {
        const { width, height } = this.editorWrapper;
        const scale = Math.min(width / EDITOR_WRAPPER_WIDTH, height / EDITOR_WRAPPER_HEIGHT);
        console.dev('editorScale', scale);
        return scale;
    }

    @computed get editorMargin() {
        const { width, height } = this.editorWrapper;
        const margin = `${(height - EDITOR_WRAPPER_HEIGHT) / 2}px ${(width - EDITOR_WRAPPER_WIDTH) / 2}px`;
        console.dev('editorMargin', margin);
        return margin;
    }

    @action toggleShowRevealRender = () => {
        this.showRevealRender = !this.showRevealRender;
    }

    @action resizeEditor = (width, height) => {
        this.editorWrapper = { width, height };
    };
}
