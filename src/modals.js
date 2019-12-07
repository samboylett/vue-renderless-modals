export const store = {
    idCounter: 0,
    list: [],
};

export const methods = {
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
