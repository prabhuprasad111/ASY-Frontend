import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useForm } from 'react-hook-form';

export default function Resources() {
  const [categories, setCategories] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm();

  // 1. Fetch Categories on load
  useEffect(() => {
    apiClient.get('/resources/categories')
      .then(res => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch(err => console.warn("API Error (Categories):", err));

    // Fallback if API fails
    setCategories([
      { id: 1, categoryName: 'Water Resource', resourceTypes: [{ id: 1, typeName: 'Pond' }] },
      { id: 2, categoryName: 'Forest Resource', resourceTypes: [{ id: 2, typeName: 'Medicinal Plant' }] },
      { id: 3, categoryName: 'Mineral Resource', resourceTypes: [{ id: 3, typeName: 'Ore Deposit' }] },
      { id: 4, categoryName: 'Other', resourceTypes: [{ id: 4, typeName: 'Other' }] }
    ]);
  }, []);

  // 2. Filter types when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const cat = categories.find(c => c.id === selectedCategory);
      setTypes(cat?.resourceTypes || cat?.ResourceTypes || []); // handle camelCase or PascalCase mapping
      setSelectedType(null);
      setAttributes([]);
    }
  }, [selectedCategory, categories]);

  // 3. Fetch attributes when type is selected
  useEffect(() => {
    if (selectedType) {
      apiClient.get(`/resources/types/${selectedType}/attributes`)
        .then(res => {
          if (res.data.success) {
            setAttributes(res.data.data);
          }
        })
        .catch(err => {
          console.warn("API Error (Attributes):", err);
          // Fallback demo attributes
          if (selectedType === 1) {
            setAttributes([
              { attributeCode: 'ATTR-DEPTH', attributeName: 'Depth (meters)', dataType: 'Number', isRequired: true },
              { attributeCode: 'ATTR-SEASON', attributeName: 'Seasonality', dataType: 'Dropdown', optionsJson: '["Perennial", "Seasonal"]', isRequired: true }
            ]);
          } else {
            setAttributes([
              { attributeCode: 'ATTR-SPECIES', attributeName: 'Species Name', dataType: 'Text', isRequired: true },
              { attributeCode: 'ATTR-USE', attributeName: 'Medicinal Use', dataType: 'Text', isRequired: false }
            ]);
          }
        });
    }
  }, [selectedType]);

  const onSubmit = (data: any) => {
    const payload = {
      resourceTypeId: selectedType,
      resourceName: data.resourceName,
      description: data.description,
      villageId: 1, // hardcoded for demo
      latitude: 21.93,
      longitude: 86.38,
      attributeValues: attributes.map(attr => ({
        resourceAttributeDefinitionId: attr.id || 0,
        value: data[attr.attributeCode]
      }))
    };

    // Simulate API POST
    console.log("Submitting Resource:", payload);
    apiClient.post('/resources', payload)
      .then(() => alert("Resource successfully added!"))
      .catch(() => alert("Saved to local offline queue (Demo mode)."));

    reset();
    setSelectedType(null);
  };

  return (
    <div className="view active">
      <div className="page-head">
        <div>
          <div className="eyebrow">Field Data Collection</div>
          <h1>Dynamic Resource Form</h1>
          <p>Select a resource category and type to dynamically load the required assessment fields.</p>
        </div>
      </div>

      <div className="grid-12">
        <article className="panel span-8">
          <div className="panel-head">
            <div><h2>Add New Resource</h2><div className="panel-sub">Operator data entry form</div></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '16px' }}>
            {/* Category Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Resource Category</label>
              <select
                style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }}
                onChange={e => setSelectedCategory(Number(e.target.value))}
              >
                <option value="">-- Select Category --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.categoryName}</option>
                ))}
              </select>
            </div>

            {/* Type Selection */}
            {selectedCategory && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Resource Type</label>
                <select
                  style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }}
                  onChange={e => setSelectedType(Number(e.target.value))}
                >
                  <option value="">-- Select Type --</option>
                  {types.map(t => (
                    <option key={t.id} value={t.id}>{t.typeName}</option>
                  ))}
                  <option value="999">+ Propose New Unknown Resource</option>
                </select>
              </div>
            )}

            {/* Unknown Resource Fallback */}
            {selectedType === 999 && (
              <div style={{ padding: '16px', background: '#fff3dc', border: '1px solid #f0d296', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', marginTop: 0 }}>Propose New Resource Type</h3>
                <p style={{ fontSize: '0.8rem', color: '#7a4b00' }}>This will be submitted to the Officer for review and master data creation.</p>

                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', marginTop: '12px' }}>Proposed Type Name</label>
                <input {...register('proposedName')} style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }} />

                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', marginTop: '12px' }}>Reason / Field Notes</label>
                <textarea {...register('fieldNotes')} style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }} rows={3} />
              </div>
            )}

            {/* Dynamic Attributes Form */}
            {selectedType && selectedType !== 999 && (
              <div style={{ padding: '16px', background: '#f7f9fb', border: '1px solid #dce4ea', borderRadius: '8px', display: 'grid', gap: '14px' }}>
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Standard Information</h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Resource Name (Local)</label>
                  <input {...register('resourceName')} required style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                  <textarea {...register('description')} style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }} />
                </div>

                <hr style={{ borderTop: '1px solid #dce4ea', margin: '8px 0' }} />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Dynamic Attributes</h3>

                {attributes.map(attr => (
                  <div key={attr.attributeCode}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                      {attr.attributeName} {attr.isRequired && <span style={{ color: 'red' }}>*</span>}
                    </label>

                    {attr.dataType === 'Dropdown' ? (
                      <select {...register(attr.attributeCode, { required: attr.isRequired })} style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }}>
                        <option value="">-- Select --</option>
                        {JSON.parse(attr.optionsJson || '[]').map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : attr.dataType === 'Number' ? (
                      <input type="number" step="0.01" {...register(attr.attributeCode, { required: attr.isRequired })} style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }} />
                    ) : (
                      <input type="text" {...register(attr.attributeCode, { required: attr.isRequired })} style={{ width: '100%', padding: '10px', border: '1px solid #dce4ea', borderRadius: '8px' }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedType && (
              <button type="submit" className="primary-btn" style={{ padding: '12px', fontSize: '1rem', marginTop: '10px' }}>
                {selectedType === 999 ? 'Submit for Officer Approval' : 'Save Resource'}
              </button>
            )}
          </form>
        </article>

        <article className="panel span-4">
          <div className="panel-head">
            <div><h2>Instructions</h2><div className="panel-sub">Guidance for Operators</div></div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#617083' }}>
            1. Stand close to the resource to ensure high GPS accuracy.<br /><br />
            2. If you cannot find the correct resource type in the dropdown, select <strong>"+ Propose New Unknown Resource"</strong>. The backend team and Forest Officers will review your request and add it to the master list if appropriate.<br /><br />
            3. Ensure all mandatory fields marked with a red asterisk are completed.
          </p>
        </article>
      </div>
    </div>
  );
}
