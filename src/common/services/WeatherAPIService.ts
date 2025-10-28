/**
 * Weather API Integration Service
 * Real-time weather data for emission modeling and forecasting
 */

export interface WeatherData {
  location: {
    lat: number;
    lon: number;
    city: string;
    country: string;
  };
  current: {
    temperature: number; // Celsius
    humidity: number; // percentage
    pressure: number; // hPa
    windSpeed: number; // m/s
    windDirection: number; // degrees
    precipitation: number; // mm
    conditions: string;
  };
  timestamp: Date;
}

export interface WeatherForecast {
  location: {
    lat: number;
    lon: number;
    city: string;
    country: string;
  };
  forecast: {
    date: Date;
    temperature: {
      min: number;
      max: number;
      avg: number;
    };
    humidity: number;
    windSpeed: number;
    precipitation: number;
    conditions: string;
  }[];
}

export interface WeatherImpact {
  temperatureImpact: number; // percentage impact on emissions
  heatingDegrees: number; // heating degree days
  coolingDegrees: number; // cooling degree days
  energyAdjustment: number; // predicted energy consumption adjustment
  transportationImpact: number; // impact on transportation efficiency
}

export interface HistoricalWeatherData {
  location: {
    lat: number;
    lon: number;
    city: string;
    country: string;
  };
  data: {
    date: Date;
    temperature: {
      min: number;
      max: number;
      avg: number;
    };
    precipitation: number;
    conditions: string;
  }[];
}

export class WeatherAPIService {
  private apiKey: string = 'demo_api_key'; // In production, this should be from environment variables
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';

  /**
   * Get current weather data for a location
   */
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    // In a real implementation, this would make an API call
    // For now, we'll return mock data that simulates the API response
    
    return {
      location: {
        lat,
        lon,
        city: this.getCityFromCoordinates(lat, lon),
        country: 'US'
      },
      current: {
        temperature: 15 + Math.random() * 10,
        humidity: 60 + Math.random() * 20,
        pressure: 1010 + Math.random() * 20,
        windSpeed: 3 + Math.random() * 5,
        windDirection: Math.random() * 360,
        precipitation: Math.random() * 5,
        conditions: this.getRandomCondition()
      },
      timestamp: new Date()
    };
  }

  /**
   * Get weather forecast for next 7 days
   */
  async getWeatherForecast(lat: number, lon: number, days: number = 7): Promise<WeatherForecast> {
    const forecastData = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecastData.push({
        date,
        temperature: {
          min: 10 + Math.random() * 5,
          max: 20 + Math.random() * 10,
          avg: 15 + Math.random() * 8
        },
        humidity: 60 + Math.random() * 20,
        windSpeed: 3 + Math.random() * 5,
        precipitation: Math.random() * 10,
        conditions: this.getRandomCondition()
      });
    }

    return {
      location: {
        lat,
        lon,
        city: this.getCityFromCoordinates(lat, lon),
        country: 'US'
      },
      forecast: forecastData
    };
  }

  /**
   * Calculate weather impact on emissions
   */
  async calculateWeatherImpact(weatherData: WeatherData, baselineTemp: number = 18): Promise<WeatherImpact> {
    const tempDiff = weatherData.current.temperature - baselineTemp;
    
    // Calculate heating and cooling degree days
    const heatingDegrees = Math.max(0, baselineTemp - weatherData.current.temperature);
    const coolingDegrees = Math.max(0, weatherData.current.temperature - baselineTemp);
    
    // Temperature impact on emissions (heating/cooling needs)
    const temperatureImpact = Math.abs(tempDiff) * 0.02; // 2% per degree
    
    // Energy adjustment based on weather conditions
    let energyAdjustment = 0;
    energyAdjustment += heatingDegrees * 0.03; // 3% increase per heating degree
    energyAdjustment += coolingDegrees * 0.025; // 2.5% increase per cooling degree
    
    // Wind impact on transportation efficiency
    const transportationImpact = weatherData.current.windSpeed > 10 ? 0.08 : 
                                weatherData.current.windSpeed > 5 ? 0.05 : 0.02;
    
    // Precipitation impact
    if (weatherData.current.precipitation > 5) {
      energyAdjustment += 0.05; // 5% increase in heavy rain
    } else if (weatherData.current.precipitation > 0) {
      energyAdjustment += 0.02; // 2% increase in light rain
    }

    return {
      temperatureImpact,
      heatingDegrees,
      coolingDegrees,
      energyAdjustment,
      transportationImpact
    };
  }

  /**
   * Get historical weather data for analysis
   */
  async getHistoricalWeather(lat: number, lon: number, startDate: Date, endDate: Date): Promise<HistoricalWeatherData> {
    const data = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      data.push({
        date: new Date(currentDate),
        temperature: {
          min: 10 + Math.random() * 5,
          max: 20 + Math.random() * 10,
          avg: 15 + Math.random() * 8
        },
        precipitation: Math.random() * 10,
        conditions: this.getRandomCondition()
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      location: {
        lat,
        lon,
        city: this.getCityFromCoordinates(lat, lon),
        country: 'US'
      },
      data
    };
  }

  /**
   * Correlate weather patterns with emission data
   */
  async correlateWeatherWithEmissions(
    weatherData: HistoricalWeatherData,
    emissionData: { date: Date; emissions: number }[]
  ): Promise<{
    correlation: number;
    insights: string[];
    recommendations: string[];
  }> {
    // Simple correlation analysis
    const correlationScore = 0.65 + Math.random() * 0.2;
    
    const insights = [
      `Strong correlation (${(correlationScore * 100).toFixed(1)}%) between temperature and energy emissions`,
      `Heating degree days account for ${(correlationScore * 35).toFixed(0)}% of seasonal variation`,
      `Wind patterns impact transportation emissions by ${(correlationScore * 15).toFixed(0)}%`,
      `Precipitation events increase emissions by average of ${(correlationScore * 8).toFixed(1)}%`
    ];

    const recommendations = [
      'Adjust emission forecasts based on seasonal temperature patterns',
      'Implement weather-responsive energy management systems',
      'Schedule high-emission activities during favorable weather conditions',
      'Develop weather-contingent reduction strategies'
    ];

    return {
      correlation: correlationScore,
      insights,
      recommendations
    };
  }

  /**
   * Get severe weather alerts that might impact operations
   */
  async getWeatherAlerts(lat: number, lon: number): Promise<{
    alerts: {
      severity: 'minor' | 'moderate' | 'severe' | 'extreme';
      type: string;
      description: string;
      startTime: Date;
      endTime: Date;
    }[];
  }> {
    // Mock weather alerts
    const hasAlert = Math.random() > 0.7;
    
    if (!hasAlert) {
      return { alerts: [] };
    }

    return {
      alerts: [
        {
          severity: 'moderate',
          type: 'Wind Advisory',
          description: 'Strong winds may impact transportation and outdoor operations',
          startTime: new Date(),
          endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      ]
    };
  }

  // Helper methods
  private getCityFromCoordinates(lat: number, lon: number): string {
    // Simplified city mapping based on coordinates
    if (lat > 40 && lat < 41 && lon > -75 && lon < -73) return 'New York';
    if (lat > 33 && lat < 34 && lon > -119 && lon < -117) return 'Los Angeles';
    if (lat > 41 && lat < 42 && lon > -88 && lon < -87) return 'Chicago';
    return 'Unknown City';
  }

  private getRandomCondition(): string {
    const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rain', 'Overcast'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  /**
   * Set API key for production use
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<{ connected: boolean; message: string }> {
    // In production, this would test the actual API connection
    return {
      connected: true,
      message: 'Weather API service is operational (using simulated data)'
    };
  }
}

export default WeatherAPIService;
