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
  Award,
  Sparkles,
  Info,
  Calendar,
  Layers,
  MapPin,
  Tag,
  ArrowRight
} from 'lucide-react';

export default function SHGProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Find featured product by URL query param (e.g. ?productId=SIM-HON-2026-000125) or default to the Wild Forest Honey
  const initialProductId = searchParams.get('productId') || 'SIM-HON-2026-000125';
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const urlId = searchParams.get('productId');
    if (urlId) {
      const match = shgProducts.find((p) => p.id === urlId);
      if (match) {
        setSelectedProductId(match.id);
      }
    }
  }, [searchParams]);

  // Current active product
  const activeProduct = useMemo(() => {
    return shgProducts.find((p) => p.id === selectedProductId) || shgProducts[0];
  }, [selectedProductId]);

  const handleSelectProduct = (product: SHGProduct) => {
    setSelectedProductId(product.id);
    setSearchParams({ productId: product.id });
    // Scroll smoothly to top of product view
    window.scrollTo({ top: 120, behavior: 'smooth' });
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
        marginBottom: '24px',
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
              Non-Timber Forest Produce (NTFP) and artisanal heritage handcrafted by women Self-Help Groups across Similipal Eco-Development Committees (EDCs). Every batch is sustainably foraged, quality verified, and traceable.
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
            <div style={{ background: '#f59e0b', color: '#78350f', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900 }}>
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
            <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Tiger Habitat Guardian</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>Zero Fire Extraction</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Quality Assurance</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>100% Raw Forest Pure</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. PRODUCT CATALOG: LEFT IMAGE & RIGHT PRODUCT INFO
          ========================================================================= */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        marginBottom: '24px'
      }}>
        {/* Verification Status Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: '#f8fafc',
          padding: '12px 18px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ecfdf5', color: '#059669', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Official Traceability &amp; Verification Record
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                Batch Verified: <span style={{ color: '#025c99', fontFamily: 'monospace' }}>{activeProduct.id}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setIsQRModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Generate packaging QR code for physical bottle labeling (not shown on client screen)"
            >
              <QrCode size={15} color="#025c99" />
              <span>Packaging QR Code (Separate)</span>
            </button>
            <span style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
              &bull; Active &amp; Authenticated
            </span>
          </div>
        </div>

        {/* TWO COLUMN GRID: LEFT IMAGE | RIGHT INFO */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* LEFT COLUMN: Product Image with badges */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
            }}>
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Overlay Badges */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(2, 92, 153, 0.9)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                {activeProduct.brandName}
              </div>
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(5, 150, 105, 0.95)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <PawPrint size={13} /> Tiger Reserve NTFP
              </div>
              <div style={{
                position: 'absolute',
                bottom: '14px',
                left: '14px',
                right: '14px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem'
              }}>
                <span>Net Weight: <strong>{activeProduct.netWeight}</strong></span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>&bull; {activeProduct.stockStatus}</span>
              </div>
            </div>

            {/* Wildlife & Quality Certification Chips under image */}
            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeProduct.certifications.map((cert) => (
                <span
                  key={cert}
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#166534',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <CheckCircle2 size={12} /> {cert}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Exact Product Info Table / Fields */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: '#025c99', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {activeProduct.brandName}
              </div>
              <h2 style={{ margin: '4px 0 8px 0', fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', lineHeight: '1.25' }}>
                {activeProduct.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308' }}>
                  <Star size={16} fill="#eab308" />
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{activeProduct.rating}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>({activeProduct.reviewsCount} customer reviews)</span>
                </div>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                  Produced by {activeProduct.womenBeneficiaries} Tribal Women Artisans
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '12px 18px',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
                ₹{activeProduct.salePrice}
              </span>
              <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{activeProduct.mrp}
              </span>
              <span style={{ background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                {Math.round(((activeProduct.mrp - activeProduct.salePrice) / activeProduct.mrp) * 100)}% OFF
              </span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748b' }}>
                Includes GST &bull; Direct to SHG Account
              </span>
            </div>

            {/* EXACT PRODUCT INFO ATTRIBUTES TABLE */}
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              fontSize: '0.82rem'
            }}>
              <div style={{ background: '#f1f5f9', padding: '10px 16px', fontWeight: 800, color: '#334155', borderBottom: '1px solid #e2e8f0' }}>
                Product Verification &amp; Traceability Specifications
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b', width: '38%' }}>Product:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 800, color: '#0f172a' }}>{activeProduct.name}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Product ID:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 800, color: '#025c99', fontFamily: 'monospace' }}>{activeProduct.id}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Product Batch:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>{activeProduct.productBatch}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Brand:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 700, color: '#025c99' }}>{activeProduct.brandName}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Produced By:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 800, color: '#059669' }}>{activeProduct.manufacturerSHG}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Source Area:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 700, color: '#0f172a' }}>{activeProduct.sourceArea}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Net Weight:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 800, color: '#025c99' }}>{activeProduct.netWeight}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Batch No.:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 700, color: '#475569', fontFamily: 'monospace' }}>{activeProduct.batchNumber}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Date of Harvest:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 700, color: '#0f172a' }}>{activeProduct.harvestDate}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Date of Packaging:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 800, color: '#059669' }}>{activeProduct.dateOfPackaging}</td>
                  </tr>
                  <tr style={{ background: '#fff' }}>
                    <td style={{ padding: '9px 16px', fontWeight: 600, color: '#64748b' }}>Best Before:</td>
                    <td style={{ padding: '9px 16px', fontWeight: 700, color: '#b91c1c' }}>{activeProduct.bestBefore}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setIsOrderModalOpen(true);
                  setOrderSubmitted(false);
                }}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  background: '#059669',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(5,150,105,0.25)'
                }}
              >
                <ShoppingBag size={18} /> Place Order / Direct Procurement
              </button>
              <button
                onClick={() => setIsQRModalOpen(true)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <QrCode size={16} color="#025c99" /> Packaging QR (Separate)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. AND BELOW THAT THANK YOU MESSAGE & CUSTOMER CARE
          ========================================================================= */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #eff6ff 100%)',
        borderRadius: '16px',
        border: '1px solid #bbf7d0',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: '0 4px 16px rgba(5, 150, 105, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
          <div style={{ background: '#059669', color: '#fff', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <HeartHandshake size={24} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', fontWeight: 900, color: '#065f46' }}>
              Message from Ama Similipal &bull; Community Forest Enterprise
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', lineHeight: '1.6' }}>
              {activeProduct.thankYouMessage}
            </p>
          </div>
        </div>

        {/* Customer Care Contact Details Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginTop: '16px',
          borderTop: '1px solid #dcfce7',
          paddingTop: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <Phone size={18} color="#025c99" />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>CUSTOMER CARE</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{activeProduct.customerCare}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <Mail size={18} color="#059669" />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>EMAIL SUPPORT</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{activeProduct.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <Globe size={18} color="#7c3aed" />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>OFFICIAL PORTAL</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{activeProduct.website}</div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BONUS TIPS: SIMILIPAL TIGER RESERVE CONSERVATION INTEGRATION
          ========================================================================= */}
      <div style={{
        background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 55%, #fef3c7 100%)',
        borderRadius: '16px',
        border: '1px solid #fde68a',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ background: '#f59e0b', color: '#fff', padding: '8px', borderRadius: '10px', display: 'flex' }}>
            <PawPrint size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#92400e' }}>
              Similipal Tiger Reserve &bull; Wildlife Co-Existence Guarantee
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#b45309', fontWeight: 700 }}>
              Protecting the World's Only Wild Melanistic (Black) Royal Bengal Tigers
            </span>
          </div>
        </div>

        <p style={{ margin: '0 0 16px 0', fontSize: '0.86rem', color: '#78350f', lineHeight: '1.6' }}>
          {activeProduct.tigerConservationNote}
        </p>

        {/* 3 Pillars of Tiger Conservation through SHGs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '14px'
        }}>
          <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #fef3c7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#b45309', fontSize: '0.82rem', marginBottom: '4px' }}>
              <Flame size={14} color="#dc2626" /> Forest Fire Prevention
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: '1.4' }}>
              Traditional honey hunters and leaf collectors actively extinguish and report summer fires, protecting tiger cub denning sites.
            </div>
          </div>

          <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #fef3c7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#b45309', fontSize: '0.82rem', marginBottom: '4px' }}>
              <TreePine size={14} color="#059669" /> Zero Core Encroachment
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: '1.4' }}>
              All harvest activities are strictly restricted to buffer agroforestry zones, leaving the 845 sq km Core Sanctuary undisturbed.
            </div>
          </div>

          <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #fef3c7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#b45309', fontSize: '0.82rem', marginBottom: '4px' }}>
              <Users size={14} color="#2563eb" /> Community Anti-Poaching Vigil
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: '1.4' }}>
              Tribal SHG women act as eyes and ears for forest department patrols, immediately neutralizing illegal wire snares.
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          OTHER AUTHENTIC SIMILIPAL PRODUCTS SHOWCASE (CATALOG SELECTOR)
          ========================================================================= */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
              Explore Other Similipal Forest &amp; Tribal Products
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Click any product to view its authentic verification certificate and batch details
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {shgProducts.map((p) => {
            const isSelected = p.id === activeProduct.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelectProduct(p)}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid #025c99' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 4px 14px rgba(2,92,153,0.18)' : '0 2px 6px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                  transform: isSelected ? 'scale(1.02)' : 'none'
                }}
              >
                <div style={{ position: 'relative', height: '140px', background: '#f1f5f9' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: '#025c99',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800
                    }}>
                      SELECTED
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 700
                  }}>
                    {p.netWeight}
                  </div>
                </div>

                <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.68rem', color: '#025c99', fontWeight: 800, textTransform: 'uppercase' }}>
                    {p.brandName}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', margin: '3px 0 6px 0', lineHeight: '1.25' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600, marginTop: 'auto', marginBottom: '6px' }}>
                    {p.manufacturerSHG}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>₹{p.salePrice}</span>
                    <span style={{ fontSize: '0.72rem', color: '#025c99', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      View Details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEPARATE PACKAGING QR CODE MODAL (Only opened via button, not on main screen) */}
      <ProductQRCodeModal
        product={activeProduct}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* ORDER INQUIRY MODAL */}
      {isOrderModalOpen && (
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
            maxWidth: '480px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                Direct SHG Procurement Inquiry
              </h3>
              <button onClick={() => setIsOrderModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '18px' }}>
                ✕
              </button>
            </div>

            {orderSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ background: '#ecfdf5', color: '#059669', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <CheckCircle2 size={30} />
                </div>
                <h4 style={{ margin: '0 0 6px 0', color: '#065f46' }}>Inquiry Sent Successfully!</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: '#64748b', lineHeight: '1.4' }}>
                  Your procurement request has been routed directly to <strong>{activeProduct.manufacturerSHG}</strong> and the Similipal Livelihood Facilitation Cell. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  style={{ background: '#025c99', color: '#fff', border: 'none', padding: '8px 22px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.8rem' }}>
                  <div><strong>Item:</strong> {activeProduct.name} ({activeProduct.netWeight})</div>
                  <div><strong>Producer:</strong> {activeProduct.manufacturerSHG}</div>
                  <div><strong>Price:</strong> ₹{activeProduct.salePrice}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name / Buyer</label>
                    <input type="text" defaultValue="Ramesh Kumar" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Phone / WhatsApp</label>
                    <input type="text" defaultValue="+91 98765 43210" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Requested Quantity</label>
                    <input type="number" defaultValue={2} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Delivery Address</label>
                    <input type="text" defaultValue="Bhubaneswar, Odisha" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setIsOrderModalOpen(false)}
                    style={{ background: '#f1f5f9', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setOrderSubmitted(true)}
                    style={{ background: '#059669', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}
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
