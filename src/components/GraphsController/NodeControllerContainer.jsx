import React from "react";
import {addNodeAC} from "../../redux/controllerReducer";
import GraphsController from "./GraphsController";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        controllerPage: state.controllerPage
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addNode: (newNodeLabel, newNodeTo) => {
            let action = addNodeAC(newNodeLabel, newNodeTo);
            dispatch(action);
        }
    }
};



const NodeControllerContainer = connect(mapStateToProps, mapDispatchToProps) (GraphsController);

export default NodeControllerContainer;

