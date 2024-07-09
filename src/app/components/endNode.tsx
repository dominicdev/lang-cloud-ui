import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function EndNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" p-2.5 rounded text-sm w-[150px]  text-amber-400 text-center border border-solid border-amber-600  bg-amber-900/60">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <strong>{data.label}</strong>  
    </div>
  );
}

export default EndNode; 