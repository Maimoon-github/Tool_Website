import React, { useState, useEffect, useMemo } from 'react';
import { ArrowDownUp, Copy, CheckCircle2 } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed';

interface UnitConversion {
  from: string;
  to: string;
  value: string;
  result: string;
  category: UnitCategory;
}

const UnitConverter: React.FC = () => {
  const [conversion, setConversion] = useState<UnitConversion>({
    from: 'meters',
    to: 'feet',
    value: '',
    result: '',
    category: 'length'
  });
  const [copied, setCopied] = useState(false);

  const unitCategories: Record<UnitCategory, { name: string; units: Record<string, string> }> = {
    length: {
      name: 'Length',
      units: {
        meters: 'Meters (m)',
        feet: 'Feet (ft)',
        inches: 'Inches (in)',
        centimeters: 'Centimeters (cm)',
        kilometers: 'Kilometers (km)',
        miles: 'Miles (mi)',
        yards: 'Yards (yd)'
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilograms: 'Kilograms (kg)',
        pounds: 'Pounds (lb)',
        grams: 'Grams (g)',
        ounces: 'Ounces (oz)',
        tons: 'Tons (t)',
        stones: 'Stones (st)'
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: 'Celsius (°C)',
        fahrenheit: 'Fahrenheit (°F)',
        kelvin: 'Kelvin (K)'
      }
    },
    area: {
      name: 'Area',
      units: {
        squareMeters: 'Square Meters (m²)',
        squareFeet: 'Square Feet (ft²)',
        squareKilometers: 'Square Kilometers (km²)',
        squareMiles: 'Square Miles (mi²)',
        hectares: 'Hectares (ha)',
        acres: 'Acres (ac)'
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liters: 'Liters (L)',
        gallons: 'Gallons (gal)',
        cubicMeters: 'Cubic Meters (m³)',
        cubicFeet: 'Cubic Feet (ft³)',
        milliliters: 'Milliliters (mL)',
        fluidOunces: 'Fluid Ounces (fl oz)'
      }
    },
    speed: {
      name: 'Speed',
      units: {
        kilometersPerHour: 'Kilometers per Hour (km/h)',
        milesPerHour: 'Miles per Hour (mph)',
        metersPerSecond: 'Meters per Second (m/s)',
        knots: 'Knots (kn)'
      }
    }
  };

  const conversionFactors: Record<string, Record<string, number>> = {
    meters: {
      feet: 3.28084,
      inches: 39.3701,
      centimeters: 100,
      kilometers: 0.001,
      miles: 0.000621371,
      yards: 1.09361
    },
    kilograms: {
      pounds: 2.20462,
      grams: 1000,
      ounces: 35.274,
      tons: 0.001,
      stones: 0.157473
    },
    squareMeters: {
      squareFeet: 10.7639,
      squareKilometers: 1e-6,
      squareMiles: 3.861e-7,
      hectares: 0.0001,
      acres: 0.000247105
    },
    liters: {
      gallons: 0.264172,
      cubicMeters: 0.001,
      cubicFeet: 0.0353147,
      milliliters: 1000,
      fluidOunces: 33.814
    },
    kilometersPerHour: {
      milesPerHour: 0.621371,
      metersPerSecond: 0.277778,
      knots: 0.539957
    }
  };

  const unitOptions = useMemo(() => {
    return Object.entries(unitCategories[conversion.category].units);
  }, [conversion.category]);

  const convert = () => {
    const value = parseFloat(conversion.value);
    if (isNaN(value)) {
      setConversion(prev => ({ ...prev, result: '' }));
      return;
    }

    let result: number;

    if (conversion.category === 'temperature') {
      result = convertTemperature(value, conversion.from, conversion.to);
    } else {
      result = convertUnit(value, conversion.from, conversion.to);
    }

    setConversion(prev => ({ ...prev, result: result.toFixed(6) }));
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    switch (from) {
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    switch (to) {
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convertUnit = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    const factors = conversionFactors[from];
    if (!factors) return value;
    const factor = factors[to];
    if (!factor) return value;
    return value * factor;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(conversion.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapUnits = () => {
    setConversion(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  useEffect(() => {
    convert();
  }, [conversion.value, conversion.from, conversion.to]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Unit Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert between different units of measurement quickly and accurately.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            value={conversion.category}
            onChange={(e) => setConversion(prev => ({
              ...prev,
              category: e.target.value as UnitCategory,
              from: Object.keys(unitCategories[e.target.value as UnitCategory].units)[0],
              to: Object.keys(unitCategories[e.target.value as UnitCategory].units)[1],
              value: '',
              result: ''
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(unitCategories).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
              <select
                value={conversion.from}
                onChange={(e) => setConversion(prev => ({ ...prev, from: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                {unitOptions.map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            <input
              type="number"
              value={conversion.value}
              onChange={(e) => setConversion(prev => ({ ...prev, value: e.target.value }))}
              placeholder="Enter value..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center md:justify-start md:pl-4">
            <button
              onClick={swapUnits}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowDownUp size={24} className="text-blue-600 dark:text-blue-400" />
            </button>
          </div>

          {/* Output Section */}
          <div className="md:col-start-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
              <select
                value={conversion.to}
                onChange={(e) => setConversion(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                {unitOptions.map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                value={conversion.result}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={copyToClipboard}
                disabled={!conversion.result}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
              >
                {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Conversion Formula</h3>
        <p className="text-blue-700 dark:text-blue-400 font-mono">
          {conversion.category === 'temperature' ? (
            conversion.from === 'celsius' && conversion.to === 'fahrenheit' ? '°F = (°C × 9/5) + 32' :
            conversion.from === 'fahrenheit' && conversion.to === 'celsius' ? '°C = (°F - 32) × 5/9' :
            conversion.from === 'celsius' && conversion.to === 'kelvin' ? 'K = °C + 273.15' :
            conversion.from === 'kelvin' && conversion.to === 'celsius' ? '°C = K - 273.15' :
            'Temperature conversion'
          ) : (
            'Direct conversion using standard conversion factors'
          )}
        </p>
      </div>
    </div>
  );
};

export default UnitConverter;
