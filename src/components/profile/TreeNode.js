// TreeNode.js
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-multi-lang';

const TreeNode = ({ 
  node, 
  depth = 0, 
  selectedProducts, 
  expandedParents, 
  onToggleExpand, 
  onToggleSelect,
  isRTL = false
}) => {
  const t = useTranslation();
  const hasChildren = node.children && node.children.length > 0;
  const isParent = depth === 0;
  const isChecked = selectedProducts.includes(node.productId) || node.isSelected;
  const isExpanded = isParent ? expandedParents[node.productId] : true;

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    if (isParent) {
      onToggleExpand(node.productId);
    }
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onToggleSelect(node.productId);
  };

  if (isParent) {
    return (
      <div className="parent-node">
        <div className="node-header">
          <Form.Check 
            type="checkbox"
            id={`checkbox-${node.productId}`}
            label={<span className="node-label parent">{node.productName}</span>}
            checked={isChecked}
            onChange={handleSelect}
            className={`tree-checkbox ${isChecked ? 'active' : ''}`}
          />
          {hasChildren && (
            <button 
              onClick={handleToggleExpand}
              className="tree-toggle"
              aria-label={isExpanded ? t("product.collapse") : t("product.expand")}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
        
        {isExpanded && hasChildren && (
          <div className="children-container">
            {node.children.map(childNode => (
              <TreeNode
                key={childNode.productId}
                node={childNode}
                depth={depth + 1}
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

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  depth: PropTypes.number,
  selectedProducts: PropTypes.array.isRequired,
  expandedParents: PropTypes.object.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  isRTL: PropTypes.bool
};

export default TreeNode;