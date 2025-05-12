import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-multi-lang';

const TreeNode = ({ 
  node,                // Current node data (product object)
  depth = 0,          // Depth in the tree hierarchy (0 = parent)
  selectedProducts,   // Array of currently selected product IDs
  expandedParents,    // Object tracking which parent nodes are expanded
  onToggleExpand,     // Function to toggle parent node expansion
  onToggleSelect,     // Function to toggle product selection
  isRTL = false      // Right-to-left language support flag
}) => {
  const t = useTranslation(); // Translation hook for i18n
  
  // Determine if this node has children
  const hasChildren = node.children && node.children.length > 0;
  
  // Check if this is a parent node (depth = 0)
  const isParent = depth === 0;
  
  // Check if this node's product is currently selected
  const isChecked = selectedProducts.includes(node.productId);

  // Calculate indeterminate state for parent nodes (some but not all children selected)
  const isIndeterminate = isParent && hasChildren && 
    node.children.some(child => selectedProducts.includes(child.productId)) &&
    !node.children.every(child => selectedProducts.includes(child.productId));
  
  // Determine if this parent node is expanded (always true for child nodes)
  const isExpanded = isParent ? expandedParents[node.productId] : true;

  // Handle expand/collapse toggle for parent nodes
  const handleToggleExpand = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (isParent) {
      onToggleExpand(node.productId); // Call parent handler
    }
  };

  // Handle product selection toggle
  const handleSelect = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onToggleSelect(node.productId); // Call parent handler
  };

  // Render parent nodes differently than child nodes
  if (isParent) {
    return (
      <div className="parent-node">
        {/* Parent node header with checkbox and expand/collapse button */}
        <div className="node-header">
          <Form.Check 
            type="checkbox"
            id={`checkbox-${node.productId}`}
            label={<span className="node-label parent">{node.productName}</span>}
            checked={isChecked}
            onChange={handleSelect}
            ref={el => {
              // Set indeterminate state for the checkbox when needed
              if (el && isParent) {
                el.indeterminate = isIndeterminate;
              }
            }}
            className={`tree-checkbox ${isChecked ? 'active' : ''} ${isIndeterminate ? 'indeterminate' : ''}`}
          />
          
          {/* Expand/collapse button for nodes with children */}
          {hasChildren && (
            <button 
              onClick={handleToggleExpand}
              className="tree-toggle"
              aria-label={isExpanded ? t("product.collapse") : t("product.expand")}
            >
              {isExpanded ? '−' : '+'} {/* Simple expand/collapse indicator */}
            </button>
          )}
        </div>
        
        {/* Render children if expanded and has children */}
        {isExpanded && hasChildren && (
          <div className="children-container">
            {/* Recursively render child nodes */}
            {node.children.map(childNode => (
              <TreeNode
                key={childNode.productId} // Unique key for React
                node={childNode}
                depth={depth + 1} // Increment depth for children
                selectedProducts={selectedProducts}
                expandedParents={expandedParents}
                onToggleExpand={onToggleExpand}
                onToggleSelect={onToggleSelect}
                isRTL={isRTL}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render child nodes (simpler version without expand/collapse)
  return (
    <div className="child-node">
      <Form.Check 
        type="checkbox"
        id={`checkbox-${node.productId}`}
        label={<span className="node-label child">{node.productName}</span>}
        checked={isChecked}
        onChange={handleSelect}
        className={`tree-checkbox ${isChecked ? 'active' : ''}`}
      />
    </div>
  );
};

// Prop type validation
TreeNode.propTypes = {
  node: PropTypes.object.isRequired,          // Node data object
  depth: PropTypes.number,                    // Current depth in tree
  selectedProducts: PropTypes.array.isRequired, // Selected product IDs
  expandedParents: PropTypes.object.isRequired, // Expanded parent nodes
  onToggleExpand: PropTypes.func.isRequired,   // Expand toggle handler
  onToggleSelect: PropTypes.func.isRequired,   // Selection toggle handler
  isRTL: PropTypes.bool                       // Right-to-left flag
};

export default TreeNode;