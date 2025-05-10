// Product.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import TreeNode from './TreeNode';
import './Product.scss';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductTree, 
  toggleProductSelection, 
  saveSelectedProducts 
} from '../../slices/productSlice';
import { useTranslation } from 'react-multi-lang';
import PopUp from '../shared/popoup/PopUp';

const Product = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { treeData, selectedProducts, initialSelectedProducts, loading, error } = useSelector(state => state.products);
  const [expandedParents, setExpandedParents] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  // Get current language direction from translation hook or localStorage
  const isRTL = t('direction') === 'rtl' || localStorage.getItem('i18nextLng')?.startsWith('ar');

  useEffect(() => {
    if (treeData.length > 0) {
      const initialExpandedState = {};
      treeData.forEach(parentNode => {
        initialExpandedState[parentNode.productId] = true;
      });
      setExpandedParents(initialExpandedState);
    }
  }, [treeData]);

  // ... rest of the useEffect and handler functions remain the same ...

  return (
    <Container className="tree-container" dir={isRTL ? 'rtl' : 'ltr'}>
      {showPopup && (
        <PopUp 
          msg={popupMessage} 
          closeAlert={closePopup} 
        />
      )}
      <p className="service-header mb-4">{t("product.select_your")} <span>{t('product.services')}</span></p>
      <div className="tree-wrapper">
        {treeData.map(parentNode => (
          <Card key={parentNode.productId} className="parent-card mb-3">
            <Card.Body>
              <TreeNode
                node={parentNode}
                selectedProducts={selectedProducts}
                expandedParents={expandedParents}
                onToggleExpand={toggleExpand}
                onToggleSelect={handleSelect}
                isRTL={isRTL}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="button-wrapper">
        <Button 
          type="button" 
          className="save-btn" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? `${t("product.saving")}...` : t("product.save")}
        </Button>
      </div>
    </Container>
  );
};

export default Product;