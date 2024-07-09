"use client"
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useEffect, useRef, useCallback } from "react"; 
import AgentNode from '../agentnode';
import ActionNode from '../actionnode';
import EndNode from '../endNode';
import StartNode from '../startNode';


const CustomNode = ({ data }) => {
    return (
        <div style={{
            background: data.color,
            border: '2px solid white',
            padding: 10,
            borderRadius: 5,
            width: 150,
            textAlign: 'center',
            color: 'white',
        }}>
            <strong>{data.label}</strong>
        </div>
    );
};

const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: 'black' },
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
};



const nodeTypes = {
    custom: CustomNode,
    agentnode: AgentNode,
    actionnode: ActionNode,
    endNode: EndNode,
    startNode: StartNode,
};

const initialNodes = [
    {
        id: 'start',
        type: 'startNode',
        position: { x: 250, y: 0 },
        data: { label: 'start', color: '#6ede87', fontColor: '#000' },
    },
    {
        id: 'agent',
        type: "agentnode",
        position: { x: 250, y: 100 },
        data: { label: 'agent', color: '#ff9a3c', fontColor: '#000' },
    },
    {
        id: 'action',
        type: "actionnode",
        position: { x: 150, y: 200 },
        data: { label: 'action', color: '#4ea5d9', fontColor: '#000' },
    },
    {
        id: 'end',
        type: 'endNode',
        position: { x: 350, y: 200 },
        data: { label: 'end', color: '#ff6b6b', fontColor: '#fff' },
    },
];

const initialEdges = [
    {
        id: 'e-start-agent', source: 'start', target: 'agent',
        style: { stroke: 'white', strokeWidth: 2 }
    },
    {
        id:
            'e-agent-action',
        source: 'agent',
        target: 'action',
        type: 'smoothstep',
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
    {
        id: 'e-action-agent',
        source: 'action',
        animated: true,
        target: 'agent',
        type: 'smoothstep',
        sourceHandle: 'a',
        label: "continue",
        style: { stroke: '#f6ad55', strokeWidth: 2, background: 'transparent' }
    },
    {
        id: 'e-agent-end',
        source: 'agent',
        animated: true,
        target: 'end',
        type: 'smoothstep',
        sourceHandle: 'c',
        label: "end",
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
];

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
}) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={{ ...style, strokeWidth: 2 }}
                className="react-flow__edge-path"
                d={edgePath}
            />
            {data?.animated && (
                <circle r="4" fill={'white'}>
                    <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
                </circle>
            )}
        </>
    );
};

const edgeTypes = {
    custom: CustomEdge,
};

export default function FlowWithProvider() {
    return (
        <ReactFlowProvider>
            <React_flow />
        </ReactFlowProvider>
    );
}


const React_flow = () => { 

    const { fitView, setCenter } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const reactFlowWrapper = useRef(null);

    // Center the flow when component mounts or nodes change
    useEffect(() => {
        if (reactFlowWrapper.current) {
            fitView({ padding: 0.2, duration: 800 });
            // centerFlow()
        }
    }, [nodes, fitView]);

    // Function to center the flow on demand
    const centerFlow = useCallback(() => {
        if (reactFlowWrapper.current) {
            const { width, height } = reactFlowWrapper.current.getBoundingClientRect();
            setCenter(width / 2, height / 2, { zoom: 0.5, duration: 800 });
        }
    }, [setCenter]);

    return (

        <div ref={reactFlowWrapper} style={{ width: '100%', height: '80%' }} >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onlyRenderVisibleNodes={false}
                fitView
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                panOnScroll={false}
                preventScrolling={true}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
            >
            </ReactFlow>
        </div>

    )
} 