"use client"
import ReactFlow, {
    Background,
    Controls,
    Position,
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
import CustomNode from '../customNode';
 

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
        id: 'inintial_email',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { 
            label: 'Inintial Email', 
            color: '#6ede87', 
            fontColor: '#000',
            style_: "text-cyan-400 text-center border border-solid border-cyan-600 bg-cyan-900/60",
            handles:[
                {type:"source", id:'top-a', position:Position.Right }, 
            ]
         },
    },
    {
        id: 'email_category',
        type: "custom",
        position: { x: 200, y: 0 },
        data: { 
            label: 'Email Category', 
            color: '#ff9a3c', 
            fontColor: '#000' ,
            style_: "text-blue-400 text-center border border-solid border-blue-600 bg-blue-900/60",
            handles:[
                {type:"target", id:'top-a', position:Position.Left },
                {type:"source", id:'top-b', position:Position.Right}
            ]
        },
    },
    {
        id: 'research_router',
        type: "custom",
        position: { x: 400, y: 0 },
        data: { 
                label: 'Resarch Router', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-yellow-400 text-center border border-solid border-yellow-600 bg-yellow-900/60",
                handles:[
                    {type:"target", id:'top-a', position:Position.Left },
                    {type:"source", id:'top-b', position:Position.Bottom},
                    {type:"source", id:'top-c', position:Position.Right}
                ]
            },
    },
    {
        id: 'researcher',
        type: 'custom',
        position: { x: 400, y:100 },
        data: { 
                label: 'Resarcher', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-purple-400 text-center border border-solid border-purple-600 bg-purple-900/60",
                handles:[
                    {type:"target", id:'top-a', position:Position.Top }, 
                    {type:"source", id:'top-b', position:Position.Bottom}
                ]
            },
    },
    {
        id: 'draft',
        type: 'custom',
        position: { x: 400, y: 200 },
        data: { 
                label: 'Draft', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-orange-400 text-center border border-solid border-orange-600 bg-orange-900/60",
                handles:[
                    {type:"target", id:'a', position:Position.Top },  
                    {type:"source", id:'c', position:Position.Left}
                ]
            },
    },
    {
        id: 'writer',
        type: 'custom',
        position: { x: 200, y: 200 },
        data: { 
                label: 'Writer', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-amber-400 text-center border border-solid border-amber-600 bg-amber-900/60",
                handles:[
                    {type:"target", id:'a', position:Position.Right },  
                    {type:"source", id:'b', position:Position.Top},  
                    {type:"source", id:'c', position:Position.Left}
                ]
            },
    },
    {
        id: 'suggest_change',
        type: 'custom',
        position: { x: 200, y: 100 },
        data: { 
                label: 'Suggest Change', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-amber-400 text-center border border-solid border-amber-600 bg-amber-900/60",
                handles:[
                    {type:"target", id:'a', position:Position.Bottom },    
                    {type:"source", id:'b', position:Position.Left}
                ]
            },
    },
    {
        id: 'rewrite',
        type: 'custom',
        position: { x: 0, y: 100 },
        data: { 
                label: 'Rewrite', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-white text-center border border-solid border-indigo-600 bg-indigo-900/60",
                handles:[
                    {type:"target", id:'a', position:Position.Right },    
                    {type:"source", id:'b', position:Position.Bottom}
                ]
            },
    },
    {
        id: 'final',
        type: 'custom',
        position: { x: 0, y:290 },
        data: { 
                label: 'Final', 
                color: '#ff9a3c', 
                fontColor: '#000' ,
                style_: "text-white text-center border border-solid border-emerald-600 bg-emerald-900/60",
                handles:[
                    {type:"target", id:'a', position:Position.Right}
                ]
            },
    },
];

const initialEdges = [
    {
        id: 'e-inintial-email-category', 
        source: 'inintial_email',
        target: 'email_category', 
        type: 'smoothstep',
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
    {
        id: 'e-email-category-router',
        source: 'email_category',
        target: 'research_router',
        type: 'smoothstep',
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
    {
        id: 'e-research-router-researcher',
        source: 'research_router', 
        target: 'researcher', 
        sourceHandle: 'top-b', 
        type: 'smoothstep',
        animated: true,
        label:"YES",
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
    {
        id: 'e-researcher-draft',
        source: 'researcher', 
        target: 'draft', 
        type: 'smoothstep', 
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    }, 
    {
        id: 'e-research-router-draft',
        source: 'research_router', 
        target: 'draft', 
        type: 'smoothstep',
        animated: true,
        label:"NO",
        sourceHandle: 'top-c', 
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    }, 
    {
        id: 'e-draft-writer',
        source: 'draft', 
        target: 'writer',  
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },  
    {
        id: 'e-writer-suggest-change ',
        source: 'writer', 
        target: 'suggest_change', 
        sourceHandle: 'b', 
        type: 'smoothstep',
        animated: true,
        label:"YES",
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },  
    {
        id: 'e-suggest-change-rewrite',
        source: 'suggest_change', 
        target: 'rewrite',  
        type: 'smoothstep', 
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
    {
        id: 'e-rewrite-final',
        source: 'rewrite', 
        target: 'final',  
        type: 'smoothstep', 
        style: { stroke: 'white', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'white' }
    },
    {
        id: 'e-writer-final',
        source: 'writer', 
        sourceHandle: 'c', 
        target: 'final',  
        type: 'smoothstep', 
        label: "NO",
        animated: true,
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
            fitView({ padding: 0.2,  zoom: 0.5,duration: 800 }); 
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

        <div ref={reactFlowWrapper} className={" max-h-full"} style={{ width: '100%', height: "530px" }} >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onlyRenderVisibleNodes={false}
                fitView 
            > 
            </ReactFlow>
        </div>

    )
} 