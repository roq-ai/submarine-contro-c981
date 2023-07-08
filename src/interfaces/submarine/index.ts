import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SubmarineInterface {
  id?: string;
  depth: number;
  buoyancy: number;
  movement: number;
  atmosphere_pressure: number;
  blending: number;
  winch: number;
  ballast: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface SubmarineGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
