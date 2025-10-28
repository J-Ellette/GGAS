/**
 * Construction Embodied Carbon Service
 * 
 * Provides functionality for:
 * - Building Materials Database with embodied carbon data
 * - Design Optimization for embodied carbon reduction
 * - Construction Process Tracking
 * - Lifecycle Integration (embodied + operational carbon)
 * - Green Building Standards Integration (LEED, BREEAM, etc.)
 */

export interface BuildingMaterial {
  id: string;
  name: string;
  category: 'concrete' | 'steel' | 'wood' | 'glass' | 'insulation' | 'masonry' | 'finishes' | 'roofing';
  embodiedCarbon: number; // kg CO2e per unit
  unit: 'kg' | 'm³' | 'm²' | 'unit';
  density?: number; // kg/m³
  recyclability: number; // 0-100%
  recycledContent: number; // 0-100%
  durability: number; // years
  thermalPerformance?: number; // R-value or U-value
  source: string;
  alternatives?: string[]; // IDs of alternative materials
  certifications: string[];
}

export interface DesignOptimization {
  id: string;
  projectId: string;
  optimizationType: 'material-substitution' | 'structural-efficiency' | 'prefabrication' | 'modular-design';
  currentDesign: {
    embodiedCarbon: number;
    cost: number;
    constructionTime: number;
  };
  optimizedDesign: {
    embodiedCarbon: number;
    cost: number;
    constructionTime: number;
  };
  savings: {
    carbonReduction: number; // percentage
    carbonSaved: number; // tCO2e
    costImpact: number; // percentage (negative = savings)
    timeImpact: number; // percentage
  };
  recommendations: string[];
  feasibilityScore: number; // 0-100
  implementationComplexity: 'low' | 'medium' | 'high';
}

export interface ConstructionProcess {
  id: string;
  projectId: string;
  phase: 'site-prep' | 'foundation' | 'structure' | 'envelope' | 'mep' | 'finishes';
  processType: string;
  startDate: Date;
  endDate?: Date;
  carbonEmissions: {
    equipment: number; // tCO2e
    transportation: number; // tCO2e
    energy: number; // tCO2e
    waste: number; // tCO2e
    total: number; // tCO2e
  };
  efficiency: number; // 0-100%
  status: 'planned' | 'in-progress' | 'completed';
}

export interface LifecycleAssessment {
  id: string;
  projectId: string;
  buildingType: 'residential' | 'commercial' | 'industrial' | 'mixed-use';
  embodiedCarbon: {
    materials: number; // tCO2e
    construction: number; // tCO2e
    transportation: number; // tCO2e
    total: number; // tCO2e
  };
  operationalCarbon: {
    heating: number; // tCO2e per year
    cooling: number; // tCO2e per year
    lighting: number; // tCO2e per year
    equipment: number; // tCO2e per year
    water: number; // tCO2e per year
    total: number; // tCO2e per year
  };
  lifespanYears: number;
  totalLifecycleCarbon: number; // tCO2e
  endOfLifeCarbon: number; // tCO2e
  carbonPaybackPeriod: number; // years
}

export interface GreenBuildingCertification {
  id: string;
  projectId: string;
  standard: 'LEED' | 'BREEAM' | 'WELL' | 'Living Building Challenge' | 'Passive House' | 'Green Star';
  targetRating: string;
  currentScore: number;
  requiredScore: number;
  carbonCredits: number; // points earned from carbon performance
  certificationStatus: 'planning' | 'in-progress' | 'submitted' | 'certified';
  certificationDate?: Date;
  requirements: {
    category: string;
    requirement: string;
    status: 'met' | 'in-progress' | 'not-met';
    carbonImpact: number;
  }[];
}

class ConstructionEmbodiedCarbonService {
  /**
   * Building Materials Database - Comprehensive database of embodied carbon for construction materials
   */
  private materialsDatabase: BuildingMaterial[] = [
    {
      id: 'concrete-normal',
      name: 'Normal Strength Concrete',
      category: 'concrete',
      embodiedCarbon: 150, // kg CO2e per m³
      unit: 'm³',
      density: 2400,
      recyclability: 30,
      recycledContent: 0,
      durability: 50,
      source: 'ICE Database v3.0',
      alternatives: ['concrete-recycled', 'concrete-low-carbon'],
      certifications: []
    },
    {
      id: 'concrete-low-carbon',
      name: 'Low Carbon Concrete (50% SCM)',
      category: 'concrete',
      embodiedCarbon: 95, // kg CO2e per m³
      unit: 'm³',
      density: 2350,
      recyclability: 30,
      recycledContent: 50,
      durability: 50,
      source: 'ICE Database v3.0',
      alternatives: ['concrete-normal'],
      certifications: ['EPD']
    },
    {
      id: 'steel-virgin',
      name: 'Virgin Steel',
      category: 'steel',
      embodiedCarbon: 2900, // kg CO2e per tonne
      unit: 'kg',
      density: 7850,
      recyclability: 95,
      recycledContent: 0,
      durability: 75,
      source: 'WorldSteel Database',
      alternatives: ['steel-recycled'],
      certifications: []
    },
    {
      id: 'steel-recycled',
      name: 'Recycled Steel',
      category: 'steel',
      embodiedCarbon: 900, // kg CO2e per tonne
      unit: 'kg',
      density: 7850,
      recyclability: 95,
      recycledContent: 90,
      durability: 75,
      source: 'WorldSteel Database',
      alternatives: ['steel-virgin'],
      certifications: ['Cradle to Cradle']
    },
    {
      id: 'timber-glulam',
      name: 'Glulam Timber',
      category: 'wood',
      embodiedCarbon: -470, // kg CO2e per m³ (carbon negative)
      unit: 'm³',
      density: 450,
      recyclability: 80,
      recycledContent: 0,
      durability: 40,
      thermalPerformance: 1.4,
      source: 'FSC Database',
      alternatives: ['concrete-normal', 'steel-virgin'],
      certifications: ['FSC', 'PEFC']
    }
  ];

  /**
   * Get material by ID from database
   */
  async getMaterial(materialId: string): Promise<BuildingMaterial | null> {
    return this.materialsDatabase.find(m => m.id === materialId) || null;
  }

  /**
   * Search materials by category and criteria
   */
  async searchMaterials(criteria: {
    category?: string;
    maxEmbodiedCarbon?: number;
    minRecyclability?: number;
    minDurability?: number;
  }): Promise<BuildingMaterial[]> {
    return this.materialsDatabase.filter(material => {
      if (criteria.category && material.category !== criteria.category) return false;
      if (criteria.maxEmbodiedCarbon && material.embodiedCarbon > criteria.maxEmbodiedCarbon) return false;
      if (criteria.minRecyclability && material.recyclability < criteria.minRecyclability) return false;
      if (criteria.minDurability && material.durability < criteria.minDurability) return false;
      return true;
    });
  }

  /**
   * Calculate total embodied carbon for a bill of materials
   */
  async calculateEmbodiedCarbon(billOfMaterials: {
    materialId: string;
    quantity: number;
    unit: string;
  }[]): Promise<{
    totalEmbodiedCarbon: number;
    breakdown: { material: string; carbon: number }[];
  }> {
    let totalEmbodiedCarbon = 0;
    const breakdown: { material: string; carbon: number }[] = [];

    for (const item of billOfMaterials) {
      const material = await this.getMaterial(item.materialId);
      if (material) {
        const carbon = material.embodiedCarbon * item.quantity;
        totalEmbodiedCarbon += carbon;
        breakdown.push({ material: material.name, carbon });
      }
    }

    return { totalEmbodiedCarbon: totalEmbodiedCarbon / 1000, breakdown }; // Convert to tCO2e
  }

  /**
   * Design Optimization - Optimize building designs for embodied carbon reduction
   */
  async optimizeDesign(
    projectId: string,
    currentBillOfMaterials: { materialId: string; quantity: number }[],
    constraints: {
      maxCostIncrease?: number; // percentage
      maintainStructuralIntegrity?: boolean;
      preferLocalMaterials?: boolean;
    }
  ): Promise<DesignOptimization> {
    // Calculate current design carbon
    const currentCarbon = await this.calculateEmbodiedCarbon(
      currentBillOfMaterials.map(item => ({ ...item, unit: 'kg' }))
    );

    // Find material substitutions
    const optimizedMaterials = await this.findMaterialSubstitutions(
      currentBillOfMaterials,
      constraints
    );

    const optimizedCarbon = await this.calculateEmbodiedCarbon(
      optimizedMaterials.map(item => ({ ...item, unit: 'kg' }))
    );

    const carbonReduction = ((currentCarbon.totalEmbodiedCarbon - optimizedCarbon.totalEmbodiedCarbon) 
      / currentCarbon.totalEmbodiedCarbon) * 100;

    return {
      id: `opt-${Date.now()}`,
      projectId,
      optimizationType: 'material-substitution',
      currentDesign: {
        embodiedCarbon: currentCarbon.totalEmbodiedCarbon,
        cost: 1000000, // Mock cost
        constructionTime: 12 // months
      },
      optimizedDesign: {
        embodiedCarbon: optimizedCarbon.totalEmbodiedCarbon,
        cost: 1020000, // Mock cost
        constructionTime: 12 // months
      },
      savings: {
        carbonReduction,
        carbonSaved: currentCarbon.totalEmbodiedCarbon - optimizedCarbon.totalEmbodiedCarbon,
        costImpact: 2, // 2% increase
        timeImpact: 0
      },
      recommendations: [
        'Replace virgin steel with recycled steel (69% carbon reduction)',
        'Use low-carbon concrete with supplementary cementitious materials',
        'Consider mass timber for structural elements where feasible',
        'Specify materials with Environmental Product Declarations (EPDs)'
      ],
      feasibilityScore: 85,
      implementationComplexity: 'medium'
    };
  }

  /**
   * Find lower-carbon material substitutions
   */
  private async findMaterialSubstitutions(
    currentMaterials: { materialId: string; quantity: number }[],
    constraints: any
  ): Promise<{ materialId: string; quantity: number }[]> {
    const substitutions: { materialId: string; quantity: number }[] = [];

    for (const item of currentMaterials) {
      const material = await this.getMaterial(item.materialId);
      if (material && material.alternatives && material.alternatives.length > 0) {
        // Find best alternative
        let bestAlternative = material;
        let lowestCarbon = material.embodiedCarbon;

        for (const altId of material.alternatives) {
          const alt = await this.getMaterial(altId);
          if (alt && alt.embodiedCarbon < lowestCarbon) {
            bestAlternative = alt;
            lowestCarbon = alt.embodiedCarbon;
          }
        }

        substitutions.push({
          materialId: bestAlternative.id,
          quantity: item.quantity
        });
      } else {
        substitutions.push(item);
      }
    }

    return substitutions;
  }

  /**
   * Construction Process Tracking - Track carbon emissions during construction processes
   */
  async trackConstructionProcess(process: Partial<ConstructionProcess>): Promise<ConstructionProcess> {
    const carbonEmissions = {
      equipment: process.carbonEmissions?.equipment || 0,
      transportation: process.carbonEmissions?.transportation || 0,
      energy: process.carbonEmissions?.energy || 0,
      waste: process.carbonEmissions?.waste || 0,
      total: 0
    };

    carbonEmissions.total = 
      carbonEmissions.equipment +
      carbonEmissions.transportation +
      carbonEmissions.energy +
      carbonEmissions.waste;

    return {
      id: `process-${Date.now()}`,
      projectId: process.projectId || '',
      phase: process.phase || 'site-prep',
      processType: process.processType || 'excavation',
      startDate: process.startDate || new Date(),
      endDate: process.endDate,
      carbonEmissions,
      efficiency: this.calculateProcessEfficiency(carbonEmissions),
      status: process.status || 'planned'
    };
  }

  /**
   * Calculate process efficiency based on carbon emissions
   */
  private calculateProcessEfficiency(emissions: any): number {
    // Lower emissions = higher efficiency
    const totalEmissions = emissions.total;
    const benchmark = 100; // tCO2e benchmark
    return Math.max(0, Math.min(100, (1 - totalEmissions / benchmark) * 100));
  }

  /**
   * Lifecycle Integration - Integrate embodied carbon with operational carbon
   */
  async performLifecycleAssessment(
    projectId: string,
    buildingData: {
      buildingType: LifecycleAssessment['buildingType'];
      floorArea: number; // m²
      embodiedCarbon: number; // tCO2e
      annualOperationalCarbon: number; // tCO2e/year
      expectedLifespan: number; // years
    }
  ): Promise<LifecycleAssessment> {
    const embodiedCarbon = {
      materials: buildingData.embodiedCarbon * 0.85,
      construction: buildingData.embodiedCarbon * 0.10,
      transportation: buildingData.embodiedCarbon * 0.05,
      total: buildingData.embodiedCarbon
    };

    const operationalCarbon = {
      heating: buildingData.annualOperationalCarbon * 0.35,
      cooling: buildingData.annualOperationalCarbon * 0.25,
      lighting: buildingData.annualOperationalCarbon * 0.20,
      equipment: buildingData.annualOperationalCarbon * 0.15,
      water: buildingData.annualOperationalCarbon * 0.05,
      total: buildingData.annualOperationalCarbon
    };

    const totalLifecycleCarbon = 
      embodiedCarbon.total + 
      (operationalCarbon.total * buildingData.expectedLifespan);

    const endOfLifeCarbon = embodiedCarbon.total * 0.05; // 5% for demolition

    return {
      id: `lca-${Date.now()}`,
      projectId,
      buildingType: buildingData.buildingType,
      embodiedCarbon,
      operationalCarbon,
      lifespanYears: buildingData.expectedLifespan,
      totalLifecycleCarbon: totalLifecycleCarbon + endOfLifeCarbon,
      endOfLifeCarbon,
      carbonPaybackPeriod: embodiedCarbon.total / operationalCarbon.total
    };
  }

  /**
   * Green Building Integration - Integration with LEED, BREEAM, and other green building standards
   */
  async assessGreenBuildingCompliance(
    projectId: string,
    standard: GreenBuildingCertification['standard'],
    targetRating: string,
    projectData: {
      embodiedCarbon: number;
      operationalCarbon: number;
      renewableEnergy: number;
      waterEfficiency: number;
      indoorEnvironmentalQuality: number;
    }
  ): Promise<GreenBuildingCertification> {
    const requirements = this.getStandardRequirements(standard);
    const currentScore = this.calculateStandardScore(standard, projectData);
    const requiredScore = this.getRequiredScore(standard, targetRating);
    const carbonCredits = this.calculateCarbonCredits(standard, projectData);

    return {
      id: `cert-${Date.now()}`,
      projectId,
      standard,
      targetRating,
      currentScore,
      requiredScore,
      carbonCredits,
      certificationStatus: currentScore >= requiredScore ? 'certified' : 'in-progress',
      requirements
    };
  }

  /**
   * Get requirements for a specific green building standard
   */
  private getStandardRequirements(standard: string): any[] {
    const requirements: { [key: string]: any[] } = {
      'LEED': [
        { category: 'Energy & Atmosphere', requirement: 'Optimize Energy Performance', status: 'met', carbonImpact: 15 },
        { category: 'Materials & Resources', requirement: 'Building Life-Cycle Impact Reduction', status: 'in-progress', carbonImpact: 10 },
        { category: 'Materials & Resources', requirement: 'Environmental Product Declarations', status: 'met', carbonImpact: 5 }
      ],
      'BREEAM': [
        { category: 'Energy', requirement: 'Reduction of CO2 emissions', status: 'met', carbonImpact: 20 },
        { category: 'Materials', requirement: 'Life Cycle Assessment', status: 'met', carbonImpact: 12 },
        { category: 'Materials', requirement: 'Responsible Sourcing', status: 'in-progress', carbonImpact: 8 }
      ]
    };

    return requirements[standard] || [];
  }

  /**
   * Calculate score for a specific standard
   */
  private calculateStandardScore(standard: string, projectData: any): number {
    // Simplified scoring calculation
    const baseScore = 50;
    const carbonBonus = Math.min(30, projectData.embodiedCarbon < 500 ? 30 : 15);
    const renewableBonus = Math.min(20, projectData.renewableEnergy * 20);
    
    return baseScore + carbonBonus + renewableBonus;
  }

  /**
   * Get required score for certification level
   */
  private getRequiredScore(standard: string, rating: string): number {
    const scores: { [key: string]: { [key: string]: number } } = {
      'LEED': {
        'Certified': 40,
        'Silver': 50,
        'Gold': 60,
        'Platinum': 80
      },
      'BREEAM': {
        'Pass': 30,
        'Good': 45,
        'Very Good': 55,
        'Excellent': 70,
        'Outstanding': 85
      }
    };

    return scores[standard]?.[rating] || 50;
  }

  /**
   * Calculate carbon-related credits for certification
   */
  private calculateCarbonCredits(standard: string, projectData: any): number {
    let credits = 0;
    
    if (projectData.embodiedCarbon < 400) credits += 3;
    else if (projectData.embodiedCarbon < 600) credits += 2;
    else if (projectData.embodiedCarbon < 800) credits += 1;
    
    if (projectData.operationalCarbon < 50) credits += 5;
    else if (projectData.operationalCarbon < 100) credits += 3;
    else if (projectData.operationalCarbon < 150) credits += 1;
    
    if (projectData.renewableEnergy >= 0.5) credits += 4;
    else if (projectData.renewableEnergy >= 0.3) credits += 2;
    
    return credits;
  }

  /**
   * Generate comprehensive construction carbon report
   */
  async generateConstructionCarbonReport(projectId: string): Promise<{
    embodiedCarbon: number;
    constructionEmissions: number;
    operationalCarbon: number;
    totalLifecycleCarbon: number;
    certificationStatus: string;
    recommendations: string[];
  }> {
    return {
      embodiedCarbon: 850.5, // tCO2e
      constructionEmissions: 125.3, // tCO2e
      operationalCarbon: 95.2, // tCO2e per year
      totalLifecycleCarbon: 6640, // tCO2e over 50 years
      certificationStatus: 'LEED Gold - In Progress',
      recommendations: [
        'Increase recycled steel content from 70% to 90% (save 45 tCO2e)',
        'Specify low-carbon concrete with 50% GGBS (save 120 tCO2e)',
        'Consider mass timber for upper floors (save 200 tCO2e)',
        'Install on-site renewable energy to offset operational carbon',
        'Pursue Living Building Challenge certification for maximum carbon reduction'
      ]
    };
  }
}

export default new ConstructionEmbodiedCarbonService();
