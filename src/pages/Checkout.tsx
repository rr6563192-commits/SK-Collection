import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerDetails } from '../types';

const REQUIRED_FIELDS: (keyof CustomerDetails)[] = [
  'fullName',
  'mobileNumber',
  'houseNumber',
  'streetArea',
  'city',
  'state',
  'pincode',
];

const FIELD_LABELS: Record<keyof CustomerDetails, string> = {
  fullName: 'Full Name',
  mobileNumber: 'Mobile Number',
  alternateNumber: 'Alternate Number',
  houseNumber: 'House / Door Number',
  streetArea: 'Street / Area',
  city: 'City',
  district: 'District',
  state: 'State',
  pincode: 'Pincode',
  landmark: 'Landmark',
  deliveryNotes: 'Delivery Notes',
};

const Checkout: React.FC = () => {
  const { cart, customerDetails, setCustomerDetails } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState<CustomerDetails>(customerDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, boolean>>>({});

  if (cart.length === 0) return <Navigate to="/cart" replace />;

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof CustomerDetails, boolean>> = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = true;
    });
    if (form.mobileNumber && !/^\d{10}$/.test(form.mobileNumber.trim())) {
      nextErrors.mobileNumber = true;
    }
    if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) {
      nextErrors.pincode = true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setCustomerDetails(form);
    navigate('/order-summary');
  };

  const renderField = (field: keyof CustomerDetails, options?: { area?: boolean; required?: boolean }) => (
    <div key={field} className={options?.area ? 'sm:col-span-2' : ''}>
      <label htmlFor={field} className="block text-xs tracking-[0.1em] uppercase text-gold-soft mb-2">
        {FIELD_LABELS[field]} {options?.required && <span className="text-gold">*</span>}
      </label>
      {options?.area ? (
        <textarea
          id={field}
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          rows={3}
          className="input-luxury resize-none"
        />
      ) : (
        <input
          id={field}
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className="input-luxury"
        />
      )}
      {errors[field] && (
        <p className="flex items-center gap-1.5 text-gold-bright text-xs mt-1.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5" />
          {field === 'mobileNumber'
            ? 'Please enter a valid 10-digit mobile number.'
            : field === 'pincode'
            ? 'Please enter a valid 6-digit pincode.'
            : `Please enter your ${FIELD_LABELS[field].toLowerCase()}.`}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-bg-deep min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-10 py-14">
        <h1 className="heading-serif text-3xl sm:text-4xl text-text-primary mb-2">Delivery Details</h1>
        <p className="text-text-secondary mb-10">Tell us where to deliver your order.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {renderField('fullName', { required: true })}
          {renderField('mobileNumber', { required: true })}
          {renderField('alternateNumber')}
          {renderField('houseNumber', { required: true })}
          {renderField('streetArea', { required: true, area: true })}
          {renderField('city', { required: true })}
          {renderField('district')}
          {renderField('state', { required: true })}
          {renderField('pincode', { required: true })}
          {renderField('landmark')}
          {renderField('deliveryNotes', { area: true })}

          <div className="sm:col-span-2 mt-4">
            <button type="submit" className="btn-gold-solid w-full">
              Review Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
