import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { shgProducts, SHGProduct } from '../data/shgProductsData';
import { ProductQRCodeSticker } from '../components/ProductQRCodeSticker';
import {
  ShoppingBag,
  Search,
  Filter,
  QrCode,
  ShieldCheck,
  Star,
  Users,
  Award,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
  TreePine,
  Heart,
  Share2,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function SHGProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProduct, setSelectedProduct] = useState<SHGProduct | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'qr'>('details');
  const [orderModalProduct, setOrderModalProduct] = useState<SHGProduct | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Check URL query parameters for deep linking from QR code scans (e.g. ?productId=ASY-SHG-101)
  useEffect(() => {
    const urlProductId = searchParams.get('productId');
    if (urlProductId) {
      const match = shgProducts.find((p) => p.id === urlProductId);
      if (match) {
        setSelectedProduct(match);
      }
    }
  }, [searchParams]);

  // Categories list
  const categories = [
    'All',
    'Wild Honey',
    'Kurkuti & Traditional Foods',
    'Wild Mushrooms (Chhatu)',
    'Jhuna & Natural Resins',
    'Forest Arrowroot (Palua)',
    'Wild Edible Leaves (Saga)',
    'Sabai Grass & Crafts',
    'Sal Leaf Eco-Tableware'
  ];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return shgProducts
      .filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.manufacturerSHG.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.edcVillage.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.forestDivision.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.salePrice - b.salePrice;
        if (sortBy === 'price-high') return b.salePrice - a.salePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured'
      });
  }, [searchQuery, selectedCategory, sortBy]);

  // KPI aggregates
  const totalBeneficiaries = useMemo(() => {
    return shgProducts.reduce((sum, p) => sum + p.womenBeneficiaries, 0);
  }, []);

  const openProductModal = (product: SHGProduct, defaultTab: 'details' | 'qr' = 'details') => {
    setSelectedProduct(product);
    setActiveTab(defaultTab);
    setSearchParams({ productId: product.id });
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSearchParams({});
  };

  return (
    <div className="shg-products-page" style={{ width: '100%', padding: '6px 12px', color: '#1e293b' }}>
      {/* Page Header & Intro Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #025c99 0%, #0369a1 50%, #059669 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        color: '#fff',
        marginBottom: '28px',
        boxShadow: '0 10px 25px -5px rgba(2, 92, 153, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '850px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
            <TreePine size={14} /> AMA SIMILIPAL YOJANA &bull; FOREST TRIBAL ENTERPRISES
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 10px 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Similipal SHG Products &amp; Direct Traceability
          </h1>
          <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.92, lineHeight: '1.5' }}>
            Pure forest harvest, non-timber forest produce (NTFP), and indigenous handicrafts crafted by women Self-Help Groups across Similipal Eco-Development Committees (EDCs). Every product features a <strong>smart QR sticker</strong> for instant consumer authenticity and batch verification.
          </p>
        </div>

        {/* Stats Row inside Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '20px'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>Active SHG Products</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{shgProducts.length} Catalogue Items</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>Women Artisans / SHGs</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{totalBeneficiaries}+ Empowered</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>Quality Standard</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>100% Traceable QR</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>Forest Revenue Model</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>Direct to SHG Account</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Category Tabs & Sort */}
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by brand, honey, SHG name, village, division..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              background: '#f8fafc'
            }}
          />
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              background: '#fff',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '30px',
              border: selectedCategory === cat ? '1px solid #025c99' : '1px solid #e2e8f0',
              background: selectedCategory === cat ? '#025c99' : '#fff',
              color: selectedCategory === cat ? '#fff' : '#475569',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              boxShadow: selectedCategory === cat ? '0 2px 8px rgba(2,92,153,0.25)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            className="product-card"
          >
            {/* Image Header with Badges */}
            <div style={{ position: 'relative', height: '220px', background: '#f1f5f9', overflow: 'hidden' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                {product.category}
              </div>
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#059669',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.68rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} /> QR Traceable
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#025c99',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                {product.brandName}
              </div>
            </div>

            {/* Product Body */}
            <div style={{ padding: '18px', flex: '1', display: 'flex', flexDirection: 'column' }}>
              {/* Title & Net Weight */}
              <div style={{ marginBottom: '8px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.3' }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#025c99', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                    Net Wt: {product.netWeight}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#eab308', fontSize: '0.75rem', fontWeight: 700 }}>
                    <Star size={14} fill="#eab308" />
                    <span style={{ color: '#0f172a' }}>{product.rating}</span>
                    <span style={{ color: '#94a3b8' }}>({product.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Manufacturer SHG Info Box */}
              <div style={{
                background: '#f8fafc',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #f1f5f9',
                marginBottom: '14px',
                fontSize: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 700, marginBottom: '2px' }}>
                  <Users size={13} /> {product.manufacturerSHG}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                  📍 {product.edcVillage} &bull; {product.forestDivision}
                </div>
              </div>

              {/* Price & Stock */}
              <div style={{ marginTop: 'auto', marginBottom: '14px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                  ₹{product.salePrice}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{product.mrp}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                  ({Math.round(((product.mrp - product.salePrice) / product.mrp) * 100)}% OFF)
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => openProductModal(product, 'details')}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#1e293b',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Package size={14} /> Full Details
                </button>
                <button
                  onClick={() => openProductModal(product, 'qr')}
                  style={{
                    background: '#025c99',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(2,92,153,0.2)'
                  }}
                >
                  <QrCode size={14} /> View QR Sticker
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <Package size={48} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ margin: '0 0 6px 0', color: '#1e293b' }}>No products found</h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
            Try clearing filters or search queries to view all tribal SHG products.
          </p>
        </div>
      )}

      {/* Product Detail & QR Sticker Full Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.72rem', background: '#025c99', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>
                  {selectedProduct.id}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={closeProductModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%',
                  color: '#64748b'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
              <button
                onClick={() => setActiveTab('details')}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'details' ? '3px solid #025c99' : '3px solid transparent',
                  background: 'transparent',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: activeTab === 'details' ? '#025c99' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Package size={16} /> Commercial Specs &amp; SHG Story
              </button>
              <button
                onClick={() => setActiveTab('qr')}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'qr' ? '3px solid #059669' : '3px solid transparent',
                  background: 'transparent',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: activeTab === 'qr' ? '#059669' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <QrCode size={16} /> Smart QR Sticker &amp; Authenticity Seal
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              {activeTab === 'details' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {/* Left Column: Image & Commercial Highlights */}
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
                    />
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>₹{selectedProduct.salePrice}</span>
                          <span style={{ fontSize: '0.95rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>₹{selectedProduct.mrp}</span>
                        </div>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                          {selectedProduct.stockStatus}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                        {selectedProduct.description}
                      </p>
                      <button
                        onClick={() => {
                          setOrderModalProduct(selectedProduct);
                          setOrderSuccess(false);
                        }}
                        style={{
                          width: '100%',
                          background: '#059669',
                          color: '#fff',
                          border: 'none',
                          padding: '10px',
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(5,150,105,0.25)'
                        }}
                      >
                        <ShoppingBag size={16} /> Place Bulk / Retail Order Inquiry
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Manufacturer, Specifications & Story */}
                  <div>
                    {/* Manufacturer Info Card */}
                    <div style={{ background: '#f0f9ff', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd', marginBottom: '16px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 800, color: '#0369a1' }}>
                        Producer Self-Help Group (SHG) Details
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }}>
                        <div><strong>Group:</strong> {selectedProduct.manufacturerSHG}</div>
                        <div><strong>EDC Village:</strong> {selectedProduct.edcVillage}</div>
                        <div><strong>Forest Division:</strong> {selectedProduct.forestDivision}</div>
                        <div><strong>SHG Leader:</strong> {selectedProduct.shgLeader}</div>
                        <div><strong>Artisans Benefited:</strong> {selectedProduct.womenBeneficiaries} Tribal Women</div>
                        <div><strong>FSSAI / Reg:</strong> {selectedProduct.fssaiLicense}</div>
                      </div>
                    </div>

                    {/* Specifications Grid */}
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>
                        Product Specifications &amp; Traceability
                      </h4>
                      <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', color: '#64748b' }}>Brand Name:</td>
                            <td style={{ padding: '6px 0', fontWeight: 700, color: '#025c99' }}>{selectedProduct.brandName}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', color: '#64748b' }}>Net Weight / Pack:</td>
                            <td style={{ padding: '6px 0', fontWeight: 700 }}>{selectedProduct.netWeight}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', color: '#64748b' }}>Batch Number:</td>
                            <td style={{ padding: '6px 0', fontWeight: 700, fontFamily: 'monospace' }}>{selectedProduct.batchNumber}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', color: '#64748b' }}>Harvest / Packing Date:</td>
                            <td style={{ padding: '6px 0', fontWeight: 700 }}>{selectedProduct.harvestDate}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', color: '#64748b' }}>Expiry / Best Before:</td>
                            <td style={{ padding: '6px 0', fontWeight: 700 }}>{selectedProduct.expiryDate}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 0', color: '#64748b' }}>Ingredients / Material:</td>
                            <td style={{ padding: '6px 0', fontWeight: 600 }}>{selectedProduct.ingredientsOrMaterials}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Certifications Badges */}
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                        Certifications &amp; Quality Guarantees
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedProduct.certifications.map((cert) => (
                          <span key={cert} style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={12} /> {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Story */}
                    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px', borderRadius: '10px' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 800, color: '#92400e' }}>
                        Community Impact &amp; Women's Story
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#78350f', lineHeight: '1.4' }}>
                        {selectedProduct.shgStory}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* QR Sticker Tab */
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: '520px' }}>
                    <ProductQRCodeSticker
                      product={selectedProduct}
                      onOpenProductDirectly={() => setActiveTab('details')}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Inquiry Modal */}
      {orderModalProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                Product Inquiry / Direct Procurement
              </h3>
              <button onClick={() => setOrderModalProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            {orderSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ background: '#ecfdf5', color: '#059669', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ margin: '0 0 6px 0', color: '#065f46' }}>Inquiry Submitted Successfully!</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: '#64748b' }}>
                  Your procurement request has been routed to <strong>{orderModalProduct.manufacturerSHG}</strong> and the Similipal Livelihood Facilitation Center. You will receive an SMS and email confirmation shortly.
                </p>
                <button
                  onClick={() => setOrderModalProduct(null)}
                  style={{ background: '#025c99', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.8rem' }}>
                  <div><strong>Item:</strong> {orderModalProduct.name} ({orderModalProduct.netWeight})</div>
                  <div><strong>Producer:</strong> {orderModalProduct.manufacturerSHG}</div>
                  <div><strong>Unit Price:</strong> ₹{orderModalProduct.salePrice}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name / Organization</label>
                    <input type="text" placeholder="e.g. Ramesh Kumar / Odisha Crafts Hub" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} defaultValue="Ramesh Kumar" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Contact Phone / WhatsApp</label>
                    <input type="text" placeholder="+91 98765 43210" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Requested Quantity</label>
                    <input type="number" defaultValue={5} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Delivery Destination (City / State)</label>
                    <input type="text" placeholder="Bhubaneswar, Odisha" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} defaultValue="Bhubaneswar, Odisha" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '18px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setOrderModalProduct(null)}
                    style={{ background: '#f1f5f9', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setOrderSuccess(true)}
                    style={{ background: '#059669', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}
                  >
                    Submit Order Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
