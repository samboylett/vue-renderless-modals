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
                        open: false,
                    },
                ];

                return id;
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
                this.setModalData(id, { open: true });
            },

            close(id) {
                this.setModalData(id, { open: false });
            },
        };
    },
};

export default RenderlessModals;
