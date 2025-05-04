import React, { useState } from 'react';
import { Card, Container ,Button} from 'react-bootstrap';
import TreeNode from './TreeNode';
import './Product.scss';

const Product = () => {
  // Tree data defined inside component
  const treeData = {
    "id": "root",
    "label": "Services",
    "children": [
      {
        "id": "website",
        "label": "Website Services",
        "children": [
          { "id": "web-design", "label": "Web Design" },
          { "id": "web-dev", "label": "Web Development" }
        ]
      },
      {
        "id": "branding",
        "label": "Branding Services",
        "children": [
          { "id": "logo-design", "label": "Logo Design" },
          { "id": "brand-guidelines", "label": "Brand Guidelines" }
        ]
      }
    ]
  };

  const [selectedNodes, setSelectedNodes] = useState({});
  const [expandedParents, setExpandedParents] = useState({
    website: true,
    branding: true
  });

  const toggleExpand = (parentId) => {
    setExpandedParents(prev => ({
      ...prev,
      [parentId]: !prev[parentId]
    }));
  };

  const updateSelections = (nodeId, isSelected) => {
    const newSelections = { ...selectedNodes };
    
    // Find the node in the tree
    const findNode = (node, id) => {
      if (node.id === id) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child, id);
          if (found) return found;
        }
      }
      return null;
    };

    const nodeToUpdate = findNode(treeData, nodeId);
    if (!nodeToUpdate) return;

    // Update the node and all its children
    const updateNodeAndChildren = (node) => {
      newSelections[node.id] = isSelected;
      if (node.children) {
        node.children.forEach(child => updateNodeAndChildren(child));
      }
    };

    updateNodeAndChildren(nodeToUpdate);

    // Update all parent nodes
    const updateParentNodes = (node) => {
      if (!node.children) return;
      
      node.children.forEach(child => {
        if (findNode(child, nodeId)) {
          const childrenSelected = node.children.map(c => newSelections[c.id]);
          const allSelected = childrenSelected.every(Boolean);
          const someSelected = childrenSelected.some(Boolean);
          
          if (allSelected) {
            newSelections[node.id] = true;
          } else if (someSelected) {
            newSelections[node.id] = 'indeterminate';
          } else {
            newSelections[node.id] = false;
          }
        }
      });
    };

    // Update all potential parents
    treeData.children.forEach(parent => updateParentNodes(parent));

    setSelectedNodes(newSelections);
  };

  return (
    <Container className="tree-container">
      <p className="service-header mb-4">Select your <span>Services</span></p>
      <div className="tree-wrapper">
        {treeData.children.map(parentNode => (
          <Card key={parentNode.id} className="parent-card mb-3">
            <Card.Body>
              <TreeNode
                node={parentNode}
                selectedNodes={selectedNodes}
                expandedParents={expandedParents}
                onToggleExpand={toggleExpand}
                onToggleSelect={updateSelections}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
       <div className="button-wrapper">
            <Button type="submit" className="save-btn" d>
            Save
            </Button>
        </div>
    </Container>
  );
};

export default Product;