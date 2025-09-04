import { useState } from 'react';
import InputField from 'components/fields/InputField';
import PasswordField from 'components/fields/PasswordField';
import TextField from 'components/fields/TextField';
import Checkbox from 'components/checkbox';

const BasicInformation = ({ data, onDataChange, validationErrors = {} }) => {
  const [errors, setErrors] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  
  // Merge local errors with validation errors from parent, but only show them if showValidationErrors is true
  const allErrors = { ...errors, ...(showValidationErrors ? validationErrors : {}) };

  const paymentMethodOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'mobile_money', label: 'Mobile Money' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' }
  ];

  const deliveryOptions = [
    { value: 'pickup', label: 'Pickup' },
    { value: 'local_delivery', label: 'Local Delivery' },
    { value: 'national_delivery', label: 'National Delivery' },
    { value: 'international_delivery', label: 'International Delivery' }
  ];

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      // Personal information validation
      case 'name':
        if (!value || value.trim().length < 1) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        if (!value || value.trim().length < 1) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value || value.trim().length < 1) {
          error = 'Phone number is required';
        }
        break;
      case 'password':
        if (!value || value.length < 6) {
          error = 'Password is required and must be at least 6 characters';
        }
        break;
      // Business information validation
      case 'businessName':
        if (!value || value.trim().length < 2) {
          error = 'Business name must be at least 2 characters long';
        } else if (value.length > 100) {
          error = 'Business name cannot exceed 100 characters';
        }
        break;
      case 'businessType':
        if (!value) {
          error = 'Business type is required';
        }
        break;
      case 'businessRegistrationNumber':
        if (!value || value.length < 5) {
          error = 'Business registration number must be at least 5 characters long';
        } else if (value.length > 20) {
          error = 'Business registration number cannot exceed 20 characters';
        } else if (!/^[A-Z0-9]+$/.test(value)) {
          error = 'Business registration number must contain only letters and numbers';
        }
        break;
      case 'businessEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'website':
        if (value && !/^https?:\/\/.+/.test(value)) {
          error = 'Please enter a valid website URL';
        }
        break;
      case 'businessDescription':
        if (value && value.length > 500) {
          error = 'Business description cannot exceed 500 characters';
        }
        break;
    }
    
    return error;
  };

  const handleInputChange = (field, value, nestedField = null) => {
    // Enable validation errors display once user starts interacting
    if (!showValidationErrors) {
      setShowValidationErrors(true);
    }
    
    if (nestedField) {
      onDataChange({
        [field]: {
          ...data[field],
          [nestedField]: value
        }
      });
      
      // Validate nested field for bank details
      if (field === 'bankDetails' && nestedField === 'accountNumber') {
        let error = '';
        if (value && value.length > 0 && !/^[0-9]{10,20}$/.test(value)) {
          error = 'Account number must be 10-20 digits';
        }
        setErrors(prev => ({ ...prev, [`${field}.${nestedField}`]: error }));
      }
    } else {
      onDataChange({ [field]: value });
      
      // Validate field and show error immediately
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
    
    // Clear error when user starts typing
    const errorKey = nestedField ? `${field}.${nestedField}` : field;
    if (allErrors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    const currentArray = data[field] || [];
    if (checked) {
      onDataChange({ [field]: [...currentArray, value] });
    } else {
      onDataChange({ [field]: currentArray.filter(item => item !== value) });
    }
  };

  return (
    <div className="px-6 py-4">
      <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-6">
        Basic Information
      </h3>
      
      {/* Personal Information */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <InputField
              label="Full Name *"
              id="name"
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              state={allErrors.name ? 'error' : ''}
            />
            {allErrors.name && (
              <p className="mt-1 text-xs text-red-500">{allErrors.name}</p>
            )}
          </div>
          
          <div>
            <InputField
              label="Email *"
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value.toLowerCase())}
              state={allErrors.email ? 'error' : ''}
            />
            {allErrors.email && (
              <p className="mt-1 text-xs text-red-500">{allErrors.email}</p>
            )}
          </div>
          
          <div>
            <InputField
              label="Phone Number *"
              id="phone"
              placeholder="Enter your phone number"
              value={data.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              state={allErrors.phone ? 'error' : ''}
            />
            {allErrors.phone && (
              <p className="mt-1 text-xs text-red-500">{allErrors.phone}</p>
            )}
          </div>
          
          <div>
            <PasswordField
              label="Password *"
              id="password"
              placeholder="Enter password (min 6 characters)"
              value={data.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              state={allErrors.password ? 'error' : ''}
            />
            {allErrors.password && (
              <p className="mt-1 text-xs text-red-500">{allErrors.password}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Business Information */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
          Business Details
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <InputField
              label="Business Name *"
              id="businessName"
              placeholder="Enter business name"
              value={data.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              state={allErrors.businessName ? 'error' : ''}
            />
            {allErrors.businessName && (
              <p className="mt-1 text-xs text-red-500">{allErrors.businessName}</p>
            )}
          </div>
          
          <div>
            <InputField
              label="Business Type *"
              id="businessType"
              placeholder="e.g., retail, wholesale, manufacturing, service"
              value={data.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              state={allErrors.businessType ? 'error' : ''}
            />
            {allErrors.businessType && (
              <p className="mt-1 text-xs text-red-500">{allErrors.businessType}</p>
            )}
          </div>
          
          <div>
            <InputField
              label="Business Registration Number *"
              id="businessRegistrationNumber"
              placeholder="Enter registration number"
              value={data.businessRegistrationNumber}
              onChange={(e) => handleInputChange('businessRegistrationNumber', e.target.value.toUpperCase())}
              state={allErrors.businessRegistrationNumber ? 'error' : ''}
            />
            {allErrors.businessRegistrationNumber && (
              <p className="mt-1 text-xs text-red-500">{allErrors.businessRegistrationNumber}</p>
            )}
          </div>
          

          
          <div>
            <InputField
              label="Business Email"
              id="businessEmail"
              type="email"
              placeholder="Enter business email address"
              value={data.businessEmail}
              onChange={(e) => handleInputChange('businessEmail', e.target.value.toLowerCase())}
              state={allErrors.businessEmail ? 'error' : ''}
            />
            {allErrors.businessEmail && (
              <p className="mt-1 text-xs text-red-500">{allErrors.businessEmail}</p>
            )}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <TextField
              label="Business Description"
              id="businessDescription"
              placeholder="Describe your business (optional)"
              rows={3}
              value={data.businessDescription}
              onChange={(e) => handleInputChange('businessDescription', e.target.value)}
              state={allErrors.businessDescription ? 'error' : ''}
            />
            {allErrors.businessDescription && (
              <p className="mt-1 text-xs text-red-500">{allErrors.businessDescription}</p>
            )}
          </div>
          
          <div>
            <InputField
              label="Website"
              id="website"
              placeholder="https://your-website.com (optional)"
              value={data.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              state={allErrors.website ? 'error' : ''}
            />
            {allErrors.website && (
              <p className="mt-1 text-xs text-red-500">{allErrors.website}</p>
            )}
          </div>
        </div>
      </div>

      {/* Business Address */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
          Business Address (Optional)
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InputField
            label="District"
            id="district"
            placeholder="Enter district"
            value={data.businessAddress?.district || ''}
            onChange={(e) => handleInputChange('businessAddress', e.target.value, 'district')}
          />
          
          <InputField
            label="Sub-County"
            id="subCounty"
            placeholder="Enter sub-county"
            value={data.businessAddress?.subCounty || ''}
            onChange={(e) => handleInputChange('businessAddress', e.target.value, 'subCounty')}
          />
          
          <InputField
            label="Village"
            id="village"
            placeholder="Enter village"
            value={data.businessAddress?.village || ''}
            onChange={(e) => handleInputChange('businessAddress', e.target.value, 'village')}
          />
          
          <InputField
            label="Street"
            id="street"
            placeholder="Enter street"
            value={data.businessAddress?.street || ''}
            onChange={(e) => handleInputChange('businessAddress', e.target.value, 'street')}
          />
          
          <InputField
            label="Postal Code"
            id="postalCode"
            placeholder="Enter 5-digit postal code"
            value={data.businessAddress?.postalCode || ''}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 5);
              handleInputChange('businessAddress', value, 'postalCode');
            }}
          />
        </div>
      </div>

      {/* Contact Person */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
          Contact Person (Optional)
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputField
            label="Contact Person Name"
            id="contactPersonName"
            placeholder="Enter contact person name"
            value={data.contactPerson?.name || ''}
            onChange={(e) => handleInputChange('contactPerson', e.target.value, 'name')}
          />
          
          <InputField
            label="Contact Phone"
            id="contactPhone"
            placeholder="Enter phone number"
            value={data.contactPerson?.phone || ''}
            onChange={(e) => handleInputChange('contactPerson', e.target.value, 'phone')}
          />
          
          <InputField
            label="Contact Email"
            id="contactEmail"
            type="email"
            placeholder="Enter contact email"
            value={data.contactPerson?.email || ''}
            onChange={(e) => handleInputChange('contactPerson', e.target.value, 'email')}
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
          Bank Details (Optional)
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Bank Name"
            id="bankName"
            placeholder="Enter bank name"
            value={data.bankDetails?.bankName || ''}
            onChange={(e) => handleInputChange('bankDetails', e.target.value, 'bankName')}
          />
          
          <div>
            <InputField
              label="Account Number"
              id="accountNumber"
              placeholder="Enter account number (10-20 digits)"
              value={data.bankDetails?.accountNumber || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 20);
                handleInputChange('bankDetails', value, 'accountNumber');
              }}
              error={allErrors['bankDetails.accountNumber']}
            />
            {data.bankDetails?.accountNumber && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {data.bankDetails.accountNumber.length < 10 
                  ? `Need ${10 - data.bankDetails.accountNumber.length} more digits (minimum 10 digits required)`
                  : data.bankDetails.accountNumber.length <= 20
                  ? `✓ Valid account number (${data.bankDetails.accountNumber.length} digits)`
                  : 'Account number too long (maximum 20 digits)'
                }
              </p>
            )}
          </div>
          
          <InputField
            label="Account Name"
            id="accountName"
            placeholder="Enter account holder name"
            value={data.bankDetails?.accountName || ''}
            onChange={(e) => handleInputChange('bankDetails', e.target.value, 'accountName')}
          />
          
          <InputField
            label="SWIFT Code"
            id="swiftCode"
            placeholder="Enter SWIFT code (optional)"
            value={data.bankDetails?.swiftCode || ''}
            onChange={(e) => handleInputChange('bankDetails', e.target.value.toUpperCase(), 'swiftCode')}
          />
        </div>
      </div>

      {/* Social Media (Optional) */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
          Social Media (Optional)
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Facebook"
            id="facebook"
            placeholder="Facebook profile/page URL"
            value={data.socialMedia?.facebook || ''}
            onChange={(e) => handleInputChange('socialMedia', e.target.value, 'facebook')}
          />
          
          <InputField
            label="Instagram"
            id="instagram"
            placeholder="Instagram profile URL"
            value={data.socialMedia?.instagram || ''}
            onChange={(e) => handleInputChange('socialMedia', e.target.value, 'instagram')}
          />
          
          <InputField
            label="Twitter"
            id="twitter"
            placeholder="Twitter profile URL"
            value={data.socialMedia?.twitter || ''}
            onChange={(e) => handleInputChange('socialMedia', e.target.value, 'twitter')}
          />
          
          <InputField
            label="LinkedIn"
            id="linkedin"
            placeholder="LinkedIn profile URL"
            value={data.socialMedia?.linkedin || ''}
            onChange={(e) => handleInputChange('socialMedia', e.target.value, 'linkedin')}
          />
        </div>
      </div>


      {/* Payment Methods & Delivery Options (Optional) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Payment Methods */}
        <div>
          <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
            Payment Methods (Optional)
          </h4>
          <div className="space-y-3">
            {paymentMethodOptions.map(method => (
              <div key={method.value} className="flex items-center">
                <Checkbox
                  color="brand"
                  checked={data.paymentMethods?.includes(method.value)}
                  onChange={(e) => handleCheckboxChange('paymentMethods', method.value, e.target.checked)}
                />
                <label className="ml-2 text-sm text-navy-700 dark:text-white">
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div>
          <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
            Delivery Options (Optional)
          </h4>
          <div className="space-y-3">
            {deliveryOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <Checkbox
                  color="brand"
                  checked={data.deliveryOptions?.includes(option.value)}
                  onChange={(e) => handleCheckboxChange('deliveryOptions', option.value, e.target.checked)}
                />
                <label className="ml-2 text-sm text-navy-700 dark:text-white">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
