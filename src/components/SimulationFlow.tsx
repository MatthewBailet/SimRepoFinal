import React from 'react';
import { 
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import RootQueryNode from './nodes/RootQueryNode';
import ScenarioNode from './nodes/ScenarioNode';


// Template for node creation - can be extended for different node types
export const nodeTemplate = {
  basic: {
    width: 400,
    height: 120,
    style: {
      background: 'transparent',
      border: 'none',
      borderRadius: '8px',
      padding: '0',
      fontSize: '12px',
      color: '#1a202c',
      boxShadow: 'none',
      zIndex: 5
    }
  }
};

// Initial nodes in the center
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'rootQuery',
    position: { x: 400, y: 60 },
    data: { 
      label: 'Simulate how a 15% increase in interest rates affects...',
      metadata: {
        description: 'Test node',
        tags: ['test'],
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }
    },
    style: nodeTemplate.basic.style,
    width: nodeTemplate.basic.width,
    height: nodeTemplate.basic.height,
  },
  // Four scenario nodes below
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `scenario-${i + 1}`,
    type: 'scenario',
    position: { x: 200 + (i * 500), y: 350 }, // Spread out horizontally
    data: {
      label: `Scenario ${i + 1}: Impact on ${['Consumer Spending', 'Business Investment', 'Housing Market', 'Financial Markets'][i]}`,
      metadata: {
        description: 'Scenario node',
        tags: ['scenario'],
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }
    },
    style: nodeTemplate.basic.style,
    width: nodeTemplate.basic.width,
    height: nodeTemplate.basic.height,
  }))
];

const initialEdges: Edge[] = [
  // Connect root node to all scenario nodes
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `edge-1-to-${i + 1}`,
    source: '1',
    target: `scenario-${i + 1}`,
    type: 'smoothstep',
   
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  }))
];

// Node types definition
const nodeTypes = {
  rootQuery: RootQueryNode,
  scenario: ScenarioNode,
} as const;

const SimulationFlow: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100%' }} className="relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView={false}
          defaultViewport={{ x: 0, y: 0, zoom: 0.90 }}
          className="bg-gray-50 [&_.react-flow__attribution]:hidden"
          nodeTypes={nodeTypes}
        >
          <Background gap={0} color="transparent" />
          <Controls 
            className="!bottom-6 !left-6"
            showInteractive={false}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default SimulationFlow; 