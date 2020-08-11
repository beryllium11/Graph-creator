import {
    updateNodeOptionsAC,
    updateEdgesOptionsAC,
    updateModalStateAC,
    nodeBufferAC
} from "../../redux/controllerReducer";
import Graphs from "./Graphs";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        controllerPage: state.controllerPage
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        updateNodeOptions: (nodeId, nodeLabel) => {
            dispatch(updateNodeOptionsAC(nodeId, nodeLabel));
        },
        updateEdgesOptions: (edgeId, updatedFrom, updatedTo) => {
            dispatch(updateEdgesOptionsAC(edgeId, updatedFrom, updatedTo))
        },
        updateModalState: (updatedState) => {
            dispatch(updateModalStateAC(updatedState))
        },
        nodeBuffer: (curLinkSource, curLinkTarget) => {
            dispatch(nodeBufferAC(curLinkSource, curLinkTarget))
        }
    }
};



const GraphsContainer = connect(mapStateToProps, mapDispatchToProps) (Graphs);

export default GraphsContainer;
