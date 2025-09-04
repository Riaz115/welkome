import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import { UseContextProvider } from "./contexts/StepperContext";
import BasicInformation from "./components/steps/BasicInformation";
import DocumentsUpload from "./components/steps/DocumentsUpload";
import Card from "components/card";
import useSellerApiStore from "stores/useSellerApiStore";
import { toast } from "react-toastify";

const BecomeASeller = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
    const [sellerData, setSellerData] = useState({
    // Required personal information
    name: '',
    email: '',
    phone: '',
    password: '',
    // Required business information
    businessName: '',
    businessType: '',
    businessRegistrationNumber: '',
    // Optional business information
    businessDescription: '',
    businessEmail: '',
    website: '',
    businessAddress: {
      district: '',
      subCounty: '',
      village: '',
      street: '',
      postalCode: ''
    },
    contactPerson: {
      name: '',
      phone: '',
      email: ''
    },
    bankDetails: {
      bankName: '',
      accountNumber: '',
      accountName: '',
      swiftCode: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    paymentMethods: [],
    deliveryOptions: [],
    categories: [],
    documents: {
      businessRegistrationCertificate: null,
      bankStatement: null,
      idProof: null,
      tradingLicense: null
    }
  });

  const steps = [
    { stepNo: 1, name: "Basic Information" },
    { stepNo: 2, name: "Documents Upload" },
  ];

  const updateSellerData = (stepData) => {
    setSellerData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  // Validation function for step progression
  const validateStep1 = () => {
    const errors = {};
    
    // Required personal information
    if (!sellerData.name || sellerData.name.trim().length < 1) {
      errors.name = 'Name is required';
    }
    
    if (!sellerData.email || sellerData.email.trim().length < 1) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sellerData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!sellerData.phone || sellerData.phone.trim().length < 1) {
      errors.phone = 'Phone number is required';
    }
    
    if (!sellerData.password || sellerData.password.length < 6) {
      errors.password = 'Password is required and must be at least 6 characters';
    }
    
    // Required business information
    if (!sellerData.businessName || sellerData.businessName.trim().length < 1) {
      errors.businessName = 'Business name is required';
    }
    
    if (!sellerData.businessType || sellerData.businessType.trim().length < 1) {
      errors.businessType = 'Business type is required';
    }
    
    if (!sellerData.businessRegistrationNumber || sellerData.businessRegistrationNumber.trim().length < 1) {
      errors.businessRegistrationNumber = 'Business registration number is required';
    }
    
    // Optional field validations
    if (sellerData.businessEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sellerData.businessEmail)) {
      errors.businessEmail = 'Please enter a valid business email address';
    }
    
    if (sellerData.website && !/^https?:\/\/.+/.test(sellerData.website)) {
      errors.website = 'Please enter a valid website URL';
    }
    
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    const requiredDocs = [
      'businessRegistrationCertificate',
      'bankStatement',
      'idProof',
      'tradingLicense'
    ];
    
    requiredDocs.forEach(doc => {
      if (!sellerData.documents[doc]) {
        errors[doc] = 'This document is required';
      }
    });
    
    return errors;
  };

  const canProceedToNextStep = (step) => {
    switch (step) {
      case 1:
        const step1Errors = validateStep1();
        return Object.keys(step1Errors).length === 0;
      case 2:
        const step2Errors = validateStep2();
        return Object.keys(step2Errors).length === 0;
      default:
        return true;
    }
  };

  const displayStep = (step) => {
    switch (step.stepNo) {
      case 1:
        return <BasicInformation 
          data={sellerData} 
          onDataChange={updateSellerData}
          validationErrors={validateStep1()}
        />;
      case 2:
        return <DocumentsUpload 
          data={sellerData} 
          onDataChange={updateSellerData}
          validationErrors={validateStep2()}
        />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    if (direction === "next") {
      // Check validation before proceeding
      if (canProceedToNextStep(currentStep)) {
        newStep++;
      } else {
        return; // Don't proceed if validation fails
      }
    } else {
      newStep--;
    }
    
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const { createSellerRegistration } = useSellerApiStore();

  const handleFinish = async () => {
    try {
      const dataToSend = {
        // Required personal information
        name: sellerData.name.trim(),
        email: sellerData.email.trim().toLowerCase(),
        phone: sellerData.phone.trim(),
        password: sellerData.password,
        // Required business information
        businessName: sellerData.businessName.trim(),
        businessType: sellerData.businessType.trim(),
        businessRegistrationNumber: sellerData.businessRegistrationNumber.trim()
      };
      
      // Optional business information
      if (sellerData.businessEmail && sellerData.businessEmail.trim()) {
        dataToSend.businessEmail = sellerData.businessEmail.trim();
      }
      
      if (sellerData.businessDescription && sellerData.businessDescription.trim()) {
        dataToSend.businessDescription = sellerData.businessDescription.trim();
      }
      
      if (sellerData.website && sellerData.website.trim()) {
        dataToSend.website = sellerData.website.trim();
      }
      
      if (sellerData.businessAddress && Object.values(sellerData.businessAddress).some(val => val && val.trim())) {
        const businessAddress = {};
        Object.keys(sellerData.businessAddress).forEach(key => {
          if (sellerData.businessAddress[key] && sellerData.businessAddress[key].trim()) {
            businessAddress[key] = sellerData.businessAddress[key].trim();
          }
        });
        if (Object.keys(businessAddress).length > 0) {
          dataToSend.businessAddress = businessAddress;
        }
      }
      
      if (sellerData.contactPerson && Object.values(sellerData.contactPerson).some(val => val && val.trim())) {
        const contactPerson = {};
        Object.keys(sellerData.contactPerson).forEach(key => {
          if (sellerData.contactPerson[key] && sellerData.contactPerson[key].trim()) {
            contactPerson[key] = sellerData.contactPerson[key].trim();
          }
        });
        if (Object.keys(contactPerson).length > 0) {
          dataToSend.contactPerson = contactPerson;
        }
      }
      
      if (sellerData.bankDetails && Object.values(sellerData.bankDetails).some(val => val && val.trim())) {
        const bankDetails = {};
        Object.keys(sellerData.bankDetails).forEach(key => {
          if (sellerData.bankDetails[key] && sellerData.bankDetails[key].trim()) {
            bankDetails[key] = key === 'swiftCode' ? sellerData.bankDetails[key].trim().toUpperCase() : sellerData.bankDetails[key].trim();
          }
        });
        if (Object.keys(bankDetails).length > 0) {
          dataToSend.bankDetails = bankDetails;
        }
      }
      
      if (sellerData.socialMedia && Object.values(sellerData.socialMedia).some(val => val && val.trim())) {
        const socialMedia = {};
        Object.keys(sellerData.socialMedia).forEach(key => {
          if (sellerData.socialMedia[key] && sellerData.socialMedia[key].trim()) {
            socialMedia[key] = sellerData.socialMedia[key].trim();
          }
        });
        if (Object.keys(socialMedia).length > 0) {
          dataToSend.socialMedia = socialMedia;
        }
      }
      
      
      if (sellerData.paymentMethods && sellerData.paymentMethods.length > 0) {
        dataToSend.paymentMethods = sellerData.paymentMethods;
      }
      
      if (sellerData.deliveryOptions && sellerData.deliveryOptions.length > 0) {
        dataToSend.deliveryOptions = sellerData.deliveryOptions;
      }
      
      if (sellerData.categories && sellerData.categories.length > 0) {
        dataToSend.categories = sellerData.categories;
      }

      const formData = new FormData();
      
      Object.keys(dataToSend).forEach(key => {
        if (typeof dataToSend[key] === 'object' && !Array.isArray(dataToSend[key])) {
          Object.keys(dataToSend[key]).forEach(nestedKey => {
            formData.append(`${key}.${nestedKey}`, dataToSend[key][nestedKey]);
          });
        } else if (Array.isArray(dataToSend[key])) {
          dataToSend[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, dataToSend[key]);
        }
      });
      
      const requiredDocs = ['businessRegistrationCertificate', 'bankStatement', 'idProof', 'tradingLicense'];
      requiredDocs.forEach(key => {
        if (sellerData.documents[key]) {
          formData.append(key, sellerData.documents[key]);
        }
      });

      const created = await createSellerRegistration(formData);

      const successMessage = created?.message || 'Seller registration submitted successfully! Your application is under review.';
      toast.success(successMessage);

      navigate('/admin/main/userManagement/sellers', {
        state: { 
          newRegistration: created?.data || created,
          message: successMessage
        }
      });
    } catch (error) {
      const errMsg = error?.response?.data?.message || 'Failed to submit seller registration. Please check console for details.';
      toast.error(errMsg);
    }
  };

  return (
    <div className="mt-3 h-full w-full">
      <div className="h-[350px] w-full rounded-[20px] bg-gradient-to-br from-brand-400 to-brand-600 md:h-[390px]" />
      <div className="w-md:2/3 mx-auto h-full w-5/6 md:px-3  3xl:w-7/12">
        <div className="-mt-[280px] w-full pb-10 md:-mt-[240px] md:px-[70px]">
          <Stepper
            action={setCurrentStep}
            steps={steps}
            currentStep={currentStep}
          />
        </div>
        <Card extra={"h-full mx-auto pb-3"}>
          <div className="rounded-[20px]">
            <UseContextProvider>
              {displayStep(steps[currentStep - 1])}
            </UseContextProvider>
          </div>
          {/* navigation button */}
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            onFinish={handleFinish}
            sellerData={sellerData}
            canProceed={canProceedToNextStep(currentStep)}
            mode="create"
          />
        </Card>
      </div>
    </div>
  );
};

export default BecomeASeller;
