import {
  type Brand,
  type InsertBrand,
  type Frame,
  type InsertFrame,
  type Component,
  type InsertComponent,
  type Build,
  type InsertBuild,
  type CartItem,
  type InsertCart,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Brands
  getBrands(): Promise<Brand[]>;
  getBrand(id: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;

  // Frames
  getFrames(brandId?: string): Promise<Frame[]>;
  getFrame(id: string): Promise<Frame | undefined>;
  createFrame(frame: InsertFrame): Promise<Frame>;

  // Components
  getComponents(filters?: { category?: string; wheelSize?: string }): Promise<Component[]>;
  getComponent(id: string): Promise<Component | undefined>;
  createComponent(component: InsertComponent): Promise<Component>;

  // Builds
  getBuilds(): Promise<Build[]>;
  getBuild(id: string): Promise<Build | undefined>;
  createBuild(build: InsertBuild): Promise<Build>;

  // Cart
  getCart(): Promise<Build[]>;
  addToCart(buildId: string): Promise<CartItem>;
  removeFromCart(buildId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private brands: Map<string, Brand>;
  private frames: Map<string, Frame>;
  private components: Map<string, Component>;
  private builds: Map<string, Build>;
  private cart: Map<string, CartItem>;

  constructor() {
    this.brands = new Map();
    this.frames = new Map();
    this.components = new Map();
    this.builds = new Map();
    this.cart = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed Brands
    const brands: Brand[] = [
      {
        id: "evil",
        name: "Evil",
        logo: "",
        description: "High-performance enduro bikes built for aggressive trail riding and racing.",
      },
      {
        id: "yeti",
        name: "Yeti",
        logo: "",
        description: "Premium mountain bikes with legendary suspension and craftsmanship.",
      },
      {
        id: "santa-cruz",
        name: "Santa Cruz",
        logo: "",
        description: "Iconic California brand known for durable, high-quality trail bikes.",
      },
    ];
    brands.forEach((b) => this.brands.set(b.id, b));

    // Seed Frames
    const frames: Frame[] = [
      {
        id: "evil-following-v3",
        brandId: "evil",
        name: "Evil Following V3",
        image: "/attached_assets/generated_images/Mountain_bike_frame_black_1010a65e.png",
        price: "2799.00",
        weight: "7.2",
        description: "160mm travel enduro bike with adjustable geometry",
        travelMm: 160,
        wheelSize: "29",
        material: "Carbon Fiber",
      },
      {
        id: "evil-offering",
        brandId: "evil",
        name: "Evil Offering",
        image: "/attached_assets/generated_images/Mountain_bike_frame_blue_23ad184b.png",
        price: "3199.00",
        weight: "7.8",
        description: "170mm travel freeride machine for the biggest hits",
        travelMm: 170,
        wheelSize: "27.5",
        material: "Carbon Fiber",
      },
      {
        id: "yeti-sb150",
        brandId: "yeti",
        name: "Yeti SB150",
        image: "/attached_assets/generated_images/Mountain_bike_frame_black_1010a65e.png",
        price: "3499.00",
        weight: "6.9",
        description: "150mm travel trail bike with Switch Infinity suspension",
        travelMm: 150,
        wheelSize: "29",
        material: "Carbon Fiber",
      },
      {
        id: "santa-cruz-megatower",
        brandId: "santa-cruz",
        name: "Santa Cruz Megatower",
        image: "/attached_assets/generated_images/Mountain_bike_frame_blue_23ad184b.png",
        price: "3299.00",
        weight: "7.1",
        description: "165mm travel big bike for big days",
        travelMm: 165,
        wheelSize: "29",
        material: "Carbon Fiber",
      },
    ];
    frames.forEach((f) => this.frames.set(f.id, f));

    // Seed Components
    const components: Component[] = [
      // Forks
      {
        id: "fox-36-factory",
        category: "fork",
        brand: "Fox",
        name: "Fox 36 Factory",
        image: "/attached_assets/generated_images/MTB_suspension_fork_Fox_2e30e983.png",
        price: "1099.00",
        weight: "4.2",
        description: "160mm travel, GRIP2 damper, premium fork for aggressive riding",
        specs: "160mm travel, 44mm offset, 15x110mm axle",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "rockshox-lyrik",
        category: "fork",
        brand: "RockShox",
        name: "RockShox Lyrik Ultimate",
        image: "/attached_assets/generated_images/MTB_suspension_fork_RockShox_7afb916b.png",
        price: "999.00",
        weight: "4.4",
        description: "160mm travel, Charger 3 damper, enduro ready",
        specs: "160mm travel, 44mm offset, 15x110mm axle",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "fox-38-factory",
        category: "fork",
        brand: "Fox",
        name: "Fox 38 Factory",
        image: "/attached_assets/generated_images/MTB_suspension_fork_Fox_2e30e983.png",
        price: "1199.00",
        weight: "4.6",
        description: "170mm travel, 38mm stanchions for maximum stiffness",
        specs: "170mm travel, 44mm offset, 15x110mm axle",
        compatibleWheelSizes: "27.5,29",
      },
      // Wheelsets
      {
        id: "i9-enduro-s",
        category: "wheelset",
        brand: "Industry Nine",
        name: "Industry Nine Enduro S",
        image: "/attached_assets/generated_images/Carbon_MTB_wheelset_black_16f77022.png",
        price: "1799.00",
        weight: "3.8",
        description: "Carbon rims, Hydra hubs, bomb-proof for enduro racing",
        specs: "30mm internal width, 6-bolt disc",
        compatibleWheelSizes: "29",
      },
      {
        id: "dt-swiss-ex1700",
        category: "wheelset",
        brand: "DT Swiss",
        name: "DT Swiss EX 1700",
        image: "/attached_assets/generated_images/Carbon_MTB_wheelset_black_16f77022.png",
        price: "899.00",
        weight: "4.2",
        description: "Alloy rims, reliable and affordable enduro wheels",
        specs: "30mm internal width, 6-bolt disc",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "reserve-30",
        category: "wheelset",
        brand: "Reserve",
        name: "Reserve 30 HD",
        image: "/attached_assets/generated_images/Carbon_MTB_wheelset_black_16f77022.png",
        price: "2199.00",
        weight: "3.6",
        description: "Premium carbon hoops with lifetime warranty",
        specs: "30mm internal width, centerlock disc",
        compatibleWheelSizes: "29",
      },
      // Groupsets
      {
        id: "sram-gx-eagle",
        category: "groupset",
        brand: "SRAM",
        name: "SRAM GX Eagle",
        image: "/attached_assets/generated_images/SRAM_Eagle_drivetrain_groupset_66102fc6.png",
        price: "599.00",
        weight: "2.8",
        description: "12-speed, wide range, reliable performance",
        specs: "10-52t cassette, single chainring",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "shimano-xt",
        category: "groupset",
        brand: "Shimano",
        name: "Shimano XT M8100",
        image: "/attached_assets/generated_images/SRAM_Eagle_drivetrain_groupset_66102fc6.png",
        price: "699.00",
        weight: "2.6",
        description: "12-speed, smooth shifting, durable",
        specs: "10-51t cassette, single chainring",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "sram-x01-eagle",
        category: "groupset",
        brand: "SRAM",
        name: "SRAM X01 Eagle",
        image: "/attached_assets/generated_images/SRAM_Eagle_drivetrain_groupset_66102fc6.png",
        price: "1099.00",
        weight: "2.5",
        description: "12-speed, race-level performance",
        specs: "10-52t cassette, single chainring",
        compatibleWheelSizes: "27.5,29",
      },
      // Brakes
      {
        id: "shimano-xt-brakes",
        category: "brakes",
        brand: "Shimano",
        name: "Shimano XT M8100",
        image: "/attached_assets/generated_images/MTB_hydraulic_disc_brakes_47dc96a8.png",
        price: "299.00",
        weight: "0.7",
        description: "Powerful 4-piston hydraulic brakes",
        specs: "203mm/180mm rotors, mineral oil",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "sram-code-rsc",
        category: "brakes",
        brand: "SRAM",
        name: "SRAM Code RSC",
        image: "/attached_assets/generated_images/MTB_hydraulic_disc_brakes_47dc96a8.png",
        price: "399.00",
        weight: "0.8",
        description: "Maximum power for steep descents",
        specs: "200mm/180mm rotors, DOT fluid",
        compatibleWheelSizes: "27.5,29",
      },
      {
        id: "magura-mt7",
        category: "brakes",
        brand: "Magura",
        name: "Magura MT7",
        image: "/attached_assets/generated_images/MTB_hydraulic_disc_brakes_47dc96a8.png",
        price: "449.00",
        weight: "0.75",
        description: "Race-proven 4-piston brakes with carbotecture",
        specs: "203mm/180mm rotors, mineral oil",
        compatibleWheelSizes: "27.5,29",
      },
    ];
    components.forEach((c) => this.components.set(c.id, c));
  }

  // Brands
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrand(id: string): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = randomUUID();
    const brand: Brand = { ...insertBrand, id };
    this.brands.set(id, brand);
    return brand;
  }

  // Frames
  async getFrames(brandId?: string): Promise<Frame[]> {
    const allFrames = Array.from(this.frames.values());
    if (brandId) {
      return allFrames.filter((f) => f.brandId === brandId);
    }
    return allFrames;
  }

  async getFrame(id: string): Promise<Frame | undefined> {
    return this.frames.get(id);
  }

  async createFrame(insertFrame: InsertFrame): Promise<Frame> {
    const id = randomUUID();
    const frame: Frame = { ...insertFrame, id };
    this.frames.set(id, frame);
    return frame;
  }

  // Components
  async getComponents(filters?: { category?: string; wheelSize?: string }): Promise<Component[]> {
    let allComponents = Array.from(this.components.values());
    
    // Filter by category
    if (filters?.category) {
      allComponents = allComponents.filter((c) => c.category === filters.category);
    }
    
    // Filter by wheel size compatibility
    if (filters?.wheelSize) {
      allComponents = allComponents.filter((c) => {
        if (!c.compatibleWheelSizes) return true; // No restriction
        const compatibleSizes = c.compatibleWheelSizes.split(',');
        return compatibleSizes.includes(filters.wheelSize!);
      });
    }
    
    return allComponents;
  }

  async getComponent(id: string): Promise<Component | undefined> {
    return this.components.get(id);
  }

  async createComponent(insertComponent: InsertComponent): Promise<Component> {
    const id = randomUUID();
    const component: Component = { ...insertComponent, id };
    this.components.set(id, component);
    return component;
  }

  // Builds
  async getBuilds(): Promise<Build[]> {
    return Array.from(this.builds.values());
  }

  async getBuild(id: string): Promise<Build | undefined> {
    return this.builds.get(id);
  }

  async createBuild(insertBuild: InsertBuild): Promise<Build> {
    const id = randomUUID();
    const build: Build = {
      ...insertBuild,
      id,
      createdAt: new Date().toISOString(),
    };
    this.builds.set(id, build);
    return build;
  }

  // Cart
  async getCart(): Promise<Build[]> {
    const cartItems = Array.from(this.cart.values());
    const builds = await Promise.all(
      cartItems.map(async (item) => {
        const build = await this.getBuild(item.buildId);
        return build;
      })
    );
    return builds.filter((b): b is Build => b !== undefined);
  }

  async addToCart(buildId: string): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = {
      id,
      buildId,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };
    this.cart.set(id, cartItem);
    return cartItem;
  }

  async removeFromCart(buildId: string): Promise<void> {
    const cartItems = Array.from(this.cart.entries());
    const itemToRemove = cartItems.find(([, item]) => item.buildId === buildId);
    if (itemToRemove) {
      this.cart.delete(itemToRemove[0]);
    }
  }
}

export const storage = new MemStorage();
