import { mount, createLocalVue } from '@vue/test-utils';

import RenderlessModals from '../../src/index';

describe('RenderlessModals', () => {
    let localVue;

    beforeEach(() => {
        localVue = createLocalVue();

        localVue.use(RenderlessModals);
    });

    describe('vm', () => {
        let vm;

        beforeEach(() => {
            vm = new localVue;
        });

        it('attaches a global $modals object', () => {
            expect(vm.$modals).toEqual(expect.any(Object));
        });

        describe('$modals', () => {
            it('has a store', () => {
                expect(vm.$modals.store).toEqual(expect.any(Object));
            });

            describe('register', () => {
                it('returns progressively higher modal IDs', () => {
                    expect(vm.$modals.register()).toBe(0);
                    expect(vm.$modals.register()).toBe(1);
                    expect(vm.$modals.register()).toBe(2);
                });

                it('adds the modal to the store list', () => {
                    expect(vm.$modals.store.list).toEqual([]);

                    vm.$modals.register();
                    expect(vm.$modals.store.list).toEqual([{
                        id: 0,
                        open: false,
                    }]);

                    vm.$modals.register();
                    expect(vm.$modals.store.list).toEqual([{
                        id: 0,
                        open: false,
                    }, {
                        id: 1,
                        open: false,
                    }]);
                });
            });

            describe('when modals registered', () => {
                let ids = [];

                beforeEach(() => {
                    ids = [
                        vm.$modals.register(),
                        vm.$modals.register(),
                        vm.$modals.register(),
                    ];
                });

                describe('open', () => {
                    beforeEach(() => {
                        vm.$modals.open(ids[1]);
                    });

                    it('will open the modal with that id', () => {
                        expect(vm.$modals.store.list[1].open).toBe(true);
                    });

                    it('will not open other modals', () => {
                        expect(vm.$modals.store.list[0].open).toBe(false);
                        expect(vm.$modals.store.list[2].open).toBe(false);
                    });
                });
            });
        });
    });
});
