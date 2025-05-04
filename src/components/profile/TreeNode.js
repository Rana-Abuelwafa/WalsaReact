import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TreeNode = ({ 
  node, 
  depth = 0, 
  selectedNodes, 
  expandedParents, 
  onToggleExpand, 
  onToggleSelect 
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isParent = depth === 0;
  const isChecked = selectedNodes[node.id] === true;
  const isIndeterminate = selectedNodes[node.id] === 'indeterminate';
  const isExpanded = isParent ? expandedParents[node.id] : true;

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    if (isParent) {
      onToggleExpand(node.id);
    }
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onToggleSelect(node.id, e.target.checked);
  };

  if (isParent) {
    return (
      <div className="parent-node">
        <div className="node-header">
          <Form.Check 
            type="checkbox"
            id={`checkbox-${node.id}`}
            label={<span className="node-label parent">{node.label}</span>}
            checked={isChecked}
            ref={(el) => el && (el.indeterminate = isIndeterminate)}
            onChange={handleSelect}
            className={`tree-checkbox ${isChecked ? 'active' : ''}`}
          />
          {hasChildren && (
            <button 
              onClick={handleToggleExpand}
              className="tree-toggle"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
        
        {isExpanded && hasChildren && (
          <div className="children-container">
            {node.children.map(childNode => (
              <TreeNode
                key={childNode.id}
                node={childNode}
                depth={depth + 1}
                selectedNodes={selectedNodes}
                expandedParents={expandedParents}
                onToggleExpand={onToggleExpand}
                onToggleSelect={onToggleSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="child-node">
      <Form.Check 
        type="checkbox"
        id={`checkbox-${node.id}`}
        label={<span className="node-label child">{node.label}</span>}
        checked={isChecked}
        onChange={handleSelect}
        className={`tree-checkbox ${isChecked ? 'active' : ''}`}
      />
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  depth: PropTypes.number,
  selectedNodes: PropTypes.object.isRequired,
  expandedParents: PropTypes.object.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  onToggleSelect: PropTypes.func.isRequired
};

export default TreeNode;