import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function AgentNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" p-2.5 rounded text-sm w-[150px] text-purple-400 text-center border border-solid border-purple-600  bg-purple-900/60">
      <Handle type="target" position={Position.Top}  id="a"  isConnectable={isConnectable} />
      <strong>{data.label}</strong>
      
      <Handle 
      type="source" 
      position={Position.Bottom} 
      id="c" 
      isConnectable={isConnectable} />
    </div>
  );
}

export default AgentNode; 