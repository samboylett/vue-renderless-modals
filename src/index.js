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
        };
    },
};

export default RenderlessModals;
