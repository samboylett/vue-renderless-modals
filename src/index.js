import { methods } from './modals';

const RenderlessModals = {
    install(Vue, {
        globalObject = '$modals',
    } = {}) {
        Vue.prototype[globalObject] = methods;
    },
};

export default RenderlessModals;
