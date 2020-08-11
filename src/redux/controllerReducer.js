const ADD_NODE = 'ADD-NODE';
const UPDATE_NODE_OPTIONS = 'UPDATE-NODE-OPTIONS';
const UPDATE_MODAL_STATE = 'UPDATE-MODAL-STATE';
const UPDATE_EDGE_OPTIONS = 'UPDATE-EDGE-OPTIONS';
const NODE_BUFFER = 'NODE-BUFFER';


let initialState = {
    nodes: [
        { id: 1, label: "node 1"},
        { id: 2, label: "node 2"},
        { id: 3, label: "node 3"}
    ],
    links: [
        { source: 1, target: 2, id: 1 },
        { source: 2, target: 3, id: 2 }
    ],
    modalVisible: false,
    nodeBuffer: {source: 0, target: 0}
};

const controllerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NODE: {
            return {
                ...state,
                nodes: [...state.nodes, {
                    id: state.nodes.length + 1,
                    label: action.newLabel
                }],
                links: [...state.links, {
                    source: state.nodes.length + 1,
                    target: action.newTo,
                    id: state.links.length + 1,
                }],
            }
        }
        case UPDATE_NODE_OPTIONS: {
            return  {
                ...state,
                nodes: state.nodes.map( n => {
                    if (n.id === action.nodeId) {
                        let newNodeLabel = action.newNodeLabel; console.log(n);
                        return  {...n, label: newNodeLabel};
                    }
                    else {
                        console.log("id", n.id);
                        console.log("actionId", action.nodeId)}
                    return n;
                })
            };
        }
        case UPDATE_EDGE_OPTIONS: {
            return {
            ...state,
            links: state.links.map(e => {
                if (e.id === action.edgeId) {
                    let newNodeFrom = action.newNodeFrom;
                    let newNodeTo = action.newNodeTo;
                    return {...e, source: newNodeFrom, target: newNodeTo}
                }
                else {
                    console.log("id", e.from)}
                return e;
                })
            }
        }
        case UPDATE_MODAL_STATE: {
            return {
                ...state,
                modalVisible: action.visState
            }
        }
        case NODE_BUFFER: {
            return {
                ...state, nodeBuffer:
                    {...state.nodeBuffer, source: action.curSource, target: action.curTarget}
            }
        }
        default:
            return state;
    }
};

export const addNodeAC = (newNodeLabel, newNodeTo) => {
    return {
        type: ADD_NODE,
        newTo: newNodeTo,
        newLabel: newNodeLabel
    }
};

export const updateNodeOptionsAC = (nodeId, updatedLabel) => {
    return {
        type: UPDATE_NODE_OPTIONS,
        nodeId,
        newNodeLabel: updatedLabel,
    }
};

export const updateModalStateAC = (updatedState) => {
    return {
        type: UPDATE_MODAL_STATE,
        visState: updatedState
    }
};

export const updateEdgesOptionsAC = (edgeId, updatedFrom, updatedTo) => {
    return {
        type: UPDATE_EDGE_OPTIONS,
        edgeId,
        newNodeTo: updatedTo,
        newNodeFrom: updatedFrom
    }
};

export const nodeBufferAC = (curLinkSource, curLinkTarget) => {
    return {
        type: NODE_BUFFER,
        curSource: curLinkSource,
        curTarget: curLinkTarget
    }
};


export default controllerReducer;
