import React, { useState, useEffect } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import TreeNode from './TreeNode';
import './Product.scss';
import LoadingPage from '../Loader/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductTree, 
  toggleProductSelection, 
  saveSelectedProducts 
} from '../../slices/productSlice';
import { useTranslation } from 'react-multi-lang';
import PopUp from '../shared/popoup/PopUp';

const Product = () => {
  // Internationalization hook
  const t = useTranslation();
  // Redux dispatch function
  const dispatch = useDispatch();
  // Get state from Redux store
  const { treeData, selectedProducts, initialSelectedProducts, loading, error } = useSelector(state => state.products);
  
  // Local state for expanded/collapsed parent nodes
  const [expandedParents, setExpandedParents] = useState({});
  // Popup visibility state
  const [showPopup, setShowPopup] = useState(false);
  // Popup message content
  const [popupMessage, setPopupMessage] = useState('');

  // Determine if the UI should be right-to-left (for languages like Arabic)
  const isRTL = t('direction') === 'rtl' || localStorage.getItem('i18nextLng')?.startsWith('ar');

  // Fetch product tree data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the fetch action and wait for it to complete
        await dispatch(fetchProductTree()).unwrap();
      } catch (err) {
        // Show error message if fetch fails
        setPopupMessage(err.message ||"Failed to fetch products");
        setShowPopup(true);
      }
    };
    
    fetchData();
  }, [dispatch]);

  // Initialize expanded state when treeData is loaded
  useEffect(() => {
    if (treeData.length > 0) {
      const initialExpandedState = {};
      // Expand all parent nodes by default
      treeData.forEach(parentNode => {
        initialExpandedState[parentNode.productId] = true;
      });
      setExpandedParents(initialExpandedState);
    }
  }, [treeData]); 

  // Toggle expand/collapse for a parent node
  const toggleExpand = (parentId) => {
    setExpandedParents(prev => ({
      ...prev,
      [parentId]: !prev[parentId]
    }));
  };

  // Handle product selection toggle
  const handleSelect = (productId) => {
    console.log('Toggling product:', productId, 'Current selection:', selectedProducts.includes(productId));
    dispatch(toggleProductSelection(productId));
  };
  
  // Debug log for selected products changes
  useEffect(() => {
    console.log('Selected products updated:', selectedProducts);
  }, [selectedProducts]);

  // Save selected products to backend
  const handleSave = async () => {
    // Calculate added and removed products
    const added = selectedProducts.filter(id => !initialSelectedProducts.includes(id));
    const removed = initialSelectedProducts.filter(id => !selectedProducts.includes(id));

    try {
      if (added.length > 0 || removed.length > 0) {
        // Only save if there are changes
        await dispatch(saveSelectedProducts({ added, removed })).unwrap();
        setPopupMessage(t("product.save_success"));
      } else {
        setPopupMessage(t("product.no_changes"));
      }
    } catch (err) {
      setPopupMessage(err.message || t("product.save_error"));
    } finally {
      setShowPopup(true);
    }
  };

  // Close popup handler
  const closePopup = () => {
    setShowPopup(false);
  };

  // Show loading spinner if data is being fetched and tree is empty
  if (loading && !treeData.length) return <Container className="tree-container"><LoadingPage /></Container>;

  return (
    <Container className="tree-container" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Popup component for showing messages */}
      {showPopup && (
        <PopUp 
          msg={popupMessage} 
          closeAlert={closePopup} 
        />
      )}
      
      {/* Page header */}
      <p className="service-header mb-4">{t("product.select_your")} <span>{t('product.services')}</span></p>
      
      {/* Product tree container */}
      <div className="tree-wrapper">
        {/* Map through each parent node in the tree */}
        {treeData.map(parentNode => (
          <Card key={parentNode.productId} className="parent-card mb-3">
            <Card.Body>
              {/* TreeNode component for each parent node */}
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
      
      {/* Save button */}
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