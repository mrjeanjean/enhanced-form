import {createStore} from 'vuex';
import {moveItemListAt, uniqueId} from "./utils.js";

export const getStore = (initialData) => createStore({
    state() {
        return {
            blocks: initialData || [],
        }
    },
    getters: {
        blocks(state) {
            return state.blocks
        },
        isSidebarOpen(state){
            return state.isSidebarOpen;
        }
    },
    mutations: {
        ADD_BLOCK(state, {block, id, index = 0}) {
            block = {
                ...block,
                id,
                attrId: '',
                expanded: true
            }

            state.blocks = [
                ...state.blocks.slice(0, index),
                block,
                ...state.blocks.slice(index)
            ]
        },
        EDIT_BLOCK(state, {id, content, settings = []}) {
            state.blocks = [...state.blocks].map(block => {
                if (block.id === id) {
                    block.content = content;
                    Object.entries(settings).forEach(([key, value])=>{
                        block[key] = value;
                    })
                }

                return block;
            });
        },
        REMOVE_BLOCK(state, id) {
            state.blocks = [...state.blocks].filter(block => {
                return block.id !== id;
            });
        },
        MOVE_UP_BLOCK(state, id) {
            const blockIndex = state.blocks.findIndex(block => {
                return block.id === id;
            });

            state.blocks = moveItemListAt([...state.blocks], blockIndex, blockIndex - 1);
        },
        MOVE_DOWN_BLOCK(state, id) {
            const blockIndex = state.blocks.findIndex(block => {
                return block.id === id;
            });

            state.blocks = moveItemListAt([...state.blocks], blockIndex, blockIndex + 1);
        }
    },
    actions: {
        'add': ({commit},  {block, index}) => {
            const id = uniqueId();
            commit('ADD_BLOCK', {block, id, index});
        },
        'edit': ({commit}, payload) => {
            commit('EDIT_BLOCK', payload);
        },
        'remove': ({commit}, id) => {
            commit('REMOVE_BLOCK', id);
        },
        'move': ({commit}, {id, direction}) => {
            if (direction === 'up') {
                commit('MOVE_UP_BLOCK', id);
            }

            if (direction === 'down') {
                commit('MOVE_DOWN_BLOCK', id);
            }
        }
    }
})
