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
    const isChecked = selectedProducts.includes(node.productId);
    
    // Calculate if parent has some but not all children selected
    const isIndeterminate = isParent && hasChildren && 
      node.children.some(child => selectedProducts.includes(child.productId)) &&
      !node.children.every(child => selectedProducts.includes(child.productId));
  
    const isExpanded = isParent ? expandedParents[node.productId] : true;
  
    // ... rest of the component remains the same until the Form.Check
  
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
              ref={el => {
                if (el && isParent) {
                  el.indeterminate = isIndeterminate;
                }
              }}
              className={`tree-checkbox ${isChecked ? 'active' : ''} ${isIndeterminate ? 'indeterminate' : ''}`}
            />
            {/* ... rest of the parent node code */}
          </div>
          {/* ... rest of the component */}
        </div>
      );
    }
    // ... rest of the component
  };