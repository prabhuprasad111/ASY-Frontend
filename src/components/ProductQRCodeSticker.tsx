import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { SHGProduct } from '../data/shgProductsData';
import { Printer, Download, ExternalLink, ShieldCheck, CheckCircle2, QrCode as QrIcon, Sparkles } from 'lucide-react';

interface Props {
  product: SHGProduct;
  onOpenProductDirectly?: (productId: string) => void;
}

export const ProductQRCodeSticker: React.FC<Props> = ({ product, onOpenProductDirectly }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const stickerRef = useRef<HTMLDivElement>(null);

  // Generate deep-link URL that opens this exact product in the application
  const productDirectUrl = `${window.location.origin}${window.location.pathname}#/products?productId=${product.id}`;

  useEffect(() => {
    QRCode.toDataURL(productDirectUrl, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [product.id, productDirectUrl]);

  const handlePrint = () => {
    const printContent = stickerRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=650,height=850');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Sticker - ${product.name}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 20px; display: flex; justify-content: center; }
              .sticker-container { width: 380px; border: 2px dashed #025c99; padding: 18px; border-radius: 12px; background: #fff; }
              .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 8px; margin-bottom: 12px; }
              .brand { color: #025c99; font-size: 18px; font-weight: 800; text-transform: uppercase; }
              .govt { color: #059669; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; }
              .product-title { font-size: 15px; font-weight: 700; margin: 8px 0; color: #1e293b; text-align: center; }
              .qr-box { text-align: center; margin: 12px 0; }
              .qr-img { width: 180px; height: 180px; }
              .meta-row { display: flex; justify-content: space-between; font-size: 11px; margin: 4px 0; color: #334155; }
              .meta-label { font-weight: 600; color: #64748b; }
              .meta-val { font-weight: 700; text-align: right; }
              .footer { font-size: 9px; color: #059669; text-align: center; margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 6px; font-weight: 600; }
              .url-box { font-size: 9px; word-break: break-all; background: #f1f5f9; padding: 4px; border-radius: 4px; margin-top: 6px; text-align: center; color: #025c99; }
            </style>
          </head>
          <body>
            <div class="sticker-container">
              ${printContent.innerHTML}
            </div>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR_${product.id}_${product.brandName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="qr-sticker-wrapper" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#ecfdf5', padding: '6px', borderRadius: '8px', color: '#059669', display: 'flex' }}>
            <QrIcon size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Smart Traceability QR Sticker</h4>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Tamper-proof Digital Authenticity Seal</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={handlePrint}
            title="Print Sticker"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
          >
            <Printer size={13} /> Print
          </button>
          <button
            onClick={handleDownload}
            title="Download QR Image"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#025c99', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
          >
            <Download size={13} /> QR PNG
          </button>
        </div>
      </div>

      {/* The Printable QR Sticker Container */}
      <div
        ref={stickerRef}
        style={{
          border: '2px dashed #025c99',
          borderRadius: '12px',
          padding: '16px',
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 28%, #ffffff 100%)',
          position: 'relative'
        }}
      >
        {/* Hologram style badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #059669', paddingBottom: '8px', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#059669', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Govt. of Odisha • Forest Dept
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#025c99', letterSpacing: '0.02em' }}>
              {product.brandName}
            </div>
          </div>
          <div style={{ background: '#059669', color: '#fff', padding: '3px 8px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={12} /> 100% VERIFIED
          </div>
        </div>

        {/* Product Title on Sticker */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.25' }}>
            {product.name}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
            {product.category}
          </div>
        </div>

        {/* QR Code Graphic Box */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)' }}>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code for ${product.name}`}
              style={{ width: '150px', height: '150px', display: 'block', borderRadius: '6px' }}
            />
          ) : (
            <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              Generating QR...
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', color: '#047857', fontSize: '0.72rem', fontWeight: 700 }}>
            <Sparkles size={12} /> Scan from any smartphone camera
          </div>
          <div style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'center', maxWidth: '240px', marginTop: '2px' }}>
            Instant origin verification &amp; direct consumer product page
          </div>
        </div>

        {/* Key Traceability Attributes Table */}
        <div style={{ marginTop: '12px', background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Manufacturer SHG:</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.manufacturerSHG}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>EDC / Village:</span>
            <span style={{ fontWeight: 600, color: '#334155' }}>{product.edcVillage}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Forest Division:</span>
            <span style={{ fontWeight: 600, color: '#334155' }}>{product.forestDivision}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '4px' }}>
            <span style={{ color: '#64748b' }}>Net Weight / Pack:</span>
            <span style={{ fontWeight: 800, color: '#025c99' }}>{product.netWeight}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Batch Number:</span>
            <span style={{ fontWeight: 700, color: '#475569', fontFamily: 'monospace' }}>{product.batchNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Harvested / Packed:</span>
            <span style={{ fontWeight: 700, color: '#059669' }}>{product.harvestDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>FSSAI / Reg ID:</span>
            <span style={{ fontWeight: 600, color: '#334155' }}>{product.fssaiLicense}</span>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div style={{ marginTop: '10px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            âœ“ Ama Similipal Eco-Development Certification
          </span>
        </div>
      </div>

      {/* Direct Clickable Link Below the QR Sticker */}
      <div style={{ marginTop: '14px', background: '#f0f9ff', padding: '12px', borderRadius: '10px', border: '1px solid #bae6fd' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369a1' }}>
              Direct Product Web Link
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', wordBreak: 'break-all', maxWidth: '280px' }}>
              {productDirectUrl}
            </div>
          </div>
          <button
            onClick={() => {
              if (onOpenProductDirectly) {
                onOpenProductDirectly(product.id);
              } else {
                window.location.hash = `/products?productId=${product.id}`;
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#025c99',
              color: '#fff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(2,92,153,0.25)'
            }}
          >
            <span>Open Product Page</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
