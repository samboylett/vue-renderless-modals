import { mount, createLocalVue } from '@vue/test-utils';

import RenderlessModals from '../../src/index';
import BaseModal from '../../src/components/BaseModal';

describe('RenderlessModals', () => {
    let localVue;

    beforeEach(() => {
        localVue = createLocalVue();

        localVue.use(RenderlessModals);
    });

    describe('BaseModal', () => {
        const UserModal = {
            components: {
                BaseModal,
            },

            template: `
                <base-modal>
                    <template
                        #default="slotProps"
                    >
                        {{ setProps(slotProps) }}
                    </template>
                </base-modal>
            `,

            methods: {
                setProps(slotProps) {
                    this.baseModalProps = slotProps;
                },
            },
        };

        let wrapper;

        beforeEach(() => {
            wrapper = mount(UserModal, { localVue });
        });

        it('gets an id', () => {
            expect(wrapper.vm.baseModalProps.id).toBe(0);
        });

        it('has a default isOpen of false', () => {
            expect(wrapper.vm.baseModalProps.isOpen).toBe(false);
        });

        describe('toggle with no arguments', () => {
            beforeEach(() => {
                wrapper.vm.baseModalProps.toggle();
            });

            it('opens the modal', () => {
                expect(wrapper.vm.baseModalProps.isOpen).toBe(true);
            });
        });

        describe('toggle with false', () => {
            beforeEach(() => {
                wrapper.vm.baseModalProps.toggle(false);
            });

            it('does nothing', () => {
                expect(wrapper.vm.baseModalProps.isOpen).toBe(false);
            });
        });

        describe('open', () => {
            beforeEach(() => {
                wrapper.vm.baseModalProps.open();
            });

            it('opens the modal', () => {
                expect(wrapper.vm.baseModalProps.isOpen).toBe(true);
            });

            describe('close', () => {
                beforeEach(() => {
                    expect(wrapper.vm.baseModalProps.isOpen).toBe(true);
                    wrapper.vm.baseModalProps.close();
                });

                it('closes the modal', () => {
                    expect(wrapper.vm.baseModalProps.isOpen).toBe(false);
                });
            });

            describe('toggle with no arguments', () => {
                beforeEach(() => {
                    wrapper.vm.baseModalProps.toggle();
                });

                it('closes the modal', () => {
                    expect(wrapper.vm.baseModalProps.isOpen).toBe(false);
                });
            });

            describe('toggle with true', () => {
                beforeEach(() => {
                    wrapper.vm.baseModalProps.toggle(true);
                });

                it('does nothing', () => {
                    expect(wrapper.vm.baseModalProps.isOpen).toBe(true);
                });
            });
        });
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
                        isOpen: false,
                    }]);

                    vm.$modals.register();
                    expect(vm.$modals.store.list).toEqual([{
                        id: 0,
                        isOpen: false,
                    }, {
                        id: 1,
                        isOpen: false,
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
                        expect(vm.$modals.store.list[1].isOpen).toBe(true);
                    });

                    it('will not open other modals', () => {
                        expect(vm.$modals.store.list[0].isOpen).toBe(false);
                        expect(vm.$modals.store.list[2].isOpen).toBe(false);
                    });
                });

                describe('close', () => {
                    beforeEach(() => {
                        vm.$modals.open(ids[0]);
                        vm.$modals.open(ids[1]);
                        vm.$modals.open(ids[2]);

                        vm.$modals.close(ids[1]);
                    });

                    it('will close the modal with that id', () => {
                        expect(vm.$modals.store.list[1].isOpen).toBe(false);
                    });

                    it('will not close other modals', () => {
                        expect(vm.$modals.store.list[0].isOpen).toBe(true);
                        expect(vm.$modals.store.list[2].isOpen).toBe(true);
                    });
                });
            });
        });
    });
});
