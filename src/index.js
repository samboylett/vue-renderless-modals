const RenderlessModals = {
    install(Vue) {
        const store = {
            idCounter: 0,
            list: [],
        };

        Vue.prototype.$modals = {
            store,

            register() {
                const id = store.idCounter++;

                store.list = [
                    ...store.list,
                    {
                        id,
                        isOpen: false,
                    },
                ];

                return id;
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
