import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { SHGProduct, buildQRPayload } from '../data/shgProductsData';
import { Printer, Download, X, QrCode as QrIcon, ShieldCheck, Sparkles, PawPrint } from 'lucide-react';

interface Props {
  product: SHGProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQRCodeModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const stickerRef = useRef<HTMLDivElement>(null);

  // Payload format matching user specification:
  // Product Name, Product ID, Date of Packaging, Produced By, and then Web Link
  const qrPayload = buildQRPayload(product, `${window.location.origin}${window.location.pathname}`);

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(qrPayload, {
      width: 260,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [product.id, qrPayload, isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = stickerRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=650,height=850');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Packaging QR Sticker - ${product.id}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 20px; display: flex; justify-content: center; }
              .sticker-container { width: 380px; border: 2px dashed #025c99; padding: 18px; border-radius: 12px; background: #fff; }
              .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 8px; margin-bottom: 12px; }
              .brand { color: #025c99; font-size: 16px; font-weight: 800; text-transform: uppercase; }
              .govt { color: #059669; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; }
              .product-title { font-size: 15px; font-weight: 700; margin: 8px 0; color: #1e293b; text-align: center; }
              .qr-box { text-align: center; margin: 12px 0; }
              .qr-img { width: 190px; height: 190px; }
              .meta-row { display: flex; justify-content: space-between; font-size: 11px; margin: 4px 0; color: #334155; }
              .meta-label { font-weight: 600; color: #64748b; }
              .meta-val { font-weight: 700; text-align: right; }
              .footer { font-size: 9px; color: #059669; text-align: center; margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 6px; font-weight: 600; }
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
    a.download = `QR_${product.id}_${product.batchNumber}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
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
        maxWidth: '520px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
        padding: '24px'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ecfdf5', padding: '8px', borderRadius: '10px', color: '#059669', display: 'flex' }}>
              <QrIcon size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Packaging QR Label Generator</h3>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Separate QR code for bottle stickers &amp; packaging verification</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scan Simulation Notice */}
        <div style={{ background: '#f0f9ff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bae6fd', marginBottom: '16px', fontSize: '0.78rem', color: '#0369a1', lineHeight: '1.4' }}>
          <strong>📱 On Scanning from any phone camera:</strong>
          <div style={{ marginTop: '4px', fontFamily: 'monospace', fontSize: '0.72rem', background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', color: '#1e293b', whiteSpace: 'pre-wrap' }}>
            {qrPayload}
          </div>
        </div>

        {/* The Printable Sticker */}
        <div
          ref={stickerRef}
          style={{
            border: '2px dashed #025c99',
            borderRadius: '14px',
            padding: '16px',
            background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 32%, #ffffff 100%)',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #059669', paddingBottom: '8px', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#059669', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                GOVT OF ODISHA &bull; AMA SIMILIPAL YOJANA
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#025c99' }}>
                {product.brandName}
              </div>
            </div>
            <div style={{ background: '#059669', color: '#fff', padding: '3px 8px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} /> VERIFIED SHG
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
              {product.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <PawPrint size={12} /> Similipal Tiger Reserve Forest Produce
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`QR Code for ${product.id}`}
                style={{ width: '170px', height: '170px', display: 'block', borderRadius: '6px' }}
              />
            ) : (
              <div style={{ width: '170px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                Generating QR...
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: '#047857', fontSize: '0.72rem', fontWeight: 700 }}>
              <Sparkles size={12} /> Scan to verify authenticity &amp; open product page
            </div>
          </div>

          <div style={{ marginTop: '12px', background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Product ID:</span>
              <span style={{ fontWeight: 800, color: '#025c99', fontFamily: 'monospace' }}>{product.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Date of Packaging:</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.dateOfPackaging}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Produced By:</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.manufacturerSHG}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Net Weight:</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.netWeight}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Batch Number:</span>
              <span style={{ fontWeight: 700, color: '#475569', fontFamily: 'monospace' }}>{product.batchNumber}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={handleDownload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#334155',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Download size={14} /> Download PNG
          </button>
          <button
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#025c99',
              border: 'none',
              color: '#fff',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(2,92,153,0.25)'
            }}
          >
            <Printer size={14} /> Print Sticker Label
          </button>
        </div>
      </div>
    </div>
  );
};
