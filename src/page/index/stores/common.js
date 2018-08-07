import {
    observable,
    computed,
    action
} from 'mobx';

export default class Common {

    @observable showRevealRender = false;

    @observable editorScale = 1;

    @action toggleShowRevealRender = () => {
        this.showRevealRender = !this.showRevealRender;
    }

    @action resetEditorScale = (scale) => {
        this.editorScale = scale || 1;
    }
}
