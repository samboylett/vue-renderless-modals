import BaseModal from './components/BaseModal';
import ModalsTarget from './components/ModalsTarget';

export {
    BaseModal,
    ModalsTarget,
};

const RenderlessModals = {
    install(Vue) {
        const store = {
            idCounter: 0,
            list: [],
        };

        Vue.prototype.$modals = {
            store,

            register(name = null) {
                const id = name || store.idCounter++;

                if (store.list.some(modal => modal.id === id)) {
                    throw new Error(`Modal with id "${ id }" already exists`);
                }

                store.list = [
                    ...store.list,
                    {
                        id,
                        isOpen: false,
                    },
                ];

                return id;
            },

            getPortalName(id) {
                return `modal-${ id }`;
            },

            unregister(id) {
                store.list = store.list.filter(modal => modal.id !== id);
            },

            setModalData(id, data) {
                store.list = store.list.map(modal => {
                    if (modal.id !== id) {
                        return modal;
                    }

                    return {
                        ...modal,
                        ...data,
                    };
                });
            },

            open(id) {
                this.setModalData(id, { isOpen: true });
            },

            close(id) {
                this.setModalData(id, { isOpen: false });
            },
        };
    },
};

export default RenderlessModals;
