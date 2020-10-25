import React, {useEffect, useState} from "react";
import s from './Graphs.module.css';
import { Graph } from 'react-d3-graph';
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";


const Graphs = (props) => {

    const [showNodes, setShowNodes ] = useState(false);
    const [idContainer, setIdContainer] = useState(0);
    const [nodeLabel, setNodeLabel] = useState(0);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [selectedEdgeId, setSelectedEdgeId] = useState(0);
    const [sourceNode, setSourceNode] = useState(0);
    const [targetNode, setTargetNode] = useState(0);

    useEffect(() => {
        if  (selectedNodeId) {
            setNodeLabel(props.controllerPage.nodes[selectedNodeId].label);
        }
    }, [props.controllerPage.nodes, selectedNodeId]);

    const handleCloseNodes = () => {setShowNodes(false);};
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
   // let setLabel = () => { return  newLabelElement.current.value };
    const setLabel = (e) => {
        setNodeLabel(newLabelElement.current.value)
    };

    let newFromElement = React.createRef();
    let setFrom = () => { setSourceNode(newFromElement.current.value) };

    let newToElement = React.createRef();
    let setTo = () => { setTargetNode(newToElement.current.value) };

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
        setSelectedNodeId(nodeId - 1);
        setIdContainer(nodeId);
        handleShowNodes(true);
    };

    const onClickLink = (source, target) => {
        handleShowEdges(true);
        setSourceNode(source);
        setTargetNode(target);
        let linksArray = props.controllerPage.links;
        let indexId = linksArray.findIndex(linksArray => linksArray.target == target && linksArray.source == source);
        setSelectedEdgeId(props.controllerPage.links[indexId].id);
        props.nodeBuffer(source, target);
    };


    let onUpdateNode = () => {
        let nodeId = selectedNodeId + 1;
        handleCloseNodes();
        props.updateNodeOptions(nodeId, nodeLabel)
    };

    let onUpdateEdge = (e) => {
        let edgeId = selectedEdgeId;
        let edgeSetTo = parseInt(targetNode);
        let edgeSetFrom = parseInt(sourceNode);
        let linksArray = props.controllerPage.links;
        let indexEachOther = linksArray.findIndex(linksArray => linksArray.target === edgeSetFrom && linksArray.source === edgeSetTo && linksArray.id !== edgeId);
        let indexOneOutcomeLink = linksArray.findIndex(linksArray => linksArray.source === edgeSetFrom && linksArray.id !== edgeId);
        console.log(props.controllerPage.nodes.length);
        if  (edgeSetTo <= props.controllerPage.nodes.length && edgeSetFrom <= props.controllerPage.nodes.length) {
            if (props.controllerPage.links[indexEachOther]) {
                alert("nodes should not point to each other");
                edgeSetFrom = parseInt(props.controllerPage.nodeBuffer.source);
                edgeSetTo = parseInt(props.controllerPage.nodeBuffer.target);
                props.updateEdgesOptions(edgeId, edgeSetFrom, edgeSetTo)
            }
            else if (props.controllerPage.links[indexOneOutcomeLink]) {
                alert("node should have only one outcome link");
                edgeSetFrom = parseInt(props.controllerPage.nodeBuffer.source);
                edgeSetTo = parseInt(props.controllerPage.nodeBuffer.target);
                props.updateEdgesOptions(edgeId, edgeSetFrom, edgeSetTo)
            }
            else {
                edgeSetTo = parseInt(targetNode);
                edgeSetFrom = parseInt(sourceNode);
                props.updateEdgesOptions(edgeId, edgeSetFrom, edgeSetTo)
            }
        }
        else {
            alert("this node dose not exist");
        }
        handleCloseEdges();
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
                            <InputGroup.Prepend size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-lg">Set link source</InputGroup.Text>
                                </InputGroup.Prepend>
                                <input aria-label="Small" id="fromElement" ref={newFromElement} value={sourceNode} onChange={setFrom} aria-describedby={"inputGroup-sizing-sm"} />
                            </InputGroup.Prepend>
                            <InputGroup.Prepend size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-lg">Set link target</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input aria-label="Small" id="toElement" ref={newToElement} onChange={setTo}  value={targetNode} aria-describedby={"inputGroup-sizing-sm"} />
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
                        <FormControl aria-label="Small" id="IdElement" value={idContainer} aria-describedby="inputGroup-sizing-sm" readOnly />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg" >Node Label</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" id="labelElement" value={nodeLabel} ref={newLabelElement} onChange={setLabel} aria-describedby="inputGroup-sizing-sm" />
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
