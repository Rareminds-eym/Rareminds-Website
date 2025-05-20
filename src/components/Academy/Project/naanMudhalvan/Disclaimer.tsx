import React from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          <h2 className="text-lg font-semibold text-white">No Fees Policy</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Mission Statement */}
        <p className="text-sm text-gray-600">
          Rareminds is committed to providing skill development, training, and placement support under the Naan Mudhalvan initiative and other programs completely free of cost to students.
        </p>

        {/* Services */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-900 mb-2">
            We do not charge any fees for:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Placements',
              'Recruitment Assistance',
              'Internships',
              'Training Programs'
            ].map((service) => (
              <div 
                key={service}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="flex gap-2 bg-amber-50 p-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-700">
            <span className="font-medium">Important:</span> If you encounter anyone collecting fees on behalf of Rareminds, report immediately to 9902326951.
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 italic text-center border-t border-gray-100 pt-3">
          We encourage vigilance against fraudulent activities. Rareminds remains dedicated to providing genuine opportunities without financial burden.
        </p>
      </div>
    </div>
  );
}