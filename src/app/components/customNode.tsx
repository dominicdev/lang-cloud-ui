import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable,handles }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  // text-cyan-400 text-center border border-solid border-cyan-600  bg-cyan-900/60
  return (
    <div className={" p-2.5 rounded text-sm w-[150px] " + (data.style_)}>

      <strong>{data.label}</strong> 
      {data.handles && data.handles.map((handle)=>{
        return (<Handle key={handle.id} type={handle.type} id={handle.id} position={handle.position} isConnectable={isConnectable} />)

      })} 
    </div>
  );
}

export default CustomNode; 