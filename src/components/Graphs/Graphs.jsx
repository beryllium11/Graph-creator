import React, {useState} from "react";
import s from './Graphs.module.css';
import { Graph } from 'react-d3-graph';
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import $ from "jquery";


const Graphs = (props) => {

    const [showNodes, setShowNodes ] = useState(false);

    const handleCloseNodes = () => setShowNodes(false);
    const handleShowNodes = () => setShowNodes(true);

    const handleShowEdges = (n) => {
        props.updateModalState(n);
    };
    const handleCloseEdges = () => {
        props.updateModalState(false);
    };

    const data = {
        nodes: props.controllerPage.nodes,
        links: props.controllerPage.links,
        focusedNodeId: "nodeIdToTriggerZoomAnimation"
    };

    let newLabelElement = React.createRef();
    let setLabel = () => { return  newLabelElement.current.value };

    let newFromElement = React.createRef();
    let setFrom = () => { return  newFromElement.current.value };

    let newToElement = React.createRef();
    let setTo = () => { return  newToElement.current.value };

    let showLog = () => {
        console.log(props.controllerPage)
    };

    const myConfig = {
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 600,
            highlightStrokeColor: 'blue',
            labelProperty: "label",
            labelPosition: "center"
        },
        link: {
            highlightColor: '#86c1ef',
            strokeWidth: 2
        },
        directed:true
    };

    const onClickNode = (nodeId) => {
        let selectedNodeId = nodeId - 1;
        handleShowNodes(true);
        $("#IdElement").val(nodeId);
        $("#labelElement").val(props.controllerPage.nodes[selectedNodeId].label);
        $("#hiddeninp").val(selectedNodeId);
    };

    const onClickLink = (source, target) => {
        handleShowEdges(true);
        $("#fromElement").val(source);
        $("#toElement").val(target);
        let linksArray = props.controllerPage.links;
        let indexId = linksArray.findIndex(linksArray => linksArray.target == target && linksArray.source == source);
        let selectedEdgeId = props.controllerPage.links[indexId].id;
        $("#hiddeninp2").html(selectedEdgeId);
        props.nodeBuffer(source, target);
    };


    let onUpdateNode = (e) => {
        let nodeId = parseInt($("#hiddeninp").val()) + 1;
        let nodeSetLabel = setLabel();
        props.updateNodeOptions(nodeId, nodeSetLabel)
    };

    let onUpdateEdge = (e) => {
        let edgeId = parseInt($("#hiddeninp2").text());
        let edgeSetTo = parseInt(setTo());
        let edgeSetFrom = parseInt(setFrom());
        let linksArray = props.controllerPage.links;
        let indexEachOther = linksArray.findIndex(linksArray => linksArray.target === edgeSetFrom && linksArray.source === edgeSetTo && linksArray.id !== edgeId);
        let indexOneOutcomeLink = linksArray.findIndex(linksArray => linksArray.source === edgeSetFrom && linksArray.id !== edgeId);
        console.log(props.controllerPage.nodes.length);
        if  (edgeSetTo <= props.controllerPage.nodes.length && edgeSetFrom <= props.controllerPage.nodes.length) {
            if (props.controllerPage.links[indexEachOther]) {
                alert("enter2");
                alert("nodes should not point to each other");
                edgeSetFrom = parseInt(props.controllerPage.nodeBuffer.source);
                edgeSetTo = parseInt(props.controllerPage.nodeBuffer.target);
                props.updateEdgesOptions(edgeId, edgeSetFrom, edgeSetTo)
            }
            else if (props.controllerPage.links[indexOneOutcomeLink]) {
                alert("enter3");
                alert("node should have only one outcome link");
                edgeSetFrom = parseInt(props.controllerPage.nodeBuffer.source);
                edgeSetTo = parseInt(props.controllerPage.nodeBuffer.target);
                props.updateEdgesOptions(edgeId, edgeSetFrom, edgeSetTo)
            }
            else {
                edgeSetTo = parseInt(setTo());
                edgeSetFrom = parseInt(setFrom());
                props.updateEdgesOptions(edgeId, edgeSetFrom, edgeSetTo)
            }
        }
        else {
            alert("this node dose not exist");
        }
    };


    return (
        <div>
            <Graph
                id="graph-id"
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
            />
            {/*<button onClick={showLog}>show Log</button>*/}
            <div className={`${s.modalBackdrop} ${s.fade} ${props.controllerPage.modalVisible ? `${s.show}` : ""} fade modal-backdrop`}></div>
            <div className={`${s.modal} ${s.fade} ${props.controllerPage.modalVisible ? `${s.show}` : ""} modal fade`} id={s.modalForLink}>
                <div className={`${s.modalDialog} modal-dialog`}>
                    <div className="modal-content">
                        <Modal.Header>
                            <Modal.Title>Handle this edge</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p id="hiddeninp2" hidden>0</p>
                            <InputGroup.Prepend size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-lg">Set link source</InputGroup.Text>
                                </InputGroup.Prepend>
                                <input aria-label="Small" id="fromElement" ref={newFromElement} onChange={setFrom} aria-describedby={"inputGroup-sizing-sm"} />
                            </InputGroup.Prepend>
                            <InputGroup.Prepend size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-lg">Set link target</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input aria-label="Small" id="toElement" ref={newToElement} onChange={setTo} aria-describedby={"inputGroup-sizing-sm"} />
                            </InputGroup.Prepend>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEdges}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={onUpdateEdge}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
            </div>
            <Modal show={showNodes} onHide={handleCloseNodes}>
                <Modal.Header>
                    <Modal.Title>Handle this node</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="number" id="hiddeninp" hidden={true}/>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Node Id</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" id="IdElement" aria-describedby="inputGroup-sizing-sm" readOnly />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg" >Node Label</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" id="labelElement" ref={newLabelElement} onChange={setLabel} aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNodes}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdateNode}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};
export default Graphs;
