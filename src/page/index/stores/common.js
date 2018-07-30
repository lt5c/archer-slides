import {
    observable,
    computed,
    action
} from 'mobx';

export default class Common {

    @observable showRevealRender = false;

    @action toggleShowRevealRender = () => {
        this.showRevealRender = !this.showRevealRender;
    }
}
