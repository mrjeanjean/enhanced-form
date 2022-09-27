import {createStore} from 'vuex';
import {moveItemListAt, uniqueId} from "./utils";

export const getStore = (initialData) => createStore({
    state() {
        return {
            blocks: initialData || [],
            currentBlock: null,
            isSidebarOpen: false
        }
    },
    getters: {
        blocks(state) {
            return state.blocks
        },
        currentBlock(state) {
            return state.currentBlock;
        },
        isSidebarOpen(state){
            return state.isSidebarOpen;
        }
    },
    mutations: {
        ADD_BLOCK(state, {block, id}) {
            block = {
                ...block,
                id
            }

            state.blocks = [
                block,
                ...state.blocks,
            ]
        },
        EDIT_BLOCK(state, {id, content}) {
            state.blocks = [...state.blocks].map(block => {
                if (block.id === id) {
                    block.content = content;
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
        },
        SELECT_BLOCK(state, id) {
            state.currentBlock = state.blocks.find(block => { console.log(block); return block.id === id}) || null;
        },
        SET_SIDEBAR_VISIBILITY(state, visibility){
            state.isSidebarOpen = visibility;
        }
    },
    actions: {
        'add': ({commit}, block) => {
            const id = uniqueId();
            commit('ADD_BLOCK', {block, id});
            commit('SELECT_BLOCK', id);
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
        },
        'select': ({commit}, id) => {
            commit('SELECT_BLOCK', id);
        },
        'setSidebarVisibility': ({commit}, visibility) =>{
            commit('SET_SIDEBAR_VISIBILITY', visibility);
        }
    }
})
