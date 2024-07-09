import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function ActionNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" p-2.5 rounded text-sm w-[150px] text-cyan-400 text-center border border-solid border-cyan-600  bg-cyan-900/60">
      <Handle type="target" id='top-a' position={Position.Top} isConnectable={isConnectable} />
      <strong>{data.label}</strong> 
      <Handle type="source" id='top-b' position={Position.Top} isConnectable={isConnectable} />
    </div>
  );
}

export default ActionNode; 