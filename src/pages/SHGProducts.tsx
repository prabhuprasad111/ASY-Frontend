import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { shgProducts, SHGProduct } from '../data/shgProductsData';
import { ProductQRCodeModal } from '../components/ProductQRCodeSticker';
import {
  ShoppingBag,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  TreePine,
  PawPrint,
  Phone,
  Mail,
  Globe,
  QrCode,
  HeartHandshake,
  Flame,
  Search,
  X,
  Package,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function SHGProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProduct, setSelectedProduct] = useState<SHGProduct | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);

  // Auto-open modal if URL query param ?productId=... is present
  useEffect(() => {
    const urlId = searchParams.get('productId');
    if (urlId) {
      const match = shgProducts.find((p) => p.id === urlId);
      if (match) {
        setSelectedProduct(match);
      }
    }
  }, [searchParams]);

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

  const filteredProducts = useMemo(() => {
    return shgProducts
      .filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.manufacturerSHG.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.edcVillage.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.salePrice - b.salePrice;
        if (sortBy === 'price-high') return b.salePrice - a.salePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const openProductPopup = (product: SHGProduct) => {
    setSelectedProduct(product);
    setSearchParams({ productId: product.id });
  };

  const closeProductPopup = () => {
    setSelectedProduct(null);
    setSearchParams({});
  };

  return (
    <div className="shg-products-page" style={{ width: '100%', padding: '6px 12px', color: '#1e293b' }}>
      {/* =========================================================================
          1. HEADER WITH SIMILAR FLAVOUR (ODISHA FOREST DEPT & TIGER RESERVE)
          ========================================================================= */}
      <div style={{
        background: 'linear-gradient(135deg, #025c99 0%, #0369a1 45%, #059669 100%)',
        borderRadius: '16px',
        padding: '24px 30px',
        color: '#fff',
        marginBottom: '22px',
        boxShadow: '0 8px 24px -4px rgba(2, 92, 153, 0.22)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 800, marginBottom: '10px', letterSpacing: '0.04em' }}>
              <TreePine size={14} /> GOVERNMENT OF ODISHA &bull; FOREST, ENVIRONMENT &amp; CLIMATE CHANGE DEPARTMENT
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Ama Similipal Yojana: SHG Products &amp; Verification Directory
            </h1>
            <p style={{ margin: 0, fontSize: '0.92rem', opacity: 0.95, lineHeight: '1.5' }}>
              Authentic Non-Timber Forest Produce (NTFP) and handicrafts crafted by women Self-Help Groups across Similipal Eco-Development Committees (EDCs). Every product carries a unique traceable batch certificate.
            </p>
          </div>

          {/* Tiger Reserve Emblem Badge */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '12px 18px',
            borderRadius: '12px',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ background: '#f59e0b', color: '#78350f', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900 }}>
              🐅
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.05em', color: '#fef08a', textTransform: 'uppercase' }}>
                Similipal Tiger Reserve
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 900 }}>
                Wildlife Co-existence Certified
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '14px',
          marginTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '18px'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Authentic Forest Products</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{shgProducts.length} Verified Lines</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Tribal Women Artisans</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>180+ Empowered</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Tiger Sanctuary Co-Existence</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>Zero Fire Harvest</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Traceability Quality</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>100% Direct to SHG</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CONTROLS BAR: SEARCH, SORT & CATEGORY FILTER TABS
          ========================================================================= */}
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '14px 18px',
        border: '1px solid #e2e8f0',
        marginBottom: '18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search honey, kurkuti, mushrooms, palua, jhuna, SHG name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none',
              background: '#f8fafc'
            }}
          />
        </div>

        {/* Sort */}
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
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '24px',
              border: selectedCategory === cat ? '1px solid #025c99' : '1px solid #e2e8f0',
              background: selectedCategory === cat ? '#025c99' : '#fff',
              color: selectedCategory === cat ? '#fff' : '#475569',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              boxShadow: selectedCategory === cat ? '0 2px 8px rgba(2,92,153,0.22)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* =========================================================================
          PRODUCT CATALOG CARDS GRID
          ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: '22px',
        marginBottom: '36px'
      }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => openProductPopup(product)}
            style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            className="product-card"
          >
            {/* Card Image */}
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
                background: 'rgba(2, 92, 153, 0.9)',
                color: '#fff',
                padding: '3px 8px',
                borderRadius: '5px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {product.brandName}
              </div>
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#059669',
                color: '#fff',
                padding: '3px 8px',
                borderRadius: '5px',
                fontSize: '0.68rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <PawPrint size={12} /> Tiger Reserve NTFP
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                Net Wt: {product.netWeight}
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.72rem', color: '#025c99', fontWeight: 800, fontFamily: 'monospace' }}>
                  {product.id}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#eab308', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Star size={14} fill="#eab308" />
                  <span style={{ color: '#0f172a' }}>{product.rating}</span>
                  <span style={{ color: '#94a3b8' }}>({product.reviewsCount})</span>
                </div>
              </div>

              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.3' }}>
                {product.name}
              </h3>

              <div style={{
                background: '#f8fafc',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '0.73rem',
                color: '#059669',
                fontWeight: 700,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Users size={12} /> {product.manufacturerSHG}
              </div>

              {/* Price & Action */}
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>₹{product.salePrice}</span>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' }}>₹{product.mrp}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductPopup(product);
                  }}
                  style={{
                    background: '#025c99',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 6px rgba(2,92,153,0.2)'
                  }}
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          THE POPUP MODAL (THE VIEW THE USER LOVED!)
          ========================================================================= */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '1040px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
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
                <span style={{ fontSize: '0.74rem', background: '#025c99', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 800, fontFamily: 'monospace' }}>
                  {selectedProduct.id}
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
                    {selectedProduct.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} /> Official Similipal NTFP Verified Record
                  </span>
                </div>
              </div>
              <button
                onClick={closeProductPopup}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%',
                  color: '#64748b'
                }}
                title="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              {/* TWO COLUMN PRODUCT VIEW: LEFT IMAGE | RIGHT INFO */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '24px' }}>
                {/* Left Column: Big Product Image & Price */}
                <div>
                  <div style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    marginBottom: '16px'
                  }}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(2, 92, 153, 0.92)',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}>
                      {selectedProduct.brandName}
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#059669',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <PawPrint size={12} /> Tiger Reserve NTFP
                    </div>
                  </div>

                  {/* Price Box & Order Button */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>₹{selectedProduct.salePrice}</span>
                        <span style={{ fontSize: '0.95rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>₹{selectedProduct.mrp}</span>
                        <span style={{ marginLeft: '8px', background: '#ecfdf5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                          {Math.round(((selectedProduct.mrp - selectedProduct.salePrice) / selectedProduct.mrp) * 100)}% OFF
                        </span>
                      </div>
                      <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                        {selectedProduct.stockStatus}
                      </span>
                    </div>

                    <p style={{ margin: '0 0 14px 0', fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                      {selectedProduct.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setIsOrderModalOpen(true);
                          setOrderSubmitted(false);
                        }}
                        style={{
                          background: '#059669',
                          color: '#fff',
                          border: 'none',
                          padding: '11px',
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(5,150,105,0.25)'
                        }}
                      >
                        <ShoppingBag size={16} /> Place Order / Procurement
                      </button>
                      <button
                        onClick={() => setIsQRModalOpen(true)}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        title="Generate packaging QR label (separate)"
                      >
                        <QrCode size={16} color="#025c99" /> Packaging QR
                      </button>
                    </div>
                  </div>

                  {/* Certifications Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedProduct.certifications.map((cert) => (
                      <span key={cert} style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} /> {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Exact Specifications Table */}
                <div>
                  <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    fontSize: '0.82rem'
                  }}>
                    <div style={{ background: '#f1f5f9', padding: '10px 16px', fontWeight: 800, color: '#334155', borderBottom: '1px solid #e2e8f0' }}>
                      Product Verification &amp; Traceability Specifications
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b', width: '40%' }}>Product:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 800, color: '#0f172a' }}>{selectedProduct.name}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Product ID:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 800, color: '#025c99', fontFamily: 'monospace' }}>{selectedProduct.id}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Product Batch:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>{selectedProduct.productBatch}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Brand:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 700, color: '#025c99' }}>{selectedProduct.brandName}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Produced By:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 800, color: '#059669' }}>{selectedProduct.manufacturerSHG}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Source Area:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 700, color: '#0f172a' }}>{selectedProduct.sourceArea}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Net Weight:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 800, color: '#025c99' }}>{selectedProduct.netWeight}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Batch No.:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 700, color: '#475569', fontFamily: 'monospace' }}>{selectedProduct.batchNumber}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Date of Harvest:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 700, color: '#0f172a' }}>{selectedProduct.harvestDate}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Date of Packaging:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 800, color: '#059669' }}>{selectedProduct.dateOfPackaging}</td>
                        </tr>
                        <tr style={{ background: '#fff' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#64748b' }}>Best Before:</td>
                          <td style={{ padding: '8px 14px', fontWeight: 700, color: '#b91c1c' }}>{selectedProduct.bestBefore}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Producer SHG Highlights Card */}
                  <div style={{ background: '#f0f9ff', padding: '14px 16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.86rem', fontWeight: 800, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} /> Community &amp; Women Empowerment Story
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#1e3a8a', lineHeight: '1.45' }}>
                      {selectedProduct.shgStory}
                    </p>
                  </div>
                </div>
              </div>

              {/* THANK YOU MESSAGE & CUSTOMER CARE CARD (Inside popup below info) */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #eff6ff 100%)',
                borderRadius: '14px',
                border: '1px solid #bbf7d0',
                padding: '18px 22px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ background: '#059669', color: '#fff', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                    <HeartHandshake size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', fontWeight: 900, color: '#065f46' }}>
                      Message from Ama Similipal &bull; Community Forest Enterprise
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#1f2937', lineHeight: '1.5' }}>
                      {selectedProduct.thankYouMessage}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  borderTop: '1px solid #dcfce7',
                  paddingTop: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                    <Phone size={15} color="#025c99" />
                    <div><strong>Customer Care:</strong> {selectedProduct.customerCare}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                    <Mail size={15} color="#059669" />
                    <div><strong>Email:</strong> {selectedProduct.email}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                    <Globe size={15} color="#7c3aed" />
                    <div><strong>Website:</strong> {selectedProduct.website}</div>
                  </div>
                </div>
              </div>

              {/* TIGER CONSERVATION CALLOUT */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '22px' }}>🐅</span>
                <div style={{ fontSize: '0.78rem', color: '#78350f', lineHeight: '1.45' }}>
                  <strong>Similipal Tiger Reserve Conservation Pledge:</strong> {selectedProduct.tigerConservationNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEPARATE PACKAGING QR CODE MODAL (Only opened via button, not on main screen) */}
      {selectedProduct && (
        <ProductQRCodeModal
          product={selectedProduct}
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
        />
      )}

      {/* ORDER INQUIRY MODAL */}
      {selectedProduct && isOrderModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            padding: '22px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                Direct SHG Procurement Inquiry
              </h3>
              <button onClick={() => setIsOrderModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '18px' }}>
                ✕
              </button>
            </div>

            {orderSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ background: '#ecfdf5', color: '#059669', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h4 style={{ margin: '0 0 6px 0', color: '#065f46' }}>Inquiry Submitted!</h4>
                <p style={{ margin: '0 0 14px 0', fontSize: '0.8rem', color: '#64748b' }}>
                  Your procurement inquiry for <strong>{selectedProduct.name}</strong> has been sent to {selectedProduct.manufacturerSHG}. Our facilitation desk will reach out soon.
                </p>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  style={{ background: '#025c99', color: '#fff', border: 'none', padding: '7px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.78rem' }}>
                  <div><strong>Item:</strong> {selectedProduct.name} ({selectedProduct.netWeight})</div>
                  <div><strong>Producer:</strong> {selectedProduct.manufacturerSHG}</div>
                  <div><strong>Price:</strong> ₹{selectedProduct.salePrice}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '3px' }}>Buyer Name / Organization</label>
                    <input type="text" defaultValue="Ramesh Kumar" style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '3px' }}>Phone Number</label>
                    <input type="text" defaultValue="+91 98765 43210" style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '3px' }}>Quantity Required</label>
                    <input type="number" defaultValue={2} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setIsOrderModalOpen(false)}
                    style={{ background: '#f1f5f9', border: 'none', padding: '7px 12px', borderRadius: '6px', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setOrderSubmitted(true)}
                    style={{ background: '#059669', border: 'none', padding: '7px 16px', borderRadius: '6px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}
                  >
                    Submit Inquiry
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
