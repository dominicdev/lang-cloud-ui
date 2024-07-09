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
import { useEffect,useRef,useCallback  } from "react";
import Link from "next/link";
import { GrProjects } from "react-icons/gr";
import { LuPencilLine } from "react-icons/lu";
import mermaid from 'mermaid';
import AgentNode from './components/agentnode';
import ActionNode from './components/actionnode';
import EndNode from './components/endNode';
import StartNode from './components/startNode';
import { type } from 'os';
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
  endNode:EndNode,
  startNode:StartNode,
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

export default  function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <Home />
    </ReactFlowProvider>
  );
}


function Home() {

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);
 

  const { fitView, setCenter } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef(null);

  // Center the flow when component mounts or nodes change
  useEffect(() => {
    if (reactFlowWrapper.current) {
      fitView({ padding: 0.2, duration: 800 });
      centerFlow()
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

    <div className="flex h-full min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}

      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r-2 border-blue-500/50">
        {/* Logo */}
        <div className="mb-8">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            {/* Add your logo SVG path here */}
          </svg>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4">
          {/* Add icons for each nav item */}
          <Link href="#" className="p-2 hover:bg-gray-700 rounded-lg">
            <GrProjects className="w-6 h-6" />
          </Link>
          <Link href="#" className="p-2 hover:bg-gray-700 rounded-lg">
            <LuPencilLine className="w-6 h-6" />
          </Link>

          {/* Repeat for other nav items */}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8 px-0 h-full">
        <div className="flex w-full border-b-2 border-blue-500/50 mb-4 px-8 ">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4">
            Personal &gt; Deployments
          </div>

        </div>
        <div className="">
          <div className="w-full h-full ">
            <div className="w-1/2 h-[560px] border-r-2 border-blue-500/50 ">
              <div ref={reactFlowWrapper} style={{ width: '100%', height: '80%' }} >
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
              <div className=' w-full rounded px-8  '>
                <div className='w-ful p-5 bg-blue-950/40'>
                  <label className='font-bold'>Input</label>
                  <div className='text-'>
                    <label>Message</label>
                    <input className='border w-full text-white bg-transparent p-3' placeholder='Enter Message' />
                  </div>
                </div>
              </div>


            </div>
            <div className="w-1/2  ">

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
