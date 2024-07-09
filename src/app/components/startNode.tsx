import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function StartNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" p-2.5 rounded text-sm w-[150px] text-orange-400 text-center border border-solid border-orange-600  bg-orange-900/60">
     <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
      <strong>{data.label}</strong>  
    </div>
  );
}

export default StartNode; 