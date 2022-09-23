import {createStore} from 'vuex';
import {uniqueId} from "./utils";

export const getStore = (initialData) => createStore({
    state() {
        return {
            components: initialData || []
        }
    },
    getters: {
        components(state) {
            return state.components
        }
    },
    mutations: {
        ADD_COMPONENT(state, component) {
            component = {
                ...component,
                id: uniqueId()
            }
            state.components = [
                component,
                ...state.components,
            ]
        },
        EDIT_COMPONENT(state, {id, content}) {
            state.components = [...state.components].map(component => {
                if (component.id === id) {
                    component.content = content;
                }

                return component;
            });
        },
        REMOVE_COMPONENT(state, id) {
            state.components = [...state.components].filter(component => {
                return component.id !== id;
            });
        },
        MOVE_UP_COMPONENT(state, id) {
            const components = [...state.components];
            const componentIndex = components.findIndex(component => {
                return component.id === id;
            });

            if (componentIndex === 0) {
                return;
            }

            const component = components.splice(componentIndex, 1);
            const nextIndex = componentIndex - 1;
            state.components = [...components.slice(0, nextIndex), ...component, ...components.slice(nextIndex)];
        },
        MOVE_DOWN_COMPONENT(state, id) {
            const components = [...state.components];
            const componentIndex = components.findIndex(component => {
                return component.id === id;
            });

            if (componentIndex === components.length - 1) {
                return;
            }

            const component = components.splice(componentIndex, 1);
            const nextIndex = componentIndex + 1;
            state.components = [...components.slice(0, nextIndex), ...component, ...components.slice(nextIndex)];
        }
    },
    actions: {
        'add': ({commit}, component) => {
            commit('ADD_COMPONENT', component)
        },
        'edit': ({commit}, payload) => {
            commit('EDIT_COMPONENT', payload)
        },
        'remove': ({commit}, id) => {
            commit('REMOVE_COMPONENT', id);
        },
        'move': ({commit}, {id, direction}) => {
            if (direction === 'up') {
                commit('MOVE_UP_COMPONENT', id);
            }

            if (direction === 'down') {
                commit('MOVE_DOWN_COMPONENT', id);
            }

        }
    }
})
