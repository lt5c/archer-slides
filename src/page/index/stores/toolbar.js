import {
    observable,
    // computed,
    action
} from 'mobx';

export default class Toolbar {

    @observable showImagePortal = false;

    @action triggerShowImagePortal = () => {
        this.showImagePortal = !this.showImagePortal;
    }
}
