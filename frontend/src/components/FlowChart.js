import React, { useState, useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
} from 'react-flow-renderer';

const initialNodes = [
    { id: '1', type: 'input', data: { label: 'Cold Email' }, position: { x: 250, y: 0 }, draggable: true },
    { id: '2', data: { label: 'Wait/Delay' }, position: { x: 100, y: 100 }, draggable: true },
    { id: '3', data: { label: 'Lead Source' }, position: { x: 400, y: 100 }, draggable: true },
];


const initialEdges = [];

const FlowChart = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback((changes) => setNodes((nds) => [...nds, ...changes]), []);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => addEdge(changes, eds)), []);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

const saveFlowchart = () => {
    const flowchartData = { nodes, edges };
    console.log('Saved Flowchart:', flowchartData);

    // Send to backend
    fetch('http://localhost:5000/api/flowchart/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowchartData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Flowchart saved successfully:', data);
        })
        .catch((error) => console.error('Error saving flowchart:', error));
};

return (
    <div style={{ height: '100vh' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <MiniMap />
            <Controls />
            <Background />
        </ReactFlow>
        <button onClick={saveFlowchart}>Save Flowchart</button>
    </div>
);


export default FlowChart;
