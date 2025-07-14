// src/components/PricingModal.tsx

import React from 'react';
// ✅ Fixed: Added Star and ArrowRight to the import list
import { X, CheckCircle, Star, ArrowRight } from 'lucide-react';
// ✅ Fixed: Corrected the import syntax for the Program interface
import { Program } from '../pages/Programs'; // Import the Program interface

interface PricingModalProps {
  programs: Program[];
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ programs, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-background text-foreground rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 animate-scale-in-fade-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close pricing details"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gradient-blue animate-fade-in">
          All Our Programs & Pricing
        </h2>

        <p className="text-center text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Choose the perfect learning adventure for your child. All prices are monthly subscriptions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const originalPrice = program.price;
            const discountedPrice = originalPrice * (1 - program.discount);
            const hasDiscount = program.discount > 0;

            return (
              <div
                key={index}
                className={`neuro-card p-6 flex flex-col items-center text-center relative ${program.featured ? 'ring-2 ring-whiz-orange' : ''}`}
              >
                {program.featured && (
                    <div className="absolute -top-3 -right-3 bg-whiz-orange text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" /> {/* Star icon used here */}
                    Popular
                    </div>
                )}
                <div className={`w-14 h-14 bg-${program.color}/20 rounded-xl flex items-center justify-center mb-4`}>
                  <program.icon className={`w-7 h-7 text-${program.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{program.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{program.age}</p>

                <div className="flex items-baseline mb-4">
                  {hasDiscount && (
                    <span className="text-xl line-through text-muted-foreground mr-2">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>

                {hasDiscount && (
                  <p className="text-sm text-whiz-green font-medium mb-4">
                    Save {program.discount * 100}%!
                  </p>
                )}

                <p className="text-sm text-muted-foreground flex-grow mb-4">{program.description}</p>

                <ul className="text-left space-y-2 mb-6 w-full">
                  {program.modules.slice(0, 3).map((module, modIndex) => ( // Show first 3 modules as key points
                    <li key={modIndex} className="flex items-center text-sm text-foreground">
                      <CheckCircle className={`w-4 h-4 mr-2 text-${program.color}`} />
                      {module}
                    </li>
                  ))}
                  {program.modules.length > 3 && (
                    <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className={`w-4 h-4 mr-2 text-muted`} />
                        ...and more!
                    </li>
                  )}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group border-2 border-${program.color} text-${program.color} hover:bg-${program.color} hover:text-white`}
                  // In a real app, this would link to a signup/checkout page for this program
                  onClick={() => alert(`Enrolling in ${program.title} for $${discountedPrice.toFixed(2)}/month!`)}
                >
                  Enroll in {program.title}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /> {/* ArrowRight icon used here */}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
            <p className="text-muted-foreground text-sm">
                *Prices are subject to change. Discounts applied automatically.
            </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;