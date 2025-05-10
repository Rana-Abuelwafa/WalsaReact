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
  const t = useTranslation();
  const dispatch = useDispatch();
  const { treeData, selectedProducts, initialSelectedProducts, loading, error } = useSelector(state => state.products);
  const [expandedParents, setExpandedParents] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const isRTL = t('direction') === 'rtl' || localStorage.getItem('i18nextLng')?.startsWith('ar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductTree()).unwrap();
      } catch (err) {
        setPopupMessage(err.message ||"Failed to fetch products");
        setShowPopup(true);
      }
    };
    
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (treeData.length > 0) {
      const initialExpandedState = {};
      treeData.forEach(parentNode => {
        initialExpandedState[parentNode.productId] = true;
      });
      setExpandedParents(initialExpandedState);
    }
  }, [treeData]); 

  // useEffect(() => {
  //   dispatch(fetchProductTree());
  // }, [dispatch]);

  const toggleExpand = (parentId) => {
    setExpandedParents(prev => ({
      ...prev,
      [parentId]: !prev[parentId]
    }));
  };

  const handleSelect = (productId) => {
    console.log('Toggling product:', productId, 'Current selection:', selectedProducts.includes(productId));
    dispatch(toggleProductSelection(productId));
  };
  
  useEffect(() => {
    console.log('Selected products updated:', selectedProducts);
  }, [selectedProducts]);

  const handleSave = async () => {
    const added = selectedProducts.filter(id => !initialSelectedProducts.includes(id));
    const removed = initialSelectedProducts.filter(id => !selectedProducts.includes(id));

    try {
    if (added.length > 0 || removed.length > 0) {
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

  const closePopup = () => {
    setShowPopup(false);
  };

  if (loading && !treeData.length) return <div className="tree-container"><LoadingPage /></div>;

  return (
    <div className="tree-container" dir={isRTL ? 'rtl' : 'ltr'}>
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
    </div>
  );
};

export default Product;