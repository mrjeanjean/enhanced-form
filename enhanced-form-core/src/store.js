import {createStore} from 'vuex';
import {uniqueId} from "./utils";

export const getStore = (initialData) => createStore({
    state() {
        return {
            components: initialData || []
        }
    },
    getters: {
        components(state){ return state.components }
    },
    mutations: {
        ADD_COMPONENT(state, component){
            component = {
                ...component,
                id: uniqueId()
            }
            state.components = [
                ...state.components,
                component
            ]
        },
        EDIT_COMPONENT(state, {id, content}){
            state.components = state.components = [...state.components].map(component => {
                if (component.id === id) {
                    component.content = content;
                }

                return component;
            });
        }
    },
    actions: {
        'add': ({commit}, component) => {
            commit('ADD_COMPONENT', component)
        },
        'edit': ({commit}, payload) => {
            commit('EDIT_COMPONENT', payload)
        }
    }
})
